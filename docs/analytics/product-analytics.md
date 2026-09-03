# Analytics produit — parcours d'apprentissage et de conversion B1

Instrumentation du funnel produit (acquisition → placement → parcours →
apprentissage → audio → DELF → commerce) pour comprendre le comportement
réel des apprenants, sans les tracer individuellement et sans collecter de
donnée personnelle au-delà de ce que l'authentification exige déjà.

Ce document remplace `docs/analytics.md` (chantier de lancement initial) :
tout son contenu est repris et étendu ici.

## Provider : Vercel Web Analytics (`@vercel/analytics`)

Choix inchangé depuis le chantier initial, réaffirmé après cet audit :

- Cookieless, pas de fingerprinting, aucune clé/DSN à gérer.
- Un seul package pour les pageviews automatiques et les événements produit
  custom, côté client (`@vercel/analytics/next`) comme serveur
  (`@vercel/analytics/server`).
- Aucun appel réseau en local (`npm run dev`) : les événements sont logués
  en console par le SDK tant que l'app ne tourne pas sur l'infrastructure
  Vercel.
- Alternative écartée : un second provider dédié aux événements produit
  (PostHog, Segment...) ajouterait un SDK, une clé secrète, un bandeau de
  consentement potentiel — pour un besoin déjà couvert. Conforme à la
  consigne du chantier : améliorer l'existant plutôt que le dupliquer.

## Architecture

```
lib/analytics/
  events.ts        Taxonomie des noms d'événements + liste blanche des propriétés
  client.ts         trackEvent(name, properties)      — composants "use client"
  server.ts         trackServerEvent(name, properties) — Server Actions / Route Handlers
  ViewTracker.tsx    Composant sans rendu : déclenche un événement de vue une fois au montage

lib/observability/
  log.ts            logServerError(scope, error, context) — logs serveur normalisés, sans secret
```

Un seul point d'entrée par environnement d'exécution (client/serveur), des
noms d'événements typés (`AnalyticsEventName`, dérivé de `ANALYTICS_EVENTS`),
et une interface `AnalyticsProperties` qui fait office de liste blanche : le
compilateur TypeScript refuse toute propriété inline non déclarée dans cette
interface (excess property checking), ce qui bloque déjà à la compilation
la plupart des ajouts accidentels de données interdites — voir aussi
`lib/analytics/__tests__/events.test.ts`.

Garanties, valables pour `trackEvent` et `trackServerEvent` :

- **Silencieux si le provider est indisponible** — `try/catch` sans
  relancer. Un ad-blocker, un script bloqué, une panne réseau ou
  `@vercel/analytics` absent ne doivent jamais casser un flux produit (auth,
  progression, audio, DELF, checkout, premium).
- **`trackServerEvent` est toujours fire-and-forget** (`void trackServerEvent(...)`,
  jamais `await`é) pour ne jamais ajouter de latence à une réponse — vérifié
  par un test statique (`lib/analytics/__tests__/server.test.ts`) qui échoue
  si un futur appel oublie le `void`.
- **`ViewTracker`** garde un `useRef` pour ne déclencher l'événement de vue
  qu'une seule fois au montage, y compris sous le double-montage de React
  Strict Mode en développement.

### Ajouter un événement

1. Ajouter le nom dans `ANALYTICS_EVENTS` (`lib/analytics/events.ts`) et, si
   besoin, la propriété dans `AnalyticsProperties` — jamais une chaîne libre
   directement dans un composant.
2. Appeler `trackEvent`/`trackServerEvent` au point exact de la vraie
   logique métier : pas au rendu, pas au clic si l'action peut encore
   échouer côté serveur (voir `checkout_started`, déclenché seulement après
   création réelle de la session Stripe — jamais au clic sur le bouton).
3. Si l'événement peut se déclencher plusieurs fois pour la même action
   réelle (rerender, Strict Mode, deux callbacks pour un seul geste comme
   `onPlay`/`onLoadStart` sur `<audio>`), garder un `useRef` de ce qui a déjà
   été tracké. Voir les patrons dans `ModuleExperience.tsx`
   (`trackedModuleIdRef`, `trackedLessonIdsRef`, `prevModuleCompletionRef`)
   et `AudioExercise.tsx` (`playTrackedRef`).
4. Ajouter le test correspondant (voir § Tests) et documenter la ligne dans
   le tableau ci-dessous.

## Événements

### Acquisition / navigation du parcours

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| *(pageview)* | Automatique (Vercel Analytics), sur chaque route — pas d'événement custom `page_view`/`landing_view` : en ajouter un aurait doublé une mesure déjà native. | — |
| `primary_cta_clicked` | Clic sur le CTA principal (`PrimaryCta`) par un visiteur qui n'a **pas encore** commencé (test de niveau ni progression) — header ou hero de l'accueil | `source` (`header`\|`hero`), `authenticated` |
| `resume_clicked` | Clic sur le même CTA une fois que l'apprenant a **déjà** de la progression (reprise), ou sur le CTA de fin de module/examen | `source` (`header`\|`hero`\|`module_end_cta`\|`exam_end_cta`), `authenticated`, `moduleId`?, `recommendationType` (`resume_in_progress`\|`next_new_module`\|`journey_complete`) |
| `journey_viewed` | Montage de `/parcours` | — |
| `stage_viewed` | Montage d'une page d'étape (`/parcours/[stageSlug]`) | `stageId` |

`recommendationType` reprend tel quel `NextModuleTarget.isResuming` (déjà
calculé par `getNextModule`, `lib/pedagogy/logic/recommendation.ts`) : aucune
nouvelle logique métier, seulement son exposition à l'analytics.

**Secondaire volontairement non instrumenté :** le bouton "Découvrir la
méthode" du hero (ancre `#fonctionnement`) reste un composant serveur
(`Button` → `next/link`) ; le convertir en composant client pour un simple
scroll interne aurait un coût (frontière client) disproportionné au signal
— même logique déjà appliquée aux liens `/offre` secondaires (footer, "À
propos", cartes verrouillées) dans le chantier initial.

### Auth

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `signup_started` | Soumission du formulaire d'inscription | — |
| `signup_completed` | `signup()` (Server Action), uniquement après création réelle du compte + session | — |
| `login_completed` | `login()` (Server Action), uniquement après vérification réelle des identifiants | — |
| `login_failed` | `login()` : email/mot de passe invalides, ou tentative bloquée par le rate-limit | `reason` (`invalid_credentials`\|`rate_limited`) |

**Volontairement non instrumenté :** `signup_failed`. L'échec "email déjà
pris" est un résultat métier normal (pas une panne) ; un échec réellement
inattendu (DB inaccessible...) est désormais visible via
`logServerError("auth.signup", error)` dans les logs serveur — c'est un
problème d'infra à corriger, pas un point de funnel produit à mesurer.
`placement_test_abandoned` n'existe pas non plus : le nombre d'abandons se
lit directement en comparant `placement_started` et `placement_completed`
dans le dashboard, sans dupliquer la mesure (même raisonnement que pour
`landing_view`).

### Test de positionnement

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `placement_started` | Montage de `/test-niveau` | — |
| `placement_question_answered` | Passage réel à la question suivante (pas à chaque sélection/changement d'avis) | `questionIndex` |
| `placement_completed` | Calcul réel du résultat à la dernière question | `placementLevel` |

`questionIndex` permet de voir à quelle question les visiteurs décrochent le
plus, sans dupliquer `placement_completed` par un `placement_test_abandoned`
explicite (dérivable en comparant les volumes de `placement_started` et de
la dernière valeur de `questionIndex` atteinte).

### Apprentissage

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `module_started` | Montage de `ModuleExperience` pour un module donné (fait aussi office de "vue" : ouvrir la page, c'est commencer) | `moduleId` |
| `lesson_started` | Première fois qu'une leçon donnée devient l'étape courante | `moduleId`, `lessonId` |
| `exercise_completed` | Callback de complétion réelle d'un exercice (module **ou** examen) | `moduleId`? / `examId`?, `exerciseId`, `exerciseType`, `correct` |
| `module_completed` | Transition réelle `completed: false → true` (`lib/pedagogy/logic/progress.ts`) | `moduleId` |

`exerciseType` et `correct` sont la partie la plus significative de cet
audit : avant, `exercise_completed` ne portait que `moduleId` — impossible
de répondre à "quels modules/types d'exercice posent le plus de
difficulté". `correct` est un booléen agrégé (taux de réussite), jamais la
réponse elle-même. `exerciseType` est l'un des 10 types fixes déjà déclarés
dans `lib/pedagogy/types.ts` (`qcm`, `vrai_faux`, `production_ecrite`...),
jamais une chaîne libre.

**Volontairement non instrumenté :** `module_viewed`/`exercise_viewed`
séparés. Ouvrir un module revient à le commencer (pas de mode "aperçu" dans
l'UI) ; un exercice affiché mais non complété n'a pas d'état intermédiaire
observable qui vaille la peine d'un événement dédié.

**Fonctionnalité inexistante — non instrumentée :** "à revoir"
(`module_marked_for_review`/`module_unmarked_for_review`), la page
`/reviser` et son `review_page_viewed`. Aucune de ces fonctionnalités
n'existe dans le code actuel (vérifié par une recherche exhaustive sur
"revoir"/"réviser"/"review" dans `app/` et `lib/`). Les ajouter aurait
signifié construire une fonctionnalité produit entière au prétexte de la
mesurer — hors périmètre d'un chantier analytics. **À instrumenter au
moment où cette fonctionnalité sera réellement développée**, en suivant la
procédure "Ajouter un événement" ci-dessus.

### Audio (compréhension orale — modules et examens)

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `audio_play_started` | Premier play réel d'une piste (dédupliqué : `onPlay` et `onLoadStart` se déclenchent tous les deux pour un seul geste) | `exerciseId` |
| `audio_completed` | Fin naturelle de la piste (`onEnded`) | `exerciseId` |
| `audio_retry` | Clic sur "Réessayer" après une erreur | `exerciseId` |
| `audio_error` | Erreur native du lecteur, ou filet de sécurité (chargement figé au-delà de 8s) | `exerciseId`, `reason` (`native_media_error`\|`stuck_load_timeout`) |

Un seul point d'instrumentation (`AudioExercise.tsx`) couvre à la fois les
modules et les examens : c'est le composant que route déjà `ExerciseCard`
pour tout exercice `comprehension_orale`, où qu'il soit utilisé.

**Volontairement non instrumenté :**
- `audio_paused` : se déclenche à chaque pause/reprise (y compris en
  scrubbant la barre de lecture) — bruit important pour un signal marginal
  par rapport à start/complete/error/retry.
- La relecture de son **propre** enregistrement dans `SpokenExercise.tsx`
  (production orale) : ce n'est pas "l'usage de l'audio pédagogique" au sens
  du funnel demandé (écoute d'un document), et la conflater aurait faussé la
  mesure d'usage réel de l'audio de compréhension.
- `human_audio_used`/`synthetic_audio_fallback_used` : à ce jour, **tout**
  l'audio du site est synthétique — `Exercise.audioSrc` est une simple
  chaîne, sans distinction de source dans le modèle de données. Fabriquer
  cette distinction maintenant reviendrait à inventer une donnée qui n'existe
  pas. À ajouter quand un premier enregistrement humain sera réellement
  livré (voir le commit `699efbb docs(audio): prepare human recording
  production pack`, qui prépare cette production sans l'avoir encore faite).

### DELF / examens

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `delf_mock_viewed` | Montage de `ExamExperience` (accès réel à l'épreuve, après vérification premium) | `examId` |
| `delf_mock_started` | Clic sur "Commencer une tentative" | `examId` |
| `delf_mock_completed` | Clic sur "Terminer la tentative" (actif seulement quand toutes les sections sont complétées) | `examId` |

### Commerce

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `premium_offer_viewed` | Vue de `/offre` | `isPremium`, `authenticated` |
| `premium_cta_clicked` | Clic sur un CTA premium réel : `PremiumLock` (module verrouillé), section Tarifs de l'accueil, ou bouton d'achat de `/offre` | `source` (`premium_lock`\|`pricing`\|`offre_page`) |
| `checkout_started` | `POST /api/checkout`, uniquement après création réelle d'une session Stripe Checkout | — |
| `checkout_failed` | Échec réel du démarrage du paiement : config manquante, session Stripe non créée, pas d'URL renvoyée, ou erreur réseau côté client | `source`?, `reason` (`payment_not_configured`\|`stripe_session_creation_failed`\|`no_checkout_url`\|`client_no_checkout_url`\|`client_network_error`) |
| `purchase_completed` | Webhook Stripe `checkout.session.completed`, uniquement après écriture réussie du premium en base | — |

`premium_cta_clicked` et `checkout_failed` étaient auparavant absents de
`Pricing.tsx`/`CheckoutButton.tsx` (seul `PremiumLock` était instrumenté) —
or `CheckoutButton` est le point d'entrée réel du paiement depuis `/offre`
**et** depuis la section Tarifs de l'accueil : l'instrumenter une fois y
couvre les deux. `checkout_failed` distingue explicitement une redirection
attendue (401 → `/connexion`, déjà gérée par l'UI) d'un vrai échec — ne
jamais confondre les deux évite de gonfler artificiellement un taux
d'échec.

## Propriétés

| Propriété | Type | Raison d'être |
|---|---|---|
| `moduleId`, `lessonId`, `stageId`, `examId`, `exerciseId` | id opaque | Identifiants de contenu déjà publics (slugs/ids du code), jamais une donnée sur la personne. |
| `exerciseType` | enum fixe (10 valeurs, `lib/pedagogy/types.ts`) | Permet le calcul du taux de réussite par type d'exercice. |
| `correct` | booléen | Signal agrégable de difficulté — jamais la réponse donnée. |
| `source` | chaîne courte fixe | D'où vient un clic (`header`, `hero`, `pricing`, `premium_lock`...) — remplace un `source_page` générique par des valeurs déjà énumérées à chaque site d'appel. |
| `questionIndex` | nombre | Position dans un test à longueur fixe — pas une donnée sur la personne. |
| `placementLevel` | enum CECRL (A1-B2) | Niveau estimé, pas le détail des réponses. |
| `isPremium`, `authenticated` | booléen | Segmentation visiteur/apprenant gratuit/premium — jamais un id de compte. |
| `recommendationType` | enum fixe | Reflète `NextModuleTarget.isResuming`, déjà calculé côté métier. |
| `reason` | code interne court fixe | Toujours une constante choisie dans le code, jamais un message d'erreur brut ni une entrée utilisateur — voir liste ci-dessus par événement. |

**Volontairement absentes, même si suggérées dans le brief initial :**

- `device_category` : ni Vercel Analytics (les événements custom ne sont pas
  segmentés par device dans son dashboard), ni le code actuel, n'exposent ce
  signal à coût nul — l'ajouter aurait demandé une détection UA dédiée pour
  un bénéfice incertain.
- `source_page` générique : remplacé par `source`, qui porte déjà des
  valeurs concrètes et énumérées à chaque site d'appel plutôt qu'une chaîne
  libre construite depuis un `pathname`.

## Funnels

### Funnel 1 — Acquisition → placement → parcours

```
(pageview auto) → primary_cta_clicked (source=hero|header)
  → placement_started → placement_question_answered* → placement_completed
  → journey_viewed
```

### Funnel 2 — Parcours → module → premier exercice → module terminé

```
journey_viewed → stage_viewed → module_started → lesson_started
  → exercise_completed* (avec `correct` : taux de réussite par exercice/module)
  → module_completed
```

### Funnel 3 — Module gratuit → offre → checkout → achat

```
module_started (module gratuit) → premium_cta_clicked (source=premium_lock, sur un module suivant verrouillé)
  → premium_offer_viewed → premium_cta_clicked (source=offre_page|pricing)
  → checkout_started (ou checkout_failed) → purchase_completed
```

### Funnel 4 — Utilisateur revenant → reprendre → module → progression

```
resume_clicked (source=header|hero, recommendationType=resume_in_progress|next_new_module)
  → module_started → exercise_completed* → module_completed
  → resume_clicked (source=module_end_cta) → module suivant, ou /progression si journey_complete
```

Ces quatre funnels se lisent directement dans le dashboard Vercel Analytics
en filtrant sur les noms d'événements et propriétés ci-dessus — aucun outil
supplémentaire n'est nécessaire.

## Mesure pédagogique agrégée

Calculable directement à partir des événements ci-dessus, sans stocker plus
de données individuelles que la progression déjà persistée
(`lib/auth/progress-store.ts`, une ligne par utilisateur, jamais un
historique d'événements bruts) :

| Métrique | Calcul |
|---|---|
| Taux de complétion par module | `module_completed` ÷ `module_started`, groupé par `moduleId` |
| Taux d'erreur par type d'exercice | `exercise_completed` avec `correct: false` ÷ total, groupé par `exerciseType` |
| Taux d'abandon du test de niveau | `placement_started` − `placement_completed` (ou dernier `questionIndex` atteint) |
| Usage de l'audio | `audio_play_started` ÷ `module_started` sur les modules contenant un exercice `comprehension_orale` |
| Progression moyenne | Déjà calculable côté produit via `lib/pedagogy/logic/progress.ts` (`getModuleCompletionRate`, `getParcoursSummary`) — pas besoin d'analytics pour ça. |
| Modules souvent rejoués | Non mesuré : rejouer un module déjà terminé ne déclenche pas de nouvel événement distinct aujourd'hui (`module_started` ne redéclenche que si `mod.id` change, voir `trackedModuleIdRef`). Ajout possible plus tard si le besoin se confirme, sans complexifier la mesure actuelle par anticipation. |

Aucune de ces métriques ne nécessite de stocker un identifiant utilisateur
sur l'événement lui-même : Vercel Web Analytics agrège déjà par événement
et propriété, pas par personne.

## Données interdites

Ne jamais envoyer, dans une propriété analytics ou un log serveur : email,
nom, prénom, mot de passe, tout token (session, reset, CSRF), clé ou
identifiant client Stripe brut, contenu de rédaction libre ou de production
orale, réponse ouverte d'un utilisateur, tout objet utilisateur complet
envoyé "par facilité".

Deux garde-fous complémentaires, pas juste une règle documentée :

1. **À la compilation** — `AnalyticsProperties` (`lib/analytics/events.ts`)
   est une liste blanche stricte ; TypeScript refuse toute propriété inline
   non déclarée (excess property checking).
2. **En test** — `lib/analytics/__tests__/events.test.ts` vérifie qu'aucun
   nom de propriété manifestement personnel/sensible n'est jamais ajouté à
   cette liste blanche elle-même ; `lib/observability/__tests__/log.test.ts`
   vérifie que `logServerError` supprime toute clé de contexte qui y
   ressemblerait, même ajoutée par erreur par un futur appelant.

## Observabilité (sans outil externe)

`lib/observability/log.ts` normalise les logs d'erreur serveur qui méritent
d'être visibles en production : `logServerError(scope, error, context)` ne
journalise jamais que `error.message` (jamais la stack ni l'objet brut, qui
peuvent porter des détails d'infra) et un contexte plat filtré (aucune clé
contenant "password", "token", "secret", "email", "cookie",
"authorization", "card", "stripekey"/"stripesecret" — même ajoutée par
erreur).

Points instrumentés dans cet audit, là où une erreur inattendue restait
jusqu'ici invisible ou risquait de faire planter la requête :

- `auth.signup` — un échec de création de compte autre que "email déjà pris"
  (ex. base inaccessible) est maintenant loggé, alors qu'il était
  silencieusement avalé.
- `checkout.stripe_session_create` — l'appel à `stripe.checkout.sessions.create`
  n'était protégé par aucun `try/catch` : une erreur Stripe (API indisponible,
  clé invalide...) aurait fait planter la route avec une erreur 500 non
  gérée. Désormais interceptée, journalisée sans exposer l'erreur Stripe
  brute, et traduite en `checkout_failed` + réponse JSON générique.
- `progress.get` / `progress.put` / `progress.merge` — les lectures/écritures
  en base (`lib/auth/progress-store.ts`) n'étaient protégées par aucun
  `try/catch` ; une panne DB aurait fait planter la requête sans laisser de
  trace exploitable.

**Déjà correct, laissé inchangé** : le webhook Stripe
(`app/api/webhooks/stripe/route.ts`) loggait déjà ses cas d'erreur
(`checkout.session.completed` sans référence exploitable) en ne journalisant
que des booléens (`hasUserId`, `hasCustomer`, `hasSubscription`), jamais les
identifiants eux-mêmes — exactement le patron que `logServerError`
généralise. Non retouché : du code déjà correct n'a pas besoin d'être migré
pour la seule cohérence stylistique.

**Stratégie si un outil externe est ajouté un jour** (Sentry, Axiom...) :
`logServerError` reste le seul point à faire évoluer (brancher l'envoi
externe dans son corps), sans toucher aux dizaines de sites d'appel.

## Erreurs côté client

Déjà en place avant ce chantier (vérifié, non modifié) :

- `app/error.tsx` (error boundary global) et `app/not-found.tsx` : aucun
  utilisateur ne voit de stack trace.
- `CheckoutButton` affiche un message générique sur échec ("le paiement
  n'est pas disponible pour le moment"), jamais l'erreur technique.
- `AudioExercise` affiche un message de repli ("audio non disponible... /
  Réessayer") au lieu de rester figé indéfiniment.

Ajouté dans ce chantier : les échecs qui atteignaient déjà ces garde-fous
UI (checkout, audio) sont maintenant aussi visibles côté analytics
(`checkout_failed`, `audio_error`) — l'UX ne change pas, la visibilité
produit sur la fréquence de ces échecs, si.

## Vie privée et consentement

- Vercel Web Analytics ne pose aucun cookie et n'effectue aucun
  fingerprinting — inchangé par cet audit, aucun bandeau de consentement
  n'est nécessaire pour cette mesure.
- Le seul cookie du site reste le cookie de session (HttpOnly, strictement
  nécessaire à l'authentification), posé par `lib/auth/session.ts` — non
  modifié.
- `localStorage` (`lib/pedagogy/useProgress.ts`) ne contient que la
  progression pédagogique (modules complétés, scores) — jamais un jeton
  d'authentification ni une donnée personnelle. Non modifié.
- **Point d'attention légal, déjà signalé avant ce chantier et non résolu
  ici** : `/confidentialite` mentionne déjà Vercel Web Analytics et le
  caractère cookieless de la mesure, avec un encart explicite `[Qualification
  juridique exacte du régime de consentement applicable... à valider par un
  juriste]`. Cet audit ajoute des événements plus granulaires (audio, clics
  CTA, échecs de paiement/connexion) **dans le même provider, sans nouvelle
  collecte de donnée personnelle** — la qualification juridique déjà
  signalée reste donc valable telle quelle. Une seule mise à jour rédactionnelle
  mineure est recommandée (non faite ici, hors périmètre technique) : la
  liste d'exemples "inscription, test de niveau, modules, examen blanc,
  offre" du paragraphe Cookies pourrait aussi citer l'audio et le
  paiement, par exhaustivité — sans changer la portée réelle de la mesure.
- Aucune nouvelle variable d'environnement, aucune nouvelle dépendance.

## Environnements

- **Développement** (`npm run dev`) : aucun appel réseau, les événements
  sont logués en console par le SDK.
- **Preview / Production (Vercel)** : envoi réel, distingué nativement par
  Vercel.
- Aucune variable d'environnement à ajouter.

## Tests

| Fichier | Couvre |
|---|---|
| `lib/analytics/__tests__/events.test.ts` | Unicité des noms d'événement, format, absence de propriété manifestement sensible dans la liste blanche |
| `lib/analytics/__tests__/client.test.ts` | `trackEvent` ne lève jamais, même si le provider échoue ; transmet bien nom + propriétés (`module_completed`, `premium_cta_clicked`, `placement_started`) |
| `lib/analytics/__tests__/server.test.ts` | `trackServerEvent` ne rejette jamais, même si le provider échoue (`purchase_completed`, `checkout_failed`) ; garde statique "toujours fire-and-forget" sur tout `app/**` |
| `lib/analytics/__tests__/ViewTracker.test.tsx` | Un seul déclenchement au montage, jamais sur un re-render, ne rend rien |
| `lib/observability/__tests__/log.test.ts` | Redaction des clés sensibles, jamais l'objet d'erreur complet, ne lève jamais |
| `components/pedagogy/__tests__/AudioExercise.test.tsx` (étendu) | `audio_play_started` dédupliqué malgré deux callbacks natifs, `audio_completed`, `audio_error`, `audio_retry`, remise à zéro du garde-fou après un retry |
| `components/commerce/__tests__/CheckoutButton.test.tsx` (nouveau) | `premium_cta_clicked` au clic, `checkout_failed` distingué par `reason`, jamais déclenché sur la redirection 401 attendue |

Lancer uniquement ces tests : `npx vitest run lib/analytics lib/observability components/pedagogy/__tests__/AudioExercise.test.tsx components/commerce/__tests__/CheckoutButton.test.tsx`.

## Debug

- En local, les événements apparaissent dans la console du navigateur
  (client) et du terminal `next dev` (serveur) — aucun réseau réel.
- Pour vérifier un nouvel événement sans attendre un déploiement : ajouter
  temporairement un `console.log` dans `trackEvent`/`trackServerEvent`
  (jamais commiter ce `console.log`), ou lire directement les logs du SDK.
- En Preview/Production, le dashboard Vercel Analytics (onglet du projet)
  liste les événements custom reçus avec leurs propriétés.

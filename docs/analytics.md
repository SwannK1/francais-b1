# Analytics — funnel de lancement B1

Instrumentation minimaliste du funnel produit (acquisition → auth →
placement → apprentissage → DELF → commerce), pour comprendre le
comportement des premiers utilisateurs sans les tracer individuellement.

## Provider retenu : Vercel Web Analytics (`@vercel/analytics`)

- Cookieless, pas de fingerprinting, pas de configuration côté dashboard
  requise (aucune clé/DSN à gérer, aucune variable d'env à ajouter).
- Un seul package couvre à la fois les pageviews automatiques et les
  événements produit custom, côté client (`@vercel/analytics/next`) comme
  côté serveur (`@vercel/analytics/server`, pour les Server Actions et
  Route Handlers).
- Aucun réseau appelé en local (`npm run dev`) : les événements sont
  simplement logués en console. Rien n'est envoyé tant que l'app ne tourne
  pas sur l'infrastructure Vercel (Preview/Production), qui distingue déjà
  nativement ces environnements dans le dashboard.
- Alternative écartée : un second provider dédié aux événements produit
  (PostHog, Segment...) aurait ajouté un SDK, une clé secrète à gérer, et un
  provider supplémentaire pour un besoin déjà couvert.

## Helper central

- `lib/analytics/events.ts` — taxonomie des noms d'événements + liste
  blanche des propriétés autorisées. Toute nouvelle propriété doit être
  ajoutée ici avant d'être utilisée.
- `lib/analytics/client.ts` — `trackEvent(name, properties)`, à utiliser
  depuis les composants client (`"use client"`). Ce module appelle aussi
  `inject()` dès son premier import, plutôt que de compter uniquement sur le
  montage de `<Analytics />` (`app/layout.tsx`) : les deux se montent dans le
  même commit React et l'ordre d'exécution de leurs effets n'est pas garanti
  — sans ça, un `trackEvent` déclenché par un effet de montage de page
  (`placement_started`, `module_started`...) peut s'exécuter avant que
  `window.va` existe et être perdu silencieusement. Constaté en testant
  `placement_started` sur un chargement direct de `/test-niveau`.
- `lib/analytics/server.ts` — `trackServerEvent(name, properties)`,
  équivalent pour Server Actions / Route Handlers. Toujours appelé en
  fire-and-forget (`void trackServerEvent(...)`), jamais `await`é, pour ne
  jamais ajouter de latence à une réponse.
- `lib/analytics/ViewTracker.tsx` — composant client sans rendu, pour
  déclencher un événement de vue une seule fois depuis une page qui reste
  un Server Component (ex. `/offre`).

Les deux helpers avalent systématiquement leurs erreurs (`try/catch` sans
relancer) : un provider indisponible, un ad-blocker, une variable d'env
absente ou une panne réseau ne doivent jamais casser un flux produit
(auth, progression, DELF, checkout, premium).

### Ajouter un événement

1. Ajouter le nom dans `ANALYTICS_EVENTS` (`lib/analytics/events.ts`) et,
   si besoin, les propriétés dans `AnalyticsProperties`.
2. Appeler `trackEvent`/`trackServerEvent` au point exact de la vraie
   logique métier (pas au rendu, pas au clic si l'action peut échouer côté
   serveur).
3. Si l'événement peut se déclencher plusieurs fois pour la même action
   (rerender, Strict Mode, navigation client-side sans remount), garder un
   `useRef` de ce qui a déjà été tracké — voir le patron utilisé dans
   `ModuleExperience.tsx` et `ExamExperience.tsx`.

## Événements instrumentés

| Événement | Déclencheur réel | Propriétés |
|---|---|---|
| `landing_view` | **Non instrumenté volontairement** — couvert par le pageview automatique de Vercel Analytics sur `/`. Ajouter un événement custom aurait doublé la mesure. | — |
| `signup_started` | Soumission du formulaire d'inscription (`SignupForm`, `onSubmit`) | — |
| `signup_completed` | `signup()` (Server Action), uniquement après création réelle du compte + session — jamais sur erreur ou email déjà pris | — |
| `login_completed` | `login()` (Server Action), uniquement après vérification réelle des identifiants | — |
| `placement_started` | Montage de `/test-niveau` | — |
| `placement_completed` | Calcul réel du résultat à la dernière question (`computePlacementResult`) | `placementLevel` |
| `module_started` | Montage de `ModuleExperience` pour un module donné | `moduleId` |
| `lesson_started` | Première fois qu'une leçon donnée devient l'étape courante | `moduleId`, `lessonId` |
| `exercise_completed` | Callback `onCompleted` d'un exercice (soumission réelle, pas juste affichage) | `moduleId` |
| `module_completed` | Transition réelle `completed: false → true` dans `lib/pedagogy/logic/progress.ts` | `moduleId` |
| `delf_mock_viewed` | Montage de `ExamExperience` (accès réel à l'épreuve, après vérification premium) | `examId` |
| `delf_mock_started` | Clic sur "Commencer une tentative" | `examId` |
| `delf_mock_completed` | Clic sur "Terminer la tentative" (actif seulement quand toutes les sections sont complétées) | `examId` |
| `premium_offer_viewed` | Vue de `/offre` | `isPremium` |
| `premium_cta_clicked` | Clic sur le CTA de `PremiumLock` ou le lien "Voir le détail de l'offre" (Pricing marketing) | `source` (`premium_lock` \| `pricing_page`) |
| `checkout_started` | `POST /api/checkout`, uniquement après création réelle d'une session Stripe Checkout | — |
| `purchase_completed` | Webhook Stripe `checkout.session.completed`, uniquement après écriture réussie du premium en base (`setUserPremium`) — jamais sur `/paiement/succes` | — |

Volontairement non instrumentés pour rester sobres : les liens `/offre`
secondaires (footer, page "À propos", `ModuleCard`/`ExamCard` verrouillés)
qui auraient nécessité de convertir des composants purement serveur en
composants client pour un signal marginal par rapport à `PremiumLock` et
`Pricing`.

## Données interdites

Ne jamais envoyer : email, nom, prénom, mot de passe, tout token (session,
reset, CSRF), clé ou identifiant client Stripe, contenu de rédaction libre
ou de production orale, réponse ouverte d'un utilisateur, tout objet
utilisateur complet envoyé "par facilité". Voir la liste blanche stricte
dans `AnalyticsProperties` (`lib/analytics/events.ts`) — si une propriété
n'y figure pas, elle n'est pas autorisée.

## Vie privée et consentement

Vercel Web Analytics ne pose aucun cookie et n'effectue aucun
fingerprinting. Aucun bandeau de consentement n'est ajouté par cette
instrumentation. **Point d'attention pour l'équipe légale (non traité
ici) :** la page `/confidentialite` affirme aujourd'hui que "le site
n'utilise aujourd'hui aucun cookie de mesure d'audience ni de publicité"
— cette phrase reste vraie au sens strict (aucun cookie n'est posé), mais
elle mériterait d'être mise à jour pour mentionner explicitement l'usage
d'un outil de mesure d'audience cookieless, par transparence. Aucune
modification du contenu juridique n'a été faite dans ce chantier.

## Environnements

- **Développement** (`npm run dev`) : aucun appel réseau, les événements
  sont logués en console par le SDK.
- **Preview / Production (Vercel)** : envoi réel, distingué nativement par
  Vercel (aucune configuration de notre côté).
- Aucune variable d'environnement à ajouter : le SDK se base sur les
  variables système Vercel (`VERCEL_URL`), déjà présentes sur la
  plateforme.

---
title: Audit qualité frontend — performance, accessibilité, responsive
level: production-readiness
lastUpdated: 2026-09-02
---

# Audit qualité frontend production

Chantier distinct du contenu pédagogique et de l'audio humain : performance,
Core Web Vitals, accessibilité (WCAG 2.2 AA visé), responsive, Safari/iOS,
clavier, et architecture React/Next.js. Pas un audit Lighthouse seul — lecture
de code systématique par catégorie, corrections appliquées quand elles sont
sûres et justifiées, sinon documentées sans y toucher.

**Contraintes respectées** : aucune identité visuelle changée sans raison
(seule exception justifiée : le contraste des bordures de champ, §Accessibilité),
aucun contenu pédagogique retiré, aucune abstraction lourde introduite à la
place d'une solution stable, rien poussé/déployé, pas de `pkill` global (arrêt
ciblé du process `next dev` uniquement).

---

## 1. Baseline (avant)

| Élément | Constat |
|---|---|
| Routes `app/` | 26 pages/routes (build), 15 pages marketing/légales + 6 pages pédagogie + 5 routes API |
| Composants | 65 fichiers `.tsx` (26 dans `app/`, 39 dans `components/`) |
| Composants client (`"use client"`) | 22 / 65 |
| Images | **Aucune** — ni `<img>`, ni `next/image`, ni asset non-audio dans `public/` (hors favicon). Site 100 % texte/SVG inline (`components/ui/icons.tsx`) |
| Fonts | 1 police (`Geist`, `next/font/google`, subset `latin`, auto-hébergée) |
| CSS | 1 fichier (`app/globals.css`, 55 lignes) + Tailwind v4 utilitaire (JIT, pas de feuille de style morte possible par construction) |
| Scripts tiers | `@vercel/analytics` uniquement (chargé via `<Analytics />` dans le layout racine) |
| Dépendances runtime | 7 (`next`, `react`, `react-dom`, `@neondatabase/serverless`, `@vercel/analytics`, `resend`, `stripe`) — les 4 dernières toutes confirmées utilisées, aucune morte |
| JS client buildé | ~1,2 Mo cumulés sur 25 chunks (`.next/static/chunks`), dominés par les chunks framework React/Next (~780 Ko à eux 4) — pas de bibliothèque tierce lourde détectée dans le bundle app |
| Tests avant ce chantier | 40 tests (contenu pédagogique + pipeline audio), aucun test de composant React |
| `not-found.tsx` / `error.tsx` | Absents — 404 et erreurs de rendu tombaient sur les pages génériques Next.js, sans header ni identité du site |

---

## 2. Composants client vs serveur (Phase 2)

Revue des 22 `"use client"`. Tous sont légitimes :

- **Interaction locale pure** (menu mobile, accordéons, formulaires contrôlés) : `Header`, `AppHeader`, `Pricing` (FAQ accordéon), `ExamExperience` (accordéon règles).
- **`localStorage`** (progression hors-ligne, cf. `lib/pedagogy/useProgress.ts`) : `ParcoursPage`, `ModuleExperience`, `StageExperience`, `progression/page.tsx`, `PrimaryCta`, `DailySessionCard` — ne peuvent pas devenir Server Components sans perdre le fonctionnement hors compte, qui est un choix produit explicite (voir commentaire `AuthProvider.tsx`).
- **Session/auth côté client** (`AuthProvider`, `AccountStatus`, formulaires auth) : l'état de session est volontairement hydraté client-side (`/api/auth/me`) plutôt que lu via `cookies()` dans le layout racine, pour garder la majorité du site statique/cacheable — compromis déjà documenté dans le code, accepté tel quel (un flash "déconnecté" bref plutôt que de rendre tout le site dynamique).
- **Exercices** (`AudioExercise`, `QuizQuestion`, `ExerciseCard`, `WrittenExercise`, `SpokenExercise`) : état de réponse/soumission par nature interactif.

**Aucune conversion forcée** : chaque "use client" a une vraie raison d'exister. Pas de composant statique injustement marqué client.

---

## 3. Bundle (Phase 3)

- Dépendances lourdes (`stripe`, `resend`) confirmées **strictement server-only** : tracées jusqu'à leurs seuls importeurs (`lib/commerce/stripe.ts` ← `app/offre/page.tsx` [Server Component] + 2 routes API ; `lib/auth/mailer.ts` ← `app/actions/auth.ts` + `lib/auth/password-reset.ts`). `CheckoutButton.tsx` (client) appelle `/api/checkout` par `fetch`, n'importe jamais le SDK Stripe. Aucune fuite dans le bundle client.
- Aucune dépendance npm inutilisée détectée (les 7 dépendances runtime sont toutes référencées).
- Duplication notable mais non corrigée : `components/layout/Header.tsx` et `AppHeader.tsx` partagent ~90 % de leur structure (motif sticky + menu mobile). Fusionner en un composant paramétrable économiserait quelques lignes mais risquerait de complexifier un pattern aujourd'hui simple à lire pour un gain réel négligeable (pas de duplication de chunk JS côté navigateur, juste de source) — **non touché**, conforme à la consigne de ne pas remplacer une solution stable par une abstraction.
- Pas de code mort trouvé (`console.log`/`console.debug` de debug : aucun).

---

## 4. Images (Phase 4)

Rien à optimiser : **zéro image** dans l'application (confirmé par recherche exhaustive `<img>` / `next/image` / `public/*` hors audio). Le site est entièrement texte + SVG inline, donc aucun problème de poids, format, dimension ou lazy loading possible par construction.

**Gap documenté, non corrigé** : `app/layout.tsx` ne déclare pas d'image Open Graph (`openGraph.images` absent). Un partage sur les réseaux sociaux n'affichera donc pas de vignette. Corriger proprement demanderait soit un vrai visuel (travail de design, hors périmètre "ne pas changer l'identité visuelle"), soit une image Open Graph générée par code (`opengraph-image.tsx`) qui introduirait une nouvelle pièce visuelle non demandée par ce chantier — **volontairement laissé en l'état**, à trancher par une décision produit plutôt qu'une correction technique.

---

## 5. Fonts (Phase 5)

`Geist` via `next/font/google` : auto-hébergée, `font-display: swap` implicite, métriques de fallback générées automatiquement par Next (`ascent-override` etc.) → pas de FOIT (texte invisible), CLS de police minimal par construction. Un seul subset (`latin`), cohérent avec un site 100 % français. **Rien à corriger.**

---

## 6. CLS (Phase 6)

- Fonts : voir §5, déjà optimisé par `next/font`.
- Lecteur audio (`AudioExercise.tsx`) : l'espace du lecteur est réservé dans tous les états (chargement, lecture, erreur) — pas de saut de layout quand la bascule humain→synthétique→erreur se produit (voir chantier audio).
- `AccountStatus` (état de session) : réserve `h-5` pendant le chargement (`if (loading) return <div className="h-5" .../>`) — évite un saut quand le header passe de "chargement" à "connecté"/"déconnecté". Déjà en place, confirmé correct.
- Barres de progression (`ProgressBar`, `ProgressPreviewCard`) : largeur/hauteur fixes (`h-2.5`), remplissage animé en largeur interne, ne fait pas varier la hauteur du conteneur. **Rien à corriger.**

---

## 7. LCP (Phase 7)

- **Accueil** (`/`) : élément LCP = le `<h1>` du Hero, rendu côté serveur (pas de `"use client"` sur `Hero.tsx`), texte pur (pas d'image ni de police bloquante) → LCP au plus tôt possible pour ce type de contenu.
- **Parcours / Module** : élément LCP = titre de page (`<h1>` ou équivalent), même raisonnement.
- **Offre** : idem, page serveur, titre + argumentaire texte.

Aucune ressource critique (image, police externe, script bloquant) ne retarde le rendu initial sur ces 4 routes. **Rien à optimiser.**

---

## 8. Interactivité / React (Phase 8)

- `lib/pedagogy/useProgress.ts` : déjà exemplaire — `useSyncExternalStore` (pas `useState`+`useEffect`) pour synchroniser `localStorage` entre composants montés simultanément, écritures debouncées (800 ms) vers `/api/progress`, fusion de compte idempotente et déclenchée une seule fois par connexion (garde-fou module-scope). Aucun `useEffect` superflu trouvé dans ce fichier central.
- Pas de grosse liste sans clé, pas de recalcul lourd identifié dans les composants de rendu d'exercice (les `.map()` sur `exercise.questions`/`choices` portent tous une `key` stable).
- **Non micro-optimisé** volontairement : aucun `useMemo`/`useCallback` ajouté sans preuve de re-render coûteux — la base de code n'a pas de liste de plusieurs centaines d'éléments qui le justifierait.

---

## 9-11. Accessibilité WCAG / clavier / lecteur d'écran

### Corrigé

1. **Lien d'évitement absent** (WCAG 2.4.1 Bypass Blocks) — un utilisateur clavier devait traverser toute la navigation du header à chaque page avant d'atteindre le contenu. Ajouté dans `Header.tsx` et `AppHeader.tsx` (`sr-only focus:not-sr-only`, invisible tant qu'il n'a pas le focus clavier — aucun changement visuel pour les autres utilisateurs) + `id="main-content"` ajouté aux 15 balises `<main>` de l'app. Testé (voir `components/layout/Header.test.tsx`).
2. **Contraste insuffisant des champs de formulaire** (WCAG 1.4.11, non-text contrast) — la bordure des `<input>`/`<textarea>`/`<select>` réels (`--border: #e3dfd3` sur `--background: #faf9f5`) ne fait que ~1,3:1, très en dessous du minimum 3:1 pour la limite d'un composant d'interface. Nouveau token `--input-border: #767f8c` (≥3,8:1 sur fond de page et sur carte blanche), appliqué **uniquement** aux 12 champs de saisie réels (formulaires auth + réponse courte/texte à trous/association), jamais aux cartes ou séparateurs décoratifs qui utilisent encore `--border` tel quel — pas de changement d'identité visuelle en dehors des champs de formulaire.
3. **`scroll-behavior: smooth` inconditionnel** (motion) — appliqué même pour les utilisateurs ayant demandé moins de mouvement. Enveloppé dans `@media (prefers-reduced-motion: no-preference)`.
4. **`animate-pulse` inconditionnel** sur l'indicateur d'enregistrement (`SpokenExercise.tsx`) — passé en `motion-safe:animate-pulse`.
5. **`min-h-screen` → `min-h-dvh`** (voir §14 Safari).

### Vérifié conforme, non modifié

- **Contrastes de couleur** (calcul WCAG formel sur tous les tokens de `globals.css`) : `foreground`/`background` 14,9:1, `muted-foreground`/`background` 5,7:1, `primary-foreground`/`primary` 8,8:1, `secondary-foreground`/`secondary` 6,8:1 — tous ≥ AA. Seul `success-foreground`/`success` est à 3,4:1 (sous le seuil texte 4,5:1), mais vérifié que cette paire n'habille jamais du texte réel — uniquement une icône `CheckIcon` dans un badge `aria-hidden`, qui ne relève que du seuil non-text (3:1, respecté).
- **Landmarks** : `<header>`, `<main>` (unique par page, désormais adressable), `<footer>` présents partout ; navigation avec `aria-label` distinct (desktop/mobile).
- **Formulaires** : tous les champs ont un `<label htmlFor>`, `autoComplete` correct (`email`, `current-password`, `new-password`), erreurs en `role="alert"` (annoncées automatiquement, pas besoin de déplacer le focus).
- **Éléments cliquables** : recherche exhaustive de `<div onClick>`/`<span onClick>` — aucun résultat, tous les contrôles interactifs sont des `<button>`/`<a>`/`<label><input>` sémantiques natifs, donc nativement accessibles au clavier sans piège.
- **Radios/checkbox** (QCM, vrai/faux, test de niveau) : natifs (`type="radio"`), pas de widget custom réinventé — tab order et annonce lecteur d'écran gérés par le navigateur.
- **Modales** : aucune dans l'application (recherche `role="dialog"`/`<dialog>`/`Modal` : 0 résultat) — rien à auditer pour le focus trap.
- **`aria-hidden`** utilisé correctement sur les icônes décoratives redondantes avec le texte adjacent (`CheckIcon`, `HeadphonesIcon`, etc.).

### Non testé en conditions réelles

Le lecteur d'écran n'a pas été exécuté (VoiceOver/NVDA non disponibles dans cet environnement) — l'audit ci-dessus est une lecture de la sémantique HTML/ARIA, pas une écoute réelle. Recommandé avant mise en production.

---

## 12-13. Mobile / responsive / touch (Phases 12-13)

**Limite d'outillage** : le navigateur automatisé disponible dans cette session n'a pas permis de capturer des captures d'écran à une largeur mobile réelle (`resize_window` n'a pas affecté le rendu de l'onglet dans cet environnement) — l'audit ci-dessous est une revue statique du code (classes Tailwind responsives), pas une vérification visuelle pixel par pixel à 320/375/390/430/768px.

- **Aucune largeur fixe dangereuse trouvée** : recherche exhaustive de `w-[NNpx]`/`min-w-[NNpx]` et de classes `w-*` larges sans préfixe responsive → un seul résultat (`max-w-[14ch] truncate` sur l'email du compte, qui est une protection *contre* le débordement, pas une largeur dangereuse).
- **Aucune table** dans l'app (source classique de scroll horizontal) — 0 résultat.
- **`overflow-hidden`** : seulement 2 usages, tous deux sur des barres de progression (masque le remplissage interne à la forme arrondie), aucun ne masque de contenu réel.
- **Header/AppHeader** : déjà responsive (`hidden lg:flex` / `lg:hidden`), menu mobile en overlay plein-largeur — comportement déjà correct avant ce chantier (`AppHeader.tsx` porte d'ailleurs un commentaire expliquant qu'il a été corrigé pour ça lors d'un chantier précédent).
- **Footer** : grille responsive déjà en place (`grid-cols-2 sm:grid-cols-4`).
- **Zones tactiles** : les boutons utilisent une hauteur cohérente via `buttonClasses` (`h-11`/`h-12`, soit 44-48px, au-dessus du minimum WCAG 2.5.8 24px) ; le bouton menu mobile fait `h-10 w-10` (40px, également conforme) ; les lignes de choix radio (QCM, test de niveau) sont des `<label>` avec `px-3 py-2.5`, élargissant largement la zone cliquable au-delà du seul cercle radio natif.
- **Observation mineure non corrigée** : `ExamCard.tsx` utilise `grid-cols-3` sans repli mobile pour 3 statistiques courtes (Durée/Sections/Seuil) — à 320-375px, les libellés ("Seuil de réussite") se compressent et wrappent sur plusieurs lignes. Ce n'est pas un bug de débordement horizontal (CSS Grid `1fr` ne pousse jamais hors du conteneur), seulement une densité visuelle cosmétique — laissé tel quel plutôt que retouché sans vérification visuelle réelle.

---

## 14. Safari / iOS (Phase 14)

**2 corrections appliquées** (voir détail ci-dessous) : `100vh` → `dvh`, et taille de police des champs de formulaire sous 16px sur mobile.

- **`100vh` / `min-h-screen`** : corrigé — remplacé par `min-h-dvh` (dynamic viewport height) dans `app/layout.tsx` (body) et `app/(pedagogie)/layout.tsx`, pattern connu pour éviter l'espace vide/le débordement causé par la barre d'adresse rétractable de Safari iOS. Tailwind v4 supporte `dvh` nativement, aucune dépendance ajoutée.
- **`position: sticky`** (headers) : utilisé avec `top-0`, pattern standard supporté par Safari iOS moderne — pas de `-webkit-` préfixe requis pour les versions ciblées raisonnables (iOS 13+).
- **`backdrop-blur` + `supports-[backdrop-filter]`** : déjà écrit avec un repli conditionnel (`supports-[backdrop-filter]:bg-background/80`), c'est exactement le pattern recommandé pour la compatibilité Safari (qui a longtemps eu besoin du préfixe `-webkit-backdrop-filter`, que Tailwind gère automatiquement via autoprefixer intégré).
- **Inputs de formulaire** : `type="email"`/`type="password"` corrects (déclenchent le bon clavier virtuel iOS). **Corrigé** : les champs utilisent `text-sm` (14px), **sous le seuil de 16px** en dessous duquel Safari iOS zoome automatiquement toute la page au focus d'un champ — risque réel et systématique (touche les 4 formulaires auth + les réponses libres d'exercice). Plutôt que de changer `text-sm` partout (aurait touché la taille de texte visible sur desktop aussi), règle CSS ciblée uniquement sous 640px (`app/globals.css`) : `input, textarea, select { font-size: 16px }` — le texte desktop (`text-sm`, 14px) reste inchangé, seul le comportement mobile (zoom au focus) est neutralisé.
- **Audio** : voir le chantier audio humain dédié (`docs/b1/audio-human-recording-plan.md`) — lecteur `<audio controls>` natif, pas de lecture automatique forcée (bloquée par Safari de toute façon), filet d'erreur déjà robuste.

---

## 15. Motion (Phase 15)

Voir §9-11 (corrigé : `scroll-behavior` et `animate-pulse` respectent désormais `prefers-reduced-motion`). Recherche exhaustive de `@keyframes`/`animate-*`/transitions non triviales : rien d'autre trouvé — le reste des `transition-colors` (survol de liens/boutons) est un changement de couleur, pas un mouvement, hors du périmètre de `prefers-reduced-motion` (qui cible le déplacement/l'animation, pas les transitions de couleur).

---

## 16. Formulaires (Phase 16)

Les 4 formulaires auth (`LoginForm`, `SignupForm`, `ForgotPasswordForm`, `ResetPasswordForm`) suivent tous le même patron déjà solide :

- `autoComplete` correct par champ.
- `type` HTML adapté (`email`, `password`).
- `<label htmlFor>` sur chaque champ.
- Erreur en `role="alert"`.
- État `pending` (via `useActionState`) désactive le bouton et change son libellé ("Connexion…").
- Succès : redirection + `router.refresh()` pour resynchroniser l'état serveur.

**Rien de cassé, rien à corriger** au-delà du contraste de bordure déjà traité en §9-11.

---

## 17. Réseau lent / offline (Phase 17)

- **Audio** : filet de secours déjà robuste (chantier audio dédié) — humain → synthétique → état d'erreur avec bouton **Réessayer**, jamais de lecteur figé indéfiniment (délai de sécurité 4 s par tentative).
- **`useProgress`** : `scheduleServerSync` échoue silencieusement et proprement hors ligne (`.catch(() => {})`), la progression reste valide localement, retentera à la prochaine écriture — déjà correct.
- **`AuthProvider`** : `refresh()`/chargement initial catchent aussi les erreurs réseau, gardent le dernier état de session connu plutôt que de planter.
- **Formulaires** : `pending` désactive le bouton pendant la requête, évitant les doubles soumissions sur un réseau lent.

**Rien de cassé identifié** dans ce périmètre ; comportements déjà défensifs.

---

## 18. 404 / erreurs (Phase 18)

**Corrigé** — absents avant ce chantier :

- `app/not-found.tsx` : remplace la page 404 générique Next.js par une page à l'identité du site (Header, message clair, deux CTA de retour : accueil / parcours).
- `app/error.tsx` : filet de secours pour une erreur de rendu non interceptée ailleurs (sans lui, écran blanc générique en production) — bouton **Réessayer** (`reset()`) + retour à l'accueil, log console pour le débogage local (pas de service de tracking d'erreurs configuré dans ce chantier, hors périmètre).

---

## 19. CSS (Phase 19)

- Pas de feuille de style morte possible par construction (Tailwind v4 JIT ne génère que les classes réellement référencées).
- Un seul fichier CSS manuel (`globals.css`, 55 → 68 lignes après ce chantier), pas de duplication de règles.
- Nouveau token `--input-border` ajouté proprement dans `:root` et `@theme inline`, documenté en commentaire (pourquoi il existe, où il s'applique).
- Aucun `overflow-hidden` masquant du contenu réel (voir §12-13).
- Pas de valeur magique introduite par ce chantier — la seule nouvelle couleur (`#767f8c`) est dérivée par calcul de contraste documenté dans le commentaire CSS, pas choisie arbitrairement.

---

## 20. Tests ajoutés

Avant ce chantier : 0 test de composant React (uniquement des tests de données/logique pure). Ajout de `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom` en devDependencies (environnement `jsdom` activé par fichier via `// @vitest-environment jsdom`, le reste de la suite reste en environnement `node`, plus rapide, par défaut).

**`components/layout/Header.test.tsx`** (4 tests, sur `Header` et `AppHeader`) :
- le lien d'évitement cible bien un `#main-content` qui existe réellement sur la page (empêche une régression silencieuse si l'un des deux dérive) ;
- le menu mobile démarre fermé, s'ouvre/se ferme au clavier (`Enter` sur le bouton), avec `aria-expanded` synchronisé.

Testé positif : régression injectée (`href` du skip link cassé) → test rouge, confirmé, puis restauré.

---

## 21-22. Build et smoke test

- `npm test` : **40/40 verts** (36 existants + 4 nouveaux).
- `eslint` : 0 erreur.
- `tsc --noEmit` : 0 erreur.
- `next build` : succès, 26 routes (inchangé — `not-found.tsx` remplace la route existante `/_not-found`, n'en ajoute pas).
- Smoke test navigateur : accueil chargé sans erreur console, layout desktop vérifié visuellement. Les pages nécessitant `DATABASE_URL` (parcours/module, connexion en base) n'ont pas pu être smoke-testées de bout en bout dans cet environnement (pas de Postgres configuré) — limite déjà rencontrée et documentée lors du chantier audio.

---

## 23. Conclusion par domaine

| Domaine | État |
|---|---|
| Performance / bundle | Déjà sain (pas d'image, pas de lib lourde côté client, JS raisonnable) — rien de cassé à corriger |
| Accessibilité | 4 corrections appliquées (skip link, contraste champs, 2× motion) ; reste : test lecteur d'écran réel non fait |
| Responsive/mobile | Revue statique favorable, pas de vérification visuelle pixel par pixel (limite d'outillage) |
| Safari/iOS | 2 corrections (`dvh`, taille de police des champs sous 640px) |
| Erreurs/404 | 2 pages ajoutées, absentes avant |
| Tests | 4 nouveaux tests de composant, suite passée de 0 à 4 tests UI |

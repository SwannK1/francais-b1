---
title: Release candidate — A1/A2/B1 + positionnement public
type: product-audit
lastUpdated: 2026-09-07
---

# Release candidate

Consolidation de `chantier/v1-polish` (d43eafb) et `chantier/positioning-a1-b1`
(8fdcca6) sur la branche `chantier/release-candidate` (commit d'intégration
70e6c39, plus le commit final de ce chantier). Objectif : une seule branche
cohérente, testée, prête pour revue avant merge vers `main` — ni mergée ni
poussée par ce chantier.

Ce document ne réaudite pas tout depuis zéro : il pointe vers les documents
déjà produits par les chantiers en amont et ne détaille que ce que
l'intégration elle-même a changé.

## Base technique

- **v1-polish** (d43eafb) : produit A1+A2+B1 techniquement consolidé —
  `isReadyForB1` rendu mathématiquement atteignable (711f882), analytics
  du funnel demandé complétées (718c289), premier passage de wording
  B1-only sur Hero/Footer/plans.ts/SITE_DESCRIPTION (98b4da9, 0648da8),
  audits sécurité/audio/gratuit-premium (aeaa58c), verdict "READY WITH
  MINOR LIMITATIONS" — détail complet dans `docs/product/v1-readiness.md`
  et `docs/product/free-premium-audit.md`.
- **positioning-a1-b1** (8fdcca6) : repositionnement public complet — voir
  `docs/product/positioning-a1-b1.md`.

## Positionnement A1 → A2 → B1

Promesse : *"Apprends le français pour vivre en France avec plus
d'autonomie."* Nouvelles sections homepage (`Levels`, `Benefits`),
navigation app enrichie (Parcours/Réviser/Oral/Progression/Offre), un seul
CTA "Tester mon niveau" partout. Détail complet, règles de wording et
éléments à tester avec de vrais utilisateurs : `docs/product/positioning-a1-b1.md`.

## Diagnostic / test de niveau

Deux routes coexistent volontairement : `/test-niveau` (entrée principale,
intégrée à `useProgress`, référencée partout) et `/diagnostic` (18
questions adaptatives, bilan par compétence, plus complet mais
volontairement non branché sur `useProgress` — décision antérieure au
chantier positioning, non remise en cause ici). Le résultat de
`/test-niveau` propose désormais `/diagnostic` comme option secondaire
("Envie d'un bilan plus détaillé ?"), jamais comme CTA concurrent.

## Parcours A1 → A2 → B1

Testés en injectant directement les 3 niveaux dans `localStorage`
(`francais-b1:user-progress`) : `/parcours` affiche un titre et un badge de
niveau corrects et dynamiques dans les 3 cas ("Ton parcours A1" · A1 ·
Découverte, "Ton parcours A2" · A2 · Intermédiaire, "Ton parcours B1" · B1
· Autonome — badges hérités de v1-polish, inchangés). Aucune copie "B1"
générique fausse restante (garde statique `lib/seo/positioning.test.ts`).

## Progression / isReadyForB1

Le correctif v1-polish (711f882, `currentStage` plutôt que
`completedStages === totalStages`, qui ne pouvait mathématiquement jamais
être vrai) est préservé intact — aucun fichier qu'il touche
(`lib/pedagogy/logic/parcours.ts`, `ProgressionExperience.tsx`) n'est
modifié par l'intégration du positioning. Ses 7 tests dédiés
(`lib/pedagogy/logic/__tests__/parcours.test.ts`) passent toujours,
vérifié isolément après merge.

## Révision espacée / séance du jour / oral / évaluations

Inchangés par l'intégration (aucun fichier en commun avec le chantier
positioning). Testés fonctionnellement après merge : `/reviser`,
`/parcours/seance`, `/oral` (exercices A1 gratuits, A2/B1 premium,
cohérent), `/parcours/evaluations` (4 bilans/passages, toujours premium)
rendent correctement pour les 3 niveaux injectés.

## Offre / premium

`/offre` et `lib/commerce/plans.ts` reflètent le produit réel : parcours
complet A1→B1 (des dizaines de modules, pas de chiffre codé en dur),
audios à chaque niveau, pratique orale, évaluations de passage, examens
DELF A2 et B1 + évaluation finale A1 (fait vérifié contre
`lib/pedagogy/data/exams-public.generated.ts`, corrigeant une
généralisation trop large de la première version du positioning). Logique
tarifaire inchangée (9,99 €/mois, un seul abonnement).

**Asymétrie gratuit/premium non arbitrée ici** : la découverte gratuite
n'ouvre que 2 modules B1 (`se-presenter`, `decrire-vie-quotidienne`),
aucun module A1/A2. La première version du chantier positioning avait
corrigé ça unilatéralement (un module gratuit par niveau) ; ce correctif a
été retiré pendant cette intégration, car la même asymétrie avait déjà été
documentée deux fois avant ce chantier comme décision commerciale hors
périmètre technique (`docs/integration/product-v1.md` § 5,
`docs/product/free-premium-audit.md`) — la rouvrir une troisième fois sans
mandat explicite n'est pas le rôle d'une consolidation de release
candidate. Le wording (`FREE_PLAN_FEATURES`, FAQ) a été ajusté pour rester
honnête sur ce point plutôt que de promettre "à ton niveau". **Décision
produit encore à trancher avant ou après lancement** — voir Limites
restantes.

## Navigation

`AppHeader` : Parcours / Réviser / Oral / Progression / Offre (5 entrées,
`Header` marketing inchangé). `Footer` : libellés A1→B1 cohérents
("Parcours A1 → B1", colonne "Ressources niveau B1" pour les 4 pages SEO
dédiées B1, légitimement B1-scoped).

## SEO

`SITE_DESCRIPTION`, title par défaut, OG image, metadata de `/parcours`,
`/offre`, `/test-niveau`, `/a-propos`, `/faq`, `/cgv` cohérents A1→B1. Les
4 pages SEO B1 dédiées (`/francais-b1`, `/exercices-b1`, `/grammaire-b1`,
`/comprehension-orale-b1`) restent intactes — B1 y est le vrai sujet. Les 8
tests SEO existants (`scripts/seo.test.ts`) passent toujours, aucune
régression.

## Analytics

Taxonomie `lib/analytics/events.ts` vérifiée après merge : 39 événements,
tous uniques (vérifié programmatiquement), aucun doublon introduit par
l'intégration. Couvre le funnel
demandé — diagnostic (started/completed), module (started/completed),
séance du jour (started/completed), audio (play_started/completed/retry/error),
révision (review_page_viewed), oral (speaking_*), évaluations
(assessment_started/completed), paywall (paywall_viewed). Détail complet :
`docs/product/analytics-plan.md`.

## Audio

`node scripts/audio-status.mjs` : 114 pistes, 0 manquante, 0 humaine (100%
synthétique — backlog d'humanisation intact, rien régénéré ici). Aucune
route audio cassée, aucun import perdu, A1/A2/B1 toujours raccordés à
leurs modules/examens réels.

## Sécurité premium

`.next/static` regrepé après build : aucune chaîne de réponse réelle
(`correctAnswer`, données d'assessment) trouvée — seules des occurrences de
noms de champs dans le code des composants (attendu). Tests
`lib/assessment/data/no-client-leak.test.ts` et
`lib/pedagogy/data/modules-public.test.ts` (9 tests) exécutés isolément
après merge : passent.

## QA mobile / desktop

`resize_window` de l'outil navigateur ne redimensionne pas réellement le
viewport dans cet environnement (confirmé à nouveau : `window.innerWidth`
reste à la largeur desktop quelle que soit la taille demandée). Contourné
par la même technique que v1-polish : un `<iframe>` de largeur fixe établit
son propre contexte de viewport CSS. Testé à 320px, 375px et 768px sur `/`,
`/diagnostic`, `/test-niveau`, `/parcours`, `/progression`, `/reviser`,
`/oral`, `/offre`, `/parcours/evaluations`, et un module par niveau
(A1 : `se-presenter-a1`, A2 : `se-presenter-en-detail`, B1 : `se-presenter`)
— aucun débordement horizontal (`scrollWidth > clientWidth`) sur aucune
route, aux 3 largeurs. Spot-check visuel (capture d'écran) sur `/` et
`/offre` à 375px : mise en page propre, titres bien enveloppés, boutons
pleine largeur, aucun texte coupé.

Desktop : navigation fonctionnelle complète effectuée pendant l'audit
(homepage, parcours A1/A2/B1, progression, offre) sans anomalie visuelle
ni erreur console imputable à l'intégration.

## Limites restantes

- **Asymétrie gratuite A1/A2 vs B1** (voir § Offre/premium ci-dessus) :
  décision produit non tranchée, documentée trois fois maintenant. À
  arbitrer explicitement avant ou peu après le lancement — soit ouvrir un
  échantillon gratuit par niveau (implémentation triviale, déjà prototypée
  puis retirée dans l'historique de ce chantier), soit assumer et
  documenter publiquement que la découverte gratuite cible spécifiquement
  le B1.
- `/diagnostic` reste non branché sur `useProgress` (décision antérieure,
  non remise en cause) : le compléter ne met pas à jour le niveau réel de
  l'utilisateur.
- `mentions-legales` affiche encore "France B1 (provisoire)" comme nom
  commercial légal — champ d'identité administrative en attente
  d'immatriculation, hors périmètre de tous les chantiers produit/UX.
- QA mobile non exhaustif : contrôles audio en lecture, modales, formulaires
  d'authentification non testés spécifiquement à 320/375/768px.
- **Prochain chantier proposé : HUMANISATION AUDIO A1/A2/B1** — 114 pistes
  actuellement 100% synthétiques (voir `docs/audio/humanisation-backlog.md`
  pour le détail technique et les paires thématiques faibles déjà
  identifiées, ex. A2 "se repérer en ville" sur une annonce de gare, A1
  "santé" réduit à un horaire de rendez-vous).

## Verdict

**READY WITH MINOR LIMITATIONS.**

Lint, typecheck (via build), 491 tests Vitest + 8 tests SEO, et build
production passent tous sans erreur. A1/A2/B1 fonctionnent de bout en bout
(parcours, progression, révision, séance, oral, évaluations). Positionnement
public cohérent avec le produit réel, sécurité premium et SEO intacts,
analytics complets sans doublon. Git propre.

Non bloquant mais à trancher avant un lancement pleinement assumé :
l'asymétrie gratuite A1/A2 vs B1 (décision produit, pas un défaut
technique) et l'humanisation audio (déjà backlogée, hors périmètre
release candidate).

---
title: Audit diagnostic → progression
type: product-audit
lastUpdated: 2026-09-08
---

# Audit diagnostic → progression

Chantier `chantier/diagnostic-progress`, base `chantier/launch-polish`
(qui avait déjà corrigé un premier bug de routage niveau-agnostique dans
`getNextModule`, voir `docs/product/launch-polish-audit.md`). Ce chantier
va plus loin : il audite précisément comment le résultat du diagnostic vit
dans le temps, et corrige deux bugs de fond trouvés pendant l'audit lui-même
(pas seulement le bug déjà connu). Chaque section ci-dessous répond aux
10 questions posées, à l'état du code **avant correction** sauf mention
contraire — l'état après correction est dans
`docs/product/diagnostic-progress-integration.md`.

## 1. Où le résultat du diagnostic est-il stocké aujourd'hui ?

Deux outils distincts, deux réponses différentes :

- **`/test-niveau`** (le vrai test de positionnement, seul lié au CTA
  principal partout dans l'app) : le résultat écrit `progress.level` et
  `progress.placementCompletedAt` dans `UserProgress`
  (`lib/pedagogy/useProgress.ts`, `markPlacementCompleted`), qui vit en
  `localStorage` (clé `francais-b1:user-progress`) puis, pour un compte
  connecté, en base via `/api/progress`.
- **`/diagnostic`** (bilan détaillé à 18 questions, optionnel, proposé
  depuis l'écran de résultat de `/test-niveau`) : calcule une
  recommandation (`lib/diagnostic/recommendation.ts`) mais ne l'écrit
  **nulle part** — état de composant React uniquement
  (`DiagnosticClient.tsx`), explicitement documenté comme volontairement
  isolé de `useProgress`/`UserProgress` (`lib/diagnostic/types.ts`).

## 2. Est-il persisté ?

`/test-niveau` : oui (localStorage, puis compte si connecté).
`/diagnostic` : non, perdu à la navigation.

## 3. Est-il relié au compte ?

`/test-niveau` : oui, via `/api/progress` (sync en tâche de fond,
debounce 800 ms) et `/api/progress/merge` (fusion à la connexion).
`/diagnostic` : non, aucun lien.

## 4. Influence-t-il réellement le parcours ?

`/test-niveau` : oui, mais avec deux angles morts trouvés et corrigés par
ce chantier (voir § Bugs trouvés ci-dessous) :
- **Avant ce chantier** : un nouveau résultat de test (même erroné, même
  refait par accident) écrasait `progress.level` sans jamais regarder si
  l'utilisateur avait déjà une vraie progression à un niveau supérieur.
- **Avant ce chantier** : une fois `progress.level` fixé, il ne bougeait
  plus jamais tout seul — un apprenant qui termine tout son niveau évalué
  et avance naturellement au niveau suivant via `/parcours` gardait un
  `progress.level` obsolète, qui capait silencieusement `/progression` et
  la séance du jour sur l'ancien niveau (voir § 5-6).

`/diagnostic` : non, aucune influence sur le parcours réel au-delà du lien
de sa propre page de résultat vers une étape (`stageSlug`), qui ne mène à
rien de personnalisé au-delà de ce clic ponctuel.

## 5. Influence-t-il la séance du jour ?

Oui, via `progress.level` : `buildDailySession`
(`lib/daily/session-engine.ts`) filtrait son catalogue avec
`modules.filter(mod => mod.level === progress.level)` — un filtre exact,
pas un plancher. **Bug trouvé** : ce filtre exact, combiné à un
`progress.level` qui ne bouge jamais tout seul (§ 4), pouvait bloquer
totalement la séance du jour dès qu'un niveau évalué était entièrement
terminé (plus aucun module incomplet dans le sous-ensemble filtré → `null`
→ "rien à faire aujourd'hui"), alors qu'un vrai contenu existait au niveau
suivant. Corrigé (voir § intégration).

## 6. Influence-t-il la progression initiale ?

Oui pour un nouvel apprenant (cas normal, sain). Le bug est dans la durée :
`progress.level` reste un simple point de départ figé, jamais recalculé —
`/progression` filtrait ses modules affichés avec ce même champ exact
(`ProgressionExperience.tsx`), avec la même conséquence que pour la
séance du jour : un apprenant qui avance réellement au-delà de son niveau
évalué voyait son propre bilan masquer sa vraie progression la plus
récente.

## 7. Influence-t-il la recommandation ?

Oui (`getNextModule`, `lib/pedagogy/logic/recommendation.ts`). Le plancher
de niveau ajouté par `chantier/launch-polish` empêchait déjà de proposer
un module en dessous du niveau annoncé — mais utilisait `progress.level`
brut, avec le même angle mort de "niveau jamais remis à jour" que ci-dessus.
Corrigé pour utiliser le niveau *effectif* (§ intégration).

## 8. Est-il perdu après refresh ?

`/test-niveau` : non, persisté (localStorage lu au montage via
`useSyncExternalStore`). `/diagnostic` : oui, entièrement (état composant
volatile, confirmé par lecture directe du code, cohérent avec le
commentaire explicite du fichier).

## 9. Comportement anonyme vs connecté ?

Anonyme : tout vit en localStorage, fonctionne de bout en bout sans compte.
Connecté : synchronisation best-effort vers `/api/progress`, et à la
connexion, fusion via `/api/progress/merge` → `mergeUserProgress`
(`lib/pedagogy/logic/progress.ts`). Fusion des `moduleProgress` par union
(jamais de perte), mais **bug trouvé** dans `resolvePlacement` (la
fonction interne qui décide quel `level`/`placementCompletedAt` retenir
entre les deux côtés) : elle choisissait le côté avec le test le plus
*récent*, sans jamais regarder si l'autre côté avait une vraie activité
prouvant un niveau plus avancé. Concrètement : un compte réel avec
plusieurs modules A2 terminés, retesté par erreur en A1 sur un nouvel
appareil juste avant de se reconnecter, voyait son niveau redescendre à
A1 à la fusion — ses modules restaient bien là (union), mais l'affichage
et les recommandations se basaient sur le niveau redescendu. Corrigé (§
intégration).

## 10. Que se passe-t-il si l'utilisateur a déjà des progrès ?

Avant ce chantier : rien ne protégeait ces progrès contre un nouveau
résultat de diagnostic plus bas, ni côté "retake en direct"
(`markPlacementCompleted`), ni côté fusion de compte (`resolvePlacement`)
— voir § 4 et § 9. Les modules eux-mêmes (`moduleProgress`) n'étaient
jamais perdus (fusion par union déjà saine), seul le champ `level` (et
donc tout ce qui en dépend : badge, filtrage `/progression`, séance du
jour, plancher de recommandation) pouvait régresser silencieusement.

## Bugs trouvés et corrigés par ce chantier

1. **Régression de niveau non protégée** — `resolvePlacementLevel()`
   (nouveau, `lib/pedagogy/logic/progress.ts`) : un nouveau résultat de
   test ne redescend jamais `level` en dessous du plus haut niveau couvert
   par une vraie activité (au moins un exercice complété). Appliqué à
   `markPlacementCompleted` et à `resolvePlacement` (fusion de compte).
2. **Niveau évalué comme plafond permanent** — `getEffectiveLevel()`
   (nouveau, `lib/pedagogy/logic/parcours.ts`) : dérive "où en suis-je
   maintenant" de la vraie étape courante du parcours (même moteur que
   `readyForB1`), pas du seul `progress.level` figé. Remplace l'usage de
   `progress.level` pour le filtrage dans `/progression`,
   `/parcours/seance`, la séance du jour, l'affichage sur `/parcours`, et
   le plancher de `getNextModule`.

Aucun de ces deux bugs n'était documenté par les chantiers précédents
(`v1-polish`, `positioning-a1-b1`, `launch-polish`) — celui de
`launch-polish` (routage niveau-agnostique pour un utilisateur neuf) est
distinct et déjà corrigé sur cette base.

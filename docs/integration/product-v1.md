---
title: Intégration produit V1 — parcours adaptatif A1/A2/B1
type: integration-notes
lastUpdated: 2026-09-06
---

# Intégration produit V1

Ce document décrit l'état final après fusion, sur `chantier/product-integration`
(base : `chantier/integration-a1-a2-b1` @ `afc7ada`), des quatre chantiers
fonctionnels développés en parallèle :

| Chantier | Branche | Commits intégrés |
|---|---|---|
| Diagnostic de niveau | `chantier/diagnostic-level` | `24df746`, `6d4163d`, `67c8f3e` |
| Révision espacée | `chantier/spaced-review` | `772d276`, `3953e69` |
| Séance du jour | `chantier/daily-session` | `825ac73` |
| Oral + évaluations | `chantier/speaking-assessment` | `233c2b4`, `97cf5e8`, `78c198e` |

Tous les quatre partagent le même ancêtre `d172bd7` (ancien main, contenu B1
seul) — voir `docs/integration/a1-a2-b1-integration.md` pour l'état de la
base sur laquelle ils ont été greffés (catalogue unique A1+A2+B1, parcours
continu à 18 étapes).

## 1. Ce que chaque chantier apporte

- **Diagnostic** (`/diagnostic`, `lib/diagnostic/`) : 18 questions maximum,
  arrêt anticipé si le niveau est déjà clair, recommandation de niveau
  A1/A2/B1 + domaines forts/fragiles. Totalement indépendant du cœur
  pédagogique (pas d'écriture dans `UserProgress`), gratuit (non gated).
- **Révision espacée** (`/reviser`, `lib/review/`) : classement des
  compétences (`nouvelle` / `en_apprentissage` / `fragile` / `a_revoir` /
  `maitrisee`) à partir de l'historique réel (`SkillProgress.recentOutcomes`,
  `lastPracticedAt`, ajoutés à `lib/pedagogy/types.ts` par ce chantier).
  Consomme la progression centrale, n'en crée pas de seconde.
- **Séance du jour** (`/parcours/seance`, `lib/daily/`) : séance guidée
  multi-étapes (pas une simple carte-lien), avec des modes contextuels
  (`decouverte`, `reprise`, `consolidation`, `retour_apres_absence`,
  `fin_de_niveau`, `apprentissage`).
- **Oral + évaluations** (`/oral`, `/parcours/evaluations`, `lib/speaking/`,
  `lib/assessment/`) : pratique orale honnête (répétition/lecture, jamais de
  scoring phonétique automatique inventé) + 4 bilans/passages
  (`fin-a1`, `passage-a1-a2`, `fin-a2`, `passage-a2-b1`), chacun noté sur
  plusieurs dimensions, jamais une seule question décisive.

## 2. Bugs d'intégration trouvés et corrigés

Ces quatre chantiers ont chacun été développés en isolation depuis
`d172bd7` (contenu B1 seul), donc sans connaissance du catalogue A1+A2+B1
fusionné ni les uns des autres. Deux classes de bugs réels sont apparues à
l'assemblage — aucun cherry-pick n'a nécessité de résolution de conflit
manuelle (voir §3), mais l'intégration fonctionnelle a révélé ce que le
merge Git seul ne pouvait pas voir :

### 2.1 Diagnostic : recommandations A1/A2 pointant vers une étape B1

`lib/diagnostic/recommendation.ts` avait été écrit avant l'intégration
A1+A2+B1 : à l'époque, la plateforme n'avait aucun contenu A1/A2, donc
recommander "Poser les bases du B1" (`poser-les-bases`) pour un niveau
estimé A1 *ou* A2 était le seul choix possible. Une fois le catalogue A1/A2
fusionné et ce chantier réintégré tel quel, cette recommandation restait
inchangée — un niveau A1 ou A2 renvoyait donc vers du contenu B1, en
sautant tout le contenu de son propre niveau. Corrigé : A1 → `decouverte`
(première étape A1 réelle), A2 → `a2-poser-les-bases` (première étape de
contenu A2 réelle). B1 inchangé (`poser-les-bases` si compétences fragiles,
`argumenter-et-echanger` sinon).

### 2.2 `getParcoursSummary` : étapes practice/bilan bloquant la progression

Bug plus profond, dans le cœur pédagogique partagé
(`lib/pedagogy/logic/parcours.ts`), révélé par l'intégration de la séance
du jour. `getStageCompletionRate` traite les étapes `practice`/`bilan`
comme n'ayant "pas de métrique fiable" et retourne toujours 0 % pour elles
(commentaire d'origine, comportement inchangé). Dans l'ancien parcours B1
seul (6 étapes), ce n'était pas un problème : les deux seules étapes de ce
type (`preparation-examen`, `pret-pour-le-b1`) étaient à la toute fin du
parcours, donc `getParcoursSummary` finissait par y arriver et retournait
correctement `currentStage = null` (comportement voulu : "fin de parcours").
Depuis la fusion A1+A2+B1, chaque niveau a sa propre paire practice/bilan
**au milieu** du parcours de 18 étapes (`a1-preparation-examen`,
`a1-bilan`, `a2-preparation-examen`, `a2-pret-pour-le-b1`, en plus des deux
B1 finales) — la première d'entre elles (`a1-preparation-examen`, étape 5)
bloquait `currentStage` en permanence dès la fin du contenu A1, empêchant
`determineDailySessionMode` (et potentiellement tout futur code qui lirait
`currentStage`) de jamais voir un utilisateur avancer dans le A2 ou le B1.
Corrigé : `currentStage` ignore désormais les étapes `practice`/`bilan`
dans sa recherche de la première étape non terminée (elles ne portaient de
toute façon aucune métrique fiable) ; si la dernière étape du parcours en
fait partie, la recherche ne trouve rien et retombe sur `null`, exactement
le comportement historique en fin de B1.

**Risque résiduel documenté (non corrigé ici)** : `ProgressionExperience`
calcule `isReadyForB1 = completedStages === totalStages`. Comme les 6
étapes `practice`/`bilan` du parcours à 18 étapes ne passent jamais à
"terminé" (même limitation que ci-dessus, côté comptage cette fois), ce
message ne peut mathématiquement jamais s'afficher — un défaut préexistant
à l'intégration A1+A2+B1 (il existait déjà, avec 2 étapes bloquées sur 6,
dans l'ancien parcours B1 seul), pas introduit par ce chantier. Le
corriger suppose une décision produit (que signifie "prêt" quand
`practice`/`bilan` n'ont pas de métrique ?) hors périmètre de cette
intégration — signalé plutôt que corrigé silencieusement.

### 2.3 Deux moteurs de séance du jour concurrents

`/parcours` (`ParcoursExperience.tsx`, déjà migré par le commit
`chantier/daily-session`) utilisait le nouveau moteur `lib/daily/` +
`GuidedSessionCard`, mais `/progression` (`ProgressionExperience.tsx`)
utilisait encore l'ancien `computeDailySession` (`lib/pedagogy/logic/
recommendation.ts`) + `DailySessionCard` pour sa carte "Séance
recommandée" — deux moteurs de séance actifs simultanément dans le
produit, l'un stale. Migré `/progression` sur `buildDailySession` +
`GuidedSessionCard` (même schéma que `/parcours`) ; `computeDailySession`,
`DailySessionCard` et le type `DailySession` n'avaient alors plus aucun
appelant réel — supprimés.

### 2.4 Copie UI "B1" statique

`/parcours` titrait "Ton parcours B1" indépendamment du niveau réel de
l'apprenant — limitation déjà documentée comme connue et non corrigée par
`a1-a2-b1-integration.md` § 2 ("hors périmètre d'une intégration de
données"). Corrigée ici (hors périmètre de cette même intégration mais
dans le périmètre explicite de celle-ci, Phase 8) : le titre affiche
désormais `progress.level` réel (A1/A2/B1). Le `<title>` SEO statique de la
page (`app/(pedagogie)/parcours/page.tsx`) reste volontairement "Ton
parcours B1" — un visiteur anonyme non connecté n'a pas de niveau réel à
afficher, et B1 reste l'objectif final présenté pour le référencement.

## 3. Intégration Git — résolution des conflits

Les 9 commits ci-dessus ont été cherry-pickés dans l'ordre diagnostic →
révision → séance du jour → oral/évaluations. Deux zones de recouvrement
attendues (identifiées à l'audit avant intégration) :

- `app/(pedagogie)/parcours/ParcoursExperience.tsx` : `daily-session`
  (825ac73) et `speaking-assessment` (97cf5e8) modifient des sections
  adjacentes mais disjointes du même fichier — Git a fusionné
  automatiquement sans conflit textuel.
- `app/sitemap.ts` : `diagnostic-level` (6d4163d) ajoute une ligne,
  `speaking-assessment` (78c198e) en ajoute deux et étend le tableau final
  — fusion automatique également, sans conflit.

Aucune résolution manuelle de conflit n'a été nécessaire ; les bugs décrits
en §2 ne sont pas des conflits Git mais des incohérences fonctionnelles
invisibles à un merge textuel.

## 4. Sécurité premium

Vérification complète refaite pour les nouveaux contenus :

- Toutes les nouvelles ressources premium (`assessment`, `speaking`) passent
  par `canAccess()` (`lib/commerce/access.ts`), même mécanisme que
  modules/examens existants. Aucun bilan/passage n'est gratuit
  (`isFreeResource` retourne toujours `false` pour `kind: "assessment"`,
  même raisonnement que les examens B1 existants) ; 2 exercices oraux sont
  offerts en découverte (`FREE_SPEAKING_EXERCISE_IDS`).
- `app/(pedagogie)/parcours/evaluations/[slug]/page.tsx` est un Server
  Component qui vérifie `canAccess()` **avant** de rendre
  `AssessmentExperience` (le seul composant client à recevoir le contenu
  réel, réponses comprises) — un utilisateur non premium reçoit
  `PremiumLock` et ne reçoit jamais l'objet `assessment` complet.
- Vérifié après `npm run build` : recherche dans `.next/static` de chaînes
  de réponses réelles issues des 4 checkpoints (ex. "28 ans", "Elle prépare
  le déjeuner") — aucune occurrence. La seule occurrence de la chaîne
  `correctChoiceId` dans les chunks statiques est l'accès de propriété du
  composant partagé `QuizQuestion` (code générique), pas une donnée
  embarquée.
- Nouveau test statique `lib/assessment/data/no-client-leak.test.ts` (même
  principe que `lib/pedagogy/data/modules-public.test.ts` § "Frontière
  statique") : aucun fichier `"use client"` du dépôt n'importe
  `lib/assessment/data` directement ou via son barrel.

**Limitation connue, non nouvelle** : le diagnostic (`/diagnostic`) charge
`DIAGNOSTIC_QUESTIONS` (avec `correctChoiceId`) directement dans un
composant client (`DiagnosticClient.tsx`) — les 18 réponses sont donc
visibles dans le bundle navigateur pour quiconque ouvre les DevTools. Même
schéma déjà accepté pour `/test-niveau` (`PLACEMENT_QUESTIONS`, voir
`a1-a2-b1-integration.md` § 4 : "comportement inchangé"). Le diagnostic est
un outil de qualification gratuit et non gradé (pas de contenu payant en
jeu) — ce n'est donc pas un risque commercial, mais cela permettrait à un
utilisateur curieux de "tricher" son propre résultat. Signalé, non corrigé
(cohérent avec le comportement déjà accepté de l'outil équivalent
existant) ; à revoir si le diagnostic devient un jour un test certifiant.

## 5. Statut gratuit / premium (état constaté, inchangé sauf note ci-dessus)

| Fonctionnalité | Statut |
|---|---|
| Diagnostic (`/diagnostic`) | Gratuit, non gated |
| Test de positionnement (`/test-niveau`, étape `faire-le-point`) | Gratuit |
| Modules A1 | Premium (2 modules B1 offerts en découverte, aucun module A1) |
| Modules A2 | Premium |
| Modules B1 | Premium sauf `se-presenter`, `decrire-vie-quotidienne` |
| Examens B1/A1/A2 | Toujours premium |
| Révision espacée (`/reviser`) | Page non gated ; chaque lien cible respecte le statut premium de son module/compétence |
| Séance du jour | Non gated ; verrouille si le module ciblé est premium (`locked`, CTA "Débloquer") |
| Oral | Premium sauf 2 exercices de découverte |
| Évaluations de passage | Toujours premium (les 4) |

**Signal produit, non un bug technique** : un nouvel utilisateur gratuit
peut faire le diagnostic (gratuit), se voir recommander un vrai module A1
(gratuit à consulter, verrouillé à l'exercice), et n'a accès à aucun
module A1 réel gratuitement (contrairement au B1 qui en offre 2). Pas
changé ici — décision commerciale hors périmètre technique de cette
intégration (voir aussi `a1-a2-b1-integration.md` § 4).

## 6. Audio

Aucune régénération de bibliothèque dans ce chantier. Vérifié :
`lib/assessment/data/content-integrity.test.ts` confirme que chaque piste
référencée par les 4 checkpoints d'évaluation existe réellement sous
`public/` (aucun chemin inventé). Les limitations déjà documentées
(quelques appariements piste/exercice approximatifs en A1/A2, toutes les
pistes 100 % synthétiques) restent celles de
`a1-a2-b1-integration.md` § 5 — non ré-adressées ici, réservées au futur
chantier **"Humanisation audio A1/A2/B1"** (voir §8).

## 7. Tests ajoutés par cette intégration

- `lib/diagnostic/__tests__/recommendation.test.ts` : destinations réelles
  A1/A2/B1 (aurait détecté le bug §2.1).
- `lib/review/__tests__/integration-a1-a2-b1.test.ts` : moteur de révision
  sur le catalogue fusionné réel, une compétence par niveau A1/A2/B1.
- `lib/pedagogy/logic/recommendation.test.ts` : `buildDailySession` sur
  `PUBLIC_MODULES` réel pour A1/A2/B1 (remplace l'ancien test de
  `computeDailySession`, supprimé avec lui).
- `lib/daily/__tests__/session-engine.test.ts` : fixture `stagedModules()`
  réécrite pour couvrir toutes les étapes de contenu réelles (A1 → A2 → B1),
  plus la fiabilité que le bug §2.2 aurait pu masquer indéfiniment.
- `lib/assessment/data/no-client-leak.test.ts` : garde-fou anti-fuite (§4).

## 8. Limites connues et améliorations futures

- **Chantier futur explicite : "Humanisation audio A1/A2/B1"** — les
  pistes A1/A2 restent 100 % synthétiques, avec quelques appariements
  thématiques approximatifs (voir §6). Hors périmètre ici.
- `isReadyForB1` (`/progression`) ne peut mathématiquement jamais
  s'afficher sur le parcours à 18 étapes (§2.2, risque résiduel).
- Le diagnostic expose ses réponses côté client (§4), cohérent avec
  l'existant mais à corriger si le diagnostic devient un jour certifiant.
- Aucun sélecteur de niveau explicite : le parcours reste "un seul chemin
  continu A1 → A2 → B1" (décision produit de `a1-a2-b1-integration.md`
  § 2, non remise en cause ici) — un apprenant déjà avancé en B1 avant
  cette intégration n'a pas de raccourci pour "sauter" A1/A2 dans le calcul
  d'étape courante au-delà de sa progression réelle déjà enregistrée.
- Pas de scoring phonétique automatique pour l'oral (choix assumé, honnête
  — voir Phase 6 du cahier des charges) : uniquement auto-évaluation.

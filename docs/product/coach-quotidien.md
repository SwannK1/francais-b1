# Chantier « coach quotidien » — ParcoursFR

Date : 27 septembre 2026 · Branche : `chantier/coach-quotidien`

Principe : ne pas reconstruire ParcoursFR, mais organiser, connecter,
simplifier et révéler ce qui existe. Aucun moteur concurrent n'a été créé :
séance du jour (`lib/daily`), révision (`lib/review`), progression
(`lib/pedagogy/logic/progress.ts`), accès (`canAccess`) et runner
(`/parcours/seance`) sont réutilisés.

## Architecture de l'espace apprenant

Navigation : **Aujourd'hui · Parcours · Pratiquer · Réviser · Progression**
(`components/layout/app-nav.ts`, en-tête desktop + barre d'onglets mobile).
L'offre n'est plus dans la navigation pédagogique : elle est accessible depuis
`/compte`, le menu compte mobile, les paywalls et les pages commerciales.
`/offre` n'est pas supprimée.

| Page | Rôle |
|---|---|
| `/aujourdhui` | Point d'entrée : une séance, un pourquoi, une durée, un bouton. |
| `/parcours` | Carte du chemin A1 → A2 → B1 (`PARCOURS_STAGES` inchangé). |
| `/pratiquer` | Parler (ex-`/oral`), Écouter (leçons d'écoute existantes), Situations réelles. |
| `/pratiquer/situations/[id]` | Lecture du catalogue par situation de vie. |
| `/reviser` | Inchangé fonctionnellement ; la raison de chaque retour est affichée. |
| `/progression` | Je peux… / à consolider / à revoir / oral / situations / prochaine étape. |
| `/compte` | Temps quotidien, objectif, accès (offre, abonnement). |
| `/oral` | Redirection permanente vers `/pratiquer#parler` ; `/oral/[id]` inchangé. |
| `/diagnostic` | « Bilan approfondi », facultatif ; n'écrit jamais dans la progression. |

## Séance du jour

- `buildDailySession` reste l'unique moteur. Il lit `UserProgress.dailyMinutes`
  (10/20/30, défaut 20 via `getDailyMinutes`) : 10 min = rappel + 1 activité ;
  20 min = rappel + jusqu'à 3 leçons ; 30 min = jusqu'à 4 leçons. Les leçons
  gardent leur ordre et ne sont jamais coupées.
- Chaque étape porte un `focus` (Révision, Comprendre, S'entraîner, Écouter,
  Parler…) ; une leçon de production contenant un exercice oral = « Parler ».
- `capability` : ce que la séance permet de faire, dérivé de la description
  du module (« À la fin de ce module, tu pourras … ») — pas de nouveau champ
  éditorial (`lib/pedagogy/logic/capability.ts`).
- `pickSessionReview` : la carte et le runner choisissent le même rappel.
- `getTodayOverview` (`lib/daily/today.ts`) assemble séance + révisions pour
  Aujourd'hui, Parcours, Progression et le résultat du test.

## Onboarding

`/test-niveau` : objectif (4 intentions → `LearningGoalId` existants,
`data/goal-intents.ts`) → temps quotidien → test → résultat (niveau, forces,
à renforcer, objectif, rythme) → « Commencer ma première séance », qui ouvre
directement `/parcours/seance?module=<premier module du niveau>`.

## Oral

Nouveau domaine `production_orale` et 8 compétences `po-*`
(`data/skills-oral.ts`). Les 56 exercices `production_orale` des modules
étaient rattachés à des compétences écrites (`pe-*`, `a1-pe-*`...) ; ils
pointent désormais vers une compétence orale (table `ORAL_EXERCISE_SKILLS`,
vérifiée par `coach-data-integrity.test.ts`). Les exercices de Pratiquer de
type mini-réponse/situation portent aussi un `skillId`. Aucune notation
automatique : le résultat reste l'auto-évaluation guidée.

## Situations de vie

`data/life-situations.ts` : 9 situations (logement, santé, travail,
administration, transports et voyages, achats, argent et services, vie
sociale, famille et école) qui référencent des modules et exercices oraux
existants. Voyage fusionné avec la mobilité et école avec la famille, faute
de contenu suffisant pour des situations séparées.

## États pédagogiques

Une seule nomenclature (`logic/learning-states.ts`) : À découvrir, En cours,
À consolider, À revoir, Acquis — traduction des calculs existants (moteur de
révision pour les compétences, cycle de vie pour les modules), sans nouveau
calcul de maîtrise.

## Gratuit / premium

`FREE_MODULE_SLUGS` = `se-presenter-a1`, `se-presenter-en-detail`,
`se-presenter`, `decrire-vie-quotidienne`. Les trois premiers sont le premier
module de chaque niveau, celui que le moteur propose en premier : la première
séance d'un apprenant gratuit est donc à son niveau, sans cas particulier
dans les moteurs. Le contrôle reste `canAccess` côté serveur ; le contenu
complet n'est livré qu'après vérification. `PremiumLock` a un message par
contexte (module, séance, examen, oral, évaluation). Prix inchangé.

## Compatibilité

- `dailyMinutes` optionnel, normalisé, fusionné (local puis compte) ; absent
  = 20 min.
- `refreshSkillProgressForCatalog` (appelé au chargement local) recalcule les
  stats DÉRIVÉES par compétence d'une ancienne progression quand le catalogue
  gagne des compétences ; `moduleProgress` (exercices faits) n'est jamais
  modifié. La fusion serveur (`mergeUserProgress`) recalcule déjà tout.
- Les anciennes entrées `pe-*` gardent leur historique récent, qui peut
  inclure d'anciens résultats oraux jusqu'à la prochaine pratique écrite.

/**
 * `logic/` = calcul dérivé, sans état, à partir de `data/` et des réponses
 * d'un utilisateur. Aucun de ces fichiers ne définit ni ne stocke de contenu
 * pédagogique lui-même (ça, c'est le rôle de `data/`) : ils ne font que
 * lire et transformer.
 *
 * - `placement.ts`    : test de positionnement -> niveau CECRL estimé.
 * - `progress.ts`     : résultat d'exercice -> progression du curriculum mise à jour.
 * - `recommendation.ts`: progression -> séance du jour recommandée.
 * - `parcours.ts`     : progression -> statut et complétion des grandes étapes.
 * - `exam.ts`         : résultat d'exercice -> tentative d'examen mise à jour et score.
 *                        Concept distinct de `progress.ts` : jamais mélangé avec
 *                        la progression du curriculum (voir `exam.ts`).
 * - `module-structure.ts` : lecture pure de la structure d'un `Module` déjà en
 *                        main (comptage, recherche d'exercice) — jamais de
 *                        dépendance vers `data/modules.ts` (contenu intégral),
 *                        voir `docs/architecture/user-lifecycle.md` § Premium
 *                        content boundary.
 */
export { computePlacementResult } from "./placement";
export { findExerciseInModule, countModuleExercises } from "./module-structure";
export { recordExerciseResult, getModuleProgress, getModuleCompletionRate } from "./progress";
export { computeDailySession, getNextModule, type NextModuleTarget } from "./recommendation";
export {
  getStageModules,
  getStageCompletionRate,
  getStageStatus,
  getParcoursSummary,
  type StageStatus,
  type ParcoursSummary,
} from "./parcours";
export {
  startExamAttempt,
  recordExamExerciseResult,
  completeExamAttempt,
  abandonExamAttempt,
  getActiveExamAttempt,
  getExamAttempts,
  calculateSectionScore,
  calculateExamScore,
  type ExamScoreSummary,
} from "./exam";

/**
 * `logic/` = calcul dérivé, sans état, à partir de `data/` et des réponses
 * d'un utilisateur. Aucun de ces fichiers ne définit ni ne stocke de contenu
 * pédagogique lui-même (ça, c'est le rôle de `data/`) : ils ne font que
 * lire et transformer.
 *
 * - `placement.ts`    : test de positionnement -> niveau CECRL estimé.
 * - `progress.ts`     : résultat d'exercice -> progression mise à jour.
 * - `recommendation.ts`: progression -> séance du jour recommandée.
 * - `parcours.ts`     : progression -> statut et complétion des grandes étapes.
 */
export { computePlacementResult } from "./placement";
export { recordExerciseResult, getModuleProgress, getModuleCompletionRate } from "./progress";
export { computeDailySession } from "./recommendation";
export {
  getStageModules,
  getStageCompletionRate,
  getStageStatus,
  getParcoursSummary,
  type StageStatus,
  type ParcoursSummary,
} from "./parcours";

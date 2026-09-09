/**
 * `lib/review/` = moteur de révision espacée, isolé du diagnostic, de la
 * séance du jour et de l'expression orale.
 *
 * - `types.ts`   : formes de données du moteur (`ReviewState`,
 *                  `ReviewHistoryEntry`, `ReviewPriority`, `ReviewRecommendation`).
 * - `engine.ts`  : algorithme pur — classification, score de priorité, raisons.
 * - `adapter.ts` : pont avec `UserProgress`/`PublicModule` (données existantes,
 *                  jamais une deuxième source de vérité de progression).
 */
export {
  classifySkillState,
  evaluateSkill,
  buildReviewRecommendations,
  getConsolidationSuggestion,
} from "./engine";
export { buildReviewHistory } from "./adapter";
export type {
  ReviewState,
  ReviewPriorityBand,
  ReviewHistoryEntry,
  ReviewPriority,
  ReviewRecommendation,
} from "./types";

import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";
import { buildReviewHistory } from "./adapter";
import { buildReviewRecommendations, getConsolidationSuggestion } from "./engine";
import type { ReviewRecommendation } from "./types";

/** Point d'entrée unique pour l'UI (`/reviser`) : progression -> recommandations triées. */
export function getSkillReviewRecommendations(
  progress: UserProgress,
  modules: PublicModule[],
  now: Date = new Date()
): ReviewRecommendation[] {
  return buildReviewRecommendations(buildReviewHistory(progress, modules), now);
}

/** État vide utile (point 6 du cahier des charges) — voir `engine.ts: getConsolidationSuggestion`. */
export function getSkillConsolidationSuggestion(
  progress: UserProgress,
  modules: PublicModule[],
  now: Date = new Date()
): ReviewRecommendation | null {
  return getConsolidationSuggestion(buildReviewHistory(progress, modules), now);
}

import { getModuleCompletionRate, isModuleReviewed, statusFromCompletionRate } from "@/lib/pedagogy/logic/progress";
import { bucketForState, classifySkillState } from "@/lib/review";
import type { ReviewHistoryEntry } from "@/lib/review";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";

/**
 * Nomenclature unique des états pédagogiques affichés à l'apprenant —
 * cinq mots simples, partout les mêmes (Aujourd'hui, Parcours, Pratiquer,
 * Progression). Aucun nouveau calcul de maîtrise ici : chaque état est une
 * simple traduction d'un calcul qui existe déjà.
 *
 * - Compétence : état du moteur de révision espacée (`lib/review`,
 *   `classifySkillState` → `bucketForState`), `nouvelle` → « À découvrir ».
 * - Module : cycle de vie existant (`statusFromCompletionRate`), plus
 *   l'étiquette manuelle « à revoir » (`reviewedModuleIds`).
 */
export type LearningState = "a_decouvrir" | "en_cours" | "a_consolider" | "a_revoir" | "acquis";

export const LEARNING_STATE_LABELS: Record<LearningState, string> = {
  a_decouvrir: "À découvrir",
  en_cours: "En cours",
  a_consolider: "À consolider",
  a_revoir: "À revoir",
  acquis: "Acquis",
};

export function getSkillLearningState(entry: ReviewHistoryEntry, now: Date = new Date()): LearningState {
  const bucket = bucketForState(classifySkillState(entry, now));
  if (bucket === "acquis") return "acquis";
  if (bucket === "aConsolider") return "a_consolider";
  if (bucket === "aRevoir") return "a_revoir";
  return "a_decouvrir";
}

export function getModuleLearningState(progress: UserProgress, mod: PublicModule): LearningState {
  if (isModuleReviewed(progress, mod.id)) return "a_revoir";
  const status = statusFromCompletionRate(getModuleCompletionRate(progress, mod.id, mod.totalExercises));
  if (status === "termine") return "acquis";
  if (status === "en_cours") return "en_cours";
  return "a_decouvrir";
}

/** Ordre d'affichage « du plus avancé au moins avancé » — utile pour trier une liste de capacités. */
export const LEARNING_STATE_ORDER: LearningState[] = ["acquis", "a_consolider", "en_cours", "a_revoir", "a_decouvrir"];

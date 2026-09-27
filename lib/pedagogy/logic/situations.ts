import { getModuleLearningState, type LearningState } from "@/lib/pedagogy/logic/learning-states";
import type { LifeSituation } from "@/lib/pedagogy/data/life-situations";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";

/**
 * Lecture d'une situation de vie à partir de la progression existante — pas
 * de score propre : chaque module garde son état (`getModuleLearningState`),
 * la situation n'en fait que le compte.
 */
export interface SituationModuleView {
  module: PublicModule;
  state: LearningState;
}

export interface SituationSummary {
  situation: LifeSituation;
  modules: SituationModuleView[];
  acquiredCount: number;
  startedCount: number;
  /** État global lisible, sans pourcentage : rien commencé / en cours / tout acquis. */
  overall: "a_decouvrir" | "en_cours" | "acquis";
}

export function summarizeSituation(
  situation: LifeSituation,
  progress: UserProgress,
  modules: PublicModule[]
): SituationSummary {
  const views: SituationModuleView[] = situation.moduleSlugs
    .map((slug) => modules.find((mod) => mod.slug === slug))
    .filter((mod): mod is PublicModule => Boolean(mod))
    .map((mod) => ({ module: mod, state: getModuleLearningState(progress, mod) }));

  const acquiredCount = views.filter((view) => view.state === "acquis").length;
  const startedCount = views.filter((view) => view.state !== "a_decouvrir").length;
  const overall =
    views.length > 0 && acquiredCount === views.length ? "acquis" : startedCount > 0 ? "en_cours" : "a_decouvrir";

  return { situation, modules: views, acquiredCount, startedCount, overall };
}

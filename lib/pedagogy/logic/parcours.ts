import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getModuleCompletionRate, statusFromCompletionRate, type ModuleStatus } from "@/lib/pedagogy/logic/progress";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";

/** Mêmes 3 valeurs que `ModuleStatus` (voir `logic/progress.ts`) — nom distinct pour la clarté au point d'appel. */
export type StageStatus = ModuleStatus;

/**
 * Modules réels rattachés à une étape, triés comme dans `MODULES`. Source de
 * vérité unique pour "quels modules appartiennent à cette étape" — dérivée
 * exclusivement de `Module.stageId`, jamais du domaine ou de l'ordre.
 * `PublicModule[]` (jamais le contenu complet) : ce module est importé côté
 * client (progression, parcours) — voir `docs/architecture/user-lifecycle.md`
 * § Premium content boundary.
 */
export function getStageModules(stage: ParcoursStage, modules: PublicModule[]): PublicModule[] {
  return modules.filter((mod) => mod.stageId === stage.id);
}

/**
 * Taux de progression 0-100 d'une étape.
 * "diagnostic" : binaire (test passé ou non). "content" : moyenne de
 * complétion des modules réels. "practice"/"bilan" : pas de métrique fiable
 * pour l'instant (pas de suivi des tentatives d'examen) → toujours 0, ces
 * étapes n'affichent pas de barre de progression dans l'UI.
 */
export function getStageCompletionRate(
  stage: ParcoursStage,
  progress: UserProgress,
  modules: PublicModule[]
): number {
  if (stage.kind === "diagnostic") {
    return progress.placementCompletedAt ? 100 : 0;
  }
  if (stage.kind === "content") {
    const stageModules = getStageModules(stage, modules);
    if (stageModules.length === 0) return 0;
    const total = stageModules.reduce(
      (sum, mod) => sum + getModuleCompletionRate(progress, mod.id, mod.totalExercises),
      0
    );
    return Math.round(total / stageModules.length);
  }
  return 0;
}

export function getStageStatus(
  stage: ParcoursStage,
  progress: UserProgress,
  modules: PublicModule[]
): StageStatus {
  return statusFromCompletionRate(getStageCompletionRate(stage, progress, modules));
}

export interface ParcoursSummary {
  totalStages: number;
  completedStages: number;
  currentStage: ParcoursStage | null;
}

/** Vue d'ensemble du parcours : étapes terminées et étape courante (première non terminée). */
export function getParcoursSummary(progress: UserProgress, modules: PublicModule[]): ParcoursSummary {
  const stages = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);
  const statuses = stages.map((stage) => ({
    stage,
    status: getStageStatus(stage, progress, modules),
  }));

  const completedStages = statuses.filter((s) => s.status === "termine").length;
  const currentStage = statuses.find((s) => s.status !== "termine")?.stage ?? null;

  return { totalStages: stages.length, completedStages, currentStage };
}

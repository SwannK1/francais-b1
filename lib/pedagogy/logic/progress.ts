import { MODULES, countModuleExercises } from "@/lib/pedagogy/data/modules";
import { getSkillById } from "@/lib/pedagogy/data/skills";
import type {
  Exercise,
  Lesson,
  Module,
  ModuleProgress,
  SkillProgress,
  UserProgress,
} from "@/lib/pedagogy/types";

const WEAK_SKILL_THRESHOLD = 50;

function* iterateModuleExercises(mod: Module): Generator<Exercise> {
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      for (const exercise of activity.exercises) {
        yield exercise;
      }
    }
  }
}

function countExercisesBySkill(mods: Module[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const mod of mods) {
    for (const exercise of iterateModuleExercises(mod)) {
      totals.set(exercise.skillId, (totals.get(exercise.skillId) ?? 0) + 1);
    }
  }
  return totals;
}

function isLessonFullyCompleted(lesson: Lesson, completedExerciseIds: string[]): boolean {
  const exerciseIds = lesson.activities.flatMap((activity) =>
    activity.exercises.map((exercise) => exercise.id)
  );
  return exerciseIds.length > 0 && exerciseIds.every((id) => completedExerciseIds.includes(id));
}

/**
 * Enregistre le résultat d'un exercice et recalcule la progression dérivée
 * (module, compétences, taux global). Fonction pure : retourne une nouvelle
 * UserProgress sans muter l'existante.
 */
export function recordExerciseResult(
  progress: UserProgress,
  mod: Module,
  exercise: Exercise,
  correct: boolean
): UserProgress {
  const now = new Date().toISOString();

  const existingModuleProgress = progress.moduleProgress.find((mp) => mp.moduleId === mod.id);
  const completedExerciseIds = Array.from(
    new Set([...(existingModuleProgress?.completedExerciseIds ?? []), exercise.id])
  );
  const correctExerciseIds = correct
    ? Array.from(new Set([...(existingModuleProgress?.correctExerciseIds ?? []), exercise.id]))
    : (existingModuleProgress?.correctExerciseIds ?? []).filter((id) => id !== exercise.id);

  const completedLessonIds = mod.lessons
    .filter((lesson) => isLessonFullyCompleted(lesson, completedExerciseIds))
    .map((lesson) => lesson.id);

  const totalModuleExercises = countModuleExercises(mod);
  const moduleCompleted = completedExerciseIds.length >= totalModuleExercises;

  const updatedModuleProgress: ModuleProgress = {
    moduleId: mod.id,
    completed: moduleCompleted,
    completedLessonIds,
    completedExerciseIds,
    correctExerciseIds,
    lastActivityAt: now,
  };

  const moduleProgress = [
    ...progress.moduleProgress.filter((mp) => mp.moduleId !== mod.id),
    updatedModuleProgress,
  ];

  const skillProgress = computeSkillProgress(moduleProgress);
  const totalCompleted = skillProgress.reduce((sum, sp) => sum + sp.completedExercises, 0);
  const totalCorrect = skillProgress.reduce((sum, sp) => sum + sp.correctExercises, 0);
  const globalSuccessRate =
    totalCompleted > 0 ? Math.round((totalCorrect / totalCompleted) * 100) : 0;

  const weakSkillIds = skillProgress
    .filter((sp) => sp.completedExercises > 0 && sp.successRate < WEAK_SKILL_THRESHOLD)
    .map((sp) => sp.skillId);

  return {
    ...progress,
    moduleProgress,
    skillProgress,
    globalSuccessRate,
    lastActivityAt: now,
    weakSkillIds,
  };
}

function computeSkillProgress(moduleProgress: ModuleProgress[]): SkillProgress[] {
  const skillTotals = countExercisesBySkill(MODULES);
  const completedBySkill = new Map<string, number>();
  const correctBySkill = new Map<string, number>();

  for (const mp of moduleProgress) {
    const sourceModule = MODULES.find((mod) => mod.id === mp.moduleId);
    if (!sourceModule) continue;

    for (const exercise of iterateModuleExercises(sourceModule)) {
      if (mp.completedExerciseIds.includes(exercise.id)) {
        completedBySkill.set(exercise.skillId, (completedBySkill.get(exercise.skillId) ?? 0) + 1);
      }
      if (mp.correctExerciseIds.includes(exercise.id)) {
        correctBySkill.set(exercise.skillId, (correctBySkill.get(exercise.skillId) ?? 0) + 1);
      }
    }
  }

  return Array.from(skillTotals.keys()).map((skillId) => {
    const skill = getSkillById(skillId);
    const completed = completedBySkill.get(skillId) ?? 0;
    const correct = correctBySkill.get(skillId) ?? 0;
    return {
      skillId,
      domain: skill?.domain ?? "vocabulaire",
      totalExercises: skillTotals.get(skillId) ?? 0,
      completedExercises: completed,
      correctExercises: correct,
      successRate: completed > 0 ? Math.round((correct / completed) * 100) : 0,
    };
  });
}

export function getModuleProgress(
  progress: UserProgress,
  moduleId: string
): ModuleProgress | undefined {
  return progress.moduleProgress.find((mp) => mp.moduleId === moduleId);
}

export function getModuleCompletionRate(progress: UserProgress, mod: Module): number {
  const total = countModuleExercises(mod);
  if (total === 0) return 0;
  const completed = getModuleProgress(progress, mod.id)?.completedExerciseIds.length ?? 0;
  return Math.round((completed / total) * 100);
}

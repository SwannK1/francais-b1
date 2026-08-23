import { getSkillById } from "@/lib/pedagogy/data/skills";
import { getModuleProgress } from "@/lib/pedagogy/logic/progress";
import type { DailySession, Module, UserProgress } from "@/lib/pedagogy/types";

/**
 * Propose une séance du jour à partir de modules non terminés et des
 * compétences faibles. Aucune IA : logique déterministe et lisible.
 */
export function computeDailySession(
  progress: UserProgress,
  modules: Module[]
): DailySession | null {
  const levelModules = modules.filter((mod) => mod.level === progress.level);
  if (levelModules.length === 0) return null;

  const nextModule =
    levelModules.find((mod) => !getModuleProgress(progress, mod.id)?.completed) ?? levelModules[0];

  const moduleProgress = getModuleProgress(progress, nextModule.id);
  const completedLessonIds = moduleProgress?.completedLessonIds ?? [];

  const nextLesson =
    nextModule.lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    nextModule.lessons[nextModule.lessons.length - 1];

  const exercises = nextLesson.activities.flatMap((activity) => activity.exercises);
  const includesListening = exercises.some((exercise) => exercise.type === "comprehension_orale");
  const includesWriting = exercises.some(
    (exercise) => exercise.type === "production_ecrite" || exercise.type === "reponse_courte"
  );

  const focusSkillId = progress.weakSkillIds[0] ?? null;
  const focusSkillName = focusSkillId ? getSkillById(focusSkillId)?.name : undefined;

  const reason = focusSkillName
    ? `Séance choisie pour continuer « ${nextModule.title} » et retravailler : ${focusSkillName}.`
    : `Séance choisie pour continuer le module « ${nextModule.title} », votre prochaine étape non terminée.`;

  return {
    goalLevel: progress.level,
    moduleId: nextModule.id,
    moduleTitle: nextModule.title,
    lessonId: nextLesson.id,
    lessonTitle: nextLesson.title,
    exerciseCount: exercises.length,
    includesListening,
    includesWriting,
    focusSkillId,
    reason,
  };
}

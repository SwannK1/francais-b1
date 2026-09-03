import { getSkillById } from "@/lib/pedagogy/data/skills";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import { getModuleProgress } from "@/lib/pedagogy/logic/progress";
import { getStageModules } from "@/lib/pedagogy/logic/parcours";
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

export interface NextModuleTarget {
  module: Module;
  stage: ParcoursStage;
  /** true si l'apprenant a déjà commencé ce module (reprise), false pour une découverte. */
  isResuming: boolean;
}

/**
 * Identifie le module à proposer en priorité pour "Continuer mon parcours"
 * (utilisé par `PrimaryCta`, le CTA "Reprendre" et le mini-bilan de fin de
 * module) :
 * 1. Parmi les modules déjà commencés mais pas terminés, le plus récemment
 *    actif et accessible (reprise) — pas seulement le plus récent tout
 *    court : un module resté "en cours" peut être devenu verrouillé entre
 *    temps (ex. abonnement expiré), on ne doit jamais y renvoyer.
 * 2. Sinon, le premier module non terminé et accessible, dans l'ordre des
 *    étapes du parcours.
 * `isAccessible` reste optionnel et par défaut permissif : ce fichier ne
 * décide jamais lui-même de ce qui est verrouillé (seul `lib/commerce/access.ts`
 * le fait, voir son en-tête) — l'appelant (une page, qui connaît le statut
 * premium de la session) injecte cette règle. `PrimaryCta` appelle encore la
 * fonction sans ce paramètre (comportement historique, géré différemment
 * côté appelant) ; les nouveaux appelants (Reprendre, mini-bilan) l'utilisent.
 * Fonction pure, sans hypothèse au-delà de ce que `UserProgress` suit déjà
 * (`lastActivityAt`, `completed`). Ne filtre pas les modules "pas encore
 * rédigés" : aucun stub n'existe actuellement dans `MODULES`, ce filtrage
 * n'a donc pas lieu d'être pour l'instant.
 */
export function getNextModule(
  progress: UserProgress,
  modules: Module[],
  options?: { isAccessible?: (mod: Module) => boolean }
): NextModuleTarget | null {
  const isAccessible = options?.isAccessible ?? (() => true);
  const stagesInOrder = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);

  const inProgressCandidates = progress.moduleProgress
    .filter((mp) => !mp.completed && mp.lastActivityAt)
    .sort((a, b) => (a.lastActivityAt! < b.lastActivityAt! ? 1 : -1));

  for (const mp of inProgressCandidates) {
    const mod = modules.find((m) => m.id === mp.moduleId);
    if (!mod || !isAccessible(mod)) continue;
    const stage = stagesInOrder.find((s) => s.id === mod.stageId);
    if (stage) return { module: mod, stage, isResuming: true };
  }

  for (const stage of stagesInOrder) {
    const stageModules = getStageModules(stage, modules);
    const next = stageModules.find(
      (mod) => !getModuleProgress(progress, mod.id)?.completed && isAccessible(mod)
    );
    if (next) {
      return { module: next, stage, isResuming: false };
    }
  }

  return null;
}

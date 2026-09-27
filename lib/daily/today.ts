import { buildDailySession } from "@/lib/daily/session-engine";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { getSkillReviewRecommendations } from "@/lib/review";
import type { DailySessionPlan } from "@/lib/daily/types";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";

/**
 * Vue « Aujourd'hui » : assemble ce que les moteurs existants savent déjà
 * calculer (séance du jour `buildDailySession`, révisions `lib/review` +
 * `getReviewItems`) pour que `/aujourdhui`, `/parcours` et `/progression`
 * affichent exactement la même chose. Aucune règle de sélection ici — ce
 * n'est pas un second moteur, seulement un point d'assemblage.
 */
export interface TodayOverview {
  /** Séance accessible à l'apprenant, ou `null`. */
  plan: DailySessionPlan | null;
  /**
   * Séance qui aurait été proposée sans restriction d'accès, quand `plan` est
   * `null` parce que tout ce qui reste fait partie de l'accès complet — sert
   * à afficher le paywall contextualisé « séance découverte terminée ».
   */
  lockedPlan: DailySessionPlan | null;
  /** Même décompte que `/reviser` : modules marqués + épreuves sous le seuil + compétences signalées. */
  reviewCount: number;
  /** Aucun exercice encore fait : la prochaine séance sera la toute première. */
  isFirstSession: boolean;
  /** Ni test de niveau, ni activité : l'apprenant doit d'abord passer par l'onboarding. */
  needsOnboarding: boolean;
}

export function getTodayOverview(
  progress: UserProgress,
  modules: PublicModule[],
  isAccessible: (mod: PublicModule) => boolean,
  now: Date = new Date()
): TodayOverview {
  const plan = buildDailySession(progress, modules, { isAccessible, now });
  const lockedPlan = plan ? null : buildDailySession(progress, modules, { now });

  const legacyReviewItems = getReviewItems(progress, modules).filter(
    (item) => item.kind === "module_flagged" || item.kind === "exam_section"
  );
  const reviewCount = legacyReviewItems.length + getSkillReviewRecommendations(progress, modules, now).length;

  const hasActivity = progress.moduleProgress.some((mp) => mp.completedExerciseIds.length > 0);

  return {
    plan,
    lockedPlan,
    reviewCount,
    isFirstSession: !hasActivity,
    needsOnboarding: !hasActivity && !progress.placementCompletedAt,
  };
}

export function sessionHref(plan: Pick<DailySessionPlan, "moduleSlug">): string {
  return `/parcours/seance?module=${plan.moduleSlug}`;
}

import { getSkillById } from "@/lib/pedagogy/data/skills";
import { getStageById, PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getModuleProgress } from "@/lib/pedagogy/logic/progress";
import { findModuleForSkill } from "@/lib/pedagogy/logic/module-structure";
import { getNextModule, type NextModuleTarget } from "@/lib/pedagogy/logic/recommendation";
import { getEffectiveLevel, getStageCompletionRate, getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { getReviewItems, type ReviewItem } from "@/lib/pedagogy/logic/review";
import { getSkillReviewRecommendations } from "@/lib/review";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";
import type {
  DailySessionMode,
  DailySessionPlan,
  DailySessionRecap,
  DailySessionStep,
  SessionLessonLike,
  SessionModuleLike,
} from "@/lib/daily/types";

/**
 * Moteur de sélection de la séance guidée du jour — pur, sans effet de bord.
 * Indépendant du diagnostic (test-niveau) et consommateur des interfaces
 * publiques de recommandation/révision (`getNextModule`, `getReviewItems`,
 * `getSkillReviewRecommendations`). Ne choisit jamais un
 * module hors du catalogue reçu (`PublicModule[]`) — aucune référence
 * inventée n'est possible par construction.
 */

/** Au-delà, on considère l'apprenant en retour après une longue pause. */
const ABSENCE_DAYS_THRESHOLD = 14;
/** Sous ce taux de réussite global, avec des compétences faibles connues, la séance priorise la consolidation. */
const CONSOLIDATION_SUCCESS_THRESHOLD = 70;
/** Complétion de la dernière étape de contenu à partir de laquelle on bascule en mode "fin de niveau". */
const END_OF_LEVEL_COMPLETION_THRESHOLD = 80;

const MAX_LESSON_STEPS = 4;
/** Cible indicative (la séance type dure 10 à 25 minutes) — pas une limite stricte : voir `pickLessonsForBudget`. */
const TARGET_SESSION_MINUTES = 18;
const MIN_LESSON_MINUTES = 2;
const MAX_LESSON_MINUTES = 8;
const PER_EXERCISE_MINUTES = 1.5;
const RAPPEL_MINUTES = 2;

const LESSON_KIND_DESCRIPTIONS: Record<string, string> = {
  decouvrir: "Découvre le vocabulaire et la situation du jour.",
  comprendre: "Comprends un point de grammaire clé.",
  ecoute: "Entraîne-toi à la compréhension orale.",
  entrainement: "Entraîne-toi avec des exercices ciblés.",
  ecriture: "Mets-toi en situation de production écrite.",
  evaluation: "Fais le point avec une mini-évaluation.",
};

/**
 * Détermine le type de séance à partir de la seule progression — jamais du
 * hasard. Priorité fixe (premier prédicat vrai retenu), documentée pour
 * qu'une évolution future sache où insérer un nouveau cas plutôt que de
 * complexifier un score composite opaque :
 * 1. Aucune activité et aucun test de positionnement passé → découverte.
 * 2. Dernière activité trop ancienne → retour après absence.
 * 3. Étapes de contenu du parcours quasiment terminées → fin de niveau.
 * 4. Compétences faibles connues et taux de réussite global sous le seuil → consolidation.
 * 5. Un module est déjà commencé → reprise.
 * 6. Sinon → apprentissage normal.
 */
export function determineDailySessionMode(
  progress: UserProgress,
  levelModules: PublicModule[],
  now: Date = new Date()
): DailySessionMode {
  const hasAnyActivity = progress.moduleProgress.some((mp) => mp.completedExerciseIds.length > 0);
  if (!hasAnyActivity && !progress.placementCompletedAt) return "decouverte";

  if (progress.lastActivityAt) {
    const daysSince = (now.getTime() - new Date(progress.lastActivityAt).getTime()) / 86_400_000;
    if (Number.isFinite(daysSince) && daysSince >= ABSENCE_DAYS_THRESHOLD) return "retour_apres_absence";
  }

  const summary = getParcoursSummary(progress, levelModules);
  const contentStages = [...PARCOURS_STAGES]
    .filter((stage) => stage.kind === "content")
    .sort((a, b) => a.order - b.order);
  const lastContentStage = contentStages[contentStages.length - 1];

  // Pas d'étape restante : tout le parcours (contenu compris) est terminé.
  if (!summary.currentStage) return "fin_de_niveau";
  // L'étape courante est déjà au-delà du contenu (préparation examen, bilan) —
  // jamais avant (ex. le diagnostic non fait), d'où la comparaison par
  // `order` plutôt qu'un simple `kind !== "content"`.
  if (lastContentStage && summary.currentStage.order > lastContentStage.order) return "fin_de_niveau";
  if (lastContentStage && summary.currentStage.id === lastContentStage.id) {
    const rate = getStageCompletionRate(summary.currentStage, progress, levelModules);
    if (rate >= END_OF_LEVEL_COMPLETION_THRESHOLD) return "fin_de_niveau";
  }

  if (
    progress.weakSkillIds.length > 0 &&
    progress.globalSuccessRate > 0 &&
    progress.globalSuccessRate < CONSOLIDATION_SUCCESS_THRESHOLD
  ) {
    return "consolidation";
  }

  const isResuming = progress.moduleProgress.some((mp) => !mp.completed && mp.lastActivityAt);
  return isResuming ? "reprise" : "apprentissage";
}

/**
 * Choisit le module ciblé par la séance. En mode consolidation, préfère un
 * module accessible qui travaille une compétence faible connue
 * (`findModuleForSkill`) — y compris un module déjà entièrement terminé :
 * `successRate` (qui alimente `weakSkillIds`) et `completed` sont deux
 * dimensions indépendantes (voir `UserProgress`/`SkillProgress`), un module
 * fini peut tout à fait contenir la compétence à retravailler, retravailler
 * ses exercices reste alors la meilleure séance possible. Dans tous les
 * autres cas — et si aucun module de ce type n'est disponible — retombe sur
 * `getNextModule`, la même logique de reprise/prochaine étape que
 * `/parcours`. Jamais de logique de verrouillage ici : `isAccessible` vient
 * de l'appelant, comme pour `getNextModule` (voir sa documentation).
 */
function pickTargetModule(
  mode: DailySessionMode,
  progress: UserProgress,
  levelModules: PublicModule[],
  isAccessible: (mod: PublicModule) => boolean,
  prioritizedSkillId: string | null = null
): NextModuleTarget | null {
  if (mode === "consolidation") {
    const skillIds = [prioritizedSkillId, ...progress.weakSkillIds].filter(
      (skillId, index, all): skillId is string => !!skillId && all.indexOf(skillId) === index
    );
    for (const skillId of skillIds) {
      const mod = findModuleForSkill(levelModules, skillId);
      if (!mod || !isAccessible(mod)) continue;
      const stage = getStageById(mod.stageId);
      if (!stage) continue;
      const moduleProgress = getModuleProgress(progress, mod.id);
      return { module: mod, stage, isResuming: !!moduleProgress && !moduleProgress.completed };
    }
  }

  return getNextModule(progress, levelModules, { isAccessible });
}

function estimateLessonMinutes(lesson: SessionLessonLike): number {
  const exerciseCount = lesson.activities.reduce((sum, activity) => sum + activity.exercises.length, 0);
  const raw = Math.max(exerciseCount, 1) * PER_EXERCISE_MINUTES;
  return Math.round(Math.min(Math.max(raw, MIN_LESSON_MINUTES), MAX_LESSON_MINUTES));
}

/** Prend les leçons dans leur ordre pédagogique d'origine (jamais réordonnées) jusqu'à couvrir la cible de durée. */
function pickLessonsForBudget(lessons: SessionLessonLike[]): SessionLessonLike[] {
  const picked: SessionLessonLike[] = [];
  let minutes = 0;
  for (const lesson of lessons) {
    if (picked.length >= MAX_LESSON_STEPS) break;
    picked.push(lesson);
    minutes += estimateLessonMinutes(lesson);
    if (minutes >= TARGET_SESSION_MINUTES && picked.length >= 2) break;
  }
  return picked;
}

/**
 * Construit les étapes d'une séance pour un module donné — fonction
 * générique (`SessionModuleLike`), utilisable aussi bien avec le catalogue
 * public (planification, aperçu côté client) qu'avec le contenu complet
 * d'un module déjà autorisé (exécution réelle de la séance) : les deux
 * partagent la même forme de leçons, seul le contenu protégé diffère.
 *
 * Jamais deux fois la même leçon (dédoublonnage par id). Si le module n'a
 * plus aucune leçon non terminée (déjà achevé mais tout de même ciblé, ex.
 * consolidation sur un module fini), retombe sur l'ensemble de ses leçons —
 * refaire les exercices reste une révision valide plutôt qu'une séance vide.
 */
type SessionReviewTarget = Pick<ReviewItem, "description" | "href">;

export function buildSessionSteps(
  mod: SessionModuleLike,
  progress: UserProgress,
  mode: DailySessionMode,
  reviewItem: SessionReviewTarget | null
): DailySessionStep[] {
  const moduleProgress = getModuleProgress(progress, mod.id);
  const completedLessonIds = moduleProgress?.completedLessonIds ?? [];
  const pendingLessons = mod.lessons.filter((lesson) => !completedLessonIds.includes(lesson.id));
  const candidateLessons = pendingLessons.length > 0 ? pendingLessons : mod.lessons;

  const seen = new Set<string>();
  const dedupedCandidates = candidateLessons.filter((lesson) => {
    if (seen.has(lesson.id)) return false;
    seen.add(lesson.id);
    return true;
  });

  const chosenLessons = pickLessonsForBudget(dedupedCandidates);

  const steps: DailySessionStep[] = [];

  // Pas de rappel en mode découverte : rien à se remémorer pour un nouvel apprenant.
  if (reviewItem && mode !== "decouverte") {
    steps.push({
      id: "rappel",
      kind: "rappel",
      title: "Rappel rapide",
      description: reviewItem.description,
      estimatedMinutes: RAPPEL_MINUTES,
      lessonId: null,
      lessonType: null,
      reviewHref: reviewItem.href,
    });
  }

  for (const lesson of chosenLessons) {
    steps.push({
      id: lesson.id,
      kind: "lesson",
      title: lesson.title,
      description: LESSON_KIND_DESCRIPTIONS[lesson.type] ?? "Poursuis ton apprentissage.",
      estimatedMinutes: estimateLessonMinutes(lesson),
      lessonId: lesson.id,
      lessonType: lesson.type,
      reviewHref: null,
    });
  }

  return steps;
}

function buildReason(mode: DailySessionMode, target: NextModuleTarget, focusSkillName: string | null): string {
  switch (mode) {
    case "decouverte":
      return `Séance de découverte pour commencer « ${target.module.title} ».`;
    case "retour_apres_absence":
      return `Une reprise en douceur avec « ${target.module.title} » après une pause.`;
    case "fin_de_niveau":
      return `Tu es presque prêt·e — encore un peu de « ${target.module.title} » avant la préparation à l'examen.`;
    case "consolidation":
      return focusSkillName
        ? `Séance choisie pour retravailler : ${focusSkillName}.`
        : `Séance de consolidation avec « ${target.module.title} ».`;
    case "reprise":
      return `Reprends là où tu t'es arrêté·e dans « ${target.module.title} ».`;
    case "apprentissage":
    default:
      return target.reason ?? `Séance choisie pour continuer « ${target.module.title} », ta prochaine étape.`;
  }
}

/**
 * Construit la séance guidée du jour. Retourne `null` (jamais une erreur, ni
 * une séance vide) quand aucune séance pertinente n'existe : pas de contenu
 * au niveau de l'apprenant, ou plus aucun module accessible/non terminé —
 * l'appelant doit alors afficher un état "rien à faire aujourd'hui" plutôt
 * qu'un lien mort.
 */
export function buildDailySession(
  progress: UserProgress,
  modules: PublicModule[],
  options?: { isAccessible?: (mod: PublicModule) => boolean; now?: Date }
): DailySessionPlan | null {
  const isAccessible = options?.isAccessible ?? (() => true);
  const now = options?.now ?? new Date();

  // Même convention que `getNextModule` (recommendation.ts) : une séance ne
  // propose jamais un module d'un autre niveau que celui, *effectif*, de
  // l'apprenant (`getEffectiveLevel`) — pas le seul `progress.level` brut du
  // dernier test de positionnement. Sans ça, un apprenant qui termine tout
  // son niveau évalué et avance naturellement au niveau suivant via
  // `/parcours` (le parcours A1 → A2 → B1 est unifié, `progress.level` ne
  // se met jamais à jour tout seul) se retrouvait filtré indéfiniment sur
  // son ancien niveau : plus aucun module incomplet dans ce sous-ensemble,
  // donc plus aucune séance proposée alors qu'il reste du contenu réel au
  // niveau suivant — voir `docs/product/diagnostic-progress-integration.md`.
  // Si le catalogue ne couvre pas encore ce niveau (ex. A1/A2 avant que leur
  // contenu ne soit fusionné), on ne bloque jamais — on retourne simplement
  // "pas de séance aujourd'hui".
  const levelModules = modules.filter((mod) => mod.level === getEffectiveLevel(progress, modules));
  if (levelModules.length === 0) return null;

  const mode = determineDailySessionMode(progress, levelModules, now);
  const skillReview = getSkillReviewRecommendations(progress, levelModules, now).find((recommendation) => {
    const reviewModule = findModuleForSkill(levelModules, recommendation.skillId);
    return !!reviewModule && isAccessible(reviewModule);
  }) ?? null;
  const target = pickTargetModule(mode, progress, levelModules, isAccessible, skillReview?.skillId ?? null);
  if (!target) return null;

  const reviewItems = getReviewItems(progress, levelModules);
  const reviewItem: SessionReviewTarget | null = skillReview
    ? { description: `${skillReview.title} — ${skillReview.reason}.`, href: skillReview.href }
    : (reviewItems[0] ?? null);

  const steps = buildSessionSteps(target.module, progress, mode, reviewItem);
  if (steps.length === 0) return null;

  const totalEstimatedMinutes = steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);
  const focusSkillId = mode === "consolidation"
    ? (skillReview?.skillId ?? progress.weakSkillIds[0] ?? null)
    : null;
  const focusSkillName = focusSkillId ? (getSkillById(focusSkillId)?.name ?? null) : null;

  return {
    mode,
    moduleId: target.module.id,
    moduleSlug: target.module.slug,
    moduleTitle: target.module.title,
    stageTitle: target.stage.title,
    isResuming: target.isResuming,
    steps,
    totalEstimatedMinutes,
    focusSkillId,
    focusSkillName,
    reason: buildReason(mode, target, focusSkillName),
  };
}

/**
 * Construit le mini-bilan de fin de séance à partir de ce qui s'est
 * réellement passé pendant son déroulé (étapes parcourues, résultats
 * d'exercices) — jamais recalculé depuis le plan seul, qui ne décrit que ce
 * qui était prévu. Pure : ne lit ni n'écrit `localStorage`, l'appelant
 * fournit `progress` déjà à jour (après le dernier `recordResult`).
 */
export function buildDailySessionRecap(params: {
  plan: DailySessionPlan;
  completedStepIds: string[];
  results: { correct: boolean }[];
  progress: UserProgress;
  modules: PublicModule[];
  isAccessible?: (mod: PublicModule) => boolean;
}): DailySessionRecap {
  const { plan, completedStepIds, results, progress, modules, isAccessible } = params;

  const workedOnTitles = plan.steps
    .filter((step) => completedStepIds.includes(step.id))
    .map((step) => step.title);

  const attemptedCount = results.length;
  const correctCount = results.filter((result) => result.correct).length;
  const successRate = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : null;

  const next = getNextModule(progress, modules, isAccessible ? { isAccessible } : undefined);
  const nextStepLabel = next
    ? next.isResuming
      ? `Reprendre « ${next.module.title} »`
      : `Prochain module : ${next.module.title}`
    : "Voir ma progression";
  const nextStepHref = next ? `/parcours/module/${next.module.slug}` : "/progression";

  const weakSkillId = progress.weakSkillIds[0] ?? null;
  const skill = weakSkillId ? getSkillById(weakSkillId) : undefined;
  const skillToReview = skill ? { id: skill.id, name: skill.name } : null;

  return {
    mode: plan.mode,
    moduleTitle: plan.moduleTitle,
    workedOnTitles,
    attemptedCount,
    correctCount,
    successRate,
    nextStepLabel,
    nextStepHref,
    skillToReview,
  };
}

export type { SessionModuleLike, SessionLessonLike };

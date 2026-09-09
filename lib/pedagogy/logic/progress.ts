import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getSkillById } from "@/lib/pedagogy/data/skills";
import { countModuleExercises } from "@/lib/pedagogy/logic/module-structure";
import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type {
  CEFRLevel,
  ExamAttempt,
  Exercise,
  Lesson,
  Module,
  ModuleProgress,
  PublicModule,
  SkillProgress,
  UserProgress,
} from "@/lib/pedagogy/types";

/**
 * Ce fichier est importé côté client (via `useProgress.ts`, pour la mise à
 * jour de la progression en direct pendant qu'un exercice est fait) — il ne
 * doit donc jamais dépendre de `data/modules.ts` (contenu intégral,
 * réponses comprises). Le calcul agrégé par compétence (`computeSkillProgress`)
 * a besoin de connaître le catalogue complet des exercices (id + skillId
 * uniquement) pour établir des totaux par compétence sur l'ensemble du
 * programme — il lit donc `PUBLIC_MODULES`, jamais `MODULES`. Voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */

const WEAK_SKILL_THRESHOLD = 50;

/**
 * Taille de la fenêtre `SkillProgress.recentOutcomes` conservée par
 * compétence — juste assez pour que le moteur de révision espacée
 * (`lib/review/`) distingue une erreur isolée d'une série, sans faire de
 * cette progression un journal d'événements complet.
 */
const RECENT_OUTCOMES_LIMIT = 5;

/** Historique (hors totaux, recalculés à part) porté par une `SkillProgress` existante. */
interface SkillHistory {
  lastPracticedAt: string | null;
  recentOutcomes: boolean[];
}

interface ExerciseRef {
  id: string;
  skillId: string;
}

function* iterateExerciseRefs<E extends ExerciseRef>(mod: {
  lessons: { activities: { exercises: E[] }[] }[];
}): Generator<E> {
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      for (const exercise of activity.exercises) {
        yield exercise;
      }
    }
  }
}

function countExercisesBySkill(mods: PublicModule[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const mod of mods) {
    for (const exercise of iterateExerciseRefs(mod)) {
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
 * UserProgress sans muter l'existante. `mod`/`exercise` (contenu complet)
 * viennent toujours de l'appelant — un exercice déjà résolu et affiché,
 * donc déjà autorisé — jamais relus depuis un catalogue global ici.
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

  const skillHistory = new Map<string, SkillHistory>(
    progress.skillProgress.map((sp) => [
      sp.skillId,
      { lastPracticedAt: sp.lastPracticedAt ?? null, recentOutcomes: sp.recentOutcomes ?? [] },
    ])
  );
  const previousOutcomes = skillHistory.get(exercise.skillId)?.recentOutcomes ?? [];
  skillHistory.set(exercise.skillId, {
    lastPracticedAt: now,
    recentOutcomes: [...previousOutcomes, correct].slice(-RECENT_OUTCOMES_LIMIT),
  });

  const skillProgress = computeSkillProgress(moduleProgress, skillHistory);
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

/**
 * `skillHistory` porte ce que `moduleProgress` ne peut pas redonner en le
 * recalculant depuis les ensembles `completedExerciseIds`/`correctExerciseIds`
 * (pas d'ordre ni d'horodatage par exercice) : dernière pratique et fenêtre
 * récente par compétence, propagées telles quelles depuis l'appelant
 * (`recordExerciseResult`, `mergeUserProgress`) plutôt que redérivées ici.
 */
function computeSkillProgress(
  moduleProgress: ModuleProgress[],
  skillHistory: Map<string, SkillHistory>
): SkillProgress[] {
  const skillTotals = countExercisesBySkill(PUBLIC_MODULES);
  const completedBySkill = new Map<string, number>();
  const correctBySkill = new Map<string, number>();

  for (const mp of moduleProgress) {
    const sourceModule = PUBLIC_MODULES.find((mod) => mod.id === mp.moduleId);
    if (!sourceModule) continue;

    for (const exercise of iterateExerciseRefs(sourceModule)) {
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
    const history = skillHistory.get(skillId);
    return {
      skillId,
      domain: skill?.domain ?? "vocabulaire",
      totalExercises: skillTotals.get(skillId) ?? 0,
      completedExercises: completed,
      correctExercises: correct,
      successRate: completed > 0 ? Math.round((correct / completed) * 100) : 0,
      lastPracticedAt: history?.lastPracticedAt ?? null,
      recentOutcomes: history?.recentOutcomes ?? [],
    };
  });
}

export function getModuleProgress(
  progress: UserProgress,
  moduleId: string
): ModuleProgress | undefined {
  return progress.moduleProgress.find((mp) => mp.moduleId === moduleId);
}

/**
 * `totalExercises` en paramètre plutôt qu'un `Module`/`PublicModule` entier :
 * cette fonction est appelée aussi bien avec le contenu complet (page module,
 * déjà autorisée) qu'avec la vue publique (listes de modules) — un simple
 * nombre évite d'avoir à unifier artificiellement les deux formes ici.
 */
export function getModuleCompletionRate(
  progress: UserProgress,
  moduleId: string,
  totalExercises: number
): number {
  if (totalExercises === 0) return 0;
  const completed = getModuleProgress(progress, moduleId)?.completedExerciseIds.length ?? 0;
  return Math.round((completed / totalExercises) * 100);
}

/**
 * Les 3 états de cycle de vie d'un module (non commencé / en cours /
 * terminé). Seuils partagés avec `logic/parcours.ts` (`getStageStatus`,
 * même 3 valeurs) : une seule fonction de seuillage, pas de logique
 * dupliquée à chaque endroit qui affiche un badge de statut.
 */
export type ModuleStatus = "a_commencer" | "en_cours" | "termine";

export function statusFromCompletionRate(rate: number): ModuleStatus {
  if (rate >= 100) return "termine";
  if (rate > 0) return "en_cours";
  return "a_commencer";
}

export function getModuleStatus(progress: UserProgress, moduleId: string, totalExercises: number): ModuleStatus {
  return statusFromCompletionRate(getModuleCompletionRate(progress, moduleId, totalExercises));
}

/**
 * "À revoir" : étiquette manuelle posée par l'apprenant, orthogonale au
 * statut de complétion (voir `UserProgress.reviewedModuleIds`). Ajouter /
 * retirer / retrouver — volontairement aussi simple que ces trois verbes,
 * pas de logique de scoring ni d'expiration automatique.
 */
export function isModuleReviewed(progress: UserProgress, moduleId: string): boolean {
  return progress.reviewedModuleIds.includes(moduleId);
}

export function toggleModuleReview(progress: UserProgress, moduleId: string): UserProgress {
  const reviewedModuleIds = isModuleReviewed(progress, moduleId)
    ? progress.reviewedModuleIds.filter((id) => id !== moduleId)
    : [...progress.reviewedModuleIds, moduleId];
  return { ...progress, reviewedModuleIds };
}

function laterIso(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

function mergeModuleProgress(local: UserProgress, remote: UserProgress): ModuleProgress[] {
  const byModuleId = new Map<string, ModuleProgress>();

  for (const mp of [...local.moduleProgress, ...remote.moduleProgress]) {
    const existing = byModuleId.get(mp.moduleId);
    if (!existing) {
      byModuleId.set(mp.moduleId, mp);
      continue;
    }

    const completedExerciseIds = Array.from(
      new Set([...existing.completedExerciseIds, ...mp.completedExerciseIds])
    );
    const correctExerciseIds = Array.from(
      new Set([...existing.correctExerciseIds, ...mp.correctExerciseIds])
    );
    const completedLessonIds = Array.from(
      new Set([...existing.completedLessonIds, ...mp.completedLessonIds])
    );
    const sourceModule = PUBLIC_MODULES.find((mod) => mod.id === mp.moduleId);
    const totalModuleExercises = sourceModule?.totalExercises ?? 0;

    byModuleId.set(mp.moduleId, {
      moduleId: mp.moduleId,
      completed:
        existing.completed || mp.completed || completedExerciseIds.length >= totalModuleExercises,
      completedLessonIds,
      completedExerciseIds,
      correctExerciseIds,
      lastActivityAt: laterIso(existing.lastActivityAt, mp.lastActivityAt),
    });
  }

  return Array.from(byModuleId.values());
}

/**
 * Fusionne deux tentatives en conservant, pour un même id, la plus avancée
 * (`completed` > `in_progress`/`abandoned`, sinon la plus récemment modifiée).
 * Des ids en collision entre deux utilisateurs sont pratiquement impossibles
 * (timestamp + suffixe aléatoire dans `makeAttemptId`), donc ce cas ne
 * correspond en pratique qu'à la même tentative revue deux fois.
 */
function mergeExamAttempts(local: ExamAttempt[], remote: ExamAttempt[]): ExamAttempt[] {
  const byId = new Map<string, ExamAttempt>();
  const rank = (attempt: ExamAttempt) => (attempt.status === "completed" ? 2 : attempt.status === "in_progress" ? 1 : 0);

  for (const attempt of [...local, ...remote]) {
    const existing = byId.get(attempt.id);
    if (!existing || rank(attempt) > rank(existing)) {
      byId.set(attempt.id, attempt);
    }
  }

  return Array.from(byId.values()).sort((a, b) => a.startedAt.localeCompare(b.startedAt));
}

/**
 * Plus haut niveau CECRL couvert par une activité réellement constatée (au
 * moins un exercice complété sur un module de ce niveau) — indépendant de
 * `progress.level`, qui peut n'être qu'une valeur par défaut
 * (`EMPTY_USER_PROGRESS`) ou un ancien résultat de test jamais recalculé.
 * `null` pour un apprenant qui n'a encore rien fait (aucune progression à
 * protéger).
 */
function highestLevelWithRealActivity(moduleProgress: ModuleProgress[]): CEFRLevel | null {
  let highest: CEFRLevel | null = null;
  for (const mp of moduleProgress) {
    if (mp.completedExerciseIds.length === 0) continue;
    const mod = PUBLIC_MODULES.find((m) => m.id === mp.moduleId);
    if (!mod) continue;
    if (highest === null || CEFR_LEVELS.indexOf(mod.level) > CEFR_LEVELS.indexOf(highest)) {
      highest = mod.level;
    }
  }
  return highest;
}

/**
 * Règle de priorité "progrès existants > résultat du diagnostic" (voir
 * `docs/product/diagnostic-progress-integration.md`) : un nouveau résultat
 * de test de positionnement ne fait jamais redescendre `level` en dessous
 * du plus haut niveau déjà couvert par une vraie activité. Sans activité
 * réelle (nouvel apprenant, ou apprenant qui n'a fait que le test jusqu'ici),
 * le résultat du test est retenu tel quel — c'est le cas normal, pas
 * l'exception. Utilisée à la fois pour une reprise du test en direct
 * (`markPlacementCompleted`) et pour la fusion de comptes ci-dessous.
 */
export function resolvePlacementLevel(
  moduleProgress: ModuleProgress[],
  diagnosticLevel: CEFRLevel
): CEFRLevel {
  const highest = highestLevelWithRealActivity(moduleProgress);
  if (!highest) return diagnosticLevel;
  return CEFR_LEVELS.indexOf(diagnosticLevel) >= CEFR_LEVELS.indexOf(highest) ? diagnosticLevel : highest;
}

/**
 * `level` n'a de sens qu'accompagné de la date du test de positionnement qui
 * l'a produit (voir `markPlacementCompleted`, `lib/pedagogy/useProgress.ts` :
 * les deux sont toujours écrits ensemble, jamais l'un sans l'autre). Résoudre
 * `level` et `placementCompletedAt` indépendamment l'un de l'autre lors d'une
 * fusion casserait cet appariement — ex. garder le `placementCompletedAt` du
 * compte distant mais le `level` de l'appareil local afficherait un niveau
 * qui ne correspond à aucun test réellement passé. Un seul côté "gagne" les
 * deux champs ensemble : celui qui a un test plus récent, ou le seul des
 * deux à en avoir passé un.
 *
 * `mergedModuleProgress` (déjà fusionné par l'appelant, voir
 * `mergeUserProgress`) protège ensuite ce choix via `resolvePlacementLevel` :
 * si le côté "gagnant" par date de test est un compte fraîchement
 * repositionné plus bas (ex. test refait par erreur sur un nouvel appareil,
 * niveau A1) alors que l'autre côté a une vraie progression plus avancée
 * (ex. plusieurs modules A2 terminés), on ne redescend pas `level` — voir
 * `docs/product/diagnostic-progress-integration.md`. `placementCompletedAt`
 * reste la date du test le plus récent, honnête sur "quand" même quand le
 * niveau affiché a été relevé par cette protection.
 */
function resolvePlacement(
  local: UserProgress,
  remote: UserProgress,
  mergedModuleProgress: ModuleProgress[]
): Pick<UserProgress, "level" | "placementCompletedAt"> {
  const picked = (() => {
    if (local.placementCompletedAt && remote.placementCompletedAt) {
      return local.placementCompletedAt > remote.placementCompletedAt
        ? { level: local.level, placementCompletedAt: local.placementCompletedAt }
        : { level: remote.level, placementCompletedAt: remote.placementCompletedAt };
    }
    if (remote.placementCompletedAt) {
      return { level: remote.level, placementCompletedAt: remote.placementCompletedAt };
    }
    if (local.placementCompletedAt) {
      return { level: local.level, placementCompletedAt: local.placementCompletedAt };
    }
    // Ni l'un ni l'autre n'a passé de test : aucun niveau n'est réellement
    // fondé, le choix entre les deux valeurs par défaut est sans conséquence.
    return { level: local.level, placementCompletedAt: null };
  })();

  return { ...picked, level: resolvePlacementLevel(mergedModuleProgress, picked.level) };
}

/**
 * Historique par compétence non recomposable depuis `moduleProgress` (voir
 * `computeSkillProgress`) : contrairement aux ensembles d'exercices, il ne
 * s'agit pas d'une union mais d'un choix entre les deux côtés, tranché par
 * la dernière pratique la plus récente — même principe que `resolvePlacement`
 * ci-dessus (un seul côté gagne, jamais un mélange qui n'aurait pas de sens
 * chronologique, ex. concaténer deux fenêtres récentes de deux appareils).
 */
function mergeSkillHistory(local: SkillProgress[], remote: SkillProgress[]): Map<string, SkillHistory> {
  const merged = new Map<string, SkillHistory>();
  for (const sp of [...local, ...remote]) {
    const candidate: SkillHistory = {
      lastPracticedAt: sp.lastPracticedAt ?? null,
      recentOutcomes: sp.recentOutcomes ?? [],
    };
    const existing = merged.get(sp.skillId);
    if (!existing || (candidate.lastPracticedAt ?? "") > (existing.lastPracticedAt ?? "")) {
      merged.set(sp.skillId, candidate);
    }
  }
  return merged;
}

/**
 * Fusionne la progression locale (localStorage, potentiellement anonyme) et
 * la progression serveur d'un compte lors de la connexion. Stratégie de
 * conflit : union des exercices terminés/réussis par module (jamais de
 * perte), date d'activité la plus récente retenue, tentatives d'examen
 * fusionnées par id. Fonction pure et idempotente — peut être rappelée sans
 * risque (ex. à chaque montage de session) sans dupliquer de données.
 */
export function mergeUserProgress(local: UserProgress, remote: UserProgress): UserProgress {
  const moduleProgress = mergeModuleProgress(local, remote);
  const skillProgress = computeSkillProgress(moduleProgress, mergeSkillHistory(local.skillProgress, remote.skillProgress));
  const totalCompleted = skillProgress.reduce((sum, sp) => sum + sp.completedExercises, 0);
  const totalCorrect = skillProgress.reduce((sum, sp) => sum + sp.correctExercises, 0);
  const globalSuccessRate = totalCompleted > 0 ? Math.round((totalCorrect / totalCompleted) * 100) : 0;
  const weakSkillIds = skillProgress
    .filter((sp) => sp.completedExercises > 0 && sp.successRate < WEAK_SKILL_THRESHOLD)
    .map((sp) => sp.skillId);

  return {
    userId: remote.userId,
    ...resolvePlacement(local, remote, moduleProgress),
    goalId: local.goalId ?? remote.goalId,
    moduleProgress,
    skillProgress,
    globalSuccessRate,
    lastActivityAt: laterIso(local.lastActivityAt, remote.lastActivityAt),
    weakSkillIds,
    examAttempts: mergeExamAttempts(local.examAttempts, remote.examAttempts),
    // `?? []` : robustesse face à une progression écrite avant l'ajout de ce
    // champ (voir `UserProgress.reviewedModuleIds`) — jamais de crash sur
    // une ancienne donnée, union plutôt que remplacement (même stratégie que
    // les autres champs ci-dessus, jamais de perte).
    reviewedModuleIds: Array.from(
      new Set([...(local.reviewedModuleIds ?? []), ...(remote.reviewedModuleIds ?? [])])
    ),
  };
}

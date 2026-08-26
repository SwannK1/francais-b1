import type {
  DelfSection,
  Exam,
  ExamAttempt,
  ExamSection,
  Exercise,
  SectionResult,
  UserProgress,
} from "@/lib/pedagogy/types";

/**
 * Concept distinct de `moduleProgress`/`skillProgress` (voir `progress.ts`) :
 * une tentative d'examen ne fait jamais progresser le curriculum B1, et
 * inversement — les deux systèmes ne se lisent ni ne s'écrivent l'un l'autre.
 */

function makeAttemptId(): string {
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Aucune correction automatique fiable pour une production (écrite ou orale). */
function isAutoScorable(delfSection: DelfSection): boolean {
  return delfSection === "comprehension_ecrite" || delfSection === "comprehension_orale";
}

/**
 * Score d'une épreuve à partir des exercices complétés, ou `null` si aucune
 * note fiable n'est disponible (épreuve non auto-corrigeable, ou pas encore
 * entièrement réalisée) — jamais `0` par défaut.
 */
export function calculateSectionScore(examSection: ExamSection, result: SectionResult): number | null {
  if (!isAutoScorable(examSection.delfSection)) return null;

  const total = examSection.exercises.length;
  if (total === 0 || result.completedExerciseIds.length < total) return null;

  const correct = result.correctExerciseIds.length;
  return Math.max(0, Math.min(examSection.maxScore, Math.round((correct / total) * examSection.maxScore)));
}

export interface ExamScoreSummary {
  sectionScores: { section: DelfSection; score: number | null; maxScore: number }[];
  /** Somme des scores fiables (sections non évaluées ignorées). */
  scoredPoints: number;
  /** Somme des `maxScore` des seules sections évaluées. */
  scoredMax: number;
  /** Somme des `maxScore` de toutes les sections de l'examen. */
  totalMax: number;
  /** true tant qu'au moins une section n'a pas de score fiable. */
  isProvisional: boolean;
  /** null tant que le résultat est provisoire — jamais de verdict tranché sur un total incomplet. */
  passed: boolean | null;
}

export function calculateExamScore(exam: Exam, attempt: ExamAttempt): ExamScoreSummary {
  const evaluated = attempt.sections.filter((result) => result.score !== null);

  const scoredPoints = evaluated.reduce((sum, result) => sum + (result.score ?? 0), 0);
  const scoredMax = evaluated.reduce((sum, result) => sum + result.maxScore, 0);
  const totalMax = attempt.sections.reduce((sum, result) => sum + result.maxScore, 0);
  const isProvisional = evaluated.length < attempt.sections.length;

  return {
    sectionScores: attempt.sections.map((result) => ({
      section: result.section,
      score: result.score,
      maxScore: result.maxScore,
    })),
    scoredPoints,
    scoredMax,
    totalMax,
    isProvisional,
    passed: isProvisional ? null : scoredPoints >= exam.passingScore,
  };
}

/** Nouvelle tentative, une section par épreuve de l'examen, rien n'est encore évalué. */
export function startExamAttempt(progress: UserProgress, exam: Exam): UserProgress {
  const attempt: ExamAttempt = {
    id: makeAttemptId(),
    examId: exam.id,
    startedAt: new Date().toISOString(),
    completedAt: null,
    status: "in_progress",
    sections: exam.sections.map((section) => ({
      section: section.delfSection,
      status: "not_started",
      score: null,
      maxScore: section.maxScore,
      selfAssessed: false,
      completedExerciseIds: [],
      correctExerciseIds: [],
    })),
  };
  return { ...progress, examAttempts: [...progress.examAttempts, attempt] };
}

/**
 * Enregistre le résultat d'un exercice au sein d'une tentative en cours et
 * recalcule le score de la section concernée. Fonction pure, mêmes garanties
 * que `recordExerciseResult` : ne mute rien, renvoie une nouvelle UserProgress.
 * Le statut de la section ("completed") est dérivé du nombre d'exercices
 * complétés — jamais marqué manuellement, même logique que la complétion
 * d'une leçon dans `progress.ts`.
 */
export function recordExamExerciseResult(
  progress: UserProgress,
  exam: Exam,
  attemptId: string,
  delfSection: DelfSection,
  exercise: Exercise,
  correct: boolean
): UserProgress {
  const examSection = exam.sections.find((section) => section.delfSection === delfSection);
  if (!examSection) return progress;

  const examAttempts = progress.examAttempts.map((attempt) => {
    if (attempt.id !== attemptId) return attempt;

    const sections = attempt.sections.map((result): SectionResult => {
      if (result.section !== delfSection) return result;

      const completedExerciseIds = Array.from(new Set([...result.completedExerciseIds, exercise.id]));
      const correctExerciseIds = correct
        ? Array.from(new Set([...result.correctExerciseIds, exercise.id]))
        : result.correctExerciseIds.filter((id) => id !== exercise.id);
      const selfAssessed =
        result.selfAssessed || exercise.type === "production_ecrite" || exercise.type === "production_orale";

      const updated: SectionResult = {
        ...result,
        status: completedExerciseIds.length >= examSection.exercises.length ? "completed" : "in_progress",
        completedExerciseIds,
        correctExerciseIds,
        selfAssessed,
        score: null,
      };
      updated.score = calculateSectionScore(examSection, updated);
      return updated;
    });

    return { ...attempt, sections };
  });

  return { ...progress, examAttempts };
}

export function completeExamAttempt(progress: UserProgress, attemptId: string): UserProgress {
  const examAttempts = progress.examAttempts.map((attempt) =>
    attempt.id === attemptId
      ? { ...attempt, status: "completed" as const, completedAt: new Date().toISOString() }
      : attempt
  );
  return { ...progress, examAttempts };
}

/** Tentative volontairement quittée sans être terminée — jamais inférée automatiquement. */
export function abandonExamAttempt(progress: UserProgress, attemptId: string): UserProgress {
  const examAttempts = progress.examAttempts.map((attempt) =>
    attempt.id === attemptId
      ? { ...attempt, status: "abandoned" as const, completedAt: new Date().toISOString() }
      : attempt
  );
  return { ...progress, examAttempts };
}

/** La plus récente tentative en cours pour un examen — permet une reprise transparente. */
export function getActiveExamAttempt(progress: UserProgress, examId: string): ExamAttempt | undefined {
  return [...progress.examAttempts]
    .reverse()
    .find((attempt) => attempt.examId === examId && attempt.status === "in_progress");
}

export function getExamAttempts(progress: UserProgress, examId: string): ExamAttempt[] {
  return progress.examAttempts.filter((attempt) => attempt.examId === examId);
}

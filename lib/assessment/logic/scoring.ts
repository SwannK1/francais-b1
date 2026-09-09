import { flattenAssessmentQuestions } from "@/lib/assessment/logic/flatten";
import { ASSESSMENT_DIMENSION_LABELS } from "@/lib/assessment/logic/labels";
import type { AssessmentDefinition, AssessmentDimension, CheckpointId } from "@/lib/assessment/types";

export type DimensionStatus = "maitrisee" | "en_progres" | "insuffisante";

export interface DimensionScore {
  dimension: AssessmentDimension;
  correct: number;
  total: number;
  /** 0..1 — jamais affiché comme un pourcentage entier fabriqué au-delà de ce qui a été répondu. */
  successRate: number;
  status: DimensionStatus;
}

export interface AssessmentResult {
  checkpointId: CheckpointId;
  /** true seulement une fois toutes les questions notées automatiquement répondues — jamais un verdict sur un total partiel. */
  isComplete: boolean;
  dimensionScores: DimensionScore[];
  overallCorrect: number;
  overallTotal: number;
  /** 0..1. */
  overallScore: number;
  /** `null` tant que `isComplete` est faux. */
  passed: boolean | null;
  masteredDimensions: AssessmentDimension[];
  insufficientDimensions: AssessmentDimension[];
  hasGuidedProduction: boolean;
  recommendation: string;
}

function statusFor(successRate: number, definition: AssessmentDefinition): DimensionStatus {
  if (successRate >= definition.masteryRatio) return "maitrisee";
  if (successRate < definition.insufficientRatio) return "insuffisante";
  return "en_progres";
}

function buildRecommendation(params: {
  definition: AssessmentDefinition;
  isComplete: boolean;
  passed: boolean | null;
  insufficientLabels: string[];
}): string {
  const { definition, isComplete, passed, insufficientLabels } = params;
  if (!isComplete) {
    return "Termine toutes les questions notées automatiquement pour obtenir ton résultat complet.";
  }

  const advance =
    definition.checkpointKind === "passage"
      ? { ok: `tu peux passer au niveau ${definition.toLevel}`, ko: `pour passer au niveau ${definition.toLevel}` }
      : { ok: `le niveau ${definition.toLevel} est acquis`, ko: `pour valider le niveau ${definition.toLevel}` };

  if (passed) {
    return insufficientLabels.length === 0
      ? `Seuil atteint : ${advance.ok}.`
      : `Seuil atteint : ${advance.ok}. Continue quand même à retravailler : ${insufficientLabels.join(", ")}.`;
  }
  return insufficientLabels.length > 0
    ? `Seuil non atteint ${advance.ko} pour l'instant. Priorité : ${insufficientLabels.join(", ")}.`
    : `Seuil non atteint ${advance.ko} pour l'instant. Revois l'ensemble des dimensions avant une nouvelle tentative.`;
}

/**
 * Ne dépend jamais d'une seule question : chaque dimension porte plusieurs
 * questions (voir les fichiers de `data/`), et le seuil global (`passingRatio`)
 * porte sur l'ensemble des questions notées automatiquement, pas sur une
 * dimension isolée — voir la consigne "ne pas faire dépendre tout le
 * passage d'une seule question" et l'absence volontaire de seuil
 * éliminatoire par dimension (§ `types.ts`).
 *
 * `answeredCorrect` : `correct`/`incorrect` par id de sous-question, tel que
 * renvoyé par `QuizQuestion`/`AudioExercise` (`onAnswered(correct)`) — même
 * mécanisme que `recordExamExerciseResult` (`lib/pedagogy/logic/exam.ts`),
 * en délibérément indépendant (pas d'import croisé, pas de `UserProgress`).
 */
export function scoreAssessment(
  definition: AssessmentDefinition,
  answeredCorrect: Record<string, boolean>
): AssessmentResult {
  const flat = flattenAssessmentQuestions(definition);

  const buckets = new Map<AssessmentDimension, { correct: number; total: number }>();
  let overallCorrect = 0;
  let answeredCount = 0;

  for (const item of flat) {
    const bucket = buckets.get(item.dimension) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    const answer = answeredCorrect[item.id];
    if (answer !== undefined) {
      answeredCount += 1;
      if (answer) {
        bucket.correct += 1;
        overallCorrect += 1;
      }
    }
    buckets.set(item.dimension, bucket);
  }

  const isComplete = flat.length > 0 && answeredCount === flat.length;

  const dimensionScores: DimensionScore[] = Array.from(buckets.entries()).map(([dimension, { correct, total }]) => {
    const successRate = total === 0 ? 0 : correct / total;
    return { dimension, correct, total, successRate, status: statusFor(successRate, definition) };
  });

  const overallTotal = flat.length;
  const overallScore = overallTotal === 0 ? 0 : overallCorrect / overallTotal;
  const passed = isComplete ? overallScore >= definition.passingRatio : null;

  const masteredDimensions = dimensionScores.filter((d) => d.status === "maitrisee").map((d) => d.dimension);
  const insufficientDimensions = dimensionScores.filter((d) => d.status === "insuffisante").map((d) => d.dimension);

  return {
    checkpointId: definition.id,
    isComplete,
    dimensionScores,
    overallCorrect,
    overallTotal,
    overallScore,
    passed,
    masteredDimensions,
    insufficientDimensions,
    hasGuidedProduction: Boolean(definition.guidedProduction),
    recommendation: buildRecommendation({
      definition,
      isComplete,
      passed,
      insufficientLabels: insufficientDimensions.map((d) => ASSESSMENT_DIMENSION_LABELS[d]),
    }),
  };
}

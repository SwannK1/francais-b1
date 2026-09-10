import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { AssessmentEvidence, SkillDomain, UserProgress } from "@/lib/pedagogy/types";
import type { AssessmentAttempt, AssessmentDefinition } from "@/lib/assessment/types";
import type { AssessmentResult } from "@/lib/assessment/logic/scoring";

const PROGRESS_DOMAINS = new Set<SkillDomain>([
  "comprehension_ecrite",
  "comprehension_orale",
  "grammaire",
  "vocabulaire",
  "production_ecrite",
  "preparation_examen",
]);

/**
 * Convertit une tentative finalisée en preuve minimale. Les garde-fous sont
 * volontairement redondants avec l'UI : cette fonction pure refuse toute
 * tentative incomplète, abandonnée ou encore en cours.
 */
export function buildAssessmentEvidence(
  definition: AssessmentDefinition,
  attempt: AssessmentAttempt,
  result: AssessmentResult
): AssessmentEvidence | null {
  if (
    attempt.status !== "completed" ||
    !attempt.completedAt ||
    !result.isComplete ||
    result.passed === null ||
    result.checkpointId !== definition.id ||
    attempt.checkpointId !== definition.id
  ) {
    return null;
  }

  return {
    assessmentId: definition.id,
    attemptId: attempt.id,
    checkpointKind: definition.checkpointKind,
    fromLevel: definition.fromLevel,
    toLevel: definition.toLevel,
    completedAt: attempt.completedAt,
    overallCorrect: result.overallCorrect,
    overallTotal: result.overallTotal,
    passed: result.passed,
    insufficientDomains: result.insufficientDimensions.flatMap((domain) =>
      PROGRESS_DOMAINS.has(domain as SkillDomain) ? [domain as SkillDomain] : []
    ),
  };
}

/** Enregistre la preuve sans doublon ; seul un passage réussi peut relever le niveau. */
export function recordAssessmentEvidence(
  progress: UserProgress,
  evidence: AssessmentEvidence
): UserProgress {
  const evidenceByAttempt = new Map(
    [...(progress.assessmentEvidence ?? []), evidence].map((item) => [item.attemptId, item])
  );
  const mayAdvance = evidence.checkpointKind === "passage" && evidence.passed;
  const level = mayAdvance && CEFR_LEVELS.indexOf(evidence.toLevel) > CEFR_LEVELS.indexOf(progress.level)
    ? evidence.toLevel
    : progress.level;

  return {
    ...progress,
    level,
    assessmentEvidence: Array.from(evidenceByAttempt.values()).sort((a, b) =>
      a.completedAt.localeCompare(b.completedAt)
    ),
  };
}

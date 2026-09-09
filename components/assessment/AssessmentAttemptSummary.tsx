"use client";

import { useAssessmentAttempts } from "@/lib/assessment/useAssessmentAttempts";
import type { CheckpointId } from "@/lib/assessment/types";

export default function AssessmentAttemptSummary({
  checkpointId,
  questionCount,
  passingRatio,
}: {
  checkpointId: CheckpointId;
  questionCount: number;
  passingRatio: number;
}) {
  const { getAttempts } = useAssessmentAttempts();
  const attempts = getAttempts(checkpointId);
  const lastCompleted = [...attempts].reverse().find((attempt) => attempt.status === "completed");

  if (!lastCompleted) {
    const active = [...attempts].reverse().find((attempt) => attempt.status === "in_progress");
    return active ? (
      <p className="mt-3 rounded-lg bg-muted p-3 text-sm font-medium text-foreground">
        Évaluation commencée — tu peux reprendre ta tentative.
      </p>
    ) : null;
  }

  const correct = Object.values(lastCompleted.answeredCorrect).filter(Boolean).length;
  const score = questionCount > 0 ? correct / questionCount : 0;
  const passed = score >= passingRatio;

  return (
    <p className="mt-3 rounded-lg bg-muted p-3 text-sm text-foreground" role="status">
      <span className="font-semibold">Dernier résultat : {correct}/{questionCount}.</span>{" "}
      {passed ? "Seuil atteint." : "À consolider avant le passage."}
    </p>
  );
}

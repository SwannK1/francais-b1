import { describe, expect, it } from "vitest";
import { PASSAGE_A1_A2 } from "@/lib/assessment/data/passage-a1-a2";
import { PASSAGE_A2_B1 } from "@/lib/assessment/data/passage-a2-b1";
import { flattenAssessmentQuestions } from "@/lib/assessment/logic/flatten";
import { scoreAssessment } from "@/lib/assessment/logic/scoring";
import { buildAssessmentEvidence, recordAssessmentEvidence } from "@/lib/assessment/logic/progress-evidence";
import { makeProgress } from "@/lib/pedagogy/logic/__tests__/fixtures";
import type { AssessmentAttempt } from "@/lib/assessment/types";

function answers(correct: boolean): Record<string, boolean> {
  return Object.fromEntries(flattenAssessmentQuestions(PASSAGE_A1_A2).map((item) => [item.id, correct]));
}

function attempt(overrides: Partial<AssessmentAttempt> = {}): AssessmentAttempt {
  return {
    id: "attempt-a1-a2",
    checkpointId: PASSAGE_A1_A2.id,
    startedAt: "2026-09-10T08:00:00.000Z",
    completedAt: "2026-09-10T08:30:00.000Z",
    status: "completed",
    answeredCorrect: answers(true),
    guidedProductionDone: true,
    ...overrides,
  };
}

describe("assessment evidence", () => {
  it("fait passer de A1 à A2 avec une tentative terminée et réellement réussie", () => {
    const completed = attempt();
    const result = scoreAssessment(PASSAGE_A1_A2, completed.answeredCorrect);
    const evidence = buildAssessmentEvidence(PASSAGE_A1_A2, completed, result);

    expect(evidence?.passed).toBe(true);
    const progress = recordAssessmentEvidence(makeProgress({ level: "A1" }), evidence!);
    expect(progress.level).toBe("A2");
    expect(progress.assessmentEvidence).toHaveLength(1);
  });

  it("conserve le niveau après un échec complet et mémorise les dimensions faibles", () => {
    const failed = attempt({ answeredCorrect: answers(false) });
    const result = scoreAssessment(PASSAGE_A1_A2, failed.answeredCorrect);
    const evidence = buildAssessmentEvidence(PASSAGE_A1_A2, failed, result)!;
    const progress = recordAssessmentEvidence(makeProgress({ level: "A1" }), evidence);

    expect(evidence.passed).toBe(false);
    expect(evidence.insufficientDomains.length).toBeGreaterThan(0);
    expect(progress.level).toBe("A1");
  });

  it.each([
    ["in_progress", null],
    ["abandoned", "2026-09-10T08:10:00.000Z"],
  ] as const)("refuse une tentative %s", (status, completedAt) => {
    const invalid = attempt({ status, completedAt });
    const result = scoreAssessment(PASSAGE_A1_A2, invalid.answeredCorrect);
    expect(buildAssessmentEvidence(PASSAGE_A1_A2, invalid, result)).toBeNull();
  });

  it("refuse une tentative marquée terminée si les réponses restent incomplètes", () => {
    const incomplete = attempt({ answeredCorrect: { [flattenAssessmentQuestions(PASSAGE_A1_A2)[0]!.id]: true } });
    const result = scoreAssessment(PASSAGE_A1_A2, incomplete.answeredCorrect);
    expect(buildAssessmentEvidence(PASSAGE_A1_A2, incomplete, result)).toBeNull();
  });

  it("est idempotent pour une même tentative", () => {
    const completed = attempt();
    const evidence = buildAssessmentEvidence(
      PASSAGE_A1_A2,
      completed,
      scoreAssessment(PASSAGE_A1_A2, completed.answeredCorrect)
    )!;
    const once = recordAssessmentEvidence(makeProgress({ level: "A1" }), evidence);
    const twice = recordAssessmentEvidence(once, evidence);
    expect(twice.assessmentEvidence).toHaveLength(1);
  });

  it("fait passer de A2 à B1 avec la même règle de preuve", () => {
    const answeredCorrect = Object.fromEntries(
      flattenAssessmentQuestions(PASSAGE_A2_B1).map((item) => [item.id, true])
    );
    const completed: AssessmentAttempt = {
      ...attempt(),
      id: "attempt-a2-b1",
      checkpointId: PASSAGE_A2_B1.id,
      answeredCorrect,
    };
    const evidence = buildAssessmentEvidence(
      PASSAGE_A2_B1,
      completed,
      scoreAssessment(PASSAGE_A2_B1, answeredCorrect)
    )!;

    expect(recordAssessmentEvidence(makeProgress({ level: "A2" }), evidence).level).toBe("B1");
  });
});

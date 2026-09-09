import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import AssessmentAttemptSummary from "@/components/assessment/AssessmentAttemptSummary";

const STORAGE_KEY = "francais-b1:assessment-attempts";

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("AssessmentAttemptSummary", () => {
  it("affiche le dernier résultat réel et le compare au seuil", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([
      {
        id: "attempt-1",
        checkpointId: "passage-a1-a2",
        startedAt: "2026-09-09T10:00:00.000Z",
        completedAt: "2026-09-09T10:20:00.000Z",
        status: "completed",
        answeredCorrect: { q1: true, q2: true, q3: false, q4: false },
        guidedProductionDone: true,
      },
    ]));

    render(
      <AssessmentAttemptSummary checkpointId="passage-a1-a2" questionCount={4} passingRatio={0.6} />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Dernier résultat : 2/4");
    expect(screen.getByRole("status")).toHaveTextContent("À consolider avant le passage");
  });

  it("signale une tentative en cours sans inventer de résultat", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([
      {
        id: "attempt-active",
        checkpointId: "passage-a2-b1",
        startedAt: "2026-09-09T10:00:00.000Z",
        completedAt: null,
        status: "in_progress",
        answeredCorrect: { q1: true },
        guidedProductionDone: false,
      },
    ]));

    render(
      <AssessmentAttemptSummary checkpointId="passage-a2-b1" questionCount={4} passingRatio={0.6} />
    );

    expect(screen.getByText(/évaluation commencée/i)).toBeInTheDocument();
    expect(screen.queryByText(/dernier résultat/i)).not.toBeInTheDocument();
  });
});

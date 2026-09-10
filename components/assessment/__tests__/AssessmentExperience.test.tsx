import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import AssessmentExperience from "@/components/assessment/AssessmentExperience";
import { trackEvent } from "@/lib/analytics/client";
import type { AssessmentDefinition } from "@/lib/assessment/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));
const recordAssessmentEvidence = vi.hoisted(() => vi.fn());
vi.mock("@/lib/pedagogy/useProgress", () => ({
  useProgress: () => ({ recordAssessmentEvidence }),
}));

function fixture(overrides: Partial<AssessmentDefinition> = {}): AssessmentDefinition {
  return {
    id: "fin-a1",
    checkpointKind: "bilan",
    slug: "fin-a1",
    title: "Bilan test",
    description: "Description test.",
    fromLevel: "A1",
    toLevel: "A1",
    durationMinutes: 10,
    passingRatio: 0.6,
    masteryRatio: 0.7,
    insufficientRatio: 0.5,
    reading: [
      {
        id: "r1",
        dimension: "comprehension_ecrite",
        instructions: "Lisez.",
        text: "Texte de test.",
        questions: [
          {
            kind: "qcm",
            id: "r1-q1",
            prompt: "Question lecture ?",
            choices: [
              { id: "a", text: "Bonne réponse" },
              { id: "b", text: "Mauvaise réponse" },
            ],
            correctChoiceId: "a",
            correction: { correctAnswer: "Bonne réponse", explanation: "Explication." },
          },
        ],
      },
    ],
    listening: [
      {
        id: "l1",
        dimension: "comprehension_orale",
        instructions: "Écoutez.",
        audioSrc: "/audio/fake.m4a",
        transcript: "Transcript de test.",
        questions: [
          {
            kind: "qcm",
            id: "l1-q1",
            prompt: "Question écoute ?",
            choices: [
              { id: "a", text: "Bonne réponse" },
              { id: "b", text: "Mauvaise réponse" },
            ],
            correctChoiceId: "a",
            correction: { correctAnswer: "Bonne réponse", explanation: "Explication." },
          },
        ],
      },
    ],
    vocabulary: [
      {
        id: "v1",
        dimension: "vocabulaire",
        question: {
          kind: "qcm",
          id: "v1-q",
          prompt: "Question vocab ?",
          choices: [
            { id: "a", text: "Bonne réponse" },
            { id: "b", text: "Mauvaise réponse" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Bonne réponse", explanation: "Explication." },
        },
      },
    ],
    grammar: [
      {
        id: "g1",
        dimension: "grammaire",
        question: {
          kind: "qcm",
          id: "g1-q",
          prompt: "Question grammaire ?",
          choices: [
            { id: "a", text: "Bonne réponse" },
            { id: "b", text: "Mauvaise réponse" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Bonne réponse", explanation: "Explication." },
        },
      },
    ],
    guidedProduction: {
      dimension: "production_guidee",
      exercise: {
        id: "po1",
        skillId: "po-test",
        difficulty: "A1",
        type: "production_orale",
        instructions: "Enregistre-toi.",
        consigne: "Parle un peu.",
        prepSeconds: 0,
        selfAssessmentCriteria: ["Critère de test"],
      },
    },
    ...overrides,
  };
}

function answerEveryAutoScoredQuestionCorrectly() {
  const radios = screen.getAllByRole("radio", { name: /bonne réponse/i });
  radios.forEach((radio) => fireEvent.click(radio));
  const verifyButtons = screen.getAllByRole("button", { name: /^vérifier$/i });
  verifyButtons.forEach((button) => fireEvent.click(button));
}

function completeGuidedProductionWithoutMic() {
  fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
  fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));
  fireEvent.click(screen.getByRole("button", { name: /terminer l'exercice/i }));
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.mocked(trackEvent).mockClear();
  recordAssessmentEvidence.mockClear();
});

describe("AssessmentExperience", () => {
  it("starts an attempt and tracks assessment_started", () => {
    render(<AssessmentExperience assessment={fixture()} />);

    fireEvent.click(screen.getByRole("button", { name: /^commencer$/i }));

    expect(trackEvent).toHaveBeenCalledWith("assessment_started", { assessmentId: "fin-a1" });
    expect(screen.getByText(/provisoire/i)).toBeInTheDocument();
  });

  it("never depends on a single question: the result stays provisional until every auto-scored question is answered", () => {
    render(<AssessmentExperience assessment={fixture()} />);
    fireEvent.click(screen.getByRole("button", { name: /^commencer$/i }));

    // Une seule question répondue sur 4 : toujours provisoire, jamais de verdict.
    fireEvent.click(screen.getAllByRole("radio", { name: /bonne réponse/i })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: /^vérifier$/i })[0]);

    expect(screen.getByText(/provisoire/i)).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+%\)/)).not.toBeInTheDocument();
  });

  it("shows a passing result with all dimensions mastered once every auto-scored question is answered correctly", () => {
    render(<AssessmentExperience assessment={fixture()} />);
    fireEvent.click(screen.getByRole("button", { name: /^commencer$/i }));

    answerEveryAutoScoredQuestionCorrectly();

    expect(screen.getByText(/4\/4 \(100%\) — réussi/i)).toBeInTheDocument();
    expect(screen.getAllByText(/maîtrisée/i)).toHaveLength(4);
  });

  it("flags an insufficient dimension without failing the whole checkpoint from a single wrong question", () => {
    render(<AssessmentExperience assessment={fixture()} />);
    fireEvent.click(screen.getByRole("button", { name: /^commencer$/i }));

    // Rate uniquement la grammaire (1 question sur 4) : le seuil global (60%,
    // soit 3/4) reste atteint, mais la dimension est signalée à retravailler.
    const grammarFieldset = screen.getByText("Question grammaire ?").closest("fieldset")!;
    fireEvent.click(within(grammarFieldset).getByRole("radio", { name: /mauvaise réponse/i }));

    const otherRadios = screen
      .getAllByRole("radio", { name: /bonne réponse/i })
      .filter((radio) => !grammarFieldset.contains(radio));
    otherRadios.forEach((radio) => fireEvent.click(radio));

    screen.getAllByRole("button", { name: /^vérifier$/i }).forEach((button) => fireEvent.click(button));

    expect(screen.getByText(/3\/4 \(75%\) — réussi/i)).toBeInTheDocument();
    expect(screen.getAllByText(/à retravailler/i).length).toBeGreaterThan(0);
  });

  it("only allows finishing the attempt once the guided production self-assessment is also done", () => {
    render(<AssessmentExperience assessment={fixture()} />);
    fireEvent.click(screen.getByRole("button", { name: /^commencer$/i }));
    answerEveryAutoScoredQuestionCorrectly();

    expect(screen.queryByRole("button", { name: /terminer la tentative/i })).not.toBeInTheDocument();

    completeGuidedProductionWithoutMic();

    fireEvent.click(screen.getByRole("button", { name: /terminer la tentative/i }));
    expect(trackEvent).toHaveBeenCalledWith("assessment_completed", { assessmentId: "fin-a1", correct: true });
    expect(recordAssessmentEvidence).toHaveBeenCalledWith(
      expect.objectContaining({ assessmentId: "fin-a1", passed: true, overallCorrect: 4, overallTotal: 4 })
    );
    expect(screen.getByRole("button", { name: /recommencer une tentative/i })).toBeInTheDocument();
  });
});

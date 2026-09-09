import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WrittenExercise from "@/components/pedagogy/WrittenExercise";
import type { ProductionEcriteExercise } from "@/lib/pedagogy/types";

afterEach(cleanup);

const exercise: ProductionEcriteExercise = {
  id: "written-test",
  type: "production_ecrite",
  skillId: "pe-test",
  difficulty: "A2",
  instructions: "Rédige ta réponse.",
  consigne: "Écris un message pour proposer une sortie.",
  minWords: 4,
  maxWords: 20,
  correctionCriteria: ["J'ai fait une proposition.", "J'ai indiqué un moment."],
  aiCorrectionAvailable: false,
};

function submitDraft() {
  fireEvent.change(screen.getByLabelText("Ta réponse"), {
    target: { value: "On va au cinéma samedi ?" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
}

describe("WrittenExercise", () => {
  it("ne crédite pas automatiquement une production simplement envoyée", () => {
    const onExerciseAnswered = vi.fn();
    render(<WrittenExercise exercise={exercise} onExerciseAnswered={onExerciseAnswered} />);

    submitDraft();
    expect(onExerciseAnswered).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /valider mon auto-évaluation/i }));
    expect(onExerciseAnswered).toHaveBeenCalledWith(false);
    expect(screen.getByText(/reste à consolider/i)).toBeInTheDocument();
  });

  it("crédite la production lorsque tous les critères sont confirmés", () => {
    const onExerciseAnswered = vi.fn();
    render(<WrittenExercise exercise={exercise} onExerciseAnswered={onExerciseAnswered} />);

    submitDraft();
    for (const criterion of exercise.correctionCriteria) {
      fireEvent.click(screen.getByRole("checkbox", { name: criterion }));
    }
    fireEvent.click(screen.getByRole("button", { name: /valider mon auto-évaluation/i }));

    expect(onExerciseAnswered).toHaveBeenCalledWith(true);
    expect(screen.getByText(/objectif atteint selon ta grille/i)).toBeInTheDocument();
  });
});

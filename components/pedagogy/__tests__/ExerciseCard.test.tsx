import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import type { ComprehensionOraleExercise, VraiFauxExercise } from "@/lib/pedagogy/types";

afterEach(cleanup);

const vraiFaux: VraiFauxExercise = {
  id: "vf-1",
  skillId: "gr-test",
  difficulty: "B1",
  instructions: "Vrai ou faux ?",
  type: "vrai_faux",
  statement: "Paris est la capitale de la France.",
  correctAnswer: true,
  correction: { correctAnswer: "Vrai", explanation: "Paris est bien la capitale." },
};

const comprehensionOrale: ComprehensionOraleExercise = {
  id: "co-1",
  skillId: "co-test",
  difficulty: "B1",
  instructions: "Écoute l'audio et réponds aux questions.",
  type: "comprehension_orale",
  audioSrc: "/audio/b1/test.m4a",
  questions: [
    {
      kind: "qcm",
      id: "co-1-q1",
      prompt: "Question ?",
      choices: [{ id: "a", text: "A" }],
      correctChoiceId: "a",
      correction: { correctAnswer: "A", explanation: "Parce que." },
    },
  ],
};

describe("ExerciseCard", () => {
  it("never renders an audio player for an exercise that has no audio", () => {
    const { container } = render(<ExerciseCard exercise={vraiFaux} />);
    expect(container.querySelector("audio")).toBeNull();
  });

  it("renders the audio player for a comprehension_orale exercise", () => {
    const { container } = render(<ExerciseCard exercise={comprehensionOrale} />);
    expect(container.querySelector("audio")).not.toBeNull();
  });
});

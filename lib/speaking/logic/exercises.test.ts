import { describe, expect, it } from "vitest";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import {
  getModelText,
  getSpeakingExerciseById,
  getSpeakingExercisesByKind,
} from "@/lib/speaking/logic/exercises";

const REQUIRED_SITUATIONS = [
  "se-presenter",
  "commander",
  "demander-chemin",
  "rendez-vous",
  "expliquer-probleme",
  "raconter-experience",
];

describe("SPEAKING_EXERCISES content", () => {
  it("has unique ids", () => {
    const ids = SPEAKING_EXERCISES.map((exercise) => exercise.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers all 4 requested exercise kinds", () => {
    const kinds = new Set(SPEAKING_EXERCISES.map((exercise) => exercise.kind));
    expect(kinds).toEqual(new Set(["repetition", "lecture", "mini_reponse", "situation"]));
  });

  it("includes all 6 required practical situations", () => {
    const situationIds = SPEAKING_EXERCISES.filter((exercise) => exercise.kind === "situation").map(
      (exercise) => exercise.id
    );
    for (const requiredId of REQUIRED_SITUATIONS) {
      expect(situationIds).toContain(`situation-${requiredId}`);
    }
  });

  it("never fabricates a numeric or AI score in its self-assessment criteria", () => {
    for (const exercise of SPEAKING_EXERCISES) {
      expect(exercise.selfAssessmentCriteria.length).toBeGreaterThan(0);
      for (const criterion of exercise.selfAssessmentCriteria) {
        expect(criterion).not.toMatch(/\d+\s*\/\s*\d+|score|note\s+ia|intelligence artificielle/i);
      }
    }
  });
});

describe("getSpeakingExerciseById", () => {
  it("finds an existing exercise", () => {
    expect(getSpeakingExerciseById("repetition-bonjour")?.title).toBe("Se saluer");
  });

  it("returns undefined for an unknown id", () => {
    expect(getSpeakingExerciseById("does-not-exist")).toBeUndefined();
  });
});

describe("getSpeakingExercisesByKind", () => {
  it("only returns exercises of the requested kind", () => {
    const situations = getSpeakingExercisesByKind("situation");
    expect(situations.length).toBeGreaterThan(0);
    expect(situations.every((exercise) => exercise.kind === "situation")).toBe(true);
  });
});

describe("getModelText", () => {
  it("returns the target sentence for repetition/lecture exercises", () => {
    const repetition = getSpeakingExerciseById("repetition-bonjour")!;
    const lecture = getSpeakingExerciseById("lecture-annonce")!;
    expect(getModelText(repetition)).toBe(repetition.kind === "repetition" ? repetition.targetText : null);
    expect(getModelText(lecture)).toBe(lecture.kind === "lecture" ? lecture.targetText : null);
  });

  it("returns null for open-ended kinds (mini-réponse, situation) — nothing to imitate", () => {
    const miniReponse = getSpeakingExerciseById("mini-reponse-weekend")!;
    const situation = getSpeakingExerciseById("situation-se-presenter")!;
    expect(getModelText(miniReponse)).toBeNull();
    expect(getModelText(situation)).toBeNull();
  });
});

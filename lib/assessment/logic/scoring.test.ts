import { describe, expect, it } from "vitest";
import { scoreAssessment } from "@/lib/assessment/logic/scoring";
import { flattenAssessmentQuestions } from "@/lib/assessment/logic/flatten";
import { FIN_A1 } from "@/lib/assessment/data/fin-a1";
import { PASSAGE_A2_B1 } from "@/lib/assessment/data/passage-a2-b1";
import type { AssessmentDefinition } from "@/lib/assessment/types";

function allCorrect(definition: AssessmentDefinition): Record<string, boolean> {
  const flat = flattenAssessmentQuestions(definition);
  return Object.fromEntries(flat.map((item) => [item.id, true]));
}

function allWrong(definition: AssessmentDefinition): Record<string, boolean> {
  const flat = flattenAssessmentQuestions(definition);
  return Object.fromEntries(flat.map((item) => [item.id, false]));
}

describe("scoreAssessment — fin-a1 (bilan)", () => {
  it("passes when every question is answered correctly", () => {
    const result = scoreAssessment(FIN_A1, allCorrect(FIN_A1));
    expect(result.isComplete).toBe(true);
    expect(result.passed).toBe(true);
    expect(result.overallScore).toBe(1);
    expect(result.insufficientDimensions).toEqual([]);
    expect(result.recommendation).toMatch(/niveau A1 est acquis/i);
  });

  it("fails clearly when every question is answered incorrectly, without a fake AI score", () => {
    const result = scoreAssessment(FIN_A1, allWrong(FIN_A1));
    expect(result.passed).toBe(false);
    expect(result.overallScore).toBe(0);
    expect(result.dimensionScores.every((d) => d.status === "insuffisante")).toBe(true);
    expect(result.recommendation).not.toMatch(/intelligence artificielle|score ia/i);
  });

  it("stays provisional (passed: null) while questions remain unanswered — never a verdict on a partial total", () => {
    const flat = flattenAssessmentQuestions(FIN_A1);
    const partial = Object.fromEntries(flat.slice(0, 3).map((item) => [item.id, true]));
    const result = scoreAssessment(FIN_A1, partial);
    expect(result.isComplete).toBe(false);
    expect(result.passed).toBeNull();
    expect(result.recommendation).toMatch(/termine toutes les questions/i);
  });

  it("never lets a single wrong question fail the whole checkpoint", () => {
    const flat = flattenAssessmentQuestions(FIN_A1);
    const answers = allCorrect(FIN_A1);
    answers[flat[0].id] = false; // une seule question ratée sur ~21
    const result = scoreAssessment(FIN_A1, answers);
    expect(result.isComplete).toBe(true);
    expect(result.passed).toBe(true);
  });

  it("flags a partial failure: passes overall but flags a weak dimension for review", () => {
    const flat = flattenAssessmentQuestions(FIN_A1);
    const answers = allCorrect(FIN_A1);
    // Rate toutes les questions de grammaire (insuffisant sur cette dimension),
    // mais réussit largement les autres — le seuil global (60%) reste atteint.
    for (const item of flat) {
      if (item.dimension === "grammaire") answers[item.id] = false;
    }
    const result = scoreAssessment(FIN_A1, answers);
    expect(result.isComplete).toBe(true);
    expect(result.passed).toBe(true);
    expect(result.insufficientDimensions).toContain("grammaire");
    expect(result.recommendation).toMatch(/grammaire/i);
  });

  it("never scores the guided production (excluded from the flattened, auto-scored questions)", () => {
    const flat = flattenAssessmentQuestions(FIN_A1);
    expect(flat.some((item) => item.id === FIN_A1.guidedProduction?.exercise.id)).toBe(false);
    const result = scoreAssessment(FIN_A1, allCorrect(FIN_A1));
    expect(result.hasGuidedProduction).toBe(true);
  });
});

describe("scoreAssessment — passage-a2-b1 (passage)", () => {
  it("recommends advancing to the next level on success", () => {
    const result = scoreAssessment(PASSAGE_A2_B1, allCorrect(PASSAGE_A2_B1));
    expect(result.passed).toBe(true);
    expect(result.recommendation).toMatch(/passer au niveau B1/i);
  });

  it("recommends against advancing on failure, without an artificially severe verdict on one weak dimension alone", () => {
    const flat = flattenAssessmentQuestions(PASSAGE_A2_B1);
    const answers = allCorrect(PASSAGE_A2_B1);
    for (const item of flat) {
      if (item.dimension === "comprehension_orale") answers[item.id] = false;
    }
    const result = scoreAssessment(PASSAGE_A2_B1, answers);
    // Une seule dimension faible sur 4 ne suffit pas à faire échouer le
    // passage si le score global reste au-dessus du seuil (pas de seuil
    // éliminatoire par dimension, voir `scoring.ts`).
    expect(result.passed).toBe(true);
    expect(result.insufficientDimensions).toEqual(["comprehension_orale"]);
  });

  it("fails when the overall score drops below the passing ratio", () => {
    const flat = flattenAssessmentQuestions(PASSAGE_A2_B1);
    const answers: Record<string, boolean> = {};
    flat.forEach((item, index) => {
      answers[item.id] = index % 3 === 0; // ~33% de réussite, sous le seuil de 60%
    });
    const result = scoreAssessment(PASSAGE_A2_B1, answers);
    expect(result.passed).toBe(false);
    expect(result.recommendation).toMatch(/pour passer au niveau B1/i);
  });
});

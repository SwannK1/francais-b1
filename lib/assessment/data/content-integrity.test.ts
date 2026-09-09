import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ASSESSMENTS } from "@/lib/assessment/data/index";
import { flattenAssessmentQuestions } from "@/lib/assessment/logic/flatten";

const PUBLIC_DIR = path.join(import.meta.dirname, "..", "..", "..", "public");

describe("ASSESSMENTS content integrity", () => {
  it("has exactly the 4 required checkpoints", () => {
    expect(ASSESSMENTS.map((a) => a.id).sort()).toEqual(
      ["fin-a1", "fin-a2", "passage-a1-a2", "passage-a2-b1"].sort()
    );
  });

  it("has unique slugs", () => {
    const slugs = ASSESSMENTS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const assessment of ASSESSMENTS) {
    describe(assessment.id, () => {
      it("never depends on a single question: each auto-scored dimension has several questions", () => {
        const flat = flattenAssessmentQuestions(assessment);
        const byDimension = new Map<string, number>();
        for (const item of flat) {
          byDimension.set(item.dimension, (byDimension.get(item.dimension) ?? 0) + 1);
        }
        // Les 4 dimensions notées automatiquement doivent être présentes.
        expect([...byDimension.keys()].sort()).toEqual(
          ["comprehension_ecrite", "comprehension_orale", "grammaire", "vocabulaire"].sort()
        );
        for (const [dimension, count] of byDimension) {
          expect(count, `${assessment.id}/${dimension} a trop peu de questions`).toBeGreaterThanOrEqual(3);
        }
      });

      it("has unique sub-question ids", () => {
        const flat = flattenAssessmentQuestions(assessment);
        const ids = flat.map((item) => item.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("documents pedagogically defensible, non-artificially-severe thresholds", () => {
        expect(assessment.passingRatio).toBeGreaterThanOrEqual(0.5);
        expect(assessment.passingRatio).toBeLessThanOrEqual(0.7);
        expect(assessment.masteryRatio).toBeGreaterThan(assessment.passingRatio);
        expect(assessment.insufficientRatio).toBeLessThan(assessment.passingRatio);
      });

      it("references only audio files that actually exist under public/ (no invented paths)", () => {
        for (const item of assessment.listening) {
          const relative = item.audioSrc.replace(/^\//, "");
          const absolute = path.join(PUBLIC_DIR, relative);
          expect(existsSync(absolute), `${assessment.id}: ${item.audioSrc} introuvable sous public/`).toBe(true);
        }
      });

      it("never leaves an empty transcript for a listening item", () => {
        for (const item of assessment.listening) {
          expect(item.transcript.trim().length).toBeGreaterThan(0);
        }
      });

      it("includes a guided production that is never auto-scored (self-assessment criteria only)", () => {
        if (!assessment.guidedProduction) return;
        expect(assessment.guidedProduction.exercise.selfAssessmentCriteria.length).toBeGreaterThan(0);
      });

      it("uses a checkpointKind consistent with fromLevel/toLevel", () => {
        if (assessment.checkpointKind === "bilan") {
          expect(assessment.fromLevel).toBe(assessment.toLevel);
        } else {
          expect(assessment.fromLevel).not.toBe(assessment.toLevel);
        }
      });
    });
  }
});

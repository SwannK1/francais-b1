import { describe, expect, it } from "vitest";
import { buildReviewHistory } from "../adapter";
import { makePublicModule, makeProgress } from "@/lib/pedagogy/logic/__tests__/fixtures";

describe("buildReviewHistory", () => {
  it("dérive le lien de pratique depuis le module contenant la compétence, et la difficulté depuis ses exercices", () => {
    const mod = makePublicModule({ id: "mod-1", slug: "mod-1" });
    const progress = makeProgress({
      skillProgress: [
        {
          skillId: "test-skill",
          domain: "vocabulaire",
          totalExercises: 1,
          completedExercises: 1,
          correctExercises: 0,
          successRate: 0,
          lastPracticedAt: "2026-08-01T00:00:00.000Z",
          recentOutcomes: [false],
        },
      ],
    });

    const [entry] = buildReviewHistory(progress, [mod]);
    expect(entry).toMatchObject({
      skillId: "test-skill",
      difficulty: "B1",
      href: "/parcours/module/mod-1",
      lastPracticedAt: "2026-08-01T00:00:00.000Z",
      recentOutcomes: [false],
    });
  });

  it("retombe sur /progression quand aucun module ne contient la compétence", () => {
    const progress = makeProgress({
      skillProgress: [
        {
          skillId: "orphan-skill",
          domain: "grammaire",
          totalExercises: 3,
          completedExercises: 0,
          correctExercises: 0,
          successRate: 0,
        },
      ],
    });

    const [entry] = buildReviewHistory(progress, []);
    expect(entry.href).toBe("/progression");
    expect(entry.lastPracticedAt).toBeNull();
    expect(entry.recentOutcomes).toEqual([]);
  });
});

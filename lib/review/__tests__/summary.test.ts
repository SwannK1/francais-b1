import { describe, expect, it } from "vitest";
import { summarizeMastery } from "../summary";
import { daysAgo, makeEntry } from "./fixtures";

const NOW = new Date("2026-09-06T12:00:00.000Z");

describe("summarizeMastery", () => {
  it("compétence jamais pratiquée -> exclue du total (rien à classer encore)", () => {
    const entry = makeEntry({ skillId: "s1", completedExercises: 0 });
    expect(summarizeMastery([entry], NOW)).toEqual({ acquis: 0, aConsolider: 0, aRevoir: 0, total: 0 });
  });

  it("compétence maîtrisée -> acquis", () => {
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true, true, true],
      lastPracticedAt: daysAgo(NOW, 2),
    });
    expect(summarizeMastery([entry], NOW)).toEqual({ acquis: 1, aConsolider: 0, aRevoir: 0, total: 1 });
  });

  it("compétence en cours d'apprentissage -> à consolider", () => {
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(summarizeMastery([entry], NOW)).toEqual({ acquis: 0, aConsolider: 1, aRevoir: 0, total: 1 });
  });

  it("erreurs répétées (fragile) et erreur isolée (a_revoir) -> comptées ensemble comme à revoir", () => {
    const fragile = makeEntry({
      skillId: "s1",
      completedExercises: 4,
      correctExercises: 3,
      successRate: 75,
      recentOutcomes: [true, false, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const isolatedError = makeEntry({
      skillId: "s2",
      completedExercises: 2,
      correctExercises: 1,
      successRate: 50,
      recentOutcomes: [true, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(summarizeMastery([fragile, isolatedError], NOW)).toEqual({
      acquis: 0,
      aConsolider: 0,
      aRevoir: 2,
      total: 2,
    });
  });

  it("mélange réaliste -> compte chaque catégorie indépendamment", () => {
    const acquired = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true, true, true],
      lastPracticedAt: daysAgo(NOW, 2),
    });
    const consolidating = makeEntry({
      skillId: "s2",
      totalExercises: 5,
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const toReview = makeEntry({
      skillId: "s3",
      completedExercises: 4,
      correctExercises: 3,
      successRate: 75,
      recentOutcomes: [true, false, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const neverPracticed = makeEntry({ skillId: "s4", completedExercises: 0 });

    expect(summarizeMastery([acquired, consolidating, toReview, neverPracticed], NOW)).toEqual({
      acquis: 1,
      aConsolider: 1,
      aRevoir: 1,
      total: 3,
    });
  });
});

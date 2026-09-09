import { describe, expect, it } from "vitest";
import { buildReviewRecommendations, classifySkillState, evaluateSkill, getConsolidationSuggestion } from "../engine";
import { daysAgo, makeEntry } from "./fixtures";

const NOW = new Date("2026-09-06T12:00:00.000Z");

describe("classifySkillState", () => {
  it("compétence jamais revue -> nouvelle", () => {
    const entry = makeEntry({ skillId: "s1", completedExercises: 0 });
    expect(classifySkillState(entry, NOW)).toBe("nouvelle");
  });

  it("erreur récente isolée -> a_revoir", () => {
    const entry = makeEntry({
      skillId: "s1",
      completedExercises: 2,
      correctExercises: 1,
      successRate: 50,
      recentOutcomes: [true, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(classifySkillState(entry, NOW)).toBe("a_revoir");
  });

  it("erreurs répétées (série de 2+) -> fragile, quel que soit le taux cumulé", () => {
    const entry = makeEntry({
      skillId: "s1",
      completedExercises: 4,
      correctExercises: 3,
      successRate: 75,
      recentOutcomes: [true, false, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(classifySkillState(entry, NOW)).toBe("fragile");
  });

  it("réussite récente (dernier résultat correct, pas encore assez couvert) -> en_apprentissage, pas urgent", () => {
    const entry = makeEntry({
      skillId: "s1",
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(classifySkillState(entry, NOW)).toBe("en_apprentissage");
    expect(evaluateSkill(entry, NOW)).toBeNull();
  });

  it("compétence maîtrisée (bon taux, bonne couverture, pratiquée récemment) -> maitrisee, jamais affichée", () => {
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true, true, true],
      lastPracticedAt: daysAgo(NOW, 2),
    });
    expect(classifySkillState(entry, NOW)).toBe("maitrisee");
    expect(evaluateSkill(entry, NOW)).toBeNull();
  });

  it("compétence oubliée (était maîtrisée, décroissance dépassée) -> repasse a_revoir", () => {
    const entry = makeEntry({
      skillId: "s1",
      difficulty: "B1",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true, true, true],
      lastPracticedAt: daysAgo(NOW, 20), // > 15 jours (intervalle B1)
    });
    expect(classifySkillState(entry, NOW)).toBe("a_revoir");
    const evaluation = evaluateSkill(entry, NOW);
    expect(evaluation?.reasons[0]).toContain("oubliée");
  });

  it("longue absence sans maîtrise (compétence laissée de côté) -> a_revoir", () => {
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 2,
      correctExercises: 1,
      successRate: 50,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 15), // > 10 jours (STALE_LEARNING_DAYS), pas encore maîtrisée
    });
    expect(classifySkillState(entry, NOW)).toBe("a_revoir");
    const evaluation = evaluateSkill(entry, NOW);
    expect(evaluation?.reasons[0]).toContain("Laissé de côté");
  });

  it("longue absence avec un taux cumulé élevé mais une couverture insuffisante -> abandon, jamais confondu avec une maîtrise éventée", () => {
    // Un seul exercice réussi (100%) ne suffit pas à avoir été "maîtrisée" un
    // jour (MASTERY_COVERAGE_THRESHOLD) : la raison affichée doit rester
    // "laissé de côté", jamais "compétence oubliée" (régression : la raison
    // ne doit jamais être redevinée depuis `successRate` seul).
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 13),
    });
    expect(classifySkillState(entry, NOW)).toBe("a_revoir");
    const evaluation = evaluateSkill(entry, NOW);
    expect(evaluation?.reasons[0]).toContain("Laissé de côté");
    expect(evaluation?.reasons[0]).not.toContain("oubliée");
  });

  it("réussite après erreur -> ne reste pas classée comme une série d'erreurs, et le signale dans les raisons", () => {
    const entry = makeEntry({
      skillId: "s1",
      totalExercises: 5,
      completedExercises: 3,
      correctExercises: 2,
      successRate: 67,
      recentOutcomes: [false, true],
      lastPracticedAt: daysAgo(NOW, 12), // longue absence -> reste dans une bande affichée malgré la reprise
    });
    expect(classifySkillState(entry, NOW)).not.toBe("fragile");
    const evaluation = evaluateSkill(entry, NOW);
    expect(evaluation?.reasons.some((r) => r.includes("Reprise réussie"))).toBe(true);
  });
});

describe("buildReviewRecommendations — plusieurs compétences concurrentes", () => {
  it("classe une compétence fragile avant une compétence à revoir, elle-même avant une consolidation", () => {
    const fragile = makeEntry({
      skillId: "z-fragile",
      completedExercises: 3,
      recentOutcomes: [false, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const aRevoir = makeEntry({
      skillId: "a-a-revoir",
      completedExercises: 2,
      recentOutcomes: [true, false],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const consolidation = makeEntry({
      skillId: "b-consolidation",
      completedExercises: 1,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 6), // > CONSOLIDATION-adjacent staleness, mais pas encore "a_revoir"
    });

    const recs = buildReviewRecommendations([consolidation, aRevoir, fragile], NOW);
    expect(recs.map((r) => r.skillId)).toEqual(["z-fragile", "a-a-revoir", "b-consolidation"]);
    expect(recs.map((r) => r.priority.band)).toEqual(["haute", "a_revoir", "consolidation"]);
  });

  it("ordre de priorité stable : deux compétences de même bande sont départagées par skillId", () => {
    const a = makeEntry({ skillId: "b-skill", completedExercises: 2, recentOutcomes: [false], lastPracticedAt: daysAgo(NOW, 1) });
    const b = makeEntry({ skillId: "a-skill", completedExercises: 2, recentOutcomes: [false], lastPracticedAt: daysAgo(NOW, 1) });
    const first = buildReviewRecommendations([a, b], NOW).map((r) => r.skillId);
    const second = buildReviewRecommendations([b, a], NOW).map((r) => r.skillId);
    expect(first).toEqual(second);
    expect(first).toEqual(["a-skill", "b-skill"]);
  });

  it("pas de doublons : un même skillId présent deux fois dans les entrées ne produit qu'une recommandation", () => {
    const entries = [
      makeEntry({ skillId: "s1", completedExercises: 2, recentOutcomes: [false], lastPracticedAt: daysAgo(NOW, 1) }),
      makeEntry({ skillId: "s1", completedExercises: 4, recentOutcomes: [false, false], lastPracticedAt: daysAgo(NOW, 1) }),
      makeEntry({ skillId: "s2", completedExercises: 2, recentOutcomes: [false, false], lastPracticedAt: daysAgo(NOW, 1) }),
    ];
    const recs = buildReviewRecommendations(entries, NOW);
    const ids = recs.map((r) => r.skillId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.filter((id) => id === "s1")).toHaveLength(1);
  });

  it("omet les compétences nouvelles et maîtrisées fraîches de la liste affichée", () => {
    const nouvelle = makeEntry({ skillId: "new", completedExercises: 0 });
    const maitrisee = makeEntry({
      skillId: "mastered",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true, true],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    expect(buildReviewRecommendations([nouvelle, maitrisee], NOW)).toEqual([]);
  });
});

describe("getConsolidationSuggestion", () => {
  it("propose la compétence maîtrisée la plus proche de sa décroissance quand rien n'est urgent", () => {
    const fresh = makeEntry({
      skillId: "fresh",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 1),
    });
    const older = makeEntry({
      skillId: "older",
      totalExercises: 5,
      completedExercises: 4,
      correctExercises: 4,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: daysAgo(NOW, 10),
    });
    const suggestion = getConsolidationSuggestion([fresh, older], NOW);
    expect(suggestion?.skillId).toBe("older");
  });

  it("ne propose rien si aucune compétence n'est encore maîtrisée", () => {
    const entry = makeEntry({ skillId: "new", completedExercises: 0 });
    expect(getConsolidationSuggestion([entry], NOW)).toBeNull();
  });
});

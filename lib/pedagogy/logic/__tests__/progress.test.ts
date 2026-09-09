import { describe, expect, it } from "vitest";
import {
  getModuleCompletionRate,
  getModuleStatus,
  isModuleReviewed,
  mergeUserProgress,
  recordExerciseResult,
  statusFromCompletionRate,
  toggleModuleReview,
} from "@/lib/pedagogy/logic/progress";
import { countModuleExercises } from "@/lib/pedagogy/logic/module-structure";
import { makeModule, makeModuleProgress, makeProgress } from "./fixtures";

describe("statusFromCompletionRate", () => {
  it("returns a_commencer at 0%", () => {
    expect(statusFromCompletionRate(0)).toBe("a_commencer");
  });
  it("returns en_cours between 0 and 100 exclusive", () => {
    expect(statusFromCompletionRate(1)).toBe("en_cours");
    expect(statusFromCompletionRate(99)).toBe("en_cours");
  });
  it("returns termine at 100% or above", () => {
    expect(statusFromCompletionRate(100)).toBe("termine");
  });
});

describe("getModuleStatus", () => {
  it("reflects real exercise completion, not a guess", () => {
    const mod = makeModule({ id: "m1", slug: "m1" });
    const total = countModuleExercises(mod);
    const notStarted = makeProgress();
    expect(getModuleStatus(notStarted, mod.id, total)).toBe("a_commencer");

    const started = recordExerciseResult(notStarted, mod, mod.lessons[0].activities[0].exercises[0], true);
    expect(getModuleStatus(started, mod.id, total)).toBe("termine"); // seul exercice du module -> terminé
    expect(getModuleCompletionRate(started, mod.id, total)).toBe(100);
  });
});

describe("à revoir (toggleModuleReview / isModuleReviewed)", () => {
  it("adds a module to reviewedModuleIds when not present", () => {
    const progress = makeProgress();
    const next = toggleModuleReview(progress, "mod-a");
    expect(isModuleReviewed(next, "mod-a")).toBe(true);
    expect(next.reviewedModuleIds).toEqual(["mod-a"]);
  });

  it("removes a module already marked à revoir (toggle back off)", () => {
    const progress = makeProgress({ reviewedModuleIds: ["mod-a", "mod-b"] });
    const next = toggleModuleReview(progress, "mod-a");
    expect(isModuleReviewed(next, "mod-a")).toBe(false);
    expect(next.reviewedModuleIds).toEqual(["mod-b"]);
  });

  it("never creates a duplicate entry when toggled on twice in a row (idempotent add)", () => {
    let progress = makeProgress();
    progress = toggleModuleReview(progress, "mod-a"); // add
    // Un deuxième appel simule un double-clic : il doit retirer, jamais dupliquer.
    progress = toggleModuleReview(progress, "mod-a"); // remove
    expect(progress.reviewedModuleIds).toEqual([]);
  });

  it("is a pure function: never mutates the progress object passed in", () => {
    const progress = makeProgress();
    const frozen = Object.freeze({ ...progress, reviewedModuleIds: Object.freeze([...progress.reviewedModuleIds]) });
    expect(() => toggleModuleReview(frozen as typeof progress, "mod-a")).not.toThrow();
  });
});

describe("mergeUserProgress — reviewedModuleIds", () => {
  it("unions local and remote review flags without duplicates", () => {
    const local = makeProgress({ reviewedModuleIds: ["mod-a", "mod-shared"] });
    const remote = makeProgress({ reviewedModuleIds: ["mod-shared", "mod-b"] });
    const merged = mergeUserProgress(local, remote);
    expect(new Set(merged.reviewedModuleIds)).toEqual(new Set(["mod-a", "mod-shared", "mod-b"]));
  });

  it("never crashes when one side predates this field (old stored data)", () => {
    const local = makeProgress({ reviewedModuleIds: ["mod-a"] });
    // Simule une ligne écrite avant l'ajout du champ (absent, pas juste vide).
    const remote = makeProgress();
    // @ts-expect-error -- simulation volontaire d'une donnée ancienne sans ce champ
    delete remote.reviewedModuleIds;

    expect(() => mergeUserProgress(local, remote)).not.toThrow();
    const merged = mergeUserProgress(local, remote);
    expect(merged.reviewedModuleIds).toEqual(["mod-a"]);
  });
});

describe("recordExerciseResult never loses previously recorded progress", () => {
  it("keeps completedExerciseIds from other exercises when a new one is recorded", () => {
    const mod = makeModule({
      id: "m2",
      slug: "m2",
      lessons: [
        {
          id: "m2-lesson",
          type: "entrainement",
          title: "Leçon",
          optional: false,
          activities: [
            {
              id: "m2-activity",
              title: "Activité",
              skillDomain: "vocabulaire",
              exercises: [
                {
                  id: "m2-ex1",
                  type: "vrai_faux",
                  skillId: "s1",
                  difficulty: "B1",
                  instructions: "",
                  statement: "A",
                  correctAnswer: true,
                  correction: { correctAnswer: "Vrai", explanation: "x" },
                },
                {
                  id: "m2-ex2",
                  type: "vrai_faux",
                  skillId: "s2",
                  difficulty: "B1",
                  instructions: "",
                  statement: "B",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "x" },
                },
              ],
            },
          ],
        },
      ],
    });

    let progress = makeProgress({
      moduleProgress: [makeModuleProgress({ moduleId: mod.id, completedExerciseIds: ["m2-ex1"] })],
    });
    progress = recordExerciseResult(progress, mod, mod.lessons[0].activities[0].exercises[1], true);

    const mp = progress.moduleProgress.find((p) => p.moduleId === mod.id);
    expect(mp?.completedExerciseIds).toEqual(expect.arrayContaining(["m2-ex1", "m2-ex2"]));
    expect(mp?.completed).toBe(true);
  });
});

describe("recordExerciseResult — historique par compétence (lib/review)", () => {
  // `gr-pronoms-complements` : un vrai skillId du catalogue (voir `data/skills.ts`) —
  // requis ici, `computeSkillProgress` n'émet une `SkillProgress` (et donc son
  // historique) que pour les compétences réellement présentes dans `PUBLIC_MODULES`.
  it("sets lastPracticedAt and starts recentOutcomes on the first result for a skill", () => {
    const mod = makeModule({
      id: "m3",
      slug: "m3",
      lessons: [{ id: "m3-lesson", type: "entrainement", title: "Leçon", optional: false, activities: [{ id: "m3-activity", title: "Activité", skillDomain: "grammaire", exercises: [{ id: "m3-ex1", type: "vrai_faux", skillId: "gr-pronoms-complements", difficulty: "B1", instructions: "", statement: "A", correctAnswer: true, correction: { correctAnswer: "Vrai", explanation: "x" } }] }] }],
    });
    const progress = recordExerciseResult(makeProgress(), mod, mod.lessons[0].activities[0].exercises[0], false);

    const sp = progress.skillProgress.find((s) => s.skillId === "gr-pronoms-complements");
    expect(sp?.recentOutcomes).toEqual([false]);
    expect(sp?.lastPracticedAt).not.toBeNull();
  });

  it("appends to recentOutcomes across successive results for the same skill, bounded to the last 5", () => {
    const exercises = Array.from({ length: 6 }, (_, i) => ({
      id: `m4-ex${i}`,
      type: "vrai_faux" as const,
      skillId: "gr-pronoms-complements",
      difficulty: "B1" as const,
      instructions: "",
      statement: "A",
      correctAnswer: true,
      correction: { correctAnswer: "Vrai", explanation: "x" },
    }));
    const mod = makeModule({
      id: "m4",
      slug: "m4",
      lessons: [{ id: "m4-lesson", type: "entrainement", title: "Leçon", optional: false, activities: [{ id: "m4-activity", title: "Activité", skillDomain: "vocabulaire", exercises }] }],
    });

    let progress = makeProgress();
    const outcomes = [true, false, true, true, false, true];
    for (let i = 0; i < exercises.length; i++) {
      progress = recordExerciseResult(progress, mod, exercises[i], outcomes[i]);
    }

    const sp = progress.skillProgress.find((s) => s.skillId === "gr-pronoms-complements");
    expect(sp?.recentOutcomes).toEqual([false, true, true, false, true]); // les 5 derniers, la première pratique tombée hors fenêtre
  });
});

describe("mergeUserProgress — historique par compétence (lib/review)", () => {
  it("keeps the history from whichever side practiced the skill most recently", () => {
    const staleLocal = makeProgress({
      skillProgress: [
        { skillId: "gr-pronoms-complements", domain: "grammaire", totalExercises: 5, completedExercises: 1, correctExercises: 1, successRate: 100, lastPracticedAt: "2026-01-01T00:00:00.000Z", recentOutcomes: [true] },
      ],
    });
    const freshRemote = makeProgress({
      skillProgress: [
        { skillId: "gr-pronoms-complements", domain: "grammaire", totalExercises: 5, completedExercises: 2, correctExercises: 0, successRate: 0, lastPracticedAt: "2026-02-01T00:00:00.000Z", recentOutcomes: [true, false] },
      ],
    });

    const merged = mergeUserProgress(staleLocal, freshRemote);
    const sp = merged.skillProgress.find((s) => s.skillId === "gr-pronoms-complements");
    expect(sp?.lastPracticedAt).toBe("2026-02-01T00:00:00.000Z");
    expect(sp?.recentOutcomes).toEqual([true, false]);
  });
});

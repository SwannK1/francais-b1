import { describe, expect, it } from "vitest";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { makePublicModule, makeModuleProgress, makeProgress } from "./fixtures";
import type { ExamAttempt } from "@/lib/pedagogy/types";

describe("getReviewItems — ordre et dédoublonnage", () => {
  it("lists a module marked à revoir first", () => {
    const mod = makePublicModule({ id: "flagged", slug: "flagged", title: "Module marqué" });
    const items = getReviewItems(makeProgress({ reviewedModuleIds: [mod.id] }), [mod]);
    expect(items[0]).toMatchObject({ kind: "module_flagged", title: "Module marqué", moduleId: mod.id });
  });

  it("silently drops a flagged module id that no longer exists (old/renamed data) instead of crashing", () => {
    const items = getReviewItems(makeProgress({ reviewedModuleIds: ["ghost-module"] }), []);
    expect(items).toEqual([]);
  });

  it("lists an in-progress module (started, not finished)", () => {
    const mod = makePublicModule({ id: "wip", slug: "wip", title: "Module en cours" });
    const progress = makeProgress({
      moduleProgress: [
        makeModuleProgress({
          moduleId: mod.id,
          completed: false,
          completedExerciseIds: ["wip-ex1"],
          lastActivityAt: "2026-01-01T00:00:00.000Z",
        }),
      ],
    });
    const items = getReviewItems(progress, [mod]);
    expect(items).toContainEqual(expect.objectContaining({ kind: "module_in_progress", title: "Module en cours" }));
  });

  it("never lists the same module twice when it is both flagged and in progress", () => {
    const mod = makePublicModule({ id: "both", slug: "both", title: "Module double" });
    const progress = makeProgress({
      reviewedModuleIds: [mod.id],
      moduleProgress: [
        makeModuleProgress({
          moduleId: mod.id,
          completed: false,
          completedExerciseIds: ["both-ex1"],
          lastActivityAt: "2026-01-01T00:00:00.000Z",
        }),
      ],
    });
    const items = getReviewItems(progress, [mod]);
    const titles = items.filter((item) => item.title === "Module double");
    expect(titles).toHaveLength(1);
    expect(titles[0].kind).toBe("module_flagged");
  });

  it("does not list a module that has not been started at all", () => {
    const mod = makePublicModule({ id: "untouched", slug: "untouched" });
    const items = getReviewItems(makeProgress(), [mod]);
    expect(items).toEqual([]);
  });

  it("sorts in-progress modules with the oldest last activity first (most neglected first)", () => {
    const stale = makePublicModule({ id: "stale", slug: "stale", title: "Ancien" });
    const fresh = makePublicModule({ id: "fresh", slug: "fresh", title: "Récent" });
    const progress = makeProgress({
      moduleProgress: [
        makeModuleProgress({ moduleId: fresh.id, completedExerciseIds: ["fresh-ex1"], lastActivityAt: "2026-02-01T00:00:00.000Z" }),
        makeModuleProgress({ moduleId: stale.id, completedExerciseIds: ["stale-ex1"], lastActivityAt: "2026-01-01T00:00:00.000Z" }),
      ],
    });
    const items = getReviewItems(progress, [stale, fresh]).filter((i) => i.kind === "module_in_progress");
    expect(items.map((i) => i.title)).toEqual(["Ancien", "Récent"]);
  });
});

describe("getReviewItems — compétences faibles (données réelles stables)", () => {
  it("includes a real weak skill by id, with its description", () => {
    // `ce-textes-courants` est un id de compétence structurel du curriculum
    // (pas un texte pédagogique susceptible de changer) — couplage volontaire,
    // au même titre que `stageId` pour `getNextModule`.
    const progress = makeProgress({
      weakSkillIds: ["ce-textes-courants"],
      skillProgress: [
        { skillId: "ce-textes-courants", domain: "comprehension_ecrite", totalExercises: 5, completedExercises: 2, correctExercises: 1, successRate: 50 },
      ],
    });
    const items = getReviewItems(progress, []);
    const weakItem = items.find((i) => i.kind === "weak_skill");
    expect(weakItem).toBeDefined();
    expect(weakItem?.description).toContain("50%");
  });

  it("silently ignores an unknown skill id rather than crashing", () => {
    const items = getReviewItems(makeProgress({ weakSkillIds: ["does-not-exist"] }), []);
    expect(items.filter((i) => i.kind === "weak_skill")).toEqual([]);
  });
});

describe("getReviewItems — épreuves d'examen (données réelles stables)", () => {
  function makeAttempt(overrides: Partial<ExamAttempt> = {}): ExamAttempt {
    return {
      id: "attempt-1",
      examId: "exam-b1-demo",
      startedAt: "2026-01-01T00:00:00.000Z",
      completedAt: "2026-01-01T00:10:00.000Z",
      status: "completed",
      sections: [
        {
          section: "comprehension_ecrite",
          status: "completed",
          score: 3,
          maxScore: 10,
          selfAssessed: false,
          completedExerciseIds: [],
          correctExerciseIds: [],
        },
      ],
      ...overrides,
    };
  }

  it("flags a low-scoring section (< 50%) from a completed attempt", () => {
    const items = getReviewItems(makeProgress({ examAttempts: [makeAttempt()] }), []);
    expect(items).toContainEqual(expect.objectContaining({ kind: "exam_section" }));
  });

  it("ignores a section that scored at or above the review threshold", () => {
    const attempt = makeAttempt({
      sections: [
        {
          section: "comprehension_ecrite",
          status: "completed",
          score: 8,
          maxScore: 10,
          selfAssessed: false,
          completedExerciseIds: [],
          correctExerciseIds: [],
        },
      ],
    });
    const items = getReviewItems(makeProgress({ examAttempts: [attempt] }), []);
    expect(items.filter((i) => i.kind === "exam_section")).toEqual([]);
  });

  it("ignores an attempt still in progress (no final score to judge yet)", () => {
    const attempt = makeAttempt({ status: "in_progress" });
    const items = getReviewItems(makeProgress({ examAttempts: [attempt] }), []);
    expect(items.filter((i) => i.kind === "exam_section")).toEqual([]);
  });

  it("never crashes on an examId that no longer matches any exam (old/removed data)", () => {
    const attempt = makeAttempt({ examId: "ghost-exam" });
    expect(() => getReviewItems(makeProgress({ examAttempts: [attempt] }), [])).not.toThrow();
    expect(getReviewItems(makeProgress({ examAttempts: [attempt] }), [])).toEqual([]);
  });
});

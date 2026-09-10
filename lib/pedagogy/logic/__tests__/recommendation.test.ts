import { describe, expect, it } from "vitest";
import { getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { makePublicModule, makeModuleProgress, makeProgress } from "./fixtures";

describe("getNextModule — reprise", () => {
  it("returns null when there is nothing to resume or start (clean fallback, no crash)", () => {
    const target = getNextModule(makeProgress(), []);
    expect(target).toBeNull();
  });

  it("prioritizes the most recently active in-progress module (literal resume)", () => {
    const older = makePublicModule({ id: "older", slug: "older" });
    const newer = makePublicModule({ id: "newer", slug: "newer" });
    const progress = makeProgress({
      moduleProgress: [
        makeModuleProgress({ moduleId: older.id, completed: false, lastActivityAt: "2026-01-01T00:00:00.000Z" }),
        makeModuleProgress({ moduleId: newer.id, completed: false, lastActivityAt: "2026-01-05T00:00:00.000Z" }),
      ],
    });

    const target = getNextModule(progress, [older, newer]);
    expect(target?.module.id).toBe("newer");
    expect(target?.isResuming).toBe(true);
  });

  it("falls back to the first not-yet-completed module when nothing is in progress", () => {
    const first = makePublicModule({ id: "first", slug: "first" });
    const second = makePublicModule({ id: "second", slug: "second" });
    const target = getNextModule(makeProgress(), [first, second]);
    expect(target?.module.id).toBe("first");
    expect(target?.isResuming).toBe(false);
  });

  it("never returns a completed module even when it is the most recently active", () => {
    const done = makePublicModule({ id: "done", slug: "done" });
    const next = makePublicModule({ id: "next", slug: "next" });
    const progress = makeProgress({
      moduleProgress: [
        makeModuleProgress({ moduleId: done.id, completed: true, lastActivityAt: "2026-02-01T00:00:00.000Z" }),
      ],
    });
    const target = getNextModule(progress, [done, next]);
    expect(target?.module.id).toBe("next");
  });

  it("never proposes a locked module: skips a locked in-progress module for the next accessible one", () => {
    const lockedInProgress = makePublicModule({ id: "locked", slug: "locked" });
    const accessible = makePublicModule({ id: "accessible", slug: "accessible" });
    const progress = makeProgress({
      moduleProgress: [
        makeModuleProgress({ moduleId: lockedInProgress.id, completed: false, lastActivityAt: "2026-01-01T00:00:00.000Z" }),
      ],
    });

    const target = getNextModule(progress, [lockedInProgress, accessible], {
      isAccessible: (mod) => mod.id !== "locked",
    });

    expect(target?.module.id).toBe("accessible");
  });

  it("never proposes a locked module in the fallback (first-incomplete) path either", () => {
    const lockedFirst = makePublicModule({ id: "locked-first", slug: "locked-first" });
    const accessibleSecond = makePublicModule({ id: "accessible-second", slug: "accessible-second" });
    const target = getNextModule(makeProgress(), [lockedFirst, accessibleSecond], {
      isAccessible: (mod) => mod.id !== "locked-first",
    });
    expect(target?.module.id).toBe("accessible-second");
  });

  it("returns null (clean fallback) rather than a locked module when nothing accessible remains", () => {
    const locked = makePublicModule({ id: "locked-only", slug: "locked-only" });
    const target = getNextModule(makeProgress(), [locked], { isAccessible: () => false });
    expect(target).toBeNull();
  });
});

describe("getNextModule — plancher de niveau (résultat du test de positionnement)", () => {
  it("ne renvoie jamais un utilisateur B1 sans progression vers un module A1 (régression du bug diagnostic→parcours)", () => {
    const a1Module = makePublicModule({ id: "a1-mod", slug: "a1-mod", level: "A1" });
    const b1Module = makePublicModule({ id: "b1-mod", slug: "b1-mod", level: "B1" });
    const progress = makeProgress({ level: "B1" });

    const target = getNextModule(progress, [a1Module, b1Module]);
    expect(target?.module.id).toBe("b1-mod");
    expect(target?.isResuming).toBe(false);
  });

  it("un utilisateur A2 saute les modules A1 mais reste éligible aux modules A2 et B1", () => {
    const a1Module = makePublicModule({ id: "a1-mod", slug: "a1-mod", level: "A1" });
    const a2Module = makePublicModule({ id: "a2-mod", slug: "a2-mod", level: "A2" });
    const progress = makeProgress({ level: "A2" });

    const target = getNextModule(progress, [a1Module, a2Module]);
    expect(target?.module.id).toBe("a2-mod");
  });

  it("retombe sur un module en-dessous du plancher plutôt que de renvoyer null si rien d'autre n'existe", () => {
    const a1Module = makePublicModule({ id: "a1-only", slug: "a1-only", level: "A1" });
    const progress = makeProgress({ level: "B1" });

    const target = getNextModule(progress, [a1Module]);
    expect(target?.module.id).toBe("a1-only");
  });

  it("une reprise (module déjà en cours) ignore le plancher de niveau — on ne bloque jamais une reprise réelle", () => {
    const a1Module = makePublicModule({ id: "a1-in-progress", slug: "a1-in-progress", level: "A1" });
    const progress = makeProgress({
      level: "B1",
      moduleProgress: [
        makeModuleProgress({ moduleId: a1Module.id, completed: false, lastActivityAt: "2026-01-01T00:00:00.000Z" }),
      ],
    });

    const target = getNextModule(progress, [a1Module]);
    expect(target?.module.id).toBe("a1-in-progress");
    expect(target?.isResuming).toBe(true);
  });
});

describe("getNextModule — remédiation après un passage de niveau", () => {
  const failedEvidence = {
    assessmentId: "passage-a1-a2",
    attemptId: "attempt-failed",
    checkpointKind: "passage" as const,
    fromLevel: "A1" as const,
    toLevel: "A2" as const,
    completedAt: "2026-09-09T12:00:00.000Z",
    overallCorrect: 4,
    overallTotal: 10,
    passed: false,
    insufficientDomains: ["comprehension_orale" as const],
  };

  it("propose d'abord un module accessible du domaine faible", () => {
    const generic = makePublicModule({ id: "generic", slug: "generic", level: "A1", domain: "vocabulaire", stageId: "a1-decouverte" });
    const listening = makePublicModule({ id: "listening", slug: "listening", level: "A1", domain: "comprehension_orale", stageId: "a1-decouverte" });
    const target = getNextModule(makeProgress({ level: "A1", assessmentEvidence: [failedEvidence] }), [generic, listening]);

    expect(target?.module.id).toBe("listening");
    expect(target?.reason).toContain("compréhension orale");
  });

  it("ignore un module de remédiation verrouillé", () => {
    const listening = makePublicModule({ id: "listening", slug: "listening", level: "A1", domain: "comprehension_orale", stageId: "a1-decouverte" });
    const generic = makePublicModule({ id: "generic", slug: "generic", level: "A1", domain: "vocabulaire", stageId: "a1-decouverte" });
    const target = getNextModule(
      makeProgress({ level: "A1", assessmentEvidence: [failedEvidence] }),
      [listening, generic],
      { isAccessible: (mod) => mod.id !== "listening" }
    );

    expect(target?.module.id).toBe("generic");
    expect(target?.reason).toBeUndefined();
  });

  it("une réussite plus récente annule la remédiation issue d'un ancien échec", () => {
    const generic = makePublicModule({ id: "generic", slug: "generic", level: "A1", domain: "vocabulaire", stageId: "a1-decouverte" });
    const listening = makePublicModule({ id: "listening", slug: "listening", level: "A1", domain: "comprehension_orale", stageId: "a1-decouverte" });
    const passedEvidence = {
      ...failedEvidence,
      attemptId: "attempt-passed",
      completedAt: "2026-09-10T12:00:00.000Z",
      passed: true,
      insufficientDomains: [],
    };
    const target = getNextModule(
      makeProgress({ level: "A1", assessmentEvidence: [failedEvidence, passedEvidence] }),
      [generic, listening]
    );

    expect(target?.module.id).toBe("generic");
    expect(target?.reason).toBeUndefined();
  });
});

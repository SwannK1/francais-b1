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

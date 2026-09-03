import { readFileSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";

const track = vi.fn();
vi.mock("@vercel/analytics/server", () => ({ track }));

afterEach(() => {
  track.mockClear();
});

describe("trackServerEvent (lib/analytics/server)", () => {
  it("forwards the event name and properties to the underlying provider", async () => {
    const { trackServerEvent } = await import("@/lib/analytics/server");
    await trackServerEvent("purchase_completed");

    expect(track).toHaveBeenCalledWith("purchase_completed", undefined);
  });

  it("never rejects when the provider throws — must never fail the request it's attached to", async () => {
    track.mockImplementationOnce(() => {
      throw new Error("network unreachable");
    });
    const { trackServerEvent } = await import("@/lib/analytics/server");

    await expect(trackServerEvent("checkout_failed", { reason: "stripe_session_creation_failed" })).resolves.toBeUndefined();
  });

  it("is always called fire-and-forget (void) by real call sites, never awaited into the response path", () => {
    // Un `await trackServerEvent(...)` ajouterait de la latence à une réponse
    // pour un simple événement produit — voir docs/analytics/product-analytics.md.
    const root = process.cwd();
    const files = execSync("git ls-files 'app/**/*.ts' 'app/**/*.tsx'", { cwd: root })
      .toString()
      .trim()
      .split("\n")
      .filter(Boolean);

    const offenders: string[] = [];
    for (const file of files) {
      const source = readFileSync(path.join(root, file), "utf8");
      for (const match of source.matchAll(/(await\s+)?trackServerEvent\(/g)) {
        if (match[1]) offenders.push(file);
      }
    }

    expect(offenders).toEqual([]);
  });
});

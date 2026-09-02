import { afterEach, describe, expect, it, vi } from "vitest";

const inject = vi.fn();
const track = vi.fn();
vi.mock("@vercel/analytics", () => ({ inject, track }));

afterEach(() => {
  track.mockClear();
  inject.mockClear();
});

describe("trackEvent (lib/analytics/client)", () => {
  it("forwards the event name and properties to the underlying provider", async () => {
    const { trackEvent } = await import("@/lib/analytics/client");
    trackEvent("module_completed", { moduleId: "se-presenter" });

    expect(track).toHaveBeenCalledWith("module_completed", { moduleId: "se-presenter" });
  });

  it("never throws when the provider is unavailable — a product flow must never break because of analytics", async () => {
    track.mockImplementationOnce(() => {
      throw new Error("blocked by an ad-blocker");
    });
    const { trackEvent } = await import("@/lib/analytics/client");

    expect(() => trackEvent("premium_cta_clicked", { source: "pricing" })).not.toThrow();
  });

  it("works fine with no properties at all", async () => {
    const { trackEvent } = await import("@/lib/analytics/client");
    expect(() => trackEvent("placement_started")).not.toThrow();
    expect(track).toHaveBeenCalledWith("placement_started", undefined);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import ViewTracker from "@/lib/analytics/ViewTracker";
import { trackEvent } from "@/lib/analytics/client";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.mocked(trackEvent).mockClear();
});

describe("ViewTracker", () => {
  it("tracks the given event exactly once on mount, with its properties", () => {
    render(<ViewTracker event="journey_viewed" />);
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("journey_viewed", undefined);
  });

  it("forwards properties unchanged", () => {
    render(<ViewTracker event="stage_viewed" properties={{ stageId: "b1-debut" }} />);
    expect(trackEvent).toHaveBeenCalledWith("stage_viewed", { stageId: "b1-debut" });
  });

  it("never re-fires on a re-render with new props (guarded by a mount ref, not an effect dependency)", () => {
    const { rerender } = render(<ViewTracker event="journey_viewed" properties={{ source: "a" }} />);
    rerender(<ViewTracker event="journey_viewed" properties={{ source: "b" }} />);
    rerender(<ViewTracker event="journey_viewed" properties={{ source: "c" }} />);

    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it("renders nothing", () => {
    const { container } = render(<ViewTracker event="journey_viewed" />);
    expect(container).toBeEmptyDOMElement();
  });
});

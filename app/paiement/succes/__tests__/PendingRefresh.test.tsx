import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import PendingRefresh from "@/app/paiement/succes/PendingRefresh";

const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh }) }));

beforeEach(() => {
  vi.useFakeTimers();
  refresh.mockClear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("PendingRefresh — évite à l'apprenant de recharger la page lui-même", () => {
  it("does not refresh before the delay has elapsed", () => {
    render(<PendingRefresh />);
    vi.advanceTimersByTime(3999);
    expect(refresh).not.toHaveBeenCalled();
  });

  it("refreshes the page once, automatically, after the delay", () => {
    render(<PendingRefresh />);
    vi.advanceTimersByTime(4000);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("never fires after unmount (no stray refresh on a page the learner already left)", () => {
    const { unmount } = render(<PendingRefresh />);
    unmount();
    vi.advanceTimersByTime(4000);
    expect(refresh).not.toHaveBeenCalled();
  });

  it("renders nothing", () => {
    const { container } = render(<PendingRefresh />);
    expect(container).toBeEmptyDOMElement();
  });
});

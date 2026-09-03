import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutButton from "@/components/commerce/CheckoutButton";
import { trackEvent } from "@/lib/analytics/client";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

afterEach(() => {
  cleanup();
  vi.mocked(trackEvent).mockClear();
  push.mockClear();
  vi.unstubAllGlobals();
});

describe("CheckoutButton", () => {
  it("tracks premium_cta_clicked with its source as soon as the learner clicks", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ url: "https://stripe.test/x" }) })
    );

    render(<CheckoutButton label="S'abonner" source="pricing" />);
    fireEvent.click(screen.getByRole("button", { name: "S'abonner" }));

    expect(trackEvent).toHaveBeenCalledWith("premium_cta_clicked", { source: "pricing" });
    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled());
  });

  it("tracks checkout_failed (not premium_cta_clicked again) when the session has no checkout URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
    );

    render(<CheckoutButton label="S'abonner" source="offre_page" />);
    fireEvent.click(screen.getByRole("button", { name: "S'abonner" }));

    await waitFor(() =>
      expect(trackEvent).toHaveBeenCalledWith("checkout_failed", {
        source: "offre_page",
        reason: "client_no_checkout_url",
      })
    );
    expect(screen.getByText(/paiement n'est pas disponible/i)).toBeInTheDocument();
  });

  it("tracks checkout_failed on a network error, distinct from a client_no_checkout_url reason", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<CheckoutButton label="S'abonner" source="pricing" />);
    fireEvent.click(screen.getByRole("button", { name: "S'abonner" }));

    await waitFor(() =>
      expect(trackEvent).toHaveBeenCalledWith("checkout_failed", {
        source: "pricing",
        reason: "client_network_error",
      })
    );
  });

  it("never tracks checkout_failed on the expected unauthenticated redirect (401)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({}) }));

    render(<CheckoutButton label="S'abonner" source="pricing" />);
    fireEvent.click(screen.getByRole("button", { name: "S'abonner" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/connexion?next=/offre"));
    expect(trackEvent).not.toHaveBeenCalledWith("checkout_failed", expect.anything());
  });
});

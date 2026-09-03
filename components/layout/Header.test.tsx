// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Header from "@/components/layout/Header";
import AppHeader from "@/components/layout/AppHeader";
import { AuthProvider } from "@/lib/auth/AuthProvider";

// `AccountStatus` (rendu par les deux en-têtes) appelle `useRouter()` pour la
// déconnexion — non pertinent pour ces tests (skip link / menu mobile), et
// `useRouter` exige un vrai contexte App Router absent d'un rendu RTL isolé.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), back: vi.fn(), replace: vi.fn() }),
}));

/**
 * Couvre les deux régressions les plus faciles à casser silencieusement sur
 * ces en-têtes : le lien d'évitement (skip link) doit cibler un `#main-content`
 * qui existe réellement sur la page, et le menu mobile doit rester pilotable
 * au clavier (aria-expanded synchronisé, bascule ouverte/fermée).
 */

beforeEach(() => {
  // AuthProvider tente `/api/auth/me` au montage — pas de serveur ici, l'échec
  // attendu est intercepté par son propre `catch` (voir AuthProvider.tsx) et
  // résout simplement vers "non connecté", ce qui suffit pour ces tests.
  vi.stubGlobal(
    "fetch",
    vi.fn().mockRejectedValue(new Error("no network in test"))
  );
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderWithMain(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      {ui}
      <main id="main-content">Contenu</main>
    </AuthProvider>
  );
}

describe.each([
  ["Header (marketing)", Header],
  ["AppHeader (application)", AppHeader],
])("%s", (_label, HeaderComponent) => {
  it("expose un lien d'évitement qui cible le #main-content de la page", () => {
    renderWithMain(<HeaderComponent />);
    const skipLink = screen.getByRole("link", { name: "Aller au contenu principal" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(document.querySelector("#main-content")).not.toBeNull();
  });

  it("le menu mobile démarre fermé et s'ouvre/se ferme au clavier avec aria-expanded synchronisé", async () => {
    const user = userEvent.setup();
    renderWithMain(<HeaderComponent />);

    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.tab(); // saute le skip link
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toBe(toggle);

    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PremiumLock from "@/components/commerce/PremiumLock";

afterEach(cleanup);

describe("PremiumLock", () => {
  it("shows the module's public description and objectives as a preview, never just a bare title", () => {
    render(
      <PremiumLock
        title="Chercher un logement"
        description="Comprendre une annonce et échanger avec un propriétaire."
        objectives={["Lire une annonce immobilière", "Poser des questions avant une visite", "Négocier un bail"]}
        backHref="/parcours"
        backLabel="← Retour au parcours"
      />
    );

    expect(screen.getByRole("heading", { name: "Chercher un logement" })).toBeInTheDocument();
    expect(
      screen.getByText("Comprendre une annonce et échanger avec un propriétaire.")
    ).toBeInTheDocument();
    expect(screen.getByText("Lire une annonce immobilière")).toBeInTheDocument();
    expect(screen.getByText("Poser des questions avant une visite")).toBeInTheDocument();
  });

  it("caps the preview at 3 objectives even if more are provided", () => {
    render(
      <PremiumLock
        title="Module test"
        objectives={["Un", "Deux", "Trois", "Quatre"]}
        backHref="/parcours"
        backLabel="← Retour"
      />
    );

    expect(screen.getByText("Trois")).toBeInTheDocument();
    expect(screen.queryByText("Quatre")).not.toBeInTheDocument();
  });

  it("degrades gracefully when no description/objectives are provided (exam case)", () => {
    render(<PremiumLock title="DELF B1 — Examen blanc 1" backHref="/parcours/examens" backLabel="← Retour aux examens" />);

    expect(screen.getByRole("heading", { name: "DELF B1 — Examen blanc 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voir l'offre complète/i })).toBeInTheDocument();
  });

  it("always offers a way back and a way forward to the offer, whatever the content available", () => {
    render(<PremiumLock title="Module test" backHref="/parcours" backLabel="← Retour au parcours" />);

    expect(screen.getByRole("link", { name: "← Retour au parcours" })).toHaveAttribute("href", "/parcours");
    expect(screen.getByRole("link", { name: /voir l'offre complète/i })).toHaveAttribute("href", "/offre");
  });
});

import { describe, expect, it } from "vitest";
import { canAccess, isFreeResource, isPremiumActive } from "@/lib/commerce/access";

/**
 * `canAccess` est le seul point de décision "gratuit vs premium" — voir le
 * commentaire du fichier. Ces tests couvrent explicitement la matrice du
 * chantier cycle utilisateur : anonyme, gratuit, premium, module/étape/examen
 * gratuit vs payant, abonnement expiré.
 */

describe("isPremiumActive", () => {
  it("est false pour null/undefined (jamais abonné)", () => {
    expect(isPremiumActive(null)).toBe(false);
    expect(isPremiumActive(undefined)).toBe(false);
  });

  it("est false pour une date passée (abonnement expiré)", () => {
    expect(isPremiumActive(new Date(Date.now() - 60_000).toISOString())).toBe(false);
  });

  it("est true pour une date future", () => {
    expect(isPremiumActive(new Date(Date.now() + 60_000).toISOString())).toBe(true);
  });
});

describe("isFreeResource", () => {
  it("l'étape de positionnement est gratuite", () => {
    expect(isFreeResource({ kind: "stage", stageId: "faire-le-point" })).toBe(true);
  });

  it("une étape de contenu n'est pas gratuite", () => {
    expect(isFreeResource({ kind: "stage", stageId: "b1-debut" })).toBe(false);
  });

  it("les 2 modules de découverte sont gratuits, les autres non", () => {
    expect(isFreeResource({ kind: "module", slug: "se-presenter" })).toBe(true);
    expect(isFreeResource({ kind: "module", slug: "decrire-vie-quotidienne" })).toBe(true);
    expect(isFreeResource({ kind: "module", slug: "donner-son-opinion" })).toBe(false);
  });

  it("aucun examen n'est gratuit (valeur centrale de l'offre payante)", () => {
    expect(isFreeResource({ kind: "exam", slug: "delf-b1-examen-blanc-1" })).toBe(false);
    expect(isFreeResource({ kind: "exam", slug: "n'importe-quoi" })).toBe(false);
  });
});

describe("canAccess — matrice anonyme/gratuit/premium", () => {
  const freeModule = { kind: "module", slug: "se-presenter" } as const;
  const paidModule = { kind: "module", slug: "donner-son-opinion" } as const;
  const paidExam = { kind: "exam", slug: "delf-b1-examen-blanc-1" } as const;

  it("visiteur anonyme (premiumUntil undefined) : accède au contenu gratuit, pas au payant", () => {
    expect(canAccess(freeModule, undefined)).toBe(true);
    expect(canAccess(paidModule, undefined)).toBe(false);
    expect(canAccess(paidExam, undefined)).toBe(false);
  });

  it("compte gratuit (premiumUntil null) : identique à anonyme", () => {
    expect(canAccess(freeModule, null)).toBe(true);
    expect(canAccess(paidModule, null)).toBe(false);
  });

  it("compte premium actif : accède à tout", () => {
    const active = new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString();
    expect(canAccess(paidModule, active)).toBe(true);
    expect(canAccess(paidExam, active)).toBe(true);
  });

  it("abonnement premium expiré : retombe au niveau gratuit, comme un compte jamais abonné", () => {
    const expired = new Date(Date.now() - 24 * 60 * 60_000).toISOString();
    expect(canAccess(freeModule, expired)).toBe(true);
    expect(canAccess(paidModule, expired)).toBe(false);
  });
});

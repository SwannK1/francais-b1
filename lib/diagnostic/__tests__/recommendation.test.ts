import { describe, expect, it } from "vitest";
import { recommendStage } from "@/lib/diagnostic/recommendation";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";

/**
 * Le diagnostic doit orienter vers un vrai point d'entrée du niveau estimé —
 * jamais une étape B1 utilisée comme repli générique pour A1/A2 (bug corrigé
 * lors de l'intégration produit : avant, A1 et A2 pointaient tous les deux
 * vers "poser-les-bases", une étape B1). Voir docs/diagnostic-scoring.md
 * § Recommandation.
 */
describe("recommendStage — destinations réelles A1/A2/B1", () => {
  it("A1 : oriente vers la vraie première étape A1 (decouverte)", () => {
    const recommendation = recommendStage("A1", []);
    expect(recommendation.stageSlug).toBe("/parcours/decouverte");
    const stage = PARCOURS_STAGES.find((s) => s.slug === "decouverte");
    expect(stage?.id).toBe("a1-decouverte");
  });

  it("A2 : oriente vers la vraie première étape de contenu A2 (a2-poser-les-bases), jamais une étape B1", () => {
    const recommendation = recommendStage("A2", []);
    expect(recommendation.stageSlug).toBe("/parcours/a2-poser-les-bases");
    const stage = PARCOURS_STAGES.find((s) => s.slug === "a2-poser-les-bases");
    expect(stage?.id).toBe("a2-debut");
  });

  it("B1 avec compétences fragiles : consolide d'abord (poser-les-bases)", () => {
    const recommendation = recommendStage("B1", ["grammaire"]);
    expect(recommendation.stageSlug).toBe("/parcours/poser-les-bases");
  });

  it("B1 sans fragilité : passe directement à l'étape suivante (argumenter-et-echanger)", () => {
    const recommendation = recommendStage("B1", []);
    expect(recommendation.stageSlug).toBe("/parcours/argumenter-et-echanger");
  });

  it("toutes les destinations recommandées correspondent à une étape réelle du parcours", () => {
    for (const [level, weaknesses] of [
      ["A1", []],
      ["A2", []],
      ["B1", []],
      ["B1", ["vocabulaire"]],
    ] as const) {
      const recommendation = recommendStage(level, [...weaknesses]);
      expect(recommendation.stageSlug).not.toBe("/parcours");
      const slug = recommendation.stageSlug.replace("/parcours/", "");
      expect(PARCOURS_STAGES.some((s) => s.slug === slug)).toBe(true);
    }
  });
});

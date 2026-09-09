import { describe, expect, it } from "vitest";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/diagnostic/questions";
import { DIAGNOSTIC_LEVELS, DIAGNOSTIC_SKILLS } from "@/lib/diagnostic/types";
import { PLACEMENT_QUESTIONS } from "@/lib/pedagogy/data/placement-questions";

/**
 * Garde-fou de contenu pour la banque de questions du diagnostic — même
 * esprit que `lib/pedagogy/data/content-integrity.test.ts`, mais limité à ce
 * chantier (aucune dépendance à la structure `Module`/`Exercise`).
 */

function duplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

describe("DIAGNOSTIC_QUESTIONS", () => {
  it("a exactement 18 questions (dans la fourchette 15-25 demandée)", () => {
    expect(DIAGNOSTIC_QUESTIONS.length).toBe(18);
    expect(DIAGNOSTIC_QUESTIONS.length).toBeGreaterThanOrEqual(15);
    expect(DIAGNOSTIC_QUESTIONS.length).toBeLessThanOrEqual(25);
  });

  it("a des ids de question uniques", () => {
    expect(duplicates(DIAGNOSTIC_QUESTIONS.map((q) => q.id))).toEqual([]);
  });

  it("n'a aucune collision d'id avec la banque du test de positionnement existant (/test-niveau)", () => {
    const diagnosticIds = new Set(DIAGNOSTIC_QUESTIONS.map((q) => q.id));
    const placementIds = new Set(PLACEMENT_QUESTIONS.map((q) => q.id));
    const collisions = [...diagnosticIds].filter((id) => placementIds.has(id));
    expect(collisions).toEqual([]);
  });

  it("a, pour chaque question, des choix avec ids uniques et un correctChoiceId valide", () => {
    const issues: string[] = [];
    for (const q of DIAGNOSTIC_QUESTIONS) {
      const choiceIds = q.choices.map((c) => c.id);
      if (duplicates(choiceIds).length) issues.push(`${q.id}: ids de choix dupliqués`);
      if (!choiceIds.includes(q.correctChoiceId)) issues.push(`${q.id}: correctChoiceId hors limites`);
      if (q.choices.length < 2) issues.push(`${q.id}: moins de 2 choix`);
      if (!q.prompt.trim()) issues.push(`${q.id}: prompt vide`);
    }
    expect(issues).toEqual([]);
  });

  it("répartit les questions à parts égales entre les 3 paliers de niveau", () => {
    for (const level of DIAGNOSTIC_LEVELS) {
      expect(DIAGNOSTIC_QUESTIONS.filter((q) => q.level === level).length).toBe(6);
    }
  });

  it("répartit les questions à parts égales entre les 3 domaines, sur l'ensemble de la banque", () => {
    for (const skill of DIAGNOSTIC_SKILLS) {
      expect(DIAGNOSTIC_QUESTIONS.filter((q) => q.skill === skill).length).toBe(6);
    }
  });

  it("a un ordre d'affichage (`order`) unique au sein de chaque palier", () => {
    for (const level of DIAGNOSTIC_LEVELS) {
      const orders = DIAGNOSTIC_QUESTIONS.filter((q) => q.level === level).map((q) => q.order);
      expect(duplicates(orders.map(String))).toEqual([]);
    }
  });

  it("est administrée dans l'ordre A1 -> A2 -> B1 (difficulté progressive)", () => {
    const levelsInOrder = DIAGNOSTIC_QUESTIONS.map((q) => q.level);
    const firstA2Index = levelsInOrder.indexOf("A2");
    const firstB1Index = levelsInOrder.indexOf("B1");
    const lastA1Index = levelsInOrder.lastIndexOf("A1");
    const lastA2Index = levelsInOrder.lastIndexOf("A2");

    expect(lastA1Index).toBeLessThan(firstA2Index);
    expect(lastA2Index).toBeLessThan(firstB1Index);
  });
});

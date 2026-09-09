import { describe, expect, it } from "vitest";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { SKILLS } from "@/lib/pedagogy/data/skills";
import { buildReviewHistory } from "@/lib/review/adapter";
import { buildReviewRecommendations } from "@/lib/review/engine";
import { makeProgress } from "@/lib/pedagogy/logic/__tests__/fixtures";
import type { SkillProgress } from "@/lib/pedagogy/types";

/**
 * Le moteur de révision espacée (`lib/review/`) est écrit sans notion de
 * niveau : il ne raisonne qu'en `skillId`/`difficulty` (voir `engine.ts`).
 * Ces tests vérifient qu'il produit bien un résultat exploitable une fois
 * branché sur le vrai catalogue fusionné A1 + A2 + B1
 * (`docs/integration/a1-a2-b1-integration.md`), pas seulement sur des
 * fixtures isolées — aucune logique B1-only ne doit subsister par accident.
 */

function skillProgressFor(skillId: string, domain: SkillProgress["domain"]): SkillProgress {
  return {
    skillId,
    domain,
    totalExercises: 4,
    completedExercises: 3,
    correctExercises: 1,
    successRate: 33,
    lastPracticedAt: "2026-08-01T00:00:00.000Z",
    recentOutcomes: [false, false],
  };
}

function firstSkillIdForPrefix(prefix: string): { skillId: string; domain: SkillProgress["domain"] } {
  const skill = SKILLS.find((s) => s.id.startsWith(prefix));
  if (!skill) throw new Error(`Aucune compétence trouvée avec le préfixe "${prefix}" dans SKILLS`);
  return { skillId: skill.id, domain: skill.domain };
}

describe("moteur de révision espacée sur le catalogue fusionné A1 + A2 + B1", () => {
  it.each([
    ["A1", "a1-"],
    ["A2", "a2-"],
    ["B1", ""],
  ] as const)("produit une recommandation exploitable pour une compétence %s en série d'erreurs", (level, prefix) => {
    const { skillId, domain } =
      prefix === ""
        ? // Les skillId B1 n'ont pas de préfixe dédié : on prend la première
          // compétence qui n'appartient ni à A1 ni à A2.
          (() => {
            const skill = SKILLS.find((s) => !s.id.startsWith("a1-") && !s.id.startsWith("a2-"));
            if (!skill) throw new Error("Aucune compétence B1 trouvée dans SKILLS");
            return { skillId: skill.id, domain: skill.domain };
          })()
        : firstSkillIdForPrefix(prefix);

    const progress = makeProgress({
      level,
      skillProgress: [skillProgressFor(skillId, domain)],
    });

    const history = buildReviewHistory(progress, PUBLIC_MODULES);
    const recommendations = buildReviewRecommendations(history);

    const recommendation = recommendations.find((r) => r.skillId === skillId);
    expect(recommendation).toBeDefined();
    expect(recommendation!.state).toBe("fragile");
    expect(recommendation!.priority.band).toBe("haute");
    // Un vrai point d'entrée du produit, jamais un lien mort ni un repli
    // générique alors qu'un module réel existe pour cette compétence.
    expect(recommendation!.href).toMatch(/^\/parcours\/module\//);
  });
});

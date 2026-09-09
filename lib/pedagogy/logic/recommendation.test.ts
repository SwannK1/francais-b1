import { describe, expect, it } from "vitest";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { buildDailySession } from "@/lib/daily/session-engine";
import { canAccess } from "@/lib/commerce/access";
import type { UserProgress } from "@/lib/pedagogy/types";

function isAccessibleFree(mod: (typeof PUBLIC_MODULES)[number]): boolean {
  return canAccess({ kind: "module", slug: mod.slug }, null);
}

/**
 * Étape 9 du chantier "contenu premium hors bundle" : les recommandations et
 * le calcul de progression doivent fonctionner à partir des seules
 * métadonnées publiques — ces tests les font tourner directement sur
 * `PUBLIC_MODULES` (jamais `MODULES`), la même donnée que celle réellement
 * utilisée par l'UI (`ParcoursExperience`, `PrimaryCta`...) depuis ce
 * chantier. S'ils passent, ces fonctions n'ont besoin d'aucune donnée
 * privée pour produire une recommandation correcte.
 */

function emptyProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    userId: "u1",
    level: "B1",
    moduleProgress: [],
    skillProgress: [],
    globalSuccessRate: 0,
    lastActivityAt: null,
    weakSkillIds: [],
    placementCompletedAt: null,
    examAttempts: [],
    reviewedModuleIds: [],
    ...overrides,
  };
}

describe("getNextModule sur PUBLIC_MODULES", () => {
  it("propose le premier module non terminé de la première étape, sans avoir besoin du contenu complet", () => {
    const result = getNextModule(emptyProgress(), PUBLIC_MODULES);
    expect(result).not.toBeNull();
    expect(result!.module.id).toBeTruthy();
    expect(result!.module.slug).toBeTruthy();
    expect(result!.isResuming).toBe(false);
  });

  it("reprend le module déjà en cours le plus récemment actif", () => {
    const target = PUBLIC_MODULES[3];
    const progress = emptyProgress({
      moduleProgress: [
        {
          moduleId: target.id,
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: [],
          correctExerciseIds: [],
          lastActivityAt: "2026-08-01T00:00:00.000Z",
        },
      ],
    });
    const result = getNextModule(progress, PUBLIC_MODULES);
    expect(result?.module.id).toBe(target.id);
    expect(result?.isResuming).toBe(true);
  });

  /**
   * Asymétrie gratuit/premium connue et documentée (lib/commerce/access.ts,
   * docs/product/free-premium-audit.md) : `FREE_MODULE_SLUGS` n'ouvre que 2
   * modules B1, aucun A1/A2. Conséquence assumée, pas un bug : pour un
   * utilisateur gratuit diagnostiqué A1, `getNextModule` ignore tous les
   * modules A1/A2 (aucun n'est `isAccessible`) et atterrit sur ce module B1
   * dès la première visite. Ce test documente le comportement réel — pas
   * une régression à corriger ici, voir docs/product/release-candidate.md.
   */
  it("pour un utilisateur gratuit A1, la recommandation retombe sur le module B1 gratuit (asymétrie connue, pas une régression)", () => {
    const result = getNextModule(emptyProgress({ level: "A1" }), PUBLIC_MODULES, {
      isAccessible: isAccessibleFree,
    });
    expect(result).not.toBeNull();
    expect(isAccessibleFree(result!.module)).toBe(true);
    expect(result!.module.level).toBe("B1");
  });
});

describe("buildDailySession sur PUBLIC_MODULES", () => {
  it.each(["A1", "A2", "B1"] as const)(
    "recommande une séance cohérente pour un niveau %s sans lire le contenu réel des exercices",
    (level) => {
      const plan = buildDailySession(emptyProgress({ level }), PUBLIC_MODULES);
      expect(plan).not.toBeNull();
      expect(plan!.steps.length).toBeGreaterThan(0);
      expect(plan!.totalEstimatedMinutes).toBeGreaterThan(0);
    }
  );

  it("renvoie null si aucun module n'existe pour le niveau demandé", () => {
    // Catalogue volontairement filtré pour ne contenir aucun module B1 :
    // simule un niveau pas encore couvert (le cas réel visé par ce
    // fallback, voir le commentaire de `buildDailySession`). B2 ne convient
    // plus pour ce test depuis que `getEffectiveLevel` le plafonne à B1 (un
    // résultat de diagnostic B2 doit désormais recevoir une vraie séance
    // B1, voir `lib/pedagogy/logic/__tests__/parcours.test.ts`).
    const noB1Modules = PUBLIC_MODULES.filter((mod) => mod.level !== "B1");
    const plan = buildDailySession(emptyProgress({ level: "B1" }), noB1Modules);
    expect(plan).toBeNull();
  });

  it("un résultat de diagnostic B2 reçoit une vraie séance B1, jamais 'rien à faire aujourd'hui'", () => {
    const plan = buildDailySession(emptyProgress({ level: "B2" }), PUBLIC_MODULES);
    expect(plan).not.toBeNull();
    expect(plan!.steps.length).toBeGreaterThan(0);
  });
});

describe("getModuleCompletionRate sur les métadonnées publiques", () => {
  it("calcule un pourcentage cohérent à partir de totalExercises précalculé, sans compter le détail des exercices", () => {
    const mod = PUBLIC_MODULES[0];
    const progress = emptyProgress({
      moduleProgress: [
        {
          moduleId: mod.id,
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: mod.lessons[0].activities[0].exercises.slice(0, 1).map((e) => e.id),
          correctExerciseIds: [],
          lastActivityAt: null,
        },
      ],
    });
    const rate = getModuleCompletionRate(progress, mod.id, mod.totalExercises);
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThanOrEqual(100);
  });
});

import { describe, expect, it } from "vitest";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { computeDailySession, getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import type { UserProgress } from "@/lib/pedagogy/types";

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
});

describe("computeDailySession sur PUBLIC_MODULES", () => {
  it("recommande une séance cohérente (compte d'exercices, audio/écriture) sans lire le contenu réel des exercices", () => {
    const session = computeDailySession(emptyProgress(), PUBLIC_MODULES);
    expect(session).not.toBeNull();
    expect(session!.exerciseCount).toBeGreaterThan(0);
    expect(typeof session!.includesListening).toBe("boolean");
    expect(typeof session!.includesWriting).toBe("boolean");
  });

  it("renvoie null si aucun module n'existe pour le niveau demandé", () => {
    const session = computeDailySession(emptyProgress({ level: "A1" }), PUBLIC_MODULES);
    expect(session).toBeNull();
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

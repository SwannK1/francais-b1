import { describe, expect, it } from "vitest";
import { mergeUserProgress } from "@/lib/pedagogy/logic/progress";
import type { UserProgress } from "@/lib/pedagogy/types";

/**
 * `mergeUserProgress` est le point critique du cycle utilisateur : c'est ce
 * qui décide, à la connexion (et désormais à chaque synchronisation
 * d'arrière-plan, voir app/api/progress/route.ts), ce qu'un utilisateur
 * retrouve de sa progression. Toute régression ici est un utilisateur qui
 * perd du travail — ces tests couvrent explicitement les scénarios du
 * chantier cycle utilisateur (local seul, serveur seul, conflit, doublon).
 */

function baseProgress(overrides: Partial<UserProgress> = {}): UserProgress {
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
    ...overrides,
  };
}

describe("mergeUserProgress — niveau et date de positionnement", () => {
  it("garde le niveau ET la date du même côté quand seul le compte distant a passé le test (régression : ne pas mélanger les deux champs de sources différentes)", () => {
    const local = baseProgress({ level: "B1", placementCompletedAt: null });
    const remote = baseProgress({ level: "A2", placementCompletedAt: "2026-08-01T00:00:00.000Z" });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("A2");
    expect(merged.placementCompletedAt).toBe("2026-08-01T00:00:00.000Z");
  });

  it("garde le niveau ET la date du côté local quand seul l'appareil local a passé le test", () => {
    const local = baseProgress({ level: "A2", placementCompletedAt: "2026-08-01T00:00:00.000Z" });
    const remote = baseProgress({ level: "B1", placementCompletedAt: null });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("A2");
    expect(merged.placementCompletedAt).toBe("2026-08-01T00:00:00.000Z");
  });

  it("quand les deux ont passé le test, garde le résultat le plus récent (niveau + date ensemble)", () => {
    const local = baseProgress({ level: "B2", placementCompletedAt: "2026-08-10T00:00:00.000Z" });
    const remote = baseProgress({ level: "A2", placementCompletedAt: "2026-08-01T00:00:00.000Z" });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("B2");
    expect(merged.placementCompletedAt).toBe("2026-08-10T00:00:00.000Z");
  });

  it("si ni l'un ni l'autre n'a passé le test, placementCompletedAt reste null", () => {
    const merged = mergeUserProgress(baseProgress(), baseProgress());
    expect(merged.placementCompletedAt).toBeNull();
  });
});

describe("mergeUserProgress — modules (union, jamais de perte)", () => {
  it("fusionne les exercices complétés de deux appareils différents pour le même module sans doublon", () => {
    const local = baseProgress({
      moduleProgress: [
        {
          moduleId: "m1",
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: ["ex-1", "ex-2"],
          correctExerciseIds: ["ex-1"],
          lastActivityAt: "2026-08-01T00:00:00.000Z",
        },
      ],
    });
    const remote = baseProgress({
      moduleProgress: [
        {
          moduleId: "m1",
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: ["ex-2", "ex-3"],
          correctExerciseIds: ["ex-3"],
          lastActivityAt: "2026-08-05T00:00:00.000Z",
        },
      ],
    });

    const merged = mergeUserProgress(local, remote);
    const mp = merged.moduleProgress.find((m) => m.moduleId === "m1")!;

    expect(mp.completedExerciseIds.sort()).toEqual(["ex-1", "ex-2", "ex-3"]);
    expect(mp.correctExerciseIds.sort()).toEqual(["ex-1", "ex-3"]);
    expect(mp.lastActivityAt).toBe("2026-08-05T00:00:00.000Z"); // le plus récent des deux
  });

  it("un module terminé sur un appareil reste terminé après fusion même si l'autre appareil le montre incomplet", () => {
    const local = baseProgress({
      moduleProgress: [
        {
          moduleId: "m1",
          completed: true,
          completedLessonIds: ["l1"],
          completedExerciseIds: ["ex-1"],
          correctExerciseIds: ["ex-1"],
          lastActivityAt: "2026-08-01T00:00:00.000Z",
        },
      ],
    });
    const remote = baseProgress({
      moduleProgress: [
        {
          moduleId: "m1",
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: [],
          correctExerciseIds: [],
          lastActivityAt: null,
        },
      ],
    });

    const merged = mergeUserProgress(local, remote);
    expect(merged.moduleProgress.find((m) => m.moduleId === "m1")!.completed).toBe(true);
  });

  it("un module présent seulement sur un appareil est conservé tel quel (pas de perte)", () => {
    const local = baseProgress({
      moduleProgress: [
        {
          moduleId: "solo-local",
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: ["a"],
          correctExerciseIds: [],
          lastActivityAt: "2026-08-01T00:00:00.000Z",
        },
      ],
    });
    const remote = baseProgress();

    const merged = mergeUserProgress(local, remote);
    expect(merged.moduleProgress.map((m) => m.moduleId)).toEqual(["solo-local"]);
  });
});

describe("mergeUserProgress — tentatives d'examen (par id, la plus avancée gagne)", () => {
  it("rejouer la fusion avec la même tentative des deux côtés ne duplique rien (idempotence)", () => {
    const attempt = {
      id: "attempt-1",
      examId: "exam-1",
      startedAt: "2026-08-01T00:00:00.000Z",
      completedAt: null,
      status: "in_progress" as const,
      sections: [],
    };
    const merged = mergeUserProgress(
      baseProgress({ examAttempts: [attempt] }),
      baseProgress({ examAttempts: [attempt] })
    );
    expect(merged.examAttempts).toHaveLength(1);
  });

  it("une tentative complétée l'emporte sur la même tentative encore en cours de l'autre côté", () => {
    const inProgress = {
      id: "attempt-1",
      examId: "exam-1",
      startedAt: "2026-08-01T00:00:00.000Z",
      completedAt: null,
      status: "in_progress" as const,
      sections: [],
    };
    const completed = { ...inProgress, status: "completed" as const, completedAt: "2026-08-01T01:00:00.000Z" };

    const merged = mergeUserProgress(
      baseProgress({ examAttempts: [inProgress] }),
      baseProgress({ examAttempts: [completed] })
    );
    expect(merged.examAttempts[0].status).toBe("completed");
  });
});

describe("mergeUserProgress — cas local seul / serveur seul (via la route API, voir app/api/progress/merge/route.ts)", () => {
  it("est un no-op idempotent quand rappelée deux fois de suite avec son propre résultat", () => {
    const local = baseProgress({
      // Id de module réel (voir lib/pedagogy/data/modules.ts) : le calcul de
      // `completed` dépend du nombre total d'exercices du module réel — un id
      // inventé donnerait un total de 0 et fausserait ce calcul.
      moduleProgress: [
        {
          moduleId: "b1-donner-son-opinion",
          completed: false,
          completedLessonIds: [],
          completedExerciseIds: ["opinion-e"],
          correctExerciseIds: ["opinion-e"],
          lastActivityAt: "2026-08-01T00:00:00.000Z",
        },
      ],
    });
    const remote = baseProgress();

    const firstMerge = mergeUserProgress(local, remote);
    const secondMerge = mergeUserProgress(firstMerge, firstMerge);

    expect(secondMerge.moduleProgress).toEqual(firstMerge.moduleProgress);
  });
});

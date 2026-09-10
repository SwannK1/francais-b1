import { describe, expect, it } from "vitest";
import { mergeUserProgress, resolvePlacementLevel } from "@/lib/pedagogy/logic/progress";
import type { ModuleProgress, UserProgress } from "@/lib/pedagogy/types";

/** Modules réels (voir `data/modules-public.generated.ts`) — un par niveau, pour ancrer `mod.level` dans les tests de plancher de niveau. */
const A1_MODULE_ID = "a1-se-presenter";
const A2_MODULE_ID = "a2-se-presenter-en-detail";
const B1_MODULE_ID = "b1-se-presenter";

function completedProgress(moduleId: string, overrides: Partial<ModuleProgress> = {}): ModuleProgress {
  return {
    moduleId,
    completed: true,
    completedLessonIds: ["l1"],
    completedExerciseIds: ["e1"],
    correctExerciseIds: ["e1"],
    lastActivityAt: "2026-08-01T00:00:00.000Z",
    ...overrides,
  };
}

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
    reviewedModuleIds: [],
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

describe("resolvePlacementLevel — priorité aux progrès existants sur un nouveau résultat de test", () => {
  it("retient le résultat du test tel quel pour un apprenant sans aucune activité réelle", () => {
    expect(resolvePlacementLevel([], "A1")).toBe("A1");
    expect(resolvePlacementLevel([], "B1")).toBe("B1");
  });

  it("ne redescend jamais en dessous du plus haut niveau déjà couvert par une activité réelle", () => {
    const moduleProgress = [completedProgress(A2_MODULE_ID)];
    expect(resolvePlacementLevel(moduleProgress, "A1")).toBe("A2");
  });

  it("accepte un résultat de test au niveau de l'activité réelle ou au-dessus", () => {
    const moduleProgress = [completedProgress(A2_MODULE_ID)];
    expect(resolvePlacementLevel(moduleProgress, "A2")).toBe("A2");
    expect(resolvePlacementLevel(moduleProgress, "B1")).toBe("B1");
  });

  it("une activité réelle seulement au niveau A1 n'empêche pas un résultat de test plus élevé", () => {
    const moduleProgress = [completedProgress(A1_MODULE_ID)];
    expect(resolvePlacementLevel(moduleProgress, "B1")).toBe("B1");
  });

  it("ignore un module touché mais sans aucun exercice complété (pas une vraie activité)", () => {
    const moduleProgress = [
      completedProgress(B1_MODULE_ID, { completed: false, completedExerciseIds: [], correctExerciseIds: [] }),
    ];
    expect(resolvePlacementLevel(moduleProgress, "A1")).toBe("A1");
  });
});

describe("mergeUserProgress — le niveau ne régresse jamais en dessous d'une vraie progression", () => {
  it("un diagnostic A1 refait par erreur sur un nouvel appareil ne fait pas redescendre un compte avec des modules A2 terminés", () => {
    // Compte réel : plusieurs modules A2 terminés, testé A2 il y a un mois.
    const remote = baseProgress({
      level: "A2",
      placementCompletedAt: "2026-08-01T00:00:00.000Z",
      moduleProgress: [completedProgress(A2_MODULE_ID)],
    });
    // Nouvel appareil, anonyme, vient de refaire le test et obtient A1 par accident.
    const local = baseProgress({
      level: "A1",
      placementCompletedAt: "2026-09-08T00:00:00.000Z",
      moduleProgress: [],
    });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("A2");
    // La date du test le plus récent reste honnête, seul le niveau est protégé.
    expect(merged.placementCompletedAt).toBe("2026-09-08T00:00:00.000Z");
    // Les modules réellement terminés ne sont jamais perdus.
    expect(merged.moduleProgress.find((mp) => mp.moduleId === A2_MODULE_ID)?.completed).toBe(true);
  });

  it("un utilisateur sans progression B1 peut se voir recommander une entrée B1 par le diagnostic", () => {
    const remote = baseProgress({ level: "A2", placementCompletedAt: "2026-08-01T00:00:00.000Z", moduleProgress: [] });
    const local = baseProgress({ level: "B1", placementCompletedAt: "2026-09-08T00:00:00.000Z", moduleProgress: [] });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("B1");
  });

  it("un compte B1 avec des modules terminés n'est pas redescendu à A2 par un nouveau diagnostic A2", () => {
    const remote = baseProgress({
      level: "B1",
      placementCompletedAt: "2026-07-01T00:00:00.000Z",
      moduleProgress: [completedProgress(B1_MODULE_ID)],
    });
    const local = baseProgress({
      level: "A2",
      placementCompletedAt: "2026-09-08T00:00:00.000Z",
      moduleProgress: [],
    });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("B1");
    expect(merged.moduleProgress.find((mp) => mp.moduleId === B1_MODULE_ID)?.completed).toBe(true);
  });
});

describe("mergeUserProgress — preuves d'évaluation", () => {
  it("préserve une transition A1→A2 prouvée lors de la fusion avec un compte plus ancien", () => {
    const evidence = {
      assessmentId: "passage-a1-a2",
      attemptId: "assessment-proof-1",
      checkpointKind: "passage" as const,
      fromLevel: "A1" as const,
      toLevel: "A2" as const,
      completedAt: "2026-09-10T09:00:00.000Z",
      overallCorrect: 18,
      overallTotal: 21,
      passed: true,
      insufficientDomains: [],
    };
    const local = baseProgress({ level: "A2", assessmentEvidence: [evidence] });
    const remote = baseProgress({ level: "A1", assessmentEvidence: [] });

    const merged = mergeUserProgress(local, remote);

    expect(merged.level).toBe("A2");
    expect(merged.assessmentEvidence).toEqual([evidence]);
  });
});

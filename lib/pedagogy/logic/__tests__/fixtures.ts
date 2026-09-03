import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import type { Module, ModuleProgress, StageId, UserProgress } from "@/lib/pedagogy/types";

/**
 * Fixtures synthétiques (jamais le vrai `MODULES`/curriculum) : les tests de
 * logique de progression ne doivent pas casser si le contenu pédagogique
 * réel change. Seul `stageId` doit rester une vraie valeur de `StageId`
 * (`getNextModule` lit les vraies étapes via `PARCOURS_STAGES`, non injectables).
 */
export function makeModule(overrides: Partial<Module> & { id: string; slug: string }): Module {
  return {
    level: "B1",
    title: overrides.title ?? overrides.id,
    description: "Module de test.",
    objectives: ["Faire quelque chose de précis"],
    domain: "vocabulaire",
    stageId: "b1-debut" as StageId,
    estimatedMinutes: 10,
    lessons: [
      {
        id: `${overrides.id}-lesson`,
        type: "entrainement",
        title: "Leçon",
        optional: false,
        activities: [
          {
            id: `${overrides.id}-activity`,
            title: "Activité",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: `${overrides.id}-ex1`,
                type: "vrai_faux",
                skillId: "test-skill",
                difficulty: "B1",
                instructions: "Vrai ou faux ?",
                statement: "Énoncé de test.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai", explanation: "Parce que." },
              },
            ],
          },
        ],
      },
    ],
    ...overrides,
  };
}

export function makeModuleProgress(overrides: Partial<ModuleProgress> & { moduleId: string }): ModuleProgress {
  return {
    completed: false,
    completedLessonIds: [],
    completedExerciseIds: [],
    correctExerciseIds: [],
    lastActivityAt: null,
    ...overrides,
  };
}

export function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return { ...EMPTY_USER_PROGRESS, userId: "test-user", ...overrides };
}

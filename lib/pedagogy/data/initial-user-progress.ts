import type { UserProgress } from "@/lib/pedagogy/types";

/**
 * État initial d'un nouvel apprenant : aucune base de données dans ce chantier,
 * la progression réelle est persistée côté client (voir `lib/pedagogy/useProgress.ts`)
 * et initialisée avec cette valeur au premier chargement.
 * Simule un utilisateur B1 qui a déjà terminé la compréhension écrite du
 * module « Donner son opinion » et s'est trompé sur un premier exercice de
 * pronoms compléments (illustre un point faible détecté par le moteur).
 */
export const INITIAL_USER_PROGRESS: UserProgress = {
  userId: "demo-user",
  level: "B1",
  goalId: "naturalisation",
  moduleProgress: [
    {
      moduleId: "b1-donner-son-opinion",
      completed: false,
      completedLessonIds: ["donner-son-opinion-comprendre"],
      completedExerciseIds: ["opinion-e", "opinion-g1"],
      correctExerciseIds: ["opinion-e"],
      lastActivityAt: "2026-08-23T09:15:00.000Z",
    },
  ],
  skillProgress: [
    {
      skillId: "ce-textes-courants",
      domain: "comprehension_ecrite",
      totalExercises: 5,
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
    },
    {
      skillId: "gr-pronoms-complements",
      domain: "grammaire",
      totalExercises: 5,
      completedExercises: 1,
      correctExercises: 0,
      successRate: 0,
    },
  ],
  globalSuccessRate: 50,
  lastActivityAt: "2026-08-23T09:15:00.000Z",
  weakSkillIds: ["gr-pronoms-complements"],
  placementCompletedAt: null,
  examAttempts: [],
  reviewedModuleIds: [],
};

/**
 * Progression réelle d'un nouveau compte — distincte de `INITIAL_USER_PROGRESS`
 * (qui simule une démo pour la vitrine marketing/anonyme) : un compte fraîchement
 * créé ne doit jamais hériter des exercices fictifs de la démo.
 */
export const EMPTY_USER_PROGRESS: UserProgress = {
  userId: "",
  level: "B1",
  moduleProgress: [],
  skillProgress: [],
  globalSuccessRate: 0,
  lastActivityAt: null,
  weakSkillIds: [],
  placementCompletedAt: null,
  examAttempts: [],
  reviewedModuleIds: [],
};

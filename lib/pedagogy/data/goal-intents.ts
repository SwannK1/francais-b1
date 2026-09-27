import type { LearningGoalId } from "@/lib/pedagogy/types";

/**
 * Couche d'onboarding simplifiée AU-DESSUS de `LEARNING_GOALS`
 * (`data/goals.ts`, inchangé) : quatre grandes raisons d'apprendre, plus
 * faciles à choisir qu'une liste de neuf objectifs. Chaque intention mappe
 * vers un `LearningGoalId` existant ; « examen ou démarche » propose ensuite
 * les sous-objectifs déjà gérés.
 */
export type GoalIntentId = "vivre" | "travailler" | "parler" | "examen";

export interface GoalIntent {
  id: GoalIntentId;
  title: string;
  description: string;
  /** Objectif enregistré directement — absent pour « examen », qui demande un sous-choix. */
  goalId?: LearningGoalId;
  subGoalIds?: LearningGoalId[];
}

export const GOAL_INTENTS: GoalIntent[] = [
  {
    id: "vivre",
    title: "Vivre en France",
    description: "Logement, santé, courses, démarches du quotidien.",
    goalId: "vivre_en_france",
  },
  {
    id: "travailler",
    title: "Travailler en français",
    description: "Parler de ton métier, chercher un emploi, échanger au travail.",
    goalId: "travail",
  },
  {
    id: "parler",
    title: "Mieux parler et comprendre",
    description: "Être plus à l'aise à l'oral et à l'écoute.",
    goalId: "ameliorer_francais",
  },
  {
    id: "examen",
    title: "Préparer un examen ou une démarche",
    description: "DELF, TCF IRN, titre de séjour, naturalisation…",
    subGoalIds: ["delf", "tcf_irn", "carte_sejour", "carte_resident", "naturalisation", "etudes"],
  },
];

/** Intention correspondant à un objectif déjà enregistré (pour pré-sélectionner un choix passé). */
export function getIntentForGoal(goalId: LearningGoalId | undefined): GoalIntent | undefined {
  if (!goalId) return undefined;
  return GOAL_INTENTS.find((intent) => intent.goalId === goalId || intent.subGoalIds?.includes(goalId));
}

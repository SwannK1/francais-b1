/**
 * Types autonomes du diagnostic de niveau (`/diagnostic`).
 *
 * Volontairement séparés de `lib/pedagogy/types.ts` : ce diagnostic ne
 * partage ni son contenu ni sa logique de scoring avec le test de
 * positionnement existant (`/test-niveau`, `lib/pedagogy/logic/placement.ts`)
 * ni avec le reste du cœur pédagogique. Objectif : qu'une évolution future du
 * modèle de données central (Module/Exercise/Question...) ne puisse jamais
 * casser ce chantier, et inversement. Seule dépendance de lecture volontaire
 * vers le cœur pédagogique : `PARCOURS_STAGES` (voir `recommendation.ts`),
 * pour proposer un vrai point d'entrée du site, jamais une URL inventée.
 */

export type DiagnosticLevel = "A1" | "A2" | "B1";

export const DIAGNOSTIC_LEVELS: DiagnosticLevel[] = ["A1", "A2", "B1"];

export type DiagnosticSkill = "comprehension_ecrite" | "vocabulaire" | "grammaire";

export const DIAGNOSTIC_SKILLS: DiagnosticSkill[] = [
  "comprehension_ecrite",
  "vocabulaire",
  "grammaire",
];

export const DIAGNOSTIC_SKILL_LABELS: Record<DiagnosticSkill, string> = {
  comprehension_ecrite: "Compréhension écrite",
  vocabulaire: "Vocabulaire",
  grammaire: "Grammaire",
};

export interface DiagnosticChoice {
  id: string;
  text: string;
}

export interface DiagnosticQuestion {
  id: string;
  level: DiagnosticLevel;
  skill: DiagnosticSkill;
  /** Position au sein de son palier de niveau (1 = plus facile) — sert uniquement à ordonner l'affichage. */
  order: number;
  prompt: string;
  choices: DiagnosticChoice[];
  correctChoiceId: string;
}

export interface DiagnosticAnswer {
  questionId: string;
  choiceId: string;
}

export type DiagnosticLevelStatus = "acquired" | "partial" | "gap";

export interface DiagnosticLevelScore {
  level: DiagnosticLevel;
  correct: number;
  total: number;
  successRate: number;
  status: DiagnosticLevelStatus;
}

export interface DiagnosticSkillResult {
  skill: DiagnosticSkill;
  correct: number;
  total: number;
  successRate: number;
  /**
   * true si les réponses de ce domaine sont incohérentes (score nettement
   * meilleur sur un palier plus difficile que sur un palier plus facile) —
   * voir `scoring.ts`. Un domaine irrégulier n'est jamais compté comme point
   * fort, même si sa moyenne brute dépasse le seuil.
   */
  irregular: boolean;
}

/**
 * Pourquoi le diagnostic s'est arrêté :
 * - "completed" : les 18 questions ont été posées.
 * - "early-floor" : arrêt anticipé, résultat très faible dès le palier A1.
 * - "early-ceiling" : arrêt anticipé, résultat quasi parfait sur A1 et A2.
 */
export type DiagnosticStopReason = "completed" | "early-floor" | "early-ceiling";

export interface DiagnosticRecommendation {
  stageSlug: string;
  stageTitle: string;
  message: string;
}

export interface DiagnosticResult {
  estimatedLevel: DiagnosticLevel;
  globalScore: number;
  questionsAnswered: number;
  questionsTotal: number;
  stopReason: DiagnosticStopReason;
  levelScores: DiagnosticLevelScore[];
  skillResults: DiagnosticSkillResult[];
  strengths: DiagnosticSkill[];
  weaknesses: DiagnosticSkill[];
  recommendation: DiagnosticRecommendation;
}

/**
 * Types des évaluations de passage — indépendantes du diagnostic
 * (`test-niveau`), de la révision espacée et de la séance du jour (voir
 * `docs` du chantier). Réutilise volontairement quelques types génériques
 * déjà partagés dans tout le programme (`Question`, `CEFRLevel`,
 * `ProductionOraleExercise`) : ce sont des définitions de forme, pas du
 * moteur — aucun import vers `logic/recommendation.ts`, `logic/review.ts`,
 * `logic/placement.ts` ni `UserProgress` ici.
 *
 * Frontière contenu public/protégé : mêmes règles que
 * `lib/pedagogy/types.ts` (voir son commentaire "Frontière contenu public /
 * contenu protégé") — `AssessmentDefinition` porte les bonnes réponses
 * (`correctChoiceId`/`correctAnswer` dans chaque `Question`) et ne doit
 * jamais être importée par du code qui s'exécute côté client avant que
 * `canAccess()` ait validé l'accès côté serveur (voir
 * `app/(pedagogie)/parcours/evaluations/[slug]/page.tsx`).
 */
import type { CEFRLevel, ProductionOraleExercise, Question } from "@/lib/pedagogy/types";

export type CheckpointId = "fin-a1" | "passage-a1-a2" | "fin-a2" | "passage-a2-b1";

export type AssessmentDimension =
  | "comprehension_ecrite"
  | "vocabulaire"
  | "grammaire"
  | "comprehension_orale"
  | "production_guidee";

/** Item vocabulaire/grammaire : une question fermée (qcm/vrai_faux), notée automatiquement. */
export interface AssessmentQuestionItem {
  id: string;
  dimension: "vocabulaire" | "grammaire";
  question: Question;
}

/** Court texte + sous-questions — même principe qu'un `ComprehensionEcriteExercise` pédagogique. */
export interface AssessmentReadingItem {
  id: string;
  dimension: "comprehension_ecrite";
  instructions: string;
  text: string;
  questions: Question[];
}

/**
 * Piste audio + sous-questions. `audioSrc` doit toujours pointer vers un
 * fichier réellement présent sous `public/audio/` (voir
 * `lib/assessment/data/content-integrity.test.ts`) — jamais un chemin
 * inventé : c'est ce qui garantit des "références audio valides".
 */
export interface AssessmentListeningItem {
  id: string;
  dimension: "comprehension_orale";
  instructions: string;
  audioSrc: string;
  transcript: string;
  questions: Question[];
}

/**
 * Petite production guidée (orale ici, cohérent avec ce chantier) —
 * jamais notée automatiquement (voir `ProductionOraleExercise` :
 * `selfAssessmentCriteria`), ne compte jamais dans `overallScore`.
 */
export interface AssessmentGuidedProduction {
  dimension: "production_guidee";
  exercise: ProductionOraleExercise;
}

/**
 * "bilan" : valide les acquis d'un niveau déjà en cours (fin A1, fin A2) —
 * la recommandation porte sur la consolidation, jamais sur un passage de
 * niveau. "passage" : valide le passage effectif vers le niveau suivant
 * (A1 → A2, A2 → B1) — la recommandation autorise ou non à avancer.
 */
export type CheckpointKind = "bilan" | "passage";

export interface AssessmentDefinition {
  id: CheckpointId;
  checkpointKind: CheckpointKind;
  slug: string;
  title: string;
  description: string;
  fromLevel: CEFRLevel;
  toLevel: CEFRLevel;
  durationMinutes: number;
  reading: AssessmentReadingItem[];
  vocabulary: AssessmentQuestionItem[];
  grammar: AssessmentQuestionItem[];
  listening: AssessmentListeningItem[];
  guidedProduction?: AssessmentGuidedProduction;
  /**
   * Seuils documentés (voir `logic/scoring.ts` pour leur usage) :
   * - `passingRatio` (0.6 par défaut) : taux de réussite global minimum,
   *   sur les dimensions notées automatiquement uniquement.
   * - `masteryRatio` (0.7) : au-dessus, une dimension est "maîtrisée".
   * - `insufficientRatio` (0.5) : en dessous, une dimension est "insuffisante".
   * Volontairement sans seuil éliminatoire par dimension : un score global
   * suffisant fait toujours réussir le passage, même avec une dimension
   * faible signalée en recommandation — voir la consigne "éviter les seuils
   * artificiellement sévères".
   */
  passingRatio: number;
  masteryRatio: number;
  insufficientRatio: number;
}

// --- Tentatives ---
//
// Stockage local dédié (voir `useAssessmentAttempts.ts`, clé
// `francais-b1:assessment-attempts`), indépendant de `UserProgress` et de
// `ExamAttempt` (`lib/pedagogy/types.ts`) : ce chantier ne doit jamais
// écrire dans la progression centrale du diagnostic/de la révision
// espacée/de la séance du jour.

export type AssessmentAttemptStatus = "in_progress" | "completed" | "abandoned";

export interface AssessmentAttempt {
  id: string;
  checkpointId: CheckpointId;
  startedAt: string;
  completedAt: string | null;
  status: AssessmentAttemptStatus;
  /** correct/incorrect par id de sous-question, tel que renvoyé par `QuizQuestion`/`AudioExercise`. */
  answeredCorrect: Record<string, boolean>;
  /** true une fois la grille d'auto-évaluation de la production guidée remplie — jamais une note. */
  guidedProductionDone: boolean;
}

/**
 * Types de la zone dédiée à l'expression orale — indépendante du diagnostic
 * (`test-niveau`), de la révision espacée (`logic/review.ts`) et de la séance
 * du jour (`logic/recommendation.ts`) : aucun de ces modules n'est importé
 * ici, et rien ici n'écrit dans `UserProgress` (voir `useSpeakingPractice.ts`,
 * qui a son propre stockage local séparé).
 *
 * Aucune correction automatique de prononciation n'existe ni n'est simulée :
 * chaque exercice se termine par une auto-évaluation guidée (critères
 * simples, jamais un score IA fabriqué). Voir `components/speaking/SpeakingExerciseCard.tsx`.
 */
import type { CEFRLevel } from "@/lib/pedagogy/types";

export type SpeakingExerciseKind = "repetition" | "lecture" | "mini_reponse" | "situation";

interface SpeakingExerciseBase {
  id: string;
  kind: SpeakingExerciseKind;
  level: CEFRLevel;
  title: string;
  instructions: string;
  /** 0 = pas de temps de préparation, on enregistre directement. */
  prepSeconds: number;
  /** Durée de parole conseillée (indicative, n'interrompt jamais l'enregistrement). */
  maxSpeakSeconds?: number;
  /** Grille d'auto-évaluation guidée — jamais une note officielle ni un score IA. */
  selfAssessmentCriteria: string[];
  tips?: string;
}

/** Répétition de phrase : écouter un modèle (synthèse vocale du navigateur), puis répéter. */
export interface RepetitionSpeakingExercise extends SpeakingExerciseBase {
  kind: "repetition";
  targetText: string;
}

/** Lecture à voix haute d'un court texte, modèle écoutable avant de se lancer. */
export interface LectureSpeakingExercise extends SpeakingExerciseBase {
  kind: "lecture";
  targetText: string;
}

/** Mini-réponse orale à une question ouverte simple — pas de phrase modèle à imiter. */
export interface MiniReponseSpeakingExercise extends SpeakingExerciseBase {
  kind: "mini_reponse";
  question: string;
}

/** Mise en situation pratique (se présenter, commander, demander son chemin...). */
export interface SituationSpeakingExercise extends SpeakingExerciseBase {
  kind: "situation";
  situationLabel: string;
  context: string;
}

export type SpeakingExercise =
  | RepetitionSpeakingExercise
  | LectureSpeakingExercise
  | MiniReponseSpeakingExercise
  | SituationSpeakingExercise;

/** Auto-évaluation à 3 niveaux, volontairement grossière — jamais un score chiffré fictif. */
export type SpeakingSelfRating = "a_revoir" | "correct" | "tres_bien";

export interface SpeakingPracticeEntry {
  timesPracticed: number;
  lastPracticedAt: string;
  lastSelfRating: SpeakingSelfRating | null;
  /** true si la dernière tentative a été faite sans micro (navigateur incompatible, permission refusée, pas de périphérique). */
  lastWithoutRecording: boolean;
}

export type SpeakingPracticeLog = Record<string, SpeakingPracticeEntry>;

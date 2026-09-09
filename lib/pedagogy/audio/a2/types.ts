import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

/**
 * Types propres au chantier audio A2 — indépendants de
 * `lib/pedagogy/audio/manifest.ts` (B1), qui dérive ses pistes de
 * `lib/pedagogy/data/modules.ts`/`exams.ts`. Le module A2 "contenu" n'existe
 * pas encore dans cette branche (chantier parallèle) : ces types décrivent
 * donc des exercices `comprehension_orale` complets et autonomes, prêts à
 * être repris tels quels dans un module A2 une fois celui-ci fusionné — voir
 * `docs/integration/a2-audio.md` pour la procédure de raccordement.
 *
 * On réutilise volontairement `ComprehensionOraleExercise` (et les types
 * `Question`/`Correction` qu'il embarque) depuis le cœur pédagogique partagé
 * plutôt que d'inventer une forme parallèle : import de lecture seule, aucune
 * modification de `lib/pedagogy/types.ts`.
 */

export type A2Stage = "a2-debut" | "a2-milieu" | "a2-fin";

export const A2_STAGE_LABELS: Record<A2Stage, string> = {
  "a2-debut": "Début A2 — débit clair, documents courts, informations explicites",
  "a2-milieu": "Milieu A2 — plusieurs détails, 2-3 locuteurs, reformulation, distracteurs simples",
  "a2-fin": "Fin A2 — débit relativement naturel, messages plus longs, inférence élémentaire",
};

/** Les 15 grands domaines d'écoute A2 listés dans le brief du chantier. */
export type A2Theme =
  | "vie_quotidienne"
  | "travail"
  | "famille"
  | "achats"
  | "transports"
  | "voyages"
  | "logement"
  | "sante"
  | "meteo"
  | "loisirs"
  | "rendez_vous"
  | "messages"
  | "evenements"
  | "projets"
  | "recits";

/** Les types de documents demandés par le brief du chantier. */
export type A2DocType =
  | "dialogue"
  | "message_vocal"
  | "annonce_gare"
  | "annonce_aeroport"
  | "repondeur"
  | "appel_telephonique"
  | "conversation_travail"
  | "reservation"
  | "hotel"
  | "restaurant"
  | "medecin_pharmacie"
  | "interview_simple"
  | "meteo"
  | "programme"
  | "recit_weekend"
  | "projet_vacances"
  | "invitation"
  | "probleme_logement"
  | "reunion_copropriete";

export interface A2Turn {
  /** Référence à `A2_VOICE_PROFILES` (voir `voices.ts`). */
  voiceId: string;
  /** Nom du personnage tel qu'affiché dans la transcription, ex. "Karim". */
  speakerRole: string;
  text: string;
}

/**
 * Définition source d'une piste A2 : à la fois script de génération audio
 * (tours de parole + voix + débit) et données pédagogiques complètes
 * (exercice `comprehension_orale` prêt à l'emploi). `manifest.ts` assemble
 * `turns` -> `transcript`/`audioSrc` et complète `exercise`.
 */
export interface A2TrackDefinition {
  id: string;
  theme: A2Theme;
  docType: A2DocType;
  stage: A2Stage;
  /** Objectif d'écoute — ce que l'apprenant doit être capable de repérer/comprendre. */
  objectif: string;
  /** Note de mise en scène pour la génération/QA humaine (débit, intention). */
  pace: string;
  /** Débit de synthèse (`say -r`), en mots/minute — croît avec la progression. */
  rateWpm: number;
  /** Silence inséré entre deux tours de parole, en secondes. */
  gapSeconds: number;
  turns: A2Turn[];
  /**
   * Exercice complet, hors `audioSrc`/`transcript`/`type` — dérivés par
   * `manifest.ts` à partir de `id`/`turns` pour ne jamais les dupliquer à la
   * main (une seule source de vérité pour le texte : `turns`).
   */
  exercise: Omit<ComprehensionOraleExercise, "audioSrc" | "transcript" | "type">;
}

export type { ComprehensionOraleExercise };

import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import type { SpeakingExercise, SpeakingExerciseKind } from "@/lib/speaking/types";

export const SPEAKING_KIND_LABELS: Record<SpeakingExerciseKind, string> = {
  repetition: "Répétition de phrase",
  lecture: "Lecture à voix haute",
  mini_reponse: "Mini-réponse orale",
  situation: "Situation pratique",
};

export function getSpeakingExerciseById(id: string): SpeakingExercise | undefined {
  return SPEAKING_EXERCISES.find((exercise) => exercise.id === id);
}

export function getSpeakingExercisesByKind(kind: SpeakingExerciseKind): SpeakingExercise[] {
  return SPEAKING_EXERCISES.filter((exercise) => exercise.kind === kind);
}

/** Texte affiché/lu comme "modèle" (phrase à répéter ou à lire) — absent pour mini-réponse/situation, qui sont ouvertes. */
export function getModelText(exercise: SpeakingExercise): string | null {
  if (exercise.kind === "repetition" || exercise.kind === "lecture") return exercise.targetText;
  return null;
}

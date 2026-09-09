"use client";

import AudioExercise from "@/components/pedagogy/AudioExercise";
import type { AssessmentListeningItem } from "@/lib/assessment/types";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

/**
 * Réutilise `AudioExercise` (résolution humain/synthétique, minuteur de
 * secours, transcript, coordination "une seule lecture à la fois") plutôt
 * que de réécrire cette robustesse — voir `onQuestionAnswered`, ajouté à
 * `AudioExercise` pour exposer la correction par sous-question dont
 * `logic/scoring.ts` a besoin (l'agrégat `onExerciseAnswered` existant ne
 * suffisait pas).
 */
export default function ListeningBlock({
  item,
  onQuestionAnswered,
}: {
  item: AssessmentListeningItem;
  onQuestionAnswered: (questionId: string, correct: boolean) => void;
}) {
  const exercise: ComprehensionOraleExercise = {
    id: item.id,
    type: "comprehension_orale",
    skillId: "assessment-comprehension-orale",
    difficulty: "A2",
    instructions: item.instructions,
    audioSrc: item.audioSrc,
    transcript: item.transcript,
    questions: item.questions,
  };

  return <AudioExercise exercise={exercise} onQuestionAnswered={onQuestionAnswered} />;
}

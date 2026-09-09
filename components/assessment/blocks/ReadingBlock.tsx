"use client";

import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import type { AssessmentReadingItem } from "@/lib/assessment/types";

/**
 * Rendu délibérément direct (texte + `QuizQuestion` par sous-question),
 * plutôt que de réutiliser le bloc de compréhension écrite interne à
 * `ExerciseCard.tsx` (non exporté, et qui n'agrège qu'un booléen par
 * exercice) : les évaluations de passage ont besoin de la correction de
 * *chaque* sous-question (voir `logic/scoring.ts`), pas d'un agrégat.
 */
export default function ReadingBlock({
  item,
  onQuestionAnswered,
}: {
  item: AssessmentReadingItem;
  onQuestionAnswered: (questionId: string, correct: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{item.instructions}</p>
      <p className="whitespace-pre-line rounded-lg bg-muted p-3 text-sm leading-relaxed text-foreground">
        {item.text}
      </p>
      <div className="space-y-3">
        {item.questions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            onAnswered={(correct) => onQuestionAnswered(question.id, correct)}
          />
        ))}
      </div>
    </div>
  );
}

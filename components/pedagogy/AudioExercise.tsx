"use client";

import { useState } from "react";
import { HeadphonesIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

export default function AudioExercise({
  exercise,
  onExerciseAnswered,
}: {
  exercise: ComprehensionOraleExercise;
  onExerciseAnswered?: (correct: boolean) => void;
}) {
  const [audioError, setAudioError] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState<Record<string, boolean>>({});

  function handleAnswered(questionId: string, correct: boolean) {
    const next = { ...answeredCorrect, [questionId]: correct };
    setAnsweredCorrect(next);
    if (Object.keys(next).length === exercise.questions.length) {
      const allCorrect = Object.values(next).every(Boolean);
      onExerciseAnswered?.(allCorrect);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
        <HeadphonesIcon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        {audioError ? (
          <p className="text-sm text-muted-foreground">
            Audio non disponible pour le moment. Utilisez la transcription ci-dessous.
          </p>
        ) : (
          <audio
            controls
            preload="none"
            src={exercise.audioSrc}
            onError={() => setAudioError(true)}
            className="w-full"
          >
            Votre navigateur ne prend pas en charge la lecture audio.
          </audio>
        )}
      </div>

      {exercise.transcript ? (
        <div>
          <button
            type="button"
            onClick={() => setShowTranscript((value) => !value)}
            className={cn(buttonClasses("secondary", "md"), "text-xs")}
            aria-expanded={showTranscript}
          >
            {showTranscript ? "Masquer la transcription" : "Afficher la transcription"}
          </button>
          {showTranscript ? (
            <p className="mt-2 whitespace-pre-line rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              {exercise.transcript}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-3">
        {exercise.questions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            onAnswered={(correct) => handleAnswered(question.id, correct)}
          />
        ))}
      </div>
    </div>
  );
}

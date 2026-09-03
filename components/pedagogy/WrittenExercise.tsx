"use client";

import { useId, useState } from "react";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import type { ProductionEcriteExercise, ReponseCourteExercise } from "@/lib/pedagogy/types";

function countWords(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}

export default function WrittenExercise({
  exercise,
  onExerciseAnswered,
}: {
  exercise: ProductionEcriteExercise | ReponseCourteExercise;
  onExerciseAnswered?: (correct: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const textareaId = useId();

  if (exercise.type === "reponse_courte") {
    // Une liste vide signale une question ouverte, sans correction automatique
    // fiable (ex. "production courte" libre d'une mini-évaluation) : on
    // affiche la réponse attendue pour une auto-évaluation, sans la compter
    // comme fausse.
    const isSelfAssessed = exercise.acceptedAnswers.length === 0;
    const isCorrect =
      isSelfAssessed ||
      exercise.acceptedAnswers.some(
        (accepted) => accepted.trim().toLowerCase() === value.trim().toLowerCase()
      );

    return (
      <div className="space-y-3">
        <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
          {exercise.question}
        </label>
        <input
          id={textareaId}
          type="text"
          value={value}
          disabled={submitted}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-lg border border-input-border bg-background px-3 py-2 text-sm disabled:opacity-70"
        />
        {!submitted ? (
          <button
            type="button"
            onClick={() => {
              setSubmitted(true);
              onExerciseAnswered?.(isCorrect);
            }}
            disabled={value.trim().length === 0}
            className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
          >
            Vérifier
          </button>
        ) : (
          <div role="status" className="rounded-lg bg-muted p-3 text-sm text-foreground">
            <p className="font-semibold">
              {isSelfAssessed
                ? "Réponse envoyée — à toi de t'auto-évaluer :"
                : isCorrect
                  ? "Bonne réponse !"
                  : "Réponse attendue :"}{" "}
              {exercise.correction.correctAnswer}
            </p>
            <p className="mt-1 text-muted-foreground">{exercise.correction.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  const wordCount = countWords(value);
  const meetsMinimum = wordCount >= exercise.minWords;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{exercise.consigne}</p>
      <label htmlFor={textareaId} className="sr-only">
        Ta réponse
      </label>
      <textarea
        id={textareaId}
        value={value}
        disabled={submitted}
        onChange={(event) => setValue(event.target.value)}
        rows={6}
        className="w-full rounded-lg border border-input-border bg-background px-3 py-2 text-sm disabled:opacity-70"
        placeholder="Écris ta réponse ici..."
      />
      <p className="text-xs text-muted-foreground">
        {wordCount} mot{wordCount > 1 ? "s" : ""} (minimum recommandé : {exercise.minWords}
        {exercise.maxWords ? `, maximum ${exercise.maxWords}` : ""})
      </p>

      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            // Pas de correction automatique fiable sur une production écrite :
            // "envoyée" compte comme complétée pour la progression, sans
            // notion de bonne/mauvaise réponse.
            onExerciseAnswered?.(true);
          }}
          disabled={value.trim().length === 0}
          className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
        >
          Envoyer
        </button>
      ) : (
        <div role="status" className="rounded-lg bg-muted p-3 text-sm text-foreground">
          <p className="font-semibold">
            {meetsMinimum ? "Réponse envoyée." : "Réponse envoyée (un peu courte)."}
          </p>
          <p className="mt-1 text-muted-foreground">
            La correction automatique de la production écrite n&apos;est pas encore disponible.
            En attendant, vérifie toi-même les points suivants :
          </p>
          <ul className="mt-2 list-inside list-disc text-muted-foreground">
            {exercise.correctionCriteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

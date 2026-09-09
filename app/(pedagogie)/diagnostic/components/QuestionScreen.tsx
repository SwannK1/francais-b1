"use client";

import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/ui/button-styles";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { cn } from "@/lib/cn";
import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

/** Nombre maximal de questions possible (parcours complet, sans arrêt anticipé) — sert uniquement à afficher une progression. */
const MAX_QUESTIONS = 18;

export default function QuestionScreen({
  question,
  questionNumber,
  selectedChoiceId,
  canGoBack,
  isLast,
  onSelect,
  onNext,
  onBack,
}: {
  question: DiagnosticQuestion;
  /** Position 1-indexée dans le parcours (jusqu'à `MAX_QUESTIONS`). */
  questionNumber: number;
  selectedChoiceId: string | undefined;
  canGoBack: boolean;
  isLast: boolean;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Déplace le focus sur le titre de la question à chaque changement de
  // question : essentiel au clavier/lecteur d'écran dans une page qui ne
  // navigue jamais réellement (même URL du début à la fin du diagnostic).
  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  return (
    <div className="space-y-6">
      <ProgressBar
        value={(questionNumber / MAX_QUESTIONS) * 100}
        label={`Question ${questionNumber} sur environ ${MAX_QUESTIONS}`}
      />

      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="px-1">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-base font-medium text-foreground outline-none"
          >
            {question.prompt}
          </h2>
        </legend>
        <div className="mt-3 space-y-2">
          {question.choices.map((choice) => (
            <label
              key={choice.id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
                selectedChoiceId === choice.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted"
              )}
            >
              <input
                type="radio"
                name={`diagnostic-${question.id}`}
                value={choice.id}
                checked={selectedChoiceId === choice.id}
                onChange={() => onSelect(choice.id)}
                className="h-4 w-4 shrink-0 accent-[var(--primary)]"
              />
              {choice.text}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        {canGoBack ? (
          <button type="button" onClick={onBack} className={buttonClasses("secondary", "md")}>
            Précédent
          </button>
        ) : null}
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedChoiceId}
          className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
        >
          {isLast ? "Voir mon résultat" : "Question suivante"}
        </button>
      </div>
    </div>
  );
}

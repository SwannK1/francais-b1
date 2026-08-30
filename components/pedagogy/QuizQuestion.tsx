"use client";

import { useId, useState } from "react";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Question } from "@/lib/pedagogy/types";

function CorrectionPanel({
  isCorrect,
  correctAnswerLabel,
  question,
}: {
  isCorrect: boolean | null;
  correctAnswerLabel: string;
  question: Question;
}) {
  return (
    <div role="status" className="mt-4 rounded-lg bg-muted p-3 text-sm text-foreground">
      <p className="font-semibold">
        {isCorrect === null
          ? "Réponse attendue :"
          : isCorrect
            ? "Bonne réponse !"
            : "Pas tout à fait."}{" "}
        {correctAnswerLabel}
      </p>
      <p className="mt-1 text-muted-foreground">{question.correction.explanation}</p>
      {question.correction.rappelRegle ? (
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Règle : </span>
          {question.correction.rappelRegle}
        </p>
      ) : null}
      {question.correction.conseil ? (
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Conseil : </span>
          {question.correction.conseil}
        </p>
      ) : null}
    </div>
  );
}

export default function QuizQuestion({
  question,
  onAnswered,
}: {
  question: Question;
  onAnswered?: (correct: boolean) => void;
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [vraiFauxAnswer, setVraiFauxAnswer] = useState<boolean | null>(null);
  const [libreValue, setLibreValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const groupId = useId();
  const inputId = useId();

  if (question.kind === "qcm") {
    const isCorrect = selectedChoiceId === question.correctChoiceId;

    function handleSubmit() {
      if (!selectedChoiceId || submitted) return;
      setSubmitted(true);
      onAnswered?.(isCorrect);
    }

    return (
      <fieldset className="rounded-xl border border-border bg-background p-4">
        <legend className="px-1 text-sm font-medium text-foreground">{question.prompt}</legend>

        <div className="mt-3 space-y-2">
          {question.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isRightChoice = choice.id === question.correctChoiceId;
            const showAsCorrect = submitted && isRightChoice;
            const showAsWrong = submitted && isSelected && !isRightChoice;

            return (
              <label
                key={choice.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  isSelected && !submitted && "border-primary bg-primary/5",
                  !isSelected && !submitted && "border-border hover:bg-muted",
                  showAsCorrect && "border-success bg-success/10",
                  showAsWrong && "border-red-500 bg-red-500/10",
                  submitted && !showAsCorrect && !showAsWrong && "border-border opacity-70"
                )}
              >
                <input
                  type="radio"
                  name={`question-${groupId}`}
                  value={choice.id}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => setSelectedChoiceId(choice.id)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                <span>{choice.text}</span>
                {showAsCorrect ? (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-success">
                    <CheckIcon className="h-3.5 w-3.5" /> Bonne réponse
                  </span>
                ) : null}
                {showAsWrong ? (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                    <XIcon className="h-3.5 w-3.5" /> Ta réponse
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>

        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedChoiceId}
            className={cn(buttonClasses("primary", "md"), "mt-4 disabled:opacity-50")}
          >
            Vérifier
          </button>
        ) : (
          <CorrectionPanel
            isCorrect={isCorrect}
            correctAnswerLabel={question.correction.correctAnswer}
            question={question}
          />
        )}
      </fieldset>
    );
  }

  if (question.kind === "vrai_faux") {
    const isCorrect = vraiFauxAnswer === question.correctAnswer;

    return (
      <fieldset className="rounded-xl border border-border bg-background p-4">
        <legend className="px-1 text-sm font-medium text-foreground">{question.prompt}</legend>
        <div className="mt-3 flex gap-2" role="group" aria-label="Vrai ou faux">
          {[
            { label: "Vrai", value: true },
            { label: "Faux", value: false },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              disabled={submitted}
              aria-pressed={vraiFauxAnswer === option.value}
              onClick={() => setVraiFauxAnswer(option.value)}
              className={cn(
                buttonClasses(vraiFauxAnswer === option.value ? "primary" : "secondary", "md"),
                "disabled:opacity-70"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {!submitted ? (
          <button
            type="button"
            disabled={vraiFauxAnswer === null}
            onClick={() => {
              setSubmitted(true);
              onAnswered?.(isCorrect);
            }}
            className={cn(buttonClasses("primary", "md"), "mt-4 disabled:opacity-50")}
          >
            Vérifier
          </button>
        ) : (
          <CorrectionPanel
            isCorrect={isCorrect}
            correctAnswerLabel={question.correction.correctAnswer}
            question={question}
          />
        )}
      </fieldset>
    );
  }

  // question.kind === "libre" : pas de correction automatique fiable sur une
  // réponse ouverte — on affiche la réponse attendue pour une auto-évaluation.
  return (
    <fieldset className="rounded-xl border border-border bg-background p-4">
      <legend className="px-1 text-sm font-medium text-foreground">{question.prompt}</legend>
      <label htmlFor={inputId} className="sr-only">
        Ta réponse
      </label>
      <textarea
        id={inputId}
        value={libreValue}
        disabled={submitted}
        onChange={(event) => setLibreValue(event.target.value)}
        rows={2}
        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-70"
        placeholder="Ta réponse..."
      />
      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            onAnswered?.(true);
          }}
          disabled={libreValue.trim().length === 0}
          className={cn(buttonClasses("primary", "md"), "mt-3 disabled:opacity-50")}
        >
          Voir la réponse attendue
        </button>
      ) : (
        <CorrectionPanel
          isCorrect={null}
          correctAnswerLabel={question.expectedAnswer}
          question={question}
        />
      )}
    </fieldset>
  );
}

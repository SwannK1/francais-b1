"use client";

import { Fragment, useId, useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import AudioExercise from "@/components/pedagogy/AudioExercise";
import WrittenExercise from "@/components/pedagogy/WrittenExercise";
import type { Correction, Exercise } from "@/lib/pedagogy/types";

function CorrectionPanel({ isCorrect, correction }: { isCorrect: boolean; correction: Correction }) {
  return (
    <div role="status" className="rounded-lg bg-muted p-3 text-sm text-foreground">
      <p className="font-semibold">
        {isCorrect ? "Bonne réponse !" : "Pas tout à fait."} {correction.correctAnswer}
      </p>
      <p className="mt-1 text-muted-foreground">{correction.explanation}</p>
      {correction.rappelRegle ? (
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Règle : </span>
          {correction.rappelRegle}
        </p>
      ) : null}
      {correction.conseil ? (
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Conseil : </span>
          {correction.conseil}
        </p>
      ) : null}
    </div>
  );
}

function VraiFauxBody({
  exercise,
  onDone,
}: {
  exercise: Extract<Exercise, { type: "vrai_faux" }>;
  onDone?: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer === exercise.correctAnswer;

  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground">{exercise.statement}</p>
      <div className="flex gap-2" role="group" aria-label="Vrai ou faux">
        {[
          { label: "Vrai", value: true },
          { label: "Faux", value: false },
        ].map((option) => (
          <button
            key={option.label}
            type="button"
            disabled={submitted}
            aria-pressed={answer === option.value}
            onClick={() => setAnswer(option.value)}
            className={cn(
              buttonClasses(answer === option.value ? "primary" : "secondary", "md"),
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
          disabled={answer === null}
          onClick={() => {
            setSubmitted(true);
            onDone?.(isCorrect);
          }}
          className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
        >
          Vérifier
        </button>
      ) : (
        <CorrectionPanel isCorrect={isCorrect} correction={exercise.correction} />
      )}
    </div>
  );
}

function TexteATrousBody({
  exercise,
  onDone,
}: {
  exercise: Extract<Exercise, { type: "texte_a_trous" }>;
  onDone?: (correct: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const parts = exercise.textWithBlanks.split(/(\{\{\d+\}\})/g);

  const allCorrect = exercise.blanks.every(
    (blank) => (values[blank.id] ?? "").trim().toLowerCase() === blank.answer.toLowerCase()
  );

  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-foreground">
        {parts.map((part, index) => {
          const match = part.match(/\{\{(\d+)\}\}/);
          if (!match) return <Fragment key={index}>{part}</Fragment>;
          const blankId = match[1];
          const blank = exercise.blanks.find((b) => b.id === blankId);
          return (
            <input
              key={index}
              type="text"
              aria-label={`Espace à compléter ${blankId}`}
              disabled={submitted}
              value={values[blankId] ?? ""}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [blankId]: event.target.value }))
              }
              className={cn(
                "mx-1 inline-block w-32 rounded-md border px-2 py-1 text-sm",
                submitted
                  ? (values[blankId] ?? "").trim().toLowerCase() === blank?.answer.toLowerCase()
                    ? "border-success bg-success/10"
                    : "border-red-500 bg-red-500/10"
                  : "border-border bg-background"
              )}
            />
          );
        })}
      </p>
      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            onDone?.(allCorrect);
          }}
          className={buttonClasses("primary", "md")}
        >
          Vérifier
        </button>
      ) : (
        <CorrectionPanel isCorrect={allCorrect} correction={exercise.correction} />
      )}
    </div>
  );
}

function RemiseEnOrdreBody({
  exercise,
  onDone,
}: {
  exercise: Extract<Exercise, { type: "remise_en_ordre" }>;
  onDone?: (correct: boolean) => void;
}) {
  const [order, setOrder] = useState(() => exercise.items.map((item) => item.id));
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = order.join(",") === exercise.correctOrder.join(",");

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  }

  return (
    <div className="space-y-3">
      <ol className="space-y-2">
        {order.map((itemId, index) => {
          const item = exercise.items.find((entry) => entry.id === itemId);
          if (!item) return null;
          return (
            <li
              key={itemId}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <span>
                <span className="mr-2 font-semibold text-muted-foreground">{index + 1}.</span>
                {item.text}
              </span>
              <span className="flex gap-1">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => move(index, -1)}
                  aria-label={`Monter « ${item.text} »`}
                  className={cn(buttonClasses("ghost", "md"), "h-8 w-8 px-0 disabled:opacity-40")}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => move(index, 1)}
                  aria-label={`Descendre « ${item.text} »`}
                  className={cn(buttonClasses("ghost", "md"), "h-8 w-8 px-0 disabled:opacity-40")}
                >
                  ↓
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      {!submitted ? (
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            onDone?.(isCorrect);
          }}
          className={buttonClasses("primary", "md")}
        >
          Vérifier l&apos;ordre
        </button>
      ) : (
        <CorrectionPanel isCorrect={isCorrect} correction={exercise.correction} />
      )}
    </div>
  );
}

function AssociationBody({
  exercise,
  onDone,
}: {
  exercise: Extract<Exercise, { type: "association" }>;
  onDone?: (correct: boolean) => void;
}) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const selectId = useId();

  const rightOptions = useMemo(
    () => [...exercise.pairs].sort((a, b) => a.right.localeCompare(b.right)),
    [exercise.pairs]
  );

  const allCorrect = exercise.pairs.every((pair) => selections[pair.id] === pair.right);
  const allAnswered = exercise.pairs.every((pair) => Boolean(selections[pair.id]));

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {exercise.pairs.map((pair) => (
          <div key={pair.id} className="flex flex-wrap items-center gap-2 text-sm">
            <label htmlFor={`${selectId}-${pair.id}`} className="w-56 font-medium text-foreground">
              {pair.left}
            </label>
            <select
              id={`${selectId}-${pair.id}`}
              disabled={submitted}
              value={selections[pair.id] ?? ""}
              onChange={(event) =>
                setSelections((prev) => ({ ...prev, [pair.id]: event.target.value }))
              }
              className={cn(
                "flex-1 min-w-48 rounded-md border px-2 py-1.5 text-sm",
                submitted
                  ? selections[pair.id] === pair.right
                    ? "border-success bg-success/10"
                    : "border-red-500 bg-red-500/10"
                  : "border-border bg-background"
              )}
            >
              <option value="">Choisir une définition...</option>
              {rightOptions.map((option) => (
                <option key={option.id} value={option.right}>
                  {option.right}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => {
            setSubmitted(true);
            onDone?.(allCorrect);
          }}
          className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
        >
          Vérifier
        </button>
      ) : (
        <CorrectionPanel isCorrect={allCorrect} correction={exercise.correction} />
      )}
    </div>
  );
}

function ComprehensionEcriteBody({
  exercise,
  onDone,
}: {
  exercise: Extract<Exercise, { type: "comprehension_ecrite" }>;
  onDone?: (correct: boolean) => void;
}) {
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  function handleAnswered(questionId: string, correct: boolean) {
    const next = { ...answered, [questionId]: correct };
    setAnswered(next);
    if (Object.keys(next).length === exercise.questions.length) {
      onDone?.(Object.values(next).every(Boolean));
    }
  }

  return (
    <div className="space-y-3">
      <p className="whitespace-pre-line rounded-lg bg-muted p-3 text-sm leading-relaxed text-foreground">
        {exercise.text}
      </p>
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

const DIFFICULTY_LABEL: Record<Exercise["difficulty"], string> = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
};

const TYPE_LABEL: Record<Exercise["type"], string> = {
  qcm: "QCM",
  vrai_faux: "Vrai / Faux",
  texte_a_trous: "Texte à trous",
  remise_en_ordre: "Remettre dans l'ordre",
  association: "Associer",
  comprehension_ecrite: "Compréhension écrite",
  comprehension_orale: "Compréhension orale",
  reponse_courte: "Réponse courte",
  production_ecrite: "Production écrite",
};

export default function ExerciseCard({
  exercise,
  onCompleted,
}: {
  exercise: Exercise;
  onCompleted?: (correct: boolean) => void;
}) {
  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="neutral">{TYPE_LABEL[exercise.type]}</Badge>
        <Badge variant="secondary">{DIFFICULTY_LABEL[exercise.difficulty]}</Badge>
      </div>

      <p className="mb-3 text-sm text-muted-foreground">{exercise.instructions}</p>

      {exercise.type === "qcm" ? (
        <QuizQuestion question={exercise.question} onAnswered={onCompleted} />
      ) : null}

      {exercise.type === "vrai_faux" ? (
        <VraiFauxBody exercise={exercise} onDone={onCompleted} />
      ) : null}

      {exercise.type === "texte_a_trous" ? (
        <TexteATrousBody exercise={exercise} onDone={onCompleted} />
      ) : null}

      {exercise.type === "remise_en_ordre" ? (
        <RemiseEnOrdreBody exercise={exercise} onDone={onCompleted} />
      ) : null}

      {exercise.type === "association" ? (
        <AssociationBody exercise={exercise} onDone={onCompleted} />
      ) : null}

      {exercise.type === "comprehension_ecrite" ? (
        <ComprehensionEcriteBody exercise={exercise} onDone={onCompleted} />
      ) : null}

      {exercise.type === "comprehension_orale" ? (
        <AudioExercise exercise={exercise} onExerciseAnswered={onCompleted} />
      ) : null}

      {(exercise.type === "reponse_courte" || exercise.type === "production_ecrite") ? (
        <WrittenExercise exercise={exercise} onExerciseAnswered={onCompleted} />
      ) : null}
    </Card>
  );
}

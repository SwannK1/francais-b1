"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";
import Card from "@/components/ui/Card";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { cn } from "@/lib/cn";
import { PLACEMENT_QUESTIONS } from "@/lib/pedagogy/data/placement-questions";
import { computePlacementResult } from "@/lib/pedagogy/logic/placement";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { useProgress } from "@/lib/pedagogy/useProgress";
import type { PlacementAnswer } from "@/lib/pedagogy/types";

export default function TestNiveauPage() {
  const { markPlacementCompleted } = useProgress();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const [finished, setFinished] = useState(false);

  const question = PLACEMENT_QUESTIONS[step];
  const currentAnswer = answers.find((a) => a.questionId === question?.id);
  const isLastQuestion = step === PLACEMENT_QUESTIONS.length - 1;

  function selectChoice(choiceId: string) {
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== question.id),
      { questionId: question.id, choiceId },
    ]);
  }

  function goNext() {
    if (isLastQuestion) {
      const result = computePlacementResult(PLACEMENT_QUESTIONS, answers);
      markPlacementCompleted(result.estimatedLevel);
      setFinished(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const result = computePlacementResult(PLACEMENT_QUESTIONS, answers);
    const isB1OrBelow = result.estimatedLevel !== "B2";

    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Votre résultat</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ce résultat est un niveau estimé à titre indicatif, il ne remplace pas une
            certification CECRL officielle.
          </p>
        </header>

        <Card>
          <LevelBadge level={result.estimatedLevel} />
          <p className="mt-3 text-3xl font-bold text-foreground">{result.globalScore}%</p>
          <p className="text-sm text-muted-foreground">de bonnes réponses au total</p>
        </Card>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Résultats par domaine</h2>
          <div className="space-y-3">
            {result.domainScores.map((score) => (
              <ProgressBar
                key={score.domain}
                value={score.successRate}
                label={`${DOMAIN_LABELS[score.domain]} (${score.correct}/${score.total})`}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-sm font-semibold text-foreground">Points forts</h3>
            {result.strengths.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {result.strengths.map((domain) => (
                  <li key={domain}>{DOMAIN_LABELS[domain]}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Pas encore de point fort net, continuez à vous entraîner.
              </p>
            )}
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-foreground">Points à travailler</h3>
            {result.weaknesses.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {result.weaknesses.map((domain) => (
                  <li key={domain}>{DOMAIN_LABELS[domain]}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Rien à signaler pour le moment.</p>
            )}
          </Card>
        </div>

        <Card>
          {isB1OrBelow ? (
            <>
              <p className="text-sm text-foreground">
                Votre niveau estimé est <strong>{result.estimatedLevel}</strong>, au niveau B1 ou en
                dessous. Le parcours B1 de la plateforme est adapté pour progresser à partir de là.
              </p>
              <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-3")}>
                Commencer mon parcours B1
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-foreground">
                Votre profil semble déjà dépasser le niveau B1. Le parcours B2 n&apos;est pas encore
                disponible sur la plateforme : vous pouvez explorer le parcours B1 pour consolider vos
                bases en attendant.
              </p>
              <Link href="/parcours" className={cn(buttonClasses("secondary", "md"), "mt-3")}>
                Découvrir le parcours B1
              </Link>
            </>
          )}
        </Card>

        <button type="button" onClick={restart} className={buttonClasses("secondary", "md")}>
          Recommencer le test
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Test de positionnement</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quelques questions pour estimer votre niveau. Ce n&apos;est pas une certification
          officielle.
        </p>
      </header>

      <ProgressBar
        value={((step + 1) / PLACEMENT_QUESTIONS.length) * 100}
        label={`Question ${step + 1} sur ${PLACEMENT_QUESTIONS.length}`}
      />

      <fieldset className="rounded-2xl border border-border bg-card p-5">
        <legend className="px-1 text-base font-medium text-foreground">{question.prompt}</legend>
        <div className="mt-3 space-y-2">
          {question.choices.map((choice) => (
            <label
              key={choice.id}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                currentAnswer?.choiceId === choice.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted"
              )}
            >
              <input
                type="radio"
                name={`placement-${question.id}`}
                checked={currentAnswer?.choiceId === choice.id}
                onChange={() => selectChoice(choice.id)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              {choice.text}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={goNext}
        disabled={!currentAnswer}
        className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
      >
        {isLastQuestion ? "Voir mon résultat" : "Question suivante"}
      </button>
    </div>
  );
}

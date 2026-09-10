"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import SpokenExercise from "@/components/pedagogy/SpokenExercise";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import ReadingBlock from "@/components/assessment/blocks/ReadingBlock";
import ListeningBlock from "@/components/assessment/blocks/ListeningBlock";
import { useAssessmentAttempts } from "@/lib/assessment/useAssessmentAttempts";
import { scoreAssessment, type AssessmentResult } from "@/lib/assessment/logic/scoring";
import { buildAssessmentEvidence } from "@/lib/assessment/logic/progress-evidence";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { ASSESSMENT_DIMENSION_LABELS, CHECKPOINT_LABELS } from "@/lib/assessment/logic/labels";
import { trackEvent } from "@/lib/analytics/client";
import type { AssessmentAttempt, AssessmentDefinition } from "@/lib/assessment/types";

const CHECKPOINT_KIND_LABEL: Record<AssessmentDefinition["checkpointKind"], string> = {
  bilan: "Bilan de niveau",
  passage: "Passage de niveau",
};

function formatAttemptDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DimensionStatusLabel({ status }: { status: AssessmentResult["dimensionScores"][number]["status"] }) {
  if (status === "maitrisee") return <span className="font-medium text-success">Maîtrisée</span>;
  if (status === "insuffisante") return <span className="font-medium text-red-600">À retravailler</span>;
  return <span className="font-medium text-muted-foreground">En progrès</span>;
}

/**
 * Détail d'une tentative : score par dimension + verdict global + compétences
 * maîtrisées/insuffisantes + recommandation. Réutilisé pour la tentative
 * active (avec bouton "Terminer") et l'historique (lecture seule) — même
 * logique que `ResultSummary` dans `ExamExperience.tsx`.
 */
function ResultSummary({
  result,
  onFinish,
  canFinish,
}: {
  result: AssessmentResult;
  onFinish?: () => void;
  canFinish?: boolean;
}) {
  return (
    <div>
      <ul className="space-y-1.5 text-sm">
        {result.dimensionScores.map((score) => (
          <li key={score.dimension} className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{ASSESSMENT_DIMENSION_LABELS[score.dimension]}</span>
            <span className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {score.correct}/{score.total}
              </span>
              <DimensionStatusLabel status={score.status} />
            </span>
          </li>
        ))}
        {result.hasGuidedProduction ? (
          <li className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{ASSESSMENT_DIMENSION_LABELS.production_guidee}</span>
            <span className="text-xs text-muted-foreground">Auto-évaluée, non comptée dans le score</span>
          </li>
        ) : null}
      </ul>

      <p className="mt-3 text-sm font-semibold text-foreground">
        {result.isComplete
          ? `Score : ${result.overallCorrect}/${result.overallTotal} (${Math.round(result.overallScore * 100)}%) — ${
              result.passed ? "réussi" : "seuil non atteint"
            }`
          : `Provisoire — ${result.overallCorrect}/${result.overallTotal} questions notées répondues pour l'instant`}
      </p>

      <p className="mt-2 text-sm text-muted-foreground">{result.recommendation}</p>

      {canFinish && onFinish ? (
        <button type="button" onClick={onFinish} className={cn(buttonClasses("primary", "md"), "mt-4")}>
          Terminer la tentative
        </button>
      ) : null}
    </div>
  );
}

function AttemptRow({ assessment, attempt }: { assessment: AssessmentDefinition; attempt: AssessmentAttempt }) {
  const [expanded, setExpanded] = useState(false);
  const result = scoreAssessment(assessment, attempt.answeredCorrect);

  return (
    <li className="rounded-lg bg-muted">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm"
      >
        <span className="text-muted-foreground">{formatAttemptDate(attempt.startedAt)}</span>
        <span className="flex items-center gap-2 font-medium text-foreground">
          {attempt.status === "abandoned"
            ? "Abandonnée"
            : result.isComplete
              ? `${result.overallCorrect}/${result.overallTotal} — ${result.passed ? "réussi" : "non atteint"}`
              : "Provisoire"}
          <ChevronDownIcon className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
        </span>
      </button>
      {expanded ? (
        <div className="border-t border-border px-3 py-3">
          <ResultSummary result={result} />
        </div>
      ) : null}
    </li>
  );
}

export default function AssessmentExperience({ assessment }: { assessment: AssessmentDefinition }) {
  const { startAttempt, recordAnswer, markGuidedProductionDone, finishAttempt, getActiveAttempt, getAttempts } =
    useAssessmentAttempts();
  const { recordAssessmentEvidence } = useProgress();

  const viewTracked = useRef<string | null>(null);
  useEffect(() => {
    if (viewTracked.current === assessment.id) return;
    viewTracked.current = assessment.id;
    trackEvent("assessment_viewed", { assessmentId: assessment.id });
  }, [assessment.id]);

  const activeAttempt = getActiveAttempt(assessment.id);
  const allAttempts = getAttempts(assessment.id).sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));

  const focusAttempt = activeAttempt ?? allAttempts[0] ?? null;
  const historyAttempts = allAttempts.filter((attempt) => attempt.id !== focusAttempt?.id);
  const focusResult = focusAttempt ? scoreAssessment(assessment, focusAttempt.answeredCorrect) : null;

  const canFinish =
    Boolean(activeAttempt) &&
    Boolean(focusResult?.isComplete) &&
    (!assessment.guidedProduction || Boolean(activeAttempt?.guidedProductionDone));

  function handleQuestionAnswered(questionId: string, correct: boolean) {
    if (!activeAttempt) return;
    recordAnswer(activeAttempt.id, questionId, correct);
    trackEvent("exercise_completed", { assessmentId: assessment.id, exerciseId: questionId, correct });
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Parcours", href: "/parcours" },
          { label: "Évaluations de passage", href: "/parcours/evaluations" },
          { label: assessment.title },
        ]}
      />

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{CHECKPOINT_KIND_LABEL[assessment.checkpointKind]}</Badge>
          <Badge variant="neutral">{CHECKPOINT_LABELS[assessment.id]}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{assessment.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{assessment.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {assessment.durationMinutes} min · seuil de réussite {Math.round(assessment.passingRatio * 100)}%
        </p>
      </header>

      {activeAttempt ? (
        <div className="space-y-8">
          <section aria-labelledby="reading-title" className="space-y-3">
            <h2 id="reading-title" className="text-base font-semibold text-foreground">
              {ASSESSMENT_DIMENSION_LABELS.comprehension_ecrite}
            </h2>
            {assessment.reading.map((item) => (
              <Card key={item.id}>
                <ReadingBlock item={item} onQuestionAnswered={handleQuestionAnswered} />
              </Card>
            ))}
          </section>

          <section aria-labelledby="listening-title" className="space-y-3">
            <h2 id="listening-title" className="text-base font-semibold text-foreground">
              {ASSESSMENT_DIMENSION_LABELS.comprehension_orale}
            </h2>
            {assessment.listening.map((item) => (
              <Card key={item.id}>
                <ListeningBlock item={item} onQuestionAnswered={handleQuestionAnswered} />
              </Card>
            ))}
          </section>

          <section aria-labelledby="vocabulary-title" className="space-y-3">
            <h2 id="vocabulary-title" className="text-base font-semibold text-foreground">
              {ASSESSMENT_DIMENSION_LABELS.vocabulaire}
            </h2>
            {assessment.vocabulary.map((item) => (
              <QuizQuestion
                key={item.id}
                question={item.question}
                onAnswered={(correct) => handleQuestionAnswered(item.question.id, correct)}
              />
            ))}
          </section>

          <section aria-labelledby="grammar-title" className="space-y-3">
            <h2 id="grammar-title" className="text-base font-semibold text-foreground">
              {ASSESSMENT_DIMENSION_LABELS.grammaire}
            </h2>
            {assessment.grammar.map((item) => (
              <QuizQuestion
                key={item.id}
                question={item.question}
                onAnswered={(correct) => handleQuestionAnswered(item.question.id, correct)}
              />
            ))}
          </section>

          {assessment.guidedProduction ? (
            <section aria-labelledby="production-title" className="space-y-3">
              <h2 id="production-title" className="text-base font-semibold text-foreground">
                {ASSESSMENT_DIMENSION_LABELS.production_guidee}
              </h2>
              <p className="text-xs text-muted-foreground">
                Aucune correction automatique de l&apos;oral n&apos;existe : cette production est
                auto-évaluée et ne compte jamais dans le score ci-dessous.
              </p>
              <Card>
                <SpokenExercise
                  exercise={assessment.guidedProduction.exercise}
                  onExerciseAnswered={() => {
                    markGuidedProductionDone(activeAttempt.id);
                    trackEvent("exercise_completed", {
                      assessmentId: assessment.id,
                      exerciseId: assessment.guidedProduction!.exercise.id,
                      exerciseType: "production_orale",
                    });
                  }}
                />
              </Card>
            </section>
          ) : null}
        </div>
      ) : null}

      {focusAttempt && focusResult ? (
        <Card>
          <h2 className="text-sm font-semibold text-foreground">{activeAttempt ? "Résultat" : "Dernier résultat"}</h2>
          <div className="mt-2">
            <ResultSummary
              result={focusResult}
              canFinish={canFinish}
              onFinish={
                activeAttempt
                  ? () => {
                      const completedAttempt = finishAttempt(activeAttempt.id);
                      const evidence = completedAttempt
                        ? buildAssessmentEvidence(assessment, completedAttempt, focusResult)
                        : null;
                      if (evidence) recordAssessmentEvidence(evidence);
                      trackEvent("assessment_completed", {
                        assessmentId: assessment.id,
                        correct: focusResult.passed ?? undefined,
                      });
                    }
                  : undefined
              }
            />
          </div>
        </Card>
      ) : null}

      {!activeAttempt ? (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              startAttempt(assessment.id);
              trackEvent("assessment_started", { assessmentId: assessment.id });
            }}
            className={buttonClasses("primary", "md")}
          >
            {allAttempts.length > 0 ? "Recommencer une tentative" : "Commencer"}
          </button>
          {allAttempts.length > 0 ? (
            <Link href="/parcours" className={buttonClasses("secondary", "md")}>
              Continuer mon parcours
            </Link>
          ) : null}
        </div>
      ) : null}

      {historyAttempts.length > 0 ? (
        <section aria-labelledby="attempts-history-title">
          <h2 id="attempts-history-title" className="mb-2 text-sm font-semibold text-foreground">
            Tentatives précédentes
          </h2>
          <ul className="space-y-1.5">
            {historyAttempts.map((attempt) => (
              <AttemptRow key={attempt.id} assessment={assessment} attempt={attempt} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

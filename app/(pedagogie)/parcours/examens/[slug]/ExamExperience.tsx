"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import { useProgress } from "@/lib/pedagogy/useProgress";
import {
  calculateExamScore,
  getActiveExamAttempt,
  getExamAttempts,
  type ExamScoreSummary,
} from "@/lib/pedagogy/logic/exam";
import type { DelfSection, Exam, ExamAttempt } from "@/lib/pedagogy/types";

const TYPE_LABEL: Record<Exam["type"], string> = {
  delf: "DELF",
  tcf_irn: "TCF IRN",
  interne: "Entraînement interne",
};

const SECTION_LABEL: Record<DelfSection, string> = {
  comprehension_orale: "Compréhension orale",
  comprehension_ecrite: "Compréhension écrite",
  production_ecrite: "Production écrite",
  production_orale: "Production orale",
};

/** Épreuves de production : jamais notées automatiquement, seulement auto-évaluées (voir `logic/exam.ts`). */
function isSelfAssessedSection(section: DelfSection): boolean {
  return section === "production_ecrite" || section === "production_orale";
}

function formatAttemptDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sectionScoreLabel(sectionScore: { section: DelfSection; score: number | null; maxScore: number }): string {
  if (sectionScore.score !== null) return `${sectionScore.score}/${sectionScore.maxScore}`;
  return isSelfAssessedSection(sectionScore.section) ? "Auto-évaluation" : "Pas encore terminée";
}

/**
 * Détail d'une tentative : scores par épreuve + verdict global. Réutilisé pour
 * la tentative active (avec bouton "Terminer") et pour la consultation d'une
 * tentative passée (lecture seule) — un même résultat ne doit jamais avoir
 * deux présentations différentes selon d'où on le consulte.
 */
function ResultSummary({
  exam,
  attempt,
  summary,
  onFinish,
}: {
  exam: Exam;
  attempt: ExamAttempt;
  summary: ExamScoreSummary;
  onFinish?: () => void;
}) {
  const canFinish =
    Boolean(onFinish) &&
    attempt.status === "in_progress" &&
    attempt.sections.every((section) => section.status === "completed");
  const isFinished = attempt.status !== "in_progress";
  const hasSelfAssessedSections = exam.sections.some((section) => isSelfAssessedSection(section.delfSection));

  if (attempt.status === "abandoned") {
    return <p className="text-sm text-muted-foreground">Tentative abandonnée avant la fin des épreuves.</p>;
  }

  return (
    <div>
      <ul className="space-y-1 text-sm">
        {summary.sectionScores.map((sectionScore) => (
          <li key={sectionScore.section} className="flex items-center justify-between">
            <span className="text-muted-foreground">{SECTION_LABEL[sectionScore.section]}</span>
            <span className="font-medium text-foreground">{sectionScoreLabel(sectionScore)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm font-semibold text-foreground">
        {summary.isProvisional
          ? `Résultat provisoire — ${summary.scoredPoints}/${summary.scoredMax} points évalués automatiquement sur ${summary.totalMax} au total`
          : `Total : ${summary.scoredPoints}/${summary.totalMax} — ${
              summary.passed ? "réussi" : "seuil non atteint"
            }`}
      </p>

      {isFinished ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {summary.isProvisional
            ? hasSelfAssessedSections
              ? "Les productions écrite et orale ne sont pas corrigées automatiquement : auto-évaluez-les avec les critères fournis dans chaque exercice."
              : "Certaines sections ne sont pas encore terminées."
            : summary.passed
              ? "Seuil de réussite atteint sur les épreuves notées automatiquement. Vous pouvez retenter une épreuve ou continuer votre parcours."
              : "Seuil de réussite non atteint sur les épreuves notées automatiquement. Retravaillez les sections concernées avant une nouvelle tentative."}
        </p>
      ) : null}

      {canFinish ? (
        <button type="button" onClick={onFinish} className={cn(buttonClasses("primary", "md"), "mt-4")}>
          Terminer la tentative
        </button>
      ) : null}
    </div>
  );
}

function AttemptRow({ exam, attempt }: { exam: Exam; attempt: ExamAttempt }) {
  const [expanded, setExpanded] = useState(false);
  const summary = calculateExamScore(exam, attempt);

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
            : summary.isProvisional
              ? "Résultat provisoire"
              : `${summary.scoredPoints}/${summary.totalMax}`}
          <ChevronDownIcon className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
        </span>
      </button>
      {expanded ? (
        <div className="border-t border-border px-3 py-3">
          <ResultSummary exam={exam} attempt={attempt} summary={summary} />
        </div>
      ) : null}
    </li>
  );
}

export default function ExamExperience({ exam }: { exam: Exam }) {
  const { progress, startExam, recordExamResult, finishExam } = useProgress();

  const activeAttempt = getActiveExamAttempt(progress, exam.id);
  const allAttempts = getExamAttempts(progress, exam.id).sort((a, b) =>
    a.startedAt < b.startedAt ? 1 : -1
  );

  /** Tentative mise en avant : celle en cours, sinon la plus récente terminée — jamais aucune, tant qu'il y en a au moins une. */
  const focusAttempt = activeAttempt ?? allAttempts[0] ?? null;
  const historyAttempts = allAttempts.filter((attempt) => attempt.id !== focusAttempt?.id);

  const focusSummary = focusAttempt ? calculateExamScore(exam, focusAttempt) : null;

  return (
    <div className="space-y-6">
      <Link href="/parcours/examens" className="text-sm font-medium text-primary hover:underline">
        ← Retour à la préparation examen
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{TYPE_LABEL[exam.type]}</Badge>
          <Badge variant="neutral">{exam.level}</Badge>
          {exam.isBlanc ? <Badge variant="secondary">Examen blanc</Badge> : null}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{exam.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {exam.durationMinutes} min · {exam.sections.length} sections · seuil de réussite{" "}
          {exam.passingScore}/{exam.maxScore}
        </p>
      </header>

      {activeAttempt ? (
        <div className="space-y-8">
          {exam.sections.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}-title`} className="space-y-3">
              <h2 id={`section-${section.id}-title`} className="text-base font-semibold text-foreground">
                {section.title} · {section.durationMinutes} min · {section.maxScore} points
              </h2>
              {section.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onCompleted={(correct) =>
                    recordExamResult(exam, activeAttempt.id, section.delfSection, exercise, correct)
                  }
                />
              ))}
            </section>
          ))}
        </div>
      ) : null}

      {focusAttempt && focusSummary ? (
        <Card>
          <h2 className="text-sm font-semibold text-foreground">
            {activeAttempt ? "Résultat" : "Dernier résultat"}
          </h2>
          <div className="mt-2">
            <ResultSummary
              exam={exam}
              attempt={focusAttempt}
              summary={focusSummary}
              onFinish={activeAttempt ? () => finishExam(activeAttempt.id) : undefined}
            />
          </div>
        </Card>
      ) : null}

      {!activeAttempt ? (
        <button type="button" onClick={() => startExam(exam)} className={buttonClasses("primary", "md")}>
          {allAttempts.length > 0 ? "Commencer une nouvelle tentative" : "Commencer une tentative"}
        </button>
      ) : null}

      {historyAttempts.length > 0 ? (
        <section aria-labelledby="attempts-history-title">
          <h2 id="attempts-history-title" className="mb-2 text-sm font-semibold text-foreground">
            Tentatives précédentes
          </h2>
          <ul className="space-y-1.5">
            {historyAttempts.map((attempt) => (
              <AttemptRow key={attempt.id} exam={exam} attempt={attempt} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { calculateExamScore, getActiveExamAttempt, getExamAttempts } from "@/lib/pedagogy/logic/exam";
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

function formatAttemptDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AttemptRow({ exam, attempt }: { exam: Exam; attempt: ExamAttempt }) {
  const summary = calculateExamScore(exam, attempt);
  return (
    <li className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
      <span className="text-muted-foreground">{formatAttemptDate(attempt.startedAt)}</span>
      <span className="font-medium text-foreground">
        {attempt.status === "abandoned"
          ? "Abandonnée"
          : summary.isProvisional
            ? "Résultat provisoire"
            : `${summary.scoredPoints}/${summary.totalMax}`}
      </span>
    </li>
  );
}

export default function ExamExperience({ exam }: { exam: Exam }) {
  const { progress, startExam, recordExamResult, finishExam } = useProgress();

  const activeAttempt = getActiveExamAttempt(progress, exam.id);
  const pastAttempts = getExamAttempts(progress, exam.id)
    .filter((attempt) => attempt.id !== activeAttempt?.id)
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1));

  const summary = activeAttempt ? calculateExamScore(exam, activeAttempt) : null;
  const allSectionsCompleted = activeAttempt?.sections.every((s) => s.status === "completed") ?? false;

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

      {pastAttempts.length > 0 ? (
        <section aria-labelledby="attempts-history-title">
          <h2 id="attempts-history-title" className="mb-2 text-sm font-semibold text-foreground">
            Tentatives précédentes
          </h2>
          <ul className="space-y-1.5">
            {pastAttempts.map((attempt) => (
              <AttemptRow key={attempt.id} exam={exam} attempt={attempt} />
            ))}
          </ul>
        </section>
      ) : null}

      {!activeAttempt ? (
        <button type="button" onClick={() => startExam(exam)} className={buttonClasses("primary", "md")}>
          Commencer une tentative
        </button>
      ) : (
        <>
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

          {summary ? (
            <Card>
              <h2 className="text-sm font-semibold text-foreground">Résultat</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {summary.sectionScores.map((sectionScore) => (
                  <li key={sectionScore.section} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{SECTION_LABEL[sectionScore.section]}</span>
                    <span className="font-medium text-foreground">
                      {sectionScore.score === null
                        ? "non évaluée"
                        : `${sectionScore.score}/${sectionScore.maxScore}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {summary.isProvisional
                  ? `Résultat provisoire — ${summary.scoredPoints}/${summary.scoredMax} points évalués sur ${summary.totalMax} au total`
                  : `Total : ${summary.scoredPoints}/${summary.totalMax} — ${
                      summary.passed ? "réussi" : "seuil non atteint"
                    }`}
              </p>
              {allSectionsCompleted && activeAttempt.status === "in_progress" ? (
                <button
                  type="button"
                  onClick={() => finishExam(activeAttempt.id)}
                  className={cn(buttonClasses("primary", "md"), "mt-4")}
                >
                  Terminer la tentative
                </button>
              ) : null}
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}

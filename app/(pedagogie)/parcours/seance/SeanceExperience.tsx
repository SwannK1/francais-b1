"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckIcon } from "@/components/ui/icons";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getEffectiveLevel } from "@/lib/pedagogy/logic/parcours";
import { findExerciseInModule } from "@/lib/pedagogy/logic/module-structure";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { determineDailySessionMode, buildSessionSteps, buildDailySessionRecap } from "@/lib/daily/session-engine";
import type { DailySessionStep } from "@/lib/daily/types";
import type { Module, PublicModule } from "@/lib/pedagogy/types";

/**
 * Séance guidée du jour — exécution réelle. Reçoit le module complet déjà
 * autorisé par `page.tsx` (comme `ModuleExperience`). Les étapes ne sont
 * jamais reprises telles quelles d'une planification calculée ailleurs
 * (ex. la carte affichée sur `/parcours`) : elles sont reconstruites ici, à
 * partir de ce module réel et de la progression courante — garantit que ce
 * qui est affiché correspond toujours exactement à ce qui est exécuté,
 * même si la progression a changé entre l'affichage de la carte et
 * l'ouverture de cette page (ex. autre onglet).
 */
export default function SeanceExperience({ mod }: { mod: Module }) {
  const { progress, recordResult } = useProgress();
  const { user } = useAuth();

  const isAccessible = (m: PublicModule) => canAccess({ kind: "module", slug: m.slug }, user?.premiumUntil);
  // Niveau effectif, pas le seul `progress.level` brut — voir `getEffectiveLevel`
  // et `lib/daily/session-engine.ts` (même raisonnement pour `buildDailySession`).
  const levelModules = PUBLIC_MODULES.filter((m) => m.level === getEffectiveLevel(progress, PUBLIC_MODULES));

  const mode = useMemo(() => determineDailySessionMode(progress, levelModules), [progress, levelModules]);
  const reviewItem = useMemo(() => getReviewItems(progress, levelModules)[0] ?? null, [progress, levelModules]);
  const steps = useMemo(() => buildSessionSteps(mod, progress, mode, reviewItem), [mod, progress, mode, reviewItem]);

  const [stepIndex, setStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);

  const step: DailySessionStep | undefined = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const headingRef = useRef<HTMLHeadingElement>(null);

  const startTracked = useRef(false);
  useEffect(() => {
    if (startTracked.current) return;
    if (steps.length === 0) return;
    startTracked.current = true;
    trackEvent("daily_session_started", { moduleId: mod.id });
  }, [steps.length, mod.id]);

  function markCurrentStepDone() {
    if (!step) return;
    setCompletedStepIds((prev) => (prev.includes(step.id) ? prev : [...prev, step.id]));
  }

  function goNext() {
    markCurrentStepDone();
    if (isLastStep) {
      setFinished(true);
      trackEvent("daily_session_completed", { moduleId: mod.id });
      return;
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function goPrevious() {
    setStepIndex((i) => Math.max(i - 1, 0));
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function goTo(index: number) {
    setStepIndex(Math.min(Math.max(index, 0), steps.length - 1));
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function handleExerciseCompleted(exerciseId: string, correct: boolean) {
    const exercise = findExerciseInModule(mod, exerciseId);
    if (!exercise) return;
    recordResult(mod, exercise, correct);
    setResults((prev) => [...prev, { correct }]);
  }

  // Aucune étape construite pour ce module (cas limite : module sans leçon
  // exploitable) — jamais d'écran cassé, on renvoie proprement au parcours.
  if (steps.length === 0) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: "Séance du jour" }]} />
        <Card>
          <p className="text-sm text-muted-foreground">
            Aucune séance disponible pour « {mod.title} » pour le moment.
          </p>
          <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-4")}>
            Retour au parcours
          </Link>
        </Card>
      </div>
    );
  }

  if (finished) {
    const recap = buildDailySessionRecap({
      plan: {
        mode,
        moduleId: mod.id,
        moduleSlug: mod.slug,
        moduleTitle: mod.title,
        stageTitle: "",
        isResuming: false,
        steps,
        totalEstimatedMinutes: steps.reduce((sum, s) => sum + s.estimatedMinutes, 0),
        focusSkillId: null,
        focusSkillName: null,
        reason: "",
      },
      completedStepIds,
      results,
      progress,
      modules: PUBLIC_MODULES,
      isAccessible,
    });

    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: "Séance du jour" }]} />

        <Card className="border-success/40 bg-success/5">
          <p className="text-xs font-semibold uppercase tracking-wide text-success">Séance terminée</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Bravo, séance complétée !</h1>

          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground">Aujourd’hui, tu as travaillé :</p>
            <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
              {recap.workedOnTitles.map((title, index) => (
                <li key={`${title}-${index}`}>{title}</li>
              ))}
            </ul>
          </div>

          {recap.successRate !== null ? (
            <p className="mt-3 text-sm text-foreground">
              Réussite globale sur cette séance :{" "}
              <strong>
                {recap.correctCount}/{recap.attemptedCount} ({recap.successRate}%)
              </strong>
            </p>
          ) : null}

          {recap.skillToReview ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Compétence à garder à l’œil : <strong className="text-foreground">{recap.skillToReview.name}</strong>
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={recap.nextStepHref} className={buttonClasses("primary", "md")}>
              {recap.nextStepLabel}
            </Link>
            <Link href="/parcours" className={buttonClasses("secondary", "md")}>
              Retour au parcours
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const lesson = step?.lessonId ? mod.lessons.find((l) => l.id === step.lessonId) : undefined;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: "Séance du jour" }]} />

      <header>
        <h1 className="text-2xl font-bold text-foreground">Séance du jour</h1>
        <p className="mt-1 text-sm text-muted-foreground">{mod.title}</p>
        <ProgressBar
          value={((stepIndex + (completedStepIds.includes(step?.id ?? "") ? 1 : 0)) / steps.length) * 100}
          label={`Étape ${stepIndex + 1} sur ${steps.length}`}
          className="mt-4"
        />
      </header>

      <nav aria-label="Étapes de la séance">
        <ol className="flex flex-wrap gap-2">
          {steps.map((s, index) => {
            const isCurrent = index === stepIndex;
            const isDone = completedStepIds.includes(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-medium transition-colors",
                    isCurrent
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                      isDone ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isDone ? <CheckIcon className="h-3 w-3" /> : index + 1}
                  </span>
                  {s.title}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <section aria-labelledby="current-step-title">
        <h2
          id="current-step-title"
          ref={headingRef}
          tabIndex={-1}
          className="scroll-mt-24 text-lg font-semibold text-foreground outline-none"
        >
          {stepIndex + 1}. {step?.title}
        </h2>
        {step?.kind === "lesson" ? (
          <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
        ) : null}

        <div className="mt-4 space-y-4">
          {step?.kind === "rappel" ? (
            <Card>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {step.reviewHref ? (
                <Link href={step.reviewHref} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                  Voir ce point →
                </Link>
              ) : null}
            </Card>
          ) : null}

          {step?.kind === "lesson" && lesson
            ? lesson.activities.map((activity) => (
                <div key={activity.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
                  {activity.exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onCompleted={(correct) => handleExerciseCompleted(exercise.id, correct)}
                    />
                  ))}
                </div>
              ))
            : null}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            disabled={stepIndex === 0}
            className={cn(buttonClasses("secondary", "md"), "disabled:opacity-40")}
          >
            ← Précédent
          </button>
          <Link href="/parcours" className="text-sm font-medium text-muted-foreground hover:underline">
            Quitter la séance
          </Link>
        </div>

        <button type="button" onClick={goNext} className={buttonClasses("primary", "md")}>
          {isLastStep ? "Terminer la séance" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}

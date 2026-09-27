"use client";

import { useEffect, useRef, useState } from "react";
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
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";
import { getDailyMinutes } from "@/lib/pedagogy/logic/preferences";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess, isPremiumActive } from "@/lib/commerce/access";
import {
  determineDailySessionMode,
  buildSessionSteps,
  buildDailySessionRecap,
  pickSessionReview,
} from "@/lib/daily/session-engine";
import { getTodayOverview } from "@/lib/daily/today";
import { STEP_FOCUS_LABELS } from "@/components/pedagogy/GuidedSessionCard";
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

  // `mode`/`steps` sont figés au montage (lazy initializer), jamais
  // recalculés en réaction à `progress` : `progress` change à chaque
  // `recordResult()` (une réponse donnée plus loin dans cette même séance),
  // et un `useMemo` gardé sur `progress` reconstruisait alors la liste des
  // étapes EN PLEIN MILIEU de la séance (ex. une étape « Rappel rapide »
  // apparaissant/disparaissant selon l'état de révision du moment) sans que
  // `stepIndex` — un simple state local — ne soit jamais réconcilié avec le
  // nouveau tableau : `steps[stepIndex]` pouvait alors pointer hors bornes
  // (étape vide, « Étape 5 sur 4 », dernière étape indétectable). Un nouveau
  // montage (rechargement, nouvel onglet) recalcule bien à partir de la
  // progression à jour — c'était déjà l'intention du commentaire d'origine,
  // seule la réaction en cours de séance était fautive.
  const [{ mode, steps, isFirstSession }] = useState(() => {
    // Niveau effectif, pas le seul `progress.level` brut — voir
    // `getEffectiveLevel` et `lib/daily/session-engine.ts` (même
    // raisonnement pour `buildDailySession`). Même rappel que la carte
    // affichée sur `/aujourdhui` (`pickSessionReview`).
    const levelModules = PUBLIC_MODULES.filter((m) => m.level === getEffectiveLevel(progress, PUBLIC_MODULES));
    const initialMode = determineDailySessionMode(progress, levelModules);
    const { reviewItem } = pickSessionReview(progress, levelModules, isAccessible);
    return {
      mode: initialMode,
      steps: buildSessionSteps(mod, progress, initialMode, reviewItem),
      isFirstSession: !progress.moduleProgress.some((mp) => mp.completedExerciseIds.length > 0),
    };
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [results, setResults] = useState<{ correct: boolean; skillId: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const step: DailySessionStep | undefined = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const headingRef = useRef<HTMLHeadingElement>(null);

  const startTracked = useRef(false);
  useEffect(() => {
    if (startTracked.current) return;
    if (steps.length === 0) return;
    startTracked.current = true;
    trackEvent("daily_session_started", {
      moduleId: mod.id,
      sessionMode: mode,
      firstSession: isFirstSession,
      dailyMinutes: getDailyMinutes(progress),
    });
    // Une seule fois au montage : `progress` évolue pendant la séance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, mod.id]);

  function markCurrentStepDone() {
    if (!step) return;
    setCompletedStepIds((prev) => (prev.includes(step.id) ? prev : [...prev, step.id]));
  }

  function goNext() {
    markCurrentStepDone();
    if (isLastStep) {
      setFinished(true);
      trackEvent("daily_session_completed", {
        moduleId: mod.id,
        sessionMode: mode,
        firstSession: isFirstSession,
        isPremium: isPremiumActive(user?.premiumUntil),
      });
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
    setResults((prev) => [...prev, { correct, skillId: exercise.skillId }]);
  }

  // Aucune étape construite pour ce module (cas limite : module sans leçon
  // exploitable) — jamais d'écran cassé, on renvoie proprement au parcours.
  if (steps.length === 0) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: "Aujourd'hui", href: "/aujourdhui" }, { label: "Séance du jour" }]} />
        <Card>
          <p className="text-sm text-muted-foreground">
            Aucune séance disponible pour « {mod.title} » pour le moment.
          </p>
          <Link href="/aujourdhui" className={cn(buttonClasses("primary", "md"), "mt-4")}>
            Retour à Aujourd&apos;hui
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
        capability: getModuleCapability(mod),
        stageTitle: "",
        dailyMinutes: getDailyMinutes(progress),
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
    // Prochaine séance, calculée sur la progression À JOUR — même vue que
    // `/aujourdhui` (`getTodayOverview`), jamais une règle propre au bilan.
    const nextToday = getTodayOverview(progress, PUBLIC_MODULES, isAccessible);
    const discoveryEnded = !nextToday.plan && Boolean(nextToday.lockedPlan);

    return (
      <SessionRecap
        recap={recap}
        nextCapability={nextToday.plan?.capability ?? null}
        nextMinutes={nextToday.plan?.totalEstimatedMinutes ?? null}
        discoveryEnded={discoveryEnded}
        lockedCapability={nextToday.lockedPlan?.capability ?? null}
      />
    );
  }

  const lesson = step?.lessonId ? mod.lessons.find((l) => l.id === step.lessonId) : undefined;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Aujourd'hui", href: "/aujourdhui" }, { label: "Séance du jour" }]} />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Séance du jour</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-foreground">{getModuleCapability(mod)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Module : {mod.title}</p>
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
          {step ? `${STEP_FOCUS_LABELS[step.focus]} · ` : ""}
          {step?.title}
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
          <Link href="/aujourdhui" className="text-sm font-medium text-muted-foreground hover:underline">
            Quitter
          </Link>
        </div>

        <button type="button" onClick={goNext} className={buttonClasses("primary", "md")}>
          {isLastStep ? "Terminer la séance" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}

/**
 * Bilan de fin de séance — d'abord ce que l'apprenant sait mieux faire,
 * ensuite le détail (compétences, réussites), enfin UNE prochaine action.
 * Le score n'est jamais le message principal.
 */
function SessionRecap({
  recap,
  nextCapability,
  nextMinutes,
  discoveryEnded,
  lockedCapability,
}: {
  recap: ReturnType<typeof buildDailySessionRecap>;
  nextCapability: string | null;
  nextMinutes: number | null;
  discoveryEnded: boolean;
  lockedCapability: string | null;
}) {
  const paywallTracked = useRef(false);
  useEffect(() => {
    if (!discoveryEnded || paywallTracked.current) return;
    paywallTracked.current = true;
    trackEvent("paywall_viewed", { source: "session_recap_discovery_ended" });
  }, [discoveryEnded]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumbs items={[{ label: "Aujourd'hui", href: "/aujourdhui" }, { label: "Bilan de la séance" }]} />

      <section aria-labelledby="recap-title" className="rounded-2xl border border-success/40 bg-card p-5 shadow-sm sm:p-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-success">
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
          Séance terminée
        </p>
        <h1 id="recap-title" className="mt-2 text-sm font-semibold text-muted-foreground">
          {recap.attemptedCount > 0 ? "Aujourd'hui, tu sais mieux…" : "Aujourd'hui, tu as découvert…"}
        </h1>
        <p className="mt-1 text-2xl font-bold leading-tight text-foreground sm:text-3xl">{recap.capability}</p>
        {recap.attemptedCount === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Tu n&apos;as fait aucun exercice : ta progression n&apos;a pas changé. Refais la séance en répondant
            aux exercices pour qu&apos;elle compte.
          </p>
        ) : null}

        {recap.skillsWorked.length > 0 ? (
          <div className="mt-5">
            <h2 className="text-sm font-semibold text-foreground">Compétences travaillées</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {recap.skillsWorked.map((name) => (
                <li key={name} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ) : recap.workedOnTitles.length > 0 ? (
          <div className="mt-5">
            <h2 className="text-sm font-semibold text-foreground">Ce que tu as fait</h2>
            <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
              {recap.workedOnTitles.map((title, index) => (
                <li key={`${title}-${index}`}>{title}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {recap.successRate !== null ? (
          <p className="mt-4 text-sm text-foreground">
            Réussites : <strong>{recap.correctCount}/{recap.attemptedCount} ({recap.successRate}%)</strong>
          </p>
        ) : null}

        {recap.skillToReview ? (
          <p className="mt-2 text-sm text-muted-foreground">
            À consolider : <strong className="text-foreground">{recap.skillToReview.name}</strong>. Ce point reviendra dans
            tes révisions.
          </p>
        ) : null}
      </section>

      {discoveryEnded ? (
        <section aria-labelledby="discovery-title" className="rounded-2xl border border-secondary/60 bg-card p-5 shadow-sm sm:p-8">
          <h2 id="discovery-title" className="text-xl font-bold text-foreground">
            Ta séance découverte est terminée.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue ton parcours pour accéder aux prochaines séances, aux révisions et aux situations
            correspondant à ton niveau.
          </p>
          {lockedCapability ? (
            <p className="mt-3 text-sm text-foreground">
              Ta prochaine séance : <strong>{lockedCapability}</strong>
            </p>
          ) : null}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/offre"
              onClick={() => trackEvent("premium_cta_clicked", { source: "session_recap_discovery_ended" })}
              className={buttonClasses("primary", "lg")}
            >
              Continuer mon parcours
            </Link>
            <Link href="/progression" className={buttonClasses("secondary", "lg")}>
              Voir ma progression
            </Link>
          </div>
        </section>
      ) : (
        <section aria-labelledby="next-title" className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <h2 id="next-title" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Prochaine étape
          </h2>
          {nextCapability ? (
            <p className="mt-2 text-base text-foreground">
              Ta prochaine séance : <strong>{nextCapability}</strong>
              {nextMinutes ? <span className="text-muted-foreground"> · environ {nextMinutes} min</span> : null}.
              Reviens demain pour garder le rythme.
            </p>
          ) : (
            <p className="mt-2 text-base text-foreground">Tu as fait le tour de ton niveau. Regarde ce que tu sais faire.</p>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link href="/aujourdhui" className={buttonClasses("primary", "lg")}>
              Terminer
            </Link>
            {recap.skillToReview ? (
              <Link href="/reviser" className={buttonClasses("secondary", "lg")}>
                Réviser maintenant
              </Link>
            ) : (
              <Link href="/progression" className={buttonClasses("secondary", "lg")}>
                Voir ma progression
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

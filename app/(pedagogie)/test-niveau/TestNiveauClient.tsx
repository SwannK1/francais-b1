"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { cn } from "@/lib/cn";
import { PLACEMENT_QUESTIONS } from "@/lib/pedagogy/data/placement-questions";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { computePlacementResult } from "@/lib/pedagogy/logic/placement";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { LEARNING_GOALS, getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { GOAL_INTENTS, getIntentForGoal, type GoalIntent } from "@/lib/pedagogy/data/goal-intents";
import {
  DAILY_MINUTES_DESCRIPTIONS,
  DAILY_MINUTES_OPTIONS,
  getDailyMinutes,
  hasChosenDailyMinutes,
} from "@/lib/pedagogy/logic/preferences";
import { getTodayOverview, sessionHref } from "@/lib/daily/today";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { trackEvent } from "@/lib/analytics/client";
import type { DailyMinutes, LearningGoalId, PlacementAnswer, PublicModule } from "@/lib/pedagogy/types";

/**
 * Onboarding complet, en une seule page et quatre temps courts :
 * objectif → temps disponible → test de niveau → résultat + première séance.
 *
 * Le test reste le même (`PLACEMENT_QUESTIONS`, `computePlacementResult`) ;
 * les deux premières étapes n'écrivent que des champs existants ou
 * rétrocompatibles de `UserProgress` (`goalId`, `dailyMinutes`). Le résultat
 * débouche sur la vraie séance du jour (`getTodayOverview` → même moteur que
 * `/aujourdhui`) : le test est un moyen, la première séance la destination.
 */
type Phase = "goal" | "subgoal" | "time" | "questions" | "result";

const STEP_OF_PHASE: Record<Phase, number> = { goal: 1, subgoal: 1, time: 2, questions: 3, result: 4 };
const TOTAL_STEPS = 4;

export default function TestNiveauClient() {
  const { progress, markPlacementCompleted, setGoal, setDailyMinutes } = useProgress();
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("goal");
  const [intent, setIntent] = useState<GoalIntent | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PlacementAnswer[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const startTracked = useRef(false);
  useEffect(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    trackEvent("placement_started");

    // Objectif choisi sur l'accueil (`/test-niveau?goal=...`, voir
    // `components/marketing/Goals.tsx`) : enregistré tout de suite, et
    // l'étape « objectif » est sautée — l'apprenant nous a déjà dit pourquoi
    // il est là. Lecture directe de `location.search` plutôt que
    // `useSearchParams()` pour éviter d'imposer une frontière Suspense à toute
    // la page pour ce seul besoin. Fonction imbriquée : la règle
    // react-hooks/set-state-in-effect refuse un `setState` au premier niveau
    // du corps de l'effet.
    function applyGoalFromUrl() {
      const goalId = new URLSearchParams(window.location.search).get("goal");
      const matchedGoal = LEARNING_GOALS.find((candidate) => candidate.id === goalId);
      if (matchedGoal) {
        setGoal(matchedGoal.id);
        setIntent(getIntentForGoal(matchedGoal.id) ?? null);
        setPhase("time");
      }
    }
    applyGoalFromUrl();
  }, [setGoal]);

  // Chaque changement d'étape ramène le focus sur le nouveau titre : un
  // lecteur d'écran annonce la nouvelle question, un utilisateur clavier
  // repart du haut du formulaire.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [phase, step]);

  function chooseIntent(chosen: GoalIntent) {
    setIntent(chosen);
    if (chosen.goalId) {
      setGoal(chosen.goalId);
      trackEvent("onboarding_goal_selected", { goalId: chosen.goalId });
      setPhase("time");
    } else {
      setPhase("subgoal");
    }
  }

  function chooseSubGoal(goalId: LearningGoalId) {
    setGoal(goalId);
    trackEvent("onboarding_goal_selected", { goalId });
    setPhase("time");
  }

  function chooseMinutes(minutes: DailyMinutes) {
    setDailyMinutes(minutes);
    trackEvent("daily_minutes_selected", { dailyMinutes: minutes, source: "onboarding" });
    setPhase("questions");
  }

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
      trackEvent("placement_completed", { placementLevel: result.estimatedLevel });
      trackEvent("onboarding_completed", {
        placementLevel: result.estimatedLevel,
        goalId: progress.goalId,
        dailyMinutes: getDailyMinutes(progress),
      });
      setPhase("result");
    } else {
      // Position dans le test (pas la réponse elle-même) : suffit à repérer à
      // quelle question les visiteurs décrochent le plus souvent.
      trackEvent("placement_question_answered", { questionIndex: step });
      setStep((s) => s + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setPhase("questions");
  }

  const stepNumber = STEP_OF_PHASE[phase];

  if (phase === "result") {
    return <ResultScreen answers={answers} onRestart={restart} premiumUntil={user?.premiumUntil} />;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Aujourd'hui", href: "/aujourdhui" }, { label: "Faisons connaissance" }]} />

      <ProgressBar value={(stepNumber / TOTAL_STEPS) * 100} label={`Étape ${stepNumber} sur ${TOTAL_STEPS}`} />

      {phase === "goal" ? (
        <ChoiceStep
          headingRef={headingRef}
          title="Pourquoi apprends-tu le français ?"
          hint="Choisis ce qui compte le plus pour toi. Tu pourras changer plus tard."
          options={GOAL_INTENTS.map((option) => ({
            id: option.id,
            title: option.title,
            description: option.description,
            selected: getIntentForGoal(progress.goalId)?.id === option.id,
            onSelect: () => chooseIntent(option),
          }))}
        />
      ) : null}

      {phase === "subgoal" && intent?.subGoalIds ? (
        <ChoiceStep
          headingRef={headingRef}
          title="Quel examen ou quelle démarche ?"
          hint="ParcoursFR t'accompagne aujourd'hui jusqu'au niveau B1. Vérifie toujours le niveau exigé auprès des autorités."
          options={intent.subGoalIds.map((goalId) => {
            const goal = getLearningGoalById(goalId);
            return {
              id: goalId,
              title: goal?.title ?? goalId,
              description: goal?.description ?? "",
              selected: progress.goalId === goalId,
              onSelect: () => chooseSubGoal(goalId),
            };
          })}
          onBack={() => setPhase("goal")}
        />
      ) : null}

      {phase === "time" ? (
        <ChoiceStep
          headingRef={headingRef}
          title="Combien de temps as-tu par jour ?"
          hint="Ta séance du jour sera adaptée à ce temps. Tu pourras le modifier dans ton compte."
          options={DAILY_MINUTES_OPTIONS.map((minutes) => ({
            id: String(minutes),
            title: `${minutes} minutes`,
            description: DAILY_MINUTES_DESCRIPTIONS[minutes],
            selected: hasChosenDailyMinutes(progress) && getDailyMinutes(progress) === minutes,
            onSelect: () => chooseMinutes(minutes),
          }))}
          onBack={() => setPhase(intent?.subGoalIds ? "subgoal" : "goal")}
        />
      ) : null}

      {phase === "questions" && question ? (
        <div className="space-y-5">
          <header>
            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-foreground outline-none">
              Ton test de niveau
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Question {step + 1} sur {PLACEMENT_QUESTIONS.length}. Réponds sans chercher : c&apos;est une
              estimation, pas un examen officiel.
            </p>
          </header>

          <fieldset className="rounded-2xl border border-border bg-card p-5">
            <legend className="px-1 text-base font-medium text-foreground">{question.prompt}</legend>
            <div className="mt-3 space-y-2">
              {question.choices.map((choice) => (
                <label
                  key={choice.id}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors",
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
            className={cn(buttonClasses("primary", "lg"), "w-full disabled:opacity-50 sm:w-auto")}
          >
            {isLastQuestion ? "Voir mon résultat" : "Question suivante"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

interface ChoiceOption {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Une question d'onboarding : de grandes cibles tactiles, un seul geste pour
 * choisir ET avancer (pas de bouton « Suivant » en plus). Groupe de boutons
 * avec `aria-pressed` pour signaler le choix déjà enregistré.
 */
function ChoiceStep({
  headingRef,
  title,
  hint,
  options,
  onBack,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  title: string;
  hint: string;
  options: ChoiceOption[];
  onBack?: () => void;
}) {
  return (
    <section aria-labelledby="onboarding-step-title" className="space-y-5">
      <header>
        <h1
          id="onboarding-step-title"
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold leading-tight text-foreground outline-none sm:text-3xl"
        >
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      </header>
      <ul className="space-y-3">
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={option.onSelect}
              aria-pressed={option.selected}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border bg-card px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                option.selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted"
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-foreground">{option.title}</span>
                {option.description ? (
                  <span className="mt-0.5 block text-sm text-muted-foreground">{option.description}</span>
                ) : null}
              </span>
              {option.selected ? (
                <CheckIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>
      {onBack ? (
        <button type="button" onClick={onBack} className="text-sm font-medium text-muted-foreground hover:underline">
          ← Retour
        </button>
      ) : null}
    </section>
  );
}

/**
 * Résultat : niveau, forces, points à renforcer, objectif et rythme — puis
 * la première séance, prête, avec UNE action. Le score global reste
 * disponible mais secondaire.
 */
function ResultScreen({
  answers,
  onRestart,
  premiumUntil,
}: {
  answers: PlacementAnswer[];
  onRestart: () => void;
  premiumUntil: string | null | undefined;
}) {
  const { progress } = useProgress();
  const result = computePlacementResult(PLACEMENT_QUESTIONS, answers);
  const goal = progress.goalId ? getLearningGoalById(progress.goalId) : undefined;
  const dailyMinutes = getDailyMinutes(progress);
  const isAccessible = (mod: PublicModule) => canAccess({ kind: "module", slug: mod.slug }, premiumUntil);
  const today = getTodayOverview(progress, PUBLIC_MODULES, isAccessible);
  const firstSession = today.plan;
  const isAboveB1 = result.estimatedLevel === "B2";
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Breadcrumbs items={[{ label: "Aujourd'hui", href: "/aujourdhui" }, { label: "Ton résultat" }]} />
      <ProgressBar value={100} label={`Étape ${TOTAL_STEPS} sur ${TOTAL_STEPS}`} />

      <section aria-labelledby="result-title" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-muted-foreground">Ton niveau estimé</p>
        <div className="mt-1 flex items-center gap-3">
          <h1 id="result-title" ref={headingRef} tabIndex={-1} className="text-4xl font-bold text-foreground outline-none">
            {result.estimatedLevel}
          </h1>
          <LevelBadge level={result.estimatedLevel} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {result.globalScore} % de bonnes réponses. C&apos;est une estimation, pas une certification officielle.
        </p>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-foreground">Tes points forts</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {result.strengths.length > 0
                ? result.strengths.map((domain) => DOMAIN_LABELS[domain]).join(", ")
                : "Pas encore de point fort net : on va les construire."}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">À renforcer</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {result.weaknesses.length > 0
                ? result.weaknesses.map((domain) => DOMAIN_LABELS[domain]).join(", ")
                : "Rien de particulier pour l'instant."}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Ton objectif</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {goal ? goal.title : "Progresser en français"}
              {goal?.note ? <span className="mt-1 block text-xs">{goal.note}</span> : null}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Ton rythme</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{dailyMinutes} min par jour</dd>
          </div>
        </dl>

        {isAboveB1 ? (
          <p className="mt-6 rounded-xl bg-muted p-3 text-sm text-foreground">
            Ton profil semble déjà dépasser le B1. ParcoursFR s&apos;arrête aujourd&apos;hui au niveau B1 : tu
            peux l&apos;utiliser pour consolider tes bases.
          </p>
        ) : null}
      </section>

      {firstSession ? (
        <section aria-labelledby="first-session-title" className="rounded-2xl border border-primary/25 bg-primary/[0.03] p-5 sm:p-8">
          <h2 id="first-session-title" className="text-xl font-bold text-foreground">
            Ta première séance est prête.
          </h2>
          <p className="mt-2 text-base text-foreground">{firstSession.capability}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Environ {firstSession.totalEstimatedMinutes} min · {firstSession.steps.length} étape
            {firstSession.steps.length > 1 ? "s" : ""}
          </p>
          <Link
            href={sessionHref(firstSession)}
            className={cn(buttonClasses("primary", "lg"), "mt-5 h-auto! min-h-12 w-full py-3 text-center sm:w-auto")}
            onClick={() =>
              trackEvent("placement_cta_clicked", {
                placementLevel: result.estimatedLevel,
                firstSession: today.isFirstSession,
              })
            }
          >
            {today.isFirstSession ? "Commencer ma première séance" : "Commencer ma séance"}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <Link href="/aujourdhui" className={cn(buttonClasses("primary", "lg"), "w-full sm:w-auto")}>
          Voir ma séance du jour
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Envie d&apos;un bilan plus précis, compétence par compétence ?{" "}
          <Link href="/diagnostic" className="font-medium text-primary hover:underline">
            Faire le bilan approfondi
          </Link>{" "}
          (plus long, facultatif).
        </p>
        <button type="button" onClick={onRestart} className="font-medium text-muted-foreground underline-offset-2 hover:underline">
          Refaire le test
        </button>
      </div>
    </div>
  );
}

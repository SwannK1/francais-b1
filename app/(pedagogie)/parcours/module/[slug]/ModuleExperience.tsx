"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckIcon } from "@/components/ui/icons";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { cn } from "@/lib/cn";
import { getStageById } from "@/lib/pedagogy/data/parcours-stages";
import { countModuleExercises, findExerciseInModule } from "@/lib/pedagogy/logic/module-structure";
import { getModuleCompletionRate, getModuleProgress } from "@/lib/pedagogy/logic/progress";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { trackEvent } from "@/lib/analytics/client";
import type { Lesson, LessonStepType, Module, VocabularyCategory } from "@/lib/pedagogy/types";

const VOCAB_CATEGORY_LABELS: Record<VocabularyCategory, string> = {
  principal: "Vocabulaire principal",
  expression: "Expressions utiles",
  verbe: "Verbes utiles",
  connecteur: "Connecteurs utiles",
};

const VOCAB_CATEGORY_ORDER: VocabularyCategory[] = ["principal", "expression", "verbe", "connecteur"];

const LESSON_STEP_LABELS: Record<LessonStepType, string> = {
  decouvrir: "Découvrir",
  comprendre: "Comprendre",
  ecoute: "Écouter",
  entrainement: "S'entraîner",
  ecriture: "Produire",
  evaluation: "Valider",
};

type Step =
  | { kind: "situation" }
  | { kind: "vocabulary" }
  | { kind: "lesson"; lesson: Lesson };

/** Référence stable pour éviter de recréer un tableau vide à chaque rendu (dépendance de useEffect). */
const EMPTY_LESSON_IDS: string[] = [];

function buildSteps(mod: Module): Step[] {
  const steps: Step[] = [];
  if (mod.situation) steps.push({ kind: "situation" });
  if (mod.vocabulary && mod.vocabulary.length > 0) steps.push({ kind: "vocabulary" });
  for (const lesson of mod.lessons) steps.push({ kind: "lesson", lesson });
  return steps;
}

function stepTitle(step: Step): string {
  if (step.kind === "situation") return "Découvrir";
  if (step.kind === "vocabulary") return "Vocabulaire";
  return LESSON_STEP_LABELS[step.lesson.type];
}

/** Reprend au premier pas non terminé si l'apprenant a déjà commencé, sinon débute au début. */
function getInitialStepIndex(steps: Step[], completedLessonIds: string[]): number {
  if (completedLessonIds.length === 0) return 0;
  const index = steps.findIndex(
    (step) => step.kind === "lesson" && !completedLessonIds.includes(step.lesson.id)
  );
  return index === -1 ? steps.length - 1 : index;
}

export default function ModuleExperience({ mod }: { mod: Module }) {
  const { progress, recordResult } = useProgress();

  const moduleProgress = getModuleProgress(progress, mod.id);
  const completionRate = getModuleCompletionRate(progress, mod.id, countModuleExercises(mod));
  const completedLessonIds = moduleProgress?.completedLessonIds ?? EMPTY_LESSON_IDS;
  const stage = getStageById(mod.stageId);
  const backHref = stage ? `/parcours/${stage.slug}` : "/parcours";
  const backLabel = stage ? `← Retour à l'étape « ${stage.title} »` : "← Retour au parcours";

  const steps = useMemo(() => buildSteps(mod), [mod]);
  const [stepIndex, setStepIndex] = useState(() => getInitialStepIndex(steps, completedLessonIds));
  const step = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  // `useProgress` rend d'abord le snapshot serveur (vide, donc `completedLessonIds`
  // vaut celui du seed initial) avant de se resynchroniser sur le vrai
  // localStorage juste après hydratation, dans un rendu ultérieur — l'initialiseur
  // paresseux de `stepIndex` ci-dessus peut donc démarrer sur une progression
  // périmée. On recalcule le pas de départ à chaque fois que `completedLessonIds`
  // change (donc aussi quand cette resynchronisation arrive), mais on s'arrête dès
  // que l'apprenant navigue manuellement, pour ne jamais écraser son choix.
  const hasUserNavigated = useRef(false);
  useEffect(() => {
    if (hasUserNavigated.current) return;
    setStepIndex(getInitialStepIndex(steps, completedLessonIds));
  }, [steps, completedLessonIds]);

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  // `module_started` : une fois par module réellement ouvert (pas à chaque
  // rerender). `trackedLessonIdsRef` est réinitialisé quand le module change,
  // pour que `lesson_started` puisse à nouveau se déclencher sur un nouveau module.
  const trackedModuleIdRef = useRef<string | null>(null);
  const trackedLessonIdsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (trackedModuleIdRef.current === mod.id) return;
    trackedModuleIdRef.current = mod.id;
    trackedLessonIdsRef.current = new Set();
    trackEvent("module_started", { moduleId: mod.id });
  }, [mod.id]);

  // `lesson_started` : une fois par leçon réellement atteinte dans cette visite du module.
  useEffect(() => {
    if (step.kind !== "lesson") return;
    if (trackedLessonIdsRef.current.has(step.lesson.id)) return;
    trackedLessonIdsRef.current.add(step.lesson.id);
    trackEvent("lesson_started", { moduleId: mod.id, lessonId: step.lesson.id });
  }, [step, mod.id]);

  // `module_completed` : uniquement sur la transition réelle vers "terminé"
  // (dérivée de la vraie logique métier dans `logic/progress.ts`), jamais au
  // premier rendu d'un module déjà terminé lors d'une session précédente.
  const prevModuleCompletionRef = useRef<{ moduleId: string; completed: boolean } | null>(null);
  useEffect(() => {
    const isCompleted = moduleProgress?.completed ?? false;
    const prev = prevModuleCompletionRef.current;
    if (prev && prev.moduleId === mod.id && isCompleted && !prev.completed) {
      trackEvent("module_completed", { moduleId: mod.id });
    }
    prevModuleCompletionRef.current = { moduleId: mod.id, completed: isCompleted };
  }, [mod.id, moduleProgress?.completed]);

  function handleExerciseCompleted(exerciseId: string, correct: boolean) {
    const exercise = findExerciseInModule(mod, exerciseId);
    if (!exercise) return;
    recordResult(mod, exercise, correct);
    trackEvent("exercise_completed", { moduleId: mod.id });
  }

  function goTo(index: number) {
    hasUserNavigated.current = true;
    setStepIndex(Math.min(Math.max(index, 0), steps.length - 1));
  }

  return (
    <div className="space-y-6">
      <Link href={backHref} className="text-sm font-medium text-primary hover:underline">
        {backLabel}
      </Link>

      <header>
        <LevelBadge level={mod.level} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">{mod.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{mod.description}</p>
        <ProgressBar value={completionRate} label="Progression du module" className="mt-4" />
      </header>

      <nav aria-label="Étapes du module">
        <ol className="flex flex-wrap gap-2">
          {steps.map((s, index) => {
            const isCurrent = index === stepIndex;
            const isDone =
              s.kind === "lesson" ? completedLessonIds.includes(s.lesson.id) : index < stepIndex;

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
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
                  {stepTitle(s)}
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
          {stepIndex + 1}. {stepTitle(step)}
        </h2>

        <div className="mt-4 space-y-4">
          {step.kind === "situation" ? (
            <Card>
              <p className="text-sm text-muted-foreground">{mod.situation}</p>
              {mod.examLinks && mod.examLinks.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mod.examLinks.map((link) => (
                    <Badge key={link} variant="secondary">
                      {link}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </Card>
          ) : null}

          {step.kind === "vocabulary" ? (
            <Card>
              {VOCAB_CATEGORY_ORDER.map((category) => {
                const entries = mod.vocabulary?.filter((entry) => entry.category === category) ?? [];
                if (entries.length === 0) return null;
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {VOCAB_CATEGORY_LABELS[category]}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {entries.map((entry) => (
                        <Badge key={entry.term} variant="neutral">
                          {entry.term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Card>
          ) : null}

          {step.kind === "lesson" ? (
            <>
              {step.lesson.type === "comprendre" && mod.languagePoints && mod.languagePoints.length > 0 ? (
                <div className="space-y-3">
                  {mod.languagePoints.map((point) => (
                    <Card key={point.title}>
                      <p className="text-sm font-medium text-foreground">{point.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{point.explanation}</p>
                    </Card>
                  ))}
                </div>
              ) : null}

              {step.lesson.type === "evaluation" && mod.miniEvaluationThreshold ? (
                <p className="text-sm text-muted-foreground">
                  Validation du module : {mod.miniEvaluationThreshold}/10 bonnes réponses minimum.
                </p>
              ) : null}

              {step.lesson.activities.map((activity) => (
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
              ))}
            </>
          ) : null}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => goTo(stepIndex - 1)}
          disabled={isFirstStep}
          className={cn(buttonClasses("secondary", "md"), "disabled:opacity-40")}
        >
          ← Précédent
        </button>

        {!isLastStep ? (
          <button type="button" onClick={() => goTo(stepIndex + 1)} className={buttonClasses("primary", "md")}>
            Suivant →
          </button>
        ) : (
          <Link href="/progression" className={buttonClasses("primary", "md")}>
            Voir ma progression
          </Link>
        )}
      </div>
    </div>
  );
}

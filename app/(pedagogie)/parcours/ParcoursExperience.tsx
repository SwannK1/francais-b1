"use client";

import Link from "next/link";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import { ArrowRightIcon, CheckIcon, ExamIcon, FlagIcon, SunIcon } from "@/components/ui/icons";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { getTodayOverview } from "@/lib/daily/today";
import {
  getEffectiveLevel,
  getParcoursSummary,
  getStageCompletionRate,
  getStageStatus,
  levelOfStage,
  type StageStatus,
} from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { cn } from "@/lib/cn";
import ViewTracker from "@/lib/analytics/ViewTracker";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import type { CEFRLevel, PublicModule } from "@/lib/pedagogy/types";

function stageHref(stage: ParcoursStage): string {
  switch (stage.kind) {
    case "diagnostic":
      return "/test-niveau";
    case "practice":
      return "/parcours/examens";
    case "bilan":
      return "/progression";
    default:
      return `/parcours/${stage.slug}`;
  }
}

const LEVEL_TITLES: Record<CEFRLevel, string> = {
  A1: "A1 · Premiers pas",
  A2: "A2 · Se débrouiller au quotidien",
  B1: "B1 · Devenir autonome",
  B2: "B2",
};

const NEXT_LEVEL: Partial<Record<CEFRLevel, CEFRLevel>> = { A1: "A2", A2: "B1" };

/**
 * `/parcours` = la carte du chemin A1 → A2 → B1 (les étapes de
 * `PARCOURS_STAGES`, colonne vertébrale inchangée) : où j'en suis, ce qui est
 * fait, ce qui vient. La séance du jour n'est plus ici qu'un rappel d'une
 * ligne vers `/aujourdhui`, qui en est le vrai point d'entrée.
 *
 * Reçoit `publicModules` (métadonnées de navigation, jamais le contenu
 * détaillé des exercices) depuis le Server Component `page.tsx` — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export default function ParcoursExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const stages = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);
  const goal = progress.goalId ? getLearningGoalById(progress.goalId) : undefined;
  const effectiveLevel = getEffectiveLevel(progress, publicModules);
  const summary = getParcoursSummary(progress, publicModules);
  const isAccessible = (mod: PublicModule) => canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
  const today = getTodayOverview(progress, publicModules, isAccessible);
  const nextLevel = NEXT_LEVEL[effectiveLevel];

  const levels: CEFRLevel[] = ["A1", "A2", "B1"];
  const stagesByLevel = levels.map((level) => ({
    level,
    stages: stages.filter((stage) => levelOfStage(stage) === level),
  }));

  return (
    <div className="space-y-8">
      <ViewTracker event="journey_viewed" />
      <header className="max-w-2xl">
        <LevelBadge level={effectiveLevel} />
        <h1 className="mt-3 text-3xl font-bold text-foreground">Ton parcours</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Tu es au niveau <strong className="text-foreground">{effectiveLevel}</strong>
          {nextLevel ? <>, en route vers le {nextLevel}</> : null}.
          {goal ? (
            <>
              {" "}
              Objectif : <strong className="text-foreground">{goal.title}</strong>.
            </>
          ) : null}
        </p>
      </header>

      {today.plan || today.lockedPlan ? (
        <Link
          href="/aujourdhui"
          className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/[0.04] px-4 py-3 transition-colors hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SunIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span className="min-w-0 flex-1 text-sm">
            <span className="font-semibold text-foreground">Aujourd&apos;hui : </span>
            <span className="text-muted-foreground">{(today.plan ?? today.lockedPlan)!.capability}</span>
          </span>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        </Link>
      ) : null}

      <div className="space-y-4">
        {stagesByLevel.map(({ level, stages: levelStages }) => {
          const statuses = levelStages.map((stage) => getStageStatus(stage, progress, publicModules));
          const contentStages = levelStages.filter((stage) => stage.kind === "content");
          const doneContent = contentStages.filter(
            (stage) => getStageStatus(stage, progress, publicModules) === "termine"
          ).length;
          const isCurrentLevel = level === effectiveLevel;
          const levelDone = contentStages.length > 0 && doneContent === contentStages.length;
          const levelLabel = levelDone ? "Terminé" : isCurrentLevel ? "En cours" : "À venir";

          return (
            <details
              key={level}
              open={isCurrentLevel}
              className={cn(
                "group rounded-2xl border bg-card",
                isCurrentLevel ? "border-primary/30 shadow-sm" : "border-border"
              )}
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-lg font-bold text-foreground">{LEVEL_TITLES[level]}</span>
                  <span className="block text-sm text-muted-foreground">
                    {levelLabel} · {doneContent}/{contentStages.length} étapes terminées
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>

              <ol className="relative px-4 pb-5 sm:px-6">
                {levelStages.map((stage, index) => {
                  const status = statuses[index];
                  const isCurrent = summary.currentStage?.id === stage.id;
                  const rate = stage.kind === "content" ? getStageCompletionRate(stage, progress, publicModules) : null;
                  return (
                    <li key={stage.id} className="relative flex gap-4 pb-4 last:pb-0">
                      {index < levelStages.length - 1 ? (
                        <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-border" />
                      ) : null}
                      <StageMarker status={status} isCurrent={isCurrent} kind={stage.kind} />
                      <Link
                        href={stageHref(stage)}
                        className={cn(
                          "min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isCurrent && "bg-primary/[0.05]"
                        )}
                      >
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <span className="text-sm font-semibold text-foreground">{stage.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {isCurrent ? "Étape actuelle" : STATUS_TEXT[status]}
                            {rate !== null && rate > 0 && rate < 100 ? ` · ${rate} %` : ""}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">{stage.objective}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </details>
          );
        })}
      </div>

      <section aria-labelledby="explore-title" className="border-t border-border pt-6">
        <h2 id="explore-title" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Explorer librement
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {[
            { href: "/parcours/evaluations", label: "Évaluations de passage", Icon: FlagIcon },
            { href: "/parcours/examens", label: "Examens blancs", Icon: ExamIcon },
            { href: "/pratiquer#situations", label: "Situations de la vie réelle", Icon: SunIcon },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const STATUS_TEXT: Record<StageStatus, string> = {
  termine: "Terminée",
  en_cours: "En cours",
  a_commencer: "À venir",
};

function StageMarker({
  status,
  isCurrent,
  kind,
}: {
  status: StageStatus;
  isCurrent: boolean;
  kind: ParcoursStage["kind"];
}) {
  if (status === "termine") {
    return (
      <span className="relative z-10 mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
        <CheckIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-card",
        isCurrent ? "border-primary" : status === "en_cours" ? "border-primary/50" : "border-border"
      )}
    >
      {isCurrent ? <span className="h-3 w-3 rounded-full bg-primary" /> : null}
      {!isCurrent && kind !== "content" ? <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" /> : null}
    </span>
  );
}

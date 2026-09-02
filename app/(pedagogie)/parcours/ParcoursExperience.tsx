"use client";

import LevelBadge from "@/components/pedagogy/LevelBadge";
import StageCard from "@/components/pedagogy/StageCard";
import DailySessionCard from "@/components/pedagogy/DailySessionCard";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { computeDailySession } from "@/lib/pedagogy/logic/recommendation";
import { getStageCompletionRate, getStageStatus } from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import type { PublicModule } from "@/lib/pedagogy/types";

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

/**
 * Reçoit `publicModules` (métadonnées de navigation, jamais le contenu
 * détaillé des exercices) depuis le Server Component `page.tsx` — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export default function ParcoursExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const stages = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);
  const goal = progress.goalId ? getLearningGoalById(progress.goalId) : undefined;
  const dailySession = computeDailySession(progress, publicModules);
  const dailySessionModule = dailySession
    ? publicModules.find((m) => m.id === dailySession.moduleId)
    : undefined;
  const dailySessionLocked = dailySessionModule
    ? !canAccess({ kind: "module", slug: dailySessionModule.slug }, user?.premiumUntil)
    : false;

  return (
    <div>
      <header>
        <LevelBadge level={progress.level} />
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">Ton parcours B1</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Un chemin en {stages.length} étapes pour être prêt·e pour un examen de niveau B1.
          {goal ? (
            <>
              {" "}
              Objectif : <strong className="text-foreground">{goal.title}</strong>.
            </>
          ) : null}
        </p>
      </header>

      {dailySession && dailySessionModule ? (
        <section aria-labelledby="daily-session-title" className="mt-8">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Séance du jour
          </h2>
          <DailySessionCard
            session={dailySession}
            href={dailySessionLocked ? "/offre" : `/parcours/module/${dailySessionModule.slug}`}
            locked={dailySessionLocked}
          />
        </section>
      ) : null}

      <section aria-labelledby="stages-title" className="mt-8">
        <h2 id="stages-title" className="mb-3 text-lg font-semibold text-foreground">
          Les étapes
        </h2>
        <div className="space-y-4">
          {stages.map((stage) => {
            const status = getStageStatus(stage, progress, publicModules);
            const completionRate = getStageCompletionRate(stage, progress, publicModules);
            return (
              <StageCard
                key={stage.id}
                stage={stage}
                status={status}
                completionRate={completionRate}
                href={stageHref(stage)}
                showProgress={stage.kind === "diagnostic" || stage.kind === "content"}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import StageCard from "@/components/pedagogy/StageCard";
import DailySessionCard from "@/components/pedagogy/DailySessionCard";
import ResumeCard from "@/components/pedagogy/ResumeCard";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { computeDailySession, getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { getStageCompletionRate, getStageStatus } from "@/lib/pedagogy/logic/parcours";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
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

  const isAccessible = (mod: PublicModule) =>
    canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);

  // `resumeTarget` : jamais un module verrouillé, `getNextModule` les
  // ignore déjà (voir `logic/recommendation.ts`). S'il vaut `null` alors
  // qu'un module existe encore objectivement (`rawTarget`), c'est que tout
  // ce qu'il reste est verrouillé — un cas distinct de "plus rien à faire"
  // (fallback propre : deux messages différents, jamais un lien mort).
  const resumeTarget = getNextModule(progress, publicModules, { isAccessible });
  const rawTarget = resumeTarget ? null : getNextModule(progress, publicModules);

  const dailySession = computeDailySession(progress, publicModules);
  const dailySessionModule = dailySession
    ? publicModules.find((m) => m.id === dailySession.moduleId)
    : undefined;
  const dailySessionLocked = dailySessionModule ? !isAccessible(dailySessionModule) : false;
  // Éviter d'afficher deux cartes redondantes ("Reprendre" et "Séance du
  // jour") pointant vers le même module : la séance du jour n'apporte alors
  // rien de plus, elle est masquée plutôt que dupliquée.
  const showDailySession =
    dailySession && dailySessionModule && dailySessionModule.id !== resumeTarget?.module.id;

  const reviewItemsCount = getReviewItems(progress, publicModules).length;

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
        {reviewItemsCount > 0 ? (
          <p className="mt-3 text-sm text-foreground">
            {reviewItemsCount} élément{reviewItemsCount > 1 ? "s" : ""} à réviser —{" "}
            <Link href="/reviser" className="font-semibold text-primary hover:underline">
              voir la révision
            </Link>
          </p>
        ) : null}
      </header>

      {resumeTarget ? (
        <section aria-labelledby="resume-title" className="mt-8">
          <h2 id="resume-title" className="mb-3 text-lg font-semibold text-foreground">
            {resumeTarget.isResuming ? "Reprendre" : "Prochaine étape"}
          </h2>
          <ResumeCard
            target={resumeTarget}
            completionRate={getModuleCompletionRate(progress, resumeTarget.module.id, resumeTarget.module.totalExercises)}
            href={`/parcours/module/${resumeTarget.module.slug}`}
          />
        </section>
      ) : rawTarget ? (
        <section aria-labelledby="resume-title" className="mt-8">
          <h2 id="resume-title" className="mb-3 text-lg font-semibold text-foreground">
            {rawTarget.isResuming ? "Reprendre" : "Prochaine étape"}
          </h2>
          <ResumeCard
            target={rawTarget}
            completionRate={getModuleCompletionRate(progress, rawTarget.module.id, rawTarget.module.totalExercises)}
            href="/offre"
            locked
          />
        </section>
      ) : null}

      {showDailySession ? (
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

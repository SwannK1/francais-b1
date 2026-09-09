"use client";

import Link from "next/link";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import StageCard from "@/components/pedagogy/StageCard";
import GuidedSessionCard from "@/components/pedagogy/GuidedSessionCard";
import ResumeCard from "@/components/pedagogy/ResumeCard";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { buildDailySession } from "@/lib/daily/session-engine";
import { getEffectiveLevel, getStageCompletionRate, getStageStatus } from "@/lib/pedagogy/logic/parcours";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import ViewTracker from "@/lib/analytics/ViewTracker";
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
  // "Où en suis-je maintenant" (niveau effectif), pas seulement le dernier
  // résultat du test de positionnement — voir `getEffectiveLevel`.
  const effectiveLevel = getEffectiveLevel(progress, publicModules);

  const isAccessible = (mod: PublicModule) =>
    canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);

  // `resumeTarget` : jamais un module verrouillé, `getNextModule` les
  // ignore déjà (voir `logic/recommendation.ts`). S'il vaut `null` alors
  // qu'un module existe encore objectivement (`rawTarget`), c'est que tout
  // ce qu'il reste est verrouillé — un cas distinct de "plus rien à faire"
  // (fallback propre : deux messages différents, jamais un lien mort).
  const resumeTarget = getNextModule(progress, publicModules, { isAccessible });
  const rawTarget = resumeTarget ? null : getNextModule(progress, publicModules);

  // Séance guidée du jour (`lib/daily/`) : chantier indépendant du
  // diagnostic et du moteur de révision espacée, qui construit une vraie
  // séance à plusieurs étapes (jamais une simple carte-lien vers un
  // module). Contrairement à l'ancienne carte "Séance du jour" (un simple
  // lien, redondant avec "Reprendre" quand elle pointait vers le même
  // module — d'où la déduplication historique), celle-ci affiche toujours
  // une information supplémentaire réelle (durée, nombre d'étapes, contenu
  // détaillé) même quand elle cible le même module que "Reprendre" : elle
  // n'est donc jamais masquée pour éviter un doublon. Même précaution que
  // `resumeTarget`/`rawTarget` ci-dessus pour le verrouillage :
  // `guidedSession` ignore les modules verrouillés, `rawGuidedSession` sert
  // uniquement à distinguer "rien à faire" de "tout est verrouillé".
  const guidedSession = buildDailySession(progress, publicModules, { isAccessible });
  const rawGuidedSession = guidedSession ? null : buildDailySession(progress, publicModules);
  const showGuidedSession = Boolean(guidedSession || rawGuidedSession);

  const reviewItemsCount = getReviewItems(progress, publicModules).length;

  return (
    <div>
      <ViewTracker event="journey_viewed" />
      <header>
        <LevelBadge level={effectiveLevel} />
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">Ton parcours {effectiveLevel}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Un chemin en {stages.length} étapes, de A1 à B1, pour progresser vers plus d&apos;autonomie en français.
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

      {showGuidedSession ? (
        <section aria-labelledby="daily-session-title" className="mt-8">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Séance du jour
          </h2>
          <GuidedSessionCard
            plan={guidedSession ?? rawGuidedSession!}
            href={guidedSession ? `/parcours/seance?module=${guidedSession.moduleSlug}` : "/offre"}
            locked={!guidedSession}
          />
        </section>
      ) : null}

      {/*
        Section purement additive : liens vers les zones "Expression orale"
        (lib/speaking/) et "Évaluations de passage" (lib/assessment/), toutes
        deux volontairement indépendantes du diagnostic/de la révision
        espacée/de la séance du jour ci-dessus — aucune des fonctions
        (getStageStatus, computeDailySession, getReviewItems...) qui
        alimentent le reste de cette page n'est utilisée ici.
      */}
      <section aria-labelledby="extra-practice-title" className="mt-8">
        <h2 id="extra-practice-title" className="mb-3 text-lg font-semibold text-foreground">
          Entraînement complémentaire
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/oral"
            className="block rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
          >
            <p className="font-semibold text-foreground">Expression orale</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Répétition, lecture, mini-réponses et mises en situation, avec auto-évaluation guidée.
            </p>
          </Link>
          <Link
            href="/parcours/evaluations"
            className="block rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
          >
            <p className="font-semibold text-foreground">Évaluations de passage</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bilans de fin A1/A2 et passages A1 → A2, A2 → B1, avec résultat détaillé par compétence.
            </p>
          </Link>
        </div>
      </section>

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

"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon } from "@/components/ui/icons";
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
import { getSkillReviewRecommendations } from "@/lib/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { cn } from "@/lib/cn";
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

  // Séance guidée du jour (`lib/daily/`) : point d'entrée PRINCIPAL de cette
  // page (section "Aujourd'hui" ci-dessous), jamais affichée à côté d'une
  // seconde recommandation concurrente — elle construit une vraie séance à
  // plusieurs étapes (durée, contenu détaillé), strictement plus informative
  // qu'un simple lien "prochain module". `guidedSession` ignore les modules
  // verrouillés ; `rawGuidedSession` sert uniquement à distinguer "rien à
  // faire aujourd'hui" de "tout est verrouillé" (offre complète) — jamais
  // affichés tous les deux à la fois.
  const guidedSession = buildDailySession(progress, publicModules, { isAccessible });
  const rawGuidedSession = guidedSession ? null : buildDailySession(progress, publicModules);
  const sessionModule = guidedSession
    ? publicModules.find((mod) => mod.id === guidedSession.moduleId)
    : undefined;
  const sessionCompletionRate = sessionModule
    ? getModuleCompletionRate(progress, sessionModule.id, sessionModule.totalExercises)
    : undefined;

  // Repli vers l'ancienne recommandation "prochain module", uniquement pour
  // le cas — distinct — où le moteur de séance ne peut rien construire (ex.
  // module sans leçon exploitable) alors qu'il reste objectivement un
  // prochain module : jamais affiché en plus de la séance guidée, seulement
  // à sa place, pour ne jamais laisser "Aujourd'hui" vide.
  const hasGuidedSessionOutcome = Boolean(guidedSession || rawGuidedSession);
  const resumeTarget = hasGuidedSessionOutcome
    ? null
    : getNextModule(progress, publicModules, { isAccessible });
  const rawTarget = hasGuidedSessionOutcome || resumeTarget
    ? null
    : getNextModule(progress, publicModules);

  // Même décompte que /reviser (voir ReviserExperience) : modules marqués à
  // revoir + épreuves sous le seuil (legacy `getReviewItems`) et compétences
  // signalées par le moteur de révision espacée (`lib/review`) — jamais un
  // second calcul divergent qui promettrait "N points" ici pour afficher
  // "rien à réviser" une fois sur /reviser.
  const legacyReviewItems = getReviewItems(progress, publicModules).filter(
    (item) => item.kind === "module_flagged" || item.kind === "exam_section"
  );
  const skillReviewCount = getSkillReviewRecommendations(progress, publicModules).length;
  const reviewCount = legacyReviewItems.length + skillReviewCount;

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
      </header>

      {/*
        1. Aujourd'hui — point d'entrée PRINCIPAL de la page : une seule
        recommandation à la fois (séance guidée si le moteur peut en
        construire une, sinon repli sur le prochain module, sinon état "rien
        à faire" honnête), jamais deux cartes concurrentes pour la même
        action — voir le calcul de `guidedSession`/`resumeTarget` ci-dessus.
      */}
      <section aria-labelledby="today-title" className="mt-8">
        <h2 id="today-title" className="mb-3 text-lg font-semibold text-foreground">
          Aujourd&apos;hui
        </h2>
        {guidedSession || rawGuidedSession ? (
          <GuidedSessionCard
            plan={guidedSession ?? rawGuidedSession!}
            href={guidedSession ? `/parcours/seance?module=${guidedSession.moduleSlug}` : "/offre"}
            locked={!guidedSession}
            prominent
            completionRate={sessionCompletionRate}
          />
        ) : resumeTarget ? (
          <ResumeCard
            target={resumeTarget}
            completionRate={getModuleCompletionRate(progress, resumeTarget.module.id, resumeTarget.module.totalExercises)}
            href={`/parcours/module/${resumeTarget.module.slug}`}
          />
        ) : rawTarget ? (
          <ResumeCard
            target={rawTarget}
            completionRate={getModuleCompletionRate(progress, rawTarget.module.id, rawTarget.module.totalExercises)}
            href="/offre"
            locked
          />
        ) : (
          <Card>
            <p className="text-sm font-semibold text-foreground">
              Bravo, il n&apos;y a plus de nouveau module à ton niveau pour le moment !
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Consulte ta progression, ou entraîne-toi librement en attendant la suite.
            </p>
            <Link href="/progression" className={cn(buttonClasses("primary", "md"), "mt-4 gap-1.5")}>
              Voir ma progression
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Card>
        )}
      </section>

      {/*
        2. À revoir — secondaire par construction : un simple bandeau-lien,
        jamais un `<Card>` de même poids visuel que le bloc "Aujourd'hui" au-dessus.
      */}
      {reviewCount > 0 ? (
        <section aria-labelledby="review-title" className="mt-4">
          <h2 id="review-title" className="sr-only">
            À revoir
          </h2>
          <Link
            href="/reviser"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>
              <span className="font-semibold text-foreground">À revoir</span>{" "}
              <span className="text-muted-foreground">
                — {reviewCount} point{reviewCount > 1 ? "s" : ""}{" "}
                {reviewCount > 1 ? "méritent" : "mérite"} une nouvelle tentative
              </span>
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        </section>
      ) : null}

      {/*
        3. Explorer librement — tertiaire : parcours par étapes, oral,
        évaluations. Toujours accessible, jamais mis en avant visuellement
        autant que "Aujourd'hui" ci-dessus (titre de section plus discret).
      */}
      <section aria-labelledby="explore-title" className="mt-10 border-t border-border pt-8">
        <h2 id="explore-title" className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Explorer librement
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

        <div className="mt-6 space-y-4">
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

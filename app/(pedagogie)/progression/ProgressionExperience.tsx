"use client";

import Link from "next/link";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import LearningStateBadge from "@/components/pedagogy/LearningStateBadge";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { getTodayOverview } from "@/lib/daily/today";
import { LIFE_SITUATIONS } from "@/lib/pedagogy/data/life-situations";
import { SKILLS_ORAL } from "@/lib/pedagogy/data/skills-oral";
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";
import { getModuleLearningState, getSkillLearningState } from "@/lib/pedagogy/logic/learning-states";
import { getEffectiveLevel, getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { summarizeSituation } from "@/lib/pedagogy/logic/situations";
import { buildReviewHistory, buildReviewRecommendations } from "@/lib/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import type { CEFRLevel, PublicModule } from "@/lib/pedagogy/types";

const NEXT_LEVEL: Partial<Record<CEFRLevel, CEFRLevel>> = { A1: "A2", A2: "B1" };
/** Au-delà, la liste « Je peux… » devient un inventaire : on montre les plus récents, le reste sur demande. */
const MAX_CAN_DO = 8;

/** « Expliquer un problème » → « expliquer un problème » (après « Je peux… »). */
function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/**
 * Progression — répond à trois questions : qu'est-ce que je sais faire,
 * qu'est-ce qui reste fragile, quelle est ma prochaine étape. Aucun nouveau
 * calcul de maîtrise : les états viennent du moteur de révision (`lib/review`)
 * pour les compétences, du cycle de vie des modules pour les capacités, et
 * des situations de vie (`data/life-situations.ts`) pour la lecture par
 * situation. La grille de modules a quitté cette page (elle vit dans les
 * étapes de `/parcours`).
 *
 * Reçoit `publicModules` (métadonnées de navigation, jamais le contenu
 * détaillé des exercices) depuis le Server Component `page.tsx` — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export default function ProgressionExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const { log: speakingLog } = useSpeakingPractice();
  const hasProgress = Boolean(progress.lastActivityAt);
  const effectiveLevel = getEffectiveLevel(progress, publicModules);
  const nextLevel = NEXT_LEVEL[effectiveLevel];
  const summary = getParcoursSummary(progress, publicModules);
  const isAccessible = (mod: PublicModule) => canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
  const today = getTodayOverview(progress, publicModules, isAccessible);
  const now = new Date();

  // Capacités acquises : modules terminés, formulés en « je peux… », du
  // plus récemment travaillé au plus ancien.
  const lastActivity = (mod: PublicModule): string =>
    progress.moduleProgress.find((mp) => mp.moduleId === mod.id)?.lastActivityAt ?? "";
  const acquiredModules = publicModules
    .filter((mod) => getModuleLearningState(progress, mod) === "acquis")
    .sort((a, b) => lastActivity(b).localeCompare(lastActivity(a)));

  // Compétences : une seule dérivation par le moteur de révision espacée.
  const reviewHistory = buildReviewHistory(progress, publicModules);
  const recommendations = buildReviewRecommendations(reviewHistory, now);
  const toReview = recommendations.filter((r) => r.priority.band === "haute" || r.priority.band === "a_revoir");
  const toConsolidate = reviewHistory.filter(
    (entry) => entry.domain !== "production_orale" && getSkillLearningState(entry, now) === "a_consolider"
  );

  // Oral : compétences `po-*` travaillées dans les modules, et exercices de
  // la zone Pratiquer (auto-évaluation, jamais une note automatique).
  const oralSkills = SKILLS_ORAL.map((skill) => {
    const entry = reviewHistory.find((e) => e.skillId === skill.id);
    const practicedInPractice = SPEAKING_EXERCISES.filter(
      (exercise) => exercise.skillId === skill.id && speakingLog[exercise.id]
    ).length;
    const state =
      entry && entry.completedExercises > 0
        ? getSkillLearningState(entry, now)
        : practicedInPractice > 0
          ? ("en_cours" as const)
          : ("a_decouvrir" as const);
    return { skill, state, practicedInPractice };
  }).filter((item) => item.state !== "a_decouvrir");
  const practicedOralCount = Object.keys(speakingLog).length;

  const situations = LIFE_SITUATIONS.map((situation) => summarizeSituation(situation, progress, publicModules));
  const nextPlan = today.plan ?? today.lockedPlan;

  return (
    <div className="space-y-10">
      {/* Bloc 1 — Niveau */}
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="text-sm font-semibold text-muted-foreground">Ton niveau</p>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-4xl font-bold text-foreground">{effectiveLevel}</h1>
          <LevelBadge level={effectiveLevel} />
        </div>
        <p className="mt-2 text-base text-foreground">
          {summary.currentStage === null
            ? "Tu as parcouru tout le contenu A1, A2 et B1. Bravo !"
            : nextLevel
              ? `En route vers le ${nextLevel}.`
              : "Tu travailles le niveau B1, le dernier niveau du parcours."}
        </p>
        {summary.currentStage ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Étape actuelle : <strong className="text-foreground">{summary.currentStage.title}</strong>
          </p>
        ) : null}
        {!hasProgress ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Ce que tu sais faire apparaîtra ici après tes premières séances.
          </p>
        ) : null}
      </header>

      {/* Bloc 2 — Capacités acquises */}
      {acquiredModules.length > 0 ? (
        <section aria-labelledby="can-do-title">
          <h2 id="can-do-title" className="text-xl font-bold text-foreground">
            Je peux…
          </h2>
          <ul className="mt-3 space-y-2">
            {acquiredModules.slice(0, MAX_CAN_DO).map((mod) => (
              <li key={mod.id} className="flex items-start gap-3 rounded-xl bg-success/5 px-4 py-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span className="text-sm text-foreground">{lowerFirst(getModuleCapability(mod))}</span>
              </li>
            ))}
          </ul>
          {acquiredModules.length > MAX_CAN_DO ? (
            <details className="mt-2">
              <summary className="cursor-pointer py-2 text-sm font-medium text-primary">
                Voir les {acquiredModules.length - MAX_CAN_DO} autres
              </summary>
              <ul className="mt-2 space-y-2">
                {acquiredModules.slice(MAX_CAN_DO).map((mod) => (
                  <li key={mod.id} className="flex items-start gap-3 px-4 py-1.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    <span className="text-sm text-foreground">{lowerFirst(getModuleCapability(mod))}</span>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </section>
      ) : null}

      {/* Blocs 3 et 4 — À consolider / À revoir */}
      {toConsolidate.length > 0 || toReview.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <section aria-labelledby="consolidate-title">
            <h2 id="consolidate-title" className="text-lg font-bold text-foreground">
              À consolider
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">En bonne voie, encore un peu de pratique.</p>
            {toConsolidate.length > 0 ? (
              <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                {toConsolidate.slice(0, 6).map((entry) => (
                  <li key={entry.skillId} className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm text-foreground">{entry.skillName}</span>
                    <LearningStateBadge state="a_consolider" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Rien pour l&apos;instant.</p>
            )}
          </section>

          <section aria-labelledby="review-title">
            <h2 id="review-title" className="text-lg font-bold text-foreground">
              À revoir
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Des erreurs récentes ou un oubli possible.</p>
            {toReview.length > 0 ? (
              <>
                <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                  {toReview.slice(0, 6).map((recommendation) => (
                    <li key={recommendation.key} className="px-4 py-3">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground">{recommendation.title}</span>
                        <LearningStateBadge state="a_revoir" />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{recommendation.reason}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/reviser" className={cn(buttonClasses("secondary", "md"), "mt-3")}>
                  Réviser maintenant
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Rien à revoir. Continue comme ça !</p>
            )}
          </section>
        </div>
      ) : null}

      {/* Oral — capacités orales (auto-évaluation) */}
      {oralSkills.length > 0 || practicedOralCount > 0 ? (
        <section aria-labelledby="oral-title">
          <h2 id="oral-title" className="text-lg font-bold text-foreground">
            À l&apos;oral
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            D&apos;après tes auto-évaluations dans les séances et dans Pratiquer — pas une note de prononciation.
          </p>
          {oralSkills.length > 0 ? (
            <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
              {oralSkills.map(({ skill, state }) => (
                <li key={skill.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-sm text-foreground">{skill.name}</span>
                  <LearningStateBadge state={state} />
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-3 text-sm text-muted-foreground">
            {practicedOralCount > 0
              ? `${practicedOralCount} exercice${practicedOralCount > 1 ? "s" : ""} pratiqué${practicedOralCount > 1 ? "s" : ""} dans Pratiquer. `
              : ""}
            <Link href="/pratiquer#parler" className="font-semibold text-primary hover:underline">
              Pratiquer l&apos;oral
            </Link>
          </p>
        </section>
      ) : null}

      {/* Bloc 5 — Situations de vie */}
      <section aria-labelledby="situations-title">
        <h2 id="situations-title" className="text-lg font-bold text-foreground">
          Situations de vie
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
          {situations.map((item) => (
            <li key={item.situation.id}>
              <Link
                href={`/pratiquer/situations/${item.situation.id}`}
                className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{item.situation.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {item.acquiredCount} sur {item.modules.length} acquis
                  </span>
                </span>
                <LearningStateBadge state={item.overall} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bloc 6 — Prochaine étape */}
      <section aria-labelledby="next-step-title" className="rounded-2xl border border-primary/25 bg-primary/[0.03] p-5 sm:p-8">
        <h2 id="next-step-title" className="text-sm font-semibold uppercase tracking-wide text-primary">
          Prochaine étape
        </h2>
        {nextPlan ? (
          <>
            <p className="mt-2 text-xl font-bold text-foreground">{nextPlan.capability}</p>
            <p className="mt-1 text-sm text-muted-foreground">Environ {nextPlan.totalEstimatedMinutes} min</p>
          </>
        ) : (
          <p className="mt-2 text-base text-foreground">Entraîne-toi avec un examen blanc pour faire le point.</p>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href={nextPlan ? "/aujourdhui" : "/parcours/examens"} className={buttonClasses("primary", "lg")}>
            {nextPlan ? "Aller à ma séance" : "Voir les examens blancs"}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/diagnostic" className={buttonClasses("secondary", "lg")}>
            Faire un bilan approfondi
          </Link>
        </div>
      </section>
    </div>
  );
}

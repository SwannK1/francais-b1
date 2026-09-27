"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import GuidedSessionCard from "@/components/pedagogy/GuidedSessionCard";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, LockIcon, MicrophoneIcon, TargetIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";
import { getTodayOverview, sessionHref } from "@/lib/daily/today";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { getDailyMinutes } from "@/lib/pedagogy/logic/preferences";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * « Aujourd'hui » — point d'entrée normal d'un apprenant qui revient. Une
 * seule décision à prendre : commencer la séance du jour. Tout le reste
 * (révision, oral, rythme) est volontairement secondaire, en simples liens.
 *
 * Aucun moteur ici : la séance vient de `buildDailySession`
 * (`lib/daily/session-engine.ts`), assemblée avec les révisions par
 * `getTodayOverview` — la même vue que `/parcours` et `/progression`.
 */
export default function AujourdhuiExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const isAccessible = (mod: PublicModule) => canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
  const today = getTodayOverview(progress, publicModules, isAccessible);
  const dailyMinutes = getDailyMinutes(progress);
  const { plan, lockedPlan } = today;

  const viewTracked = useRef(false);
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;
    trackEvent("today_viewed", { sessionMode: plan?.mode ?? (lockedPlan ? "locked" : "none"), dailyMinutes });
    // Vue comptée une seule fois au montage — même principe que `ViewTracker`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lockedTracked = useRef(false);
  useEffect(() => {
    if (plan || !lockedPlan || lockedTracked.current) return;
    lockedTracked.current = true;
    trackEvent("paywall_viewed", { source: "today_discovery_ended" });
  }, [plan, lockedPlan]);

  if (today.needsOnboarding) {
    return (
      <div className="mx-auto max-w-xl py-4 sm:py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Bienvenue sur ParcoursFR</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Faisons connaissance.
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Dis-nous pourquoi tu apprends le français et combien de temps tu as par jour. Ensuite, un court test
          estime ton niveau. Ta première séance sera prête juste après.
        </p>
        <ol className="mt-6 space-y-2 text-sm text-foreground">
          {["Ton objectif", "Ton temps par jour", "Un test de niveau (environ 5 min)", "Ta première séance"].map(
            (label, index) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                >
                  {index + 1}
                </span>
                {label}
              </li>
            )
          )}
        </ol>
        <Link href="/test-niveau" className={cn(buttonClasses("primary", "lg"), "mt-8 h-auto! min-h-12 w-full py-3 text-center sm:w-auto")}>
          Commencer
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const sessionModule = plan ? publicModules.find((mod) => mod.id === plan.moduleId) : undefined;
  const completionRate = sessionModule
    ? getModuleCompletionRate(progress, sessionModule.id, sessionModule.totalExercises)
    : undefined;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {plan ? (
        <section aria-label="Ta séance du jour">
          <GuidedSessionCard
            plan={plan}
            href={sessionHref(plan)}
            prominent
            headingLevel="h1"
            completionRate={completionRate}
          />
        </section>
      ) : lockedPlan ? (
        <section aria-labelledby="discovery-ended-title" className="rounded-2xl border border-secondary/60 bg-card p-5 shadow-sm sm:p-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary-foreground">
            <LockIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 id="discovery-ended-title" className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
            Ta séance découverte est terminée
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Continue ton parcours pour accéder aux prochaines séances, aux révisions et aux situations de ton niveau.
          </p>
          <p className="mt-5 text-sm text-foreground">
            Ta prochaine séance : <strong>{lockedPlan.capability}</strong> · environ {lockedPlan.totalEstimatedMinutes} min
          </p>
          <Link
            href="/offre"
            onClick={() => trackEvent("premium_cta_clicked", { source: "today_discovery_ended" })}
            className={cn(buttonClasses("primary", "lg"), "mt-6 h-auto! min-h-12 w-full py-3 text-center sm:w-auto")}
          >
            Continuer mon parcours
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            En attendant, tu peux{" "}
            <Link href="/reviser" className="font-semibold text-primary hover:underline">
              réviser
            </Link>{" "}
            ce que tu as déjà travaillé, ou{" "}
            <Link href="/pratiquer" className="font-semibold text-primary hover:underline">
              pratiquer l&apos;oral
            </Link>
            .
          </p>
        </section>
      ) : (
        <section aria-labelledby="all-done-title" className="rounded-2xl border border-success/40 bg-card p-5 shadow-sm sm:p-8">
          <h1 id="all-done-title" className="text-2xl font-bold text-foreground sm:text-3xl">
            Tu as terminé tout le contenu de ton niveau
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Bravo ! Fais le point sur ce que tu sais faire, puis entraîne-toi avec un examen blanc.
          </p>
          <Link href="/progression" className={cn(buttonClasses("primary", "lg"), "mt-6 h-auto! min-h-12 w-full py-3 text-center sm:w-auto")}>
            Voir ce que je sais faire
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      )}

      <section aria-labelledby="also-today-title">
        <h2 id="also-today-title" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Si tu as encore un peu de temps
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
          {today.reviewCount > 0 ? (
            <li>
              <SecondaryLink
                href="/reviser"
                icon={<TargetIcon className="h-5 w-5" aria-hidden="true" />}
                title="Réviser"
                detail={`${today.reviewCount} point${today.reviewCount > 1 ? "s" : ""} à revoir · 5 min environ`}
              />
            </li>
          ) : null}
          <li>
            <SecondaryLink
              href="/pratiquer"
              icon={<MicrophoneIcon className="h-5 w-5" aria-hidden="true" />}
              title="Pratiquer l'oral"
              detail="Parler, écouter, situations de la vie réelle"
            />
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Ton rythme : <strong className="text-foreground">{dailyMinutes} min par jour</strong> ·{" "}
          <Link href="/compte#rythme" className="font-medium text-primary hover:underline">
            Modifier
          </Link>
        </p>
      </section>
    </div>
  );
}

function SecondaryLink({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{detail}</span>
      </span>
      <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}

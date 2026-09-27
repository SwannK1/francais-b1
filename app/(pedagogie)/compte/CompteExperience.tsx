"use client";

import Link from "next/link";
import ManageSubscriptionButton from "@/components/commerce/ManageSubscriptionButton";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";
import { LEARNING_GOALS } from "@/lib/pedagogy/data/goals";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { isPremiumActive } from "@/lib/commerce/access";
import {
  DAILY_MINUTES_DESCRIPTIONS,
  DAILY_MINUTES_OPTIONS,
  getDailyMinutes,
} from "@/lib/pedagogy/logic/preferences";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { LearningGoalId } from "@/lib/pedagogy/types";

/**
 * Compte : rythme quotidien, objectif, accès. C'est ici (et non plus dans la
 * navigation pédagogique) que vit l'offre. Les préférences sont des champs
 * de `UserProgress` : elles fonctionnent aussi sans compte (enregistrées sur
 * l'appareil) et suivent le compte une fois connecté.
 */
export default function CompteExperience() {
  const { progress, setDailyMinutes, setGoal } = useProgress();
  const { user, loading } = useAuth();
  const dailyMinutes = getDailyMinutes(progress);
  const premium = isPremiumActive(user?.premiumUntil);

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Mon compte</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ton rythme, ton objectif et ton accès.</p>
      </header>

      <section id="rythme" aria-labelledby="rythme-title" className="scroll-mt-24">
        <h2 id="rythme-title" className="text-lg font-semibold text-foreground">
          Temps de travail habituel
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Ta séance du jour s&apos;adapte à ce temps.</p>
        <div role="group" aria-labelledby="rythme-title" className="mt-4 grid gap-3 sm:grid-cols-3">
          {DAILY_MINUTES_OPTIONS.map((minutes) => {
            const selected = minutes === dailyMinutes;
            return (
              <button
                key={minutes}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setDailyMinutes(minutes);
                  trackEvent("daily_minutes_selected", { dailyMinutes: minutes, source: "compte" });
                }}
                className={cn(
                  "flex flex-col items-start rounded-2xl border bg-card p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                )}
              >
                <span className="flex w-full items-center justify-between text-base font-semibold text-foreground">
                  {minutes} min
                  {selected ? <CheckIcon className="h-4 w-4 text-primary" aria-hidden="true" /> : null}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{DAILY_MINUTES_DESCRIPTIONS[minutes]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="objectif-title">
        <h2 id="objectif-title" className="text-lg font-semibold text-foreground">
          Mon objectif
        </h2>
        <label htmlFor="goal-select" className="mt-1 block text-sm text-muted-foreground">
          Pourquoi apprends-tu le français ?
        </label>
        <select
          id="goal-select"
          value={progress.goalId ?? ""}
          onChange={(event) => {
            if (event.target.value) setGoal(event.target.value as LearningGoalId);
          }}
          className="mt-3 h-12 w-full rounded-xl border border-input-border bg-card px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>
            Choisir un objectif
          </option>
          {LEARNING_GOALS.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.title}
            </option>
          ))}
        </select>
      </section>

      <section aria-labelledby="acces-title">
        <h2 id="acces-title" className="text-lg font-semibold text-foreground">
          Mon accès
        </h2>
        {loading ? (
          <div className="mt-3 h-24 rounded-2xl bg-muted" aria-hidden="true" />
        ) : user ? (
          <div className="mt-3 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Connecté·e avec <strong className="text-foreground">{user.email}</strong>
            </p>
            {premium ? (
              <>
                <p className="mt-3 text-base font-semibold text-success">Accès complet actif</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jusqu&apos;au {new Date(user.premiumUntil!).toLocaleDateString("fr-FR")}, renouvelé automatiquement
                  sauf résiliation.
                </p>
                <ManageSubscriptionButton className="mt-4" />
              </>
            ) : (
              <>
                <p className="mt-3 text-base font-semibold text-foreground">Découverte gratuite</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Accès complet : {MAIN_PLAN.priceLabel} par {MAIN_PLAN.interval}, sans engagement.
                </p>
                <Link
                  href="/offre"
                  onClick={() => trackEvent("premium_cta_clicked", { source: "compte" })}
                  className={cn(buttonClasses("primary", "md"), "mt-4")}
                >
                  Voir l&apos;accès complet
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-foreground">
              Tu n&apos;as pas encore de compte. Ta progression est enregistrée sur cet appareil.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crée un compte pour la retrouver sur ton téléphone et ton ordinateur.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/inscription" className={buttonClasses("primary", "md")}>
                Créer un compte
              </Link>
              <Link href="/connexion" className={buttonClasses("secondary", "md")}>
                Se connecter
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href="/offre" className="font-medium text-primary hover:underline">
                Découvrir l&apos;accès complet
              </Link>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

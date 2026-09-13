"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonClasses, type ButtonSize } from "@/components/ui/button-styles";
import { buildDailySession } from "@/lib/daily/session-engine";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { cn } from "@/lib/cn";
import type { PublicModule } from "@/lib/pedagogy/types";
import { trackEvent } from "@/lib/analytics/client";

/**
 * CTA d'entrée dans l'application, partagée par le header et le hero de la
 * page d'accueil : dirige un visiteur qui n'a encore rien fait vers le test
 * de niveau, et quiconque a déjà de la progression enregistrée directement
 * vers sa séance du jour (`buildDailySession`, `lib/daily/`) — la même
 * recommandation que le bloc "Aujourd'hui" de `/parcours` — plutôt qu'un
 * lien générique vers le tableau de bord ou un module isolé : un seul
 * chemin evident, jamais deux recommandations différentes selon l'endroit
 * où l'on clique.
 *
 * Si cette séance porte sur un module de l'offre complète, on l'annonce dans
 * le libellé et on envoie directement vers `/offre` plutôt que de faire
 * cliquer vers une séance pour découvrir un `PremiumLock` sans contexte.
 *
 * Les métadonnées de modules viennent de `/api/modules/public` (fetch),
 * jamais d'un import direct de `data/modules-public` : ce composant est
 * monté par de nombreuses pages/en-têtes différents, sans Server Component
 * commun à qui faire porter la récupération — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */

/** Une seule requête par onglet, même si plusieurs CTA sont montés à la fois (header desktop + mobile). */
let cachedModules: PublicModule[] | null = null;
let pendingFetch: Promise<PublicModule[]> | null = null;

function fetchPublicModules(): Promise<PublicModule[]> {
  if (cachedModules) return Promise.resolve(cachedModules);
  if (!pendingFetch) {
    pendingFetch = fetch("/api/modules/public")
      .then((res) => (res.ok ? res.json() : { modules: [] }))
      .then((data: { modules?: PublicModule[] }) => {
        cachedModules = data.modules ?? [];
        return cachedModules;
      })
      .catch(() => {
        cachedModules = [];
        return cachedModules;
      });
  }
  return pendingFetch;
}

export default function PrimaryCta({
  size = "md",
  className,
  startLabel = "Commencer gratuitement",
  onClick,
  source,
}: {
  size?: ButtonSize;
  className?: string;
  startLabel?: string;
  onClick?: () => void;
  /** Où ce CTA est affiché (header, hero...) — propriété `source` du funnel, voir lib/analytics/events.ts. */
  source?: string;
}) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const hasStarted = Boolean(progress.placementCompletedAt) || progress.moduleProgress.length > 0;
  const [modules, setModules] = useState<PublicModule[] | null>(cachedModules);
  const authenticated = Boolean(user);

  useEffect(() => {
    if (!hasStarted || modules) return;
    let cancelled = false;
    fetchPublicModules().then((mods) => {
      if (!cancelled) setModules(mods);
    });
    return () => {
      cancelled = true;
    };
  }, [hasStarted, modules]);

  if (!hasStarted) {
    return (
      <Link
        href="/test-niveau"
        onClick={() => {
          trackEvent("primary_cta_clicked", { source, authenticated });
          onClick?.();
        }}
        className={cn(buttonClasses("primary", size), className)}
      >
        {startLabel}
      </Link>
    );
  }

  // Le temps du fetch (une fois par onglet) : destination générique plutôt
  // qu'un lien figé sur une donnée pas encore chargée — jamais de lien mort.
  if (!modules) {
    return (
      <Link href="/parcours" onClick={onClick} className={cn(buttonClasses("primary", size), className)}>
        Continuer mon parcours
      </Link>
    );
  }

  const isAccessible = (mod: PublicModule) =>
    canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
  const guidedSession = buildDailySession(progress, modules, { isAccessible });
  const rawGuidedSession = guidedSession ? null : buildDailySession(progress, modules);
  const target = guidedSession ?? rawGuidedSession;
  const locked = !guidedSession && Boolean(rawGuidedSession);

  // Ni séance accessible ni séance verrouillée à proposer (parcours du
  // niveau effectif entièrement terminé, ou catalogue pas encore couvert à
  // ce niveau) : jamais de lien mort, on renvoie vers le tableau de bord
  // `/parcours`, qui affiche lui-même l'état "rien à faire" honnête.
  const href = !target ? "/parcours" : locked ? "/offre" : `/parcours/seance?module=${target.moduleSlug}`;
  const recommendationType = !target
    ? "journey_complete"
    : target.isResuming
      ? "resume_in_progress"
      : "next_new_module";

  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent("resume_clicked", {
          source,
          authenticated,
          moduleId: target?.moduleId,
          recommendationType,
        });
        onClick?.();
      }}
      className={cn(buttonClasses("primary", size), className)}
    >
      {locked ? "Débloquer ma séance" : target?.isResuming ? "Continuer ma séance" : "Commencer ma séance"}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { buttonClasses, type ButtonSize } from "@/components/ui/button-styles";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";

/**
 * CTA d'entrée dans l'application, partagée par le header et le hero de la
 * page d'accueil : dirige un visiteur qui n'a encore rien fait vers le test
 * de niveau, et quiconque a déjà de la progression enregistrée directement
 * vers la suite pertinente de son parcours (`getNextModule`, jusqu'ici
 * calculé mais jamais branché à l'UI) plutôt que de le renvoyer au test de
 * positionnement à chaque visite.
 *
 * Si ce prochain module fait partie de l'offre complète, on l'annonce dans
 * le libellé et on envoie directement vers `/offre` plutôt que de faire
 * cliquer vers un module pour découvrir un `PremiumLock` sans contexte.
 */
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
  const authenticated = Boolean(user);

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

  const next = getNextModule(progress, MODULES);
  const nextIsLocked = next
    ? !canAccess({ kind: "module", slug: next.module.slug }, user?.premiumUntil)
    : false;
  const href = !next ? "/parcours" : nextIsLocked ? "/offre" : `/parcours/module/${next.module.slug}`;
  const recommendationType = !next
    ? "journey_complete"
    : next.isResuming
      ? "resume_in_progress"
      : "next_new_module";

  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent("resume_clicked", {
          source,
          authenticated,
          moduleId: next?.module.id,
          recommendationType,
        });
        onClick?.();
      }}
      className={cn(buttonClasses("primary", size), className)}
    >
      {nextIsLocked ? "Débloquer la suite du parcours" : "Continuer mon parcours"}
    </Link>
  );
}

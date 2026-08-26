"use client";

import Link from "next/link";
import { buttonClasses, type ButtonSize } from "@/components/ui/button-styles";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { getNextModule } from "@/lib/pedagogy/logic/recommendation";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { cn } from "@/lib/cn";

/**
 * CTA d'entrée dans l'application, partagée par le header et le hero de la
 * page d'accueil : dirige un visiteur qui n'a encore rien fait vers le test
 * de niveau, et quiconque a déjà de la progression enregistrée directement
 * vers la suite pertinente de son parcours (`getNextModule`, jusqu'ici
 * calculé mais jamais branché à l'UI) plutôt que de le renvoyer au test de
 * positionnement à chaque visite.
 */
export default function PrimaryCta({
  size = "md",
  className,
  startLabel = "Commencer gratuitement",
  onClick,
}: {
  size?: ButtonSize;
  className?: string;
  startLabel?: string;
  onClick?: () => void;
}) {
  const { progress } = useProgress();
  const hasStarted = Boolean(progress.placementCompletedAt) || progress.moduleProgress.length > 0;

  if (!hasStarted) {
    return (
      <Link href="/test-niveau" onClick={onClick} className={cn(buttonClasses("primary", size), className)}>
        {startLabel}
      </Link>
    );
  }

  const next = getNextModule(progress, MODULES);
  const href = next ? `/parcours/module/${next.module.slug}` : "/parcours";

  return (
    <Link href={href} onClick={onClick} className={cn(buttonClasses("primary", size), className)}>
      Continuer mon parcours
    </Link>
  );
}

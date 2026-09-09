import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, ClockIcon, HeadphonesIcon, LockIcon, TargetIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { DailySessionPlan } from "@/lib/daily/types";

const MODE_LABELS: Record<DailySessionPlan["mode"], string> = {
  decouverte: "Séance de découverte",
  reprise: "Séance du jour",
  apprentissage: "Séance du jour",
  consolidation: "Séance de consolidation",
  retour_apres_absence: "Retour en douceur",
  fin_de_niveau: "Dernière ligne droite",
};

export default function GuidedSessionCard({
  plan,
  href,
  locked = false,
}: {
  plan: DailySessionPlan;
  href: string;
  /** true si le module ciblé fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
}) {
  const includesListening = plan.steps.some((step) => step.lessonType === "ecoute");
  const stepCount = plan.steps.length;

  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TargetIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {MODE_LABELS[plan.mode]}
          </p>
        </div>
        {locked ? (
          <Badge variant="secondary">
            <LockIcon className="h-3 w-3" />
            Offre complète
          </Badge>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{plan.moduleTitle}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.reason}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="neutral">
          <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {plan.totalEstimatedMinutes} min environ
        </Badge>
        <Badge variant="neutral">
          {stepCount} étape{stepCount > 1 ? "s" : ""}
        </Badge>
        {includesListening ? (
          <Badge variant="neutral">
            <HeadphonesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Compréhension orale
          </Badge>
        ) : null}
      </div>

      <ol className="mt-3 space-y-1 text-sm text-muted-foreground">
        {plan.steps.map((step, index) => (
          <li key={step.id} className="flex items-baseline gap-2">
            <span aria-hidden="true" className="text-xs font-semibold text-foreground">
              {index + 1}.
            </span>
            {step.title}
          </li>
        ))}
      </ol>

      <Link href={href} className={cn(buttonClasses("primary", "md"), "mt-4 gap-1.5")}>
        {locked ? "Débloquer cette séance" : "Commencer"}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Card>
  );
}

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { ArrowRightIcon, FlagIcon, LockIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { statusFromCompletionRate, type ModuleStatus } from "@/lib/pedagogy/logic/progress";
import type { PublicModule } from "@/lib/pedagogy/types";

const STATUS_LABELS: Record<ModuleStatus, string> = {
  a_commencer: "À commencer",
  en_cours: "En cours",
  termine: "Terminé",
};

export default function ModuleCard({
  module: mod,
  number,
  completionRate = 0,
  href,
  locked = false,
  reviewed = false,
  onToggleReview,
}: {
  module: PublicModule;
  /** Position du module dans le parcours (1, 2, 3...), affichée si fournie. */
  number?: number;
  completionRate?: number;
  href: string;
  /** true si ce module fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
  /** true si ce module est marqué "à revoir" (voir `UserProgress.reviewedModuleIds`). */
  reviewed?: boolean;
  /** Omis = pas de bouton "à revoir" (ex. module pas encore commencé : rien à revoir). */
  onToggleReview?: () => void;
}) {
  const status = statusFromCompletionRate(completionRate);

  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {locked ? (
            <Badge variant="secondary">
              <LockIcon className="h-3 w-3" />
              Offre complète
            </Badge>
          ) : (
            <Badge variant={status === "termine" ? "success" : status === "en_cours" ? "primary" : "neutral"}>
              {STATUS_LABELS[status]}
            </Badge>
          )}
          {!locked && reviewed ? (
            <Badge variant="secondary">
              <FlagIcon className="h-3 w-3" />
              À revoir
            </Badge>
          ) : null}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {mod.level} · {DOMAIN_LABELS[mod.domain]} · {mod.estimatedMinutes} min
        </span>
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {number ? <span className="text-muted-foreground">Module {number} · </span> : null}
        {mod.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{mod.description}</p>

      <ul className="mt-3 space-y-1 text-sm text-foreground">
        {mod.objectives.slice(0, 3).map((objective) => (
          <li key={objective} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
            {objective}
          </li>
        ))}
      </ul>

      {locked ? null : <ProgressBar value={completionRate} label="Progression" className="mt-4" />}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={locked ? "/offre" : href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          {locked
            ? "Voir l'offre complète"
            : status === "en_cours"
              ? "Continuer"
              : status === "termine"
                ? "Revoir"
                : "Commencer"}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        {!locked && status !== "a_commencer" && onToggleReview ? (
          <button
            type="button"
            onClick={onToggleReview}
            className={cn(buttonClasses("ghost", "md"), "px-3 text-xs text-muted-foreground")}
          >
            <FlagIcon className="h-3.5 w-3.5" />
            {reviewed ? "Retirer de « à revoir »" : "Marquer à revoir"}
          </button>
        ) : null}
      </div>
    </Card>
  );
}

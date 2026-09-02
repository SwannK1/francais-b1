import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, LockIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { NextModuleTarget } from "@/lib/pedagogy/logic/recommendation";

export default function ResumeCard({
  target,
  completionRate,
  href,
  locked = false,
}: {
  target: NextModuleTarget;
  completionRate: number;
  href: string;
  /** true si le module ciblé fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
}) {
  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {target.isResuming ? "Reprendre là où tu t'es arrêté·e" : "Prochaine étape suggérée"}
        </p>
        {locked ? (
          <Badge variant="secondary">
            <LockIcon className="h-3 w-3" />
            Offre complète
          </Badge>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{target.module.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{target.stage.title}</p>

      {locked ? null : (
        <ProgressBar value={completionRate} label="Progression du module" className="mt-3" />
      )}

      <Link href={href} className={cn(buttonClasses("primary", "md"), "mt-4 gap-1.5")}>
        {locked ? "Débloquer ce module" : target.isResuming ? "Reprendre" : "Commencer"}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Card>
  );
}

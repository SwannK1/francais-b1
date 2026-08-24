import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import {
  ArrowRightIcon,
  ExamIcon,
  FlagIcon,
  GraduationCapIcon,
  HeadphonesIcon,
  PenIcon,
  TargetIcon,
  type IconProps,
} from "@/components/ui/icons";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { cn } from "@/lib/cn";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import type { StageStatus } from "@/lib/pedagogy/logic/parcours";

const STAGE_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  "faire-le-point": TargetIcon,
  "consolider-les-bases": GraduationCapIcon,
  "comprendre-le-francais": HeadphonesIcon,
  sexprimer: PenIcon,
  "preparation-examen": ExamIcon,
  "pret-pour-le-b1": FlagIcon,
};

const STATUS_LABELS: Record<StageStatus, string> = {
  a_commencer: "À commencer",
  en_cours: "En cours",
  termine: "Terminée",
};

const ACTION_LABELS: Record<StageStatus, string> = {
  a_commencer: "Commencer",
  en_cours: "Continuer",
  termine: "Revoir",
};

export default function StageCard({
  stage,
  status,
  completionRate,
  href,
  showProgress = true,
}: {
  stage: ParcoursStage;
  status: StageStatus;
  completionRate: number;
  href: string;
  /** Certaines étapes (examen, bilan) n'ont pas de métrique fiable à afficher. */
  showProgress?: boolean;
}) {
  const Icon = STAGE_ICONS[stage.slug] ?? TargetIcon;

  return (
    <Card>
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            status === "termine" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
          )}
        >
          {status === "termine" ? <Icon className="h-5 w-5" /> : stage.order}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Étape {stage.order}
            </p>
            <Badge variant={status === "termine" ? "success" : status === "en_cours" ? "primary" : "neutral"}>
              {STATUS_LABELS[status]}
            </Badge>
          </div>

          <h3 className="mt-1 text-lg font-semibold text-foreground">{stage.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{stage.objective}</p>

          {stage.domains && stage.domains.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {stage.domains.map((domain) => (
                <Badge key={domain} variant="neutral">
                  {DOMAIN_LABELS[domain]}
                </Badge>
              ))}
            </div>
          ) : null}

          {showProgress ? (
            <ProgressBar value={completionRate} label="Progression" className="mt-4" />
          ) : null}

          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {ACTION_LABELS[status]}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

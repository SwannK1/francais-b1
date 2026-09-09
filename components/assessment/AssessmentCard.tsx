import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { GraduationCapIcon, LockIcon } from "@/components/ui/icons";
import { flattenAssessmentQuestions } from "@/lib/assessment/logic/flatten";
import { CHECKPOINT_LABELS } from "@/lib/assessment/logic/labels";
import type { AssessmentDefinition } from "@/lib/assessment/types";

const KIND_LABEL: Record<AssessmentDefinition["checkpointKind"], string> = {
  bilan: "Bilan de niveau",
  passage: "Passage de niveau",
};

export default function AssessmentCard({
  assessment,
  href,
  locked = false,
}: {
  assessment: AssessmentDefinition;
  href: string;
  /** true si cette évaluation fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
}) {
  const questionCount = flattenAssessmentQuestions(assessment).length;

  return (
    <Card>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <GraduationCapIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        <Badge variant="primary">{KIND_LABEL[assessment.checkpointKind]}</Badge>
        <Badge variant="neutral">{CHECKPOINT_LABELS[assessment.id]}</Badge>
        {locked ? (
          <Badge variant="secondary">
            <LockIcon className="h-3 w-3" />
            Offre complète
          </Badge>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{assessment.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{assessment.description}</p>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">{assessment.durationMinutes} min</dt>
          <dd>Durée</dd>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">{questionCount}</dt>
          <dd>Questions</dd>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">{Math.round(assessment.passingRatio * 100)}%</dt>
          <dd>Seuil de réussite</dd>
        </div>
      </dl>

      <Link
        href={locked ? "/offre" : href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {locked ? "Voir l'offre complète" : "Commencer"}
      </Link>
    </Card>
  );
}

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ExamIcon, LockIcon } from "@/components/ui/icons";
import type { Exam } from "@/lib/pedagogy/types";

const TYPE_LABEL: Record<Exam["type"], string> = {
  delf: "DELF",
  tcf_irn: "TCF IRN",
  interne: "Entraînement interne",
};

export default function ExamCard({
  exam,
  href,
  locked = false,
}: {
  exam: Exam;
  href: string;
  /** true si cet examen fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
}) {
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2">
        <ExamIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        <Badge variant="primary">{TYPE_LABEL[exam.type]}</Badge>
        <Badge variant="neutral">{exam.level}</Badge>
        {exam.isBlanc ? <Badge variant="secondary">Examen blanc</Badge> : null}
        {locked ? (
          <Badge variant="secondary">
            <LockIcon className="h-3 w-3" />
            Offre complète
          </Badge>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-foreground">{exam.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">{exam.durationMinutes} min</dt>
          <dd>Durée</dd>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">{exam.sections.length}</dt>
          <dd>Sections</dd>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <dt className="font-medium text-foreground">
            {exam.passingScore}/{exam.maxScore}
          </dt>
          <dd>Seuil de réussite</dd>
        </div>
      </dl>

      <Link
        href={locked ? "/offre" : href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {locked ? "Voir l'offre complète" : "Voir l'épreuve"}
      </Link>
    </Card>
  );
}

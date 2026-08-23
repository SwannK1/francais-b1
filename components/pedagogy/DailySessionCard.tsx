import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { BookOpenIcon, HeadphonesIcon, PenIcon, TargetIcon } from "@/components/ui/icons";
import type { DailySession } from "@/lib/pedagogy/types";

export default function DailySessionCard({
  session,
  href,
}: {
  session: DailySession;
  href: string;
}) {
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2">
        <TargetIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Séance du jour · Objectif {session.goalLevel}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-foreground">{session.lessonTitle}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{session.moduleTitle}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="neutral">
          <BookOpenIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {session.exerciseCount} exercice{session.exerciseCount > 1 ? "s" : ""}
        </Badge>
        {session.includesListening ? (
          <Badge variant="neutral">
            <HeadphonesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Compréhension orale
          </Badge>
        ) : null}
        {session.includesWriting ? (
          <Badge variant="neutral">
            <PenIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Production écrite
          </Badge>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{session.reason}</p>

      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Commencer la séance
      </Link>
    </Card>
  );
}

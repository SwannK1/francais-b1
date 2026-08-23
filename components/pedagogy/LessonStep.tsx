import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Lesson } from "@/lib/pedagogy/types";

const STEP_LABELS: Record<Lesson["type"], string> = {
  decouvrir: "Découvrir",
  comprendre: "Comprendre",
  entrainement: "S'entraîner",
  ecoute: "Écouter",
  ecriture: "Écrire",
  evaluation: "Évaluer",
};

export default function LessonStep({
  lesson,
  completed = false,
  active = false,
  children,
}: {
  lesson: Lesson;
  completed?: boolean;
  active?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`lesson-${lesson.id}-title`}
      className={cn(
        "rounded-2xl border p-5",
        active ? "border-primary bg-primary/5" : "border-border bg-card"
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
              completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {completed ? <CheckIcon className="h-4 w-4" /> : STEP_LABELS[lesson.type].charAt(0)}
          </span>
          <h3 id={`lesson-${lesson.id}-title`} className="text-base font-semibold text-foreground">
            {STEP_LABELS[lesson.type]} — {lesson.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {lesson.optional ? <Badge variant="neutral">Facultatif</Badge> : null}
          {completed ? <Badge variant="success">Terminé</Badge> : null}
        </div>
      </header>

      {children ? <div className="mt-4 space-y-4">{children}</div> : null}
    </section>
  );
}

import { cn } from "@/lib/cn";
import { LEARNING_STATE_LABELS, type LearningState } from "@/lib/pedagogy/logic/learning-states";

/**
 * Pastille d'état pédagogique — le libellé est toujours écrit (jamais la
 * couleur seule), la couleur ne fait que renforcer : vert = acquis, ocre =
 * à retravailler, bleu = en cours, gris = pas encore commencé.
 */
const STATE_CLASSES: Record<LearningState, string> = {
  acquis: "bg-success/10 text-success",
  a_consolider: "bg-secondary/20 text-secondary-foreground",
  a_revoir: "bg-secondary/20 text-secondary-foreground",
  en_cours: "bg-primary/10 text-primary",
  a_decouvrir: "bg-muted text-muted-foreground",
};

const STATE_DOT: Record<LearningState, string> = {
  acquis: "bg-success",
  a_consolider: "bg-secondary",
  a_revoir: "bg-secondary",
  en_cours: "bg-primary",
  a_decouvrir: "bg-muted-foreground/50",
};

export default function LearningStateBadge({ state, className }: { state: LearningState; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        STATE_CLASSES[state],
        className
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", STATE_DOT[state])} />
      {LEARNING_STATE_LABELS[state]}
    </span>
  );
}

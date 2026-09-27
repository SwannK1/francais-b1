import { LockIcon } from "@/components/ui/icons";
import SpeakingPracticeBadge from "@/components/speaking/SpeakingPracticeBadge";
import TrackedLink from "@/components/practice/TrackedLink";
import { SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import type { SpeakingExercise } from "@/lib/speaking/types";

/**
 * Une ligne d'exercice oral (zone Pratiquer, page situation). `locked` est
 * décidé par l'appelant côté serveur (`canAccess`), jamais ici.
 */
export default function SpeakingExerciseRow({ exercise, locked }: { exercise: SpeakingExercise; locked: boolean }) {
  return (
    <TrackedLink
      href={locked ? "/offre" : `/oral/${exercise.id}`}
      event={locked ? "premium_cta_clicked" : "practice_activity_started"}
      properties={
        locked
          ? { source: "practice_speaking_locked", speakingExerciseId: exercise.id }
          : { speakingExerciseId: exercise.id, speakingKind: exercise.kind }
      }
      className="flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{exercise.title}</span>
        <span className="block text-xs text-muted-foreground">
          {SPEAKING_KIND_LABELS[exercise.kind]} · {exercise.level}
        </span>
      </span>
      {locked ? (
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground">
          <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Accès complet
        </span>
      ) : (
        <SpeakingPracticeBadge exerciseId={exercise.id} />
      )}
    </TrackedLink>
  );
}

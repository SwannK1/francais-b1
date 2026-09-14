"use client";

import Badge from "@/components/ui/Badge";
import { CheckIcon } from "@/components/ui/icons";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";

/**
 * Affiche "Déjà pratiqué" si l'apprenant a déjà fait cet exercice au moins
 * une fois. Pas d'état "Terminé" distinct : un exercice oral peut être
 * refait indéfiniment (voir `finish()` dans `SpeakingExerciseCard.tsx`), il
 * n'existe donc pas de donnée fiable de "complétion" — seulement de
 * pratique. `useSyncExternalStore` (dans `useSpeakingPractice`) renvoie ""
 * côté serveur et au premier rendu client, donc ce composant rend `null` au
 * même titre des deux côtés : pas de mismatch d'hydratation.
 */
export default function SpeakingPracticeBadge({ exerciseId }: { exerciseId: string }) {
  const { getEntry } = useSpeakingPractice();
  const entry = getEntry(exerciseId);

  if (!entry) return null;

  return (
    <Badge variant="success">
      <CheckIcon className="h-3 w-3" />
      Déjà pratiqué
    </Badge>
  );
}

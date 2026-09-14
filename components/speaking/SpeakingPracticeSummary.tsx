"use client";

import ProgressBar from "@/components/pedagogy/ProgressBar";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";

/**
 * Résumé volontairement minimal : une phrase + une barre de progression déjà
 * utilisée ailleurs dans le produit (voir `ModuleExperience.tsx`), pas de
 * nouveau composant "dashboard". Masqué tant que rien n'a été pratiqué pour
 * qu'un nouvel utilisateur ne voie jamais "0 sur 14" — voir chantier §6.
 */
export default function SpeakingPracticeSummary() {
  const { log } = useSpeakingPractice();
  const practicedCount = Object.keys(log).length;
  const total = SPEAKING_EXERCISES.length;

  if (practicedCount === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <ProgressBar
        value={(practicedCount / total) * 100}
        label="Votre pratique"
        className="max-w-sm"
      />
      <p className="mt-1.5 text-xs text-muted-foreground">
        {practicedCount} activité{practicedCount > 1 ? "s" : ""} pratiquée{practicedCount > 1 ? "s" : ""} sur {total}
      </p>
    </div>
  );
}

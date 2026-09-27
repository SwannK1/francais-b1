import type { DailyMinutes, UserProgress } from "@/lib/pedagogy/types";

/**
 * Préférences d'apprentissage portées par `UserProgress` (même stockage,
 * même synchronisation multi-appareils que la progression — pas de second
 * système de préférences).
 */

export const DAILY_MINUTES_OPTIONS: DailyMinutes[] = [10, 20, 30];

/**
 * Valeur retenue pour une progression qui n'a jamais choisi de durée
 * (anciens comptes, visiteur qui a sauté l'étape) : proche de la durée de
 * séance historique du moteur (18 min), donc sans changement perceptible
 * pour un apprenant existant.
 */
export const DEFAULT_DAILY_MINUTES: DailyMinutes = 20;

export const DAILY_MINUTES_DESCRIPTIONS: Record<DailyMinutes, string> = {
  10: "Un rappel et une activité.",
  20: "Un rappel, une leçon et un entraînement.",
  30: "Une séance complète, avec de l'oral quand c'est possible.",
};

/** `null` pour toute valeur hors liste (donnée ancienne, corrompue ou forgée par un client). */
export function normalizeDailyMinutes(value: unknown): DailyMinutes | null {
  return DAILY_MINUTES_OPTIONS.includes(value as DailyMinutes) ? (value as DailyMinutes) : null;
}

export function getDailyMinutes(progress: Pick<UserProgress, "dailyMinutes">): DailyMinutes {
  return normalizeDailyMinutes(progress.dailyMinutes) ?? DEFAULT_DAILY_MINUTES;
}

export function hasChosenDailyMinutes(progress: Pick<UserProgress, "dailyMinutes">): boolean {
  return normalizeDailyMinutes(progress.dailyMinutes) !== null;
}

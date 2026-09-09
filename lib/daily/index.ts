/**
 * API publique de la séance guidée du jour. Chantier indépendant du
 * diagnostic (test-niveau) et du moteur de révision espacée — voir
 * `lib/daily/session-engine.ts` pour le détail des garanties.
 */

/** Sélection déterministe de la séance du jour et de son mini-bilan — pur, testable sans DOM. */
export {
  buildDailySession,
  determineDailySessionMode,
  buildSessionSteps,
  buildDailySessionRecap,
} from "@/lib/daily/session-engine";

export type {
  DailySessionMode,
  DailySessionStep,
  DailySessionStepKind,
  DailySessionPlan,
  DailySessionRecap,
  SessionModuleLike,
  SessionLessonLike,
} from "@/lib/daily/types";

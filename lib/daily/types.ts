import type { LessonStepType } from "@/lib/pedagogy/types";

/**
 * Types de la séance guidée du jour — chantier indépendant du diagnostic
 * (test-niveau) et du moteur de révision espacée (`lib/pedagogy/logic/review.ts`).
 * Ce module ne réimplémente ni l'un ni l'autre : il consomme la progression
 * existante (`UserProgress`, `PublicModule`) et l'interface légère de
 * révision (`getReviewItems`) pour composer une séance à étapes.
 *
 * Distinct de `DailySession`/`computeDailySession`
 * (`lib/pedagogy/logic/recommendation.ts`) : cette paire existante propose
 * une seule carte pointant vers un module ; `DailySessionPlan` décrit une
 * véritable séance à plusieurs étapes, avec début, fin et mini-bilan.
 */

/**
 * Type de séance déterminé à partir de la progression — influence la
 * composition des étapes et le message affiché, jamais un module inventé.
 */
export type DailySessionMode =
  | "decouverte"
  | "reprise"
  | "apprentissage"
  | "consolidation"
  | "retour_apres_absence"
  | "fin_de_niveau";

export type DailySessionStepKind = "rappel" | "lesson";

export interface DailySessionStep {
  /** Stable au sein d'une séance : l'id de la leçon réelle, ou `"rappel"`. Jamais un id inventé. */
  id: string;
  kind: DailySessionStepKind;
  title: string;
  description: string;
  estimatedMinutes: number;
  /** Présent uniquement pour `kind: "lesson"` — id d'une vraie leçon du module ciblé. */
  lessonId: string | null;
  lessonType: LessonStepType | null;
  /** Présent uniquement pour `kind: "rappel"` — lien vers l'élément de révision suggéré. */
  reviewHref: string | null;
}

export interface DailySessionPlan {
  mode: DailySessionMode;
  moduleId: string;
  moduleSlug: string;
  moduleTitle: string;
  stageTitle: string;
  /** true si ce module était déjà commencé (reprise), false pour une découverte. */
  isResuming: boolean;
  /** Jamais vide : `buildDailySession` retourne `null` plutôt qu'une séance sans étape. */
  steps: DailySessionStep[];
  totalEstimatedMinutes: number;
  focusSkillId: string | null;
  focusSkillName: string | null;
  reason: string;
}

export interface DailySessionRecap {
  mode: DailySessionMode;
  moduleTitle: string;
  /** Titres des étapes effectivement parcourues pendant la séance. */
  workedOnTitles: string[];
  attemptedCount: number;
  correctCount: number;
  /** `null` si aucun exercice n'a été tenté pendant la séance (pas 0 % — distinction utile à l'affichage). */
  successRate: number | null;
  nextStepLabel: string;
  nextStepHref: string;
  skillToReview: { id: string; name: string } | null;
}

/**
 * Forme structurelle minimale nécessaire à la construction des étapes —
 * satisfaite aussi bien par `Module` (contenu complet, page serveur d'une
 * séance) que par `PublicModule` (planification/carte d'aperçu, sûre côté
 * client). Ne porte jamais de contenu protégé (réponses, textes) : seul le
 * nombre d'exercices par activité est lu, jamais leur détail.
 */
export interface SessionActivityLike {
  exercises: unknown[];
}

export interface SessionLessonLike {
  id: string;
  type: LessonStepType;
  title: string;
  activities: SessionActivityLike[];
}

export interface SessionModuleLike {
  id: string;
  slug: string;
  title: string;
  lessons: SessionLessonLike[];
}

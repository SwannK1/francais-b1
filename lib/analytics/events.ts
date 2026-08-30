/**
 * Taxonomie centrale des événements produit du funnel B1 (acquisition,
 * auth, placement, apprentissage, DELF, commerce). Toute instrumentation
 * doit utiliser un nom listé ici plutôt qu'une chaîne libre dispersée dans
 * les composants — voir docs/analytics.md pour la procédure d'ajout d'un
 * nouvel événement.
 */
export const ANALYTICS_EVENTS = [
  "signup_started",
  "signup_completed",
  "login_completed",
  "placement_started",
  "placement_completed",
  "module_started",
  "module_completed",
  "lesson_started",
  "exercise_completed",
  "delf_mock_viewed",
  "delf_mock_started",
  "delf_mock_completed",
  "premium_offer_viewed",
  "premium_cta_clicked",
  "checkout_started",
  "purchase_completed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

/**
 * Liste blanche des propriétés autorisées sur un événement. Aucune donnée
 * personnelle ou sensible (email, nom, mot de passe, token, contenu saisi
 * par l'utilisateur, clé Stripe...) ne doit jamais être ajoutée à ce type —
 * voir docs/analytics.md § données interdites.
 */
export interface AnalyticsProperties {
  moduleId?: string;
  lessonId?: string;
  stageId?: string;
  examId?: string;
  source?: string;
  placementLevel?: string;
  isPremium?: boolean;
  route?: string;
}

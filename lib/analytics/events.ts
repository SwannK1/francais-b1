/**
 * Taxonomie centrale des événements produit du funnel B1 (acquisition,
 * auth, placement, apprentissage, DELF, commerce). Toute instrumentation
 * doit utiliser un nom listé ici plutôt qu'une chaîne libre dispersée dans
 * les composants — voir docs/analytics/product-analytics.md pour la procédure d'ajout d'un
 * nouvel événement.
 */
export const ANALYTICS_EVENTS = [
  // Acquisition / navigation du parcours
  "primary_cta_clicked",
  "resume_clicked",
  "journey_viewed",
  "stage_viewed",
  // Auth
  "signup_started",
  "signup_completed",
  "login_completed",
  "login_failed",
  // Test de positionnement
  "placement_started",
  "placement_question_answered",
  "placement_completed",
  "placement_cta_clicked",
  // Diagnostic de niveau (chantier diagnostic-level)
  "diagnostic_started",
  "diagnostic_completed",
  "diagnostic_cta_clicked",
  // Apprentissage
  "module_started",
  "module_completed",
  "lesson_started",
  "exercise_completed",
  // Révision espacée (chantier spaced-review)
  "review_page_viewed",
  // Séance du jour (chantier daily-session)
  "daily_session_started",
  "daily_session_completed",
  // Audio (compréhension orale — modules et examens)
  "audio_play_started",
  "audio_completed",
  "audio_retry",
  "audio_error",
  // DELF / examens
  "delf_mock_viewed",
  "delf_mock_started",
  "delf_mock_completed",
  // Expression orale (chantier speaking-assessment)
  "speaking_practice_viewed",
  "speaking_model_played",
  "speaking_practice_completed",
  // Évaluations de passage (chantier speaking-assessment)
  "assessment_viewed",
  "assessment_started",
  "assessment_completed",
  // Commerce
  "premium_offer_viewed",
  "premium_cta_clicked",
  "paywall_viewed",
  "checkout_started",
  "checkout_failed",
  "purchase_completed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

/**
 * Liste blanche des propriétés autorisées sur un événement. Aucune donnée
 * personnelle ou sensible (email, nom, mot de passe, token, contenu saisi
 * par l'utilisateur, clé Stripe...) ne doit jamais être ajoutée à ce type —
 * voir docs/analytics/product-analytics.md § données interdites.
 *
 * `reason` : réservée à des codes internes fixes et courts choisis par le
 * code appelant (ex. "invalid_credentials", "rate_limited",
 * "payment_not_configured") — jamais un message d'erreur brut, jamais une
 * valeur dérivée d'une entrée utilisateur.
 */
export interface AnalyticsProperties {
  moduleId?: string;
  lessonId?: string;
  stageId?: string;
  examId?: string;
  exerciseId?: string;
  exerciseType?: string;
  source?: string;
  placementLevel?: string;
  questionIndex?: number;
  isPremium?: boolean;
  authenticated?: boolean;
  correct?: boolean;
  recommendationType?: string;
  reason?: string;
  speakingExerciseId?: string;
  speakingKind?: string;
  selfRating?: string;
  assessmentId?: string;
  diagnosticLevel?: string;
}

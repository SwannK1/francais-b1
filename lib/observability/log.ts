/**
 * Journalisation serveur normalisée pour les erreurs qui méritent d'être
 * visibles en production (infra, paiement, progression) sans jamais exposer
 * de secret ni de donnée personnelle dans les logs.
 *
 * Volontairement une fine couche `console.error` (aucun service tiers) :
 * le format `[scope] message` + un contexte plat et restreint suffit pour
 * grep les logs de la plateforme d'hébergement, et cette fonction reste le
 * seul point à faire évoluer si un outil d'observabilité externe est ajouté
 * plus tard (Sentry, Axiom...) — voir docs/analytics/product-analytics.md
 * § observabilité.
 */

/**
 * Clés de contexte qui ne doivent jamais atteindre un log, même ajoutées par
 * erreur par un futur appelant. Vérifiée en plus de la discipline "n'y mets
 * que des identifiants" attendue de chaque appelant.
 */
const FORBIDDEN_CONTEXT_KEYS = [
  "password",
  "token",
  "secret",
  "email",
  "cookie",
  "authorization",
  "card",
  "stripekey",
  "stripesecret",
];

function isForbiddenKey(key: string): boolean {
  const normalized = key.toLowerCase();
  return FORBIDDEN_CONTEXT_KEYS.some((forbidden) => normalized.includes(forbidden));
}

/**
 * N'accepte que des valeurs simples (id, booléen, nombre) — jamais un objet
 * utilisateur ou une erreur complète "par facilité", qui embarquerait
 * potentiellement des champs sensibles sans qu'on l'ait explicitement décidé.
 */
export type LogContext = Record<string, string | number | boolean | null | undefined>;

/**
 * Journalise une erreur serveur avec un scope explicite (ex. "checkout",
 * "auth", "progress") et un contexte restreint à des identifiants/indicateurs
 * — jamais un objet brut. N'expose que `error.message` (jamais la stack
 * complète ni l'objet d'erreur, qui peut porter des détails d'infra).
 */
export function logServerError(scope: string, error: unknown, context?: LogContext): void {
  const safeContext: LogContext = {};
  for (const [key, value] of Object.entries(context ?? {})) {
    if (isForbiddenKey(key)) continue;
    safeContext[key] = value;
  }

  const message = error instanceof Error ? error.message : "erreur inconnue";
  console.error(`[${scope}]`, message, safeContext);
}

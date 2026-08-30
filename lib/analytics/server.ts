import { track } from "@vercel/analytics/server";
import type { AnalyticsEventName, AnalyticsProperties } from "./events";

/**
 * Équivalent server-side de `trackEvent` (voir `./client`) — à utiliser
 * uniquement depuis des Server Actions ou des Route Handlers, jamais depuis
 * un composant client. Même garantie de non-blocage : une erreur analytics
 * ne doit jamais faire échouer la requête en cours. Les appelants ne
 * doivent pas attendre cette promesse (fire-and-forget) pour ne jamais
 * ajouter de latence à une réponse.
 */
export async function trackServerEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsProperties
): Promise<void> {
  try {
    await track(name, properties as Record<string, string | number | boolean | null | undefined> | undefined);
  } catch {
    // Idem : jamais bloquant pour la requête en cours.
  }
}

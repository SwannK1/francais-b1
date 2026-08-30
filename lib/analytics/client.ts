"use client";

import { inject, track } from "@vercel/analytics";
import type { AnalyticsEventName, AnalyticsProperties } from "./events";

/**
 * Initialise le script Vercel Analytics dès le premier import de ce module,
 * plutôt que de dépendre du montage de `<Analytics />` (`app/layout.tsx`).
 * Constaté en test : les deux se montent dans le même commit React, et
 * l'ordre exact d'exécution des effets entre eux n'est pas garanti côté
 * appelant — un `trackEvent` déclenché par un effet de montage de page
 * (vue, début de test...) peut donc s'exécuter avant que `<Analytics />`
 * ait initialisé `window.va`, et l'événement est alors perdu silencieusement
 * (pas d'erreur, jamais mis en file). `inject()` est idempotent (no-op si le
 * script est déjà présent), donc l'appeler ici en plus de `<Analytics />`
 * est sans risque.
 */
if (typeof window !== "undefined") {
  inject();
}

/**
 * Point d'entrée unique pour les événements produit déclenchés côté client.
 * Ne doit jamais faire planter l'appelant : le produit doit continuer à
 * fonctionner à l'identique si le provider est indisponible (ad-blocker,
 * script bloqué, erreur réseau...).
 */
export function trackEvent(name: AnalyticsEventName, properties?: AnalyticsProperties): void {
  try {
    track(name, properties as Record<string, string | number | boolean | null | undefined> | undefined);
  } catch {
    // Un échec analytics ne doit jamais interrompre un flux produit.
  }
}

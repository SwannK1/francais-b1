"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/client";
import type { AnalyticsEventName, AnalyticsProperties } from "@/lib/analytics/events";

/**
 * Déclenche un événement une seule fois au montage, pour les pages qui
 * restent des Server Components mais ont besoin de tracker une "vue"
 * (ex. `/offre`). Ne rend rien. Le garde-fou par ref évite le double
 * déclenchement causé par le double-montage de React Strict Mode en dev.
 */
export default function ViewTracker({
  event,
  properties,
}: {
  event: AnalyticsEventName;
  properties?: AnalyticsProperties;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent(event, properties);
    // Volontairement déclenché une seule fois au montage, jamais si `properties` change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

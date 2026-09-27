"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics/client";
import type { AnalyticsEventName, AnalyticsProperties } from "@/lib/analytics/events";

/** Lien qui envoie un événement produit au clic — utilisable depuis un Server Component. */
export default function TrackedLink({
  event,
  properties,
  ...props
}: ComponentProps<typeof Link> & { event: AnalyticsEventName; properties?: AnalyticsProperties }) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        trackEvent(event, properties);
        props.onClick?.(clickEvent);
      }}
    />
  );
}

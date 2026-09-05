"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Le webhook Stripe (`app/api/webhooks/stripe/route.ts`) active l'accès en
 * général en quelques secondes après le paiement, mais rien ne garantit
 * qu'il ait déjà été traité au premier rendu de cette page (voir
 * `app/paiement/succes/page.tsx`). Un unique rafraîchissement différé évite
 * à l'apprenant de devoir recharger la page lui-même pour voir son accès
 * complet apparaître.
 */
export default function PendingRefresh() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.refresh(), 4000);
    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}

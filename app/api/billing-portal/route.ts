import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";
import { findStripeCustomerIdByUserId } from "@/lib/auth/users";
import { getCurrentUser } from "@/lib/auth/dal";
import { logServerError } from "@/lib/observability/log";
import { resolveAppOrigin } from "@/lib/http/app-origin";

/**
 * Ouvre le portail Stripe (page hébergée par Stripe) permettant à une
 * personne abonnée de résilier elle-même son abonnement en libre-service,
 * sans passer par un contact manuel. Nécessite que le "Customer Portal"
 * soit activé côté Stripe Dashboard (Paramètres > Facturation > Portail
 * client) — sans quoi Stripe renvoie une erreur explicite, jamais un faux
 * succès.
 */
export async function POST() {
  if (!isPaymentConfigured()) {
    return NextResponse.json(
      { error: "Paiement non configuré dans cet environnement." },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const customerId = await findStripeCustomerIdByUserId(user.id);
  if (!customerId) {
    return NextResponse.json({ error: "no_stripe_customer" }, { status: 404 });
  }

  const origin = await resolveAppOrigin();
  const stripe = getStripeClient();

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/offre`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    logServerError("billing_portal.session_create", error);
    return NextResponse.json(
      { error: "Impossible d'ouvrir le portail de gestion d'abonnement pour le moment." },
      { status: 502 }
    );
  }
}

import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { getCurrentUser } from "@/lib/auth/dal";

/**
 * Démarre un paiement Stripe Checkout (page hébergée par Stripe : aucune
 * donnée de carte ne transite par ce code). Fonctionne dès que
 * STRIPE_SECRET_KEY et STRIPE_PRICE_ID sont configurés dans l'environnement.
 *
 * Nécessite un compte connecté : `client_reference_id` porte notre id
 * utilisateur interne dans la session Stripe, c'est ce qui permet au webhook
 * (`app/api/webhooks/stripe/route.ts`) de savoir à quel compte attribuer
 * l'accès premium une fois le paiement confirmé — sans ça, Stripe confirme
 * un paiement mais on ne saurait jamais qui vient de payer.
 */
export async function POST(request: Request) {
  if (!isPaymentConfigured()) {
    return NextResponse.json(
      {
        error:
          "Paiement non configuré dans cet environnement (STRIPE_SECRET_KEY / STRIPE_PRICE_ID manquants).",
      },
      { status: 503 }
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const origin = new URL(request.url).origin;
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/paiement/annulation`,
    client_reference_id: user.id,
    customer_email: user.email,
    metadata: { planId: MAIN_PLAN.id, userId: user.id },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}

import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";
import { MAIN_PLAN } from "@/lib/commerce/plans";

/**
 * Démarre un paiement Stripe Checkout (page hébergée par Stripe : aucune
 * donnée de carte ne transite par ce code). Fonctionne dès que
 * STRIPE_SECRET_KEY et STRIPE_PRICE_ID sont configurés dans l'environnement.
 *
 * Ce que cette route ne fait PAS : associer le paiement à un compte
 * utilisateur applicatif — ce worktree n'a pas d'authentification. C'est un
 * paiement Stripe "invité" (Stripe collecte l'email lui-même). L'attribution
 * de l'accès premium à un compte se fait dans le webhook
 * `app/api/webhooks/stripe/route.ts`, qui documente précisément ce point
 * d'intégration avec le chantier auth.
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

  const origin = new URL(request.url).origin;
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/paiement/annulation`,
    metadata: { planId: MAIN_PLAN.id },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}

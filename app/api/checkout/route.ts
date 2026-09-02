import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { isPremiumActive } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import { trackServerEvent } from "@/lib/analytics/server";
import { logServerError } from "@/lib/observability/log";

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
    void trackServerEvent("checkout_failed", { reason: "payment_not_configured" });
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

  // Garde-fou serveur : le client (bouton /offre, page d'accueil) masque déjà
  // le CTA à un utilisateur déjà premium, mais un appel direct à cette route
  // ne doit jamais pouvoir créer un second abonnement payant en parallèle.
  if (isPremiumActive(user.premiumUntil)) {
    return NextResponse.json({ error: "already_premium" }, { status: 409 });
  }

  const origin = new URL(request.url).origin;
  const stripe = getStripeClient();

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/paiement/annulation`,
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { planId: MAIN_PLAN.id, userId: user.id },
    });
  } catch (error) {
    // Jamais l'erreur Stripe brute en log (peut porter des détails de requête) :
    // seul `error.message` traverse `logServerError`, jamais l'objet complet.
    logServerError("checkout.stripe_session_create", error);
    void trackServerEvent("checkout_failed", { reason: "stripe_session_creation_failed" });
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 502 });
  }

  if (!session.url) {
    void trackServerEvent("checkout_failed", { reason: "no_checkout_url" });
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 502 });
  }

  // Ici seulement : une session Stripe réelle vient d'être créée, pas au simple
  // affichage de /offre ni au clic sur le bouton (voir docs/analytics/product-analytics.md).
  void trackServerEvent("checkout_started");

  return NextResponse.json({ url: session.url });
}

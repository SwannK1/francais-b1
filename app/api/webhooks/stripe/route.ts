import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";
import { setUserPremium, clearUserPremium, findUserByStripeCustomerId } from "@/lib/auth/users";
import { trackServerEvent } from "@/lib/analytics/server";

/**
 * Webhook Stripe : reçoit les événements de paiement (signature vérifiée,
 * jamais de confiance aveugle dans le corps de la requête). C'est le seul
 * endroit qui écrit `users.premium_until` — jamais le client, jamais la
 * page de succès du paiement (un simple retour sur `/paiement/succes` ne
 * prouve rien : seul un événement Stripe signé fait foi).
 *
 * `checkout.session.completed` porte `client_reference_id` = notre id
 * utilisateur (voir `app/api/checkout/route.ts`), ce qui permet d'attribuer
 * l'abonnement au bon compte dès le premier paiement. Les événements
 * suivants (renouvellement, résiliation) ne portent plus cet id — on
 * retrouve alors le compte via l'id client Stripe, mémorisé au premier
 * paiement (`setUserPremium`).
 */
function unixToIso(seconds: number): string {
  return new Date(seconds * 1000).toISOString();
}

function customerId(customer: string | { id: string } | null): string | null {
  if (!customer) return null;
  return typeof customer === "string" ? customer : customer.id;
}

export async function POST(request: Request) {
  if (!isPaymentConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook non configuré dans cet environnement." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature Stripe manquante." }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const custId = customerId(session.customer);
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

      if (!userId || !custId || !subscriptionId) {
        console.error("[stripe] checkout.session.completed sans référence exploitable", {
          hasUserId: Boolean(userId),
          hasCustomer: Boolean(custId),
          hasSubscription: Boolean(subscriptionId),
        });
        break;
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const periodEnd = subscription.items.data[0]?.current_period_end;
      if (periodEnd) {
        await setUserPremium(userId, unixToIso(periodEnd), custId);
        // Seule source fiable pour `purchase_completed` : un événement Stripe
        // signé et vérifié, jamais un simple retour sur la page de succès
        // (voir docs/analytics.md § achat).
        void trackServerEvent("purchase_completed");
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const custId = customerId(subscription.customer);
      const user = custId ? await findUserByStripeCustomerId(custId) : undefined;
      if (!user) break;

      const isActive = subscription.status === "active" || subscription.status === "trialing";
      const periodEnd = subscription.items.data[0]?.current_period_end;
      if (isActive && periodEnd) {
        await setUserPremium(user.id, unixToIso(periodEnd), custId!);
      } else if (!isActive) {
        await clearUserPremium(user.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const custId = customerId(subscription.customer);
      const user = custId ? await findUserByStripeCustomerId(custId) : undefined;
      if (user) await clearUserPremium(user.id);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

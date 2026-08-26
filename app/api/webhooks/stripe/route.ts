import { NextResponse } from "next/server";
import { getStripeClient, isPaymentConfigured } from "@/lib/commerce/stripe";

/**
 * Webhook Stripe : reçoit les événements de paiement (signature vérifiée,
 * jamais de confiance aveugle dans le corps de la requête).
 *
 * POINT D'INTÉGRATION AVEC LE CHANTIER AUTH — à lire avant de toucher ce
 * fichier : quand `checkout.session.completed` arrive, Stripe confirme
 * qu'un paiement a réussi, avec l'email du payeur
 * (`session.customer_details.email`) et l'identifiant client Stripe
 * (`session.customer`). Mais ce worktree n'a ni compte utilisateur ni base
 * de données pour persister un entitlement ("cet utilisateur a un accès
 * premium actif"). Tant que le chantier auth n'est pas fusionné, cet
 * événement est seulement journalisé.
 *
 * Une fois l'auth disponible, remplacer le `console.info` ci-dessous par :
 *   1. retrouver/créer l'utilisateur applicatif à partir de l'email Stripe ;
 *   2. enregistrer son `stripeCustomerId` et son statut d'abonnement ;
 *   3. faire lire ce statut à `getCurrentAccessLevel()`
 *      (voir `lib/commerce/access.ts`) au lieu du "free" constant actuel.
 * Traiter aussi `customer.subscription.deleted` / `.updated` pour révoquer
 * l'accès à la résiliation ou à un impayé.
 */
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
      // TODO(chantier auth) : voir le commentaire en tête de fichier — c'est
      // ici que l'accès premium doit être attribué à un compte applicatif.
      console.info("[stripe] paiement confirmé", {
        customerEmail: session.customer_details?.email ?? null,
        customerId: session.customer,
      });
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      // TODO(chantier auth) : révoquer/mettre à jour l'accès premium associé
      // à cet abonnement une fois qu'un compte applicatif existe.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

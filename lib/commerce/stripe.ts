import Stripe from "stripe";

/**
 * Client Stripe côté serveur uniquement (jamais importé depuis un composant
 * client). Aucun numéro de carte ne transite par notre code : le paiement se
 * fait sur la page Stripe Checkout hébergée, on ne fait que créer/lire des
 * sessions via l'API.
 *
 * Toute la config vient de variables d'environnement, jamais commitées (voir
 * `.env.example`) :
 * - STRIPE_SECRET_KEY  : clé secrète Stripe (sk_test_... / sk_live_...)
 * - STRIPE_PRICE_ID    : id du Price Stripe pour l'offre "Accès complet"
 * - STRIPE_WEBHOOK_SECRET : secret de signature du webhook (whsec_...)
 */

export function isPaymentConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);
}

let cachedClient: Stripe | null = null;

/** Lève une erreur explicite plutôt que de simuler un paiement qui n'existe pas. */
export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante — le paiement n'est pas configuré dans cet environnement."
    );
  }
  if (!cachedClient) {
    cachedClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return cachedClient;
}

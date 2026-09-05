import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Le webhook Stripe est le seul endroit qui écrit `users.premium_until` (voir
 * le commentaire du fichier testé) — ces tests couvrent la signature, les
 * événements inconnus, et l'idempotence (rejouer le même événement deux fois
 * ne doit jamais produire un état différent), sans jamais contacter Stripe
 * réel : `getStripeClient`/`lib/auth/users` sont entièrement mockés.
 */

const constructEvent = vi.fn();
const subscriptionsRetrieve = vi.fn();
const setUserPremium = vi.fn().mockResolvedValue(undefined);
const clearUserPremium = vi.fn().mockResolvedValue(undefined);
const findUserByStripeCustomerId = vi.fn();
const findUserById = vi.fn();
const trackServerEvent = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/commerce/stripe", () => ({
  isPaymentConfigured: () => true,
  getStripeClient: () => ({
    webhooks: { constructEvent },
    subscriptions: { retrieve: subscriptionsRetrieve },
  }),
}));

vi.mock("@/lib/auth/users", () => ({
  setUserPremium,
  clearUserPremium,
  findUserByStripeCustomerId,
  findUserById,
}));

vi.mock("@/lib/analytics/server", () => ({
  trackServerEvent,
}));

async function postWebhook(body: string, signature: string | null = "valid-sig") {
  const { POST } = await import("@/app/api/webhooks/stripe/route");
  const headers = new Headers();
  if (signature) headers.set("stripe-signature", signature);
  return POST(new Request("http://localhost/api/webhooks/stripe", { method: "POST", body, headers }));
}

beforeEach(() => {
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_test");
  constructEvent.mockReset();
  subscriptionsRetrieve.mockReset();
  setUserPremium.mockClear();
  clearUserPremium.mockClear();
  findUserByStripeCustomerId.mockReset();
  findUserById.mockReset().mockResolvedValue(undefined);
  trackServerEvent.mockClear();
});

describe("Signature", () => {
  it("rejette une requête sans en-tête stripe-signature (400)", async () => {
    const res = await postWebhook("{}", null);
    expect(res.status).toBe(400);
    expect(constructEvent).not.toHaveBeenCalled();
  });

  it("rejette une signature invalide (400), sans écrire quoi que ce soit en base", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("invalid signature");
    });
    const res = await postWebhook("{}");
    expect(res.status).toBe(400);
    expect(setUserPremium).not.toHaveBeenCalled();
  });
});

describe("Événement inconnu", () => {
  it("répond 200 (accuse réception) sans écrire en base — n'échoue jamais sur un type d'événement non géré", async () => {
    constructEvent.mockReturnValue({ type: "some.future.event.type", data: { object: {} } });
    const res = await postWebhook("{}");
    expect(res.status).toBe(200);
    expect(setUserPremium).not.toHaveBeenCalled();
    expect(clearUserPremium).not.toHaveBeenCalled();
  });
});

describe("checkout.session.completed", () => {
  const periodEnd = 1_800_000_000; // timestamp Unix arbitraire
  function makeEvent() {
    return {
      type: "checkout.session.completed",
      data: {
        object: {
          client_reference_id: "user-1",
          customer: "cus_123",
          subscription: "sub_123",
        },
      },
    };
  }

  beforeEach(() => {
    subscriptionsRetrieve.mockResolvedValue({ items: { data: [{ current_period_end: periodEnd }] } });
  });

  it("active le premium pour l'utilisateur référencé", async () => {
    constructEvent.mockReturnValue(makeEvent());
    const res = await postWebhook("{}");
    expect(res.status).toBe(200);
    expect(setUserPremium).toHaveBeenCalledWith(
      "user-1",
      new Date(periodEnd * 1000).toISOString(),
      "cus_123"
    );
  });

  it("idempotence : recevoir deux fois le même événement (redélivrance Stripe) produit le même état, pas un double effet", async () => {
    constructEvent.mockReturnValue(makeEvent());
    // Premier appel : compte pas encore premium (état par défaut du mock).
    // Second appel (redélivrance) : le compte est désormais premium, comme
    // il le serait réellement après le premier passage de ce webhook.
    findUserById
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ id: "user-1", email: "a@b.com", premiumUntil: "2999-01-01T00:00:00.000Z" });

    await postWebhook("{}");
    await postWebhook("{}");

    expect(setUserPremium).toHaveBeenCalledTimes(2);
    // Les deux appels écrivent exactement la même valeur — un "set" répété,
    // jamais un cumul : rejouer l'événement est sans risque.
    expect(setUserPremium.mock.calls[0]).toEqual(setUserPremium.mock.calls[1]);
    // En revanche, l'event analytics `purchase_completed` n'est compté
    // qu'une fois : la redélivrance ne doit jamais gonfler ce compteur.
    expect(trackServerEvent).toHaveBeenCalledTimes(1);
    expect(trackServerEvent).toHaveBeenCalledWith("purchase_completed");
  });

  it("n'écrit rien si une référence exploitable manque (pas de client_reference_id)", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { client_reference_id: null, customer: "cus_123", subscription: "sub_123" } },
    });
    const res = await postWebhook("{}");
    expect(res.status).toBe(200);
    expect(setUserPremium).not.toHaveBeenCalled();
  });
});

describe("customer.subscription.updated / .deleted", () => {
  it("active/renouvelle le premium quand l'abonnement est actif", async () => {
    findUserByStripeCustomerId.mockResolvedValue({ id: "user-1", email: "a@b.com", premiumUntil: null });
    constructEvent.mockReturnValue({
      type: "customer.subscription.updated",
      data: {
        object: { customer: "cus_123", status: "active", items: { data: [{ current_period_end: 1_800_000_000 }] } },
      },
    });
    await postWebhook("{}");
    expect(setUserPremium).toHaveBeenCalledWith("user-1", expect.any(String), "cus_123");
  });

  it("révoque le premium quand l'abonnement n'est plus actif (impayé, résilié)", async () => {
    findUserByStripeCustomerId.mockResolvedValue({ id: "user-1", email: "a@b.com", premiumUntil: "future" });
    constructEvent.mockReturnValue({
      type: "customer.subscription.updated",
      data: { object: { customer: "cus_123", status: "canceled", items: { data: [] } } },
    });
    await postWebhook("{}");
    expect(clearUserPremium).toHaveBeenCalledWith("user-1");
  });

  it("customer.subscription.deleted révoque le premium", async () => {
    findUserByStripeCustomerId.mockResolvedValue({ id: "user-1", email: "a@b.com", premiumUntil: "future" });
    constructEvent.mockReturnValue({
      type: "customer.subscription.deleted",
      data: { object: { customer: "cus_123" } },
    });
    await postWebhook("{}");
    expect(clearUserPremium).toHaveBeenCalledWith("user-1");
  });

  it("ne plante pas si le client Stripe ne correspond à aucun compte connu (compte jamais rattaché)", async () => {
    findUserByStripeCustomerId.mockResolvedValue(undefined);
    constructEvent.mockReturnValue({
      type: "customer.subscription.deleted",
      data: { object: { customer: "cus_unknown" } },
    });
    const res = await postWebhook("{}");
    expect(res.status).toBe(200);
    expect(clearUserPremium).not.toHaveBeenCalled();
  });
});

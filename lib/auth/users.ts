import { randomUUID } from "node:crypto";
import { db } from "@/lib/auth/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export interface AuthUser {
  id: string;
  email: string;
  /**
   * Date ISO jusqu'à laquelle l'abonnement premium est actif, ou `null` si
   * l'utilisateur n'a jamais souscrit / n'est plus abonné. Source de vérité
   * unique du statut premium, écrite uniquement par le webhook Stripe (voir
   * `app/api/webhooks/stripe/route.ts`) — jamais par le client. Consommée par
   * `lib/commerce/access.ts::isPremiumActive`.
   */
  premiumUntil: string | null;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  premium_until: string | null;
  stripe_customer_id: string | null;
}

function toAuthUser(row: { id: string; email: string; premium_until: string | null }): AuthUser {
  // node:sqlite renvoie des lignes à prototype null : reconstruire un objet
  // simple est nécessaire pour pouvoir les passer d'un Server Component à un
  // Client Component (AuthProvider), React refuse les objets non "plain".
  return { id: row.id, email: row.email, premiumUntil: row.premium_until };
}

export function findUserByEmail(email: string): UserRow | undefined {
  return db
    .prepare("SELECT id, email, password_hash, premium_until, stripe_customer_id FROM users WHERE email = ?")
    .get(email) as UserRow | undefined;
}

export function findUserById(id: string): AuthUser | undefined {
  const row = db.prepare("SELECT id, email, premium_until FROM users WHERE id = ?").get(id) as
    | { id: string; email: string; premium_until: string | null }
    | undefined;
  return row ? toAuthUser(row) : undefined;
}

/** Lève si l'email est déjà utilisé — laisse l'appelant décider du message affiché. */
export function createUser(email: string, password: string): AuthUser {
  if (findUserByEmail(email)) {
    throw new Error("EMAIL_TAKEN");
  }
  const id = randomUUID();
  const passwordHash = hashPassword(password);
  db.prepare(
    "INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
  ).run(id, email, passwordHash, new Date().toISOString());
  return { id, email, premiumUntil: null };
}

export function verifyCredentials(email: string, password: string): AuthUser | null {
  const row = findUserByEmail(email);
  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;
  return toAuthUser(row);
}

/**
 * Trouve le compte associé à un client Stripe — utilisé par le webhook pour
 * les événements d'abonnement qui ne portent pas `client_reference_id`
 * (renouvellement, annulation), seulement l'id client Stripe.
 */
export function findUserByStripeCustomerId(customerId: string): AuthUser | undefined {
  const row = db
    .prepare("SELECT id, email, premium_until FROM users WHERE stripe_customer_id = ?")
    .get(customerId) as { id: string; email: string; premium_until: string | null } | undefined;
  return row ? toAuthUser(row) : undefined;
}

/**
 * Active/renouvelle le premium jusqu'à `premiumUntil` (date ISO) et
 * mémorise l'id client Stripe pour retrouver ce compte aux prochains
 * événements d'abonnement (renouvellement, résiliation).
 */
export function setUserPremium(userId: string, premiumUntil: string, stripeCustomerId: string): void {
  db.prepare("UPDATE users SET premium_until = ?, stripe_customer_id = ? WHERE id = ?").run(
    premiumUntil,
    stripeCustomerId,
    userId
  );
}

/** Révoque l'accès premium immédiatement (résiliation effective, impayé). */
export function clearUserPremium(userId: string): void {
  db.prepare("UPDATE users SET premium_until = NULL WHERE id = ?").run(userId);
}

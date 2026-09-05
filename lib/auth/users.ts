import { randomUUID } from "node:crypto";
import { getSql } from "@/lib/auth/db";
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
  return { id: row.id, email: row.email, premiumUntil: row.premium_until };
}

export async function findUserByEmail(email: string): Promise<UserRow | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, password_hash, premium_until, stripe_customer_id FROM users WHERE email = ${email}
  `) as UserRow[];
  return rows[0];
}

export async function findUserById(id: string): Promise<AuthUser | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, premium_until FROM users WHERE id = ${id}
  `) as { id: string; email: string; premium_until: string | null }[];
  const row = rows[0];
  return row ? toAuthUser(row) : undefined;
}

/** Lève si l'email est déjà utilisé — laisse l'appelant décider du message affiché. */
export async function createUser(email: string, password: string): Promise<AuthUser> {
  if (await findUserByEmail(email)) {
    throw new Error("EMAIL_TAKEN");
  }
  const id = randomUUID();
  const passwordHash = hashPassword(password);
  const sql = getSql();
  try {
    await sql`
      INSERT INTO users (id, email, password_hash) VALUES (${id}, ${email}, ${passwordHash})
    `;
  } catch (error) {
    // Deux requêtes concurrentes peuvent toutes deux passer le check
    // ci-dessus avant qu'aucune n'ait inséré (TOCTOU) : la contrainte UNIQUE
    // en base reste le garde-fou réel, on la traduit juste en même message.
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      throw new Error("EMAIL_TAKEN");
    }
    throw error;
  }
  return { id, email, premiumUntil: null };
}

export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const row = await findUserByEmail(email);
  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;
  return toAuthUser(row);
}

/**
 * Trouve le compte associé à un client Stripe — utilisé par le webhook pour
 * les événements d'abonnement qui ne portent pas `client_reference_id`
 * (renouvellement, annulation), seulement l'id client Stripe.
 */
export async function findUserByStripeCustomerId(customerId: string): Promise<AuthUser | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, premium_until FROM users WHERE stripe_customer_id = ${customerId}
  `) as { id: string; email: string; premium_until: string | null }[];
  const row = rows[0];
  return row ? toAuthUser(row) : undefined;
}

/**
 * Id client Stripe du compte connecté — utilisé pour ouvrir le portail de
 * gestion d'abonnement Stripe (résiliation en libre-service), jamais exposé
 * tel quel côté client (voir app/api/billing-portal/route.ts).
 */
export async function findStripeCustomerIdByUserId(userId: string): Promise<string | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT stripe_customer_id FROM users WHERE id = ${userId}
  `) as { stripe_customer_id: string | null }[];
  return rows[0]?.stripe_customer_id ?? null;
}

/**
 * Active/renouvelle le premium jusqu'à `premiumUntil` (date ISO) et
 * mémorise l'id client Stripe pour retrouver ce compte aux prochains
 * événements d'abonnement (renouvellement, résiliation).
 */
export async function setUserPremium(
  userId: string,
  premiumUntil: string,
  stripeCustomerId: string
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users SET premium_until = ${premiumUntil}, stripe_customer_id = ${stripeCustomerId}
    WHERE id = ${userId}
  `;
}

/** Révoque l'accès premium immédiatement (résiliation effective, impayé). */
export async function clearUserPremium(userId: string): Promise<void> {
  const sql = getSql();
  await sql`UPDATE users SET premium_until = NULL WHERE id = ${userId}`;
}

/** Remplace le hash de mot de passe stocké — utilisé par le flux de réinitialisation. */
export async function updateUserPassword(userId: string, passwordHash: string): Promise<void> {
  const sql = getSql();
  await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${userId}`;
}

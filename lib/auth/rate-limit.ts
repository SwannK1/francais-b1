import { getSql } from "@/lib/auth/db";

const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 10;

/**
 * Throttling en base (table `login_attempts`), pas en mémoire process : sur
 * Vercel, chaque invocation serverless peut atterrir sur une instance
 * différente (voire une instance fraîchement démarrée) sans mémoire
 * partagée avec les précédentes — un compteur en mémoire y donnerait une
 * fausse impression de protection sans réellement freiner un attaquant
 * distribuant ses requêtes. La base, elle, est le seul état réellement
 * partagé entre toutes les invocations.
 */
export async function isLoginThrottled(email: string): Promise<boolean> {
  const sql = getSql();
  const cutoff = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  // Nettoyage opportuniste des tentatives expirées pour cet email, pour ne
  // pas faire grossir la table indéfiniment sans tâche planifiée dédiée.
  await sql`DELETE FROM login_attempts WHERE email = ${email} AND attempted_at < ${cutoff}`;

  const rows = (await sql`
    SELECT count(*)::int AS count FROM login_attempts WHERE email = ${email}
  `) as { count: number }[];

  return (rows[0]?.count ?? 0) >= MAX_ATTEMPTS;
}

export async function recordFailedLoginAttempt(email: string): Promise<void> {
  const sql = getSql();
  await sql`INSERT INTO login_attempts (email) VALUES (${email})`;
}

export async function clearLoginAttempts(email: string): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM login_attempts WHERE email = ${email}`;
}

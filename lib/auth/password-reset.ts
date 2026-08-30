import { randomBytes, createHash } from "node:crypto";
import { getSql } from "@/lib/auth/db";

/**
 * Durée de vie d'un token de réinitialisation — court et raisonnable, aligné
 * sur les pratiques courantes. Exportée pour que le texte de l'email
 * (`lib/auth/mailer.ts`) affiche la même durée, sans dupliquer la valeur.
 */
export const TOKEN_TTL_MINUTES = 60;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Émet un nouveau token de réinitialisation, en invalidant l'éventuel token
 * encore valide déjà émis pour ce compte : au plus un token valide par
 * compte à la fois, jamais plusieurs liens valides en même temps, et une
 * nouvelle demande rend automatiquement caduc un ancien lien déjà envoyé.
 * Retourne le token en clair — la seule fois où il existe hors de son hash
 * stocké, à placer dans l'URL envoyée par email, jamais persisté tel quel.
 */
export async function createPasswordResetToken(userId: string): Promise<string> {
  const sql = getSql();

  await sql`DELETE FROM password_reset_tokens WHERE user_id = ${userId} AND used_at IS NULL`;

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000);

  await sql`
    INSERT INTO password_reset_tokens (token_hash, user_id, expires_at)
    VALUES (${hashToken(token)}, ${userId}, ${expiresAt.toISOString()})
  `;

  return token;
}

export type PasswordResetTokenStatus = "valid" | "expired" | "invalid";

/**
 * Vérifie un token sans le consommer — utilisé par la page de réinitialisation
 * pour décider quoi afficher (formulaire vs message d'erreur) avant toute
 * soumission. Ne fait jamais foi pour la mutation réelle : voir
 * `consumePasswordResetToken`, seule source de vérité au moment du changement
 * de mot de passe.
 */
export async function checkPasswordResetToken(token: string): Promise<PasswordResetTokenStatus> {
  const sql = getSql();
  const rows = (await sql`
    SELECT expires_at, used_at FROM password_reset_tokens WHERE token_hash = ${hashToken(token)}
  `) as { expires_at: string; used_at: string | null }[];
  const row = rows[0];

  if (!row || row.used_at) return "invalid";
  if (new Date(row.expires_at).getTime() < Date.now()) return "expired";
  return "valid";
}

/**
 * Consomme le token de façon atomique et retourne l'id du compte concerné,
 * ou `null` si le token est invalide/expiré/déjà utilisé. La clause
 * `used_at IS NULL` dans le WHERE garantit qu'une seule requête concurrente
 * peut réussir même si le même lien est soumis deux fois en parallèle —
 * aucune fenêtre de course où le mot de passe serait changé deux fois à
 * partir d'un seul token.
 */
export async function consumePasswordResetToken(token: string): Promise<string | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE password_reset_tokens
    SET used_at = now()
    WHERE token_hash = ${hashToken(token)} AND used_at IS NULL AND expires_at > now()
    RETURNING user_id
  `) as { user_id: string }[];

  return rows[0]?.user_id ?? null;
}

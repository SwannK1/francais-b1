import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/auth/db";

const SESSION_COOKIE = "session";
const SESSION_DAYS = 30;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Sessions en base plutôt qu'un JWT signé : pas de secret à provisionner, et
 * une déconnexion supprime réellement la session côté serveur (un JWT
 * resterait valide jusqu'à expiration). Seul le hash du token est stocké,
 * jamais le token lui-même — un accès en lecture à la base ne suffit pas à
 * usurper une session active.
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  db.prepare(
    "INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).run(hashToken(token), userId, expiresAt.toISOString(), new Date().toISOString());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = db
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token_hash = ?")
    .get(hashToken(token)) as { user_id: string; expires_at: string } | undefined;

  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
    return null;
  }
  return row.user_id;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
  }
  cookieStore.delete(SESSION_COOKIE);
}

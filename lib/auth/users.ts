import { randomUUID } from "node:crypto";
import { getSql } from "@/lib/auth/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export interface AuthUser {
  id: string;
  email: string;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
}

export async function findUserByEmail(email: string): Promise<UserRow | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email, password_hash FROM users WHERE email = ${email}
  `) as UserRow[];
  return rows[0];
}

export async function findUserById(id: string): Promise<AuthUser | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, email FROM users WHERE id = ${id}
  `) as AuthUser[];
  const row = rows[0];
  return row ? { id: row.id, email: row.email } : undefined;
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
  return { id, email };
}

export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const row = await findUserByEmail(email);
  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;
  return { id: row.id, email: row.email };
}

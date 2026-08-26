import { randomUUID } from "node:crypto";
import { db } from "@/lib/auth/db";
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

export function findUserByEmail(email: string): UserRow | undefined {
  return db.prepare("SELECT id, email, password_hash FROM users WHERE email = ?").get(email) as
    | UserRow
    | undefined;
}

export function findUserById(id: string): AuthUser | undefined {
  const row = db.prepare("SELECT id, email FROM users WHERE id = ?").get(id) as
    | AuthUser
    | undefined;
  // node:sqlite renvoie des lignes à prototype null : reconstruire un objet
  // simple est nécessaire pour pouvoir les passer d'un Server Component à un
  // Client Component (AuthProvider), React refuse les objets non "plain".
  return row ? { id: row.id, email: row.email } : undefined;
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
  return { id, email };
}

export function verifyCredentials(email: string, password: string): AuthUser | null {
  const row = findUserByEmail(email);
  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;
  return { id: row.id, email: row.email };
}

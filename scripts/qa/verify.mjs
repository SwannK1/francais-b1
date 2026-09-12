#!/usr/bin/env node
import postgres from "postgres";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { assertSafeQaEnvironment } from "./guards.ts";

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

assertSafeQaEnvironment();
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
try {
  const premium = await sql`SELECT password_hash, premium_until FROM users WHERE email = ${process.env.QA_USER_EMAIL}`;
  const free = await sql`SELECT password_hash, premium_until FROM users WHERE email = ${process.env.QA_FREE_USER_EMAIL}`;
  if (!premium[0] || !verifyPassword(process.env.QA_USER_PASSWORD, premium[0].password_hash)) {
    throw new Error("Le compte premium QA n'est pas authentifiable.");
  }
  if (!premium[0].premium_until || new Date(premium[0].premium_until).getTime() <= Date.now()) {
    throw new Error("Le compte premium QA n'a pas un accès actif.");
  }
  if (!free[0] || !verifyPassword(process.env.QA_FREE_USER_PASSWORD, free[0].password_hash)) {
    throw new Error("Le compte gratuit QA n'est pas authentifiable.");
  }
  if (free[0].premium_until !== null) throw new Error("Le compte gratuit QA ne doit pas être premium.");
  console.log("✓ QA DB : schéma accessible, comptes authentifiables, premium actif et gratuit verrouillable.");
} finally {
  await sql.end();
}

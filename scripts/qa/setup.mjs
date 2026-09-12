#!/usr/bin/env node
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, chmodSync } from "node:fs";
import { spawnSync } from "node:child_process";
import postgres from "postgres";
import { QA_ENV_PATH, assertSafeQaEnvironment, loadEnvFile } from "./guards.ts";

function secret(bytes = 24) {
  return randomBytes(bytes).toString("base64url");
}

function createLocalEnv() {
  if (existsSync(QA_ENV_PATH)) return;
  const dbPassword = secret();
  const suffix = randomBytes(5).toString("hex");
  const content = [
    "# Généré localement par npm run qa:setup — ne jamais committer.",
    "QA_ENV=true",
    "DATABASE_DRIVER=postgres",
    "POSTGRES_USER=francais_b1_qa",
    `POSTGRES_PASSWORD=${dbPassword}`,
    "POSTGRES_DB=francais_b1_qa",
    "POSTGRES_PORT=55432",
    `DATABASE_URL=postgresql://francais_b1_qa:${dbPassword}@127.0.0.1:55432/francais_b1_qa`,
    `QA_USER_EMAIL=qa-premium-${suffix}@example.test`,
    `QA_USER_PASSWORD=${secret()}`,
    `QA_FREE_USER_EMAIL=qa-free-${suffix}@example.test`,
    `QA_FREE_USER_PASSWORD=${secret()}`,
    "",
  ].join("\n");
  writeFileSync(QA_ENV_PATH, content, { mode: 0o600, flag: "wx" });
  chmodSync(QA_ENV_PATH, 0o600);
  console.log("✓ Configuration QA locale créée (valeurs masquées). ");
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function runDocker(args) {
  const result = spawnSync("docker", args, { stdio: "inherit" });
  if (result.status !== 0) throw new Error("Docker QA n'a pas démarré correctement.");
}

createLocalEnv();
const localEnv = loadEnvFile();
Object.assign(process.env, localEnv);
assertSafeQaEnvironment();

runDocker(["compose", "--env-file", ".env.qa.local", "-f", "docker-compose.qa.yml", "up", "-d", "--wait"]);

const sql = postgres(process.env.DATABASE_URL, { max: 1 });
try {
  await sql`SELECT 1`;
  const schema = readFileSync(new URL("../../lib/auth/schema.sql", import.meta.url), "utf8");
  const statements = schema
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);
  for (const statement of statements) await sql.unsafe(statement);

  async function seedUser(email, password, premium) {
    const rows = await sql`SELECT id FROM users WHERE email = ${email}`;
    const id = rows[0]?.id ?? randomUUID();
    const passwordHash = hashPassword(password);
    await sql`
      INSERT INTO users (id, email, password_hash)
      VALUES (${id}, ${email}, ${passwordHash})
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
    `;
    if (premium) {
      const premiumUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      await sql`
        UPDATE users SET premium_until = ${premiumUntil}, stripe_customer_id = ${`qa_seed_${id}`}
        WHERE id = ${id}
      `;
    } else {
      await sql`UPDATE users SET premium_until = NULL, stripe_customer_id = NULL WHERE id = ${id}`;
    }
    // Un bootstrap QA repart volontairement d'une progression vide : les
    // scénarios navigateur restent déterministes et aucune donnée réelle ne
    // vit dans cette base locale réservée aux deux comptes générés ci-dessus.
    await sql`DELETE FROM user_progress WHERE user_id = ${id}`;
  }

  await seedUser(process.env.QA_USER_EMAIL, process.env.QA_USER_PASSWORD, true);
  await seedUser(process.env.QA_FREE_USER_EMAIL, process.env.QA_FREE_USER_PASSWORD, false);
  console.log("✓ Schéma appliqué et comptes QA premium/non-premium prêts (identifiants masqués).");
} finally {
  await sql.end();
}

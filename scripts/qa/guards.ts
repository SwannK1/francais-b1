import { readFileSync } from "node:fs";

export const QA_ENV_PATH = ".env.qa.local";

export function loadEnvFile(path: string | URL = QA_ENV_PATH): Record<string, string> {
  const values: Record<string, string> = {};
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    values[line.slice(0, separator)] = line.slice(separator + 1);
  }
  return values;
}

export function assertSafeQaEnvironment(env: Record<string, string | undefined> = process.env) {
  if (env.NODE_ENV === "production") throw new Error("QA refusée avec NODE_ENV=production.");
  if (env.QA_ENV !== "true") throw new Error("QA_ENV=true est obligatoire.");
  if (env.DATABASE_DRIVER !== "postgres") {
    throw new Error("DATABASE_DRIVER=postgres est obligatoire pour la QA locale.");
  }
  if (!env.DATABASE_URL) throw new Error("DATABASE_URL QA manquante.");

  const url = new URL(env.DATABASE_URL);
  if (!new Set(["localhost", "127.0.0.1", "::1"]).has(url.hostname)) {
    throw new Error("La QA refuse toute base qui n'est pas strictement locale.");
  }
  if (!url.pathname.toLowerCase().includes("qa")) {
    throw new Error("Le nom de la base locale doit contenir le marqueur qa.");
  }
  for (const name of ["QA_USER_EMAIL", "QA_USER_PASSWORD", "QA_FREE_USER_EMAIL", "QA_FREE_USER_PASSWORD"]) {
    if (!env[name]) throw new Error(`${name} est obligatoire.`);
  }
}

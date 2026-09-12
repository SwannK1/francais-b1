import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

/**
 * Postgres serverless (Neon) via son driver HTTP officiel — chaque requête
 * est un simple appel `fetch`, sans pool de connexions à gérer : c'est le
 * pattern recommandé pour des fonctions serverless Vercel (Node comme Edge),
 * là où une connexion TCP classique (`pg`) pose des problèmes de limite de
 * connexions concurrentes en environnement serverless.
 *
 * `getSql()` ne construit le client qu'à la première requête réellement
 * exécutée (jamais au chargement du module) : ainsi importer ce module —
 * via les layouts, `next build`, la génération statique — ne nécessite pas
 * `DATABASE_URL` et n'échoue jamais faute de secret. Seule une requête
 * effectivement exécutée sans variable d'environnement lève une erreur
 * explicite.
 */
export type SqlClient = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<unknown>;

let cached: SqlClient | null = null;

export function getSql(): SqlClient {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL manquant : configurez une base Postgres (voir .env.example) pour utiliser l'authentification."
    );
  }

  if (process.env.DATABASE_DRIVER === "postgres") {
    const local = postgres(url, { max: 5 });
    cached = (strings, ...values) => local(strings, ...values as never[]) as unknown as Promise<unknown>;
  } else {
    const remote = neon(url);
    cached = (strings, ...values) => remote(strings, ...values as never[]) as Promise<unknown>;
  }
  return cached;
}

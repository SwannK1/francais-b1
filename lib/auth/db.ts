import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

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
let cached: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL manquant : configurez une base Postgres (voir .env.example) pour utiliser l'authentification."
    );
  }

  cached = neon(url);
  return cached;
}

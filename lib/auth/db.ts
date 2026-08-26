import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Stockage SQLite embarqué (node:sqlite, natif depuis Node 22+, aucune
 * dépendance supplémentaire). Chemin configurable via `AUTH_DB_PATH` pour
 * pouvoir pointer vers un volume persistant en production — voir le rapport
 * du chantier auth pour la limite connue sur les plateformes serverless
 * (système de fichiers éphémère).
 */
const DB_PATH = process.env.AUTH_DB_PATH ?? "data/app.db";

function openDatabase(): DatabaseSync {
  const dir = dirname(DB_PATH);
  if (dir && dir !== "." && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const database = new DatabaseSync(DB_PATH);
  // `next build` collecte les pages depuis plusieurs workers qui ouvrent
  // chacun leur propre connexion au même fichier : sans busy_timeout, la
  // création concurrente des tables (CREATE TABLE IF NOT EXISTS) échoue
  // immédiatement avec "database is locked" au lieu d'attendre son tour.
  database.exec("PRAGMA busy_timeout = 5000;");
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      premium_until TEXT,
      stripe_customer_id TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      user_id TEXT PRIMARY KEY REFERENCES users(id),
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  // `premium_until`/`stripe_customer_id` sont arrivés après la première
  // version du schéma (chantier commerce) : sur une base déjà existante,
  // `CREATE TABLE IF NOT EXISTS` ne les ajoute pas — on complète ici,
  // silencieusement si elles existent déjà.
  for (const column of ["premium_until", "stripe_customer_id"]) {
    try {
      database.exec(`ALTER TABLE users ADD COLUMN ${column} TEXT`);
    } catch {
      // colonne déjà présente
    }
  }
  return database;
}

/**
 * Instance unique réutilisée entre les requêtes (module mis en cache par
 * Node en dev comme en prod pour un serveur long-lived). En Hot Module
 * Replacement de `next dev`, on la range sur `globalThis` pour éviter de
 * rouvrir le fichier à chaque rechargement de module.
 */
const globalForDb = globalThis as unknown as { __authDb?: DatabaseSync };

export const db = globalForDb.__authDb ?? openDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__authDb = db;
}

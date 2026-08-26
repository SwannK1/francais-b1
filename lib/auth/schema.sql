-- Schéma Postgres pour l'authentification et la persistance de progression.
--
-- À exécuter une fois, avant le premier déploiement, contre la base
-- pointée par DATABASE_URL : soit en collant ce fichier dans l'éditeur SQL
-- du tableau de bord Neon, soit via `npm run db:migrate` (voir scripts/migrate.mjs).
-- Toutes les instructions sont idempotentes (IF NOT EXISTS) : le rejouer ne
-- fait rien s'il a déjà été appliqué.

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

-- Progression pédagogique + tentatives d'examen (UserProgress.examAttempts)
-- stockées ensemble en JSONB, un seul document par utilisateur — même
-- modèle que côté client (localStorage), pas de redécoupage en tables
-- normalisées : ce n'est pas requêté par contenu, seulement lu/écrit en bloc
-- par utilisateur. Jamais de blob audio ici (voir lib/pedagogy/types.ts —
-- la production orale reste côté client, jamais envoyée automatiquement).
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Throttling des tentatives de connexion par email (voir lib/auth/rate-limit.ts).
-- Stocké en base, pas en mémoire process : une protection en mémoire ne
-- survivrait pas à un cold start ni ne serait partagée entre instances
-- serverless concurrentes, ce qui la rendrait inefficace en pratique.
CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS login_attempts_email_time_idx ON login_attempts(email, attempted_at);

import { getSql } from "@/lib/auth/db";
import type { UserProgress } from "@/lib/pedagogy/types";

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT data FROM user_progress WHERE user_id = ${userId}
  `) as { data: UserProgress }[];
  const row = rows[0];
  // `data` est JSONB : le driver le désérialise déjà en objet JS, pas de JSON.parse à faire.
  return row ? row.data : null;
}

/** Remplace intégralement la progression stockée pour cet utilisateur. */
export async function saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
  const data = JSON.stringify({ ...progress, userId });
  const sql = getSql();
  await sql`
    INSERT INTO user_progress (user_id, data, updated_at)
    VALUES (${userId}, ${data}::jsonb, now())
    ON CONFLICT (user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
  `;
}

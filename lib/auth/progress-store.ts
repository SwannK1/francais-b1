import { db } from "@/lib/auth/db";
import type { UserProgress } from "@/lib/pedagogy/types";

interface ProgressRow {
  data: string;
}

export function getUserProgress(userId: string): UserProgress | null {
  const row = db.prepare("SELECT data FROM user_progress WHERE user_id = ?").get(userId) as
    | ProgressRow
    | undefined;
  if (!row) return null;
  try {
    return JSON.parse(row.data) as UserProgress;
  } catch {
    return null;
  }
}

/** Remplace intégralement la progression stockée pour cet utilisateur. */
export function saveUserProgress(userId: string, progress: UserProgress): void {
  const data = JSON.stringify({ ...progress, userId });
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO user_progress (user_id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).run(userId, data, now);
}

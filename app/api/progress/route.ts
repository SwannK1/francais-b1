import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { getUserProgress, saveUserProgress } from "@/lib/auth/progress-store";
import type { UserProgress } from "@/lib/pedagogy/types";

/** Vérification de forme minimale — la validation métier vit dans `lib/pedagogy/logic`. */
function isUserProgressShape(value: unknown): value is UserProgress {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.moduleProgress) && Array.isArray(v.skillProgress) && Array.isArray(v.examAttempts);
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const progress = await getUserProgress(user.id);
  return NextResponse.json({ progress });
}

/** Remplace la progression stockée par celle envoyée — utilisé pour la synchro continue en arrière-plan. */
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!isUserProgressShape(body?.progress)) {
    return NextResponse.json({ error: "invalid_progress" }, { status: 400 });
  }

  // `user.id` (issu de la session serveur), jamais un id fourni par le client :
  // un utilisateur ne peut écrire que sa propre progression.
  await saveUserProgress(user.id, body.progress);
  return NextResponse.json({ ok: true });
}

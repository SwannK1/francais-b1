import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { getUserProgress, saveUserProgress } from "@/lib/auth/progress-store";
import { mergeUserProgress } from "@/lib/pedagogy/logic/progress";
import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import type { UserProgress } from "@/lib/pedagogy/types";

function isUserProgressShape(value: unknown): value is UserProgress {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.moduleProgress) && Array.isArray(v.skillProgress) && Array.isArray(v.examAttempts);
}

/**
 * Point d'entrée unique de la migration localStorage → compte (voir le
 * rapport du chantier auth pour la stratégie de conflit détaillée) :
 * - pas de progression locale envoyée → on renvoie simplement ce que le
 *   compte a déjà en base (ou une progression vide pour un compte neuf) ;
 * - progression locale envoyée + rien en base → elle devient la progression
 *   du compte tel quel ;
 * - les deux existent → fusion par union (voir `mergeUserProgress`), jamais
 *   de perte ni de doublon (idempotent, peut être rappelée sans risque).
 */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const localProgress = isUserProgressShape(body?.progress) ? body.progress : null;
  const remoteProgress = await getUserProgress(user.id);

  let merged: UserProgress;
  if (localProgress && remoteProgress) {
    merged = mergeUserProgress(localProgress, remoteProgress);
  } else if (localProgress) {
    merged = { ...localProgress, userId: user.id };
  } else if (remoteProgress) {
    merged = remoteProgress;
  } else {
    merged = { ...EMPTY_USER_PROGRESS, userId: user.id };
  }

  await saveUserProgress(user.id, merged);
  return NextResponse.json({ progress: merged });
}

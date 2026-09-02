import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { getUserProgress, saveUserProgress } from "@/lib/auth/progress-store";
import { mergeUserProgress } from "@/lib/pedagogy/logic/progress";
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

/**
 * Fusionne avec la progression déjà en base plutôt que de l'écraser —
 * utilisé pour la synchro continue en arrière-plan (`useProgress.ts`,
 * debounce 800 ms). Un simple remplacement perdrait silencieusement la
 * progression d'un autre appareil connecté au même compte en parallèle : cet
 * appareil-ci n'a que sa propre vue locale, qui peut être en retard sur ce
 * qu'un autre appareil vient d'écrire entre-temps. `mergeUserProgress` est
 * une union pure (déjà utilisée à la connexion pour le même problème) :
 * rejouer un envoi de cet appareil ne peut jamais faire régresser ce que la
 * base contient déjà.
 */
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!isUserProgressShape(body?.progress)) {
    return NextResponse.json({ error: "invalid_progress" }, { status: 400 });
  }

  // `user.id` (issu de la session serveur), jamais un id fourni par le client :
  // un utilisateur ne peut écrire que sa propre progression.
  const remote = await getUserProgress(user.id);
  const merged = remote ? mergeUserProgress(body.progress, remote) : { ...body.progress, userId: user.id };
  await saveUserProgress(user.id, merged);
  return NextResponse.json({ ok: true });
}

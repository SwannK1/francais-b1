import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { canAccess } from "@/lib/commerce/access";
import { logServerError } from "@/lib/observability/log";
import { MODULES } from "@/lib/pedagogy/data/modules";
import type { Exercise, Module } from "@/lib/pedagogy/types";

/**
 * Livre le contenu réel (un exercice par compétence) pour la mini-séance de
 * révision de `/reviser` — jamais un second moteur d'exercices : même
 * catalogue (`MODULES`), même vérification d'accès (`canAccess`) que
 * `/parcours/module/[slug]` et `/parcours/seance`. `ReviserExperience` (client)
 * ne connaît que `PUBLIC_MODULES` (métadonnées, sans contenu) — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary — donc le
 * choix de "quoi réviser" reste client (compétences dues, déjà calculées
 * depuis la progression locale), mais la livraison du contenu passe
 * toujours par une vérification serveur. Une compétence dont le module est
 * verrouillé est silencieusement omise (jamais un mur payant au milieu
 * d'une séance) — le client complète la séance avec le nombre d'éléments
 * réellement obtenus.
 */
const MAX_SESSION_ITEMS = 10;

function findExerciseForSkill(mod: Module, skillId: string): Exercise | undefined {
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      const exercise = activity.exercises.find((ex) => ex.skillId === skillId);
      if (exercise) return exercise;
    }
  }
  return undefined;
}

/** Premier module du catalogue complet contenant un exercice de cette compétence, et cet exercice. */
function findModuleAndExercise(skillId: string): { module: Module; exercise: Exercise } | null {
  for (const mod of MODULES) {
    const exercise = findExerciseForSkill(mod, skillId);
    if (exercise) return { module: mod, exercise };
  }
  return null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const skillIds = Array.isArray(body?.skillIds)
    ? body.skillIds.filter((value: unknown): value is string => typeof value === "string")
    : [];

  if (skillIds.length === 0) {
    return NextResponse.json({ items: [] });
  }

  try {
    // Fonctionne aussi hors connexion à un compte (l'app marche sans compte,
    // voir lib/pedagogy/useProgress.ts) : `user` peut être `null`, `canAccess`
    // traite alors la ressource comme non-premium, exactement comme
    // `/parcours/module/[slug]` pour un visiteur anonyme.
    const user = await getCurrentUser();
    const items: { skillId: string; module: Module; exercise: Exercise }[] = [];

    for (const skillId of skillIds.slice(0, MAX_SESSION_ITEMS)) {
      const found = findModuleAndExercise(skillId);
      if (!found) continue;
      const isAccessible = canAccess({ kind: "module", slug: found.module.slug }, user?.premiumUntil);
      if (!isAccessible) continue;
      items.push({ skillId, module: found.module, exercise: found.exercise });
    }

    return NextResponse.json({ items });
  } catch (error) {
    logServerError("review.session", error);
    return NextResponse.json({ error: "review_session_unavailable" }, { status: 500 });
  }
}

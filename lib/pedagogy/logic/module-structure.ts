import type { Exercise, Module } from "@/lib/pedagogy/types";

/**
 * Pure, sans dépendance à `data/modules.ts` : opère uniquement sur le `mod`
 * déjà reçu en paramètre (donc déjà autorisé par l'appelant), jamais sur le
 * catalogue global. Volontairement séparé de `data/modules.ts` — un
 * composant (client compris) qui n'a besoin que de ces fonctions ne doit
 * jamais avoir à importer le fichier qui contient aussi `MODULES` (contenu
 * intégral) pour les obtenir. Voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */

export function findExerciseInModule(mod: Module, exerciseId: string): Exercise | undefined {
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      const exercise = activity.exercises.find((e) => e.id === exerciseId);
      if (exercise) return exercise;
    }
  }
  return undefined;
}

export function countModuleExercises(mod: Module): number {
  return mod.lessons.reduce(
    (total, lesson) => total + lesson.activities.reduce((sum, activity) => sum + activity.exercises.length, 0),
    0
  );
}

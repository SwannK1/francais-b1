#!/usr/bin/env node
// Génère lib/pedagogy/data/modules-public.generated.ts — une copie allégée
// de MODULES (métadonnées de navigation seulement, jamais le contenu des
// exercices ni leurs réponses) qui ne dépend d'AUCUN import vers
// data/modules.ts. C'est ce qui rend le fichier généré sûr à importer depuis
// du code client : contrairement à une dérivation calculée à l'exécution
// (`PUBLIC_MODULES = MODULES.map(...)`), qui obligerait le bundler à inclure
// le contenu intégral dans le bundle navigateur juste pour produire le
// résultat allégé, ce fichier contient directement le résultat déjà réduit —
// il n'y a tout simplement rien à retirer par tree-shaking, le contenu
// protégé n'a jamais été présent dans son code source.
//
// À relancer après toute modification de lib/pedagogy/data/modules.ts :
//   npm run generate:public-modules
// lib/pedagogy/data/modules-public.test.ts échoue si le fichier généré n'est
// plus synchronisé avec la source.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { MODULES } = await import("@/lib/pedagogy/data/modules.ts");

function toPublicModule(mod) {
  const lessons = mod.lessons.map((lesson) => {
    const activities = lesson.activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      skillDomain: activity.skillDomain,
      exercises: activity.exercises.map((exercise) => ({
        id: exercise.id,
        type: exercise.type,
        skillId: exercise.skillId,
        difficulty: exercise.difficulty,
      })),
    }));
    return { id: lesson.id, type: lesson.type, title: lesson.title, optional: lesson.optional, activities };
  });

  const totalExercises = lessons.reduce(
    (sum, lesson) => sum + lesson.activities.reduce((s, a) => s + a.exercises.length, 0),
    0
  );

  return {
    id: mod.id,
    slug: mod.slug,
    level: mod.level,
    title: mod.title,
    description: mod.description,
    objectives: mod.objectives,
    domain: mod.domain,
    stageId: mod.stageId,
    estimatedMinutes: mod.estimatedMinutes,
    lessons,
    totalExercises,
  };
}

const publicModules = MODULES.map(toPublicModule);

const header = `// Fichier généré — NE PAS ÉDITER À LA MAIN.
// Source : lib/pedagogy/data/modules.ts, via \`npm run generate:public-modules\`
// (scripts/generate-public-modules.mjs). Volontairement sans aucun import
// vers data/modules.ts : c'est ce qui garantit que ce fichier est sûr à
// importer depuis du code client — voir lib/pedagogy/data/modules-public.ts
// et docs/architecture/user-lifecycle.md § Premium content boundary.
import type { PublicModule } from "@/lib/pedagogy/types";

export const PUBLIC_MODULES: PublicModule[] = `;

const body = JSON.stringify(publicModules, null, 2);
const outPath = path.join(import.meta.dirname, "..", "lib/pedagogy/data/modules-public.generated.ts");
writeFileSync(outPath, `${header}${body};\n`, "utf8");

console.log(`✓ ${publicModules.length} modules -> ${path.relative(process.cwd(), outPath)}`);

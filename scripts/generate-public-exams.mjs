#!/usr/bin/env node
// Génère lib/pedagogy/data/exams-public.generated.ts — une copie allégée
// d'EXAMS (métadonnées de liste/lien seulement, jamais les sections, leurs
// exercices ni les réponses attendues) qui ne dépend d'AUCUN import vers
// data/exams.ts. Même principe que generate-public-modules.mjs pour
// data/modules.ts : le fichier généré contient directement le résultat déjà
// réduit, il n'y a rien à retirer par tree-shaking pour qu'il soit sûr à
// importer depuis du code client.
//
// À relancer après toute modification de lib/pedagogy/data/exams.ts :
//   npm run generate:public-exams
// lib/pedagogy/data/exams-public.test.ts échoue si le fichier généré n'est
// plus synchronisé avec la source.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { EXAMS } = await import("@/lib/pedagogy/data/exams.ts");

function toExamSummary(exam) {
  return {
    id: exam.id,
    slug: exam.slug,
    title: exam.title,
    type: exam.type,
    level: exam.level,
    description: exam.description,
    durationMinutes: exam.durationMinutes,
    maxScore: exam.maxScore,
    passingScore: exam.passingScore,
    isBlanc: exam.isBlanc,
  };
}

const publicExams = EXAMS.map(toExamSummary);

const header = `// Fichier généré — NE PAS ÉDITER À LA MAIN.
// Source : lib/pedagogy/data/exams.ts, via \`npm run generate:public-exams\`
// (scripts/generate-public-exams.mjs). Volontairement sans aucun import vers
// data/exams.ts : c'est ce qui garantit que ce fichier est sûr à importer
// depuis du code client — voir lib/pedagogy/data/exams-public.ts et
// docs/architecture/user-lifecycle.md § Premium content boundary.
import type { ExamSummary } from "@/lib/pedagogy/types";

export const PUBLIC_EXAMS: ExamSummary[] = `;

const body = JSON.stringify(publicExams, null, 2);
const outPath = path.join(import.meta.dirname, "..", "lib/pedagogy/data/exams-public.generated.ts");
writeFileSync(outPath, `${header}${body};\n`, "utf8");

console.log(`✓ ${publicExams.length} examens -> ${path.relative(process.cwd(), outPath)}`);

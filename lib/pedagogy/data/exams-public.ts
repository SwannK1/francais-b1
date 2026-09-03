import { PUBLIC_EXAMS } from "@/lib/pedagogy/data/exams-public.generated";
import type { ExamSummary } from "@/lib/pedagogy/types";

/**
 * API stable au-dessus des données générées (`exams-public.generated.ts`,
 * voir `scripts/generate-public-exams.mjs`) — jamais d'import vers
 * `data/exams.ts` ici, c'est ce qui rend ce fichier sûr à importer depuis
 * du code client. Voir `docs/architecture/user-lifecycle.md` §
 * Premium content boundary.
 */
export { PUBLIC_EXAMS };

export function getPublicExamById(id: string): ExamSummary | undefined {
  return PUBLIC_EXAMS.find((exam) => exam.id === id);
}

export function getPublicExamBySlug(slug: string): ExamSummary | undefined {
  return PUBLIC_EXAMS.find((exam) => exam.slug === slug);
}

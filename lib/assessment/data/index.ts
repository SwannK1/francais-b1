import { FIN_A1 } from "@/lib/assessment/data/fin-a1";
import { PASSAGE_A1_A2 } from "@/lib/assessment/data/passage-a1-a2";
import { FIN_A2 } from "@/lib/assessment/data/fin-a2";
import { PASSAGE_A2_B1 } from "@/lib/assessment/data/passage-a2-b1";
import type { AssessmentDefinition } from "@/lib/assessment/types";

/**
 * Contenu intégral des 4 évaluations de passage — réponses comprises.
 * Réservé au code serveur (voir `types.ts` § Frontière contenu
 * public/protégé) : seules les pages Server Component de
 * `app/(pedagogie)/parcours/evaluations/` doivent l'importer, après
 * vérification `canAccess()`.
 */
export const ASSESSMENTS: AssessmentDefinition[] = [FIN_A1, PASSAGE_A1_A2, FIN_A2, PASSAGE_A2_B1];

export function getAssessmentBySlug(slug: string): AssessmentDefinition | undefined {
  return ASSESSMENTS.find((assessment) => assessment.slug === slug);
}

export function getAssessmentById(id: string): AssessmentDefinition | undefined {
  return ASSESSMENTS.find((assessment) => assessment.id === id);
}

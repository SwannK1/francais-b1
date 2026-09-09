import type { AssessmentDefinition, AssessmentDimension } from "@/lib/assessment/types";
import type { Question } from "@/lib/pedagogy/types";

export interface FlatAssessmentQuestion {
  id: string;
  dimension: Exclude<AssessmentDimension, "production_guidee">;
  question: Question;
}

/**
 * Aplatit les 4 dimensions notées automatiquement (`production_guidee` en
 * est volontairement exclue — jamais notée, voir `types.ts`) en une liste
 * d'items adressables individuellement par leur `id` de sous-question.
 * Utilisée à la fois pour le rendu (une question à la fois côté UI) et pour
 * le calcul du score (`scoring.ts`), pour ne jamais faire dépendre le
 * comptage par dimension d'une deuxième source de vérité.
 */
export function flattenAssessmentQuestions(definition: AssessmentDefinition): FlatAssessmentQuestion[] {
  const items: FlatAssessmentQuestion[] = [];

  for (const item of definition.reading) {
    for (const question of item.questions) {
      items.push({ id: question.id, dimension: "comprehension_ecrite", question });
    }
  }
  for (const item of definition.listening) {
    for (const question of item.questions) {
      items.push({ id: question.id, dimension: "comprehension_orale", question });
    }
  }
  for (const item of definition.vocabulary) {
    items.push({ id: item.question.id, dimension: "vocabulaire", question: item.question });
  }
  for (const item of definition.grammar) {
    items.push({ id: item.question.id, dimension: "grammaire", question: item.question });
  }

  return items;
}

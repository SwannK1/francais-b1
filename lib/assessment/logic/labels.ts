import type { AssessmentDimension, CheckpointId } from "@/lib/assessment/types";

/** Libellés FR des dimensions évaluées. Données statiques, pas de logique. */
export const ASSESSMENT_DIMENSION_LABELS: Record<AssessmentDimension, string> = {
  comprehension_ecrite: "Compréhension écrite",
  vocabulaire: "Vocabulaire",
  grammaire: "Grammaire",
  comprehension_orale: "Compréhension orale",
  production_guidee: "Production guidée",
};

export const CHECKPOINT_LABELS: Record<CheckpointId, string> = {
  "fin-a1": "Bilan de fin A1",
  "passage-a1-a2": "Passage A1 → A2",
  "fin-a2": "Bilan de fin A2",
  "passage-a2-b1": "Passage A2 → B1",
};

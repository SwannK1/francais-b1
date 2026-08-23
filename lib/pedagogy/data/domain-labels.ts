import type { SkillDomain } from "@/lib/pedagogy/types";

/** Libellés FR affichés pour chaque `SkillDomain`. Données statiques, pas de logique. */
export const DOMAIN_LABELS: Record<SkillDomain, string> = {
  comprehension_ecrite: "Compréhension écrite",
  comprehension_orale: "Compréhension orale",
  grammaire: "Grammaire",
  vocabulaire: "Vocabulaire",
  production_ecrite: "Production écrite",
  preparation_examen: "Préparation examen",
};

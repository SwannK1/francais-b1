import type { DelfSection, SkillDomain } from "@/lib/pedagogy/types";

/** Libellés FR affichés pour chaque `SkillDomain`. Données statiques, pas de logique. */
export const DOMAIN_LABELS: Record<SkillDomain, string> = {
  comprehension_ecrite: "Compréhension écrite",
  comprehension_orale: "Compréhension orale",
  grammaire: "Grammaire",
  vocabulaire: "Vocabulaire",
  production_ecrite: "Production écrite",
  preparation_examen: "Préparation examen",
};

/** Libellés FR des 4 épreuves DELF. Source unique — ne pas redéfinir localement dans un composant. */
export const DELF_SECTION_LABELS: Record<DelfSection, string> = {
  comprehension_orale: "Compréhension orale",
  comprehension_ecrite: "Compréhension écrite",
  production_ecrite: "Production écrite",
  production_orale: "Production orale",
};

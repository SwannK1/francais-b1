import { MODULES_A1_DECOUVERTE } from "@/lib/pedagogy/data/a1/modules/decouverte";
import { MODULES_A1_VIE_QUOTIDIENNE } from "@/lib/pedagogy/data/a1/modules/vie-quotidienne";
import { MODULES_A1_SORTIR_ET_BOUGER } from "@/lib/pedagogy/data/a1/modules/sortir-et-bouger";
import { MODULES_A1_QUOTIDIEN_ET_LOISIRS } from "@/lib/pedagogy/data/a1/modules/quotidien-et-loisirs";
import { MODULES_A1_BILANS } from "@/lib/pedagogy/data/a1/modules/bilans";
import { MODULES_A1_PREPARATION_EXAMEN } from "@/lib/pedagogy/data/a1/modules/preparation-examen";
import { MODULES_A1_BILAN_FINAL } from "@/lib/pedagogy/data/a1/modules/bilan-final";
import type { A1Module } from "@/lib/pedagogy/data/a1/types";

/**
 * Catalogue complet des modules A1 — équivalent de `MODULES` (B1) mais tenu
 * à l'écart de `lib/pedagogy/data/modules.ts`/`data/index.ts` pour l'isolation
 * du chantier (voir `lib/pedagogy/data/a1/types.ts` et
 * `docs/integration/a1-content.md`). Regroupé ici par étape, dans l'ordre de
 * progression du parcours : découverte → vie quotidienne (+ bilan 1) →
 * sortir et bouger (+ bilan 2) → quotidien/travail/loisirs (+ bilan 3) →
 * préparation examen → bilan final.
 *
 * ⚠️ Comme `MODULES` (B1), ce module porte le contenu pédagogique intégral
 * (réponses comprises) : jamais à importer depuis un composant `"use
 * client"`. Voir `docs/architecture/user-lifecycle.md` § Premium content
 * boundary — la même règle s'appliquera à ce fichier une fois intégré.
 */
export const MODULES_A1: A1Module[] = [
  ...MODULES_A1_DECOUVERTE,
  ...MODULES_A1_VIE_QUOTIDIENNE,
  ...MODULES_A1_BILANS.filter((m) => m.id === "a1-bilan-intermediaire-1"),
  ...MODULES_A1_SORTIR_ET_BOUGER,
  ...MODULES_A1_BILANS.filter((m) => m.id === "a1-bilan-intermediaire-2"),
  ...MODULES_A1_QUOTIDIEN_ET_LOISIRS,
  ...MODULES_A1_BILANS.filter((m) => m.id === "a1-bilan-intermediaire-3"),
  ...MODULES_A1_PREPARATION_EXAMEN,
  ...MODULES_A1_BILAN_FINAL,
];

export function getA1ModuleBySlug(slug: string): A1Module | undefined {
  return MODULES_A1.find((mod) => mod.slug === slug);
}

export function getA1ModulesByStage(stageId: A1Module["stageId"]): A1Module[] {
  return MODULES_A1.filter((mod) => mod.stageId === stageId);
}

import { MODULES_A2_PART1 } from "@/lib/pedagogy/data/modules-a2-part1";
import { MODULES_A2_PART2 } from "@/lib/pedagogy/data/modules-a2-part2";
import { MODULES_A2_PART3 } from "@/lib/pedagogy/data/modules-a2-part3";
import { MODULE_A2_BANQUE_ECOUTE } from "@/lib/pedagogy/data/modules-a2-banque-ecoute";
import type { Module } from "@/lib/pedagogy/types";

/**
 * Point d'entrée du contenu A2 — fusionné dans `data/modules.ts` (`MODULES`)
 * depuis `chantier/integration-a1-a2-b1`, voir
 * `docs/integration/a1-a2-b1-integration.md`. Contenu réparti en 3 fichiers
 * par phase (`modules-a2-part1/2/3.ts`, ~8/8/6 modules) pour rester lisible
 * et éditable, plus le module « banque d'écoute » (pistes audio A2 non
 * rattachées à un exercice gradé) ; `MODULES_A2` est la concaténation dans
 * l'ordre du programme (`docs/a2/curriculum.md`).
 *
 * ⚠️ SERVEUR UNIQUEMENT, même règle que `data/modules.ts` : porte le contenu
 * pédagogique intégral (réponses comprises). Jamais importé — même
 * indirectement — par un composant `"use client"`. Voir
 * `data/modules-public.ts` (vue fusionnée A1+A2+B1) pour la vue publique
 * sûre côté client.
 */
export const MODULES_A2: Module[] = [
  ...MODULES_A2_PART1,
  ...MODULES_A2_PART2,
  ...MODULES_A2_PART3,
  MODULE_A2_BANQUE_ECOUTE,
];

export function getModuleBySlugA2(slug: string): Module | undefined {
  return MODULES_A2.find((mod) => mod.slug === slug);
}

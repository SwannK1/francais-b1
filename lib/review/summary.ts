import { classifySkillState } from "./engine";
import type { ReviewHistoryEntry, ReviewState } from "./types";

/**
 * Regroupe les 5 états fins du moteur (`ReviewState`) en 3 catégories
 * pédagogiques compréhensibles pour l'apprenant — aucune nouvelle règle de
 * classification, seulement un regroupement d'états déjà calculés par
 * `classifySkillState`. Source unique utilisée par `/progression` (compte
 * global) et `/reviser` (retour immédiat pendant une séance) — jamais deux
 * définitions de ce qu'"acquis"/"à consolider"/"à revoir" signifie :
 * - `maitrisee` -> Acquis / Maîtrisé.
 * - `en_apprentissage` -> À consolider (en cours, pas encore fiable).
 * - `fragile` et `a_revoir` -> À revoir (les deux représentent un vrai
 *   problème actuel : série d'erreurs / effondrement récent pour `fragile`,
 *   erreur isolée / maîtrise éventée / laissé de côté pour `a_revoir`).
 * - `nouvelle` (jamais pratiquée) est exclu : rien à classer encore.
 */
export type MasteryBucket = "acquis" | "aConsolider" | "aRevoir";

export function bucketForState(state: ReviewState): MasteryBucket | null {
  if (state === "maitrisee") return "acquis";
  if (state === "en_apprentissage") return "aConsolider";
  if (state === "fragile" || state === "a_revoir") return "aRevoir";
  return null; // "nouvelle" : rien à classer encore.
}

export interface MasterySummary {
  acquis: number;
  aConsolider: number;
  aRevoir: number;
  total: number;
}

export function summarizeMastery(entries: ReviewHistoryEntry[], now: Date = new Date()): MasterySummary {
  let acquis = 0;
  let aConsolider = 0;
  let aRevoir = 0;

  for (const entry of entries) {
    const bucket = bucketForState(classifySkillState(entry, now));
    if (bucket === "acquis") acquis++;
    else if (bucket === "aConsolider") aConsolider++;
    else if (bucket === "aRevoir") aRevoir++;
  }

  return { acquis, aConsolider, aRevoir, total: acquis + aConsolider + aRevoir };
}

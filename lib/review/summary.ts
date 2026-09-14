import { classifySkillState } from "./engine";
import type { ReviewHistoryEntry } from "./types";

/**
 * Regroupe les 5 états fins du moteur (`ReviewState`) en 3 catégories
 * compréhensibles pour l'apprenant sur `/progression` — aucune nouvelle
 * règle de classification, seulement un regroupement d'états déjà calculés
 * par `classifySkillState` :
 * - `maitrisee` -> Acquis.
 * - `en_apprentissage` -> À consolider (en cours, pas encore fiable).
 * - `fragile` et `a_revoir` -> À revoir (les deux représentent un vrai
 *   problème actuel : série d'erreurs / effondrement récent pour `fragile`,
 *   erreur isolée / maîtrise éventée / laissé de côté pour `a_revoir`).
 * - `nouvelle` (jamais pratiquée) est exclu : rien à classer encore.
 */
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
    switch (classifySkillState(entry, now)) {
      case "maitrisee":
        acquis++;
        break;
      case "en_apprentissage":
        aConsolider++;
        break;
      case "fragile":
      case "a_revoir":
        aRevoir++;
        break;
      default:
        break;
    }
  }

  return { acquis, aConsolider, aRevoir, total: acquis + aConsolider + aRevoir };
}

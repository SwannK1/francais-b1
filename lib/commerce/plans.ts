/**
 * Source de vérité unique pour l'offre commerciale. Une seule offre payante
 * volontairement (voir rapport du chantier commerce) : la Pricing marketing,
 * la page /offre et le checkout lisent toutes ce fichier plutôt que de
 * dupliquer prix/fonctionnalités à plusieurs endroits.
 */

export interface Plan {
  id: string;
  name: string;
  priceLabel: string;
  interval: "mois";
  tagline: string;
  features: string[];
  ctaLabel: string;
}

export const MAIN_PLAN: Plan = {
  id: "acces-complet",
  name: "Accès complet",
  priceLabel: "9,99 €",
  interval: "mois",
  tagline: "Sans engagement, résiliable à tout moment.",
  features: [
    "Le parcours complet, des dizaines de modules du niveau A1 au niveau B1 (grammaire, vocabulaire, compréhension, production)",
    "Tous les audios de compréhension orale, à chaque niveau",
    "Productions écrites avec grille d'auto-évaluation détaillée",
    "Pratique orale guidée et évaluations pour passer au niveau suivant",
    "Des examens blancs DELF A2 et B1, et une évaluation finale A1, en conditions réelles",
    "Suivi de ta progression et recommandation de séance du jour",
  ],
  ctaLabel: "Passer à l'accès complet",
};

/**
 * La découverte gratuite ouvre un vrai module à chaque niveau (A1, A2, B1 —
 * voir `FREE_MODULE_SLUGS`, lib/commerce/access.ts) : « une vraie séance à
 * ton niveau » est donc exact quel que soit le résultat du test.
 */
export const FREE_PLAN_FEATURES: string[] = [
  "Test de niveau et bilan approfondi (A1 à B2)",
  "Une vraie séance à ton niveau, en A1, A2 ou B1",
  "Des exercices d'oral pour essayer la pratique",
  "Aperçu de ta progression",
];

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
    "Les 26 modules du parcours B1 (grammaire, vocabulaire, compréhension, production)",
    "Tous les audios de compréhension orale",
    "Productions écrites avec grille de correction détaillée",
    "Examens blancs DELF B1 complets, en conditions réelles",
    "Suivi de ta progression et recommandation de séance du jour",
  ],
  ctaLabel: "Passer à l'accès complet",
};

export const FREE_PLAN_FEATURES: string[] = [
  "Test de positionnement (niveau estimé A1 à B2)",
  "2 modules B1 complets pour essayer la méthode",
  "Aperçu de ta progression",
];

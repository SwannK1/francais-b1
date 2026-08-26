/**
 * Modalités officielles du DELF B1 (France Éducation International),
 * retenues comme référence pour construire un examen blanc fidèle.
 *
 * Vérifiées le 2026-08-26 via recherche web (le site officiel
 * france-education-international.fr a bloqué l'accès automatisé au moment
 * de la vérification — ERR-BOT-403) auprès de sources secondaires
 * spécialisées FLE, cohérentes entre elles et avec le format DELF tout
 * public largement documenté :
 * - https://www.digischool.fr/articles/fle/deroulement-examen-delf/
 * - https://www.digischool.fr/articles/fle/production-orale-delf-b1-b2/
 * - https://frenchpill.com/tout-savoir-sur-la-production-ecrite-delf-b1/
 *
 * Centralisé ici plutôt que dispersé : toute donnée d'examen DELF B1
 * (durée, barème, seuils) doit lire ces constantes, jamais un nombre
 * magique recopié dans un composant ou un fichier de données.
 */
export const DELF_B1_REFERENCE = {
  maxScorePerSection: 25,
  maxScoreTotal: 100,
  passingScoreTotal: 50,
  /** Note en dessous de laquelle une épreuve est éliminatoire, quelle que soit la moyenne. */
  eliminatoryScorePerSection: 5,

  comprehensionOrale: {
    durationMinutes: 25,
    /** 2 à 3 documents selon les sessions ; audios courts (max ~6 min), généralement 2 écoutes. */
    listensPerDocument: 2,
  },
  comprehensionEcrite: {
    durationMinutes: 35,
    documentCount: 2,
  },
  productionEcrite: {
    durationMinutes: 45,
    minWords: 160,
  },
  productionOrale: {
    /** Uniquement pour la 3e partie (expression d'un point de vue) — les 2 premières ne sont pas préparées. */
    prepMinutesPart3: 10,
    parts: [
      { name: "Entretien dirigé", durationMinutesRange: "2 à 3", prepared: false },
      { name: "Exercice en interaction", durationMinutesRange: "3 à 4", prepared: false },
      { name: "Expression d'un point de vue", durationMinutesRange: "5 à 7", prepared: true },
    ],
  },
} as const;

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
 * - https://www.digischool.fr/articles/fle/comprehension-orale-ecrite-delf/
 * - https://frenchpill.com/tout-savoir-sur-la-production-ecrite-delf-b1/
 * - https://frenchpill.com/en/comprehension-ecrite-delf-b1-methode/
 *
 * IMPORTANT — réforme des épreuves de compréhension (généralisée depuis 2024,
 * donc déjà en vigueur pour toutes les sessions à la date de vérification) :
 * les questions ouvertes et vrai/faux ont disparu au profit d'un format
 * 100% QCM pour la compréhension orale et écrite (A1 à B2), et l'épreuve de
 * compréhension écrite a été allongée de 10 minutes en conséquence (35 → 45
 * min). Cette source secondaire n'a pas pu être recoupée avec le site
 * officiel (bloqué) : à revalider dès que l'accès direct est possible.
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
    /** Depuis la réforme : 3 documents (un dialogue de vie courante, deux documents de type radiophonique), généralement 2 écoutes, format 100% QCM. */
    documentCount: 3,
    listensPerDocument: 2,
    questionFormat: "qcm" as const,
  },
  comprehensionEcrite: {
    /** 35 min avant la réforme des épreuves de compréhension ; 45 min depuis (allongement lié au passage au 100% QCM). */
    durationMinutes: 45,
    documentCount: 2,
    questionFormat: "qcm" as const,
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

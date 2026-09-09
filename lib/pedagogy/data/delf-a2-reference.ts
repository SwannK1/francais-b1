/**
 * Modalités officielles du DELF A2 (France Éducation International),
 * retenues comme référence pour construire un examen blanc fidèle.
 *
 * Vérifiées le 2026-09-05 via recherche web (le site officiel
 * france-education-international.fr documente le manuel du candidat, mais
 * les chiffres ci-dessous sont recoupés avec une source secondaire
 * spécialisée FLE largement cohérente avec le format DELF tout public
 * documenté par ailleurs) :
 * - https://www.digischool.fr/articles/fle/presentation-delf-a2/
 * - https://www.france-education-international.fr/document/manuel-candidat-delf-a2
 *
 * Format retenu : les 3 épreuves collectives (compréhension de l'oral,
 * compréhension des écrits, production écrite) durent 1h40 au total ; la
 * production orale est individuelle, 10 minutes de préparation puis 6 à 8
 * minutes de passation. Comme pour le B1 (voir `delf-b1-reference.ts`), le
 * détail précis du nombre de documents par épreuve varie selon la session
 * ("format 1"/"format 2" en circulation) : les valeurs ci-dessous
 * retiennent la configuration la plus documentée, à revalider dès qu'un
 * accès direct au site officiel est possible.
 *
 * Centralisé ici plutôt que dispersé : toute donnée d'examen DELF A2
 * (durée, barème, seuils) doit lire ces constantes, jamais un nombre
 * magique recopié dans un composant ou un fichier de données.
 */
export const DELF_A2_REFERENCE = {
  maxScorePerSection: 25,
  maxScoreTotal: 100,
  passingScoreTotal: 50,
  /** Note en dessous de laquelle une épreuve est éliminatoire, quelle que soit la moyenne. */
  eliminatoryScorePerSection: 5,

  comprehensionOrale: {
    durationMinutes: 25,
    /** 4 courts documents de vie quotidienne (annonces, messages, dialogues), généralement 2 écoutes, format 100% QCM. */
    documentCount: 4,
    listensPerDocument: 2,
    questionFormat: "qcm" as const,
  },
  comprehensionEcrite: {
    durationMinutes: 30,
    documentCount: 4,
    questionFormat: "qcm" as const,
  },
  productionEcrite: {
    durationMinutes: 45,
    /** 2 exercices courts (ex. décrire un événement/rédiger un message ; raconter une expérience). */
    minWords: 60,
  },
  productionOrale: {
    prepMinutes: 10,
    parts: [
      { name: "Entretien dirigé", durationMinutesRange: "1 à 2", prepared: false },
      { name: "Monologue suivi", durationMinutesRange: "2", prepared: true },
      { name: "Exercice en interaction (jeu de rôle)", durationMinutesRange: "3 à 4", prepared: true },
    ],
  },
} as const;

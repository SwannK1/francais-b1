/**
 * Taxonomie « situations de vie » — une couche de métadonnées pour relire le
 * catalogue existant par situation réelle (logement, santé, travail...),
 * jamais une nouvelle bibliothèque de cours : aucun exercice n'est recopié,
 * chaque situation ne fait que référencer des modules (`Module.slug`) et des
 * exercices oraux (`SpeakingExercise.id`) qui existent déjà.
 *
 * Affectation explicite, même principe que `Module.stageId` : jamais déduite
 * d'un titre ou d'un mot-clé. Un module peut appartenir à plusieurs
 * situations quand c'est justifié (ex. « Prévenir d'une absence au travail »
 * relève du travail, pas de la santé). Les modules purement grammaticaux,
 * d'examen ou de bilan n'appartiennent à aucune situation — c'est voulu.
 * `life-situations.test.ts` vérifie que chaque référence existe.
 *
 * Voyage : trop peu de contenu pour une situation à part entière (2 modules),
 * regroupé avec la mobilité ; idem pour l'école, rattachée à la famille.
 */
export type LifeSituationId =
  | "logement"
  | "sante"
  | "travail"
  | "administration"
  | "mobilite"
  | "achats"
  | "argent-services"
  | "vie-sociale"
  | "ecole-famille";

export interface LifeSituation {
  id: LifeSituationId;
  title: string;
  /** Phrase courte, simple, orientée « ce que tu pourras faire ». */
  promise: string;
  /** Modules du catalogue, dans l'ordre de difficulté (A1 → B1). */
  moduleSlugs: string[];
  /** Exercices de la zone Pratiquer (`lib/speaking/data/exercises.ts`). */
  speakingExerciseIds: string[];
}

export const LIFE_SITUATIONS: LifeSituation[] = [
  {
    id: "logement",
    title: "Logement",
    promise: "Chercher un logement, parler au propriétaire, signaler une panne.",
    moduleSlugs: [
      "ma-maison",
      "chercher-un-logement-a2",
      "decrire-son-logement-et-un-probleme",
      "chercher-un-logement",
      "discuter-avec-un-proprietaire",
      "signaler-une-panne-logement",
    ],
    speakingExerciseIds: ["lecture-annonce", "situation-expliquer-probleme"],
  },
  {
    id: "sante",
    title: "Santé",
    promise: "Expliquer ce qui ne va pas, comprendre le médecin et le pharmacien.",
    moduleSlugs: [
      "la-sante",
      "aller-a-la-pharmacie-et-chez-le-medecin",
      "aller-chez-le-medecin",
      "comprendre-instructions-pharmacien",
    ],
    speakingExerciseIds: [],
  },
  {
    id: "travail",
    title: "Travail",
    promise: "Parler de ton métier, chercher un emploi, prévenir d'une absence.",
    moduleSlugs: [
      "travail-et-etudes",
      "parler-de-son-travail",
      "chercher-un-emploi-simplement",
      "parler-de-ses-etudes",
      "parler-de-son-travail-et-projets",
      "rechercher-un-emploi",
      "prevenir-absence-travail",
      "se-renseigner-formation",
    ],
    speakingExerciseIds: ["mini-reponse-projet"],
  },
  {
    id: "administration",
    title: "Administration",
    promise: "Comprendre un courrier, expliquer ta situation à un guichet.",
    moduleSlugs: [
      "nombres-et-age",
      "comprendre-un-courrier-simple",
      "comprendre-une-demarche-administrative",
      "expliquer-situation-guichet",
    ],
    speakingExerciseIds: [],
  },
  {
    id: "mobilite",
    title: "Transports et voyages",
    promise: "Te repérer en ville, prendre le train, organiser un voyage.",
    moduleSlugs: [
      "en-ville",
      "prendre-les-transports-a1",
      "se-reperer-en-ville",
      "prendre-les-transports-a2",
      "organiser-un-voyage-a2",
      "demander-son-chemin",
      "utiliser-les-transports",
      "organiser-un-voyage",
    ],
    speakingExerciseIds: ["situation-demander-chemin"],
  },
  {
    id: "achats",
    title: "Achats",
    promise: "Faire les courses, acheter, échanger un article, faire une réclamation.",
    moduleSlugs: [
      "vetements-et-couleurs",
      "au-restaurant-et-au-cafe",
      "faire-les-courses-a1",
      "faire-des-achats-a1",
      "faire-les-courses-a2",
      "faire-des-achats",
      "echanger-un-article",
      "comprendre-une-garantie",
      "faire-une-reclamation",
    ],
    speakingExerciseIds: ["situation-commander"],
  },
  {
    id: "argent-services",
    title: "Argent et services",
    promise: "Gérer un abonnement, lire un relevé de compte, régler un problème.",
    moduleSlugs: [
      "expliquer-un-probleme-et-demander-une-solution",
      "gerer-un-abonnement",
      "comprendre-releve-compte",
    ],
    speakingExerciseIds: [],
  },
  {
    id: "vie-sociale",
    title: "Vie sociale",
    promise: "Te présenter, proposer une sortie, raconter, donner ton avis.",
    moduleSlugs: [
      "se-presenter-a1",
      "nationalites-et-langues",
      "mes-loisirs",
      "proposer-un-rendez-vous",
      "se-presenter-en-detail",
      "parler-de-ses-gouts-et-loisirs",
      "raconter-son-week-end",
      "communiquer-au-quotidien",
      "organiser-un-evenement",
      "se-presenter",
      "prendre-rendez-vous",
      "deplacer-un-rendez-vous",
      "donner-son-opinion",
      "reagir-face-a-un-imprevu",
    ],
    speakingExerciseIds: [
      "repetition-bonjour",
      "situation-se-presenter",
      "mini-reponse-weekend",
      "mini-reponse-ville",
      "situation-rendez-vous",
      "situation-raconter-experience",
      "repetition-opinion",
    ],
  },
  {
    id: "ecole-famille",
    title: "Famille et école",
    promise: "Parler de ta famille, échanger avec l'école de ton enfant.",
    moduleSlugs: [
      "ma-famille",
      "parler-de-sa-famille",
      "famille-et-relations",
      "parler-ecole-enfant",
      "prevenir-absence-ecole",
      "autorisation-sortie-scolaire",
    ],
    speakingExerciseIds: [],
  },
];

export function getLifeSituationById(id: string): LifeSituation | undefined {
  return LIFE_SITUATIONS.find((situation) => situation.id === id);
}

/** Situations auxquelles un module appartient (souvent 0 ou 1, parfois 2). */
export function getLifeSituationsForModule(slug: string): LifeSituation[] {
  return LIFE_SITUATIONS.filter((situation) => situation.moduleSlugs.includes(slug));
}

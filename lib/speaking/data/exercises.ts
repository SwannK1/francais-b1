import type { SpeakingExercise } from "@/lib/speaking/types";

/**
 * Contenu 100% original de la zone "Expression orale". Aucune correction
 * automatique de prononciation n'existe (voir `types.ts`) : chaque exercice
 * ne porte que des critères d'auto-évaluation, jamais une réponse "correcte"
 * à cacher — ce contenu ne relève donc pas de la frontière contenu
 * public/protégé (`docs/architecture/user-lifecycle.md` § Premium content
 * boundary), qui ne concerne que des données avec une bonne réponse à
 * masquer. Le verrouillage premium de certains exercices (voir
 * `lib/commerce/access.ts`) reste une décision commerciale d'affichage, pas
 * une protection de secret.
 */
export const SPEAKING_EXERCISES: SpeakingExercise[] = [
  // --- Répétition de phrase ---
  {
    id: "repetition-bonjour",
    kind: "repetition",
    level: "A1",
    title: "Se saluer",
    instructions: "Écoute le modèle, puis répète la phrase à voix haute.",
    targetText: "Bonjour, comment allez-vous aujourd'hui ?",
    prepSeconds: 0,
    maxSpeakSeconds: 10,
    selfAssessmentCriteria: [
      "J'ai prononcé toute la phrase sans m'arrêter.",
      "Mon intonation montait bien sur la question.",
      "Les liaisons (« comment_allez-vous ») étaient présentes.",
    ],
  },
  {
    id: "repetition-heure",
    kind: "repetition",
    level: "A2",
    title: "Donner l'heure",
    instructions: "Écoute le modèle, puis répète la phrase à voix haute.",
    targetText: "Il est neuf heures et quart, le train part dans dix minutes.",
    prepSeconds: 0,
    maxSpeakSeconds: 10,
    selfAssessmentCriteria: [
      "J'ai bien prononcé « neuf heures » (liaison en « z »).",
      "J'ai distingué « dix » de « dit ».",
      "Le rythme était naturel, pas haché mot à mot.",
    ],
  },
  {
    id: "repetition-opinion",
    kind: "repetition",
    level: "B1",
    title: "Nuancer une opinion",
    instructions: "Écoute le modèle, puis répète la phrase à voix haute.",
    targetText: "Je ne suis pas totalement d'accord, mais je comprends ton point de vue.",
    prepSeconds: 0,
    maxSpeakSeconds: 12,
    selfAssessmentCriteria: [
      "J'ai enchaîné les deux propositions sans pause trop longue.",
      "Le « ne...pas » était clairement audible.",
      "J'ai gardé un rythme fluide sur toute la phrase.",
    ],
  },

  // --- Lecture à voix haute ---
  {
    id: "lecture-annonce",
    kind: "lecture",
    level: "A2",
    title: "Lire une petite annonce",
    instructions: "Écoute le modèle si besoin, puis lis le texte à voix haute.",
    targetText:
      "À louer : studio meublé de 20 m², proche du centre-ville. Loyer 480 euros par mois, charges comprises. Disponible à partir du 1er du mois prochain.",
    prepSeconds: 20,
    maxSpeakSeconds: 30,
    selfAssessmentCriteria: [
      "J'ai lu les nombres clairement (20, 480, 1er).",
      "J'ai fait une pause à chaque virgule et point.",
      "Le débit était régulier, ni trop rapide ni trop lent.",
    ],
  },
  {
    id: "lecture-recit",
    kind: "lecture",
    level: "B1",
    title: "Lire un court récit",
    instructions: "Écoute le modèle si besoin, puis lis le texte à voix haute.",
    targetText:
      "Ce matin-là, Sophie s'est levée en retard. Elle a couru jusqu'à l'arrêt de bus, mais celui-ci venait de partir. Heureusement, un collègue passait en voiture et lui a proposé de l'accompagner au travail.",
    prepSeconds: 30,
    maxSpeakSeconds: 40,
    selfAssessmentCriteria: [
      "J'ai marqué les liaisons entre les phrases par de courtes pauses.",
      "J'ai varié l'intonation pour ne pas lire de façon monotone.",
      "J'ai prononcé « heureusement » distinctement.",
    ],
  },

  // --- Mini-réponse orale ---
  {
    id: "mini-reponse-weekend",
    kind: "mini_reponse",
    level: "A2",
    title: "Parler de son week-end",
    instructions: "Prépare ta réponse quelques secondes, puis réponds à voix haute.",
    question: "Qu'est-ce que tu as fait ce week-end ?",
    prepSeconds: 20,
    maxSpeakSeconds: 40,
    selfAssessmentCriteria: [
      "J'ai utilisé le passé composé correctement.",
      "J'ai donné au moins deux informations (quoi, avec qui ou où).",
      "Ma réponse avait un début et une fin clairs.",
    ],
  },
  {
    id: "mini-reponse-ville",
    kind: "mini_reponse",
    level: "B1",
    title: "Décrire sa ville",
    instructions: "Prépare ta réponse quelques secondes, puis réponds à voix haute.",
    question: "Peux-tu décrire la ville ou le quartier où tu habites ?",
    prepSeconds: 30,
    maxSpeakSeconds: 60,
    selfAssessmentCriteria: [
      "J'ai utilisé du vocabulaire descriptif varié.",
      "J'ai organisé ma réponse (d'abord..., ensuite..., en plus...).",
      "J'ai donné mon avis, pas seulement des faits.",
    ],
    tips: "Pas de mauvaise réponse : décris ce que tu veux, l'objectif est de parler 30 à 60 secondes de façon organisée.",
  },
  {
    id: "mini-reponse-projet",
    kind: "mini_reponse",
    level: "B1",
    title: "Parler d'un projet futur",
    instructions: "Prépare ta réponse quelques secondes, puis réponds à voix haute.",
    question: "Quels sont tes projets pour l'année prochaine ?",
    prepSeconds: 30,
    maxSpeakSeconds: 60,
    selfAssessmentCriteria: [
      "J'ai utilisé le futur (simple ou proche) correctement.",
      "J'ai justifié au moins un projet avec une raison.",
      "J'ai relié mes idées avec des connecteurs (et, mais, parce que...).",
    ],
  },

  // --- Situations pratiques ---
  {
    id: "situation-se-presenter",
    kind: "situation",
    level: "A1",
    title: "Se présenter",
    situationLabel: "Se présenter",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu rencontrais quelqu'un pour la première fois.",
    context:
      "Tu rencontres un·e nouveau·elle voisin·e dans le hall de ton immeuble. Présente-toi : ton prénom, d'où tu viens, ce que tu fais dans la vie.",
    prepSeconds: 30,
    maxSpeakSeconds: 45,
    selfAssessmentCriteria: [
      "J'ai donné mon prénom clairement.",
      "J'ai dit d'où je viens et ce que je fais.",
      "J'ai parlé sans trop de pauses.",
    ],
  },
  {
    id: "situation-commander",
    kind: "situation",
    level: "A2",
    title: "Commander",
    situationLabel: "Commander",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu passais réellement la commande.",
    context:
      "Tu es dans un café. Commande une boisson chaude et quelque chose à manger, et demande l'addition à la fin.",
    prepSeconds: 20,
    maxSpeakSeconds: 40,
    selfAssessmentCriteria: [
      "J'ai utilisé une formule de politesse (« je voudrais », « s'il vous plaît »).",
      "J'ai été compris·e sans avoir besoin de répéter.",
      "J'ai demandé l'addition à la fin.",
    ],
  },
  {
    id: "situation-demander-chemin",
    kind: "situation",
    level: "A2",
    title: "Demander son chemin",
    situationLabel: "Demander son chemin",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu demandais vraiment ton chemin dans la rue.",
    context:
      "Tu es perdu·e dans une ville que tu ne connais pas et tu cherches la gare. Arrête un·e passant·e et demande ton chemin.",
    prepSeconds: 20,
    maxSpeakSeconds: 30,
    selfAssessmentCriteria: [
      "J'ai commencé par excuser/aborder poliment la personne.",
      "J'ai clairement nommé ce que je cherche (la gare).",
      "J'ai utilisé un vocabulaire de lieu adapté (à droite, tout droit, en face...).",
    ],
  },
  {
    id: "situation-rendez-vous",
    kind: "situation",
    level: "B1",
    title: "Prendre rendez-vous",
    situationLabel: "Prendre rendez-vous",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu appelais réellement pour prendre rendez-vous.",
    context:
      "Tu appelles ton médecin pour prendre rendez-vous la semaine prochaine. Explique brièvement pourquoi et propose un ou deux créneaux.",
    prepSeconds: 30,
    maxSpeakSeconds: 45,
    selfAssessmentCriteria: [
      "J'ai indiqué le motif du rendez-vous.",
      "J'ai proposé au moins un jour et une heure.",
      "J'ai terminé poliment l'appel.",
    ],
  },
  {
    id: "situation-expliquer-probleme",
    kind: "situation",
    level: "B1",
    title: "Expliquer un problème simple",
    situationLabel: "Expliquer un problème simple",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu expliquais réellement le problème.",
    context:
      "Ton logement n'a plus d'eau chaude depuis deux jours. Appelle ton propriétaire, explique le problème et demande une solution.",
    prepSeconds: 30,
    maxSpeakSeconds: 60,
    selfAssessmentCriteria: [
      "J'ai décrit le problème clairement (quoi, depuis quand).",
      "J'ai exprimé une demande précise (une solution, un délai).",
      "Le ton restait poli malgré la gêne exprimée.",
    ],
  },
  {
    id: "situation-raconter-experience",
    kind: "situation",
    level: "B1",
    title: "Raconter brièvement une expérience",
    situationLabel: "Raconter une expérience",
    instructions: "Prépare-toi, puis enregistre-toi comme si tu racontais réellement cette expérience à un·e ami·e.",
    context:
      "Raconte à un·e ami·e un voyage ou une sortie récente qui t'a marqué·e : où, quand, avec qui, et pourquoi c'était mémorable.",
    prepSeconds: 45,
    maxSpeakSeconds: 90,
    selfAssessmentCriteria: [
      "J'ai utilisé le passé (composé et/ou imparfait) correctement.",
      "J'ai organisé mon récit dans l'ordre chronologique.",
      "J'ai exprimé un ressenti, pas seulement des faits.",
      "J'ai utilisé des connecteurs (d'abord, ensuite, finalement...).",
    ],
    tips: "Pas de mauvaise réponse : l'objectif est de raconter une expérience réelle ou inventée, de façon compréhensible et organisée.",
  },
];

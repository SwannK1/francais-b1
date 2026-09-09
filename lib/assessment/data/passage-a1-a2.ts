import type { AssessmentDefinition } from "@/lib/assessment/types";

/**
 * Passage A1 → A2 — valide le passage effectif de niveau (voir
 * `checkpointKind: "passage"`, distinct du bilan de fin A1). Contenu 100%
 * original. Réutilise la même piste audio courte que `fin-a1.ts` (voir ce
 * fichier pour la justification), avec des questions différentes.
 */
export const PASSAGE_A1_A2: AssessmentDefinition = {
  id: "passage-a1-a2",
  checkpointKind: "passage",
  slug: "passage-a1-a2",
  title: "Passage A1 → A2",
  description:
    "Vérifie que tu es prêt·e à passer au niveau A2 : compréhension écrite, vocabulaire, grammaire, compréhension orale et une courte production orale guidée.",
  fromLevel: "A1",
  toLevel: "A2",
  durationMinutes: 25,
  passingRatio: 0.6,
  masteryRatio: 0.7,
  insufficientRatio: 0.5,
  reading: [
    {
      id: "pass-a1a2-lecture-1",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Le samedi matin, Léa fait les courses au marché. Elle achète des fruits, des légumes et du " +
        "pain. Ensuite, elle rentre chez elle et prépare le déjeuner pour toute la famille.",
      questions: [
        {
          kind: "qcm",
          id: "pass-a1a2-lecture-1-q1",
          prompt: "Quand est-ce que Léa fait les courses ?",
          choices: [
            { id: "a", text: "Le dimanche soir" },
            { id: "b", text: "Le samedi matin" },
            { id: "c", text: "Le lundi" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Le samedi matin", explanation: "« Le samedi matin, Léa fait les courses »." },
        },
        {
          kind: "vrai_faux",
          id: "pass-a1a2-lecture-1-q2",
          prompt: "Léa achète de la viande au marché.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "Elle achète des fruits, des légumes et du pain." },
        },
        {
          kind: "qcm",
          id: "pass-a1a2-lecture-1-q3",
          prompt: "Que fait Léa après les courses ?",
          choices: [
            { id: "a", text: "Elle dort." },
            { id: "b", text: "Elle prépare le déjeuner." },
            { id: "c", text: "Elle va au travail." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Elle prépare le déjeuner.", explanation: "« elle rentre ... et prépare le déjeuner »." },
        },
      ],
    },
    {
      id: "pass-a1a2-lecture-2",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Paul cherche un nouvel appartement. Il veut un logement proche de son travail, avec deux " +
        "chambres et un balcon. Son budget maximum est de 900 euros par mois.",
      questions: [
        {
          kind: "qcm",
          id: "pass-a1a2-lecture-2-q1",
          prompt: "Que cherche Paul ?",
          choices: [
            { id: "a", text: "Une maison" },
            { id: "b", text: "Un appartement" },
            { id: "c", text: "Un studio" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Un appartement", explanation: "« Paul cherche un nouvel appartement »." },
        },
        {
          kind: "qcm",
          id: "pass-a1a2-lecture-2-q2",
          prompt: "Quel est le budget maximum de Paul ?",
          choices: [
            { id: "a", text: "700 euros" },
            { id: "b", text: "900 euros" },
            { id: "c", text: "1200 euros" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "900 euros", explanation: "« Son budget maximum est de 900 euros »." },
        },
        {
          kind: "vrai_faux",
          id: "pass-a1a2-lecture-2-q3",
          prompt: "Paul veut un appartement avec un balcon.",
          correctAnswer: true,
          correction: { correctAnswer: "Vrai", explanation: "« avec deux chambres et un balcon »." },
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: "pass-a1a2-vocab-1",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-1-q",
        prompt: "Quel est le contraire de « tôt » ?",
        choices: [
          { id: "a", text: "tard" },
          { id: "b", text: "vite" },
          { id: "c", text: "avant" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "tard", explanation: "« tôt » et « tard » sont des contraires." },
      },
    },
    {
      id: "pass-a1a2-vocab-2",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-2-q",
        prompt: "Que peut-on acheter dans une boulangerie ?",
        choices: [
          { id: "a", text: "Du pain" },
          { id: "b", text: "Des médicaments" },
          { id: "c", text: "Des vêtements" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Du pain", explanation: "Une boulangerie vend du pain et des viennoiseries." },
      },
    },
    {
      id: "pass-a1a2-vocab-3",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-3-q",
        prompt: "Quel mot désigne « un endroit où on dort » ?",
        choices: [
          { id: "a", text: "Une cuisine" },
          { id: "b", text: "Une chambre" },
          { id: "c", text: "Un salon" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Une chambre", explanation: "Pièce où l'on dort." },
      },
    },
    {
      id: "pass-a1a2-vocab-4",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-4-q",
        prompt: "Quel est le contraire de « facile » ?",
        choices: [
          { id: "a", text: "difficile" },
          { id: "b", text: "simple" },
          { id: "c", text: "rapide" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "difficile", explanation: "« facile » et « difficile » sont des contraires." },
      },
    },
    {
      id: "pass-a1a2-vocab-5",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-5-q",
        prompt: "Comment appelle-t-on le repas du midi ?",
        choices: [
          { id: "a", text: "Le déjeuner" },
          { id: "b", text: "Le petit-déjeuner" },
          { id: "c", text: "Le dîner" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Le déjeuner", explanation: "Repas de la mi-journée." },
      },
    },
    {
      id: "pass-a1a2-vocab-6",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-vocab-6-q",
        prompt: "Quel mot désigne l'argent qu'on paie chaque mois pour un logement ?",
        choices: [
          { id: "a", text: "Le loyer" },
          { id: "b", text: "Le salaire" },
          { id: "c", text: "Le crédit" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Le loyer", explanation: "Somme payée périodiquement pour un logement loué." },
      },
    },
  ],
  grammar: [
    {
      id: "pass-a1a2-gram-1",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-1-q",
        prompt: "Hier, je ___ au cinéma.",
        choices: [
          { id: "a", text: "vais" },
          { id: "b", text: "suis allé·e" },
          { id: "c", text: "irai" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "suis allé·e", explanation: "« hier » impose le passé composé." },
      },
    },
    {
      id: "pass-a1a2-gram-2",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-2-q",
        prompt: "Elle ___ partir tôt demain.",
        choices: [
          { id: "a", text: "veut" },
          { id: "b", text: "veux" },
          { id: "c", text: "veulent" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "veut", explanation: "« vouloir » à la 3ème personne du singulier." },
      },
    },
    {
      id: "pass-a1a2-gram-3",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-3-q",
        prompt: "Nous ___ nos devoirs avant le dîner.",
        choices: [
          { id: "a", text: "finissons" },
          { id: "b", text: "finis" },
          { id: "c", text: "finissent" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "finissons", explanation: "« finir » à la 1ère personne du pluriel." },
      },
    },
    {
      id: "pass-a1a2-gram-4",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-4-q",
        prompt: "Je vais ___ du pain avant de rentrer.",
        choices: [
          { id: "a", text: "achète" },
          { id: "b", text: "acheter" },
          { id: "c", text: "achetant" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "acheter", explanation: "« aller » + infinitif (futur proche)." },
      },
    },
    {
      id: "pass-a1a2-gram-5",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-5-q",
        prompt: "Ils habitent ___ Canada.",
        choices: [
          { id: "a", text: "au" },
          { id: "b", text: "en" },
          { id: "c", text: "à" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "au", explanation: "Pays masculin : « au Canada »." },
      },
    },
    {
      id: "pass-a1a2-gram-6",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a1a2-gram-6-q",
        prompt: "Ce livre est ___ que l'autre.",
        choices: [
          { id: "a", text: "plus intéressant" },
          { id: "b", text: "intéressant plus" },
          { id: "c", text: "le plus intéressant" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "plus intéressant", explanation: "Comparatif de supériorité : plus + adjectif + que." },
      },
    },
  ],
  listening: [
    {
      id: "pass-a1a2-audio-1",
      dimension: "comprehension_orale",
      instructions: "Écoutez l'annonce, puis répondez aux questions.",
      audioSrc: "/audio/demo/exam-b1-annonce.m4a",
      transcript:
        "« Attention, le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. »",
      questions: [
        {
          kind: "vrai_faux",
          id: "pass-a1a2-audio-1-q1",
          prompt: "Le train va à Lyon.",
          correctAnswer: true,
          correction: { correctAnswer: "Vrai", explanation: "« le train à destination de Lyon »." },
        },
        {
          kind: "qcm",
          id: "pass-a1a2-audio-1-q2",
          prompt: "Que doivent faire les voyageurs ?",
          choices: [
            { id: "a", text: "Aller voie 2" },
            { id: "b", text: "Aller voie 4" },
            { id: "c", text: "Attendre le prochain train" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Aller voie 4", explanation: "Le train partira voie 4." },
        },
        {
          kind: "qcm",
          id: "pass-a1a2-audio-1-q3",
          prompt: "Quel est le problème annoncé ?",
          choices: [
            { id: "a", text: "Le train est en retard." },
            { id: "b", text: "Le train change de voie." },
            { id: "c", text: "Le train est annulé." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Le train change de voie.", explanation: "« voie 4 au lieu de la voie 2 »." },
        },
      ],
    },
  ],
  guidedProduction: {
    dimension: "production_guidee",
    exercise: {
      id: "pass-a1a2-production-orale",
      skillId: "assessment-passage-a1a2-po",
      difficulty: "A2",
      type: "production_orale",
      instructions: "Prépare-toi, puis enregistre-toi.",
      consigne: "Comment vas-tu au travail ou à l'école ? Décris ton trajet habituel.",
      prepSeconds: 30,
      maxSpeakSeconds: 45,
      selfAssessmentCriteria: [
        "J'ai décrit mon trajet avec au moins 2 étapes.",
        "J'ai utilisé du vocabulaire de transport adapté.",
        "J'ai parlé de façon fluide, sans trop de pauses.",
      ],
    },
  },
};

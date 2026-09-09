import type { AssessmentDefinition } from "@/lib/assessment/types";

/**
 * Bilan de fin A1 — valide les acquis avant de commencer l'A2 (voir
 * `checkpointKind: "bilan"`, distinct du passage A1 → A2 ci-dessous).
 * Contenu 100% original. La piste audio réutilise un fichier déjà présent
 * (`public/audio/demo/exam-b1-annonce.m4a`), la plus simple/courte du
 * projet — aucun fichier n'a été inventé (voir
 * `lib/assessment/data/content-integrity.test.ts`).
 */
export const FIN_A1: AssessmentDefinition = {
  id: "fin-a1",
  checkpointKind: "bilan",
  slug: "fin-a1",
  title: "Bilan de fin A1",
  description:
    "Vérifie que les bases du niveau A1 sont solides avant de commencer l'A2 : compréhension écrite, vocabulaire, grammaire, compréhension orale et une courte production orale guidée.",
  fromLevel: "A1",
  toLevel: "A1",
  durationMinutes: 20,
  passingRatio: 0.6,
  masteryRatio: 0.7,
  insufficientRatio: 0.5,
  reading: [
    {
      id: "fin-a1-lecture-1",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Bonjour, je m'appelle Julie. J'ai 28 ans et j'habite à Lyon. Je travaille dans un magasin de " +
        "vêtements. Le matin, je bois un café et je pars au travail à 8 heures.",
      questions: [
        {
          kind: "qcm",
          id: "fin-a1-lecture-1-q1",
          prompt: "Quel âge a Julie ?",
          choices: [
            { id: "a", text: "18 ans" },
            { id: "b", text: "28 ans" },
            { id: "c", text: "30 ans" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "28 ans", explanation: "« J'ai 28 ans » : Julie le dit directement." },
        },
        {
          kind: "qcm",
          id: "fin-a1-lecture-1-q2",
          prompt: "Où habite Julie ?",
          choices: [
            { id: "a", text: "À Paris" },
            { id: "b", text: "À Marseille" },
            { id: "c", text: "À Lyon" },
          ],
          correctChoiceId: "c",
          correction: { correctAnswer: "À Lyon", explanation: "« j'habite à Lyon »." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a1-lecture-1-q3",
          prompt: "Julie part au travail à 8 heures.",
          correctAnswer: true,
          correction: { correctAnswer: "Vrai", explanation: "« je pars au travail à 8 heures »." },
        },
      ],
    },
    {
      id: "fin-a1-lecture-2",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Marc adore le sport. Le lundi, il va à la piscine. Le mercredi, il joue au football avec ses " +
        "amis. Le week-end, il se repose à la maison.",
      questions: [
        {
          kind: "qcm",
          id: "fin-a1-lecture-2-q1",
          prompt: "Que fait Marc le lundi ?",
          choices: [
            { id: "a", text: "Il joue au football." },
            { id: "b", text: "Il va à la piscine." },
            { id: "c", text: "Il se repose." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Il va à la piscine.", explanation: "« Le lundi, il va à la piscine »." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a1-lecture-2-q2",
          prompt: "Marc joue au football le mardi.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "Il joue au football le mercredi, pas le mardi." },
        },
        {
          kind: "qcm",
          id: "fin-a1-lecture-2-q3",
          prompt: "Que fait Marc le week-end ?",
          choices: [
            { id: "a", text: "Il travaille." },
            { id: "b", text: "Il se repose à la maison." },
            { id: "c", text: "Il voyage." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Il se repose à la maison.", explanation: "Dernière phrase du texte." },
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: "fin-a1-vocab-1",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-1-q",
        prompt: "Quel est le contraire de « grand » ?",
        choices: [
          { id: "a", text: "petit" },
          { id: "b", text: "large" },
          { id: "c", text: "long" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "petit", explanation: "« grand » et « petit » sont des contraires courants." },
      },
    },
    {
      id: "fin-a1-vocab-2",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-2-q",
        prompt: "Comment dit-on merci en réponse à un cadeau ?",
        choices: [
          { id: "a", text: "Pardon !" },
          { id: "b", text: "Merci beaucoup !" },
          { id: "c", text: "S'il te plaît !" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Merci beaucoup !", explanation: "Formule de remerciement standard." },
      },
    },
    {
      id: "fin-a1-vocab-3",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-3-q",
        prompt: "Comment appelle-t-on le repas du matin ?",
        choices: [
          { id: "a", text: "Le dîner" },
          { id: "b", text: "Le déjeuner" },
          { id: "c", text: "Le petit-déjeuner" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "Le petit-déjeuner", explanation: "Repas pris le matin." },
      },
    },
    {
      id: "fin-a1-vocab-4",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-4-q",
        prompt: "Quel est le contraire de « chaud » ?",
        choices: [
          { id: "a", text: "tiède" },
          { id: "b", text: "froid" },
          { id: "c", text: "sec" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "froid", explanation: "« chaud » et « froid » sont des contraires." },
      },
    },
    {
      id: "fin-a1-vocab-5",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-5-q",
        prompt: "Quel jour vient juste après lundi ?",
        choices: [
          { id: "a", text: "Dimanche" },
          { id: "b", text: "Mercredi" },
          { id: "c", text: "Mardi" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "Mardi", explanation: "Ordre des jours de la semaine." },
      },
    },
    {
      id: "fin-a1-vocab-6",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a1-vocab-6-q",
        prompt: "Comment appelle-t-on la personne qui enseigne à l'école ?",
        choices: [
          { id: "a", text: "Un·e élève" },
          { id: "b", text: "Un·e professeur·e" },
          { id: "c", text: "Un·e directeur·rice" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Un·e professeur·e", explanation: "Personne qui enseigne." },
      },
    },
  ],
  grammar: [
    {
      id: "fin-a1-gram-1",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-1-q",
        prompt: "Je ___ étudiant.",
        choices: [
          { id: "a", text: "suis" },
          { id: "b", text: "es" },
          { id: "c", text: "est" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "suis", explanation: "« être » à la 1ère personne du singulier : je suis." },
      },
    },
    {
      id: "fin-a1-gram-2",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-2-q",
        prompt: "Elle ___ à Paris.",
        choices: [
          { id: "a", text: "habite" },
          { id: "b", text: "habites" },
          { id: "c", text: "habitent" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "habite", explanation: "« habiter » à la 3ème personne du singulier." },
      },
    },
    {
      id: "fin-a1-gram-3",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-3-q",
        prompt: "___ maison est grande.",
        choices: [
          { id: "a", text: "Le" },
          { id: "b", text: "La" },
          { id: "c", text: "Les" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "La", explanation: "« maison » est féminin singulier." },
      },
    },
    {
      id: "fin-a1-gram-4",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-4-q",
        prompt: "Nous ___ au cinéma ce soir.",
        choices: [
          { id: "a", text: "va" },
          { id: "b", text: "vais" },
          { id: "c", text: "allons" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "allons", explanation: "« aller » à la 1ère personne du pluriel." },
      },
    },
    {
      id: "fin-a1-gram-5",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-5-q",
        prompt: "Il y a ___ livres sur la table.",
        choices: [
          { id: "a", text: "du" },
          { id: "b", text: "de la" },
          { id: "c", text: "des" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "des", explanation: "Article indéfini pluriel devant un nom au pluriel." },
      },
    },
    {
      id: "fin-a1-gram-6",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a1-gram-6-q",
        prompt: "Tu ___ français ?",
        choices: [
          { id: "a", text: "parle" },
          { id: "b", text: "parles" },
          { id: "c", text: "parlez" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "parles", explanation: "« parler » à la 2ème personne du singulier." },
      },
    },
  ],
  listening: [
    {
      id: "fin-a1-audio-1",
      dimension: "comprehension_orale",
      instructions: "Écoutez l'annonce, puis répondez aux questions.",
      audioSrc: "/audio/demo/exam-b1-annonce.m4a",
      transcript:
        "« Attention, le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. »",
      questions: [
        {
          kind: "qcm",
          id: "fin-a1-audio-1-q1",
          prompt: "Qu'est-ce qui change pour le train ?",
          choices: [
            { id: "a", text: "Il est annulé." },
            { id: "b", text: "Il change de voie." },
            { id: "c", text: "Il est en retard." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Il change de voie.", explanation: "« partira ... voie 4 au lieu de la voie 2 »." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a1-audio-1-q2",
          prompt: "Le train partira voie 2.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "Il partira voie 4, pas voie 2." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a1-audio-1-q3",
          prompt: "Le message parle d'un train à destination de Lyon.",
          correctAnswer: true,
          correction: { correctAnswer: "Vrai", explanation: "« le train à destination de Lyon »." },
        },
      ],
    },
  ],
  guidedProduction: {
    dimension: "production_guidee",
    exercise: {
      id: "fin-a1-production-orale",
      skillId: "assessment-fin-a1-po",
      difficulty: "A1",
      type: "production_orale",
      instructions: "Prépare-toi, puis enregistre-toi.",
      consigne: "Présente-toi en quelques phrases : ton prénom, ton âge, ta ville, ce que tu aimes.",
      prepSeconds: 30,
      maxSpeakSeconds: 30,
      selfAssessmentCriteria: [
        "J'ai dit mon prénom et mon âge.",
        "J'ai dit où j'habite.",
        "J'ai parlé sans trop de pauses.",
      ],
      tips: "Pas de mauvaise réponse : l'objectif est de parler 20 à 30 secondes de façon compréhensible.",
    },
  },
};

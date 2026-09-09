import type { AssessmentDefinition } from "@/lib/assessment/types";

/**
 * Passage A2 → B1 — le passage le plus exigeant des 4 (voir
 * `checkpointKind: "passage"`), contenu à la frontière A2/B1. La piste
 * audio réutilise le dialogue déjà présent
 * (`public/audio/examens/blanc-1/co-dialogue-salon-lyon.m4a`, transcript
 * repris à l'identique de `lib/pedagogy/data/exams.ts`), avec des questions
 * différentes de celles de l'examen blanc B1.
 */
export const PASSAGE_A2_B1: AssessmentDefinition = {
  id: "passage-a2-b1",
  checkpointKind: "passage",
  slug: "passage-a2-b1",
  title: "Passage A2 → B1",
  description:
    "Vérifie que tu es prêt·e à passer au niveau B1 : compréhension écrite, vocabulaire, grammaire, compréhension orale et une production orale guidée plus exigeante.",
  fromLevel: "A2",
  toLevel: "B1",
  durationMinutes: 30,
  passingRatio: 0.6,
  masteryRatio: 0.7,
  insufficientRatio: 0.5,
  reading: [
    {
      id: "pass-a2b1-lecture-1",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Bien que le télétravail se soit beaucoup développé ces dernières années, de nombreux salariés " +
        "préfèrent continuer à se rendre au bureau, ne serait-ce que pour garder un lien social avec " +
        "leurs collègues.",
      questions: [
        {
          kind: "qcm",
          id: "pass-a2b1-lecture-1-q1",
          prompt: "Que préfèrent de nombreux salariés ?",
          choices: [
            { id: "a", text: "Rester chez eux" },
            { id: "b", text: "Aller au bureau" },
            { id: "c", text: "Changer de travail" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Aller au bureau", explanation: "« préfèrent continuer à se rendre au bureau »." },
        },
        {
          kind: "vrai_faux",
          id: "pass-a2b1-lecture-1-q2",
          prompt: "Le texte dit que plus personne ne veut aller au bureau.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "Au contraire, « de nombreux salariés préfèrent » y aller." },
        },
        {
          kind: "qcm",
          id: "pass-a2b1-lecture-1-q3",
          prompt: "Pourquoi certains salariés préfèrent-ils le bureau ?",
          choices: [
            { id: "a", text: "Pour gagner plus d'argent" },
            { id: "b", text: "Pour garder un lien social" },
            { id: "c", text: "Parce que c'est obligatoire" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Pour garder un lien social", explanation: "« garder un lien social avec leurs collègues »." },
        },
      ],
    },
    {
      id: "pass-a2b1-lecture-2",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Face à la hausse des prix, de plus en plus de consommateurs comparent les offres avant " +
        "d'acheter et n'hésitent plus à changer de magasin pour économiser quelques euros.",
      questions: [
        {
          kind: "qcm",
          id: "pass-a2b1-lecture-2-q1",
          prompt: "Que font les consommateurs face à la hausse des prix ?",
          choices: [
            { id: "a", text: "Ils achètent plus." },
            { id: "b", text: "Ils comparent les offres." },
            { id: "c", text: "Ils arrêtent d'acheter." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Ils comparent les offres.", explanation: "« comparent les offres avant d'acheter »." },
        },
        {
          kind: "vrai_faux",
          id: "pass-a2b1-lecture-2-q2",
          prompt: "Les consommateurs restent fidèles à un seul magasin.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "« n'hésitent plus à changer de magasin »." },
        },
        {
          kind: "qcm",
          id: "pass-a2b1-lecture-2-q3",
          prompt: "Pourquoi changent-ils de magasin ?",
          choices: [
            { id: "a", text: "Pour économiser" },
            { id: "b", text: "Par curiosité" },
            { id: "c", text: "Par obligation" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Pour économiser", explanation: "« pour économiser quelques euros »." },
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: "pass-a2b1-vocab-1",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-1-q",
        prompt: "Quel mot a un sens proche de « cependant » ?",
        choices: [
          { id: "a", text: "donc" },
          { id: "b", text: "néanmoins" },
          { id: "c", text: "parce que" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "néanmoins", explanation: "« néanmoins » exprime une opposition, comme « cependant »." },
      },
    },
    {
      id: "pass-a2b1-vocab-2",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-2-q",
        prompt: "Que signifie « économiser » ?",
        choices: [
          { id: "a", text: "Dépenser plus" },
          { id: "b", text: "Mettre de l'argent de côté" },
          { id: "c", text: "Emprunter de l'argent" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Mettre de l'argent de côté", explanation: "Économiser = ne pas dépenser, épargner." },
      },
    },
    {
      id: "pass-a2b1-vocab-3",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-3-q",
        prompt: "Quel est le contraire de « améliorer » ?",
        choices: [
          { id: "a", text: "aggraver" },
          { id: "b", text: "réparer" },
          { id: "c", text: "renforcer" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "aggraver", explanation: "« améliorer » et « aggraver » sont des contraires." },
      },
    },
    {
      id: "pass-a2b1-vocab-4",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-4-q",
        prompt: "Que signifie « une hausse des prix » ?",
        choices: [
          { id: "a", text: "Les prix augmentent." },
          { id: "b", text: "Les prix baissent." },
          { id: "c", text: "Les prix sont stables." },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Les prix augmentent.", explanation: "« hausse » = augmentation." },
      },
    },
    {
      id: "pass-a2b1-vocab-5",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-5-q",
        prompt: "Quel mot signifie « un avantage » ?",
        choices: [
          { id: "a", text: "Un atout" },
          { id: "b", text: "Un obstacle" },
          { id: "c", text: "Un risque" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Un atout", explanation: "« un atout » est un synonyme d'« un avantage »." },
      },
    },
    {
      id: "pass-a2b1-vocab-6",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-vocab-6-q",
        prompt: "Que signifie « faire preuve de patience » ?",
        choices: [
          { id: "a", text: "S'énerver rapidement" },
          { id: "b", text: "Rester calme et attendre" },
          { id: "c", text: "Partir avant la fin" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Rester calme et attendre", explanation: "« faire preuve de » + qualité = montrer cette qualité." },
      },
    },
  ],
  grammar: [
    {
      id: "pass-a2b1-gram-1",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-1-q",
        prompt: "Il faut que tu ___ attention.",
        choices: [
          { id: "a", text: "fais" },
          { id: "b", text: "fasses" },
          { id: "c", text: "feras" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "fasses", explanation: "« il faut que » impose le subjonctif." },
      },
    },
    {
      id: "pass-a2b1-gram-2",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-2-q",
        prompt: "Si j'avais plus de temps, je ___ davantage.",
        choices: [
          { id: "a", text: "voyagerais" },
          { id: "b", text: "voyage" },
          { id: "c", text: "voyagerai" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "voyagerais", explanation: "Si + imparfait, conditionnel présent dans la principale." },
      },
    },
    {
      id: "pass-a2b1-gram-3",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-3-q",
        prompt: "C'est une décision ___ tout le monde parle.",
        choices: [
          { id: "a", text: "que" },
          { id: "b", text: "qui" },
          { id: "c", text: "dont" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "dont", explanation: "« parler de » se construit avec « dont »." },
      },
    },
    {
      id: "pass-a2b1-gram-4",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-4-q",
        prompt: "Bien qu'il ___ fatigué, il a terminé son travail.",
        choices: [
          { id: "a", text: "est" },
          { id: "b", text: "soit" },
          { id: "c", text: "était" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "soit", explanation: "« bien que » impose le subjonctif." },
      },
    },
    {
      id: "pass-a2b1-gram-5",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-5-q",
        prompt: "Cette maison a été ___ en 1990.",
        choices: [
          { id: "a", text: "construite" },
          { id: "b", text: "construit" },
          { id: "c", text: "construisant" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "construite", explanation: "Voix passive : participe passé accordé avec « maison » (féminin)." },
      },
    },
    {
      id: "pass-a2b1-gram-6",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "pass-a2b1-gram-6-q",
        prompt: "Je préférerais que vous ___ demain plutôt qu'aujourd'hui.",
        choices: [
          { id: "a", text: "venez" },
          { id: "b", text: "veniez" },
          { id: "c", text: "viendrez" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "veniez", explanation: "« préférer que » impose le subjonctif." },
      },
    },
  ],
  listening: [
    {
      id: "pass-a2b1-audio-1",
      dimension: "comprehension_orale",
      instructions:
        "Écoutez le dialogue (« Organiser un déplacement professionnel », Nadia et Thomas, 55 secondes), puis répondez.",
      audioSrc: "/audio/examens/blanc-1/co-dialogue-salon-lyon.m4a",
      transcript:
        "Thomas — Nadia, tu as réservé les billets de train pour le salon à Lyon ?\n" +
        "Nadia — Pas encore, je voulais d'abord vérifier les horaires avec toi. Tu préfères partir la veille ou le matin même ?\n" +
        "Thomas — Je préfère partir la veille, comme ça on n'est pas fatigués et on arrive reposés pour la première réunion.\n" +
        "Nadia — D'accord, alors je regarde un train vers 18h, ça te va ?\n" +
        "Thomas — Parfait. Et pour l'hôtel, tu as une idée ?\n" +
        "Nadia — Oui, j'ai trouvé un hôtel pas trop cher, à dix minutes à pied du centre des congrès. Par contre, il ne reste que des chambres simples, pas de chambre double.\n" +
        "Thomas — Ce n'est pas grave, chacun sa chambre, c'est plus simple de toute façon.\n" +
        "Nadia — Je m'en occupe aujourd'hui, alors. Et pour le retour, on rentre le soir même ou le lendemain ?\n" +
        "Thomas — Le salon se termine à 17h, donc on peut rentrer le soir même, non ?\n" +
        "Nadia — Oui, ça devrait aller. Je réserve tout ça cet après-midi et je t'envoie la confirmation par mail.",
      questions: [
        {
          kind: "qcm",
          id: "pass-a2b1-audio-1-q1",
          prompt: "Pourquoi Thomas veut-il partir la veille ?",
          choices: [
            { id: "a", text: "Pour ne pas être fatigué à la première réunion." },
            { id: "b", text: "Parce que le train coûte moins cher." },
            { id: "c", text: "Parce que l'hôtel est complet le jour même." },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Pour ne pas être fatigué à la première réunion.", explanation: "« on arrive reposés pour la première réunion »." },
        },
        {
          kind: "qcm",
          id: "pass-a2b1-audio-1-q2",
          prompt: "Où se trouve l'hôtel par rapport au centre des congrès ?",
          choices: [
            { id: "a", text: "À dix minutes à pied" },
            { id: "b", text: "À une heure en voiture" },
            { id: "c", text: "Juste en face" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "À dix minutes à pied", explanation: "Nadia le précise directement." },
        },
        {
          kind: "vrai_faux",
          id: "pass-a2b1-audio-1-q3",
          prompt: "Nadia a trouvé une chambre double pour eux deux.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "« il ne reste que des chambres simples, pas de chambre double »." },
        },
        {
          kind: "qcm",
          id: "pass-a2b1-audio-1-q4",
          prompt: "Quand comptent-ils rentrer ?",
          choices: [
            { id: "a", text: "Le soir même" },
            { id: "b", text: "Le lendemain matin" },
            { id: "c", text: "Deux jours après" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Le soir même", explanation: "« on peut rentrer le soir même »." },
        },
      ],
    },
  ],
  guidedProduction: {
    dimension: "production_guidee",
    exercise: {
      id: "pass-a2b1-production-orale",
      skillId: "assessment-passage-a2b1-po",
      difficulty: "B1",
      type: "production_orale",
      instructions: "Prépare-toi, puis enregistre-toi.",
      consigne: "Donne ton avis sur le télétravail : quels sont, selon toi, ses avantages et ses inconvénients ?",
      prepSeconds: 60,
      maxSpeakSeconds: 90,
      selfAssessmentCriteria: [
        "J'ai donné une opinion claire.",
        "J'ai mentionné au moins un avantage et un inconvénient.",
        "J'ai utilisé des connecteurs logiques (cependant, de plus, par contre...).",
        "Mon discours est compréhensible d'un bout à l'autre.",
      ],
      tips: "Pas de mauvaise réponse : l'objectif est de parler 1 à 1min30 de façon organisée, pas de convaincre.",
    },
  },
};

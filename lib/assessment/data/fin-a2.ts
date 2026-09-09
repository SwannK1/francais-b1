import type { AssessmentDefinition } from "@/lib/assessment/types";

/**
 * Bilan de fin A2 — valide les acquis avant de viser le B1 (voir
 * `checkpointKind: "bilan"`, distinct du passage A2 → B1). Contenu 100%
 * original. La piste audio réutilise le message vocal déjà présent
 * (`public/audio/examens/blanc-1/co-message-camping.m4a`, transcript repris
 * à l'identique de `lib/pedagogy/data/exams.ts`), avec des questions
 * différentes de celles de l'examen blanc B1.
 */
export const FIN_A2: AssessmentDefinition = {
  id: "fin-a2",
  checkpointKind: "bilan",
  slug: "fin-a2",
  title: "Bilan de fin A2",
  description:
    "Vérifie que les acquis du niveau A2 sont solides avant de viser le B1 : compréhension écrite, vocabulaire, grammaire, compréhension orale et une courte production orale guidée.",
  fromLevel: "A2",
  toLevel: "A2",
  durationMinutes: 25,
  passingRatio: 0.6,
  masteryRatio: 0.7,
  insufficientRatio: 0.5,
  reading: [
    {
      id: "fin-a2-lecture-1",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Chaque année, Amandine part en vacances avec ses parents. Cette année, ils ont choisi d'aller " +
        "à la montagne plutôt qu'à la mer, pour changer un peu. Ils ont réservé un chalet pour deux " +
        "semaines en août.",
      questions: [
        {
          kind: "qcm",
          id: "fin-a2-lecture-1-q1",
          prompt: "Où vont-ils cette année ?",
          choices: [
            { id: "a", text: "À la mer" },
            { id: "b", text: "À la montagne" },
            { id: "c", text: "À l'étranger" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "À la montagne", explanation: "« aller à la montagne plutôt qu'à la mer »." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a2-lecture-1-q2",
          prompt: "Ils ont réservé le chalet pour un mois.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "« un chalet pour deux semaines »." },
        },
        {
          kind: "qcm",
          id: "fin-a2-lecture-1-q3",
          prompt: "Pourquoi ont-ils choisi la montagne ?",
          choices: [
            { id: "a", text: "C'est moins cher." },
            { id: "b", text: "Pour changer un peu." },
            { id: "c", text: "La mer est fermée." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Pour changer un peu.", explanation: "« pour changer un peu »." },
        },
      ],
    },
    {
      id: "fin-a2-lecture-2",
      dimension: "comprehension_ecrite",
      instructions: "Lisez le texte, puis répondez aux questions.",
      text:
        "Karim vient de commencer un nouveau travail. Le premier jour, ses collègues l'ont invité à " +
        "déjeuner pour faire connaissance. Il s'est senti bien accueilli et pense que cette équipe va " +
        "lui plaire.",
      questions: [
        {
          kind: "qcm",
          id: "fin-a2-lecture-2-q1",
          prompt: "Que font les collègues le premier jour ?",
          choices: [
            { id: "a", text: "Ils ignorent Karim." },
            { id: "b", text: "Ils l'invitent à déjeuner." },
            { id: "c", text: "Ils partent en réunion." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Ils l'invitent à déjeuner.", explanation: "« l'ont invité à déjeuner »." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a2-lecture-2-q2",
          prompt: "Karim se sent mal accueilli.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "« Il s'est senti bien accueilli »." },
        },
        {
          kind: "qcm",
          id: "fin-a2-lecture-2-q3",
          prompt: "Comment Karim se sent-il à la fin du texte ?",
          choices: [
            { id: "a", text: "Déçu" },
            { id: "b", text: "Bien accueilli" },
            { id: "c", text: "Inquiet" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Bien accueilli", explanation: "Dernière phrase du texte." },
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: "fin-a2-vocab-1",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-1-q",
        prompt: "Quel est le contraire de « arriver » ?",
        choices: [
          { id: "a", text: "partir" },
          { id: "b", text: "rester" },
          { id: "c", text: "revenir" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "partir", explanation: "« arriver » et « partir » sont des contraires." },
      },
    },
    {
      id: "fin-a2-vocab-2",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-2-q",
        prompt: "Quel mot a un sens proche de « content » ?",
        choices: [
          { id: "a", text: "triste" },
          { id: "b", text: "ravi" },
          { id: "c", text: "fatigué" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "ravi", explanation: "« ravi » est un synonyme soutenu de « content »." },
      },
    },
    {
      id: "fin-a2-vocab-3",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-3-q",
        prompt: "Que veut dire « annuler un rendez-vous » ?",
        choices: [
          { id: "a", text: "Le confirmer" },
          { id: "b", text: "Dire qu'on ne viendra pas" },
          { id: "c", text: "Le reporter d'une heure" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Dire qu'on ne viendra pas", explanation: "Annuler = ne pas honorer un rendez-vous prévu." },
      },
    },
    {
      id: "fin-a2-vocab-4",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-4-q",
        prompt: "Quel est le contraire de « augmenter » ?",
        choices: [
          { id: "a", text: "diminuer" },
          { id: "b", text: "continuer" },
          { id: "c", text: "commencer" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "diminuer", explanation: "« augmenter » et « diminuer » sont des contraires." },
      },
    },
    {
      id: "fin-a2-vocab-5",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-5-q",
        prompt: "Quel mot désigne une personne qui travaille avec toi ?",
        choices: [
          { id: "a", text: "Un client" },
          { id: "b", text: "Un collègue" },
          { id: "c", text: "Un concurrent" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Un collègue", explanation: "Personne travaillant dans la même entreprise/équipe." },
      },
    },
    {
      id: "fin-a2-vocab-6",
      dimension: "vocabulaire",
      question: {
        kind: "qcm",
        id: "fin-a2-vocab-6-q",
        prompt: "Que signifie « déménager » ?",
        choices: [
          { id: "a", text: "Changer de logement" },
          { id: "b", text: "Ranger sa maison" },
          { id: "c", text: "Vendre des meubles" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Changer de logement", explanation: "Déménager = quitter un logement pour un autre." },
      },
    },
  ],
  grammar: [
    {
      id: "fin-a2-gram-1",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-1-q",
        prompt: "Quand j'étais petit, je ___ à la campagne.",
        choices: [
          { id: "a", text: "habitais" },
          { id: "b", text: "ai habité" },
          { id: "c", text: "habite" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "habitais", explanation: "Description d'une habitude passée : imparfait." },
      },
    },
    {
      id: "fin-a2-gram-2",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-2-q",
        prompt: "Demain, il ___ toute la journée, selon la météo.",
        choices: [
          { id: "a", text: "pleuvra" },
          { id: "b", text: "pleuvait" },
          { id: "c", text: "a plu" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "pleuvra", explanation: "« demain » impose le futur simple." },
      },
    },
    {
      id: "fin-a2-gram-3",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-3-q",
        prompt: "C'est le livre ___ je t'ai parlé.",
        choices: [
          { id: "a", text: "que" },
          { id: "b", text: "dont" },
          { id: "c", text: "qui" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "dont", explanation: "« parler de » se construit avec « dont »." },
      },
    },
    {
      id: "fin-a2-gram-4",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-4-q",
        prompt: "Elle est ___ que sa sœur.",
        choices: [
          { id: "a", text: "plus gentille" },
          { id: "b", text: "gentille plus" },
          { id: "c", text: "la plus gentille" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "plus gentille", explanation: "Comparatif de supériorité au féminin." },
      },
    },
    {
      id: "fin-a2-gram-5",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-5-q",
        prompt: "Si j'ai le temps, je ___ te voir.",
        choices: [
          { id: "a", text: "viendrai" },
          { id: "b", text: "venais" },
          { id: "c", text: "viens" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "viendrai", explanation: "Si + présent, futur dans la principale." },
      },
    },
    {
      id: "fin-a2-gram-6",
      dimension: "grammaire",
      question: {
        kind: "qcm",
        id: "fin-a2-gram-6-q",
        prompt: "Ils ___ tôt tous les matins.",
        choices: [
          { id: "a", text: "se lèvent" },
          { id: "b", text: "se lève" },
          { id: "c", text: "se levez" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "se lèvent", explanation: "Verbe pronominal « se lever » à la 3ème personne du pluriel." },
      },
    },
  ],
  listening: [
    {
      id: "fin-a2-audio-1",
      dimension: "comprehension_orale",
      instructions:
        "Écoutez le message vocal (« Changement de programme », 30 secondes), puis répondez.",
      audioSrc: "/audio/examens/blanc-1/co-message-camping.m4a",
      transcript:
        "Salut, c'est Karim ! Je t'appelle parce qu'on doit changer nos plans pour samedi. En fait, " +
        "le camping où on devait aller est complet, il n'y a plus de place pour ce week-end. Alors " +
        "j'ai regardé sur internet, et j'ai trouvé un autre camping, un peu plus loin, à Annecy. C'est " +
        "à peu près une heure de route en plus, mais les avis sont vraiment bons. Est-ce que ça te va " +
        "si on part une heure plus tôt, du coup, vers 8h au lieu de 9h ? Rappelle-moi pour me dire si " +
        "c'est possible pour toi. Merci, à bientôt !",
      questions: [
        {
          kind: "qcm",
          id: "fin-a2-audio-1-q1",
          prompt: "Pourquoi Karim change-t-il les plans ?",
          choices: [
            { id: "a", text: "Il pleut le week-end prochain." },
            { id: "b", text: "Le camping prévu est complet." },
            { id: "c", text: "La voiture est en panne." },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Le camping prévu est complet.", explanation: "« le camping ... est complet »." },
        },
        {
          kind: "qcm",
          id: "fin-a2-audio-1-q2",
          prompt: "Où se trouve le nouveau camping ?",
          choices: [
            { id: "a", text: "À Annecy" },
            { id: "b", text: "Près de Lyon" },
            { id: "c", text: "À la montagne" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "À Annecy", explanation: "Karim le précise directement." },
        },
        {
          kind: "vrai_faux",
          id: "fin-a2-audio-1-q3",
          prompt: "Le nouveau camping est plus proche que le premier.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "« C'est à peu près une heure de route en plus » : il est plus loin." },
        },
        {
          kind: "qcm",
          id: "fin-a2-audio-1-q4",
          prompt: "À quelle heure Karim propose-t-il de partir ?",
          choices: [
            { id: "a", text: "Vers 8h" },
            { id: "b", text: "Vers 9h" },
            { id: "c", text: "Vers 10h" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Vers 8h", explanation: "« si on part une heure plus tôt ... vers 8h »." },
        },
      ],
    },
  ],
  guidedProduction: {
    dimension: "production_guidee",
    exercise: {
      id: "fin-a2-production-orale",
      skillId: "assessment-fin-a2-po",
      difficulty: "A2",
      type: "production_orale",
      instructions: "Prépare-toi, puis enregistre-toi.",
      consigne: "Raconte un souvenir de vacances qui t'a marqué·e : où, quand, avec qui.",
      prepSeconds: 30,
      maxSpeakSeconds: 60,
      selfAssessmentCriteria: [
        "J'ai utilisé le passé (composé et/ou imparfait) correctement.",
        "J'ai donné au moins trois informations concrètes.",
        "J'ai organisé mon récit dans l'ordre chronologique.",
      ],
    },
  },
};

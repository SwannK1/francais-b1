import type { Exam } from "@/lib/pedagogy/types";

/**
 * Évaluation finale A1 — même type `Exam` que le B1 (`Exam` ne référence
 * jamais `StageId`, donc pas de raison de le dupliquer, voir `./types.ts`).
 * Contenu 100% original, inspiré des 4 épreuves du DELF A1 sans reproduire
 * aucun sujet officiel — voir la consigne "Préparation DELF" du chantier.
 * Mesure le niveau A1 dans son ensemble (pas seulement de la grammaire
 * récitée) : compréhension, puis production, à l'écrit et à l'oral.
 */
export const EXAMS_A1: Exam[] = [
  {
    id: "exam-a1-evaluation-finale",
    slug: "evaluation-finale-a1",
    title: "Évaluation finale A1",
    type: "delf",
    level: "A1",
    description:
      "Épreuve de fin de parcours A1, au format inspiré du DELF A1, avec un contenu entièrement original. Elle vérifie que les 5 grandes compétences A1 (CE, CO, interaction, production écrite, production orale) sont acquises.",
    durationMinutes: 35,
    maxScore: 100,
    passingScore: 50,
    isBlanc: true,
    sections: [
      {
        id: "exam-a1-co",
        title: "Compréhension orale",
        delfSection: "comprehension_orale",
        durationMinutes: 10,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a1-co-1",
            type: "comprehension_orale",
            skillId: "a1-co-annonces-simples",
            difficulty: "A1",
            instructions: "Écoutez l'annonce, puis répondez aux questions.",
            audioSrc: "/audio/a1/transports/retard-train.m4a",
            transcript:
              "Mesdames et messieurs, votre attention s'il vous plaît. Le train à destination de Bordeaux est annoncé avec vingt minutes de retard, en raison d'un problème technique. Nous nous excusons pour la gêne occasionnée.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a1-co-1-q1",
                prompt: "Pourquoi le train est-il en retard ?",
                choices: [
                  { id: "a", text: "À cause de la météo" },
                  { id: "b", text: "À cause d'un problème technique" },
                  { id: "c", text: "À cause d'une grève" },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "À cause d'un problème technique",
                  explanation: "L'annonce dit : « en raison d'un problème technique ».",
                },
              },
            ],
          },
          {
            id: "exam-a1-co-2",
            type: "comprehension_orale",
            skillId: "a1-co-dialogues-quotidiens",
            difficulty: "A1",
            instructions: "Écoutez le dialogue, puis répondez à la question.",
            audioSrc: "/audio/a1/cafe-restaurant/addition.m4a",
            transcript:
              "Karim — L'addition, s'il vous plaît.\nServeur — Bien sûr. Ça fait vingt-quatre euros en tout.\nNadia — On partage, Karim ? Douze euros chacun.\nKarim — D'accord, pas de problème.\nServeur — Vous payez ensemble ou séparément ?\nNadia — Ensemble, par carte.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a1-co-2-q1",
                prompt: "Combien chaque personne paie-t-elle ?",
                choices: [
                  { id: "a", text: "24 euros" },
                  { id: "b", text: "12 euros" },
                  { id: "c", text: "10 euros" },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "12 euros",
                  explanation: "Nadia propose : « Douze euros chacun ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-a1-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
        durationMinutes: 10,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a1-ce-1",
            type: "comprehension_ecrite",
            skillId: "a1-ce-panneaux-annonces",
            difficulty: "A1",
            instructions: "Lisez l'affiche, puis répondez aux questions.",
            text: "Marché de Noël, place de la mairie. Du 5 au 20 décembre, de 10h à 20h. Entrée gratuite.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a1-ce-1-q1",
                prompt: "Où a lieu le marché de Noël ?",
                choices: [
                  { id: "a", text: "Place de la mairie" },
                  { id: "b", text: "À la gare" },
                  { id: "c", text: "Au parc" },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Place de la mairie",
                  explanation: "« Marché de Noël, place de la mairie. »",
                },
              },
              {
                kind: "vrai_faux",
                id: "exam-a1-ce-1-q2",
                prompt: "Vrai ou faux : il faut payer pour entrer.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Entrée gratuite. »",
                },
              },
            ],
          },
          {
            id: "exam-a1-ce-2",
            type: "comprehension_ecrite",
            skillId: "a1-ce-messages-simples",
            difficulty: "A1",
            instructions: "Lisez le message, puis répondez.",
            text:
              "Salut ! On se retrouve samedi à 14h devant le cinéma ? J'ai très envie de voir le nouveau film " +
              "d'aventure. Réponds-moi vite !",
            questions: [
              {
                kind: "libre",
                id: "exam-a1-ce-2-q1",
                prompt: "Où et quand propose-t-on de se retrouver ?",
                expectedAnswer: "Devant le cinéma, samedi à 14h.",
                correction: {
                  correctAnswer: "Devant le cinéma, samedi à 14h.",
                  explanation: "« On se retrouve samedi à 14h devant le cinéma ? »",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-a1-pe",
        title: "Production écrite",
        delfSection: "production_ecrite",
        durationMinutes: 10,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a1-pe-1",
            type: "production_ecrite",
            skillId: "a1-pe-message-simple",
            difficulty: "A1",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Vous écrivez à un(e) ami(e) pour lui proposer une sortie ce week-end. Précisez le jour, l'heure, " +
              "le lieu, et l'activité (5-6 phrases).",
            minWords: 25,
            maxWords: 60,
            correctionCriteria: [
              "Jour et heure précisés (/1)",
              "Lieu précisé (/1)",
              "Activité clairement proposée (/1)",
              "Phrases simples et compréhensibles, formule de politesse (/1)",
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
      {
        id: "exam-a1-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 5,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a1-po-1",
            type: "production_orale",
            skillId: "a1-pe-se-presenter",
            difficulty: "A1",
            instructions: "Préparez-vous, puis enregistrez-vous.",
            consigne:
              "Présentez-vous : votre nom, votre âge, votre nationalité, votre famille, votre logement et un " +
              "loisir. Puis dites ce que vous allez faire le week-end prochain.",
            context: "Entretien dirigé, format proche du DELF A1 : l'examinateur pose des questions personnelles simples.",
            prepSeconds: 60,
            maxSpeakSeconds: 120,
            selfAssessmentCriteria: [
              "J'ai donné mon identité complète (nom, âge, nationalité).",
              "J'ai parlé de ma famille et de mon logement.",
              "J'ai mentionné un loisir et un projet au futur proche.",
              "Mes phrases sont compréhensibles d'un bout à l'autre, même avec des pauses.",
            ],
          },
        ],
      },
    ],
  },
];

export function getA1ExamBySlug(slug: string): Exam | undefined {
  return EXAMS_A1.find((exam) => exam.slug === slug);
}

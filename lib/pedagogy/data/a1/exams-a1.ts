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
            audioSrc: "/audio/a1/examen-final/exam-a1-co-1.mp3",
            transcript: "Le prochain train pour Nantes partira à 9 heures 45, voie 3, avec 5 minutes de retard.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a1-co-1-q1",
                prompt: "Quelle est la destination du train ?",
                choices: [
                  { id: "a", text: "Nantes" },
                  { id: "b", text: "Lyon" },
                  { id: "c", text: "Marseille" },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Nantes",
                  explanation: "« Le prochain train pour Nantes... »",
                },
              },
              {
                kind: "vrai_faux",
                id: "exam-a1-co-1-q2",
                prompt: "Vrai ou faux : le train est à l'heure.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Avec 5 minutes de retard. »",
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
            audioSrc: "/audio/a1/examen-final/exam-a1-co-2.mp3",
            transcript: "— Bonjour, je voudrais un croissant et un café, s'il vous plaît. — Ça fait 3 euros 50.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a1-co-2-q1",
                prompt: "Combien coûte la commande ?",
                choices: [
                  { id: "a", text: "3,50 €" },
                  { id: "b", text: "5,30 €" },
                  { id: "c", text: "3 €" },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "3,50 €",
                  explanation: "« Ça fait 3 euros 50. »",
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

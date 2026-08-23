import type { Exam } from "@/lib/pedagogy/types";

/**
 * Exemple d'examen fictif B1, contenu 100% original — ne reproduit aucun
 * sujet officiel DELF ou TCF. Sert uniquement à valider la structure de données.
 */
export const EXAMS: Exam[] = [
  {
    id: "exam-b1-demo",
    slug: "delf-b1-entrainement-demo",
    title: "Entraînement B1 — Épreuve de démonstration",
    type: "delf",
    level: "B1",
    description:
      "Épreuve fictive inspirée du format DELF B1, avec un contenu entièrement original, à but d'entraînement.",
    durationMinutes: 45,
    maxScore: 100,
    passingScore: 50,
    isBlanc: false,
    sections: [
      {
        id: "exam-b1-ce",
        title: "Compréhension écrite",
        domain: "comprehension_ecrite",
        durationMinutes: 15,
        maxScore: 34,
        exercises: [
          {
            id: "exam-b1-ce-1",
            type: "comprehension_ecrite",
            skillId: "ce-textes-courants",
            difficulty: "B1",
            instructions: "Lisez l'annonce, puis répondez aux questions.",
            text:
              "« L'association Les Mots Voyageurs recherche des bénévoles pour animer des ateliers " +
              "de conversation en français, deux fois par mois, le samedi matin. Aucune expérience " +
              "n'est exigée, mais une bonne humeur communicative est indispensable ! »",
            questions: [
              {
                kind: "qcm",
                id: "exam-b1-ce-1-q1",
                prompt: "À quelle fréquence ont lieu les ateliers ?",
                choices: [
                  { id: "a", text: "Une fois par semaine." },
                  { id: "b", text: "Deux fois par mois." },
                  { id: "c", text: "Une fois par mois." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Deux fois par mois.",
                  explanation: "Le texte précise « deux fois par mois, le samedi matin ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-b1-co",
        title: "Compréhension orale",
        domain: "comprehension_orale",
        durationMinutes: 10,
        maxScore: 33,
        exercises: [
          {
            id: "exam-b1-co-1",
            type: "comprehension_orale",
            skillId: "co-dialogues-simples",
            difficulty: "B1",
            instructions: "Écoutez l'annonce, puis répondez à la question.",
            audioSrc: "/audio/demo/exam-b1-annonce.mp3",
            transcript:
              "« Attention, le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. »",
            questions: [
              {
                kind: "qcm",
                id: "exam-b1-co-1-q1",
                prompt: "Quel changement est annoncé ?",
                choices: [
                  { id: "a", text: "Le train est annulé." },
                  { id: "b", text: "Le train change de voie." },
                  { id: "c", text: "Le train est retardé." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Le train change de voie.",
                  explanation: "L'annonce indique un départ « voie 4 au lieu de la voie 2 ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-b1-pe",
        title: "Production écrite",
        domain: "production_ecrite",
        durationMinutes: 20,
        maxScore: 33,
        exercises: [
          {
            id: "exam-b1-pe-1",
            type: "production_ecrite",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Vous répondez à un forum en ligne : donnez votre avis sur l'intérêt des ateliers de conversation pour apprendre une langue.",
            minWords: 80,
            maxWords: 150,
            correctionCriteria: [
              "Une opinion claire",
              "Des arguments justifiés",
              "Des connecteurs logiques",
              "Une orthographe et une grammaire correctes",
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
    ],
  },
];

export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find((exam) => exam.slug === slug);
}

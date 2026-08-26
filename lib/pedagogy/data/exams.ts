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
    durationMinutes: 47,
    maxScore: 125,
    passingScore: 63,
    isBlanc: false,
    sections: [
      {
        id: "exam-b1-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
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
        delfSection: "comprehension_orale",
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
        delfSection: "production_ecrite",
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
      {
        id: "exam-b1-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 2,
        maxScore: 25,
        exercises: [
          {
            id: "exam-b1-po-1",
            type: "production_orale",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Préparez-vous, puis enregistrez-vous.",
            consigne:
              "Certaines villes limitent la circulation des voitures en centre-ville. Donnez votre opinion sur cette mesure et justifiez-la, pendant environ 1 à 2 minutes.",
            prepSeconds: 120,
            maxSpeakSeconds: 120,
            selfAssessmentCriteria: [
              "J'ai répondu clairement à la consigne.",
              "Mon discours est compréhensible d'un bout à l'autre.",
              "J'ai donné une opinion claire.",
              "J'ai justifié mon opinion avec au moins un argument.",
              "J'ai relié mes idées avec des connecteurs (par exemple, cependant, donc...).",
              "J'ai utilisé un vocabulaire adapté au sujet.",
            ],
            tips:
              "Pas de mauvaise réponse : l'objectif est de parler 1 à 2 minutes de façon compréhensible et organisée, pas de convaincre.",
          },
        ],
      },
    ],
  },
];

export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find((exam) => exam.slug === slug);
}

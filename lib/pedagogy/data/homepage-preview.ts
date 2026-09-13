import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

/**
 * Exercice d'essai public de la page d'accueil (`components/marketing/TryItNow.tsx`) —
 * un visiteur non connecté doit pouvoir faire un vrai exercice avant de
 * s'inscrire. Contenu copié tel quel depuis l'exercice réel du catalogue
 * (`lib/pedagogy/data/a1/modules/banque-ecoute.ts`, module "Écoute libre :
 * prix et achats", exercice `a1-prix-a-la-boulangerie`) — mêmes audio,
 * transcription et question — plutôt qu'un contenu inventé pour l'accueil.
 * Identifiant distinct pour ne jamais se confondre, côté analytics ou
 * progression, avec la tentative faite plus tard dans le vrai module.
 */
export const HOMEPAGE_PREVIEW_EXERCISE: ComprehensionOraleExercise = {
  id: "home-preview-boulangerie",
  type: "comprehension_orale",
  skillId: "a1-co-dialogues-quotidiens",
  difficulty: "A1",
  instructions: "Écoute le dialogue, puis réponds.",
  audioSrc: "/audio/a1/prix-achats/a-la-boulangerie.m4a",
  transcript:
    "Marc — Bonjour ! Une baguette, s'il vous plaît.\nVendeuse — Voilà. Et avec ça ?\nMarc — Un croissant aussi, s'il vous plaît.\nVendeuse — D'accord, ça fait deux euros cinquante.\nMarc — Voilà, merci !",
  questions: [
    {
      kind: "qcm",
      id: "home-preview-boulangerie-q1",
      prompt: "Combien Marc paie-t-il en tout ?",
      choices: [
        { id: "a", text: "2 euros" },
        { id: "b", text: "2,50 euros" },
        { id: "c", text: "5 euros" },
      ],
      correctChoiceId: "b",
      correction: {
        correctAnswer: "2,50 euros",
        explanation: "La vendeuse dit : « Ça fait deux euros cinquante ».",
      },
    },
  ],
};

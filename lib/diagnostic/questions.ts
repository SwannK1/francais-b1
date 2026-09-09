import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

/**
 * Banque de questions du diagnostic — contenu original, indépendant de
 * `PLACEMENT_QUESTIONS` (`/test-niveau`). 18 questions, 3 paliers de niveau
 * (A1, A2, B1) x 3 domaines (compréhension écrite, vocabulaire, grammaire) x
 * 2 questions par domaine et par palier — voir `docs/diagnostic-scoring.md`
 * pour la logique de calcul qui s'appuie sur cette répartition régulière.
 *
 * Administrées dans l'ordre du tableau (palier A1 en premier, puis A2, puis
 * B1) : difficulté progressive, jamais mélangée. Compréhension orale
 * volontairement absente — voir `docs/diagnostic-scoring.md` § Portée.
 */
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // --- Palier A1 ---
  {
    id: "diag-a1-1",
    level: "A1",
    skill: "grammaire",
    order: 1,
    prompt: "Complétez : « Elle ___ française. »",
    choices: [
      { id: "a", text: "est" },
      { id: "b", text: "es" },
      { id: "c", text: "suis" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-a1-2",
    level: "A1",
    skill: "vocabulaire",
    order: 2,
    prompt: "Quel mot veut dire « au revoir » ?",
    choices: [
      { id: "a", text: "Bonjour" },
      { id: "b", text: "À bientôt" },
      { id: "c", text: "Merci" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-a1-3",
    level: "A1",
    skill: "comprehension_ecrite",
    order: 3,
    prompt: "Un panneau dans un magasin indique « Caisse fermée ». Que peux-tu faire à cette caisse ?",
    choices: [
      { id: "a", text: "Payer ici" },
      { id: "b", text: "Aller à une autre caisse" },
      { id: "c", text: "Entrer dans le magasin" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-a1-4",
    level: "A1",
    skill: "grammaire",
    order: 4,
    prompt: "Complétez : « Nous ___ deux enfants. »",
    choices: [
      { id: "a", text: "avons" },
      { id: "b", text: "ont" },
      { id: "c", text: "as" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-a1-5",
    level: "A1",
    skill: "vocabulaire",
    order: 5,
    prompt: "Quel jour vient juste après lundi ?",
    choices: [
      { id: "a", text: "Dimanche" },
      { id: "b", text: "Mardi" },
      { id: "c", text: "Mercredi" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-a1-6",
    level: "A1",
    skill: "comprehension_ecrite",
    order: 6,
    prompt: "Un message dit : « Le bus n°8 est annulé. Prenez le bus n°12. » Comment aller à destination ?",
    choices: [
      { id: "a", text: "En bus n°8" },
      { id: "b", text: "En bus n°12" },
      { id: "c", text: "À pied" },
    ],
    correctChoiceId: "b",
  },

  // --- Palier A2 ---
  {
    id: "diag-a2-1",
    level: "A2",
    skill: "grammaire",
    order: 1,
    prompt: "Complétez : « Quand j'étais petit, je ___ à la piscine tous les samedis. »",
    choices: [
      { id: "a", text: "suis allé" },
      { id: "b", text: "allais" },
      { id: "c", text: "irai" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-a2-2",
    level: "A2",
    skill: "vocabulaire",
    order: 2,
    prompt: "Quel adjectif décrit une personne qui aide facilement les autres ?",
    choices: [
      { id: "a", text: "Serviable" },
      { id: "b", text: "Pressée" },
      { id: "c", text: "Inquiète" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-a2-3",
    level: "A2",
    skill: "comprehension_ecrite",
    order: 3,
    prompt:
      "Un e-mail dit : « Merci de confirmer votre présence avant vendredi, sinon votre place sera donnée à quelqu'un d'autre. » Que se passe-t-il si tu ne réponds pas avant vendredi ?",
    choices: [
      { id: "a", text: "Tu perds ta place" },
      { id: "b", text: "Ta place est garantie" },
      { id: "c", text: "La réunion est annulée" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-a2-4",
    level: "A2",
    skill: "grammaire",
    order: 4,
    prompt: "Complétez : « Demain, il ___ plus froid. »",
    choices: [
      { id: "a", text: "fait" },
      { id: "b", text: "fera" },
      { id: "c", text: "faisait" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-a2-5",
    level: "A2",
    skill: "vocabulaire",
    order: 5,
    prompt: "Quel mot signifie le contraire de « bruyant » ?",
    choices: [
      { id: "a", text: "Calme" },
      { id: "b", text: "Rapide" },
      { id: "c", text: "Lourd" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-a2-6",
    level: "A2",
    skill: "comprehension_ecrite",
    order: 6,
    prompt:
      "Une notice dit : « Ce médicament se prend une fois par jour, de préférence le matin. » Quand faut-il le prendre ?",
    choices: [
      { id: "a", text: "Le soir uniquement" },
      { id: "b", text: "De préférence le matin" },
      { id: "c", text: "Trois fois par jour" },
    ],
    correctChoiceId: "b",
  },

  // --- Palier B1 ---
  {
    id: "diag-b1-1",
    level: "B1",
    skill: "grammaire",
    order: 1,
    prompt: "Complétez : « Il faut que tu ___ à l'heure demain. »",
    choices: [
      { id: "a", text: "es" },
      { id: "b", text: "sois" },
      { id: "c", text: "seras" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-b1-2",
    level: "B1",
    skill: "vocabulaire",
    order: 2,
    prompt: "Quelle expression introduit une opposition ?",
    choices: [
      { id: "a", text: "En revanche" },
      { id: "b", text: "De plus" },
      { id: "c", text: "Par exemple" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-b1-3",
    level: "B1",
    skill: "comprehension_ecrite",
    order: 3,
    prompt:
      "Un texte dit : « Bien que les résultats soient encourageants, l'équipe reste prudente quant à l'avenir. » Quelle est l'attitude de l'équipe ?",
    choices: [
      { id: "a", text: "Totalement confiante" },
      { id: "b", text: "Positive mais prudente" },
      { id: "c", text: "Découragée" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-b1-4",
    level: "B1",
    skill: "grammaire",
    order: 4,
    prompt: "Complétez : « Si j'avais eu le temps, je ___ ce livre. »",
    choices: [
      { id: "a", text: "lirai" },
      { id: "b", text: "aurais lu" },
      { id: "c", text: "lisais" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "diag-b1-5",
    level: "B1",
    skill: "vocabulaire",
    order: 5,
    prompt: "Quel mot est le plus proche de « par conséquent » ?",
    choices: [
      { id: "a", text: "Donc" },
      { id: "b", text: "Cependant" },
      { id: "c", text: "D'ailleurs" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "diag-b1-6",
    level: "B1",
    skill: "comprehension_ecrite",
    order: 6,
    prompt:
      "Un rapport souligne que « la hausse des prix touche surtout les produits importés, sans épargner totalement la production locale. » Qui est touché par la hausse des prix ?",
    choices: [
      { id: "a", text: "Uniquement les produits importés" },
      { id: "b", text: "Surtout les produits importés, mais pas seulement" },
      { id: "c", text: "Uniquement la production locale" },
    ],
    correctChoiceId: "b",
  },
];

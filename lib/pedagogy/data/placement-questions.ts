import type { PlacementQuestion } from "@/lib/pedagogy/types";

/**
 * Série de questions réparties par difficulté (A1 à B2), contenu original.
 * Sert à un test de positionnement indicatif, pas à une certification officielle.
 */
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "pq-a1-1",
    level: "A1",
    domain: "vocabulaire",
    prompt: "Comment dit-on « bonjour » de façon polie le soir ?",
    choices: [
      { id: "a", text: "Bonsoir" },
      { id: "b", text: "Bonne nuit" },
      { id: "c", text: "À bientôt" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "pq-a1-2",
    level: "A1",
    domain: "grammaire",
    prompt: "Complétez : « Je ___ étudiant. »",
    choices: [
      { id: "a", text: "es" },
      { id: "b", text: "suis" },
      { id: "c", text: "est" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-a1-3",
    level: "A1",
    domain: "comprehension_ecrite",
    prompt: "Un panneau indique « Fermé le dimanche ». Le magasin est ouvert...",
    choices: [
      { id: "a", text: "Le dimanche" },
      { id: "b", text: "Tous les jours sauf le dimanche" },
      { id: "c", text: "Seulement le dimanche" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-a2-1",
    level: "A2",
    domain: "grammaire",
    prompt: "Complétez : « Hier, je ___ au cinéma. »",
    choices: [
      { id: "a", text: "vais" },
      { id: "b", text: "suis allé" },
      { id: "c", text: "irai" },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-a2-2",
    level: "A2",
    domain: "vocabulaire",
    prompt: "Quel mot décrit une personne qui arrive après l'heure prévue ?",
    choices: [
      { id: "a", text: "En avance" },
      { id: "b", text: "À l'heure" },
      { id: "c", text: "En retard" },
    ],
    correctChoiceId: "c",
  },
  {
    id: "pq-a2-3",
    level: "A2",
    domain: "comprehension_ecrite",
    prompt: "Un message dit : « RDV reporté à vendredi ». Que s'est-il passé ?",
    choices: [
      { id: "a", text: "Le rendez-vous a été annulé." },
      { id: "b", text: "Le rendez-vous a changé de date." },
      { id: "c", text: "Le rendez-vous a été confirmé." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-b1-1",
    level: "B1",
    domain: "grammaire",
    prompt: "Complétez : « Il faisait beau quand nous ___ la promenade. »",
    choices: [
      { id: "a", text: "avons commencé" },
      { id: "b", text: "commencions" },
      { id: "c", text: "commencerons" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "pq-b1-2",
    level: "B1",
    domain: "vocabulaire",
    prompt: "Quelle expression sert à nuancer une opinion ?",
    choices: [
      { id: "a", text: "C'est évident." },
      { id: "b", text: "Dans une certaine mesure, je suis d'accord." },
      { id: "c", text: "Je ne sais rien." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-b1-3",
    level: "B1",
    domain: "comprehension_ecrite",
    prompt:
      "Un texte dit : « Le projet avance bien, cependant certains délais ne seront pas tenus. » Quelle est l'idée principale ?",
    choices: [
      { id: "a", text: "Le projet est un échec complet." },
      { id: "b", text: "Le projet progresse mais avec des difficultés." },
      { id: "c", text: "Le projet est terminé." },
    ],
    correctChoiceId: "b",
  },
  {
    id: "pq-b2-1",
    level: "B2",
    domain: "grammaire",
    prompt: "Complétez : « Si j'avais su, je ne ___ pas venu. »",
    choices: [
      { id: "a", text: "serais" },
      { id: "b", text: "suis" },
      { id: "c", text: "étais" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "pq-b2-2",
    level: "B2",
    domain: "vocabulaire",
    prompt: "Quel mot est le plus proche de « néanmoins » ?",
    choices: [
      { id: "a", text: "Toutefois" },
      { id: "b", text: "Ensuite" },
      { id: "c", text: "Absolument" },
    ],
    correctChoiceId: "a",
  },
  {
    id: "pq-b2-3",
    level: "B2",
    domain: "comprehension_ecrite",
    prompt:
      "Un éditorial critique une décision « tout en reconnaissant sa nécessité ». L'auteur est...",
    choices: [
      { id: "a", text: "Entièrement favorable, sans réserve." },
      { id: "b", text: "Critique, mais admet une part de justification." },
      { id: "c", text: "Totalement opposé, sans nuance." },
    ],
    correctChoiceId: "b",
  },
];

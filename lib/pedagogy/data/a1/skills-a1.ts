import type { Skill } from "@/lib/pedagogy/types";

/**
 * Compétences A1 — même type `Skill` que le B1 (il ne référence jamais
 * `StageId`, donc pas de raison de le dupliquer, voir `./types.ts`).
 * Tous les identifiants sont préfixés `a1-` pour une isolation totale vis-à-vis
 * de `SKILLS` (B1) et des chantiers `a2-content`/`a2-audio` : même si ces
 * tableaux ne sont fusionnés qu'au moment de l'intégration, aucun risque de
 * collision d'id entre-temps.
 */
export const SKILLS_A1: Skill[] = [
  // --- Grammaire ---
  {
    id: "a1-gr-etre-avoir",
    domain: "grammaire",
    name: "Être et avoir au présent",
    description: "Conjuguer être et avoir au présent pour se présenter et décrire.",
  },
  {
    id: "a1-gr-verbes-er",
    domain: "grammaire",
    name: "Verbes réguliers en -er",
    description: "Conjuguer au présent les verbes réguliers en -er (parler, habiter, aimer...).",
  },
  {
    id: "a1-gr-verbes-irreguliers",
    domain: "grammaire",
    name: "Verbes fréquents irréguliers",
    description: "Conjuguer au présent aller, faire, venir et prendre.",
  },
  {
    id: "a1-gr-articles",
    domain: "grammaire",
    name: "Articles et genre",
    description: "Utiliser les articles définis et indéfinis selon le genre et le nombre du nom.",
  },
  {
    id: "a1-gr-possessifs",
    domain: "grammaire",
    name: "Adjectifs possessifs",
    description: "Utiliser mon/ma/mes, ton/ta/tes, son/sa/ses pour parler de sa famille et de ses affaires.",
  },
  {
    id: "a1-gr-negation",
    domain: "grammaire",
    name: "La négation ne...pas",
    description: "Construire une phrase négative simple avec ne...pas.",
  },
  {
    id: "a1-gr-interrogation",
    domain: "grammaire",
    name: "Poser une question simple",
    description: "Poser une question avec est-ce que ou un mot interrogatif (qui, où, quand, combien...).",
  },
  {
    id: "a1-gr-prepositions-lieu",
    domain: "grammaire",
    name: "Prépositions de lieu",
    description: "Situer un lieu avec à, dans, sur, sous, devant, derrière, et les contractions au/aux/du/des.",
  },
  {
    id: "a1-gr-il-y-a-cest",
    domain: "grammaire",
    name: "Il y a / c'est / ce sont",
    description: "Utiliser il y a pour signaler une présence, et c'est/ce sont pour identifier.",
  },
  {
    id: "a1-gr-futur-proche",
    domain: "grammaire",
    name: "Le futur proche",
    description: "Annoncer une action à venir avec aller + infinitif.",
  },
  {
    id: "a1-gr-imperatif",
    domain: "grammaire",
    name: "L'impératif simple",
    description: "Donner un ordre, un conseil ou une instruction simple à l'impératif.",
  },
  {
    id: "a1-gr-quantite",
    domain: "grammaire",
    name: "Expressions de quantité",
    description: "Exprimer une quantité avec un peu de, beaucoup de, un/une/des, ou un nombre.",
  },

  // --- Vocabulaire ---
  {
    id: "a1-voc-identite",
    domain: "vocabulaire",
    name: "L'identité",
    description: "Mots pour saluer, dire son nom, épeler et donner sa nationalité.",
  },
  {
    id: "a1-voc-nombres",
    domain: "vocabulaire",
    name: "Nombres, âge et prix",
    description: "Nombres usuels pour l'âge, le téléphone, le prix et l'heure.",
  },
  {
    id: "a1-voc-temps",
    domain: "vocabulaire",
    name: "Jours, mois et heure",
    description: "Mots pour donner la date, l'heure et parler des saisons.",
  },
  {
    id: "a1-voc-famille",
    domain: "vocabulaire",
    name: "La famille",
    description: "Mots pour nommer les membres de la famille et les liens familiaux.",
  },
  {
    id: "a1-voc-description",
    domain: "vocabulaire",
    name: "Décrire une personne",
    description: "Mots simples pour décrire le physique et le caractère de quelqu'un.",
  },
  {
    id: "a1-voc-vetements",
    domain: "vocabulaire",
    name: "Vêtements et couleurs",
    description: "Mots pour nommer des vêtements et des couleurs.",
  },
  {
    id: "a1-voc-maison",
    domain: "vocabulaire",
    name: "La maison",
    description: "Mots pour nommer les pièces et les objets courants d'un logement.",
  },
  {
    id: "a1-voc-ville",
    domain: "vocabulaire",
    name: "La ville",
    description: "Mots pour nommer des lieux et des commerces, et demander son chemin.",
  },
  {
    id: "a1-voc-transports",
    domain: "vocabulaire",
    name: "Les transports",
    description: "Mots pour prendre le métro, le bus ou le train : billet, horaires, destination.",
  },
  {
    id: "a1-voc-alimentation",
    domain: "vocabulaire",
    name: "Nourriture et boissons",
    description: "Mots pour nommer des aliments et des boissons, et commander au café ou au restaurant.",
  },
  {
    id: "a1-voc-achats",
    domain: "vocabulaire",
    name: "Faire des achats",
    description: "Mots pour demander un produit, une taille, une couleur, et payer.",
  },
  {
    id: "a1-voc-quotidien",
    domain: "vocabulaire",
    name: "Activités quotidiennes",
    description: "Mots pour décrire une journée type et sa fréquence.",
  },
  {
    id: "a1-voc-loisirs",
    domain: "vocabulaire",
    name: "Loisirs et goûts",
    description: "Mots pour parler de ses loisirs, de ses préférences et des sorties du week-end.",
  },
  {
    id: "a1-voc-travail-etudes",
    domain: "vocabulaire",
    name: "Travail et études",
    description: "Mots pour nommer une profession, un lieu de travail ou d'études.",
  },
  {
    id: "a1-voc-sante",
    domain: "vocabulaire",
    name: "Le corps et la santé",
    description: "Mots pour nommer les parties du corps et dire qu'on a mal.",
  },
  {
    id: "a1-voc-meteo",
    domain: "vocabulaire",
    name: "La météo",
    description: "Mots pour dire le temps qu'il fait et la température.",
  },
  {
    id: "a1-voc-invitations",
    domain: "vocabulaire",
    name: "Invitations et rendez-vous",
    description: "Mots pour proposer, accepter ou refuser un rendez-vous.",
  },

  // --- Compréhension écrite / orale ---
  {
    id: "a1-ce-messages-simples",
    domain: "comprehension_ecrite",
    name: "Comprendre un message écrit simple",
    description: "Comprendre un court message ou une fiche pratique sur un sujet familier.",
  },
  {
    id: "a1-ce-panneaux-annonces",
    domain: "comprehension_ecrite",
    name: "Comprendre un panneau ou une annonce écrite",
    description: "Repérer une information utile dans un panneau, un menu ou une petite annonce.",
  },
  {
    id: "a1-co-dialogues-quotidiens",
    domain: "comprehension_orale",
    name: "Comprendre un dialogue du quotidien",
    description: "Comprendre l'essentiel d'un échange court et clair sur un sujet familier.",
  },
  {
    id: "a1-co-annonces-simples",
    domain: "comprehension_orale",
    name: "Comprendre une annonce orale simple",
    description: "Comprendre une annonce courte et clairement articulée (gare, magasin...).",
  },

  // --- Production écrite (et orale, mêmes compétences réutilisées) ---
  {
    id: "a1-pe-se-presenter",
    domain: "production_ecrite",
    name: "Se présenter",
    description: "Donner des informations simples sur soi, à l'écrit comme à l'oral.",
  },
  {
    id: "a1-pe-decrire",
    domain: "production_ecrite",
    name: "Décrire",
    description: "Décrire une personne, un lieu ou une journée avec des phrases simples.",
  },
  {
    id: "a1-pe-message-simple",
    domain: "production_ecrite",
    name: "Écrire un message simple",
    description: "Rédiger un message court et clair (invitation, demande, réponse).",
  },

  // --- Préparation examen ---
  {
    id: "a1-exam-delf-a1",
    domain: "preparation_examen",
    name: "Préparation DELF A1",
    description: "Compétences attendues pour l'examen DELF A1.",
  },
];

export function getA1SkillById(id: string): Skill | undefined {
  return SKILLS_A1.find((skill) => skill.id === id);
}

import type { Skill } from "@/lib/pedagogy/types";

export const SKILLS: Skill[] = [
  {
    id: "ce-textes-courants",
    domain: "comprehension_ecrite",
    name: "Comprendre un texte courant",
    description: "Comprendre l'idée générale et les détails d'un texte simple.",
  },
  {
    id: "co-dialogues-simples",
    domain: "comprehension_orale",
    name: "Comprendre un dialogue",
    description: "Comprendre une conversation ou un message audio clair.",
  },
  {
    id: "gr-connecteurs-logiques",
    domain: "grammaire",
    name: "Connecteurs logiques",
    description: "Utiliser des mots comme « parce que », « donc », « cependant ».",
  },
  {
    id: "gr-passe-compose-imparfait",
    domain: "grammaire",
    name: "Passé composé et imparfait",
    description: "Raconter des événements passés avec les bons temps.",
  },
  {
    id: "voc-opinion",
    domain: "vocabulaire",
    name: "Vocabulaire de l'opinion",
    description: "Mots et expressions pour donner un avis.",
  },
  {
    id: "voc-administratif",
    domain: "vocabulaire",
    name: "Vocabulaire administratif",
    description: "Mots utilisés dans les démarches administratives.",
  },
  {
    id: "pe-exprimer-avis",
    domain: "production_ecrite",
    name: "Exprimer et justifier un avis",
    description: "Écrire un texte court pour donner et justifier son opinion.",
  },
  {
    id: "pe-recit",
    domain: "production_ecrite",
    name: "Rédiger un récit",
    description: "Raconter un événement passé de façon claire.",
  },
  {
    id: "exam-delf-b1",
    domain: "preparation_examen",
    name: "Préparation DELF B1",
    description: "Compétences attendues pour l'examen DELF B1.",
  },
  {
    id: "gr-pronoms-complements",
    domain: "grammaire",
    name: "Pronoms compléments (le/la/les, lui/leur, y, en)",
    description: "Remplacer un nom déjà mentionné pour éviter de le répéter.",
  },
  {
    id: "gr-subjonctif-il-faut-que",
    domain: "grammaire",
    name: "Il faut que + subjonctif",
    description: "Exprimer une obligation en précisant qui doit agir.",
  },
  {
    id: "voc-travail",
    domain: "vocabulaire",
    name: "Vocabulaire du travail",
    description: "Mots pour décrire un métier, un poste, un parcours professionnel.",
  },
  {
    id: "voc-problemes-quotidien",
    domain: "vocabulaire",
    name: "Problèmes du quotidien",
    description: "Mots pour signaler une panne ou un problème et demander une solution.",
  },
  {
    id: "pe-expliquer-probleme",
    domain: "production_ecrite",
    name: "Expliquer un problème par écrit",
    description: "Décrire un problème, sa cause, et demander une solution claire.",
  },
  {
    id: "pe-presentation-professionnelle",
    domain: "production_ecrite",
    name: "Se présenter professionnellement",
    description: "Décrire son travail, son parcours et un projet professionnel.",
  },
  {
    id: "pe-clarifier-demarche",
    domain: "production_ecrite",
    name: "Demander une clarification par écrit",
    description: "Poser une question claire et polie sur une démarche administrative.",
  },
];

export function getSkillById(id: string): Skill | undefined {
  return SKILLS.find((skill) => skill.id === id);
}

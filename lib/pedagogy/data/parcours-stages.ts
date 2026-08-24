import type { SkillDomain } from "@/lib/pedagogy/types";

/**
 * Grandes étapes du parcours B1 — regroupent les modules par ce que l'apprenant
 * sait faire (compétence), pas par chapitre de grammaire. `domains` réutilise
 * le `SkillDomain` qui pilote déjà tout le contenu : ajouter un module dans un
 * domaine suffit à le faire apparaître dans la bonne étape, sans double saisie.
 *
 * Nomenclature : "Stage" à l'identique en anglais dans le code (types,
 * fichiers, routes) — c'est "Étape" pour l'apprenant, partout dans l'UI.
 */
export type StageKind = "diagnostic" | "content" | "practice" | "bilan";

export interface ParcoursStage {
  id: string;
  slug: string;
  order: number;
  kind: StageKind;
  title: string;
  /** Formulation "je peux..." : ce que l'étape permet de savoir faire. */
  objective: string;
  description: string;
  domains?: SkillDomain[];
}

export const PARCOURS_STAGES: ParcoursStage[] = [
  {
    id: "faire-le-point",
    slug: "faire-le-point",
    order: 1,
    kind: "diagnostic",
    title: "Faire le point",
    objective: "Je connais mon niveau actuel et l'objectif à atteindre.",
    description:
      "Un test de positionnement rapide pour estimer votre niveau et repérer vos points forts et vos priorités.",
  },
  {
    id: "consolider-les-bases",
    slug: "consolider-les-bases",
    order: 2,
    kind: "content",
    title: "Consolider les bases",
    objective: "Je peux construire des phrases correctes avec le vocabulaire courant du niveau B1.",
    description: "Grammaire essentielle et vocabulaire courant pour poser des bases solides.",
    domains: ["grammaire", "vocabulaire"],
  },
  {
    id: "comprendre-le-francais",
    slug: "comprendre-le-francais",
    order: 3,
    kind: "content",
    title: "Comprendre le français",
    objective: "Je peux comprendre l'essentiel d'un texte ou d'une conversation sur un sujet familier.",
    description: "Compréhension écrite et orale, à partir de documents proches de la vie réelle.",
    domains: ["comprehension_ecrite", "comprehension_orale"],
  },
  {
    id: "sexprimer",
    slug: "sexprimer",
    order: 4,
    kind: "content",
    title: "S'exprimer",
    objective: "Je peux écrire un texte clair pour raconter, expliquer ou donner mon avis.",
    description:
      "Production écrite : donner son opinion, raconter un événement, expliquer une situation. La production et l'interaction orales rejoindront le parcours prochainement.",
    domains: ["production_ecrite"],
  },
  {
    id: "preparation-examen",
    slug: "preparation-examen",
    order: 5,
    kind: "practice",
    title: "Se préparer à l'examen",
    objective: "Je peux m'entraîner dans les conditions d'une épreuve type DELF B1 ou TCF IRN.",
    description: "Épreuves d'entraînement chronométrées, au format des examens officiels.",
    domains: ["preparation_examen"],
  },
  {
    id: "pret-pour-le-b1",
    slug: "pret-pour-le-b1",
    order: 6,
    kind: "bilan",
    title: "Prêt pour le B1",
    objective: "Je connais mes compétences maîtrisées et celles qu'il me reste à travailler.",
    description: "Bilan de votre progression : compétences acquises, points encore fragiles.",
  },
];

export function getStageBySlug(slug: string): ParcoursStage | undefined {
  return PARCOURS_STAGES.find((stage) => stage.slug === slug);
}

/** Étape "content" qui couvre un domaine de compétence donné, si elle existe. */
export function getStageForDomain(domain: SkillDomain): ParcoursStage | undefined {
  return PARCOURS_STAGES.find((stage) => stage.domains?.includes(domain));
}

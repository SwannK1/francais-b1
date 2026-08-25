import type { StageId } from "@/lib/pedagogy/types";

/**
 * Grandes étapes du parcours B1 — calquées sur les 3 phases du programme
 * pédagogique de référence (`docs/b1/curriculum.md` : Début, Intermédiaire,
 * Consolidation), pas sur un découpage par domaine de compétence.
 *
 * L'affectation d'un module à une étape se fait exclusivement via
 * `Module.stageId` (voir `lib/pedagogy/types.ts`) — jamais déduite d'un
 * `domain`, d'un ordre de tableau ou d'un identifiant. Une étape de phase
 * (ex. "Début") mélange volontairement plusieurs domaines (grammaire,
 * vocabulaire, compréhension...), ce qu'un regroupement par domaine ne
 * permettait pas de représenter correctement.
 *
 * Nomenclature : "Stage" à l'identique en anglais dans le code (types,
 * fichiers, routes) — c'est "Étape" pour l'apprenant, partout dans l'UI.
 */
export type StageKind = "diagnostic" | "content" | "practice" | "bilan";

export interface ParcoursStage {
  id: StageId;
  slug: string;
  order: number;
  kind: StageKind;
  title: string;
  /** Formulation "je peux..." : ce que l'étape permet de savoir faire. */
  objective: string;
  description: string;
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
    id: "b1-debut",
    slug: "poser-les-bases",
    order: 2,
    kind: "content",
    title: "Poser les bases du B1",
    objective:
      "Je peux parler de moi, de mon quotidien, et gérer des situations pratiques simples (logement, rendez-vous, courrier).",
    description:
      "Phase Début du programme B1 : consolidation du socle A2→B1 et premiers repères de vie quotidienne en France.",
  },
  {
    id: "b1-intermediaire",
    slug: "argumenter-et-echanger",
    order: 3,
    kind: "content",
    title: "Argumenter et échanger",
    objective:
      "Je peux donner mon avis, comparer, parler de mon travail et de mes projets, et expliquer un problème.",
    description:
      "Phase Intermédiaire du programme B1 : l'apprenant commence à argumenter et à comprendre des démarches plus denses.",
  },
  {
    id: "b1-consolidation",
    slug: "consolider-le-b1",
    order: 4,
    kind: "content",
    title: "Consolider le niveau B1",
    objective: "Je peux nuancer mes propos et comprendre l'essentiel de documents plus riches.",
    description:
      "Phase Consolidation du programme B1 : nuances avancées et préparation transversale à l'examen.",
  },
  {
    id: "preparation-examen",
    slug: "preparation-examen",
    order: 5,
    kind: "practice",
    title: "Se préparer à l'examen",
    objective: "Je peux m'entraîner dans les conditions d'une épreuve type DELF B1 ou TCF IRN.",
    description: "Épreuves d'entraînement chronométrées, au format des examens officiels.",
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

export function getStageById(id: StageId): ParcoursStage | undefined {
  return PARCOURS_STAGES.find((stage) => stage.id === id);
}

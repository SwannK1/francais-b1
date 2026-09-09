import type { ParcoursStage, StageKind } from "@/lib/pedagogy/data/parcours-stages";
import type { StageId } from "@/lib/pedagogy/types";

/**
 * Étapes du parcours A2 — même structure à 6 étapes que le B1
 * (`lib/pedagogy/data/parcours-stages.ts`) : un diagnostic, 3 phases de
 * contenu qui montent progressivement en autonomie, une phase
 * d'entraînement chronométré, un bilan. Fichier isolé du parcours B1 (voir
 * `docs/integration/a2-content.md`) : aucun import ni réexport croisé avec
 * `parcours-stages.ts`, seul le type `ParcoursStage` est partagé (forme,
 * pas contenu).
 *
 * Nomenclature identique au B1 : "Stage" dans le code, "Étape" pour
 * l'apprenant.
 */
export const PARCOURS_STAGES_A2: ParcoursStage[] = [
  {
    id: "a2-faire-le-point" as StageId,
    slug: "a2-faire-le-point",
    order: 7,
    kind: "diagnostic" as StageKind,
    title: "Faire le point",
    objective: "Je connais mon niveau actuel et l'objectif à atteindre.",
    description:
      "Un test de positionnement rapide pour estimer votre niveau et repérer vos points forts et vos priorités avant d'entrer dans le programme A2.",
  },
  {
    id: "a2-debut" as StageId,
    slug: "a2-poser-les-bases",
    order: 8,
    kind: "content" as StageKind,
    title: "Se présenter et s'installer",
    objective:
      "Je peux me présenter en détail, parler de ma famille, chercher et décrire un logement, et me repérer dans les services de la ville.",
    description:
      "Phase Début du programme A2 : consolidation du présent et des verbes fréquents, premiers pas du passé composé, vocabulaire de l'identité, de la famille, du logement et des services du quotidien.",
  },
  {
    id: "a2-intermediaire" as StageId,
    slug: "a2-vie-quotidienne",
    order: 9,
    kind: "content" as StageKind,
    title: "Vivre son quotidien",
    objective:
      "Je peux prendre les transports, organiser un déplacement, parler de ma santé, de mon travail, de mes études et de mes loisirs.",
    description:
      "Phase Intermédiaire du programme A2 : passé composé consolidé, futur proche, premiers repères de l'imparfait, pronoms compléments élémentaires — l'apprenant gère des situations pratiques de plus en plus variées.",
  },
  {
    id: "a2-consolidation" as StageId,
    slug: "a2-projets-et-recits",
    order: 10,
    kind: "content" as StageKind,
    title: "Raconter et se projeter",
    objective:
      "Je peux raconter un souvenir simple, parler de mes projets, organiser un événement et comprendre une annonce ou un programme.",
    description:
      "Phase Consolidation du programme A2 : contraste passé composé/imparfait, futur simple, condition élémentaire avec si, relatifs qui/que — dernière étape avant les prérequis du B1.",
  },
  {
    id: "a2-preparation-examen" as StageId,
    slug: "a2-preparation-examen",
    order: 11,
    kind: "practice" as StageKind,
    title: "Se préparer à l'examen",
    objective: "Je peux m'entraîner dans les conditions d'une épreuve type DELF A2.",
    description: "Épreuves d'entraînement chronométrées, au format des examens officiels DELF A2.",
  },
  {
    id: "a2-pret-pour-le-b1" as StageId,
    slug: "a2-pret-pour-le-b1",
    order: 12,
    kind: "bilan" as StageKind,
    title: "Prêt pour le B1",
    objective: "Je connais mes compétences maîtrisées et celles qu'il me reste à travailler avant le B1.",
    description:
      "Bilan de votre progression A2 : compétences acquises, points encore fragiles, et lien explicite avec les prérequis du parcours B1 (voir docs/integration/a2-content.md).",
  },
];

export function getStageBySlugA2(slug: string): ParcoursStage | undefined {
  return PARCOURS_STAGES_A2.find((stage) => stage.slug === slug);
}

export function getStageByIdA2(id: StageId): ParcoursStage | undefined {
  return PARCOURS_STAGES_A2.find((stage) => stage.id === id);
}

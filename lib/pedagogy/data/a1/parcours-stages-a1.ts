import type { A1ParcoursStage, A1StageId } from "@/lib/pedagogy/data/a1/types";

/**
 * Grandes étapes du parcours A1 — même principe que `PARCOURS_STAGES` (B1) :
 * un module est affecté à une étape via `A1Module.stageId` uniquement,
 * jamais déduit d'un `domain` ou d'un ordre de tableau. Voir
 * `lib/pedagogy/data/a1/types.ts` pour pourquoi cette liste est séparée de
 * `PARCOURS_STAGES`.
 */
export const A1_PARCOURS_STAGES: A1ParcoursStage[] = [
  {
    id: "a1-decouverte",
    slug: "decouverte",
    order: 1,
    kind: "content",
    title: "Découverte",
    objective: "Je peux me présenter, épeler mon nom, donner mon âge et parler de ma famille.",
    description:
      "Premiers pas en français : saluer, se présenter, compter, et présenter sa famille avec des phrases très courtes.",
  },
  {
    id: "a1-vie-quotidienne",
    slug: "vie-quotidienne",
    order: 2,
    kind: "content",
    title: "Ma vie quotidienne",
    objective:
      "Je peux décrire une personne, parler de ma maison, et donner la date et l'heure.",
    description:
      "Décrire les gens et les choses autour de soi : apparence, vêtements, logement, jours, mois et heure.",
  },
  {
    id: "a1-sortir-et-bouger",
    slug: "sortir-et-bouger",
    order: 3,
    kind: "content",
    title: "Sortir et se déplacer",
    objective:
      "Je peux me repérer en ville, prendre les transports, commander et faire des achats simples.",
    description:
      "Situations pratiques de la vie en ville : demander son chemin, prendre le métro ou le bus, manger dehors, faire les courses et des achats.",
  },
  {
    id: "a1-quotidien-et-loisirs",
    slug: "quotidien-et-loisirs",
    order: 4,
    kind: "content",
    title: "Quotidien, travail et loisirs",
    objective:
      "Je peux parler de mes journées, de mon travail, de mes loisirs, de ma santé et proposer un rendez-vous.",
    description:
      "Élargir le quotidien : habitudes, travail ou études, temps libre, santé élémentaire, météo et invitations.",
  },
  {
    id: "a1-preparation-examen",
    slug: "preparation-examen",
    order: 5,
    kind: "practice",
    title: "S'entraîner façon DELF A1",
    objective:
      "Je peux m'entraîner dans des conditions proches d'une épreuve type DELF A1.",
    description:
      "Exercices d'entraînement inspirés du format des 4 épreuves du DELF A1, avec un contenu entièrement original.",
  },
  {
    id: "a1-bilan",
    slug: "bilan-a1",
    order: 6,
    kind: "bilan",
    title: "Bilan A1",
    objective: "Je connais mes compétences A1 acquises et je suis prêt(e) à continuer vers le A2.",
    description: "Bilan de fin de parcours A1 : ce qui est acquis, ce qu'il reste à consolider.",
  },
];

export function getA1StageBySlug(slug: string): A1ParcoursStage | undefined {
  return A1_PARCOURS_STAGES.find((stage) => stage.slug === slug);
}

export function getA1StageById(id: A1StageId): A1ParcoursStage | undefined {
  return A1_PARCOURS_STAGES.find((stage) => stage.id === id);
}

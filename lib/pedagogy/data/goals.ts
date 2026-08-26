import type { LearningGoal } from "@/lib/pedagogy/types";

/**
 * Structure éditable : ne code aucune règle juridique définitive.
 * `recommendedLevel` est une estimation pédagogique à mettre à jour si la
 * réglementation change.
 */
export const LEARNING_GOALS: LearningGoal[] = [
  {
    id: "ameliorer_francais",
    title: "Améliorer mon français",
    description: "Progresser sans objectif administratif précis.",
    recommendedLevel: "A2",
  },
  {
    id: "vivre_en_france",
    title: "Vivre en France au quotidien",
    description: "Comprendre et communiquer dans la vie de tous les jours.",
    recommendedLevel: "A2",
  },
  {
    id: "carte_sejour",
    title: "Carte de séjour",
    description: "Niveau de français utile pour une demande de titre de séjour.",
    recommendedLevel: "A2",
    note: "Estimation pédagogique, à vérifier auprès des autorités compétentes.",
  },
  {
    id: "carte_resident",
    title: "Carte de résident",
    description: "Niveau de français utile pour une carte de résident longue durée.",
    recommendedLevel: "B1",
    note: "Estimation pédagogique, à vérifier auprès des autorités compétentes.",
  },
  {
    id: "naturalisation",
    title: "Naturalisation",
    description: "Niveau de français utile pour une demande de naturalisation.",
    recommendedLevel: "B2",
    note:
      "Depuis le 1er janvier 2026 (décret n° 2025-648), le niveau exigé pour la naturalisation " +
      "est passé de B1 à B2 (oral et écrit). Ce parcours s'arrête au B1 : il prépare une étape " +
      "utile mais insuffisante à lui seul pour ce niveau — à vérifier auprès des autorités compétentes.",
  },
  {
    id: "etudes",
    title: "Études en France",
    description: "Niveau de français utile pour suivre des études en français.",
    recommendedLevel: "B2",
  },
  {
    id: "travail",
    title: "Travail en France",
    description: "Communiquer à l'oral et à l'écrit dans un contexte professionnel.",
    recommendedLevel: "B1",
  },
  {
    id: "delf",
    title: "Préparer le DELF",
    description: "Se préparer à un examen DELF (A1 à B2).",
    recommendedLevel: "B1",
  },
  {
    id: "tcf_irn",
    title: "Préparer le TCF IRN",
    description: "Se préparer au TCF pour l'intégration, la résidence et la nationalité.",
    recommendedLevel: "B1",
    note: "Estimation pédagogique, à vérifier auprès des autorités compétentes.",
  },
];

export function getLearningGoalById(id: string) {
  return LEARNING_GOALS.find((goal) => goal.id === id);
}

/**
 * `data/` = contenu pédagogique statique (skills, objectifs, modules,
 * questions de positionnement, examens, libellés) et progression mockée de
 * démonstration. Aucune logique de calcul ici : voir `logic/` pour tout ce
 * qui dérive un résultat (score, progression, recommandation) à partir de
 * ce contenu. Les formes de données sont définies dans `../types.ts`.
 */
export { SKILLS, getSkillById } from "./skills";
export { LEARNING_GOALS, getLearningGoalById } from "./goals";
export { DOMAIN_LABELS } from "./domain-labels";
export {
  MODULES,
  getModuleBySlug,
  getModulesByLevel,
  countModuleExercises,
  findExerciseInModule,
} from "./modules";
export { PLACEMENT_QUESTIONS } from "./placement-questions";
export { EXAMS, getExamBySlug } from "./exams";
export { DELF_B1_REFERENCE } from "./delf-b1-reference";
export { INITIAL_USER_PROGRESS } from "./initial-user-progress";
export { PARCOURS_STAGES, getStageBySlug, getStageById } from "./parcours-stages";

/**
 * `data/` = contenu pédagogique statique (skills, objectifs, modules,
 * questions de positionnement, examens, libellés) et progression mockée de
 * démonstration. Aucune logique de calcul ici : voir `logic/` pour tout ce
 * qui dérive un résultat (score, progression, recommandation) à partir de
 * ce contenu. Les formes de données sont définies dans `../types.ts`.
 *
 * ⚠️ SERVEUR UNIQUEMENT (ce barrel comme `./modules`) : `MODULES` porte le
 * contenu pédagogique intégral, réponses comprises, gratuit et premium
 * confondus. Jamais importé — même indirectement — par un composant
 * `"use client"`. Pour toute donnée nécessaire côté client (navigation,
 * progression, recommandation), utiliser `./modules-public`
 * (`PUBLIC_MODULES`), volontairement tenu à l'écart de ce barrel — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export { SKILLS, getSkillById } from "./skills";
export { LEARNING_GOALS, getLearningGoalById } from "./goals";
export { DOMAIN_LABELS } from "./domain-labels";
export { MODULES, getModuleBySlug, getModulesByLevel } from "./modules";
export { PLACEMENT_QUESTIONS } from "./placement-questions";
export { EXAMS, getExamBySlug } from "./exams";
export { DELF_B1_REFERENCE } from "./delf-b1-reference";
export { INITIAL_USER_PROGRESS } from "./initial-user-progress";
export { PARCOURS_STAGES, getStageBySlug, getStageById } from "./parcours-stages";

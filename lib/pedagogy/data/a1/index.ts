/**
 * Barrel du contenu pédagogique A1 — chantier `chantier/a1-content`.
 * Volontairement séparé de `lib/pedagogy/data/index.ts` (le barrel B1) : voir
 * `./types.ts` pour l'isolation vis-à-vis des chantiers `a1-audio`,
 * `a2-content` et `a2-audio`, et `docs/integration/a1-content.md` pour le
 * raccordement prévu au moment du merge.
 *
 * ⚠️ SERVEUR UNIQUEMENT (comme `data/index.ts`) : `MODULES_A1` porte le
 * contenu pédagogique intégral, réponses comprises. Ce chantier n'a pas
 * construit de dérivation "publique" équivalente à `modules-public.ts` —
 * voir `docs/integration/a1-content.md` § raccordements nécessaires.
 */
export { SKILLS_A1, getA1SkillById } from "./skills-a1";
export { A1_PARCOURS_STAGES, getA1StageBySlug, getA1StageById } from "./parcours-stages-a1";
export { MODULES_A1, getA1ModuleBySlug, getA1ModulesByStage } from "./modules-a1";
export { EXAMS_A1, getA1ExamBySlug } from "./exams-a1";
export type { A1Module, A1ParcoursStage, A1StageId, A1StageKind } from "./types";

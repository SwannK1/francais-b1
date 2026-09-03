import { getSkillById } from "@/lib/pedagogy/data/skills";
import { findModuleForSkill } from "@/lib/pedagogy/data/modules";
import { getExamById } from "@/lib/pedagogy/data/exams";
import { DELF_SECTION_LABELS } from "@/lib/pedagogy/data/domain-labels";
import type { Module, UserProgress } from "@/lib/pedagogy/types";

/**
 * Score en dessous duquel une épreuve d'examen déjà passée est proposée en
 * révision. Même seuil que `WEAK_SKILL_THRESHOLD` (progress.ts) : sous 50 %,
 * ce n'est plus un aléa ponctuel, c'est un point à retravailler.
 */
const EXAM_SECTION_REVIEW_THRESHOLD = 50;

export type ReviewItemKind = "module_flagged" | "weak_skill" | "module_in_progress" | "exam_section";

export interface ReviewItem {
  kind: ReviewItemKind;
  /** Clé stable pour une liste React — jamais recalculée depuis un index. */
  key: string;
  title: string;
  description: string;
  href: string;
  /** Présent uniquement pour `kind: "module_flagged"` — id à passer à `toggleModuleReview` pour retirer l'étiquette. */
  moduleId?: string;
}

/**
 * Construit la liste "à réviser", dans un ordre fixe et documenté (pas un
 * score composite opaque) :
 * 1. Modules explicitement marqués "à revoir" par l'apprenant — intention
 *    la plus forte, toujours en premier.
 * 2. Compétences faibles détectées (`weakSkillIds`, taux de réussite < 50 %).
 * 3. Modules commencés mais jamais terminés (hors ceux déjà listés en 1,
 *    pour ne jamais afficher deux fois le même module).
 * 4. Épreuves d'examen déjà passées avec un score sous le seuil de révision.
 * Chaque catégorie est elle-même triée de façon déterministe (voir
 * commentaires ci-dessous) — jamais par un critère de pertinence implicite.
 */
export function getReviewItems(progress: UserProgress, modules: Module[]): ReviewItem[] {
  const items: ReviewItem[] = [];
  const flaggedIds = new Set(progress.reviewedModuleIds);

  for (const moduleId of progress.reviewedModuleIds) {
    const mod = modules.find((m) => m.id === moduleId);
    // Garde-fou données anciennes : un module retiré/renommé depuis ne doit
    // jamais faire planter la page, juste disparaître silencieusement.
    if (!mod) continue;
    items.push({
      kind: "module_flagged",
      key: `module-flagged-${mod.id}`,
      title: mod.title,
      description: "Module que tu as marqué à revoir.",
      href: `/parcours/module/${mod.slug}`,
      moduleId: mod.id,
    });
  }

  for (const skillId of progress.weakSkillIds) {
    const skill = getSkillById(skillId);
    if (!skill) continue;
    const skillProgress = progress.skillProgress.find((sp) => sp.skillId === skillId);
    const mod = findModuleForSkill(skillId);
    items.push({
      kind: "weak_skill",
      key: `weak-skill-${skillId}`,
      title: skill.name,
      description: skillProgress
        ? `${skillProgress.successRate}% de réussite sur ${skillProgress.completedExercises} exercice${skillProgress.completedExercises > 1 ? "s" : ""}.`
        : "Compétence à retravailler.",
      href: mod ? `/parcours/module/${mod.slug}` : "/progression",
    });
  }

  const inProgress = progress.moduleProgress
    .filter((mp) => !mp.completed && mp.completedExerciseIds.length > 0 && !flaggedIds.has(mp.moduleId))
    // Le plus ancien resté de côté en premier — c'est celui qui risque le plus d'être oublié.
    .sort((a, b) => (a.lastActivityAt ?? "").localeCompare(b.lastActivityAt ?? ""));

  for (const mp of inProgress) {
    const mod = modules.find((m) => m.id === mp.moduleId);
    if (!mod) continue;
    items.push({
      kind: "module_in_progress",
      key: `module-in-progress-${mod.id}`,
      title: mod.title,
      description: "Module commencé, pas encore terminé.",
      href: `/parcours/module/${mod.slug}`,
    });
  }

  for (const attempt of progress.examAttempts) {
    if (attempt.status !== "completed") continue;
    const exam = getExamById(attempt.examId);
    if (!exam) continue;
    for (const section of attempt.sections) {
      if (section.score === null || section.maxScore === 0) continue;
      const rate = Math.round((section.score / section.maxScore) * 100);
      if (rate >= EXAM_SECTION_REVIEW_THRESHOLD) continue;
      items.push({
        kind: "exam_section",
        key: `exam-section-${attempt.id}-${section.section}`,
        title: `${exam.title} — ${DELF_SECTION_LABELS[section.section]}`,
        description: `${section.score}/${section.maxScore} lors de ta dernière tentative.`,
        href: `/parcours/examens/${exam.slug}`,
      });
    }
  }

  return items;
}

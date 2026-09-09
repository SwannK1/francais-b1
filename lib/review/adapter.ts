import { getSkillById } from "@/lib/pedagogy/data/skills";
import { findModuleForSkill } from "@/lib/pedagogy/logic/module-structure";
import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { CEFRLevel, PublicModule, UserProgress } from "@/lib/pedagogy/types";
import type { ReviewHistoryEntry } from "./types";

/**
 * Pont entre les données de progression existantes et le moteur de révision
 * (`engine.ts`), qui ne connaît rien de `UserProgress`/`PublicModule`. Aucune
 * nouvelle source de vérité : chaque champ est soit copié depuis
 * `SkillProgress`, soit dérivé du catalogue public déjà utilisé ailleurs
 * (`findModuleForSkill`, `PublicExercise.difficulty`).
 */

/**
 * Niveau CECRL le plus élevé rencontré parmi les exercices d'une compétence
 * dans le catalogue fourni — sert de proxy de difficulté (voir
 * `engine.ts: DECAY_INTERVAL_DAYS`). Repli sur "B1" si la compétence n'a
 * aucun exercice dans `modules` (ne devrait pas arriver en pratique, mais
 * `modules` peut être un sous-ensemble du catalogue complet selon l'appelant).
 */
function getSkillDifficulty(modules: PublicModule[], skillId: string): CEFRLevel {
  let bestRank = -1;
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      for (const activity of lesson.activities) {
        for (const exercise of activity.exercises) {
          if (exercise.skillId !== skillId) continue;
          const rank = CEFR_LEVELS.indexOf(exercise.difficulty);
          if (rank > bestRank) bestRank = rank;
        }
      }
    }
  }
  return bestRank >= 0 ? CEFR_LEVELS[bestRank] : "B1";
}

/**
 * Construit une entrée par compétence connue de `progress.skillProgress`
 * (déjà une par compétence du catalogue complet dès qu'un exercice a été
 * enregistré une fois, voir `logic/progress.ts: computeSkillProgress`).
 */
export function buildReviewHistory(progress: UserProgress, modules: PublicModule[]): ReviewHistoryEntry[] {
  return progress.skillProgress.map((sp) => {
    const skill = getSkillById(sp.skillId);
    const mod = findModuleForSkill(modules, sp.skillId);
    return {
      skillId: sp.skillId,
      skillName: skill?.name ?? sp.skillId,
      domain: sp.domain,
      difficulty: getSkillDifficulty(modules, sp.skillId),
      href: mod ? `/parcours/module/${mod.slug}` : "/progression",
      totalExercises: sp.totalExercises,
      completedExercises: sp.completedExercises,
      correctExercises: sp.correctExercises,
      successRate: sp.successRate,
      recentOutcomes: sp.recentOutcomes ?? [],
      lastPracticedAt: sp.lastPracticedAt ?? null,
    };
  });
}

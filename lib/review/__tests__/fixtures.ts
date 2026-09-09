import type { ReviewHistoryEntry } from "../types";

export function makeEntry(overrides: Partial<ReviewHistoryEntry> & { skillId: string }): ReviewHistoryEntry {
  return {
    skillName: overrides.skillId,
    domain: "grammaire",
    difficulty: "B1",
    href: `/parcours/module/${overrides.skillId}`,
    totalExercises: 5,
    completedExercises: 0,
    correctExercises: 0,
    successRate: 0,
    recentOutcomes: [],
    lastPracticedAt: null,
    ...overrides,
  };
}

export function daysAgo(now: Date, days: number): string {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { AssessmentAttempt, CheckpointId } from "@/lib/assessment/types";

/**
 * Stockage local dédié aux tentatives d'évaluation de passage — clé
 * distincte de `francais-b1:user-progress` (voir
 * `lib/pedagogy/useProgress.ts`) : ce chantier reste indépendant du
 * diagnostic, de la révision espacée et de la séance du jour, donc n'écrit
 * jamais dans `UserProgress`. Même schéma que `lib/speaking/useSpeakingPractice.ts`.
 */
const STORAGE_KEY = "francais-b1:assessment-attempts";

type Listener = () => void;
const listeners = new Set<Listener>();

function makeAttemptId(): string {
  return `assessment-attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readRaw(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function parseAttempts(raw: string): AssessmentAttempt[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AssessmentAttempt[];
  } catch {
    return [];
  }
}

function writeAttempts(next: AssessmentAttempt[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

export function useAssessmentAttempts() {
  const raw = useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
  const attempts = useMemo(() => parseAttempts(raw), [raw]);

  const startAttempt = useCallback((checkpointId: CheckpointId): string => {
    const id = makeAttemptId();
    const attempt: AssessmentAttempt = {
      id,
      checkpointId,
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "in_progress",
      answeredCorrect: {},
      guidedProductionDone: false,
    };
    writeAttempts([...parseAttempts(readRaw()), attempt]);
    return id;
  }, []);

  const recordAnswer = useCallback((attemptId: string, questionId: string, correct: boolean) => {
    const current = parseAttempts(readRaw());
    writeAttempts(
      current.map((attempt) =>
        attempt.id === attemptId
          ? { ...attempt, answeredCorrect: { ...attempt.answeredCorrect, [questionId]: correct } }
          : attempt
      )
    );
  }, []);

  const markGuidedProductionDone = useCallback((attemptId: string) => {
    const current = parseAttempts(readRaw());
    writeAttempts(
      current.map((attempt) =>
        attempt.id === attemptId ? { ...attempt, guidedProductionDone: true } : attempt
      )
    );
  }, []);

  const finishAttempt = useCallback((attemptId: string) => {
    const current = parseAttempts(readRaw());
    writeAttempts(
      current.map((attempt) =>
        attempt.id === attemptId
          ? { ...attempt, status: "completed" as const, completedAt: new Date().toISOString() }
          : attempt
      )
    );
  }, []);

  const abandonAttempt = useCallback((attemptId: string) => {
    const current = parseAttempts(readRaw());
    writeAttempts(
      current.map((attempt) =>
        attempt.id === attemptId
          ? { ...attempt, status: "abandoned" as const, completedAt: new Date().toISOString() }
          : attempt
      )
    );
  }, []);

  const getActiveAttempt = useCallback(
    (checkpointId: CheckpointId): AssessmentAttempt | undefined =>
      [...attempts].reverse().find((a) => a.checkpointId === checkpointId && a.status === "in_progress"),
    [attempts]
  );

  const getAttempts = useCallback(
    (checkpointId: CheckpointId): AssessmentAttempt[] =>
      attempts.filter((a) => a.checkpointId === checkpointId),
    [attempts]
  );

  return {
    attempts,
    startAttempt,
    recordAnswer,
    markGuidedProductionDone,
    finishAttempt,
    abandonAttempt,
    getActiveAttempt,
    getAttempts,
  };
}

"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { INITIAL_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import { recordExerciseResult } from "@/lib/pedagogy/logic/progress";
import {
  abandonExamAttempt,
  completeExamAttempt,
  recordExamExerciseResult,
  startExamAttempt,
} from "@/lib/pedagogy/logic/exam";
import type { DelfSection, Exam, Exercise, Module, UserProgress } from "@/lib/pedagogy/types";

/**
 * État applicatif du "compte" apprenant, persisté en local (pas de backend
 * dans ce chantier). Séparé de `data/` (contenu statique) et de `logic/`
 * (calcul pur sans état) : ce fichier est le seul point qui lit/écrit
 * localStorage, pour que la progression survive à la navigation entre pages.
 *
 * `useSyncExternalStore` plutôt qu'un `useState` + `useEffect` : localStorage
 * est un état externe partagé entre plusieurs composants montés en même
 * temps (ex. la barre de progression du header et la page courante), c'est
 * exactement le cas d'usage que ce hook React est fait pour synchroniser.
 */
const STORAGE_KEY = "francais-b1:user-progress";

type Listener = () => void;
const listeners = new Set<Listener>();

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

function writeProgress(next: UserProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function parseProgress(raw: string): UserProgress {
  if (!raw) return INITIAL_USER_PROGRESS;
  try {
    // Fusionne avec l'état initial pour rester valide si de nouveaux champs
    // ont été ajoutés au type depuis la dernière visite de l'utilisateur.
    return { ...INITIAL_USER_PROGRESS, ...(JSON.parse(raw) as Partial<UserProgress>) };
  } catch {
    return INITIAL_USER_PROGRESS;
  }
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
  const progress = useMemo(() => parseProgress(raw), [raw]);

  const recordResult = useCallback((mod: Module, exercise: Exercise, correct: boolean) => {
    writeProgress(recordExerciseResult(parseProgress(readRaw()), mod, exercise, correct));
  }, []);

  const markPlacementCompleted = useCallback(() => {
    writeProgress({ ...parseProgress(readRaw()), placementCompletedAt: new Date().toISOString() });
  }, []);

  const startExam = useCallback((exam: Exam) => {
    writeProgress(startExamAttempt(parseProgress(readRaw()), exam));
  }, []);

  const recordExamResult = useCallback(
    (exam: Exam, attemptId: string, delfSection: DelfSection, exercise: Exercise, correct: boolean) => {
      writeProgress(
        recordExamExerciseResult(parseProgress(readRaw()), exam, attemptId, delfSection, exercise, correct)
      );
    },
    []
  );

  const finishExam = useCallback((attemptId: string) => {
    writeProgress(completeExamAttempt(parseProgress(readRaw()), attemptId));
  }, []);

  const abandonExam = useCallback((attemptId: string) => {
    writeProgress(abandonExamAttempt(parseProgress(readRaw()), attemptId));
  }, []);

  return {
    progress,
    recordResult,
    markPlacementCompleted,
    startExam,
    recordExamResult,
    finishExam,
    abandonExam,
  };
}

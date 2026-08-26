"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { INITIAL_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import { recordExerciseResult } from "@/lib/pedagogy/logic/progress";
import {
  abandonExamAttempt,
  completeExamAttempt,
  recordExamExerciseResult,
  startExamAttempt,
} from "@/lib/pedagogy/logic/exam";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { DelfSection, Exam, Exercise, Module, UserProgress } from "@/lib/pedagogy/types";

/**
 * État applicatif du "compte" apprenant. localStorage reste la source de
 * vérité côté client (l'app fonctionne intégralement hors ligne / sans
 * compte, comme avant ce chantier) ; quand un compte est connecté, ce
 * fichier synchronise en tâche de fond vers `/api/progress`, en best-effort
 * (une erreur réseau n'empêche jamais de continuer à travailler en local).
 * Séparé de `data/` (contenu statique) et de `logic/` (calcul pur sans
 * état) : ce fichier est le seul point qui lit/écrit localStorage, pour que
 * la progression survive à la navigation entre pages.
 *
 * `useSyncExternalStore` plutôt qu'un `useState` + `useEffect` : localStorage
 * est un état externe partagé entre plusieurs composants montés en même
 * temps (ex. la barre de progression du header et la page courante), c'est
 * exactement le cas d'usage que ce hook React est fait pour synchroniser.
 */
const STORAGE_KEY = "francais-b1:user-progress";

/** Id du compte actuellement connecté, ou null en mode local/anonyme. */
let activeUserId: string | null = null;
/** Garde-fou pour ne lancer la fusion serveur qu'une fois par connexion (par module JS, donc par session d'onglet). */
let mergedForUserId: string | null = null;
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleServerSync(progress: UserProgress) {
  if (!activeUserId) return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress }),
    }).catch(() => {
      // Hors ligne ou erreur réseau : la progression reste valide en local ;
      // la prochaine écriture retentera la synchronisation.
    });
  }, 800);
}

type Listener = () => void;
const listeners = new Set<Listener>();

/**
 * À appeler juste après une déconnexion réussie (voir `components/auth/AccountStatus.tsx`).
 * Sur un poste partagé, laisser la progression du compte précédent dans
 * localStorage la rendrait visible par la prochaine personne utilisant le
 * navigateur sans se connecter — un compte A ne doit jamais exposer ses
 * données à un compte B, y compris via ce vecteur local.
 */
export function clearLocalProgressOnLogout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  activeUserId = null;
  mergedForUserId = null;
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
  listeners.forEach((listener) => listener());
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

function writeProgress(next: UserProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
  scheduleServerSync(next);
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
  const { user } = useAuth();

  // Migration/association de la progression locale au compte connecté (voir
  // `mergeUserProgress` pour la stratégie de conflit). Se déclenche une
  // seule fois par connexion grâce à `mergedForUserId` ; comme la fusion est
  // une union idempotente, un rappel accidentel (ex. plusieurs instances de
  // ce hook montées en même temps) ne duplique rien.
  useEffect(() => {
    activeUserId = user?.id ?? null;
    if (!user || mergedForUserId === user.id) return;
    mergedForUserId = user.id;

    const localRaw = readRaw();
    const localProgress = localRaw ? parseProgress(localRaw) : null;

    fetch("/api/progress/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress: localProgress }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { progress?: UserProgress } | null) => {
        if (data?.progress) writeProgress(data.progress);
      })
      .catch(() => {
        // Pas de connexion au moment de la fusion : on continue avec la
        // progression locale, la prochaine écriture relancera une synchro.
      });
  }, [user]);

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

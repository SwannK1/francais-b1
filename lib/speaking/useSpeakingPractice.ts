"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { SpeakingPracticeEntry, SpeakingPracticeLog, SpeakingSelfRating } from "@/lib/speaking/types";

/**
 * Stockage local dédié à la pratique orale — clé distincte de
 * `francais-b1:user-progress` (voir `lib/pedagogy/useProgress.ts`) : ce
 * chantier doit rester indépendant du diagnostic, de la révision espacée et
 * de la séance du jour, donc n'écrit jamais dans `UserProgress`. Ne
 * mémorise que "quand" et "comment ressenti" (auto-évaluation), jamais un
 * score — voir `lib/speaking/types.ts`.
 */
const STORAGE_KEY = "francais-b1:speaking-practice";

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

function parseLog(raw: string): SpeakingPracticeLog {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as SpeakingPracticeLog;
  } catch {
    return {};
  }
}

function writeLog(next: SpeakingPracticeLog) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

export function useSpeakingPractice() {
  const raw = useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
  const log = useMemo(() => parseLog(raw), [raw]);

  const recordPractice = useCallback(
    (exerciseId: string, selfRating: SpeakingSelfRating | null, withoutRecording: boolean) => {
      const current = parseLog(readRaw());
      const previous = current[exerciseId];
      const entry: SpeakingPracticeEntry = {
        timesPracticed: (previous?.timesPracticed ?? 0) + 1,
        lastPracticedAt: new Date().toISOString(),
        lastSelfRating: selfRating,
        lastWithoutRecording: withoutRecording,
      };
      writeLog({ ...current, [exerciseId]: entry });
    },
    []
  );

  const getEntry = useCallback(
    (exerciseId: string): SpeakingPracticeEntry | undefined => log[exerciseId],
    [log]
  );

  return { log, recordPractice, getEntry };
}

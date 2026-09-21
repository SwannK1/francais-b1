// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SpeakingPracticeSummary from "@/components/speaking/SpeakingPracticeSummary";
import SpeakingPracticeBadge from "@/components/speaking/SpeakingPracticeBadge";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import type { SpeakingPracticeLog } from "@/lib/speaking/types";

/**
 * `/oral` (page serveur, sans logique propre — voir `app/(pedagogie)/oral/page.tsx`)
 * n'avait aucune couverture sur sa seule vraie logique client : l'état de
 * pratique persistant (`useSpeakingPractice`, stockage localStorage séparé de
 * `UserProgress`) et les deux affichages qui en dépendent. Le flux
 * d'enregistrement lui-même (`SpeakingExerciseCard`) est déjà largement
 * couvert (`components/speaking/__tests__/SpeakingExerciseCard.test.tsx`) —
 * pas de doublon ici. On vérifie ici exactement ce qui manquait : l'état
 * masqué tant que rien n'est pratiqué (décision UX documentée dans le
 * composant), le texte singulier/pluriel, et surtout la synchronisation
 * entre plusieurs composants montés en même temps via `useSyncExternalStore`
 * — la même classe de bug que celle déjà protégée pour `useProgress.ts`.
 */
const STORAGE_KEY = "francais-b1:speaking-practice";
const EXERCISE_A = SPEAKING_EXERCISES[0].id;
const EXERCISE_B = SPEAKING_EXERCISES[1].id;

function seedLog(log: SpeakingPracticeLog) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

function makeEntry(overrides: Partial<SpeakingPracticeLog[string]> = {}) {
  return {
    timesPracticed: 1,
    lastPracticedAt: new Date().toISOString(),
    lastSelfRating: null,
    lastWithoutRecording: false,
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("Expression orale — état de pratique persistant (SpeakingPracticeSummary / Badge)", () => {
  it("masque le résumé tant qu'aucun exercice n'a été pratiqué", () => {
    render(<SpeakingPracticeSummary />);
    expect(screen.queryByText(/pratiquée/i)).not.toBeInTheDocument();
  });

  it("affiche un texte au singulier pour un seul exercice pratiqué, avec la bonne proportion", () => {
    seedLog({ [EXERCISE_A]: makeEntry() });
    render(<SpeakingPracticeSummary />);

    expect(screen.getByText(`1 activité pratiquée sur ${SPEAKING_EXERCISES.length}`)).toBeInTheDocument();
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", String(Math.round((1 / SPEAKING_EXERCISES.length) * 100)));
  });

  it("passe au pluriel dès deux exercices pratiqués", () => {
    seedLog({ [EXERCISE_A]: makeEntry(), [EXERCISE_B]: makeEntry() });
    render(<SpeakingPracticeSummary />);

    expect(screen.getByText(`2 activités pratiquées sur ${SPEAKING_EXERCISES.length}`)).toBeInTheDocument();
  });

  it("ne marque pas un exercice jamais pratiqué comme « Déjà pratiqué »", () => {
    seedLog({ [EXERCISE_B]: makeEntry() }); // un autre exercice, pas celui affiché
    render(<SpeakingPracticeBadge exerciseId={EXERCISE_A} />);
    expect(screen.queryByText(/déjà pratiqué/i)).not.toBeInTheDocument();
  });

  it("marque « Déjà pratiqué » un exercice déjà pratiqué, y compris une seule fois", () => {
    seedLog({ [EXERCISE_A]: makeEntry({ timesPracticed: 1 }) });
    render(<SpeakingPracticeBadge exerciseId={EXERCISE_A} />);
    expect(screen.getByText(/déjà pratiqué/i)).toBeInTheDocument();
  });

  it("synchronise plusieurs composants montés en même temps : enregistrer une pratique met à jour le badge sans le remonter", () => {
    const { result } = renderHook(() => useSpeakingPractice());
    render(<SpeakingPracticeBadge exerciseId={EXERCISE_A} />);
    expect(screen.queryByText(/déjà pratiqué/i)).not.toBeInTheDocument();

    act(() => {
      result.current.recordPractice(EXERCISE_A, "tres_bien", false);
    });

    expect(screen.getByText(/déjà pratiqué/i)).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored[EXERCISE_A]).toMatchObject({ timesPracticed: 1, lastWithoutRecording: false });
  });

  it("incrémente timesPracticed à chaque nouvelle pratique du même exercice, sans écraser les autres entrées", () => {
    seedLog({ [EXERCISE_B]: makeEntry({ timesPracticed: 3 }) });
    const { result } = renderHook(() => useSpeakingPractice());

    act(() => {
      result.current.recordPractice(EXERCISE_A, null, true);
    });
    act(() => {
      result.current.recordPractice(EXERCISE_A, "a_revoir", true);
    });

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored[EXERCISE_A]).toMatchObject({ timesPracticed: 2, lastSelfRating: "a_revoir", lastWithoutRecording: true });
    expect(stored[EXERCISE_B]).toMatchObject({ timesPracticed: 3 });
  });
});

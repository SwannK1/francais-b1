import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SpokenExercise from "@/components/pedagogy/SpokenExercise";
import type { ProductionOraleExercise } from "@/lib/pedagogy/types";

/**
 * `SpokenExercise` n'avait aucun test avant ce chantier, alors qu'il est
 * réutilisé tel quel pour la production guidée des évaluations de passage
 * (voir `components/assessment/AssessmentExperience.tsx`) — comble ce
 * manque, avec les mêmes scénarios micro que
 * `components/speaking/__tests__/SpeakingExerciseCard.test.tsx`.
 */

function fakeStream() {
  const track = { stop: vi.fn(), addEventListener: vi.fn() };
  return {
    getTracks: () => [track],
    getAudioTracks: () => [track],
  } as unknown as MediaStream;
}

class FakeMediaRecorder {
  state: "inactive" | "recording" = "inactive";
  mimeType = "audio/webm";
  ondataavailable: ((event: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public stream: MediaStream) {}
  start() {
    this.state = "recording";
  }
  stop() {
    this.state = "inactive";
    this.ondataavailable?.({ data: new Blob(["fake-audio"]) });
    this.onstop?.();
  }
}

function makeExercise(overrides: Partial<ProductionOraleExercise> = {}): ProductionOraleExercise {
  return {
    id: "test-po",
    skillId: "po-test",
    difficulty: "B1",
    type: "production_orale",
    instructions: "Prépare-toi, puis enregistre-toi.",
    consigne: "Donne ton avis sur un sujet simple.",
    prepSeconds: 0,
    maxSpeakSeconds: 30,
    selfAssessmentCriteria: ["J'ai répondu clairement.", "Mon discours est compréhensible."],
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  // @ts-expect-error -- nettoyage explicite, MediaRecorder n'existe pas nativement en jsdom
  delete window.MediaRecorder;
});

describe("SpokenExercise", () => {
  it("shows a clear message and lets the learner continue without recording when MediaRecorder is unsupported", async () => {
    const onExerciseAnswered = vi.fn();
    render(<SpokenExercise exercise={makeExercise()} onExerciseAnswered={onExerciseAnswered} />);

    fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
    expect(screen.getByText(/n'est pas pris en charge par ce navigateur/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /démarrer l'enregistrement/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));
    fireEvent.click(screen.getByRole("button", { name: /terminer l'exercice/i }));

    expect(screen.getByText(/reste à consolider/i)).toBeInTheDocument();
    expect(onExerciseAnswered).toHaveBeenCalledWith(false);
  });

  it("shows a clear message when microphone permission is denied, without blocking the exercise", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });

    render(<SpokenExercise exercise={makeExercise()} />);
    fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));

    await waitFor(() => expect(screen.getByText(/autorisation micro refusée/i)).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /continuer sans enregistrement/i })).toBeInTheDocument();
  });

  it("shows a clear message when no microphone device is found", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("no device", "NotFoundError"));
    Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });

    render(<SpokenExercise exercise={makeExercise()} />);
    fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));

    await waitFor(() => expect(screen.getByText(/aucun microphone détecté/i)).toBeInTheDocument());
  });

  it("completes a full recording flow and releases the microphone as soon as recording stops", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const stream = fakeStream();
    const stopTrack = stream.getTracks()[0].stop as ReturnType<typeof vi.fn>;
    const getUserMedia = vi.fn().mockResolvedValue(stream);
    Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });
    vi.stubGlobal("URL", { ...URL, createObjectURL: vi.fn().mockReturnValue("blob:fake"), revokeObjectURL: vi.fn() });

    const onExerciseAnswered = vi.fn();
    render(<SpokenExercise exercise={makeExercise()} onExerciseAnswered={onExerciseAnswered} />);

    fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));
    await waitFor(() => expect(screen.getByText(/enregistrement en cours/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /arrêter l'enregistrement/i }));
    await waitFor(() => expect(screen.getByLabelText(/ton enregistrement/i)).toBeInTheDocument());
    expect(stopTrack).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /^continuer →/i }));
    for (const criterion of makeExercise().selfAssessmentCriteria) {
      fireEvent.click(screen.getByRole("checkbox", { name: criterion }));
    }
    fireEvent.click(screen.getByRole("button", { name: /terminer l'exercice/i }));

    expect(onExerciseAnswered).toHaveBeenCalledWith(true);
    expect(screen.getByText(/objectif atteint selon ta grille/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ton enregistrement/i)).toBeInTheDocument();
  });
});

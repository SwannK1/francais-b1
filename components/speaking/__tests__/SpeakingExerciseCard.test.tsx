import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SpeakingExerciseCard from "@/components/speaking/SpeakingExerciseCard";
import { trackEvent } from "@/lib/analytics/client";
import type { SpeakingExercise } from "@/lib/speaking/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

const STORAGE_KEY = "francais-b1:speaking-practice";

/** Fausse piste micro : une seule piste, arrêtable/écoutable comme une vraie `MediaStreamTrack`. */
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

function repetitionExercise(overrides: Partial<SpeakingExercise> = {}): SpeakingExercise {
  return {
    id: "test-repetition",
    kind: "repetition",
    level: "A1",
    title: "Exercice test",
    instructions: "Écoute puis répète.",
    targetText: "Ceci est la phrase modèle.",
    prepSeconds: 0,
    maxSpeakSeconds: 10,
    selfAssessmentCriteria: ["Critère 1", "Critère 2"],
    ...overrides,
  } as SpeakingExercise;
}

function situationExercise(): SpeakingExercise {
  return {
    id: "test-situation",
    kind: "situation",
    level: "A2",
    title: "Situation test",
    situationLabel: "Test",
    instructions: "Enregistre-toi.",
    context: "Contexte de la situation.",
    prepSeconds: 0,
    maxSpeakSeconds: 20,
    selfAssessmentCriteria: ["Critère A"],
  };
}

async function reachRecordReady() {
  fireEvent.click(screen.getByRole("button", { name: /passer à l'enregistrement/i }));
}

async function finishSelfAssessment() {
  fireEvent.click(screen.getByRole("button", { name: "Ça peut aller" }));
  fireEvent.click(screen.getByRole("button", { name: /terminer l'exercice/i }));
}

describe("SpeakingExerciseCard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.mocked(trackEvent).mockClear();
    vi.unstubAllGlobals();
    // @ts-expect-error -- nettoyage explicite entre les tests, MediaRecorder n'existe pas nativement en jsdom
    delete window.MediaRecorder;
  });

  it("shows the target sentence and a model playback button when speech synthesis is supported", () => {
    const speak = vi.fn();
    vi.stubGlobal("speechSynthesis", { speak, cancel: vi.fn() });
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      vi.fn().mockImplementation(function (this: { text: string; lang?: string }, text: string) {
        this.text = text;
      })
    );

    render(<SpeakingExerciseCard exercise={repetitionExercise()} />);

    expect(screen.getByText(/ceci est la phrase modèle/i)).toBeInTheDocument();
    const playButton = screen.getByRole("button", { name: /écouter le modèle/i });
    fireEvent.click(playButton);

    expect(speak).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("speaking_model_played", { speakingExerciseId: "test-repetition" });
  });

  it("hides the model button and never blocks the exercise when speech synthesis is unsupported", () => {
    render(<SpeakingExerciseCard exercise={repetitionExercise()} />);

    expect(screen.queryByRole("button", { name: /écouter le modèle/i })).not.toBeInTheDocument();
    expect(screen.getByText(/lecture du modèle.*n'est pas prise en charge/i)).toBeInTheDocument();
    // Le reste du parcours reste utilisable malgré l'absence de modèle audio.
    expect(screen.getByRole("button", { name: /passer à l'enregistrement/i })).toBeInTheDocument();
  });

  it("shows a clear message and lets the learner continue without recording when MediaRecorder is unsupported", async () => {
    render(<SpeakingExerciseCard exercise={situationExercise()} />);
    await reachRecordReady();

    expect(screen.getByText(/n'est pas pris en charge par ce navigateur/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /démarrer l'enregistrement/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));
    await finishSelfAssessment();

    expect(screen.getByText(/exercice terminé/i)).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored["test-situation"].lastWithoutRecording).toBe(true);
    expect(stored["test-situation"].lastSelfRating).toBe("correct");
  });

  it("shows a clear message and lets the learner continue without recording when microphone permission is denied", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    Object.defineProperty(navigator, "mediaDevices", {
      value: { getUserMedia },
      configurable: true,
    });

    render(<SpeakingExerciseCard exercise={situationExercise()} />);
    await reachRecordReady();
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));

    await waitFor(() => expect(screen.getByText(/autorisation micro refusée/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));
    await finishSelfAssessment();
    expect(screen.getByText(/exercice terminé/i)).toBeInTheDocument();
  });

  it("shows a clear message when no microphone device is found", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("no device", "NotFoundError"));
    Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });

    render(<SpeakingExerciseCard exercise={situationExercise()} />);
    await reachRecordReady();
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));

    await waitFor(() => expect(screen.getByText(/aucun microphone détecté/i)).toBeInTheDocument());
  });

  it("completes a full recording flow (record, stop, review, retake, then finish) and cleans up the mic + blob URL", async () => {
    vi.stubGlobal("MediaRecorder", FakeMediaRecorder);
    const stream = fakeStream();
    const stopTrack = stream.getTracks()[0].stop as ReturnType<typeof vi.fn>;
    const getUserMedia = vi.fn().mockResolvedValue(stream);
    Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia }, configurable: true });

    const createObjectURL = vi.fn().mockReturnValue("blob:fake-url");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL, revokeObjectURL });

    render(<SpeakingExerciseCard exercise={repetitionExercise({ id: "test-full-flow" })} />);
    await reachRecordReady();
    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));

    await waitFor(() => expect(screen.getByText(/enregistrement en cours/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /arrêter l'enregistrement/i }));

    await waitFor(() => expect(screen.getByLabelText(/ton enregistrement/i)).toBeInTheDocument());
    expect(stopTrack).toHaveBeenCalled(); // micro relâché dès la fin de la prise

    fireEvent.click(screen.getByRole("button", { name: /recommencer la prise/i }));
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:fake-url");
    expect(screen.getByRole("button", { name: /démarrer l'enregistrement/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /démarrer l'enregistrement/i }));
    await waitFor(() => expect(screen.getByText(/enregistrement en cours/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /arrêter l'enregistrement/i }));
    await waitFor(() => expect(screen.getByLabelText(/ton enregistrement/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /^continuer →/i }));
    await finishSelfAssessment();

    expect(trackEvent).toHaveBeenCalledWith("speaking_practice_completed", {
      speakingExerciseId: "test-full-flow",
      speakingKind: "repetition",
      selfRating: "correct",
    });
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored["test-full-flow"].lastWithoutRecording).toBe(false);
    // La lecture de la prise reste disponible dans l'écran de fin.
    expect(screen.getByLabelText(/ton enregistrement/i)).toBeInTheDocument();
  });

  it("requires a self-rating before allowing the learner to finish", async () => {
    render(<SpeakingExerciseCard exercise={situationExercise()} />);
    await reachRecordReady();
    fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));

    expect(screen.getByRole("button", { name: /terminer l'exercice/i })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Très bien" }));
    expect(screen.getByRole("button", { name: /terminer l'exercice/i })).not.toBeDisabled();
  });

  it("lets the learner restart the whole exercise from the done state", async () => {
    render(<SpeakingExerciseCard exercise={situationExercise()} />);
    await reachRecordReady();
    fireEvent.click(screen.getByRole("button", { name: /continuer sans enregistrement/i }));
    await finishSelfAssessment();

    fireEvent.click(screen.getByRole("button", { name: /refaire cet exercice/i }));

    expect(screen.getByRole("button", { name: /passer à l'enregistrement/i })).toBeInTheDocument();
  });
});

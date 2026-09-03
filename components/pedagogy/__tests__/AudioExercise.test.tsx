import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AudioExercise from "@/components/pedagogy/AudioExercise";
import { trackEvent } from "@/lib/analytics/client";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.mocked(trackEvent).mockClear();
});

function makeExercise(overrides: Partial<ComprehensionOraleExercise> = {}): ComprehensionOraleExercise {
  return {
    id: "ex-1",
    skillId: "co-test",
    difficulty: "B1",
    instructions: "Écoute l'audio et réponds aux questions.",
    type: "comprehension_orale",
    audioSrc: "/audio/b1/test.m4a",
    questions: [
      {
        kind: "qcm",
        id: "ex-1-q1",
        prompt: "Question test ?",
        choices: [
          { id: "a", text: "Réponse A" },
          { id: "b", text: "Réponse B" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Réponse A", explanation: "Parce que." },
      },
    ],
    ...overrides,
  };
}

describe("AudioExercise", () => {
  it("renders a playable audio element, trying the human recording path first (synthetic fallback)", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    const audio = container.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio).toHaveAttribute("src", "/audio/b1/human/test.m4a");
  });

  it("falls back to the synthetic track when the human recording fails to load", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!);

    expect(container.querySelector("audio")).toHaveAttribute("src", "/audio/b1/test.m4a");
  });

  it("shows a clean error state with a retry action when both the human and synthetic sources fail", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!); // human -> synthetic
    fireEvent.error(container.querySelector("audio")!); // synthetic -> error

    expect(screen.getByText(/audio non disponible/i)).toBeInTheDocument();
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.getByRole("button", { name: /réessayer/i })).toBeInTheDocument();
  });

  it("lets the learner retry after an error, restoring a fresh audio element from the start of the cycle", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!);
    fireEvent.error(container.querySelector("audio")!);

    // jsdom's HTMLMediaElement.play() isn't implemented (unlike a real
    // browser, it doesn't even return a Promise) — retry() re-arms
    // `wantsPlayRef`, which the component uses to resume playback on the
    // freshly (re)mounted <audio> element once it leaves the error state.
    // Stubbed on the prototype since that element doesn't exist yet here.
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);

    fireEvent.click(screen.getByRole("button", { name: /réessayer/i }));

    expect(screen.queryByText(/audio non disponible/i)).not.toBeInTheDocument();
    expect(container.querySelector("audio")).toHaveAttribute("src", "/audio/b1/human/test.m4a");
  });

  it("offers a way to jump back to the start of the track", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    const audio = container.querySelector("audio")! as HTMLAudioElement;
    Object.defineProperty(audio, "currentTime", { value: 42, writable: true });

    fireEvent.click(screen.getByRole("button", { name: /revenir au début/i }));

    expect(audio.currentTime).toBe(0);
  });

  it("does not show a transcript toggle when the exercise has no transcript", () => {
    render(<AudioExercise exercise={makeExercise({ transcript: undefined })} />);
    expect(screen.queryByText(/transcription/i)).not.toBeInTheDocument();
  });

  it("shows a transcript toggle when a transcript is provided, and never fabricates one", () => {
    render(<AudioExercise exercise={makeExercise({ transcript: "Bonjour, ceci est le script." })} />);
    const toggle = screen.getByRole("button", { name: /afficher la transcription/i });
    expect(screen.queryByText("Bonjour, ceci est le script.")).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.getByText("Bonjour, ceci est le script.")).toBeInTheDocument();
  });

  it("pauses another audio exercise already playing on the same page (no simultaneous playback)", () => {
    const { container } = render(
      <>
        <AudioExercise exercise={makeExercise({ id: "ex-a", audioSrc: "/audio/b1/a.m4a" })} />
        <AudioExercise exercise={makeExercise({ id: "ex-b", audioSrc: "/audio/b1/b.m4a" })} />
      </>
    );
    const [first, second] = Array.from(container.querySelectorAll("audio")) as HTMLAudioElement[];

    // jsdom's HTMLMediaElement.pause() is a real no-op function; swap it for
    // a spy so the test observes the *intent* (our code calling pause())
    // rather than any playback side effect jsdom can't provide.
    const pauseFirst = vi.fn();
    first.pause = pauseFirst;

    fireEvent.play(first);
    expect(pauseFirst).not.toHaveBeenCalled();

    fireEvent.play(second);
    expect(pauseFirst).toHaveBeenCalledTimes(1);
  });

  it("tracks a single audio_play_started per attempt, even across a pause/resume", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    const audio = container.querySelector("audio")!;

    fireEvent.play(audio);
    fireEvent.pause(audio);
    fireEvent.play(audio); // resuming the same attempt — not a new "start"

    const playStartedCalls = vi
      .mocked(trackEvent)
      .mock.calls.filter(([name]) => name === "audio_play_started");
    expect(playStartedCalls).toHaveLength(1);
    expect(playStartedCalls[0][1]).toEqual({ exerciseId: "ex-1" });
  });

  it("tracks audio_completed when the track ends naturally", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.ended(container.querySelector("audio")!);

    expect(trackEvent).toHaveBeenCalledWith("audio_completed", { exerciseId: "ex-1" });
  });

  it("never tracks audio_error on the invisible human -> synthetic fallback (no error reached the learner)", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!); // human -> synthetic, silent

    expect(trackEvent).not.toHaveBeenCalledWith("audio_error", expect.anything());
  });

  it("tracks audio_error only once both sources are exhausted, and audio_retry on retry", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!); // human -> synthetic
    fireEvent.error(container.querySelector("audio")!); // synthetic -> error (terminal)

    expect(trackEvent).toHaveBeenCalledWith("audio_error", {
      exerciseId: "ex-1",
      reason: "native_media_error",
    });
    expect(trackEvent).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /réessayer/i }));
    expect(trackEvent).toHaveBeenCalledWith("audio_retry", { exerciseId: "ex-1" });
  });

  it("can track a fresh audio_play_started after a retry (the guard resets per attempt)", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!);
    fireEvent.error(container.querySelector("audio")!);
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    fireEvent.click(screen.getByRole("button", { name: /réessayer/i }));
    vi.mocked(trackEvent).mockClear();

    fireEvent.play(container.querySelector("audio")!);

    expect(trackEvent).toHaveBeenCalledWith("audio_play_started", { exerciseId: "ex-1" });
  });
});

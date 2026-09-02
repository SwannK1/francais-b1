import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AudioExercise from "@/components/pedagogy/AudioExercise";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

afterEach(cleanup);

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
  it("renders a playable audio element pointing at the exercise's audioSrc", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    const audio = container.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio).toHaveAttribute("src", "/audio/b1/test.m4a");
  });

  it("shows a clean error state with a retry action when the audio fails to load", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    const audio = container.querySelector("audio")!;

    fireEvent.error(audio);

    expect(screen.getByText(/audio non disponible/i)).toBeInTheDocument();
    expect(container.querySelector("audio")).toBeNull();
    expect(screen.getByRole("button", { name: /réessayer/i })).toBeInTheDocument();
  });

  it("lets the learner retry after an error, restoring a fresh audio element", () => {
    const { container } = render(<AudioExercise exercise={makeExercise()} />);
    fireEvent.error(container.querySelector("audio")!);

    fireEvent.click(screen.getByRole("button", { name: /réessayer/i }));

    expect(screen.queryByText(/audio non disponible/i)).not.toBeInTheDocument();
    expect(container.querySelector("audio")).not.toBeNull();
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
});

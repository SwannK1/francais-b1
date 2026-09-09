import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AudioExercise from "@/components/pedagogy/AudioExercise";
import { trackEvent } from "@/lib/analytics/client";
import { AUDIO_TRACKS_A2 } from "@/lib/pedagogy/audio/a2/manifest";

/**
 * Accessibilité du lecteur audio appliqué à un exercice A2 réel (pas un
 * fixture générique) : clavier, focus, labels, play/pause, feedback d'état.
 * Réutilise `AudioExercise.tsx` tel quel (aucune modification du composant
 * partagé) — voir `components/pedagogy/__tests__/AudioExercise.test.tsx` pour
 * l'équivalent B1 dont ce fichier reprend le protocole de test.
 */

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.mocked(trackEvent).mockClear();
});

const sampleTrack = AUDIO_TRACKS_A2.find((t) => t.exercise.questions.length > 0)!;
const exercise = sampleTrack.exercise;

describe("AudioExercise appliqué à une piste A2", () => {
  it("expose un <audio> avec un aria-label décrivant la consigne, et tente d'abord la source humaine", () => {
    const { container } = render(<AudioExercise exercise={exercise} />);
    const audio = container.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio).toHaveAttribute("aria-label", `Audio : ${exercise.instructions}`);
    expect(audio).toHaveAttribute("src", `/audio/a2/human/${exercise.id}.m4a`);
  });

  it("le bouton \"Revenir au début\" est atteignable et actionnable au clavier (tabIndex natif, role button)", async () => {
    render(<AudioExercise exercise={exercise} />);
    const restartButton = screen.getByRole("button", { name: /revenir au début/i });
    // Un <button> natif est toujours focusable et actionnable au clavier —
    // on vérifie ici qu'aucun `tabIndex={-1}` ou attribut ne le retire de
    // l'ordre de tabulation ni ne le déguise en élément non interactif.
    expect(restartButton.tagName).toBe("BUTTON");
    expect(restartButton).not.toHaveAttribute("tabindex", "-1");
    expect(restartButton).not.toBeDisabled();
    const user = userEvent.setup();
    await user.tab();
    // Le focus atteint bien un élément interactif du composant (audio natif
    // ou bouton), jamais un <div> décoratif — condition nécessaire pour un
    // usage clavier complet.
    expect(document.activeElement).not.toBe(document.body);
  });

  it("bascule proprement humain -> synthétique -> erreur avec un bouton Réessayer accessible, au clavier compris", async () => {
    const { container } = render(<AudioExercise exercise={exercise} />);
    fireEvent.error(container.querySelector("audio")!); // humain -> synthétique
    expect(container.querySelector("audio")).toHaveAttribute("src", exercise.audioSrc);

    fireEvent.error(container.querySelector("audio")!); // synthétique -> erreur
    const retryButton = screen.getByRole("button", { name: /réessayer/i });
    expect(retryButton).toBeInTheDocument();
    expect(screen.getByText(/audio non disponible/i)).toBeInTheDocument();

    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    retryButton.focus();
    await user.keyboard("{Enter}");

    expect(screen.queryByText(/audio non disponible/i)).not.toBeInTheDocument();
    expect(container.querySelector("audio")).toHaveAttribute("src", `/audio/a2/human/${exercise.id}.m4a`);
  });

  it("annonce l'état de la voix (humaine/synthèse) seulement après une lecture confirmée, jamais avant", () => {
    const { container } = render(<AudioExercise exercise={exercise} />);
    expect(screen.queryByText(/voix humaine/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/voix de synthèse/i)).not.toBeInTheDocument();

    const audio = container.querySelector("audio")!;
    fireEvent.play(audio);
    fireEvent.canPlay(audio);
    expect(screen.getByText(/voix humaine/i)).toBeInTheDocument();
  });

  it("le bouton d'affichage de la transcription porte aria-expanded et bascule son état", async () => {
    render(<AudioExercise exercise={exercise} />);
    const toggle = screen.getByRole("button", { name: /afficher la transcription/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    const user = userEvent.setup();
    await user.click(toggle);
    expect(screen.getByRole("button", { name: /masquer la transcription/i })).toHaveAttribute("aria-expanded", "true");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { notifyAudioPlaying as NotifyPlaying, notifyAudioStopped as NotifyStopped } from "@/lib/pedagogy/audio-playback";

function fakeAudio() {
  return { pause: vi.fn() } as unknown as HTMLAudioElement;
}

// Le module garde un état de module (le lecteur actuellement en lecture) :
// on le réimporte à chaud à chaque test pour repartir d'un état neutre,
// plutôt que de dépendre de l'ordre d'exécution des tests.
let notifyAudioPlaying: typeof NotifyPlaying;
let notifyAudioStopped: typeof NotifyStopped;

beforeEach(async () => {
  vi.resetModules();
  ({ notifyAudioPlaying, notifyAudioStopped } = await import("@/lib/pedagogy/audio-playback"));
});

describe("audio-playback singleton", () => {
  it("pauses the previously playing audio when a different one starts", () => {
    const first = fakeAudio();
    const second = fakeAudio();

    notifyAudioPlaying(first);
    expect(first.pause).not.toHaveBeenCalled();

    notifyAudioPlaying(second);
    expect(first.pause).toHaveBeenCalledTimes(1);
    expect(second.pause).not.toHaveBeenCalled();
  });

  it("does not pause an audio that re-notifies itself as playing", () => {
    const only = fakeAudio();
    notifyAudioPlaying(only);
    notifyAudioPlaying(only);
    expect(only.pause).not.toHaveBeenCalled();
  });

  it("stopping the currently playing audio frees the slot for the next play", () => {
    const first = fakeAudio();
    const second = fakeAudio();

    notifyAudioPlaying(first);
    notifyAudioStopped(first);
    notifyAudioPlaying(second);

    // `first` was already stopped before `second` started, so it must not
    // receive a redundant pause() call.
    expect(first.pause).not.toHaveBeenCalled();
  });

  it("stopping an audio that is not the current one is a no-op", () => {
    const first = fakeAudio();
    const second = fakeAudio();

    notifyAudioPlaying(first);
    notifyAudioStopped(second);
    notifyAudioPlaying(second);

    // `first` is still considered "current" until `second` actually starts.
    expect(first.pause).toHaveBeenCalledTimes(1);
  });

  it("ignores null references", () => {
    expect(() => notifyAudioPlaying(null)).not.toThrow();
    expect(() => notifyAudioStopped(null)).not.toThrow();
  });
});

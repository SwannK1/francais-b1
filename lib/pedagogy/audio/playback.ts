/**
 * Logique de lecture audio, pure et indépendante du DOM/React — testable
 * sans jsdom. `AudioExercise.tsx` ne fait que câbler ces fonctions à des
 * événements `<audio>` réels.
 */

export type AudioStage = "human" | "synthetic" | "error";

export const INITIAL_AUDIO_STAGE: AudioStage = "human";

/** Piste suivante après l'échec de la source en cours : humain -> synthétique -> erreur (terminal). */
export function nextStageAfterFailure(stage: AudioStage): AudioStage {
  if (stage === "human") return "synthetic";
  return "error";
}

/** Réessayer depuis l'état d'erreur : on repart du début du cycle de résolution. */
export function resetStage(): AudioStage {
  return INITIAL_AUDIO_STAGE;
}

/** Source à lire pour l'étape courante, ou `undefined` en état d'erreur (rien à lire). */
export function resolveSrc(stage: AudioStage, humanSrc: string, syntheticSrc: string): string | undefined {
  if (stage === "human") return humanSrc;
  if (stage === "synthetic") return syntheticSrc;
  return undefined;
}

/**
 * Coordinateur "une seule lecture à la fois" : plusieurs `<audio>` peuvent
 * être montés simultanément sur une même page (ex. les 2 documents d'une
 * épreuve de compréhension orale d'un examen blanc) — en démarrer un met en
 * pause celui éventuellement déjà en cours, pour ne jamais superposer deux
 * pistes.
 */
export interface Pausable {
  pause(): void;
}

let currentlyPlaying: Pausable | null = null;

export function registerPlayback(el: Pausable): void {
  if (currentlyPlaying && currentlyPlaying !== el) currentlyPlaying.pause();
  currentlyPlaying = el;
}

export function clearPlaybackIfCurrent(el: Pausable): void {
  if (currentlyPlaying === el) currentlyPlaying = null;
}

/** Réservé aux tests : remet le coordinateur à zéro entre deux cas. */
export function resetPlaybackCoordinatorForTests(): void {
  currentlyPlaying = null;
}

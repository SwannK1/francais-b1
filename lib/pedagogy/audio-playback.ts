/**
 * Coordination minimale entre lecteurs `<audio>` de compréhension orale.
 *
 * Certaines pages (ex. un examen DELF affichant plusieurs documents audio
 * sans pagination) montent plusieurs lecteurs en même temps. Sans garde-fou,
 * l'apprenant peut démarrer un deuxième audio pendant que le premier joue
 * encore, ce qui superpose deux voix. On garde donc une référence unique au
 * dernier lecteur démarré : en tenir un nouveau met systématiquement en
 * pause l'ancien.
 *
 * Volontairement une simple variable de module (pas de Context React) : la
 * coordination est globale à la page, pas liée à un arbre de composants
 * particulier, et il n'y a qu'un seul lecteur actif possible à tout moment.
 */
let currentlyPlaying: HTMLAudioElement | null = null;

export function notifyAudioPlaying(audio: HTMLAudioElement | null) {
  if (!audio) return;
  if (currentlyPlaying && currentlyPlaying !== audio) {
    currentlyPlaying.pause();
  }
  currentlyPlaying = audio;
}

export function notifyAudioStopped(audio: HTMLAudioElement | null) {
  if (!audio) return;
  if (currentlyPlaying === audio) {
    currentlyPlaying = null;
  }
}

import { publicDir, existsUnderPublic, fileSizeUnderPublic } from "@/lib/pedagogy/audio/status";
import { a1SyntheticSrc, toA1HumanAudioPath } from "@/lib/pedagogy/audio/a1/paths";
import type { A1AudioTrack } from "@/lib/pedagogy/audio/a1/types";

/**
 * Helpers d'accès disque pour l'audio A1 — Node uniquement. Réutilise
 * volontairement les primitives génériques et déjà testées de
 * `lib/pedagogy/audio/status.ts` (`publicDir`, `existsUnderPublic`,
 * `fileSizeUnderPublic` — pures fonctions de chemin, indépendantes du
 * contenu B1) plutôt que de les dupliquer. Rien n'est importé du manifest B1
 * ni de `getTrackAvailability` (qui, elle, est spécifique à la forme
 * `AudioTrack` de B1) : l'isolation du contenu reste totale.
 */

export type A1Availability = "human" | "synthetic" | "missing";

export { publicDir, existsUnderPublic, fileSizeUnderPublic };

export function getA1TrackAvailability(track: A1AudioTrack, baseDir: string = publicDir()): A1Availability {
  const synthetic = a1SyntheticSrc(track);
  const human = toA1HumanAudioPath(synthetic);
  if (existsUnderPublic(human, baseDir)) return "human";
  if (existsUnderPublic(synthetic, baseDir)) return "synthetic";
  return "missing";
}

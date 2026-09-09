import { A2_TRACKS_DEBUT } from "@/lib/pedagogy/audio/a2/tracks/debut";
import { A2_TRACKS_MILIEU } from "@/lib/pedagogy/audio/a2/tracks/milieu";
import { A2_TRACKS_FIN } from "@/lib/pedagogy/audio/a2/tracks/fin";
import type { A2TrackDefinition } from "@/lib/pedagogy/audio/a2/types";

export { A2_TRACKS_DEBUT, A2_TRACKS_MILIEU, A2_TRACKS_FIN };

/** Les 26 pistes de la bibliothèque de pratique, dans l'ordre de progression. */
export const A2_PRACTICE_TRACKS: A2TrackDefinition[] = [
  ...A2_TRACKS_DEBUT,
  ...A2_TRACKS_MILIEU,
  ...A2_TRACKS_FIN,
];

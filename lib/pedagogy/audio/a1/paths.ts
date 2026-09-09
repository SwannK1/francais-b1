import type { A1AudioTrack } from "@/lib/pedagogy/audio/a1/types";

/**
 * Convention de chemin A1, alignée sur celle du B1
 * (`lib/pedagogy/audio/paths.ts`) : `/audio/a1/<theme>/<filename>`, avec un
 * futur fichier humain au même endroit dans un sous-dossier `human/` frère —
 * même logique, même nom de fichier, aucune nouvelle convention à retenir.
 *
 * Module pur (aucun accès disque) — importable côté client comme côté
 * script, comme son équivalent B1.
 */

const HUMAN_SUBDIR = "human";

export function a1SyntheticSrc(track: Pick<A1AudioTrack, "theme" | "filename">): string {
  return `/audio/a1/${track.theme}/${track.filename}`;
}

/** Ex. "/audio/a1/salutations/bonjour-matin.m4a" -> "/audio/a1/salutations/human/bonjour-matin.m4a" */
export function toA1HumanAudioPath(syntheticSrc: string): string {
  const lastSlash = syntheticSrc.lastIndexOf("/");
  if (lastSlash === -1) return `${HUMAN_SUBDIR}/${syntheticSrc}`;
  const dir = syntheticSrc.slice(0, lastSlash);
  const filename = syntheticSrc.slice(lastSlash + 1);
  return `${dir}/${HUMAN_SUBDIR}/${filename}`;
}

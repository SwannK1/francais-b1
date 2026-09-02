/**
 * Convention de nommage des fichiers audio humains — voir
 * `docs/b1/audio-human-recording-plan.md` §8 pour le contexte complet.
 *
 * Un fichier humain vit au même endroit que le synthétique qu'il remplace,
 * dans un sous-dossier `human/` : `/audio/b1/donner-son-opinion.m4a` →
 * `/audio/b1/human/donner-son-opinion.m4a`. Même nom de fichier, dossier
 * frère — aucun renommage de contenu pédagogique, aucune nouvelle
 * convention à retenir au-delà de « ajoute `human/` avant le nom ».
 *
 * Module pur (aucun accès disque) : importable depuis un composant client
 * (`AudioExercise.tsx`) comme depuis un script Node.
 */

const HUMAN_SUBDIR = "human";

/** Ex. "/audio/b1/donner-son-opinion.m4a" -> "/audio/b1/human/donner-son-opinion.m4a" */
export function toHumanAudioPath(syntheticSrc: string): string {
  const lastSlash = syntheticSrc.lastIndexOf("/");
  if (lastSlash === -1) return `${HUMAN_SUBDIR}/${syntheticSrc}`;
  const dir = syntheticSrc.slice(0, lastSlash);
  const filename = syntheticSrc.slice(lastSlash + 1);
  return `${dir}/${HUMAN_SUBDIR}/${filename}`;
}

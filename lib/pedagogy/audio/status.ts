import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AudioTrack } from "@/lib/pedagogy/audio/manifest";

/**
 * Helpers d'accès disque pour l'audio — Node uniquement (`node:fs`), jamais
 * importés depuis un composant client. Utilisés par les scripts
 * (`scripts/audio-status.mjs`) et par `content-integrity.test.ts`.
 *
 * `import.meta.url` plutôt que `__dirname` : ce fichier tourne aussi bien
 * sous Node ESM natif (script) que sous vitest — `__dirname` n'existe pas
 * dans le premier cas.
 */

export type AudioAvailability = "human" | "synthetic" | "missing";

/** Racine `public/` du projet, déduite de l'emplacement de ce fichier. */
export function publicDir(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../../public");
}

/**
 * `baseDir` par défaut = `public/` réel ; les tests peuvent passer un
 * dossier de fixture temporaire (hors du dépôt) pour simuler un fichier
 * humain présent sans jamais créer de faux asset dans `public/`.
 */
export function existsUnderPublic(relPath: string, baseDir: string = publicDir()): boolean {
  if (!relPath.startsWith("/")) return false;
  return existsSync(path.join(baseDir, relPath));
}

export function fileSizeUnderPublic(relPath: string, baseDir: string = publicDir()): number | null {
  if (!existsUnderPublic(relPath, baseDir)) return null;
  return statSync(path.join(baseDir, relPath)).size;
}

/**
 * Résout l'état réel d'une piste : humain si le fichier humain existe
 * (priorité), sinon synthétique si le fichier actuel existe, sinon
 * "missing" (ne devrait jamais arriver pour `syntheticSrc` en production —
 * c'est justement ce que `content-integrity.test.ts` vérifie).
 */
export function getTrackAvailability(track: AudioTrack, baseDir: string = publicDir()): AudioAvailability {
  if (existsUnderPublic(track.humanSrc, baseDir)) return "human";
  if (existsUnderPublic(track.syntheticSrc, baseDir)) return "synthetic";
  return "missing";
}

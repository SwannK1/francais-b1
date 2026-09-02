#!/usr/bin/env node
// Vérifie que chaque `audioSrc` référencé dans les données pédagogiques
// pointe vers un fichier réellement présent dans `public/`. Volontairement
// sans dépendance : lecture de fichiers + une regex, aucun accès réseau,
// aucun import de `lib/pedagogy/data` (qui est du TypeScript compilé par
// Next, pas directement exécutable par Node) — juste une analyse statique du
// texte source, robuste et rapide à exécuter en CI.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      out.push(...listFilesRecursive(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

/**
 * Extrait tous les chemins `/audio/...` référencés dans les fichiers
 * TypeScript d'un dossier de données pédagogiques.
 */
export function extractReferencedAudioPaths(dataDir) {
  const referenced = new Set();
  const files = listFilesRecursive(dataDir).filter((f) => f.endsWith(".ts"));
  const pattern = /["'](\/audio\/[^"']+)["']/g;
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(pattern)) {
      referenced.add(match[1]);
    }
  }
  return [...referenced].sort();
}

/**
 * Compare les chemins référencés à ce qui existe réellement sous `publicDir`.
 * `publicDir` doit être le dossier `public/` (les chemins référencés
 * commencent par `/`, servis tels quels par Next.js depuis `public/`).
 */
export function checkAudioAssets(dataDir, publicDir) {
  const referenced = extractReferencedAudioPaths(dataDir);
  const missing = referenced.filter((path) => !existsSync(join(publicDir, path)));

  const audioDir = join(publicDir, "audio");
  const actualFiles = existsSync(audioDir)
    ? listFilesRecursive(audioDir).map((f) => "/audio" + f.slice(audioDir.length).split("\\").join("/"))
    : [];
  const referencedSet = new Set(referenced);
  const orphaned = actualFiles.filter((path) => !referencedSet.has(path)).sort();

  return { referenced, missing, orphaned };
}

function main() {
  const dataDir = join(ROOT, "lib", "pedagogy", "data");
  const publicDir = join(ROOT, "public");
  const { referenced, missing, orphaned } = checkAudioAssets(dataDir, publicDir);

  console.log(`${referenced.length} référence(s) audio trouvée(s) dans lib/pedagogy/data.`);

  if (orphaned.length > 0) {
    console.log(`\n${orphaned.length} fichier(s) présent(s) dans public/audio mais jamais référencé(s) :`);
    for (const path of orphaned) console.log(`  - ${path}`);
  }

  if (missing.length > 0) {
    console.error(`\n✗ ${missing.length} référence(s) audio cassée(s) (fichier absent de public/) :`);
    for (const path of missing) console.error(`  - ${path}`);
    process.exitCode = 1;
    return;
  }

  console.log("\n✓ Toutes les références audio pointent vers un fichier existant.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

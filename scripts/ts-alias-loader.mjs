// Hook de résolution ESM minimal pour exécuter du TypeScript du dépôt avec
// `node` tout en gardant les imports `@/...` déjà utilisés partout dans le
// code applicatif (voir tsconfig.json `paths`). Node sait nativement lire du
// TypeScript (transtypage à la volée depuis Node 22.6+) mais ne connaît pas
// les alias tsconfig — ce fichier ne fait que ça, rien d'autre.
//
// Utilisation dans un script : voir `scripts/audio-status.mjs` (appelle
// `register()` avec ce fichier avant tout import applicatif).
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
// Node ESM natif exige une extension explicite ; la résolution "bundler" de
// tsconfig (utilisée partout ailleurs dans le projet — Next, vitest) permet
// d'omettre `.ts`/`.tsx` ou de pointer un dossier via son `index.ts`. On
// retente ces variantes dans cet ordre avant d'abandonner.
const CANDIDATE_SUFFIXES = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

export async function resolve(specifier, context, nextResolve) {
  const aliased = specifier.startsWith("@/")
    ? pathToFileURL(path.join(ROOT, specifier.slice(2))).href
    : specifier;

  let lastError;
  for (const suffix of CANDIDATE_SUFFIXES) {
    try {
      return await nextResolve(aliased + suffix, context);
    } catch (error) {
      if (error?.code !== "ERR_UNSUPPORTED_DIR_IMPORT" && error?.code !== "ERR_MODULE_NOT_FOUND") throw error;
      lastError = error;
    }
  }
  throw lastError;
}

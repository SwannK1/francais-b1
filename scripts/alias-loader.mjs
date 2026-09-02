// Résolveur minimal pour les tests Node natifs (`node --test`) : mappe
// l'alias TypeScript "@/..." (tsconfig.json, utilisé partout dans lib/ et
// app/) vers le fichier réel, sans dépendance externe (pas de jest/vitest —
// aucun framework de test n'existait dans ce projet avant ce chantier).
import { pathToFileURL } from "node:url";
import { resolve as resolvePath } from "node:path";

const ROOT = new URL("../", import.meta.url);

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = resolvePath(ROOT.pathname, specifier.slice(2));
    const withExt = /\.[a-z]+$/.test(target) ? target : `${target}.ts`;
    return nextResolve(pathToFileURL(withExt).href, context);
  }
  return nextResolve(specifier, context);
}

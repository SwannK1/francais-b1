import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EXAMS } from "@/lib/pedagogy/data/exams";
import { PUBLIC_EXAMS, getPublicExamById, getPublicExamBySlug } from "@/lib/pedagogy/data/exams-public";

/**
 * Garde-fous de non-fuite du contenu premium pour les examens — même
 * principe que `modules-public.test.ts` § PUBLIC_MODULES, voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 * La frontière statique ("use client" n'atteint jamais data/exams.ts) est
 * vérifiée dans `modules-public.test.ts` (test générique sur tout le dépôt),
 * pas dupliquée ici.
 */

const PROTECTED_KEYS = [
  "sections",
  "exercises",
  "instructions",
  "question",
  "prompt",
  "choices",
  "correctChoiceId",
  "correctAnswer",
  "correction",
  "text",
  "transcript",
  "eliminatoryScore",
  "delfSection",
];

function collectKeys(value: unknown, keys: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, keys);
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, v] of Object.entries(value)) {
      keys.add(key);
      collectKeys(v, keys);
    }
  }
}

describe("PUBLIC_EXAMS — aucun champ protégé", () => {
  it("ne porte aucune des clés réservées au contenu complet, à aucune profondeur", () => {
    const keys = new Set<string>();
    collectKeys(PUBLIC_EXAMS, keys);
    const leaked = PROTECTED_KEYS.filter((k) => keys.has(k));
    expect(leaked).toEqual([]);
  });

  it("couvre exactement les mêmes examens que EXAMS (rien d'oublié, rien d'inventé)", () => {
    expect(PUBLIC_EXAMS.map((e) => e.id).sort()).toEqual(EXAMS.map((e) => e.id).sort());
  });

  it("conserve les métadonnées publiques attendues (id, slug, titre, niveau, type)", () => {
    const source = EXAMS[0];
    const pub = getPublicExamById(source.id)!;
    expect(pub.slug).toBe(source.slug);
    expect(pub.title).toBe(source.title);
    expect(pub.type).toBe(source.type);
    expect(pub.level).toBe(source.level);
    expect(pub.isBlanc).toBe(source.isBlanc);
  });

  it("getPublicExamBySlug retrouve le même examen que getPublicExamById", () => {
    const source = EXAMS[0];
    expect(getPublicExamBySlug(source.slug)?.id).toBe(source.id);
  });
});

describe("Fichier généré à jour (npm run generate:public-exams)", () => {
  it("exams-public.generated.ts correspond exactement à une régénération à partir de EXAMS", () => {
    // `process.cwd()` plutôt que `fileURLToPath(new URL(..., import.meta.url))` :
    // ne résout pas de façon fiable en `file:` dans cet environnement Vitest
    // (voir le commentaire équivalent dans modules-public.test.ts).
    const generatedPath = path.join(process.cwd(), "lib/pedagogy/data/exams-public.generated.ts");
    const checkedIn = readFileSync(generatedPath, "utf8");

    const scriptPath = path.join(process.cwd(), "scripts/generate-public-exams.mjs");
    execFileSync("node", [scriptPath], { encoding: "utf8" });
    const regenerated = readFileSync(generatedPath, "utf8");

    // Remet le fichier généré dans l'état où on l'a trouvé si la
    // régénération a introduit une différence de formatage sans rapport —
    // ce test ne doit avoir aucun effet de bord sur l'arbre de travail au
    // delà de la vérification elle-même.
    if (regenerated !== checkedIn) {
      writeFileSync(generatedPath, checkedIn, "utf8");
    }

    expect(regenerated).toBe(checkedIn);
  });
});

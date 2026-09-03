import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { PUBLIC_MODULES, getPublicModuleBySlug, getPublicModulesByLevel } from "@/lib/pedagogy/data/modules-public";

/**
 * Garde-fous de non-fuite du contenu premium — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 * Deux catégories de vérification ici :
 * 1. La donnée `PUBLIC_MODULES` elle-même ne porte jamais de champ protégé
 *    (peu importe où elle finit par être importée).
 * 2. Aucun fichier `"use client"` du dépôt n'importe, même indirectement,
 *    le module qui porte le contenu intégral (`data/modules.ts`).
 */

const PROTECTED_KEYS = [
  "instructions",
  "question",
  "prompt",
  "choices",
  "correctChoiceId",
  "correctAnswer",
  "correction",
  "text",
  "transcript",
  "textWithBlanks",
  "blanks",
  "items",
  "correctOrder",
  "pairs",
  "statement",
  "consigne",
  "acceptedAnswers",
  "situation",
  "vocabulary",
  "languagePoints",
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

describe("PUBLIC_MODULES — aucun champ protégé", () => {
  it("ne porte aucune des clés réservées au contenu complet, à aucune profondeur", () => {
    const keys = new Set<string>();
    collectKeys(PUBLIC_MODULES, keys);
    const leaked = PROTECTED_KEYS.filter((k) => keys.has(k));
    expect(leaked).toEqual([]);
  });

  it("couvre exactement les mêmes modules que MODULES (rien d'oublié, rien d'inventé)", () => {
    expect(PUBLIC_MODULES.map((m) => m.id).sort()).toEqual(MODULES.map((m) => m.id).sort());
  });

  it("conserve les métadonnées publiques attendues (id, slug, titre, niveau, étape, compétence)", () => {
    const source = MODULES.find((m) => m.slug === "donner-son-opinion")!;
    const pub = getPublicModuleBySlug("donner-son-opinion")!;
    expect(pub.id).toBe(source.id);
    expect(pub.title).toBe(source.title);
    expect(pub.level).toBe(source.level);
    expect(pub.stageId).toBe(source.stageId);
    expect(pub.domain).toBe(source.domain);
    // skillId (compétence par exercice) est explicitement public — nécessaire
    // au calcul de progression par compétence.
    const firstExercise = source.lessons[0].activities[0].exercises[0];
    expect(pub.lessons[0].activities[0].exercises[0].skillId).toBe(firstExercise.skillId);
  });

  it("précalcule totalExercises correctement (utilisé pour la progression, sans avoir à exposer le détail)", () => {
    const source = MODULES.find((m) => m.slug === "donner-son-opinion")!;
    const total = source.lessons.reduce(
      (sum, l) => sum + l.activities.reduce((s, a) => s + a.exercises.length, 0),
      0
    );
    expect(getPublicModuleBySlug("donner-son-opinion")!.totalExercises).toBe(total);
  });

  it("getPublicModulesByLevel filtre par niveau sans fuite", () => {
    const b1 = getPublicModulesByLevel("B1");
    expect(b1.length).toBeGreaterThan(0);
    expect(b1.every((m) => m.level === "B1")).toBe(true);
  });
});

describe("Fichier généré à jour (npm run generate:public-modules)", () => {
  it("modules-public.generated.ts correspond exactement à une régénération à partir de MODULES", () => {
    // `process.cwd()` plutôt que `fileURLToPath(new URL(..., import.meta.url))` :
    // voir le commentaire équivalent plus bas dans ce fichier (`import.meta.url`
    // ne résout pas de façon fiable en `file:` dans cet environnement Vitest).
    const generatedPath = path.join(process.cwd(), "lib/pedagogy/data/modules-public.generated.ts");
    const checkedIn = readFileSync(generatedPath, "utf8");

    const scriptPath = path.join(process.cwd(), "scripts/generate-public-modules.mjs");
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

/**
 * Test statique (Étape 12) : aucun fichier `"use client"` ne doit importer,
 * même indirectement, `data/modules.ts` (contenu intégral) ni le barrel
 * `data/index.ts` qui le ré-exporte. Analyse le graphe d'imports du dépôt
 * directement (regex simple sur les `import ... from "@/..."`), sans
 * dépendre d'un bundler — volontairement indépendant du comportement du
 * tree-shaking, qui ne doit jamais être le seul rempart pour une donnée de
 * cette sensibilité.
 */
describe("Frontière statique : aucun composant client n'atteint le contenu intégral", () => {
  // `process.cwd()` plutôt que `fileURLToPath(new URL(..., import.meta.url))` :
  // évalué au niveau du corps `describe` (phase de collecte des tests), pas
  // dans un `it()` — Vitest ne garantit pas `import.meta.url` en `file:`
  // à ce stade-là (constaté : `TypeError: The URL must be of scheme file`
  // ici précisément, alors que la même construction fonctionne plus haut dans
  // ce fichier une fois à l'intérieur d'un `it()`). Ce dépôt lance toujours
  // ses tests depuis sa racine (voir package.json), donc `process.cwd()` y
  // est fiable.
  const repoRoot = process.cwd();
  const FORBIDDEN_SPECIFIERS = ["@/lib/pedagogy/data/modules", "@/lib/pedagogy/data"];

  function listSourceFiles(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
      if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) continue;
      const full = path.join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        listSourceFiles(full, out);
      } else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.(ts|tsx)$/.test(entry)) {
        out.push(full);
      }
    }
    return out;
  }

  function isClientFile(content: string): boolean {
    const firstStatement = content.trimStart().split("\n")[0]?.trim();
    return firstStatement === '"use client";' || firstStatement === "'use client';";
  }

  function importsOf(content: string): string[] {
    const specifiers: string[] = [];
    const re = /from\s+["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(content))) specifiers.push(match[1]);
    return specifiers;
  }

  function toAbsoluteModuleId(specifier: string, fromFile: string): string | null {
    if (specifier.startsWith("@/")) return specifier; // déjà une clé stable, résolue plus bas
    if (!specifier.startsWith(".")) return null; // paquet npm, hors périmètre de ce graphe
    const resolved = path.resolve(path.dirname(fromFile), specifier);
    const relative = path.relative(repoRoot, resolved).replace(/\\/g, "/");
    return `@/${relative}`;
  }

  function specifierToFile(specifier: string): string | null {
    const withoutAlias = specifier.replace(/^@\//, "");
    const base = path.join(repoRoot, withoutAlias);
    for (const candidate of [
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, "index.ts"),
      path.join(base, "index.tsx"),
    ]) {
      try {
        if (statSync(candidate).isFile()) return candidate;
      } catch {
        // essai suivant
      }
    }
    return null;
  }

  it("aucun fichier \"use client\" n'importe data/modules(.ts) ni le barrel data/, même transitivement", () => {
    const allFiles = listSourceFiles(path.join(repoRoot, "app")).concat(
      listSourceFiles(path.join(repoRoot, "components")),
      listSourceFiles(path.join(repoRoot, "lib"))
    );

    const fileContents = new Map<string, string>();
    for (const f of allFiles) fileContents.set(f, readFileSync(f, "utf8"));

    const clientEntryPoints = allFiles.filter((f) => isClientFile(fileContents.get(f)!));

    const offenders: string[] = [];

    for (const entry of clientEntryPoints) {
      const visited = new Set<string>();
      const stack = [entry];
      while (stack.length > 0) {
        const current = stack.pop()!;
        if (visited.has(current)) continue;
        visited.add(current);

        const content = fileContents.get(current) ?? readFileSync(current, "utf8");
        for (const specifier of importsOf(content)) {
          if (FORBIDDEN_SPECIFIERS.includes(specifier)) {
            offenders.push(`${path.relative(repoRoot, entry)} -> ... -> ${specifier}`);
            continue;
          }
          if (specifier.startsWith("@/lib/pedagogy/data/modules-public")) {
            // Chaîne sûre : ce module ne dépend jamais de data/modules.ts
            // (voir le test dédié plus bas) — pas la peine de le parcourir.
            continue;
          }
          const moduleId = toAbsoluteModuleId(specifier, current);
          if (!moduleId) continue;
          const file = specifierToFile(moduleId);
          if (file && !visited.has(file)) stack.push(file);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("modules-public.ts et modules-public.generated.ts n'importent jamais data/modules.ts", () => {
    const wrapperContent = readFileSync(path.join(repoRoot, "lib/pedagogy/data/modules-public.ts"), "utf8");
    const generatedContent = readFileSync(
      path.join(repoRoot, "lib/pedagogy/data/modules-public.generated.ts"),
      "utf8"
    );
    expect(importsOf(wrapperContent)).not.toContain("@/lib/pedagogy/data/modules");
    expect(importsOf(generatedContent)).not.toContain("@/lib/pedagogy/data/modules");
  });
});

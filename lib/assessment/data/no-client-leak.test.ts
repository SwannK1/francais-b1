import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Garde-fou anti-fuite pour les évaluations de passage (`lib/assessment/`),
 * même principe que `lib/pedagogy/data/modules-public.test.ts` § "Frontière
 * statique" pour les modules/examens : un fichier `"use client"` qui
 * importerait directement les données complètes (avec `correctChoiceId`,
 * `correction.correctAnswer`, transcripts...) les embarquerait dans le
 * bundle navigateur pour TOUS les visiteurs, y compris ceux à qui
 * `canAccess()` refuse cette ressource (voir
 * `app/(pedagogie)/parcours/evaluations/[slug]/page.tsx`, qui ne rend
 * `AssessmentExperience` — le seul client component à recevoir le contenu
 * réel — qu'après une vérification serveur). Ce test s'assure que ce
 * chemin de fuite n'existe nulle part dans le dépôt, indépendamment du
 * tree-shaking du bundler.
 */
describe("Frontière statique : aucun composant client n'importe lib/assessment/data directement", () => {
  const repoRoot = process.cwd();
  const FORBIDDEN_SPECIFIERS = [
    "@/lib/assessment/data/index",
    "@/lib/assessment/data/fin-a1",
    "@/lib/assessment/data/fin-a2",
    "@/lib/assessment/data/passage-a1-a2",
    "@/lib/assessment/data/passage-a2-b1",
  ];

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

  it('aucun fichier "use client" (app/, components/, lib/) n\'importe lib/assessment/data, même via le barrel', () => {
    const allFiles = listSourceFiles(path.join(repoRoot, "app")).concat(
      listSourceFiles(path.join(repoRoot, "components")),
      listSourceFiles(path.join(repoRoot, "lib"))
    );

    const offenders: string[] = [];
    for (const file of allFiles) {
      const content = readFileSync(file, "utf8");
      if (!isClientFile(content)) continue;
      for (const specifier of importsOf(content)) {
        if (FORBIDDEN_SPECIFIERS.includes(specifier)) {
          offenders.push(`${path.relative(repoRoot, file)} -> ${specifier}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});

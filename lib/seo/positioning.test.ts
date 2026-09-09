import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Garde-fou statique du positionnement public (chantier
 * positioning-a1-b1) : le produit couvre désormais A1, A2 et B1, mais nos
 * pages publiques ont longtemps été écrites pour un produit B1 seul. Ce
 * test grep le code source des pages/composants marketing les plus
 * visibles pour repérer un retour silencieux d'un wording B1-only
 * (« Ton parcours B1 », « 26 modules du parcours B1 »...) qui redeviendrait
 * faux dès qu'un visiteur A1 ou A2 arrive sur le site.
 *
 * Volontairement un test de contenu source (regex), pas de rendu : plus
 * rapide, et couvre aussi les strings passées à `generateMetadata`
 * (jamais rendues dans le DOM testé par RTL).
 */

function readSource(relativePath: string): string {
  return readFileSync(path.join(process.cwd(), relativePath), "utf-8");
}

const checks: Array<{
  file: string;
  mustNotMatch: RegExp[];
  mustMatch?: RegExp[];
}> = [
  {
    file: "lib/seo/site.ts",
    mustNotMatch: [/niveau B1\s*:/i, /prépare le DELF B1 avec des examens blancs/i],
    mustMatch: [/\bA1\b[\s\S]*\bB1\b/],
  },
  {
    file: "components/marketing/Hero.tsx",
    mustNotMatch: [/atteindre le niveau B1/i, /réussir le DELF B1/i],
    mustMatch: [/vivre en France/i, /A1 à B1/],
  },
  {
    file: "app/(pedagogie)/parcours/page.tsx",
    mustNotMatch: [/title:\s*"Ton parcours B1"/],
  },
  {
    file: "app/(pedagogie)/parcours/ParcoursExperience.tsx",
    mustNotMatch: [/pour être prêt·e pour un examen de niveau B1/],
  },
  {
    file: "components/layout/Footer.tsx",
    mustNotMatch: [/label:\s*"Parcours B1"/, /Apprendre le français et préparer son DELF B1, à son rythme/],
  },
  {
    file: "lib/commerce/plans.ts",
    // "2 modules B1 complets" reste volontaire : la découverte gratuite est
    // toujours B1-only (asymétrie connue, voir lib/commerce/access.ts) —
    // seul le chiffre de modules premium codé en dur ("26") est banni ici.
    mustNotMatch: [/26 modules du parcours B1/],
  },
  {
    file: "app/faq/page.tsx",
    mustNotMatch: [
      /le contenu du parcours \(modules, exercices, examens blancs\) couvre le niveau B1/,
      /Les 26 modules du parcours B1/,
    ],
  },
  {
    file: "app/offre/page.tsx",
    mustNotMatch: [/formation complète de français B1, une seule offre/],
  },
  {
    file: "app/opengraph-image.tsx",
    mustNotMatch: [/Niveau B1 · Préparation DELF B1/],
  },
];

describe("positionnement public : pas de retour du wording B1-only", () => {
  for (const { file, mustNotMatch, mustMatch } of checks) {
    it(`${file}`, () => {
      const source = readSource(file);
      for (const pattern of mustNotMatch) {
        expect(source, `${file} ne doit plus contenir ${pattern}`).not.toMatch(pattern);
      }
      for (const pattern of mustMatch ?? []) {
        expect(source, `${file} doit toujours contenir ${pattern}`).toMatch(pattern);
      }
    });
  }
});

describe("les pages SEO dédiées niveau B1 restent intactes (B1 y est le vrai sujet)", () => {
  const b1PagesFiles = [
    "app/francais-b1/page.tsx",
    "app/exercices-b1/page.tsx",
    "app/grammaire-b1/page.tsx",
    "app/comprehension-orale-b1/page.tsx",
  ];

  for (const file of b1PagesFiles) {
    it(`${file} existe toujours et parle bien du niveau B1`, () => {
      const source = readSource(file);
      expect(source).toMatch(/niveau B1/i);
    });
  }
});

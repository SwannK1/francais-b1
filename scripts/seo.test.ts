/**
 * Tests statiques du chantier SEO — vérifient les invariants dont dépendent
 * `app/sitemap.ts`, `app/robots.ts` et les `generateMetadata` des pages
 * dynamiques : unicité des slugs, cohérence des liens internes dérivés des
 * données (étape -> modules), et présence des pages attendues. Volontairement
 * minimal (pas de framework de test ajouté au projet) : lancé via
 * `node --test` (voir package.json).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { EXAMS } from "@/lib/pedagogy/data/exams";
import { getStageModules } from "@/lib/pedagogy/logic/parcours";
import sitemap from "@/app/sitemap";

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

test("les slugs de modules sont uniques", () => {
  assert.deepEqual(duplicates(MODULES.map((m) => m.slug)), []);
});

test("les slugs d'étapes du parcours sont uniques", () => {
  assert.deepEqual(duplicates(PARCOURS_STAGES.map((s) => s.slug)), []);
});

test("les slugs d'examens sont uniques", () => {
  assert.deepEqual(duplicates(EXAMS.map((e) => e.slug)), []);
});

test("chaque module référence une étape qui existe réellement (lib/pedagogy/data/modules.ts Module.stageId)", () => {
  const stageIds = new Set(PARCOURS_STAGES.map((s) => s.id));
  for (const mod of MODULES) {
    assert.ok(
      stageIds.has(mod.stageId),
      `Le module "${mod.slug}" référence l'étape inconnue "${mod.stageId}" — /parcours/[stageSlug] ne pourra jamais le lister.`
    );
  }
});

test("chaque étape de contenu (kind: content) a au moins un module, sinon sa page /parcours/[slug] est vide", () => {
  for (const stage of PARCOURS_STAGES.filter((s) => s.kind === "content")) {
    const modules = getStageModules(stage, MODULES);
    assert.ok(modules.length > 0, `L'étape "${stage.slug}" n'a aucun module rattaché.`);
  }
});

test("les modules et examens ont un title et une description non vides (utilisés tels quels par generateMetadata)", () => {
  for (const mod of MODULES) {
    assert.ok(mod.title.trim().length > 0, `Module "${mod.slug}" sans titre.`);
    assert.ok(mod.description.trim().length > 0, `Module "${mod.slug}" sans description.`);
  }
  for (const exam of EXAMS) {
    assert.ok(exam.title.trim().length > 0, `Examen "${exam.slug}" sans titre.`);
    assert.ok(exam.description.trim().length > 0, `Examen "${exam.slug}" sans description.`);
  }
});

test("les slugs ne contiennent que des caractères d'URL sûrs (minuscules, chiffres, tirets)", () => {
  const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  for (const slug of [
    ...MODULES.map((m) => m.slug),
    ...PARCOURS_STAGES.map((s) => s.slug),
    ...EXAMS.map((e) => e.slug),
  ]) {
    assert.match(slug, slugPattern, `Slug "${slug}" contient des caractères non sûrs pour une URL.`);
  }
});

test("app/sitemap.ts : une entrée par module, par examen et par étape de contenu, sans doublon ni page technique", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  assert.deepEqual(duplicates(urls), []);

  for (const mod of MODULES) {
    assert.ok(
      urls.some((u) => u.endsWith(`/parcours/module/${mod.slug}`)),
      `Le module "${mod.slug}" est absent du sitemap.`
    );
  }
  for (const exam of EXAMS) {
    assert.ok(
      urls.some((u) => u.endsWith(`/parcours/examens/${exam.slug}`)),
      `L'examen "${exam.slug}" est absent du sitemap.`
    );
  }
  for (const stage of PARCOURS_STAGES.filter((s) => s.kind === "content")) {
    assert.ok(
      urls.some((u) => u.endsWith(`/parcours/${stage.slug}`)),
      `L'étape "${stage.slug}" est absente du sitemap.`
    );
  }

  const excludedPaths = [
    "/connexion",
    "/inscription",
    "/mot-de-passe-oublie",
    "/reinitialiser-mot-de-passe",
    "/progression",
    "/paiement",
    "/api/",
  ];
  for (const url of urls) {
    for (const excluded of excludedPaths) {
      assert.ok(!url.includes(excluded), `"${url}" ne devrait pas être dans le sitemap.`);
    }
  }
});

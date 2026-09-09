import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { A1_AUDIO_TRACKS } from "@/lib/pedagogy/audio/a1/manifest";
import { a1SyntheticSrc, toA1HumanAudioPath } from "@/lib/pedagogy/audio/a1/paths";
import { existsUnderPublic, fileSizeUnderPublic, publicDir } from "@/lib/pedagogy/audio/a1/status";
import { formatA1Transcript } from "@/lib/pedagogy/audio/a1/types";

/**
 * Garde-fou de contenu pour la bibliothèque audio A1 — même esprit que
 * `lib/pedagogy/data/content-integrity.test.ts` côté B1, mais entièrement
 * autonome (aucun import depuis `lib/pedagogy/data` ni depuis le manifest
 * B1) : ce chantier ne doit dépendre d'aucun fichier possédé par le chantier
 * « contenu A1 » en cours en parallèle.
 */

function duplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe("Manifest audio A1 — structure", () => {
  it("a une bibliothèque substantielle (couverture réelle, pas quelques pistes isolées)", () => {
    expect(A1_AUDIO_TRACKS.length).toBeGreaterThanOrEqual(50);
  });

  it("a des ids uniques, préfixés a1- et en kebab-case", () => {
    const ids = A1_AUDIO_TRACKS.map((t) => t.id);
    expect(duplicates(ids)).toEqual([]);
    const invalid = ids.filter((id) => !id.startsWith("a1-") || !SLUG_RE.test(id));
    expect(invalid).toEqual([]);
  });

  it("a uniquement des pistes de niveau A1 (A1.1 ou A1.2)", () => {
    const invalid = A1_AUDIO_TRACKS.filter((t) => t.level !== "A1.1" && t.level !== "A1.2").map((t) => t.id);
    expect(invalid).toEqual([]);
  });

  it("n'a pas deux pistes différentes qui pointent vers le même fichier synthétique", () => {
    const srcs = A1_AUDIO_TRACKS.map((t) => a1SyntheticSrc(t));
    expect(duplicates(srcs)).toEqual([]);
  });

  it("a un nom de fichier .m4a cohérent avec son thème (pas de chemin, pas de dossier)", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      if (!t.filename.endsWith(".m4a")) issues.push(`${t.id}: filename "${t.filename}" ne finit pas par .m4a`);
      if (t.filename.includes("/")) issues.push(`${t.id}: filename "${t.filename}" contient un séparateur de dossier`);
    }
    expect(issues).toEqual([]);
  });

  it("a un chemin humain conventionnel valide et distinct du chemin synthétique", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      const synthetic = a1SyntheticSrc(t);
      const human = toA1HumanAudioPath(synthetic);
      if (human === synthetic) issues.push(`${t.id}: humanSrc identique à syntheticSrc`);
      if (!human.includes("/human/") || !human.endsWith(`/human/${t.filename}`)) {
        issues.push(`${t.id}: humanSrc "${human}" ne suit pas la convention <theme>/human/<même nom de fichier>`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("a au moins un locuteur documenté par piste, sans voix dupliquée au sein d'un même dialogue", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      if (t.speakers.length === 0) issues.push(`${t.id}: aucun locuteur documenté`);
      const voices = t.speakers.map((s) => s.voice);
      if (t.speakers.length > 1 && duplicates(voices).length > 0) {
        issues.push(`${t.id}: deux locuteurs partagent la même voix (${duplicates(voices).join(", ")}) — ambiguïté du tour de parole`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("a des tours de parole dont chaque locuteur est déclaré dans `speakers` (sauf piste à un seul locuteur)", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      const roles = new Set(t.speakers.map((s) => s.role));
      for (const turn of t.turns) {
        if (t.speakers.length > 1 && !roles.has(turn.speaker)) {
          issues.push(`${t.id}: le tour de "${turn.speaker}" ne correspond à aucun speaker déclaré`);
        }
        if (!turn.text.trim()) issues.push(`${t.id}: un tour de "${turn.speaker}" a un texte vide`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("a un transcript non vide et cohérent avec les tours de parole", () => {
    for (const t of A1_AUDIO_TRACKS) {
      const transcript = formatA1Transcript(t);
      expect(transcript.trim(), `${t.id}: transcript vide`).not.toBe("");
    }
  });

  it("a au moins une question de compréhension par piste, toutes valides", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      if (t.questions.length === 0) issues.push(`${t.id}: aucune question de compréhension`);
      for (const q of t.questions) {
        const label = `${t.id}/${q.id}`;
        if (!q.prompt.trim()) issues.push(`${label}: prompt vide`);
        if (!q.correction.explanation.trim()) issues.push(`${label}: explication de correction vide`);
        if (q.kind === "qcm") {
          const choiceIds = q.choices.map((c) => c.id);
          if (q.choices.length < 2) issues.push(`${label}: moins de 2 choix`);
          if (duplicates(choiceIds).length) issues.push(`${label}: choix avec ids dupliqués`);
          if (!choiceIds.includes(q.correctChoiceId)) issues.push(`${label}: correctChoiceId hors limites`);
        }
        if (q.kind === "vrai_faux" && typeof q.correctAnswer !== "boolean") {
          issues.push(`${label}: correctAnswer non booléen`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("a des questions avec des ids uniques au sein d'une même piste", () => {
    const issues: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      const dup = duplicates(t.questions.map((q) => q.id));
      if (dup.length) issues.push(`${t.id}: questions avec ids dupliqués (${dup.join(", ")})`);
    }
    expect(issues).toEqual([]);
  });

  it("n'a pas de placeholder / TODO visible dans le contenu", () => {
    const patterns = [/lorem ipsum/i, /\btodo\b/i, /\bfixme\b/i, /placeholder/i, /\btbd\b/i, /à compléter/i];
    const hits: string[] = [];
    const walk = (value: unknown, ctx: string) => {
      if (typeof value === "string") {
        for (const re of patterns) if (re.test(value)) hits.push(`${ctx}: /${re.source}/`);
      } else if (Array.isArray(value)) {
        value.forEach((v, i) => walk(v, `${ctx}[${i}]`));
      } else if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${ctx}.${k}`);
      }
    };
    for (const t of A1_AUDIO_TRACKS) walk(t, t.id);
    expect(hits).toEqual([]);
  });

  it("couvre tous les thèmes annoncés dans docs/integration/a1-audio.md avec au moins 2 pistes chacun", () => {
    const byTheme = new Map<string, number>();
    for (const t of A1_AUDIO_TRACKS) byTheme.set(t.theme, (byTheme.get(t.theme) ?? 0) + 1);
    const thin = [...byTheme.entries()].filter(([, count]) => count < 2);
    expect(thin).toEqual([]);
  });
});

/**
 * Vérifications disque — ne s'exécutent utilement qu'après génération des
 * fichiers audio (`node scripts/a1-audio/generate.mjs`). Avant génération,
 * ces tests échouent volontairement (comme leur équivalent B1) : un fichier
 * manquant ou vide en `public/` doit toujours bloquer `npm test`.
 */
describe("Fichiers audio A1 sur disque", () => {
  it("a un fichier synthétique réellement présent pour chaque piste", () => {
    const missing = A1_AUDIO_TRACKS.filter((t) => !existsUnderPublic(a1SyntheticSrc(t))).map((t) => t.id);
    expect(missing).toEqual([]);
  });

  it("n'a aucun fichier audio A1 de taille nulle", () => {
    const empty: string[] = [];
    for (const t of A1_AUDIO_TRACKS) {
      const src = a1SyntheticSrc(t);
      const size = fileSizeUnderPublic(src);
      if (size === 0) empty.push(t.id);
    }
    expect(empty).toEqual([]);
  });

  it("n'a aucun fichier orphelin sous public/audio/a1/**/*.m4a (hors human/) sans piste correspondante dans le manifest", () => {
    const known = new Set(A1_AUDIO_TRACKS.map((t) => path.join(publicDir(), a1SyntheticSrc(t))));
    const root = path.join(publicDir(), "audio", "a1");
    const orphans: string[] = [];
    let themeDirs: string[] = [];
    try {
      themeDirs = readdirSync(root, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
    } catch {
      return; // dossier pas encore créé — rien à vérifier
    }
    for (const theme of themeDirs) {
      const themeDir = path.join(root, theme);
      let entries: string[] = [];
      try {
        entries = readdirSync(themeDir);
      } catch {
        continue;
      }
      for (const entry of entries) {
        const abs = path.join(themeDir, entry);
        if (!statSync(abs).isFile()) continue;
        if (!entry.endsWith(".m4a")) continue;
        if (!known.has(abs)) orphans.push(abs);
      }
    }
    expect(orphans).toEqual([]);
  });
});

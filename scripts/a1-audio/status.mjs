#!/usr/bin/env node
// Rapport de couverture de la bibliothèque audio A1 — même esprit que
// `scripts/audio-status.mjs` (B1), en autonome. Ne modifie jamais aucun
// fichier.
//
// Usage : node scripts/a1-audio/status.mjs
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "..", "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { A1_AUDIO_TRACKS } = await import("@/lib/pedagogy/audio/a1/manifest.ts");
const { a1SyntheticSrc, toA1HumanAudioPath } = await import("@/lib/pedagogy/audio/a1/paths.ts");
const { existsUnderPublic, fileSizeUnderPublic, publicDir } = await import("@/lib/pedagogy/audio/a1/status.ts");

function tryAfinfo(absPath) {
  try {
    const out = execFileSync("afinfo", [absPath], { encoding: "utf8" });
    const match = out.match(/estimated duration:\s*([\d.]+)\s*sec/);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

const rows = A1_AUDIO_TRACKS.map((track) => {
  const synthetic = a1SyntheticSrc(track);
  const human = toA1HumanAudioPath(synthetic);
  const availability = existsUnderPublic(human) ? "human" : existsUnderPublic(synthetic) ? "synthetic" : "missing";
  const activeSrc = availability === "human" ? human : synthetic;
  const size = availability === "missing" ? null : fileSizeUnderPublic(activeSrc);
  const duration = availability === "missing" ? null : tryAfinfo(path.join(publicDir(), activeSrc));
  return { id: track.id, theme: track.theme, availability, activeSrc, size, duration, premium: track.premium };
});

const humanCount = rows.filter((r) => r.availability === "human").length;
const syntheticCount = rows.filter((r) => r.availability === "synthetic").length;
const missingCount = rows.filter((r) => r.availability === "missing").length;
const totalSeconds = rows.reduce((s, r) => s + (r.duration ?? 0), 0);
const totalKo = rows.reduce((s, r) => s + (r.size ?? 0), 0) / 1024;
const premiumCount = rows.filter((r) => r.premium).length;

console.log(`Bibliothèque audio A1 — ${A1_AUDIO_TRACKS.length} pistes\n`);
console.log(`  humaines     : ${humanCount}`);
console.log(`  synthétiques : ${syntheticCount}`);
console.log(`  manquantes   : ${missingCount} ${missingCount > 0 ? "(P0 — npm test doit être rouge)" : ""}`);
console.log(`  premium (marqueur informatif) : ${premiumCount}`);
console.log(`  durée totale mesurée : ${(totalSeconds / 60).toFixed(1)} min (${totalSeconds.toFixed(0)} s)`);
console.log(`  poids total          : ${(totalKo / 1024).toFixed(2)} Mo\n`);

const byTheme = new Map();
for (const r of rows) {
  if (!byTheme.has(r.theme)) byTheme.set(r.theme, []);
  byTheme.get(r.theme).push(r);
}

const ICON = { human: "🎙️ ", synthetic: "🤖", missing: "❌" };
for (const [theme, themeRows] of [...byTheme.entries()].sort()) {
  const themeSeconds = themeRows.reduce((s, r) => s + (r.duration ?? 0), 0);
  console.log(`── ${theme} (${themeRows.length} pistes, ${themeSeconds.toFixed(0)}s) ──`);
  for (const r of themeRows) {
    const sizeLabel = r.size != null ? `${(r.size / 1024).toFixed(0)} Ko` : "—";
    const durationLabel = r.duration != null ? `${r.duration.toFixed(1)}s` : "—";
    console.log(`  ${ICON[r.availability]} ${r.id.padEnd(45)} ${sizeLabel.padStart(7)}  ${durationLabel.padStart(7)}`);
  }
}

// Fichiers orphelins sous public/audio/a1/**/*.m4a sans piste correspondante.
const known = new Set(A1_AUDIO_TRACKS.map((t) => path.join(publicDir(), a1SyntheticSrc(t))));
const root = path.join(publicDir(), "audio", "a1");
const orphans = [];
let themeDirs = [];
try {
  themeDirs = readdirSync(root, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
} catch {
  themeDirs = [];
}
for (const theme of themeDirs) {
  const themeDir = path.join(root, theme);
  let entries = [];
  try {
    entries = readdirSync(themeDir);
  } catch {
    continue;
  }
  for (const entry of entries) {
    const abs = path.join(themeDir, entry);
    if (statSync(abs).isFile() && entry.endsWith(".m4a") && !known.has(abs)) orphans.push(abs);
  }
}
if (orphans.length > 0) {
  console.log("\n⚠️  Fichiers .m4a présents sans piste correspondante dans le manifest :");
  for (const o of orphans) console.log(`   - ${o}`);
}

if (missingCount > 0) process.exitCode = 1;

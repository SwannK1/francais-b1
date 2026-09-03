#!/usr/bin/env node
// Rapport de couverture du pipeline audio humain — à lancer après avoir
// déposé un ou plusieurs fichiers humains dans public/audio/**/human/, pour
// vérifier qu'ils sont bien pris en compte sans avoir à lire le code ni les
// données pédagogiques. Ne modifie jamais aucun fichier.
//
// Usage : npm run audio:status
//
// Ce script ne fait qu'un état des lieux ; la validation stricte (piste
// manquante, manifest invalide, transcript absent...) vit dans
// `lib/pedagogy/data/content-integrity.test.ts` (npm test), seule source de
// vérité pour ce qui doit bloquer un build.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { AUDIO_TRACKS } = await import("@/lib/pedagogy/audio/manifest.ts");
const { getTrackAvailability, fileSizeUnderPublic, publicDir } = await import(
  "@/lib/pedagogy/audio/status.ts"
);

function tryAfinfo(absPath) {
  try {
    const out = execFileSync("afinfo", [absPath], { encoding: "utf8" });
    const match = out.match(/estimated duration:\s*([\d.]+)\s*sec/);
    return match ? `${Number(match[1]).toFixed(1)}s` : null;
  } catch {
    return null; // afinfo absent (non-macOS) ou fichier illisible — informatif seulement
  }
}

const rows = AUDIO_TRACKS.map((track) => {
  const availability = getTrackAvailability(track);
  const activeSrc = availability === "human" ? track.humanSrc : track.syntheticSrc;
  const size = availability === "missing" ? null : fileSizeUnderPublic(activeSrc);
  const contextLabel =
    track.context.kind === "module" ? track.context.moduleSlug : `${track.context.examSlug} / ${track.context.sectionId}`;
  return { id: track.id, availability, contextLabel, humanSrc: track.humanSrc, syntheticSrc: track.syntheticSrc, size };
});

const humanCount = rows.filter((r) => r.availability === "human").length;
const syntheticCount = rows.filter((r) => r.availability === "synthetic").length;
const missingCount = rows.filter((r) => r.availability === "missing").length;

console.log(`Pipeline audio humain — ${AUDIO_TRACKS.length} pistes\n`);
console.log(`  humaines   : ${humanCount}`);
console.log(`  synthétiques (fallback) : ${syntheticCount}`);
console.log(`  manquantes (P0 si > 0)  : ${missingCount}`);
console.log("");

const ICON = { human: "🎙️ ", synthetic: "🤖", missing: "❌" };
for (const row of rows) {
  const sizeLabel = row.size != null ? `${(row.size / 1024).toFixed(0)} Ko` : "—";
  console.log(`${ICON[row.availability]} ${row.availability.padEnd(10)} ${row.id.padEnd(28)} ${row.contextLabel.padEnd(45)} ${sizeLabel}`);
  if (row.availability === "human") {
    const abs = path.join(publicDir(), row.humanSrc);
    const duration = tryAfinfo(abs);
    if (duration) console.log(`   └─ afinfo: ${duration}`);
  }
}

// Fichiers présents sous un dossier human/ mais ne correspondant à aucune
// piste connue — probable faute de frappe dans le nom de fichier déposé.
const humanDirs = new Set(AUDIO_TRACKS.map((t) => path.dirname(path.join(publicDir(), t.humanSrc))));
const knownHumanFiles = new Set(AUDIO_TRACKS.map((t) => path.join(publicDir(), t.humanSrc)));
const orphans = [];
for (const dir of humanDirs) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    continue; // dossier human/ pas encore créé — normal tant qu'aucun fichier n'y a été déposé
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry);
    if (statSync(abs).isFile() && !knownHumanFiles.has(abs)) orphans.push(abs);
  }
}
if (orphans.length > 0) {
  console.log("\n⚠️  Fichiers présents sous human/ sans piste correspondante dans le manifest (nom probablement incorrect) :");
  for (const o of orphans) console.log(`   - ${o}`);
}

// Fichiers humains de taille nulle (dépôt interrompu / fichier corrompu).
const empties = rows.filter((r) => r.availability === "human" && r.size === 0);
if (empties.length > 0) {
  console.log("\n⚠️  Fichiers humains de taille 0 (probablement corrompus) :");
  for (const e of empties) console.log(`   - ${e.id}: ${e.humanSrc}`);
}

if (missingCount > 0) {
  console.log("\n❌ Au moins un fichier synthétique de secours est manquant sur disque — `npm test` doit échouer, à corriger avant toute chose.");
  process.exitCode = 1;
}

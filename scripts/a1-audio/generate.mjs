#!/usr/bin/env node
// Génère les fichiers audio synthétiques de la bibliothèque A1 à partir du
// manifest (`lib/pedagogy/audio/a1/manifest.ts`), avec les voix `say`
// locales de macOS (aucun outil externe, aucun téléchargement — voir
// `lib/pedagogy/audio/a1/voices.ts` pour l'audit des voix disponibles).
//
// Pipeline, par piste :
//   1. Un fichier AIFF par réplique (`say -v <voix> -r <débit> -o turn.aiff`).
//   2. Normalisation de chaque réplique au même format PCM
//      (`afconvert -f AIFF -d BEI16@44100 -c 1`) — nécessaire avant
//      concaténation, les voix `say` n'ayant pas toutes le même sampleRate
//      natif.
//   3. Concaténation des répliques avec un court silence entre chaque
//      (`aiff-concat.mjs`) — recrée un dialogue à plusieurs voix dans un
//      seul fichier, ce que `say` ne sait pas faire nativement.
//   4. Conversion finale en .m4a AAC mono 44,1 kHz ~120 kbps
//      (`afconvert -f m4af -d aac -b 120000`), au chemin conventionnel
//      `public/audio/a1/<theme>/<filename>` — même format que les pistes
//      synthétiques B1 (voir docs/b1/audio-human-recording-plan.md §7).
//
// Usage :
//   node scripts/a1-audio/generate.mjs            # génère les pistes manquantes
//   node scripts/a1-audio/generate.mjs --force     # régénère tout
//   node scripts/a1-audio/generate.mjs --id=<id>   # une seule piste (debug)
//
// Ne touche jamais à public/audio/b1|demo|examens — écrit uniquement sous
// public/audio/a1/.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, existsSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { concatAiff } from "./aiff-concat.mjs";

register(
  pathToFileURL(path.join(import.meta.dirname, "..", "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { A1_AUDIO_TRACKS } = await import("@/lib/pedagogy/audio/a1/manifest.ts");
const { A1_VOICES } = await import("@/lib/pedagogy/audio/a1/voices.ts");
const { a1SyntheticSrc } = await import("@/lib/pedagogy/audio/a1/paths.ts");
const { publicDir } = await import("@/lib/pedagogy/audio/a1/status.ts");

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyId = args.find((a) => a.startsWith("--id="))?.slice("--id=".length);

const tracks = onlyId ? A1_AUDIO_TRACKS.filter((t) => t.id === onlyId) : A1_AUDIO_TRACKS;
if (onlyId && tracks.length === 0) {
  console.error(`Aucune piste avec l'id "${onlyId}"`);
  process.exit(1);
}

const AAC_BITRATE = "120000";

function sayTurnToAiff(voiceProfile, rateWpm, text, outPath) {
  execFileSync("say", ["-v", voiceProfile.sayVoice, "-r", String(rateWpm), "-o", outPath, text], {
    stdio: ["ignore", "ignore", "inherit"],
  });
}

function normalizeAiff(inPath, outPath) {
  execFileSync("afconvert", ["-f", "AIFF", "-d", "BEI16@44100", "-c", "1", inPath, outPath], {
    stdio: ["ignore", "ignore", "inherit"],
  });
}

function toM4a(inPath, outPath) {
  execFileSync(
    "afconvert",
    ["-f", "m4af", "-d", "aac", "-b", AAC_BITRATE, "-q", "127", "-s", "3", inPath, outPath],
    { stdio: ["ignore", "ignore", "inherit"] }
  );
}

function getDurationSeconds(filePath) {
  try {
    const out = execFileSync("afinfo", [filePath], { encoding: "utf8" });
    const m = out.match(/estimated duration:\s*([\d.]+)\s*sec/);
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  }
}

let generated = 0;
let skipped = 0;
let failed = 0;
const report = [];

for (const track of tracks) {
  const relSrc = a1SyntheticSrc(track);
  const destPath = path.join(publicDir(), relSrc);
  if (existsSync(destPath) && !force) {
    skipped++;
    continue;
  }

  mkdirSync(path.dirname(destPath), { recursive: true });
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "a1-audio-"));
  try {
    const speakerVoice = new Map(track.speakers.map((s) => [s.role, s.voice]));
    // Piste à un seul locuteur non déclaré dans `speakers` (ex. "Narrateur"
    // dans une piste sans dialogue) : retombe sur l'unique voix de la piste.
    const fallbackVoice = track.speakers.length === 1 ? track.speakers[0].voice : null;

    const normalizedPaths = track.turns.map((turn, i) => {
      const voiceId = speakerVoice.get(turn.speaker) ?? fallbackVoice;
      if (!voiceId) {
        throw new Error(`piste ${track.id}: impossible de résoudre la voix du locuteur "${turn.speaker}"`);
      }
      const voiceProfile = A1_VOICES[voiceId];
      const rawPath = path.join(tmpDir, `turn-${i}.aiff`);
      const normPath = path.join(tmpDir, `turn-${i}-norm.aiff`);
      sayTurnToAiff(voiceProfile, track.speakingRateWpm, turn.text, rawPath);
      normalizeAiff(rawPath, normPath);
      return normPath;
    });

    const concatenatedPath = path.join(tmpDir, "concatenated.aiff");
    concatAiff(normalizedPaths, concatenatedPath, {
      silenceMsBetween: track.speakers.length > 1 ? 400 : 250,
      trailingSilenceMs: 900,
    });

    toM4a(concatenatedPath, destPath);

    const size = statSync(destPath).size;
    const duration = getDurationSeconds(destPath);
    generated++;
    report.push({ id: track.id, size, duration });
    console.log(
      `✓ ${track.id.padEnd(45)} ${relSrc.padEnd(55)} ${((size ?? 0) / 1024).toFixed(0).padStart(4)} Ko  ${duration ? duration.toFixed(1) + "s" : "?"}`
    );
  } catch (error) {
    failed++;
    console.error(`✗ ${track.id}: ${error.message}`);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log("");
console.log(`Généré : ${generated}  ·  Ignoré (déjà présent) : ${skipped}  ·  Échec : ${failed}`);
if (report.length > 0) {
  const totalSeconds = report.reduce((s, r) => s + (r.duration ?? 0), 0);
  const totalKo = report.reduce((s, r) => s + r.size, 0) / 1024;
  console.log(`Durée totale générée cette exécution : ${(totalSeconds / 60).toFixed(1)} min (${totalSeconds.toFixed(0)} s) — ${totalKo.toFixed(0)} Ko`);
}
if (failed > 0) process.exitCode = 1;

#!/usr/bin/env node
// Génère les fichiers audio A2 (voix de synthèse) à partir du manifest
// `lib/pedagogy/audio/a2/manifest.ts` — un fichier .m4a AAC mono 22050 Hz par
// piste, écrit sous `public/audio/a2/<id>.m4a`, même format que le pipeline
// audio B1 existant (`say --data-format=aac`, voir
// `docs/b1/audio-human-recording-plan.md` §0).
//
// Un document à plusieurs locuteurs est produit en générant chaque tour de
// parole séparément avec la voix macOS correspondante (`say -v ... -o
// tour.aiff`), puis en concaténant les PCM bruts avec un silence entre les
// tours (`scripts/lib/aiff.mjs`), et enfin en encodant le tout en AAC via
// `afconvert`. macOS + Xcode Command Line Tools requis (`say`, `afconvert`).
//
// Usage :
//   node scripts/a2-audio-generate.mjs             # génère les pistes manquantes
//   node scripts/a2-audio-generate.mjs --force      # régénère tout
//   node scripts/a2-audio-generate.mjs --only=<id>  # une seule piste (répétable)
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { AUDIO_TRACKS_A2_ALL } = await import("@/lib/pedagogy/audio/a2/manifest.ts");
const { voiceProfile } = await import("@/lib/pedagogy/audio/a2/voices.ts");
const { readSayAiff, buildAiff, silencePcm } = await import("./lib/aiff.mjs");

// Débit d'échantillonnage fixe des voix `say` sur cette machine (vérifié :
// 22050 Hz mono 16 bits pour toutes les voix fr_FR testées) — voir §0 du plan
// d'enregistrement B1 pour la même constante côté audio existant.
const SAMPLE_RATE = 22050;

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyIds = new Set(args.filter((a) => a.startsWith("--only=")).map((a) => a.slice("--only=".length)));

const publicDir = path.resolve(import.meta.dirname, "../public/audio/a2");
mkdirSync(publicDir, { recursive: true });

function generateTurnAiff(tmpDir, index, voiceId, text, rateWpm) {
  const profile = voiceProfile(voiceId);
  const outPath = path.join(tmpDir, `turn-${index}.aiff`);
  execFileSync("say", ["-v", profile.sayVoice, "-r", String(rateWpm), "-o", outPath, text], { stdio: "inherit" });
  return readSayAiff(readFileSync(outPath));
}

function buildTrackAudio(track, tmpDir) {
  const { definition } = track;
  const parsedTurns = definition.turns.map((turn, i) =>
    generateTurnAiff(tmpDir, i, turn.voiceId, turn.text, definition.rateWpm)
  );

  const reference = parsedTurns[0];
  for (const parsed of parsedTurns) {
    if (parsed.numChannels !== reference.numChannels || parsed.sampleSize !== reference.sampleSize) {
      throw new Error(`${track.id}: format audio incohérent entre tours de parole (voix système différentes ?)`);
    }
  }

  const silence =
    definition.gapSeconds > 0
      ? silencePcm({
          numChannels: reference.numChannels,
          sampleSize: reference.sampleSize,
          sampleRate: SAMPLE_RATE,
          seconds: definition.gapSeconds,
        })
      : Buffer.alloc(0);

  const pcmParts = [];
  parsedTurns.forEach((parsed, i) => {
    pcmParts.push(parsed.pcmData);
    if (i < parsedTurns.length - 1) pcmParts.push(silence);
  });

  const aiff = buildAiff({
    numChannels: reference.numChannels,
    sampleSize: reference.sampleSize,
    sampleRateExtended: reference.sampleRateExtended,
    pcmData: Buffer.concat(pcmParts),
  });

  const combinedPath = path.join(tmpDir, "combined.aiff");
  writeFileSync(combinedPath, aiff);

  const outPath = path.join(publicDir, `${track.id}.m4a`);
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-o", outPath, combinedPath], { stdio: "inherit" });
  return outPath;
}

let generated = 0;
let skipped = 0;
let failed = 0;

for (const track of AUDIO_TRACKS_A2_ALL) {
  if (onlyIds.size > 0 && !onlyIds.has(track.id)) continue;
  const outPath = path.join(publicDir, `${track.id}.m4a`);
  if (!force && existsSync(outPath)) {
    skipped++;
    continue;
  }

  const tmpDir = mkdtempSync(path.join(tmpdir(), "a2-audio-"));
  try {
    console.log(`\n▶ ${track.id} (${track.definition.turns.length} tour(s), ${track.definition.rateWpm} mots/min)`);
    buildTrackAudio(track, tmpDir);
    generated++;
  } catch (err) {
    console.error(`✗ ${track.id}: ${err.message}`);
    failed++;
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log(`\nTerminé — générées: ${generated}, ignorées (déjà présentes): ${skipped}, échouées: ${failed}`);
if (failed > 0) process.exitCode = 1;

#!/usr/bin/env node
// Génère (ou régénère) une piste audio B1 synthétique à partir d'un script
// humanisé multi-locuteurs, via le fournisseur TTS interchangeable
// (`lib/pedagogy/audio/tts/registry.ts`) plutôt qu'un appel `say` en dur —
// contrairement à `scripts/a1-audio/generate.mjs` et
// `scripts/a2-audio-generate.mjs`, écrits avant cette abstraction.
//
// B1 n'a pas de manifest de contenu dédié (voir
// `docs/audio/humanisation-a1-a2-b1.md` §2) : les 18 pistes existantes
// vivent en dur dans `lib/pedagogy/data/modules.ts`/`exams.ts`. Ce script
// ne les duplique pas — il ne connaît que les pistes explicitement
// réécrites par ce chantier (`B1_HUMANIZED_TRACKS`, données pures dans
// `lib/pedagogy/audio/b1/humanized-tracks.ts` — séparées de ce script pour
// être importables par un test sans déclencher de génération audio), à
// étendre piste par piste au fur et à mesure d'une humanisation, jamais en
// régénérant toute la bibliothèque d'un coup.
//
// Pipeline, par piste : fournisseur TTS -> AIFF par tour de parole ->
// normalisation au format commun (BEI16@44100 mono, afconvert) ->
// concaténation (silence entre tours, `aiff-concat.mjs`) -> AAC .m4a final
// (afconvert) — identique au pipeline A1 éprouvé, seule l'étape de synthèse
// change de fournisseur.
//
// Usage :
//   node scripts/b1-audio-generate.mjs --only=<id>   # une seule piste
//   node scripts/b1-audio-generate.mjs --only=<id> --force
//
// Ne touche jamais à public/audio/a1|a2|demo|examens — écrit uniquement
// sous public/audio/b1/.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { mkdtempSync, existsSync, rmSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { resolveTtsProvider } = await import("@/lib/pedagogy/audio/tts/registry.ts");
const { B1_VOICE_PROFILES } = await import("@/lib/pedagogy/audio/b1/voices.ts");
const { B1_HUMANIZED_TRACKS } = await import("@/lib/pedagogy/audio/b1/humanized-tracks.ts");
const { publicDir } = await import("@/lib/pedagogy/audio/status.ts");
const { concatAiff } = await import("./a1-audio/aiff-concat.mjs");

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyId = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);

const tracks = onlyId ? B1_HUMANIZED_TRACKS.filter((t) => t.id === onlyId) : B1_HUMANIZED_TRACKS;
if (onlyId && tracks.length === 0) {
  console.error(`Aucune piste B1 humanisée avec l'id "${onlyId}" (connues : ${B1_HUMANIZED_TRACKS.map((t) => t.id).join(", ")})`);
  process.exit(1);
}

const provider = resolveTtsProvider();
provider.ensureAvailable();
console.log(`Fournisseur TTS : ${provider.id}`);

function normalizeAiff(inPath, outPath) {
  execFileSync("afconvert", ["-f", "AIFF", "-d", "BEI16@44100", "-c", "1", inPath, outPath], { stdio: ["ignore", "ignore", "inherit"] });
}

function toM4a(inPath, outPath) {
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "120000", "-q", "127", "-s", "3", inPath, outPath], {
    stdio: ["ignore", "ignore", "inherit"],
  });
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

for (const track of tracks) {
  const destPath = path.join(publicDir(), "audio", "b1", track.filename);
  if (existsSync(destPath) && !force) {
    skipped++;
    continue;
  }

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "b1-audio-"));
  try {
    const normalizedPaths = [];
    for (let i = 0; i < track.turns.length; i++) {
      const turn = track.turns[i];
      const profile = B1_VOICE_PROFILES[turn.voiceId];
      if (!profile) throw new Error(`piste ${track.id}: profil vocal inconnu "${turn.voiceId}"`);
      const rawPath = path.join(tmpDir, `turn-${i}.aiff`);
      const normPath = path.join(tmpDir, `turn-${i}-norm.aiff`);
      await provider.synthesizeTurnToAiff({ text: turn.text, voiceRef: profile.sayVoice, rateWpm: track.rateWpm }, rawPath);
      normalizeAiff(rawPath, normPath);
      normalizedPaths.push(normPath);
    }

    const concatenatedPath = path.join(tmpDir, "concatenated.aiff");
    concatAiff(normalizedPaths, concatenatedPath, {
      silenceMsBetween: track.turns.length > 1 ? 450 : 0,
      trailingSilenceMs: 900,
    });

    toM4a(concatenatedPath, destPath);

    const size = statSync(destPath).size;
    const duration = getDurationSeconds(destPath);
    generated++;
    console.log(`✓ ${track.id.padEnd(20)} public/audio/b1/${track.filename.padEnd(45)} ${(size / 1024).toFixed(0).padStart(4)} Ko  ${duration ? duration.toFixed(1) + "s" : "?"}`);
  } catch (error) {
    failed++;
    console.error(`✗ ${track.id}: ${error.message}`);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

console.log(`\nGénéré : ${generated}  ·  Ignoré (déjà présent) : ${skipped}  ·  Échec : ${failed}`);
if (failed > 0) process.exitCode = 1;

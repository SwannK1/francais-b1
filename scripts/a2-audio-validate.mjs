#!/usr/bin/env node
// Rapport de couverture + validation du chantier audio A2 — pendant de
// `scripts/audio-status.mjs` (B1) pour la bibliothèque A2 indépendante.
// Ne modifie jamais aucun fichier.
//
// Usage : npm run audio:a2:status
//
// La validation qui doit bloquer un build vit dans les tests vitest
// (`lib/pedagogy/audio/a2/__tests__/*.test.ts`, exécutés par `npm test`) —
// ce script est un état des lieux lisible par un humain, pas une porte CI.
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import path from "node:path";

register(
  pathToFileURL(path.join(import.meta.dirname, "ts-alias-loader.mjs")),
  pathToFileURL(import.meta.url)
);

const { AUDIO_TRACKS_A2, AUDIO_TRACKS_A2_FINAL_EVAL, AUDIO_TRACKS_A2_ALL, speakerVoiceTable } = await import(
  "@/lib/pedagogy/audio/a2/manifest.ts"
);
const { existsUnderPublic, fileSizeUnderPublic, publicDir } = await import("@/lib/pedagogy/audio/status.ts");
const { structuralIssues, estimatedDurationSeconds, duplicateVoiceIssues } = await import(
  "@/lib/pedagogy/audio/a2/validation.ts"
);

function tryAfinfo(absPath) {
  try {
    const out = execFileSync("afinfo", [absPath], { encoding: "utf8" });
    const match = out.match(/estimated duration:\s*([\d.]+)\s*sec/);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

console.log(`Bibliothèque audio A2 — ${AUDIO_TRACKS_A2.length} pistes de pratique + ${AUDIO_TRACKS_A2_FINAL_EVAL.length} documents d'évaluation finale\n`);

let totalActualSeconds = 0;
let totalEstimatedSeconds = 0;
let missingCount = 0;
let issueCount = 0;

for (const track of AUDIO_TRACKS_A2_ALL) {
  const exists = existsUnderPublic(track.exercise.audioSrc);
  const size = exists ? fileSizeUnderPublic(track.exercise.audioSrc) : null;
  const estimated = estimatedDurationSeconds(track.definition);
  totalEstimatedSeconds += estimated;

  let actualLabel = "—";
  if (exists) {
    const abs = path.join(publicDir(), track.exercise.audioSrc);
    const actual = tryAfinfo(abs);
    if (actual != null) {
      totalActualSeconds += actual;
      actualLabel = `${actual.toFixed(1)}s`;
    }
  } else {
    missingCount++;
  }

  const icon = exists ? "🎧" : "❌";
  const sizeLabel = size != null ? `${(size / 1024).toFixed(0)} Ko` : "—";
  const voices = speakerVoiceTable(track.definition)
    .map((v) => `${v.speakerRole}=${v.voiceLabel}`)
    .join(", ");
  console.log(
    `${icon} ${track.id.padEnd(38)} ${track.definition.stage.padEnd(10)} ${sizeLabel.padStart(8)}  réel:${actualLabel.padStart(7)}  est.:${estimated.toFixed(1)}s  [${voices}]`
  );

  const issues = [...structuralIssues(track.definition), ...duplicateVoiceIssues(track.definition)];
  for (const issue of issues) {
    console.log(`   ⚠️  ${issue}`);
    issueCount++;
  }
}

console.log(`\nDurée totale (fichiers présents, mesure réelle) : ${(totalActualSeconds / 60).toFixed(1)} min`);
console.log(`Durée totale estimée (script × débit)           : ${(totalEstimatedSeconds / 60).toFixed(1)} min`);
console.log(`Fichiers manquants                               : ${missingCount}`);
console.log(`Problèmes structurels détectés                   : ${issueCount}`);

if (missingCount > 0) {
  console.log("\n❌ Au moins un fichier audio est manquant — lancer `npm run audio:a2:generate` avant `npm test`.");
  process.exitCode = 1;
} else if (issueCount > 0) {
  process.exitCode = 1;
} else {
  console.log("\n✅ Bibliothèque audio A2 complète et cohérente.");
}

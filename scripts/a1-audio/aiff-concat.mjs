// Concaténateur AIFF minimal, écrit pour cette bibliothèque audio A1 car
// aucun outil de montage (ffmpeg, sox) n'est disponible localement — seuls
// `say`, `afconvert` et `afinfo` (macOS) le sont. `say` ne synthétise qu'une
// seule voix par appel : un dialogue à plusieurs locuteurs est donc généré
// comme plusieurs fichiers AIFF (un par réplique), normalisés au même format
// PCM (voir generate.mjs), puis recollés ici bout à bout avec un court
// silence entre chaque réplique.
//
// Format AIFF : chunks "FORM"/"COMM"/"SSND" (spec Apple/EA, 1988). On lit
// les chunks génériquement (pour tolérer un éventuel chunk "FLLR" de
// padding ajouté par afconvert) et on ne garde que les échantillons bruts de
// "SSND" — jamais son propre en-tête de sous-chunk (offset/blockSize, 8
// octets, toujours à 0 pour un fichier `say`/`afconvert` non streamé).
import { readFileSync, writeFileSync } from "node:fs";

/** @returns {{ numChannels: number, sampleRate10: Buffer, sampleSizeBits: number, pcm: Buffer }} */
function parseAiff(filePath) {
  const buf = readFileSync(filePath);
  if (buf.toString("ascii", 0, 4) !== "FORM" || buf.toString("ascii", 8, 12) !== "AIFF") {
    throw new Error(`${filePath}: pas un fichier AIFF valide (en-tête FORM/AIFF absent)`);
  }
  let offset = 12;
  let comm = null;
  let pcm = null;
  while (offset + 8 <= buf.length) {
    const chunkId = buf.toString("ascii", offset, offset + 4);
    const chunkSize = buf.readUInt32BE(offset + 4);
    const dataStart = offset + 8;
    if (chunkId === "COMM") {
      comm = {
        numChannels: buf.readUInt16BE(dataStart),
        sampleSizeBits: buf.readUInt16BE(dataStart + 6),
        sampleRate10: buf.subarray(dataStart + 8, dataStart + 18),
      };
    } else if (chunkId === "SSND") {
      // 8 octets de sous-en-tête (offset + blockSize), toujours 0 ici.
      pcm = buf.subarray(dataStart + 8, dataStart + chunkSize);
    }
    offset = dataStart + chunkSize + (chunkSize % 2); // chunks alignés sur un nombre pair d'octets
  }
  if (!comm || !pcm) throw new Error(`${filePath}: chunk COMM ou SSND introuvable`);
  return { ...comm, pcm };
}

/**
 * Concatène plusieurs fichiers AIFF déjà normalisés au même format
 * (mêmes numChannels/sampleSizeBits/sampleRate — garanti par generate.mjs
 * qui les produit tous via le même appel `afconvert -d BEI16@44100 -c 1`),
 * avec `silenceMsBetween` de silence entre chaque piste et
 * `trailingSilenceMs` après la dernière.
 */
export function concatAiff(inputPaths, outputPath, { silenceMsBetween = 400, trailingSilenceMs = 900 } = {}) {
  if (inputPaths.length === 0) throw new Error("concatAiff: aucun fichier en entrée");
  const parsed = inputPaths.map(parseAiff);
  const { numChannels, sampleSizeBits, sampleRate10 } = parsed[0];
  for (const p of parsed) {
    if (p.numChannels !== numChannels || p.sampleSizeBits !== sampleSizeBits || !p.sampleRate10.equals(sampleRate10)) {
      throw new Error("concatAiff: les fichiers en entrée n'ont pas tous le même format PCM — normaliser avant concaténation");
    }
  }
  const bytesPerFrame = numChannels * (sampleSizeBits / 8);
  // Le sampleRate exact est encodé en 80-bit IEEE extended (sampleRate10) —
  // pas besoin de le décoder ici : `bytesPerFrame` suffit pour dimensionner
  // un silence exprimé en millisecondes, en réutilisant le sampleRate lu par
  // `afinfo` au moment de la normalisation (passé en paramètre) plutôt que
  // de reparser ce format binaire.
  const sampleRateHz = 44100; // imposé par generate.mjs à la normalisation

  function silenceBuffer(ms) {
    const frames = Math.round((sampleRateHz * ms) / 1000);
    return Buffer.alloc(frames * bytesPerFrame); // zéro = silence en PCM signé
  }

  const parts = [];
  parsed.forEach((p, i) => {
    parts.push(p.pcm);
    if (i < parsed.length - 1) parts.push(silenceBuffer(silenceMsBetween));
  });
  parts.push(silenceBuffer(trailingSilenceMs));

  const pcmTotal = Buffer.concat(parts);
  const numSampleFrames = Math.floor(pcmTotal.length / bytesPerFrame);

  const comm = Buffer.alloc(8 + 18);
  comm.write("COMM", 0, "ascii");
  comm.writeUInt32BE(18, 4);
  comm.writeUInt16BE(numChannels, 8);
  comm.writeUInt32BE(numSampleFrames, 10);
  comm.writeUInt16BE(sampleSizeBits, 14);
  sampleRate10.copy(comm, 16);

  const ssndHeader = Buffer.alloc(8 + 8);
  ssndHeader.write("SSND", 0, "ascii");
  ssndHeader.writeUInt32BE(8 + pcmTotal.length, 4);
  // offset(4)=0, blockSize(4)=0 déjà à zéro via Buffer.alloc

  const formSize = 4 + comm.length + ssndHeader.length + pcmTotal.length;
  const formHeader = Buffer.alloc(12);
  formHeader.write("FORM", 0, "ascii");
  formHeader.writeUInt32BE(formSize, 4);
  formHeader.write("AIFF", 8, "ascii");

  writeFileSync(outputPath, Buffer.concat([formHeader, comm, ssndHeader, pcmTotal]));
}

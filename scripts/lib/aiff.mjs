// Parseur/écrivain AIFF minimal — extrait de la logique déjà éprouvée dans
// `scripts/a1-audio/aiff-concat.mjs` (chunks FORM/COMM/SSND, spec
// Apple/EA 1988), mais factorisé ici pour être partagé par tout script de
// génération audio par niveau. `scripts/a2-audio-generate.mjs` importe ce
// fichier depuis sa création mais le fichier n'existait pas dans le dépôt
// (bug latent découvert par le chantier `audio-humanisation` — la commande
// `npm run audio:a2:generate` était cassée, jamais exercée par `npm test`
// car c'est un script de génération manuelle, pas un test).
//
// Différence avec `aiff-concat.mjs` : celui-ci lit des fichiers déjà
// normalisés par `afconvert` (format BEI16@44100 imposé) ; les fonctions
// ci-dessous acceptent n'importe quel `numChannels`/`sampleSize` lu dans le
// COMM chunk réel, pour rester utilisables même si un futur fournisseur TTS
// produit un format différent de celui de `say`.
const CHUNK_HEADER_SIZE = 8;

/**
 * Parse un buffer AIFF brut (tel que produit directement par `say -o
 * fichier.aiff`) et retourne son format PCM + les données brutes.
 *
 * `say -o *.aiff` produit en réalité un conteneur **AIFF-C** ("FORM"/"AIFC",
 * pas "FORM"/"AIFF" — confirmé empiriquement sur cette machine, voir le
 * commentaire de `say -o` dans `man say`) : layout de chunk COMM/SSND
 * identique pour les champs lus ici (numChannels/sampleSize/
 * sampleRateExtended/pcm), seul le FORM type diffère et un COMM AIFF-C a
 * des octets de compression en plus après le champ lu — jamais lus ici,
 * donc sans incidence.
 */
export function readSayAiff(buffer) {
  const formType = buffer.toString("ascii", 8, 12);
  if (buffer.toString("ascii", 0, 4) !== "FORM" || (formType !== "AIFF" && formType !== "AIFC")) {
    throw new Error(`readSayAiff: pas un fichier AIFF/AIFF-C valide (en-tête FORM/AIFF ou FORM/AIFC absent, trouvé "${formType}")`);
  }
  let offset = 12;
  let numChannels = null;
  let sampleSize = null;
  let sampleRateExtended = null;
  let pcmData = null;
  while (offset + CHUNK_HEADER_SIZE <= buffer.length) {
    const chunkId = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32BE(offset + 4);
    const dataStart = offset + CHUNK_HEADER_SIZE;
    if (chunkId === "COMM") {
      numChannels = buffer.readUInt16BE(dataStart);
      sampleSize = buffer.readUInt16BE(dataStart + 6);
      sampleRateExtended = buffer.subarray(dataStart + 8, dataStart + 18);
    } else if (chunkId === "SSND") {
      // 8 octets de sous-en-tête (offset + blockSize), toujours 0 pour un
      // fichier `say` non streamé.
      pcmData = buffer.subarray(dataStart + 8, dataStart + chunkSize);
    }
    offset = dataStart + chunkSize + (chunkSize % 2); // chunks alignés sur un nombre pair d'octets
  }
  if (numChannels == null || sampleSize == null || !sampleRateExtended || !pcmData) {
    throw new Error("readSayAiff: chunk COMM ou SSND introuvable");
  }
  return { numChannels, sampleSize, sampleRateExtended, pcmData };
}

/** Construit un buffer AIFF complet à partir de PCM + format (inverse de `readSayAiff`). */
export function buildAiff({ numChannels, sampleSize, sampleRateExtended, pcmData }) {
  const bytesPerFrame = numChannels * (sampleSize / 8);
  const numSampleFrames = Math.floor(pcmData.length / bytesPerFrame);

  const comm = Buffer.alloc(8 + 18);
  comm.write("COMM", 0, "ascii");
  comm.writeUInt32BE(18, 4);
  comm.writeUInt16BE(numChannels, 8);
  comm.writeUInt32BE(numSampleFrames, 10);
  comm.writeUInt16BE(sampleSize, 14);
  sampleRateExtended.copy(comm, 16);

  const ssndHeader = Buffer.alloc(8 + 8);
  ssndHeader.write("SSND", 0, "ascii");
  ssndHeader.writeUInt32BE(8 + pcmData.length, 4);
  // offset(4)=0, blockSize(4)=0 déjà à zéro via Buffer.alloc

  const formSize = 4 + comm.length + ssndHeader.length + pcmData.length;
  const formHeader = Buffer.alloc(12);
  formHeader.write("FORM", 0, "ascii");
  formHeader.writeUInt32BE(formSize, 4);
  formHeader.write("AIFF", 8, "ascii");

  return Buffer.concat([formHeader, comm, ssndHeader, pcmData]);
}

/** Génère `seconds` secondes de PCM silencieux (échantillons à zéro) pour le format donné. */
export function silencePcm({ numChannels, sampleSize, sampleRate, seconds }) {
  const bytesPerFrame = numChannels * (sampleSize / 8);
  const frames = Math.round(sampleRate * seconds);
  return Buffer.alloc(frames * bytesPerFrame);
}

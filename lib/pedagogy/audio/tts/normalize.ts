import { buildAiff } from "@/scripts/lib/aiff.mjs";

/**
 * Normalisation de niveau sonore (peak) + utilitaires AIFF partagés par les
 * fournisseurs TTS — introduits par le chantier `audio-humanisation` pour
 * couvrir l'item "normalisation audio" du pipeline (script → voix →
 * génération → **normalisation** → manifest → intégration → tests → QA).
 *
 * Jusqu'ici, seule une normalisation de *format* existait (échantillonnage/
 * bits, voir `normalizeAiff` dans `scripts/a1-audio/generate.mjs`) : aucune
 * piste n'a de niveau sonore homogène entre voix `say` différentes. Ce
 * module ajoute une normalisation de **niveau** (crête cible en dBFS),
 * appliquée au PCM brut avant encodage AAC — cohérente avec la cible
 * documentée en §7 de `docs/b1/audio-human-recording-plan.md` (crête à
 * -3 dBFS).
 *
 * Le format PCM manipulé ici est toujours big-endian 16 bits (BEI16), comme
 * partout ailleurs dans ce pipeline (voir `scripts/lib/aiff.mjs`,
 * `scripts/a1-audio/aiff-concat.mjs`).
 */

const PCM16_MAX = 32767;
const PCM16_MIN = -32768;

/**
 * Encode une fréquence d'échantillonnage entière en flottant étendu IEEE
 * 80 bits (format attendu par le chunk COMM d'un AIFF) — calcul exact via
 * BigInt, sans perte de précision (contrairement à un calcul en `number`,
 * dont la mantisse 53 bits est insuffisante pour un entier positionné sur
 * les 64 bits de mantisse du format étendu).
 */
export function encodeSampleRateExtended(sampleRateHz: number): Buffer {
  if (!Number.isInteger(sampleRateHz) || sampleRateHz <= 0) {
    throw new Error(`encodeSampleRateExtended: fréquence d'échantillonnage invalide (${sampleRateHz})`);
  }
  const n = BigInt(sampleRateHz);
  const bitLength = n.toString(2).length;
  const exponent = bitLength - 1; // position du bit de poids fort
  const mantissa = n << BigInt(63 - exponent); // exact pour tout entier tenant sur < 64 bits
  const biasedExponent = exponent + 16383;

  const buf = Buffer.alloc(10);
  buf.writeUInt16BE(biasedExponent, 0); // bit de signe à 0 (fréquence toujours positive)
  buf.writeBigUInt64BE(mantissa, 2);
  return buf;
}

/** Encapsule du PCM 16 bits mono/stéréo brut dans un AIFF complet. */
export function buildAiffFromPcm16(
  pcmData: Buffer,
  { numChannels, sampleRate }: { numChannels: number; sampleRate: number }
): Buffer {
  return buildAiff({
    numChannels,
    sampleSize: 16,
    sampleRateExtended: encodeSampleRateExtended(sampleRate),
    pcmData,
  });
}

/**
 * Normalise la crête d'un buffer PCM 16 bits big-endian à `targetPeakDb`
 * (défaut -3 dBFS, cible documentée du pipeline B1). Silence total renvoyé
 * inchangé (rien à normaliser, division par zéro évitée). Ne dépasse jamais
 * l'amplitude 16 bits (clampé), donc jamais d'écrêtage introduit par la
 * normalisation elle-même.
 */
export function peakNormalizePcm16(pcmData: Buffer, targetPeakDb = -3): Buffer {
  if (pcmData.length % 2 !== 0) {
    throw new Error("peakNormalizePcm16: taille de buffer impaire, attendu du PCM 16 bits");
  }
  const sampleCount = pcmData.length / 2;
  let peak = 0;
  for (let i = 0; i < sampleCount; i++) {
    const sample = Math.abs(pcmData.readInt16BE(i * 2));
    if (sample > peak) peak = sample;
  }
  if (peak === 0) return Buffer.from(pcmData);

  const targetPeakLinear = PCM16_MAX * Math.pow(10, targetPeakDb / 20);
  const gain = targetPeakLinear / peak;

  const out = Buffer.alloc(pcmData.length);
  for (let i = 0; i < sampleCount; i++) {
    const scaled = Math.round(pcmData.readInt16BE(i * 2) * gain);
    out.writeInt16BE(Math.max(PCM16_MIN, Math.min(PCM16_MAX, scaled)), i * 2);
  }
  return out;
}

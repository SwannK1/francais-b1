import { describe, expect, it } from "vitest";
import { buildAiffFromPcm16, encodeSampleRateExtended, peakNormalizePcm16 } from "@/lib/pedagogy/audio/tts/normalize";
import { readSayAiff } from "@/scripts/lib/aiff.mjs";

function pcm16From(samples: number[]): Buffer {
  const buf = Buffer.alloc(samples.length * 2);
  samples.forEach((s, i) => buf.writeInt16BE(s, i * 2));
  return buf;
}

function samplesOf(buf: Buffer): number[] {
  const out: number[] = [];
  for (let i = 0; i < buf.length; i += 2) out.push(buf.readInt16BE(i));
  return out;
}

describe("peakNormalizePcm16", () => {
  it("amène la crête à la cible en dBFS sans écrêter", () => {
    const pcm = pcm16From([1000, -1000, 500, 0]);
    const normalized = peakNormalizePcm16(pcm, -3);
    const peak = Math.max(...samplesOf(normalized).map(Math.abs));
    const targetLinear = 32767 * Math.pow(10, -3 / 20);
    expect(peak).toBeGreaterThan(targetLinear - 2);
    expect(peak).toBeLessThanOrEqual(targetLinear + 2);
  });

  it("ne change pas un buffer déjà silencieux (évite une division par zéro)", () => {
    const pcm = pcm16From([0, 0, 0, 0]);
    const normalized = peakNormalizePcm16(pcm, -3);
    expect(samplesOf(normalized)).toEqual([0, 0, 0, 0]);
  });

  it("ne dépasse jamais l'amplitude 16 bits, même avec un gain important", () => {
    const pcm = pcm16From([10, -10]);
    const normalized = peakNormalizePcm16(pcm, 0); // cible 0 dBFS = gain maximal
    for (const s of samplesOf(normalized)) {
      expect(s).toBeGreaterThanOrEqual(-32768);
      expect(s).toBeLessThanOrEqual(32767);
    }
  });

  it("préserve le signe relatif des échantillons (pas d'inversion de phase)", () => {
    const pcm = pcm16From([1000, -1000]);
    const [pos, neg] = samplesOf(peakNormalizePcm16(pcm, -3));
    expect(pos).toBeGreaterThan(0);
    expect(neg).toBeLessThan(0);
  });

  it("lève une erreur sur une taille de buffer impaire (pas du PCM 16 bits valide)", () => {
    expect(() => peakNormalizePcm16(Buffer.alloc(3), -3)).toThrow(/impaire/);
  });
});

describe("buildAiffFromPcm16 + encodeSampleRateExtended", () => {
  it("produit un AIFF ré-analysable dont le format PCM correspond exactement à l'entrée", () => {
    const pcm = pcm16From([100, -100, 200, -200]);
    const aiff = buildAiffFromPcm16(pcm, { numChannels: 1, sampleRate: 44100 });
    const parsed = readSayAiff(aiff);
    expect(parsed.numChannels).toBe(1);
    expect(parsed.sampleSize).toBe(16);
    expect(Buffer.compare(parsed.pcmData, pcm)).toBe(0);
  });

  it("encode plusieurs fréquences d'échantillonnage usuelles sans lever d'erreur", () => {
    for (const rate of [8000, 16000, 22050, 44100, 48000]) {
      expect(() => encodeSampleRateExtended(rate)).not.toThrow();
      expect(encodeSampleRateExtended(rate)).toHaveLength(10);
    }
  });

  it("rejette une fréquence d'échantillonnage invalide", () => {
    expect(() => encodeSampleRateExtended(0)).toThrow();
    expect(() => encodeSampleRateExtended(-1)).toThrow();
    expect(() => encodeSampleRateExtended(44100.5)).toThrow();
  });
});

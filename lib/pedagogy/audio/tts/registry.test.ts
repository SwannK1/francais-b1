import { afterEach, describe, expect, it } from "vitest";
import { resolveTtsProvider, KNOWN_TTS_PROVIDER_IDS } from "@/lib/pedagogy/audio/tts/registry";
import { TtsProviderNotConfiguredError } from "@/lib/pedagogy/audio/tts/types";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("resolveTtsProvider", () => {
  it("retourne le fournisseur say par défaut, sans configuration", () => {
    delete process.env.AUDIO_TTS_PROVIDER;
    const provider = resolveTtsProvider();
    expect(provider.id).toBe("say");
    expect(provider.requiresApiKey).toBe(false);
  });

  it("respecte AUDIO_TTS_PROVIDER", () => {
    process.env.AUDIO_TTS_PROVIDER = "elevenlabs";
    expect(resolveTtsProvider().id).toBe("elevenlabs");
  });

  it("un id explicite prend le pas sur la variable d'environnement", () => {
    process.env.AUDIO_TTS_PROVIDER = "elevenlabs";
    expect(resolveTtsProvider("say").id).toBe("say");
  });

  it("lève une erreur claire pour un fournisseur inconnu", () => {
    expect(() => resolveTtsProvider("mistral-audio-inconnu")).toThrow(/Fournisseur TTS inconnu/);
  });

  it("liste tous les fournisseurs connus", () => {
    expect(KNOWN_TTS_PROVIDER_IDS).toEqual(expect.arrayContaining(["say", "elevenlabs"]));
  });
});

describe("fournisseur elevenlabs — jamais de clé en dur", () => {
  it("refuse de démarrer sans ELEVENLABS_API_KEY", () => {
    delete process.env.ELEVENLABS_API_KEY;
    const provider = resolveTtsProvider("elevenlabs");
    expect(() => provider.ensureAvailable()).toThrow(TtsProviderNotConfiguredError);
  });

  it("accepte de démarrer dès que la variable d'environnement est renseignée", () => {
    process.env.ELEVENLABS_API_KEY = "test-key-not-a-real-secret";
    const provider = resolveTtsProvider("elevenlabs");
    expect(() => provider.ensureAvailable()).not.toThrow();
  });
});

describe("fournisseur say — disponible sans configuration sur macOS", () => {
  it("ne requiert aucune clé API", () => {
    expect(resolveTtsProvider("say").requiresApiKey).toBe(false);
  });
});

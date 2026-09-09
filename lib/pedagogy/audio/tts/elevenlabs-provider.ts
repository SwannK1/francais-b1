import { writeFileSync } from "node:fs";
import type { TtsProvider, TtsTurnInput } from "@/lib/pedagogy/audio/tts/types";
import { TtsProviderNotConfiguredError } from "@/lib/pedagogy/audio/tts/types";
import { buildAiffFromPcm16 } from "@/lib/pedagogy/audio/tts/normalize";

/**
 * Fournisseur neuronal de démonstration (ElevenLabs) — prouve que
 * l'architecture est réellement interchangeable, pas seulement documentée.
 * Aucune clé codée en dur : lue exclusivement depuis
 * `process.env.ELEVENLABS_API_KEY` (voir `.env.example`), jamais autrement.
 * Sans cette variable, `ensureAvailable()` lève une erreur explicite avant
 * toute tentative réseau — jamais un échec silencieux ni un fichier vide.
 *
 * Non exercé par `npm test` au-delà de la vérification de configuration
 * (`ensureAvailable`) : aucun appel réseau réel n'est fait dans la suite de
 * tests, ce chantier n'a pas de compte ElevenLabs à disposition (voir
 * `docs/audio/humanisation-a1-a2-b1.md` § Fournisseurs).
 */
export function createElevenLabsProvider(): TtsProvider {
  const apiKey = () => process.env.ELEVENLABS_API_KEY;

  return {
    id: "elevenlabs",
    requiresApiKey: true,
    ensureAvailable() {
      if (!apiKey()) {
        throw new TtsProviderNotConfiguredError(
          "elevenlabs",
          "variable d'environnement ELEVENLABS_API_KEY absente (voir .env.example)"
        );
      }
    },
    async synthesizeTurnToAiff(input: TtsTurnInput, outPath: string) {
      const key = apiKey();
      if (!key) {
        throw new TtsProviderNotConfiguredError("elevenlabs", "ELEVENLABS_API_KEY absente au moment de l'appel");
      }
      // `output_format=pcm_44100` renvoie du PCM 16 bits mono brut (pas de
      // conteneur), directement encapsulable en AIFF sans étape de
      // transcodage supplémentaire — voir buildAiffFromPcm16.
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(input.voiceRef)}?output_format=pcm_44100`,
        {
          method: "POST",
          headers: {
            "xi-api-key": key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input.text, model_id: "eleven_multilingual_v2" }),
        }
      );
      if (!response.ok) {
        throw new Error(`ElevenLabs: échec de synthèse (HTTP ${response.status}) — ${await response.text()}`);
      }
      const pcm = Buffer.from(await response.arrayBuffer());
      writeFileSync(outPath, buildAiffFromPcm16(pcm, { numChannels: 1, sampleRate: 44100 }));
    },
  };
}

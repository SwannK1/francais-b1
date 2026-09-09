import type { TtsProvider, TtsProviderId } from "@/lib/pedagogy/audio/tts/types";
import { createSayProvider } from "@/lib/pedagogy/audio/tts/say-provider";
import { createElevenLabsProvider } from "@/lib/pedagogy/audio/tts/elevenlabs-provider";

/**
 * Point d'entrée unique du pipeline pour obtenir un fournisseur TTS —
 * c'est la pièce qui rend l'architecture réellement interchangeable :
 * un script de génération n'appelle jamais `say`/`execFileSync` ni un SDK
 * cloud directement, il demande un `TtsProvider` ici.
 *
 * Sélection : argument explicite, sinon `AUDIO_TTS_PROVIDER` (variable
 * d'environnement, jamais une clé), sinon `"say"` par défaut — le seul
 * fournisseur qui fonctionne sans aucune configuration, pour ne jamais
 * bloquer le pipeline en l'absence de clé API neuronale (voir
 * docs/audio/humanisation-a1-a2-b1.md § Fournisseurs).
 */
const FACTORIES: Record<TtsProviderId, () => TtsProvider> = {
  say: createSayProvider,
  elevenlabs: createElevenLabsProvider,
};

const KNOWN_IDS = Object.keys(FACTORIES) as TtsProviderId[];

export function resolveTtsProvider(explicitId?: string): TtsProvider {
  const id = explicitId ?? process.env.AUDIO_TTS_PROVIDER ?? "say";
  const factory = FACTORIES[id as TtsProviderId];
  if (!factory) {
    throw new Error(`Fournisseur TTS inconnu : "${id}" (connus : ${KNOWN_IDS.join(", ")})`);
  }
  return factory();
}

export { KNOWN_IDS as KNOWN_TTS_PROVIDER_IDS };

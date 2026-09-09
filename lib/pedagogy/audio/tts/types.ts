/**
 * Contrat commun à tout fournisseur de synthèse vocale utilisable par le
 * pipeline audio (A1/A2/B1) — introduit par le chantier `audio-humanisation`
 * pour découpler la génération de la commande macOS `say` (seul fournisseur
 * utilisé jusqu'ici, en dur dans `scripts/a1-audio/generate.mjs` et
 * `scripts/a2-audio-generate.mjs`).
 *
 * Un fournisseur ne connaît qu'une seule opération : synthétiser un tour de
 * parole en un fichier AIFF PCM mono sur disque. La concaténation multi-tours
 * (silences entre répliques, encodage AAC final) reste dans les scripts
 * existants (`scripts/lib/aiff.mjs`, `scripts/a1-audio/aiff-concat.mjs`),
 * inchangés : seule l'étape "texte + voix -> AIFF" devient interchangeable.
 *
 * Aucune clé API n'est codée en dur nulle part dans ce module : chaque
 * fournisseur qui en a besoin la lit exclusivement depuis une variable
 * d'environnement (voir `.env.example`) et refuse de démarrer si elle est
 * absente (`ensureAvailable()`), plutôt que d'échouer tard avec une erreur
 * réseau opaque.
 */

export type TtsProviderId = "say" | "elevenlabs";

/** Un tour de parole à synthétiser — un texte, une voix, un débit. */
export interface TtsTurnInput {
  text: string;
  /** Référence de voix propre au fournisseur (ex. nom `say -v`, id de voix ElevenLabs). */
  voiceRef: string;
  /** Débit en mots/minute — purement indicatif pour les fournisseurs qui n'ont pas de contrôle fin du débit. */
  rateWpm: number;
}

export class TtsProviderNotConfiguredError extends Error {
  constructor(providerId: TtsProviderId, reason: string) {
    super(`Fournisseur TTS "${providerId}" indisponible : ${reason}`);
    this.name = "TtsProviderNotConfiguredError";
  }
}

export interface TtsProvider {
  readonly id: TtsProviderId;
  /** true si ce fournisseur nécessite une clé API (jamais codée en dur — lue depuis l'environnement). */
  readonly requiresApiKey: boolean;
  /**
   * Vérifie que ce fournisseur peut réellement être utilisé dans cet
   * environnement (binaire présent, clé API renseignée...). Lève
   * `TtsProviderNotConfiguredError` sinon — jamais d'échec silencieux ni de
   * génération d'un fichier vide/invalide.
   */
  ensureAvailable(): void;
  /** Synthétise un tour de parole et écrit un AIFF PCM mono sur `outPath`. */
  synthesizeTurnToAiff(input: TtsTurnInput, outPath: string): void | Promise<void>;
}

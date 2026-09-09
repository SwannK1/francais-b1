/**
 * Types de la bibliothèque audio A1 — isolés du cœur pédagogique
 * (`lib/pedagogy/types.ts`) par choix : ce chantier ne doit dépendre d'aucun
 * type possédé par le chantier « contenu A1 » qui évolue en parallèle (voir
 * `docs/integration/a1-audio.md`). Les formes ci-dessous recopient
 * volontairement `Question`/`Correction` de `lib/pedagogy/types.ts` — la
 * duplication est un prix acceptable pour une isolation totale pendant que
 * les deux chantiers avancent en parallèle ; le rapprochement (suppression
 * du doublon) est documenté comme étape d'intégration future.
 *
 * Module Node/build-time (pas d'accès disque ici) — destiné aux scripts et
 * aux tests, jamais importé par un composant client tant que l'intégration
 * n'a pas défini de frontière premium (voir doc d'intégration §Sécurité).
 */

export type A1Locale = "fr-FR";

/** Identifiant stable d'une voix macOS `say` réellement disponible sans téléchargement — voir voices.ts. */
export type A1VoiceId = "thomas" | "jacques" | "flo" | "shelley" | "sandy" | "grandma" | "grandpa";

export interface A1VoiceProfile {
  id: A1VoiceId;
  /** Nom exact attendu par `say -v` sur macOS. */
  sayVoice: string;
  gender: "H" | "F";
  /** Rôle(s) récurrent(s) tenu(s) par cette voix dans la bibliothèque A1. */
  recurringRoles: string[];
  description: string;
}

export interface A1Speaker {
  /** Nom du personnage dans le dialogue, ex. "Léa", ou "Narrateur" pour une piste à un seul locuteur non incarné. */
  role: string;
  voice: A1VoiceId;
}

export type A1TrackKind = "monologue" | "dialogue" | "annonce" | "message_vocal" | "consigne";

/** Débit demandé à `say -r` (mots/minute) — voir voices.ts pour les valeurs choisies. */
export type A1Pace = "lent" | "naturel" | "naturel_soutenu";

/** Sous-étape de progression interne à A1 — jamais un `StageId` du cœur pédagogique (qui n'a pas encore de valeurs A1). */
export type A1Level = "A1.1" | "A1.2";

export interface A1Turn {
  /** Doit correspondre à un `A1Speaker.role` de la piste, ou "Narrateur"/"Voix" pour une piste à un seul locuteur. */
  speaker: string;
  /** Texte à synthétiser. Peut contenir des marqueurs de pause `say` du type `[[slnc 400]]`. */
  text: string;
}

export interface A1QuestionChoice {
  id: string;
  text: string;
}

export interface A1Correction {
  correctAnswer: string;
  explanation: string;
}

export type A1Question =
  | { kind: "qcm"; id: string; prompt: string; choices: A1QuestionChoice[]; correctChoiceId: string; correction: A1Correction }
  | { kind: "vrai_faux"; id: string; prompt: string; correctAnswer: boolean; correction: A1Correction };

/** Un des 17 thèmes de couverture A1 — voir docs/integration/a1-audio.md §Inventaire pour la liste complète. */
export type A1Theme =
  | "salutations"
  | "presentations"
  | "nombres-telephone"
  | "dates-heures"
  | "prix-achats"
  | "famille"
  | "description"
  | "cafe-restaurant"
  | "petites-annonces"
  | "directions"
  | "transports"
  | "meteo"
  | "quotidien-loisirs"
  | "rendez-vous"
  | "messages-vocaux"
  | "consignes"
  | "bilan";

export interface A1AudioTrack {
  /** Unique, kebab-case, préfixé "a1-<theme>-". */
  id: string;
  theme: A1Theme;
  /** Étiquette lisible de la compétence entraînée (pas un `skillId` du cœur pédagogique — non résolu ici). */
  skillLabel: string;
  kind: A1TrackKind;
  level: A1Level;
  pace: A1Pace;
  /** Débit `say -r` effectivement utilisé à la génération. */
  speakingRateWpm: number;
  intention?: string;
  speakers: A1Speaker[];
  /** Source de vérité du script — sert à la fois de transcript affiché et d'entrée de synthèse. */
  turns: A1Turn[];
  questions: A1Question[];
  locale: A1Locale;
  /** Nom du fichier .m4a, sans dossier, ex. "bonjour-matin.m4a". */
  filename: string;
  /** Estimation avant génération (secondes) — voir `npm run` du script de statut pour la durée réelle mesurée. */
  approxDurationSeconds: number;
  /**
   * Marqueur informatif : cette piste est destinée à un module premium une
   * fois raccordée. N'entraîne aujourd'hui aucun effet (ce manifest n'est
   * importé par aucune page) — voir docs/integration/a1-audio.md §Sécurité
   * pour la frontière réelle à appliquer lors du raccordement.
   */
  premium: boolean;
}

/** Transcript affichable, au même format que `ComprehensionOraleExercise.transcript` côté B1 (une réplique par ligne, "Rôle — texte" si plusieurs locuteurs). */
export function formatA1Transcript(track: A1AudioTrack): string {
  const stripPauseMarkers = (text: string) => text.replace(/\[\[slnc\s+\d+\]\]/g, " ").replace(/\s+/g, " ").trim();
  if (track.speakers.length <= 1) {
    return track.turns.map((t) => stripPauseMarkers(t.text)).join("\n");
  }
  return track.turns.map((t) => `${t.speaker} — ${stripPauseMarkers(t.text)}`).join("\n");
}

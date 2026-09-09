/**
 * Casting vocal A2 — voix système macOS (`say`), même pipeline de génération
 * que l'audio B1 (voir `docs/b1/audio-human-recording-plan.md` §0 et
 * `scripts/a2-audio-generate.mjs`). Registre séparé du B1 : aucune donnée
 * partagée, seulement la même technique de synthèse.
 *
 * Convention : un id de piste n'utilise jamais deux fois le même profil pour
 * deux locuteurs différents d'un même document (voir `AGENTS`/consigne
 * chantier "éviter qu'un dialogue à deux personnes soit lu par exactement la
 * même voix") — vérifié par `a2-content-integrity.test.ts`.
 */

export interface A2VoiceProfile {
  id: string;
  label: string;
  /** Argument exact passé à `say -v` — certains noms macOS sont partagés par
   * plusieurs locales (Eddy, Flo, Rocko...) : la forme parenthésée complète
   * est obligatoire pour cibler sans ambiguïté la voix française de France. */
  sayVoice: string;
  gender: "H" | "F";
  register: string;
}

export const A2_VOICE_PROFILES: Record<string, A2VoiceProfile> = {
  "voix-a": {
    id: "voix-a",
    label: "Voix A",
    sayVoice: "Thomas",
    gender: "H",
    register: "Voix masculine standard, registre neutre à professionnel (guichets, collègues).",
  },
  "voix-b": {
    id: "voix-b",
    label: "Voix B",
    sayVoice: "Flo (Français (France))",
    gender: "F",
    register: "Voix féminine standard, registre chaleureux/quotidien (amies, famille).",
  },
  "voix-c": {
    id: "voix-c",
    label: "Voix C",
    sayVoice: "Shelley (Français (France))",
    gender: "F",
    register: "Voix féminine alternative — jamais utilisée avec Voix B dans le même document, pour distinguer deux locutrices.",
  },
  "voix-d": {
    id: "voix-d",
    label: "Voix D",
    sayVoice: "Jacques",
    gender: "H",
    register: "Voix masculine alternative, registre plus formel/officiel (annonces publiques, syndic, médecin).",
  },
  "voix-e": {
    id: "voix-e",
    label: "Voix E",
    sayVoice: "Rocko (Français (France))",
    gender: "H",
    register: "Voix masculine complémentaire, réservée aux scènes à 3 locuteurs ou plus.",
  },
  "voix-f": {
    id: "voix-f",
    label: "Voix F",
    sayVoice: "Sandy (Français (France))",
    gender: "F",
    register: "Voix féminine complémentaire, réservée aux scènes à 3 locutrices ou plus / rôles institutionnels (service client, pharmacien-ne).",
  },
};

export function voiceProfile(id: string): A2VoiceProfile {
  const profile = A2_VOICE_PROFILES[id];
  if (!profile) throw new Error(`Profil vocal inconnu : "${id}"`);
  return profile;
}

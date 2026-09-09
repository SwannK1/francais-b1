/**
 * Casting vocal B1 — voix système macOS (`say`), même technique que A1/A2
 * (voir `lib/pedagogy/audio/a1/voices.ts`, `a2/voices.ts`). Introduit par le
 * chantier `audio-humanisation` pour permettre de corriger, en synthétique,
 * le défaut de "voix dupliquée" déjà documenté dans
 * `docs/b1/audio-human-recording-plan.md` §1/§2 (ex. `decrire-vie-quotidienne`,
 * `discuter-avec-un-proprietaire` : deux personnages différents, actuellement
 * la même voix `say`) — en attendant l'enregistrement humain prévu par ce
 * même pack, qui restera la référence finale une fois disponible.
 *
 * 3 profils seulement (Voix A/B/C), alignés sur la répartition déjà décidée
 * dans le pack d'enregistrement (§5) — pas les 18 pistes n'ont pas toutes
 * besoin d'un profil ici, seulement celles régénérées par ce chantier.
 * `thomas` est intentionnellement le même nom de voix que le narrateur A1
 * (voir commentaire de `a1/voices.ts`) pour une identité sonore cohérente
 * entre niveaux.
 */

export type B1VoiceId = "voix-a" | "voix-b" | "voix-c";

export interface B1VoiceProfile {
  id: B1VoiceId;
  label: string;
  sayVoice: string;
  gender: "H" | "F";
  register: string;
}

export const B1_VOICE_PROFILES: Record<B1VoiceId, B1VoiceProfile> = {
  "voix-a": {
    id: "voix-a",
    label: "Voix A",
    sayVoice: "Thomas",
    gender: "H",
    register: "Voix masculine standard — même voix que le narrateur A1 (identité sonore cohérente entre niveaux).",
  },
  "voix-b": {
    id: "voix-b",
    label: "Voix B",
    sayVoice: "Flo (Français (France))",
    gender: "F",
    register: "Voix féminine standard, registre chaleureux à neutre.",
  },
  "voix-c": {
    id: "voix-c",
    label: "Voix C",
    sayVoice: "Shelley (Français (France))",
    gender: "F",
    register: "Voix féminine alternative — timbre nettement distinct de Voix B, jamais utilisée avec elle dans le même document.",
  },
};

export function b1VoiceProfile(id: B1VoiceId): B1VoiceProfile {
  const profile = B1_VOICE_PROFILES[id];
  if (!profile) throw new Error(`Profil vocal B1 inconnu : "${id}"`);
  return profile;
}

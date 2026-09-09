import { describe, expect, it } from "vitest";
import { B1_VOICE_PROFILES, b1VoiceProfile } from "@/lib/pedagogy/audio/b1/voices";

describe("B1_VOICE_PROFILES", () => {
  it("définit les 3 profils attendus (Voix A/B/C)", () => {
    expect(Object.keys(B1_VOICE_PROFILES).sort()).toEqual(["voix-a", "voix-b", "voix-c"]);
  });

  it("voix-b et voix-c sont des voix say réellement distinctes (jamais le même second rôle féminin)", () => {
    expect(B1_VOICE_PROFILES["voix-b"].sayVoice).not.toBe(B1_VOICE_PROFILES["voix-c"].sayVoice);
  });

  it("b1VoiceProfile lève une erreur claire pour un id inconnu", () => {
    // @ts-expect-error -- id volontairement invalide pour ce test
    expect(() => b1VoiceProfile("voix-inconnue")).toThrow(/Profil vocal B1 inconnu/);
  });
});

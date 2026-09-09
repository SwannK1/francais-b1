import { describe, expect, it } from "vitest";
import { B1_HUMANIZED_TRACKS, formatB1HumanizedTranscript } from "@/lib/pedagogy/audio/b1/humanized-tracks";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { B1_VOICE_PROFILES } from "@/lib/pedagogy/audio/b1/voices";

/**
 * Même garde-fou que `lib/pedagogy/audio/a1/transcript-sync.test.ts`, côté
 * B1 : `B1_HUMANIZED_TRACKS` (source de synthèse, consommée par
 * `scripts/b1-audio-generate.mjs`) et `lib/pedagogy/data/modules.ts`
 * (`transcript` affiché à l'apprenant) sont maintenus manuellement en
 * synchronisation de texte pour chaque piste réécrite par ce chantier.
 */

function collectOralTranscriptById(): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of MODULES) {
    for (const l of m.lessons) {
      for (const a of l.activities) {
        for (const ex of a.exercises) {
          if (ex.type === "comprehension_orale") map.set(ex.id, ex.transcript ?? "");
        }
      }
    }
  }
  return map;
}

describe("Synchronisation transcript B1 (pistes humanisées <-> contenu du parcours)", () => {
  const liveTranscriptById = collectOralTranscriptById();

  it("chaque piste humanisée a exactement le même texte que le transcript réel", () => {
    const mismatches: string[] = [];
    for (const track of B1_HUMANIZED_TRACKS) {
      const liveTranscript = liveTranscriptById.get(track.id);
      expect(liveTranscript, `${track.id} : aucun exercice comprehension_orale correspondant dans modules.ts`).toBeDefined();

      const generatedTranscript = formatB1HumanizedTranscript(track);
      if (generatedTranscript !== liveTranscript) {
        mismatches.push(
          `${track.id} :\n  pistes humanisées : "${generatedTranscript}"\n  contenu réel      : "${liveTranscript}"`
        );
      }
    }
    expect(mismatches, mismatches.join("\n\n")).toEqual([]);
  });

  it("ne réutilise jamais le même profil vocal pour deux personnages différents d'une même piste", () => {
    const issues: string[] = [];
    for (const track of B1_HUMANIZED_TRACKS) {
      const voiceBySpeaker = new Map<string, string>();
      for (const turn of track.turns) {
        const existing = voiceBySpeaker.get(turn.speaker);
        if (existing && existing !== turn.voiceId) {
          issues.push(`${track.id} : "${turn.speaker}" utilise à la fois ${existing} et ${turn.voiceId}`);
        }
        voiceBySpeaker.set(turn.speaker, turn.voiceId);
      }
      const speakers = [...voiceBySpeaker.entries()];
      for (let i = 0; i < speakers.length; i++) {
        for (let j = i + 1; j < speakers.length; j++) {
          if (speakers[i][1] === speakers[j][1]) {
            issues.push(`${track.id} : "${speakers[i][0]}" et "${speakers[j][0]}" partagent le même profil vocal ${speakers[i][1]}`);
          }
        }
      }
    }
    expect(issues, issues.join("\n")).toEqual([]);
  });

  it("tous les voiceId référencés existent dans B1_VOICE_PROFILES", () => {
    const unknown: string[] = [];
    for (const track of B1_HUMANIZED_TRACKS) {
      for (const turn of track.turns) {
        if (!B1_VOICE_PROFILES[turn.voiceId]) unknown.push(`${track.id}: "${turn.voiceId}"`);
      }
    }
    expect(unknown).toEqual([]);
  });
});

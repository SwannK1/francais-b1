import { describe, expect, it } from "vitest";
import { MODULES_A1 } from "@/lib/pedagogy/data/a1";
import { A1_AUDIO_TRACKS } from "@/lib/pedagogy/audio/a1/manifest";
import { a1SyntheticSrc } from "@/lib/pedagogy/audio/a1/paths";
import { formatA1Transcript } from "@/lib/pedagogy/audio/a1/types";

/**
 * Garde-fou de non-régression pour le risque documenté dans
 * `docs/audio/humanisation-a1-a2-b1.md` §2/§7 : `lib/pedagogy/audio/a1/manifest.ts`
 * (source de synthèse, consommée par `scripts/a1-audio/generate.mjs`) et
 * `lib/pedagogy/data/a1/modules/*.ts` (`transcript` affiché à l'apprenant)
 * sont deux fichiers distincts, maintenus manuellement en synchronisation de
 * texte pour chaque piste A1 qui existe dans les deux systèmes — rien ne les
 * lie au niveau du type. Une édition de l'un sans l'autre désynchronise
 * silencieusement l'audio réellement synthétisé et le transcript lu par
 * l'apprenant. `formatA1Transcript` existait déjà (types.ts) mais n'était
 * branché à aucun test avant ce chantier.
 */

function collectionOralAudioSrcToTranscript(): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of MODULES_A1) {
    for (const l of m.lessons) {
      for (const a of l.activities) {
        for (const ex of a.exercises) {
          if (ex.type === "comprehension_orale" && ex.audioSrc.startsWith("/audio/a1/")) {
            map.set(ex.audioSrc, ex.transcript ?? "");
          }
        }
      }
    }
  }
  return map;
}

describe("Synchronisation transcript A1 (manifest audio <-> contenu du parcours)", () => {
  const liveTranscriptBySrc = collectionOralAudioSrcToTranscript();

  it("chaque piste présente dans les deux systèmes a exactement le même texte", () => {
    const mismatches: string[] = [];
    for (const track of A1_AUDIO_TRACKS) {
      const src = a1SyntheticSrc(track);
      const liveTranscript = liveTranscriptBySrc.get(src);
      if (liveTranscript == null) continue; // piste pas (encore) raccordée au parcours réel — hors périmètre

      const manifestTranscript = formatA1Transcript(track);
      if (manifestTranscript !== liveTranscript) {
        mismatches.push(
          `${track.id} (${src}) :\n  manifest audio : "${manifestTranscript}"\n  contenu réel   : "${liveTranscript}"`
        );
      }
    }
    expect(mismatches, mismatches.join("\n\n")).toEqual([]);
  });

  it("au moins une piste connectée est réellement vérifiée (le test ne passe pas par défaut faute de données)", () => {
    const connected = A1_AUDIO_TRACKS.filter((t) => liveTranscriptBySrc.has(a1SyntheticSrc(t)));
    expect(connected.length).toBeGreaterThan(0);
  });
});

import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { AUDIO_TRACKS_A2_ALL } from "@/lib/pedagogy/audio/a2/manifest";
import { estimatedDurationSeconds } from "@/lib/pedagogy/audio/a2/validation";
import { existsUnderPublic, fileSizeUnderPublic, publicDir } from "@/lib/pedagogy/audio/status";
import path from "node:path";

/**
 * Validation physique des fichiers audio A2 : présence, taille, format,
 * durée plausible. Complète (sans le dupliquer) le test de référence
 * `a2-content-integrity.test.ts`, qui ne vérifie que l'existence du fichier.
 *
 * `afinfo` (macOS uniquement) sert à mesurer la durée réelle — absent sur un
 * CI Linux, auquel cas les assertions de durée sont sautées (jamais
 * d'échec pour une raison indépendante du contenu), comme dans
 * `scripts/audio-status.mjs`.
 */

function afinfoDurationSeconds(absPath: string): number | null {
  try {
    const out = execFileSync("afinfo", [absPath], { encoding: "utf8" });
    const match = out.match(/estimated duration:\s*([\d.]+)\s*sec/);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

describe("Fichiers audio A2 — présence, format, taille", () => {
  it.each(AUDIO_TRACKS_A2_ALL.map((t) => [t.id, t.exercise.audioSrc] as const))(
    "%s : fichier .m4a présent et de taille non nulle",
    (_id, audioSrc) => {
      expect(audioSrc.endsWith(".m4a")).toBe(true);
      expect(existsUnderPublic(audioSrc)).toBe(true);
      const size = fileSizeUnderPublic(audioSrc);
      expect(size).not.toBeNull();
      expect(size ?? 0).toBeGreaterThan(0);
    }
  );

  it("id de piste unique par nom de fichier (aucune collision possible sous public/audio/a2)", () => {
    const filenames = AUDIO_TRACKS_A2_ALL.map((t) => t.exercise.audioSrc.split("/").pop());
    expect(new Set(filenames).size).toBe(filenames.length);
  });
});

describe("Fichiers audio A2 — durée plausible (afinfo, macOS uniquement)", () => {
  for (const t of AUDIO_TRACKS_A2_ALL) {
    it(`${t.id} : durée réelle proche de l'estimation du script`, () => {
      if (!existsUnderPublic(t.exercise.audioSrc)) return; // couvert par ailleurs, on n'échoue pas deux fois pour la même cause
      const abs = path.join(publicDir(), t.exercise.audioSrc);
      const actual = afinfoDurationSeconds(abs);
      if (actual == null) return; // afinfo indisponible (non-macOS) — informatif seulement, voir docstring
      const estimated = estimatedDurationSeconds(t.definition);
      // Tolérance large : `say` ne respecte le débit demandé qu'approximativement,
      // et la ponctuation/les silences naturels de la voix ajoutent du temps.
      expect(actual).toBeGreaterThan(estimated * 0.4);
      expect(actual).toBeLessThan(estimated * 2.5 + 3);
    });
  }
});

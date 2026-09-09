import { execFileSync } from "node:child_process";
import type { TtsProvider, TtsTurnInput } from "@/lib/pedagogy/audio/tts/types";
import { TtsProviderNotConfiguredError } from "@/lib/pedagogy/audio/tts/types";

/**
 * Fournisseur par défaut — voix système macOS `say`, seul fournisseur utilisé
 * par la bibliothèque à ce jour (voir `lib/pedagogy/audio/a1/voices.ts` et
 * `a2/voices.ts`). Toujours disponible sans configuration sur macOS, jamais
 * de clé API. `voiceRef` doit être le nom exact attendu par `say -v`
 * (ex. `"Thomas"`, `"Flo (Français (France))"`).
 */
export function createSayProvider(): TtsProvider {
  return {
    id: "say",
    requiresApiKey: false,
    ensureAvailable() {
      if (process.platform !== "darwin") {
        throw new TtsProviderNotConfiguredError(
          "say",
          `nécessite macOS (commande "say"), plateforme actuelle : "${process.platform}"`
        );
      }
      try {
        execFileSync("which", ["say"], { stdio: "ignore" });
      } catch {
        throw new TtsProviderNotConfiguredError("say", 'commande "say" introuvable dans le PATH');
      }
    },
    synthesizeTurnToAiff(input: TtsTurnInput, outPath: string) {
      execFileSync("say", ["-v", input.voiceRef, "-r", String(input.rateWpm), "-o", outPath, input.text], {
        stdio: "inherit",
      });
    },
  };
}

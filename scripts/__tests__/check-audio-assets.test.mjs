import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkAudioAssets } from "../check-audio-assets.mjs";

/**
 * Construit un dossier de données pédagogiques + un dossier `public/` de
 * test, isolés dans un répertoire temporaire, pour vérifier le comportement
 * du script sans dépendre du contenu réel du projet (pas fragile face à un
 * futur ajout/retrait de piste réelle).
 */
function buildFixture() {
  const root = mkdtempSync(join(tmpdir(), "audio-check-"));
  const dataDir = join(root, "data");
  const publicDir = join(root, "public");
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(join(publicDir, "audio", "b1"), { recursive: true });

  writeFileSync(
    join(dataDir, "modules.ts"),
    `
      export const mod = {
        audioSrc: "/audio/b1/present.m4a",
      };
      export const other = {
        audioSrc: "/audio/b1/missing.m4a",
      };
    `,
    "utf8"
  );

  writeFileSync(join(publicDir, "audio", "b1", "present.m4a"), "fake-audio-bytes", "utf8");
  writeFileSync(join(publicDir, "audio", "b1", "orphan.m4a"), "fake-audio-bytes", "utf8");

  return { root, dataDir, publicDir };
}

describe("checkAudioAssets", () => {
  it("reports a referenced file that exists as neither missing nor orphaned", () => {
    const { root, dataDir, publicDir } = buildFixture();
    try {
      const { referenced, missing, orphaned } = checkAudioAssets(dataDir, publicDir);
      expect(referenced).toContain("/audio/b1/present.m4a");
      expect(missing).not.toContain("/audio/b1/present.m4a");
      expect(orphaned).not.toContain("/audio/b1/present.m4a");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("flags a referenced audioSrc with no matching file under public/ as missing", () => {
    const { root, dataDir, publicDir } = buildFixture();
    try {
      const { missing } = checkAudioAssets(dataDir, publicDir);
      expect(missing).toEqual(["/audio/b1/missing.m4a"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("flags a file present under public/audio but never referenced as orphaned", () => {
    const { root, dataDir, publicDir } = buildFixture();
    try {
      const { orphaned } = checkAudioAssets(dataDir, publicDir);
      expect(orphaned).toEqual(["/audio/b1/orphan.m4a"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("reports nothing missing and nothing orphaned when everything lines up", () => {
    const root = mkdtempSync(join(tmpdir(), "audio-check-clean-"));
    try {
      const dataDir = join(root, "data");
      const publicDir = join(root, "public");
      mkdirSync(dataDir, { recursive: true });
      mkdirSync(join(publicDir, "audio"), { recursive: true });
      writeFileSync(
        join(dataDir, "exams.ts"),
        `export const exam = { audioSrc: "/audio/exam.m4a" };`,
        "utf8"
      );
      writeFileSync(join(publicDir, "audio", "exam.m4a"), "fake-audio-bytes", "utf8");

      const { missing, orphaned } = checkAudioAssets(dataDir, publicDir);
      expect(missing).toEqual([]);
      expect(orphaned).toEqual([]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

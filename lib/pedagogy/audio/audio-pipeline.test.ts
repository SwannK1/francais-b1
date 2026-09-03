import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { toHumanAudioPath } from "@/lib/pedagogy/audio/paths";
import {
  INITIAL_AUDIO_STAGE,
  clearPlaybackIfCurrent,
  nextStageAfterFailure,
  registerPlayback,
  resetPlaybackCoordinatorForTests,
  resetStage,
  resolveSrc,
  type Pausable,
} from "@/lib/pedagogy/audio/playback";
import { existsUnderPublic, getTrackAvailability } from "@/lib/pedagogy/audio/status";
import type { AudioTrack } from "@/lib/pedagogy/audio/manifest";

describe("toHumanAudioPath", () => {
  it("insère un dossier human/ frère, en conservant le nom de fichier", () => {
    expect(toHumanAudioPath("/audio/b1/donner-son-opinion.m4a")).toBe(
      "/audio/b1/human/donner-son-opinion.m4a"
    );
    expect(toHumanAudioPath("/audio/examens/blanc-1/co-message-camping.m4a")).toBe(
      "/audio/examens/blanc-1/human/co-message-camping.m4a"
    );
  });
});

describe("Résolution de la source (fallback synthétique)", () => {
  it("part toujours de l'étape humaine", () => {
    expect(INITIAL_AUDIO_STAGE).toBe("human");
  });

  it("bascule humain -> synthétique après un échec", () => {
    expect(nextStageAfterFailure("human")).toBe("synthetic");
  });

  it("bascule synthétique -> erreur après un second échec (asset manquant des deux côtés)", () => {
    expect(nextStageAfterFailure("synthetic")).toBe("error");
  });

  it("reste en erreur si on lui redemande la suite (état terminal)", () => {
    expect(nextStageAfterFailure("error")).toBe("error");
  });

  it("réessayer depuis l'erreur relance le cycle depuis le début (restart)", () => {
    expect(resetStage()).toBe("human");
  });

  it("résout la bonne src selon l'étape, undefined en erreur", () => {
    expect(resolveSrc("human", "/h.m4a", "/s.m4a")).toBe("/h.m4a");
    expect(resolveSrc("synthetic", "/h.m4a", "/s.m4a")).toBe("/s.m4a");
    expect(resolveSrc("error", "/h.m4a", "/s.m4a")).toBeUndefined();
  });
});

describe("Coordinateur de lecture unique", () => {
  beforeEach(() => resetPlaybackCoordinatorForTests());

  it("met en pause la piste précédente quand une nouvelle démarre (une seule lecture simultanée)", () => {
    const first: Pausable = { pause: vi.fn() };
    const second: Pausable = { pause: vi.fn() };

    registerPlayback(first);
    registerPlayback(second);

    expect(first.pause).toHaveBeenCalledTimes(1);
    expect(second.pause).not.toHaveBeenCalled();
  });

  it("ne se met pas en pause elle-même en redémarrant (retry sur la même piste)", () => {
    const el: Pausable = { pause: vi.fn() };
    registerPlayback(el);
    registerPlayback(el);
    expect(el.pause).not.toHaveBeenCalled();
  });

  it("clearPlaybackIfCurrent ne libère l'emplacement que si l'élément est bien l'actif", () => {
    const first: Pausable = { pause: vi.fn() };
    registerPlayback(first);
    clearPlaybackIfCurrent(first); // first n'est plus considéré comme actif

    const second: Pausable = { pause: vi.fn() };
    registerPlayback(second);

    // first avait déjà été libéré avant l'enregistrement de second : jamais mis en pause.
    expect(first.pause).not.toHaveBeenCalled();
  });
});

describe("Disponibilité réelle sur disque (fixtures de test — jamais un asset public/)", () => {
  let fixtureDir: string;

  const makeTrack = (overrides: Partial<AudioTrack> = {}): AudioTrack => ({
    id: "fixture-track",
    skillId: "co-dialogues-simples",
    syntheticSrc: "/audio/b1/fixture-track.m4a",
    humanSrc: "/audio/b1/human/fixture-track.m4a",
    locale: "fr-FR",
    transcript: "Transcript de test.",
    context: { kind: "module", moduleSlug: "fixture", moduleTitle: "Fixture", stageId: "b1-debut" },
    production: { speakers: [{ role: "Testeur", voiceLabel: "Voix A", gender: "H" }] },
    ...overrides,
  });

  beforeEach(() => {
    // Dossier temporaire hors du dépôt (os.tmpdir()) — jamais public/ :
    // aucun faux asset audio n'est créé dans le projet pour ces tests.
    fixtureDir = mkdtempSync(path.join(os.tmpdir(), "francais-b1-audio-fixture-"));
  });

  afterEach(() => {
    rmSync(fixtureDir, { recursive: true, force: true });
  });

  it("renvoie 'missing' quand ni le fichier humain ni le synthétique n'existent", () => {
    const track = makeTrack();
    expect(getTrackAvailability(track, fixtureDir)).toBe("missing");
  });

  it("renvoie 'synthetic' quand seul le fichier actuel existe (cas réel aujourd'hui)", () => {
    const track = makeTrack();
    mkdirSync(path.join(fixtureDir, "audio", "b1"), { recursive: true });
    writeFileSync(path.join(fixtureDir, track.syntheticSrc), "fixture-non-vide");

    expect(getTrackAvailability(track, fixtureDir)).toBe("synthetic");
    expect(existsUnderPublic(track.humanSrc, fixtureDir)).toBe(false);
  });

  it("renvoie 'human' dès qu'un fichier humain est déposé au chemin conventionnel, même si le synthétique existe aussi", () => {
    const track = makeTrack();
    mkdirSync(path.join(fixtureDir, "audio", "b1", "human"), { recursive: true });
    writeFileSync(path.join(fixtureDir, track.syntheticSrc), "fixture-synthetic");
    writeFileSync(path.join(fixtureDir, track.humanSrc), "fixture-human");

    expect(getTrackAvailability(track, fixtureDir)).toBe("human");
  });
});

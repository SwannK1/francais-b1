import { describe, expect, it } from "vitest";
import { EXAMS, MODULES, PARCOURS_STAGES, SKILLS } from "@/lib/pedagogy/data";
import { A1_AUDIO_TRACKS } from "@/lib/pedagogy/audio/a1/manifest";
import { AUDIO_TRACKS_A2_ALL } from "@/lib/pedagogy/audio/a2/manifest";
import type { Exercise } from "@/lib/pedagogy/types";

/**
 * Garde-fous spécifiques au chantier d'intégration A1 + A2 + B1
 * (`chantier/integration-a1-a2-b1`) — complète `content-integrity.test.ts`
 * (générique, tous niveaux confondus) avec des vérifications propres à la
 * fusion : présence effective des trois niveaux, absence de piste audio
 * orpheline une fois les deux bibliothèques (A1 : 65 pistes, A2 : 30
 * pistes) raccordées, cohérence niveau/étape/compétence.
 */

function comprehensionOraleExercises(exercises: Exercise[]): Exercise[] {
  return exercises.filter((e) => e.type === "comprehension_orale");
}

function allExercises(): Exercise[] {
  const fromModules = MODULES.flatMap((m) => m.lessons.flatMap((l) => l.activities.flatMap((a) => a.exercises)));
  const fromExams = EXAMS.flatMap((e) => e.sections.flatMap((s) => s.exercises));
  return [...fromModules, ...fromExams];
}

describe("Intégration A1 + A2 + B1 — présence des trois niveaux", () => {
  it("MODULES contient des modules des 3 niveaux, dans les volumes attendus", () => {
    const byLevel = { A1: 0, A2: 0, B1: 0, B2: 0 };
    for (const m of MODULES) byLevel[m.level]++;
    expect(byLevel.A1).toBeGreaterThanOrEqual(26); // 26 modules de contenu + banque d'écoute
    expect(byLevel.A2).toBeGreaterThanOrEqual(22); // 22 modules de contenu + banque d'écoute
    expect(byLevel.B1).toBeGreaterThanOrEqual(26);
  });

  it("PARCOURS_STAGES contient les étapes des 3 niveaux (18 au total), sans doublon d'id/slug/order", () => {
    const a1 = PARCOURS_STAGES.filter((s) => s.id.startsWith("a1-"));
    const a2 = PARCOURS_STAGES.filter((s) => s.id.startsWith("a2-"));
    const b1 = PARCOURS_STAGES.filter((s) => !s.id.startsWith("a1-") && !s.id.startsWith("a2-"));
    expect(a1.length).toBe(6);
    expect(a2.length).toBe(6);
    expect(b1.length).toBe(6);
    expect(PARCOURS_STAGES.length).toBe(18);
    const orders = PARCOURS_STAGES.map((s) => s.order).sort((x, y) => x - y);
    expect(orders).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));
  });

  it("EXAMS contient une évaluation finale par niveau (A1, A2, B1)", () => {
    const levels = new Set(EXAMS.map((e) => e.level));
    expect(levels.has("A1")).toBe(true);
    expect(levels.has("A2")).toBe(true);
    expect(levels.has("B1")).toBe(true);
  });
});

describe("Intégration A1 + A2 + B1 — pipeline audio", () => {
  it("chaque piste de la bibliothèque A1 (65) est référencée par au moins un exercice réel", () => {
    const usedAudioSrc = new Set(
      comprehensionOraleExercises(allExercises())
        .map((e) => (e.type === "comprehension_orale" ? e.audioSrc : ""))
    );
    const orphans = A1_AUDIO_TRACKS.filter((t) => !usedAudioSrc.has(`/audio/a1/${t.theme}/${t.filename}`)).map((t) => t.id);
    expect(orphans).toEqual([]);
  });

  it("chaque piste de la bibliothèque A2 (30) est référencée par au moins un exercice réel", () => {
    const usedAudioSrc = new Set(
      comprehensionOraleExercises(allExercises())
        .map((e) => (e.type === "comprehension_orale" ? e.audioSrc : ""))
    );
    const orphans = AUDIO_TRACKS_A2_ALL.filter((t) => !usedAudioSrc.has(t.exercise.audioSrc)).map((t) => t.id);
    expect(orphans).toEqual([]);
  });
});

describe("Intégration A1 + A2 + B1 — cohérence niveau → module → compétence", () => {
  const skillById = new Map(SKILLS.map((s) => [s.id, s]));

  it("chaque exercice référence un skillId qui existe dans SKILLS (catalogue fusionné)", () => {
    const issues: string[] = [];
    for (const m of MODULES) {
      for (const lesson of m.lessons) {
        for (const activity of lesson.activities) {
          for (const exercise of activity.exercises) {
            if (!skillById.has(exercise.skillId)) {
              issues.push(`${m.slug} > ${exercise.id}: skillId "${exercise.skillId}" introuvable dans SKILLS`);
            }
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("le préfixe de skillId d'un module A1/A2 correspond à son niveau (pas de compétence d'un autre niveau importée par erreur)", () => {
    const issues: string[] = [];
    for (const m of MODULES) {
      if (m.level !== "A1" && m.level !== "A2") continue;
      const expectedPrefix = m.level === "A1" ? "a1-" : "a2-";
      const otherPrefix = m.level === "A1" ? "a2-" : "a1-";
      for (const lesson of m.lessons) {
        for (const activity of lesson.activities) {
          for (const exercise of activity.exercises) {
            if (exercise.skillId.startsWith(otherPrefix)) {
              issues.push(`${m.slug} > ${exercise.id}: skillId "${exercise.skillId}" appartient au niveau ${otherPrefix}, incohérent avec le module ${expectedPrefix}`);
            }
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });
});

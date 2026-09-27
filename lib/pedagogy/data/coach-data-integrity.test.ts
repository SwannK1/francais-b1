import { describe, expect, it } from "vitest";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getSkillById } from "@/lib/pedagogy/data/skills";
import { ORAL_EXERCISE_SKILLS, SKILLS_ORAL } from "@/lib/pedagogy/data/skills-oral";
import { LIFE_SITUATIONS } from "@/lib/pedagogy/data/life-situations";
import { GOAL_INTENTS } from "@/lib/pedagogy/data/goal-intents";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";

/** Intégrité des métadonnées ajoutées par le chantier « coach quotidien ». */
const allExercises = MODULES.flatMap((mod) =>
  mod.lessons.flatMap((lesson) => lesson.activities.flatMap((activity) => activity.exercises))
);

describe("compétences orales (po-*)", () => {
  it("chaque exercice oral des modules est rattaché à une compétence orale, et seulement eux", () => {
    const issues: string[] = [];
    for (const exercise of allExercises) {
      const domain = getSkillById(exercise.skillId)?.domain;
      if (exercise.type === "production_orale" && domain !== "production_orale") {
        issues.push(`${exercise.id} (oral) → ${exercise.skillId}`);
      }
      if (exercise.type !== "production_orale" && domain === "production_orale") {
        issues.push(`${exercise.id} (${exercise.type}) → ${exercise.skillId}`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("la table de référence correspond exactement au contenu", () => {
    const oralExercises = allExercises.filter((exercise) => exercise.type === "production_orale");
    expect(Object.keys(ORAL_EXERCISE_SKILLS).sort()).toEqual(oralExercises.map((exercise) => exercise.id).sort());
    for (const exercise of oralExercises) expect(exercise.skillId).toBe(ORAL_EXERCISE_SKILLS[exercise.id]);
  });

  it("chaque compétence orale est réellement travaillée quelque part (pas de compétence vide)", () => {
    for (const skill of SKILLS_ORAL) {
      const used =
        allExercises.some((exercise) => exercise.skillId === skill.id) ||
        SPEAKING_EXERCISES.some((exercise) => exercise.skillId === skill.id);
      expect(used, skill.id).toBe(true);
    }
  });

  it("les exercices de Pratiquer rattachés à une compétence pointent vers une compétence orale connue", () => {
    for (const exercise of SPEAKING_EXERCISES) {
      if (!exercise.skillId) continue;
      expect(getSkillById(exercise.skillId)?.domain, exercise.id).toBe("production_orale");
    }
  });

  it("le catalogue public (généré) est synchronisé avec les nouvelles compétences", () => {
    const publicOral = PUBLIC_MODULES.flatMap((mod) =>
      mod.lessons.flatMap((lesson) => lesson.activities.flatMap((activity) => activity.exercises))
    ).filter((exercise) => exercise.type === "production_orale");
    expect(publicOral.every((exercise) => exercise.skillId.startsWith("po-"))).toBe(true);
  });
});

describe("situations de vie", () => {
  const slugs = new Set(MODULES.map((mod) => mod.slug));
  const speakingIds = new Set(SPEAKING_EXERCISES.map((exercise) => exercise.id));

  it("ne référencent que des modules et exercices oraux existants, sans doublon", () => {
    for (const situation of LIFE_SITUATIONS) {
      for (const slug of situation.moduleSlugs) expect(slugs.has(slug), `${situation.id} → ${slug}`).toBe(true);
      for (const id of situation.speakingExerciseIds) expect(speakingIds.has(id), `${situation.id} → ${id}`).toBe(true);
      expect(new Set(situation.moduleSlugs).size).toBe(situation.moduleSlugs.length);
    }
    expect(new Set(LIFE_SITUATIONS.map((situation) => situation.id)).size).toBe(LIFE_SITUATIONS.length);
  });

  it("chaque situation a assez de contenu pour exister (au moins 3 modules)", () => {
    for (const situation of LIFE_SITUATIONS) expect(situation.moduleSlugs.length, situation.id).toBeGreaterThanOrEqual(3);
  });

  it("n'y range aucun module d'examen, de bilan ou de banque d'écoute", () => {
    const all = LIFE_SITUATIONS.flatMap((situation) => situation.moduleSlugs);
    expect(all.filter((slug) => /bilan|delf|banque-ecoute|entrainement/.test(slug))).toEqual([]);
  });
});

describe("onboarding et capacités", () => {
  it("chaque intention d'onboarding mappe vers des objectifs existants", () => {
    for (const intent of GOAL_INTENTS) {
      const ids = intent.goalId ? [intent.goalId] : (intent.subGoalIds ?? []);
      expect(ids.length, intent.id).toBeGreaterThan(0);
      for (const id of ids) expect(getLearningGoalById(id), id).toBeDefined();
    }
  });

  it("la majorité des modules ont une capacité rédigée, distincte du titre", () => {
    const withCapability = PUBLIC_MODULES.filter((mod) => getModuleCapability(mod) !== mod.title);
    expect(withCapability.length / PUBLIC_MODULES.length).toBeGreaterThan(0.8);
  });
});

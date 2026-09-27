import { describe, expect, it } from "vitest";
import { mergeUserProgress, recordExerciseResult, refreshSkillProgressForCatalog } from "@/lib/pedagogy/logic/progress";
import { getDailyMinutes, normalizeDailyMinutes, DEFAULT_DAILY_MINUTES } from "@/lib/pedagogy/logic/preferences";
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";
import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import type { UserProgress } from "@/lib/pedagogy/types";

/**
 * Compatibilité des progressions existantes avec le chantier « coach
 * quotidien » : nouveau champ `dailyMinutes`, nouvelles compétences orales
 * `po-*`. Aucune ancienne progression ne doit devenir invalide, ni être
 * réinitialisée, ni perdre un exercice déjà fait.
 */
function base(overrides: Partial<UserProgress> = {}): UserProgress {
  return { ...EMPTY_USER_PROGRESS, userId: "u", ...overrides };
}

describe("préférence de temps quotidien", () => {
  it("valeur par défaut pour une progression qui n'a jamais choisi", () => {
    expect(getDailyMinutes(base())).toBe(DEFAULT_DAILY_MINUTES);
    expect(DEFAULT_DAILY_MINUTES).toBe(20);
  });

  it("n'accepte que 10, 20 ou 30", () => {
    expect(normalizeDailyMinutes(10)).toBe(10);
    expect(normalizeDailyMinutes(30)).toBe(30);
    expect(normalizeDailyMinutes(15)).toBeNull();
    expect(normalizeDailyMinutes("20")).toBeNull();
    expect(normalizeDailyMinutes(undefined)).toBeNull();
  });

  it("fusion multi-appareils : le choix local l'emporte, sinon celui du compte", () => {
    expect(mergeUserProgress(base({ dailyMinutes: 10 }), base({ dailyMinutes: 30 })).dailyMinutes).toBe(10);
    expect(mergeUserProgress(base(), base({ dailyMinutes: 30 })).dailyMinutes).toBe(30);
  });

  it("fusion de deux anciennes progressions sans ce champ : champ omis, jamais inventé", () => {
    const merged = mergeUserProgress(base(), base());
    expect("dailyMinutes" in merged).toBe(false);
    expect(getDailyMinutes(merged)).toBe(20);
  });

  it("fusion : une valeur invalide venant d'un client est ignorée", () => {
    const forged = { ...base(), dailyMinutes: 999 } as unknown as UserProgress;
    expect(mergeUserProgress(forged, base({ dailyMinutes: 20 })).dailyMinutes).toBe(20);
  });
});

describe("compétences orales ajoutées au catalogue", () => {
  const mod = getModuleBySlug("se-presenter")!;
  const exercises = mod.lessons.flatMap((lesson) => lesson.activities.flatMap((activity) => activity.exercises));
  const oral = exercises.find((exercise) => exercise.type === "production_orale")!;

  it("un exercice oral fait progresser une compétence orale, plus une compétence écrite", () => {
    const after = recordExerciseResult(base(), mod, oral, true);
    const oralSkill = after.skillProgress.find((sp) => sp.skillId === oral.skillId)!;
    expect(oral.skillId).toBe("po-se-presenter");
    expect(oralSkill.domain).toBe("production_orale");
    expect(oralSkill.completedExercises).toBe(1);
  });

  it("une ancienne progression (sans compétences po-*) est enrichie sans rien perdre", () => {
    // Simule une progression enregistrée AVANT l'ajout des compétences
    // orales : l'exercice oral est fait, mais aucune entrée `po-*`.
    const recorded = recordExerciseResult(base(), mod, oral, true);
    const legacy: UserProgress = {
      ...recorded,
      skillProgress: recorded.skillProgress.filter((sp) => !sp.skillId.startsWith("po-")),
    };

    const refreshed = refreshSkillProgressForCatalog(legacy);
    expect(refreshed.moduleProgress).toEqual(legacy.moduleProgress);
    expect(refreshed.placementCompletedAt).toBe(legacy.placementCompletedAt);
    expect(refreshed.skillProgress.find((sp) => sp.skillId === "po-se-presenter")?.completedExercises).toBe(1);
  });

  it("sans compétence manquante, la progression est renvoyée telle quelle (aucun recalcul inutile)", () => {
    const current = recordExerciseResult(base(), mod, oral, true);
    expect(refreshSkillProgressForCatalog(current)).toBe(current);
    const fresh = base();
    expect(refreshSkillProgressForCatalog(fresh)).toBe(fresh);
  });
});

describe("capacité d'un module (« ce que tu sauras faire »)", () => {
  it("extrait l'action de la description rédigée", () => {
    expect(
      getModuleCapability({
        title: "Problèmes du quotidien",
        description: "À la fin de ce module, tu pourras expliquer un problème et demander une solution.",
      })
    ).toBe("Expliquer un problème et demander une solution");
    expect(
      getModuleCapability({ title: "Ma maison", description: "À la fin de ce module, tu peux décrire ton logement." })
    ).toBe("Décrire ton logement");
  });

  it("retombe sur le titre si la description ne suit pas le gabarit", () => {
    expect(getModuleCapability({ title: "Banque d'écoute A1", description: "Des audios variés." })).toBe(
      "Banque d'écoute A1"
    );
    expect(getModuleCapability({ title: "Sans description" })).toBe("Sans description");
  });
});

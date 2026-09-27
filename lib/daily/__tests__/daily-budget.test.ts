import { describe, expect, it } from "vitest";
import { buildDailySession, buildSessionSteps } from "@/lib/daily/session-engine";
import { getTodayOverview } from "@/lib/daily/today";
import { makeProgress, makeSessionModule } from "@/lib/daily/__tests__/fixtures";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import { canAccess } from "@/lib/commerce/access";
import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import type { CEFRLevel, DailyMinutes, PublicModule, UserProgress } from "@/lib/pedagogy/types";

/**
 * Temps de travail habituel (`UserProgress.dailyMinutes`) : un seul moteur de
 * séance, simplement dimensionné — jamais trois moteurs. Et la première
 * séance d'un nouvel apprenant gratuit est accessible à SON niveau (A1, A2,
 * B1), sans paywall.
 */
const REVIEW = { description: "Point à revoir.", href: "/reviser" };

function lessonSteps(minutes: DailyMinutes | undefined) {
  const mod = makeSessionModule({ id: "budget", slug: "budget" });
  const progress = makeProgress({ dailyMinutes: minutes, lastActivityAt: "2026-06-14T10:00:00.000Z" });
  return buildSessionSteps(mod, progress, "apprentissage", REVIEW);
}

describe("séance du jour dimensionnée par le temps habituel", () => {
  it("10 min : un rappel et une seule activité", () => {
    const steps = lessonSteps(10);
    expect(steps.map((step) => step.kind)).toEqual(["rappel", "lesson"]);
  });

  it("20 min : un rappel et jusqu'à trois leçons", () => {
    const steps = lessonSteps(20);
    expect(steps[0]?.kind).toBe("rappel");
    const lessons = steps.filter((step) => step.kind === "lesson");
    expect(lessons.length).toBeGreaterThan(1);
    expect(lessons.length).toBeLessThanOrEqual(3);
  });

  it("30 min : plus de contenu qu'en 20 min, jamais moins", () => {
    expect(lessonSteps(30).length).toBeGreaterThanOrEqual(lessonSteps(20).length);
    expect(lessonSteps(20).length).toBeGreaterThanOrEqual(lessonSteps(10).length);
  });

  it("conserve l'ordre pédagogique des leçons, sans en sauter aucune", () => {
    const mod = makeSessionModule({ id: "ordre", slug: "ordre" });
    const steps = buildSessionSteps(mod, makeProgress({ dailyMinutes: 30 }), "apprentissage", null);
    const ids = steps.map((step) => step.lessonId);
    expect(ids).toEqual(mod.lessons.slice(0, ids.length).map((lesson) => lesson.id));
  });

  it("ancienne progression sans préférence : valeur par défaut (20 min), sans erreur", () => {
    expect(lessonSteps(undefined)).toEqual(lessonSteps(20));
  });

  it("valeur invalide (donnée corrompue) : ignorée au profit de la valeur par défaut", () => {
    const mod = makeSessionModule({ id: "budget", slug: "budget" });
    const corrupted = { ...makeProgress(), dailyMinutes: 45 } as unknown as UserProgress;
    expect(buildSessionSteps(mod, corrupted, "apprentissage", REVIEW)).toEqual(lessonSteps(20));
  });

  it("étiquette chaque étape par ce que l'apprenant fait (réviser, comprendre, parler…)", () => {
    const steps = lessonSteps(30);
    expect(steps[0]?.focus).toBe("reviser");
    const focuses = steps.slice(1).map((step) => step.focus);
    expect(focuses).toEqual(["decouvrir", "comprendre", "ecouter", "entrainer"]);
  });

  it("une leçon de production contenant un exercice oral est présentée comme « Parler »", () => {
    const mod = getModuleBySlug("se-presenter")!;
    const productionLesson = mod.lessons.find((lesson) =>
      lesson.activities.some((activity) => activity.exercises.some((exercise) => exercise.type === "production_orale"))
    )!;
    const steps = buildSessionSteps(
      { ...mod, lessons: [productionLesson] },
      makeProgress({ dailyMinutes: 30 }),
      "apprentissage",
      null
    );
    expect(steps[0]?.focus).toBe("parler");
  });

  it("le plan annonce une capacité (« ce que tu sauras faire »), pas seulement le titre du module", () => {
    const plan = buildDailySession(
      { ...EMPTY_USER_PROGRESS, userId: "u", level: "B1", placementCompletedAt: "2026-06-01T00:00:00.000Z" },
      PUBLIC_MODULES
    );
    expect(plan).not.toBeNull();
    expect(plan!.capability).not.toBe(plan!.moduleTitle);
    expect(plan!.capability).toMatch(/^[A-ZÀ-Ý]/);
    expect(plan!.dailyMinutes).toBe(20);
  });
});

describe("première séance gratuite à chaque niveau (A1, A2, B1)", () => {
  const isAccessibleFree = (mod: PublicModule) => canAccess({ kind: "module", slug: mod.slug }, null);

  it.each(["A1", "A2", "B1"] as CEFRLevel[])(
    "un nouvel apprenant gratuit estimé %s a une vraie séance accessible, à son niveau",
    (level) => {
      const progress: UserProgress = {
        ...EMPTY_USER_PROGRESS,
        userId: "nouveau",
        level,
        placementCompletedAt: "2026-06-01T00:00:00.000Z",
      };
      const today = getTodayOverview(progress, PUBLIC_MODULES, isAccessibleFree);
      expect(today.plan).not.toBeNull();
      expect(today.isFirstSession).toBe(true);
      const mod = PUBLIC_MODULES.find((candidate) => candidate.id === today.plan!.moduleId)!;
      expect(mod.level).toBe(level);
      expect(isAccessibleFree(mod)).toBe(true);
    }
  );

  it("une fois le module découverte terminé, la suite est verrouillée (paywall contextualisé), jamais vide", () => {
    const freeA1 = getModuleBySlug("se-presenter-a1")!;
    const allExerciseIds = freeA1.lessons.flatMap((lesson) =>
      lesson.activities.flatMap((activity) => activity.exercises.map((exercise) => exercise.id))
    );
    const progress: UserProgress = {
      ...EMPTY_USER_PROGRESS,
      userId: "decouverte",
      level: "A1",
      placementCompletedAt: "2026-06-01T00:00:00.000Z",
      lastActivityAt: "2026-06-02T00:00:00.000Z",
      moduleProgress: [
        {
          moduleId: freeA1.id,
          completed: true,
          completedLessonIds: freeA1.lessons.map((lesson) => lesson.id),
          completedExerciseIds: allExerciseIds,
          correctExerciseIds: allExerciseIds,
          lastActivityAt: "2026-06-02T00:00:00.000Z",
        },
      ],
    };
    const today = getTodayOverview(progress, PUBLIC_MODULES, isAccessibleFree, new Date("2026-06-03T00:00:00.000Z"));
    expect(today.plan).toBeNull();
    expect(today.lockedPlan).not.toBeNull();
    expect(today.lockedPlan!.moduleSlug).not.toBe("se-presenter-a1");
  });
});

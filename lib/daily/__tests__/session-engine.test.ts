import { describe, expect, it } from "vitest";
import {
  buildDailySession,
  buildDailySessionRecap,
  buildSessionSteps,
  determineDailySessionMode,
} from "@/lib/daily/session-engine";
import {
  makeModuleProgress,
  makeProgress,
  makeSessionModule,
  makeSessionPublicModule,
} from "@/lib/daily/__tests__/fixtures";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";

const NOW = new Date("2026-06-15T10:00:00.000Z");

/**
 * Un module par étape de contenu du parcours réel complet (A1 → A2 → B1,
 * voir `docs/integration/a1-a2-b1-integration.md` § 2 : parcours continu
 * sur 18 étapes) — pas seulement les 3 étapes B1, sans quoi les étapes
 * A1/A2 (0 module fourni) resteraient bloquées à 0 % et `getParcoursSummary`
 * ne verrait jamais l'étape B1 visée comme "étape courante". La dernière
 * étape de contenu (b1-consolidation) reçoit deux modules pour les
 * scénarios "fin de niveau" qui ont besoin d'une moyenne partielle.
 */
function stagedModules(): PublicModule[] {
  const contentStages = [...PARCOURS_STAGES]
    .filter((stage) => stage.kind === "content")
    .sort((a, b) => a.order - b.order);
  const lastStageId = contentStages[contentStages.length - 1]!.id;

  return contentStages.flatMap((stage) => {
    if (stage.id === lastStageId) {
      return [
        makeSessionPublicModule({ id: "conso-1", slug: "conso-1", stageId: stage.id }),
        makeSessionPublicModule({ id: "conso-2", slug: "conso-2", stageId: stage.id }),
      ];
    }
    return [makeSessionPublicModule({ id: `${stage.id}-mod`, slug: `${stage.id}-mod`, stageId: stage.id })];
  });
}

function completedProgress(mod: PublicModule): UserProgress["moduleProgress"][number] {
  const exerciseIds = mod.lessons.flatMap((l) => l.activities.flatMap((a) => a.exercises.map((e) => e.id)));
  return makeModuleProgress({
    moduleId: mod.id,
    completed: true,
    completedLessonIds: mod.lessons.map((l) => l.id),
    completedExerciseIds: exerciseIds,
    correctExerciseIds: exerciseIds,
    lastActivityAt: "2026-06-01T00:00:00.000Z",
  });
}

describe("buildDailySession — cas utilisateurs", () => {
  it("nouvel utilisateur : mode découverte, pas de rappel, séance non vide", () => {
    const mod = makeSessionPublicModule({ id: "m1", slug: "m1" });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW });

    expect(plan).not.toBeNull();
    expect(plan?.mode).toBe("decouverte");
    expect(plan?.moduleId).toBe("m1");
    expect(plan?.steps.length).toBeGreaterThan(0);
    expect(plan?.steps.some((s) => s.kind === "rappel")).toBe(false);
  });

  it("utilisateur A1 : aucun contenu A1 dans le catalogue → pas de crash, pas de séance", () => {
    const b1Module = makeSessionPublicModule({ id: "b1-only", slug: "b1-only" });
    const progress = makeProgress({ level: "A1" });
    const plan = buildDailySession(progress, [b1Module], { now: NOW });
    expect(plan).toBeNull();
  });

  it("utilisateur A2 : même garde-fou que A1", () => {
    const b1Module = makeSessionPublicModule({ id: "b1-only-2", slug: "b1-only-2" });
    const progress = makeProgress({ level: "A2" });
    const plan = buildDailySession(progress, [b1Module], { now: NOW });
    expect(plan).toBeNull();
  });

  it("utilisateur B1 : séance construite normalement à partir du vrai niveau", () => {
    const mod = makeSessionPublicModule({ id: "b1-normal", slug: "b1-normal" });
    const progress = makeProgress({ level: "B1" });
    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan).not.toBeNull();
    expect(plan?.moduleTitle).toBe(mod.title);
  });

  it("un apprenant testé A1 qui a terminé tout son niveau évalué obtient une séance A2, pas un blocage sur l'A1 épuisé", () => {
    // `progress.level` (résultat brut du test de positionnement) ne se met
    // jamais à jour tout seul en avançant dans le parcours unifié A1 → A2 →
    // B1 : sans `getEffectiveLevel`, filtrer le catalogue sur ce seul champ
    // laisserait la séance du jour bloquée sur un niveau entièrement épuisé
    // ("diagnostic A1 permanent") au lieu de suivre la vraie étape courante.
    const mods = stagedModules().map((mod) => ({
      ...mod,
      level: mod.stageId.startsWith("a1-") ? ("A1" as const) : mod.stageId.startsWith("a2-") ? ("A2" as const) : ("B1" as const),
    }));
    const a1Modules = mods.filter((m) => m.stageId.startsWith("a1-"));
    const a2Modules = mods.filter((m) => m.stageId.startsWith("a2-"));
    expect(a1Modules.length).toBeGreaterThan(0);
    expect(a2Modules.length).toBeGreaterThan(0);

    const progress = makeProgress({
      level: "A1",
      placementCompletedAt: "2025-01-01T00:00:00.000Z",
      lastActivityAt: "2026-06-14T00:00:00.000Z",
      moduleProgress: a1Modules.map((mod) => completedProgress(mod)),
    });

    const plan = buildDailySession(progress, mods, { now: NOW });

    expect(plan).not.toBeNull();
    expect(a2Modules.some((m) => m.id === plan?.moduleId)).toBe(true);
  });

  it("utilisateur en reprise : cible le module déjà commencé, mode reprise", () => {
    const inProgress = makeSessionPublicModule({ id: "in-progress", slug: "in-progress" });
    const other = makeSessionPublicModule({ id: "other", slug: "other" });
    const progress = makeProgress({
      lastActivityAt: "2026-06-14T09:00:00.000Z",
      placementCompletedAt: "2026-05-01T00:00:00.000Z",
      moduleProgress: [
        makeModuleProgress({
          moduleId: inProgress.id,
          completed: false,
          completedExerciseIds: [`${inProgress.id}-decouvrir-ex1`],
          lastActivityAt: "2026-06-14T09:00:00.000Z",
        }),
      ],
    });

    const plan = buildDailySession(progress, [inProgress, other], { now: NOW });
    expect(plan?.mode).toBe("reprise");
    expect(plan?.moduleId).toBe(inProgress.id);
    expect(plan?.isResuming).toBe(true);
  });

  it("module presque terminé : ne propose que la dernière leçon restante, jamais les leçons déjà faites", () => {
    const mod = makeSessionPublicModule({ id: "almost-done", slug: "almost-done" });
    const allButLast = mod.lessons.slice(0, -1).map((l) => l.id);
    const progress = makeProgress({
      lastActivityAt: "2026-06-14T09:00:00.000Z",
      placementCompletedAt: "2026-05-01T00:00:00.000Z",
      moduleProgress: [
        makeModuleProgress({
          moduleId: mod.id,
          completed: false,
          completedLessonIds: allButLast,
          completedExerciseIds: mod.lessons
            .slice(0, -1)
            .flatMap((l) => l.activities.flatMap((a) => a.exercises.map((e) => e.id))),
          lastActivityAt: "2026-06-14T09:00:00.000Z",
        }),
      ],
    });

    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan).not.toBeNull();
    const lessonSteps = plan!.steps.filter((s) => s.kind === "lesson");
    expect(lessonSteps).toHaveLength(1);
    expect(lessonSteps[0]!.lessonId).toBe(mod.lessons[mod.lessons.length - 1]!.id);
  });

  it("module déjà entièrement terminé mais ciblé (consolidation) : retombe sur ses leçons plutôt qu'une séance vide", () => {
    const mod = makeSessionPublicModule({ id: "finished", slug: "finished", skillId: "weak-skill" });
    const progress = makeProgress({
      level: "B1",
      globalSuccessRate: 40,
      weakSkillIds: ["weak-skill"],
      moduleProgress: [completedProgress(mod)],
    });

    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan).not.toBeNull();
    expect(plan?.steps.filter((s) => s.kind === "lesson").length).toBeGreaterThan(0);
  });

  it("absence d'audio : un module sans leçon « ecoute » ne fabrique jamais d'étape d'écoute", () => {
    const mod = makeSessionPublicModule({
      id: "no-audio",
      slug: "no-audio",
      lessonTypes: ["decouvrir", "comprendre", "entrainement"],
    });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan).not.toBeNull();
    expect(plan?.steps.some((s) => s.lessonType === "ecoute")).toBe(false);
  });

  it("absence de données : compétence faible et progression pointant vers un module inconnu n'empêchent jamais la séance", () => {
    const mod = makeSessionPublicModule({ id: "known", slug: "known" });
    const progress = makeProgress({
      lastActivityAt: "2026-06-14T09:00:00.000Z",
      placementCompletedAt: "2026-05-01T00:00:00.000Z",
      weakSkillIds: ["skill-that-does-not-exist-anywhere"],
      globalSuccessRate: 30,
      moduleProgress: [
        makeModuleProgress({
          moduleId: "module-removed-from-catalog",
          completed: false,
          lastActivityAt: "2026-06-10T00:00:00.000Z",
        }),
      ],
    });

    expect(() => buildDailySession(progress, [mod], { now: NOW })).not.toThrow();
    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan).not.toBeNull();
  });

  it("aucune référence invalide : le module et les leçons référencés existent tous dans le catalogue fourni", () => {
    const mods = stagedModules();
    const progress = makeProgress({ lastActivityAt: "2026-06-14T09:00:00.000Z", placementCompletedAt: "2026-05-01T00:00:00.000Z" });
    const plan = buildDailySession(progress, mods, { now: NOW });

    expect(plan).not.toBeNull();
    const targetModule = mods.find((m) => m.id === plan!.moduleId);
    expect(targetModule).toBeDefined();
    const realLessonIds = new Set(targetModule!.lessons.map((l) => l.id));
    for (const step of plan!.steps) {
      if (step.lessonId) expect(realLessonIds.has(step.lessonId)).toBe(true);
    }
  });

  it("durée cohérente : la durée totale est la somme exacte des étapes, toujours positive", () => {
    const mod = makeSessionPublicModule({ id: "duration", slug: "duration" });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW });

    expect(plan).not.toBeNull();
    const expectedTotal = plan!.steps.reduce((sum, s) => sum + s.estimatedMinutes, 0);
    expect(plan!.totalEstimatedMinutes).toBe(expectedTotal);
    expect(plan!.totalEstimatedMinutes).toBeGreaterThan(0);
  });

  it("ne propose jamais un module verrouillé : retombe sur null si tout est inaccessible", () => {
    const mod = makeSessionPublicModule({ id: "locked", slug: "locked" });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW, isAccessible: () => false });
    expect(plan).toBeNull();
  });

  it("retour après longue absence : plus de 14 jours d'inactivité déclenche le mode dédié", () => {
    const mod = makeSessionPublicModule({ id: "absence", slug: "absence" });
    const progress = makeProgress({
      placementCompletedAt: "2025-01-01T00:00:00.000Z",
      lastActivityAt: "2026-05-01T00:00:00.000Z", // 45 jours avant NOW
      moduleProgress: [
        makeModuleProgress({ moduleId: mod.id, completed: false, lastActivityAt: "2026-05-01T00:00:00.000Z" }),
      ],
    });
    const plan = buildDailySession(progress, [mod], { now: NOW });
    expect(plan?.mode).toBe("retour_apres_absence");
  });

  it("fin de niveau : dernière étape de contenu presque (mais pas totalement) terminée déclenche le mode dédié", () => {
    const mods = stagedModules();
    // Toutes les étapes de contenu qui précèdent la dernière (A1 → A2 → B1
    // début/intermédiaire, voir `stagedModules`) sont terminées : seule la
    // toute dernière étape de contenu (conso-1 + conso-2) reste ouverte.
    const conso2 = mods[mods.length - 1]!;
    const precedingModules = mods.slice(0, -1);
    // conso2 à 11/12 exercices (~92 %) : la moyenne de l'étape reste sous 100 %
    // (donc pas "termine", le mode ne bascule pas simplement parce qu'il n'y a
    // plus rien à faire), mais dépasse le seuil "presque fini".
    const conso2ExerciseIds = conso2.lessons.flatMap((l) => l.activities.flatMap((a) => a.exercises.map((e) => e.id)));
    const progress = makeProgress({
      placementCompletedAt: "2025-01-01T00:00:00.000Z",
      lastActivityAt: "2026-06-14T00:00:00.000Z",
      moduleProgress: [
        ...precedingModules.map((mod) => completedProgress(mod)),
        makeModuleProgress({
          moduleId: conso2.id,
          completed: false,
          completedExerciseIds: conso2ExerciseIds.slice(0, -1),
          correctExerciseIds: conso2ExerciseIds.slice(0, -1),
          lastActivityAt: "2026-06-13T00:00:00.000Z",
        }),
      ],
    });
    const plan = buildDailySession(progress, mods, { now: NOW });
    expect(plan?.mode).toBe("fin_de_niveau");
  });

  it("consolidation : cible un module qui travaille la compétence faible connue", () => {
    const weakModule = makeSessionPublicModule({ id: "weak-target", slug: "weak-target", skillId: "grammaire-x" });
    const otherModule = makeSessionPublicModule({ id: "other-target", slug: "other-target" });
    const progress = makeProgress({
      placementCompletedAt: "2025-01-01T00:00:00.000Z",
      lastActivityAt: "2026-06-14T00:00:00.000Z",
      globalSuccessRate: 40,
      weakSkillIds: ["grammaire-x"],
      moduleProgress: [
        makeModuleProgress({ moduleId: otherModule.id, completed: false, lastActivityAt: "2026-06-13T00:00:00.000Z" }),
      ],
    });

    const plan = buildDailySession(progress, [otherModule, weakModule], { now: NOW });
    expect(plan?.mode).toBe("consolidation");
    expect(plan?.moduleId).toBe(weakModule.id);
    expect(plan?.focusSkillId).toBe("grammaire-x");
  });
});

describe("buildSessionSteps — dédoublonnage", () => {
  it("aucune activité dupliquée même si une leçon apparaît deux fois dans la source", () => {
    const mod = makeSessionModule({ id: "dup-test", slug: "dup-test", lessonTypes: ["decouvrir"] });
    const duplicatedLesson = mod.lessons[0]!;
    const modWithDuplicate = { ...mod, lessons: [duplicatedLesson, duplicatedLesson] };
    const progress = makeProgress();

    const steps = buildSessionSteps(modWithDuplicate, progress, "apprentissage", null);
    const lessonIds = steps.filter((s) => s.kind === "lesson").map((s) => s.lessonId);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
  });
});

describe("determineDailySessionMode", () => {
  it("nouvel utilisateur sans aucune activité ni test de positionnement → découverte", () => {
    expect(determineDailySessionMode(makeProgress(), [], NOW)).toBe("decouverte");
  });
});

describe("buildDailySessionRecap", () => {
  it("calcule un taux de réussite nul (pas 0 %) quand aucun exercice n'a été tenté", () => {
    const mod = makeSessionPublicModule({ id: "recap-1", slug: "recap-1" });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW })!;

    const recap = buildDailySessionRecap({
      plan,
      completedStepIds: [],
      results: [],
      progress,
      modules: [mod],
    });

    expect(recap.successRate).toBeNull();
    expect(recap.attemptedCount).toBe(0);
  });

  it("calcule un taux de réussite correct quand des exercices ont été tentés", () => {
    const mod = makeSessionPublicModule({ id: "recap-2", slug: "recap-2" });
    const progress = makeProgress();
    const plan = buildDailySession(progress, [mod], { now: NOW })!;

    const recap = buildDailySessionRecap({
      plan,
      completedStepIds: [plan.steps[0]!.id],
      results: [{ correct: true }, { correct: true }, { correct: false }],
      progress,
      modules: [mod],
    });

    expect(recap.attemptedCount).toBe(3);
    expect(recap.correctCount).toBe(2);
    expect(recap.successRate).toBe(67);
    expect(recap.workedOnTitles).toContain(plan.steps[0]!.title);
  });
});

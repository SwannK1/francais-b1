import { describe, expect, it } from "vitest";
import { getEffectiveLevel, getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { makeModuleProgress, makeProgress, makePublicModule } from "@/lib/pedagogy/logic/__tests__/fixtures";
import type { PublicModule, StageId, UserProgress } from "@/lib/pedagogy/types";

/**
 * Un module par étape de contenu réelle (A1 → A2 → B1, 12 des 18 étapes du
 * parcours — les 6 `practice`/`bilan` n'ont volontairement aucun module
 * rattaché, voir `getStageCompletionRate`). Même principe que
 * `lib/daily/__tests__/session-engine.test.ts` : contenu synthétique, jamais
 * le vrai catalogue, pour ne pas dépendre du contenu pédagogique réel.
 */
function contentStageModules(): PublicModule[] {
  return PARCOURS_STAGES.filter((stage) => stage.kind === "content").map((stage) =>
    makePublicModule({ id: `${stage.id}-mod`, slug: `${stage.id}-mod`, stageId: stage.id as StageId })
  );
}

function completeModule(mod: PublicModule): UserProgress["moduleProgress"][number] {
  return makeModuleProgress({
    moduleId: mod.id,
    completed: true,
    completedExerciseIds: [`${mod.id}-ex1`],
    correctExerciseIds: [`${mod.id}-ex1`],
    lastActivityAt: "2026-06-01T00:00:00.000Z",
  });
}

function progressWithCompletedStages(
  modules: PublicModule[],
  stageIdsToComplete: string[],
  overrides: Partial<UserProgress> = {}
): UserProgress {
  const moduleProgress = modules
    .filter((mod) => stageIdsToComplete.includes(mod.stageId))
    .map((mod) => completeModule(mod));
  return makeProgress({ moduleProgress, ...overrides });
}

describe("getParcoursSummary — readyForB1", () => {
  const modules = contentStageModules();
  const a1ContentStages = PARCOURS_STAGES.filter((s) => s.kind === "content" && s.id.startsWith("a1-")).map(
    (s) => s.id
  );
  const a2ContentStages = PARCOURS_STAGES.filter((s) => s.kind === "content" && s.id.startsWith("a2-")).map(
    (s) => s.id
  );
  const b1ContentStages = PARCOURS_STAGES.filter(
    (s) => s.kind === "content" && !s.id.startsWith("a1-") && !s.id.startsWith("a2-")
  ).map((s) => s.id);

  // "faire-le-point" (B1) et "a2-faire-le-point" partagent le même champ
  // global `progress.placementCompletedAt` (voir `getStageCompletionRate`,
  // kind "diagnostic") : sans lui, `currentStage` reste bloqué sur
  // "a2-faire-le-point" (ordre 7, avant tout contenu A2) quelle que soit la
  // progression réelle sur les modules A2/B1 — comportement préexistant, pas
  // celui corrigé par ce chantier, mais nécessaire pour simuler un
  // utilisateur qui a dépassé ce palier.
  const placementDone = { placementCompletedAt: "2026-01-01T00:00:00.000Z" };

  it("18 étapes au total, 6 practice/bilan qui ne comptent jamais comme terminées (régression du bug corrigé)", () => {
    // Même avec tout le contenu réel (A1+A2+B1) et les 2 diagnostics
    // terminés, completedStages ne peut jamais atteindre totalStages :
    // c'est exactement pourquoi `readyForB1` n'est plus défini comme
    // `completedStages === totalStages`.
    const progress = progressWithCompletedStages(
      modules,
      [...a1ContentStages, ...a2ContentStages, ...b1ContentStages],
      placementDone
    );
    const summary = getParcoursSummary(progress, modules);
    expect(summary.totalStages).toBe(18);
    expect(summary.completedStages).toBe(summary.totalStages - 6);
    expect(summary.completedStages).not.toBe(summary.totalStages);
  });

  it("utilisateur clairement non prêt : rien de commencé", () => {
    const progress = makeProgress();
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(false);
    expect(summary.currentStage?.id.startsWith("a1-")).toBe(true);
  });

  it("utilisateur proche du seuil : A1 terminé, A2 presque fini (dernière étape de contenu A2 manquante) — pas encore prêt", () => {
    const almostAllA2 = a2ContentStages.slice(0, -1);
    const progress = progressWithCompletedStages(modules, [...a1ContentStages, ...almostAllA2], placementDone);
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(false);
    expect(summary.currentStage?.id.startsWith("a2-")).toBe(true);
  });

  it("utilisateur ayant terminé A2 : A1 et A2 entièrement terminés → prêt pour le B1", () => {
    const progress = progressWithCompletedStages(modules, [...a1ContentStages, ...a2ContentStages], placementDone);
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(true);
    // L'étape courante avance bien jusqu'au B1 (ni a1- ni a2-), sans jamais
    // rester bloquée sur les bilans/practice A2 qui ne se terminent jamais.
    expect(summary.currentStage).not.toBeNull();
    expect(summary.currentStage?.id.startsWith("a1-")).toBe(false);
    expect(summary.currentStage?.id.startsWith("a2-")).toBe(false);
  });

  it("utilisateur réellement prêt : A1+A2 terminés et déjà avancé en B1 — reste prêt (monotone)", () => {
    const progress = progressWithCompletedStages(
      modules,
      [...a1ContentStages, ...a2ContentStages, b1ContentStages[0]!],
      placementDone
    );
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(true);
  });

  it("utilisateur ayant terminé tout le contenu A1+A2+B1 : prêt, currentStage devient null (fin de parcours)", () => {
    const progress = progressWithCompletedStages(
      modules,
      [...a1ContentStages, ...a2ContentStages, ...b1ContentStages],
      placementDone
    );
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(true);
    expect(summary.currentStage).toBeNull();
  });

  it("utilisateur avec compétences fragiles restantes : readyForB1 reste défini uniquement par la progression du parcours, pas par weakSkillIds", () => {
    const progress = progressWithCompletedStages(modules, [...a1ContentStages, ...a2ContentStages], {
      ...placementDone,
      weakSkillIds: ["ce-textes-courants", "po-recit-simple"],
      globalSuccessRate: 42,
    });
    const summary = getParcoursSummary(progress, modules);
    expect(summary.readyForB1).toBe(true);
  });
});

describe("getEffectiveLevel — plafond B1", () => {
  const modules = contentStageModules();

  it("un résultat de diagnostic B2 (au-dessus du plafond du catalogue) est ramené à B1, jamais exposé tel quel", () => {
    const progress = makeProgress({ level: "B2" });
    expect(getEffectiveLevel(progress, modules)).toBe("B1");
  });

  it("B2 plafonné à B1 même avec une vraie progression A1/A2 en dessous (le plafond gagne, pas la progression réelle)", () => {
    const progress = progressWithCompletedStages(modules, [
      ...PARCOURS_STAGES.filter((s) => s.kind === "content" && s.id.startsWith("a1-")).map((s) => s.id),
    ]);
    expect(getEffectiveLevel({ ...progress, level: "B2" }, modules)).toBe("B1");
  });
});

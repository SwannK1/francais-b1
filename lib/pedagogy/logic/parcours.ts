import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { getModuleCompletionRate, statusFromCompletionRate, type ModuleStatus } from "@/lib/pedagogy/logic/progress";
import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { CEFRLevel, PublicModule, UserProgress } from "@/lib/pedagogy/types";

/** Mêmes 3 valeurs que `ModuleStatus` (voir `logic/progress.ts`) — nom distinct pour la clarté au point d'appel. */
export type StageStatus = ModuleStatus;

/**
 * Modules réels rattachés à une étape, triés comme dans `MODULES`. Source de
 * vérité unique pour "quels modules appartiennent à cette étape" — dérivée
 * exclusivement de `Module.stageId`, jamais du domaine ou de l'ordre.
 * `PublicModule[]` (jamais le contenu complet) : ce module est importé côté
 * client (progression, parcours) — voir `docs/architecture/user-lifecycle.md`
 * § Premium content boundary.
 */
export function getStageModules(stage: ParcoursStage, modules: PublicModule[]): PublicModule[] {
  return modules.filter((mod) => mod.stageId === stage.id);
}

/**
 * Taux de progression 0-100 d'une étape.
 * "diagnostic" : binaire (test passé ou non). "content" : moyenne de
 * complétion des modules réels. "practice"/"bilan" : pas de métrique fiable
 * pour l'instant (pas de suivi des tentatives d'examen) → toujours 0, ces
 * étapes n'affichent pas de barre de progression dans l'UI.
 */
export function getStageCompletionRate(
  stage: ParcoursStage,
  progress: UserProgress,
  modules: PublicModule[]
): number {
  if (stage.kind === "diagnostic") {
    return progress.placementCompletedAt ? 100 : 0;
  }
  if (stage.kind === "content") {
    const stageModules = getStageModules(stage, modules);
    if (stageModules.length === 0) return 0;
    const total = stageModules.reduce(
      (sum, mod) => sum + getModuleCompletionRate(progress, mod.id, mod.totalExercises),
      0
    );
    return Math.round(total / stageModules.length);
  }
  return 0;
}

export function getStageStatus(
  stage: ParcoursStage,
  progress: UserProgress,
  modules: PublicModule[]
): StageStatus {
  return statusFromCompletionRate(getStageCompletionRate(stage, progress, modules));
}

export interface ParcoursSummary {
  totalStages: number;
  completedStages: number;
  currentStage: ParcoursStage | null;
  /**
   * "Prêt pour le B1" : l'apprenant a terminé tout le contenu A1 et A2 (les
   * étapes `practice`/`bilan` de ces deux niveaux ne comptent pas — voir
   * `currentStage` ci-dessous, aucune métrique fiable pour elles) et a donc
   * atteint le B1. Volontairement **pas** `completedStages === totalStages` :
   * ce calcul est mathématiquement inatteignable dès qu'un seul des 6
   * étapes `practice`/`bilan` du parcours à 18 étapes existe, puisqu'aucune
   * d'elles ne peut jamais passer à "terminé" (`docs/integration/product-v1.md`
   * § 2.2 et § 8, régression documentée mais non corrigée avant ce chantier).
   * Défini à la place à partir de `currentStage`, qui saute déjà ces étapes
   * sans métrique pour trouver la première étape de contenu réelle non
   * terminée : `readyForB1` est vrai dès que cette étape courante est une
   * étape B1 (préfixe ni `a1-` ni `a2-`) ou qu'il n'en reste plus (parcours
   * intégralement parcouru). Volontairement indépendant de
   * `progress.weakSkillIds` : la maîtrise des compétences fragiles reste du
   * ressort de la révision espacée (`/reviser`), pas une condition
   * supplémentaire ajoutée ici sans base dans le système existant.
   */
  readyForB1: boolean;
}

/** Vue d'ensemble du parcours : étapes terminées et étape courante (première non terminée). */
export function getParcoursSummary(progress: UserProgress, modules: PublicModule[]): ParcoursSummary {
  const stages = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);
  const statuses = stages.map((stage) => ({
    stage,
    status: getStageStatus(stage, progress, modules),
  }));

  const completedStages = statuses.filter((s) => s.status === "termine").length;
  // "practice"/"bilan" n'ont pas de métrique fiable (toujours 0, voir
  // `getStageCompletionRate`) : depuis que le parcours unifié A1 → A2 → B1
  // (`docs/integration/a1-a2-b1-integration.md` § 2) place ce genre d'étape
  // au milieu du parcours (fin de chaque niveau), et pas seulement à la
  // toute fin comme dans l'ancien parcours B1 seul, une étape "practice"/
  // "bilan" jamais "terminée" bloquerait à tort la détection de l'étape
  // courante dès la fin du premier niveau. Elle n'est donc jamais retenue
  // comme étape courante ; si c'est la dernière étape du parcours, la
  // recherche ne trouve rien et `currentStage` devient `null` (voir
  // `determineDailySessionMode`, qui traite ce cas comme fin de parcours).
  const currentStage =
    statuses.find((s) => s.status !== "termine" && s.stage.kind !== "practice" && s.stage.kind !== "bilan")
      ?.stage ?? null;

  const readyForB1 =
    currentStage === null || (!currentStage.id.startsWith("a1-") && !currentStage.id.startsWith("a2-"));

  return { totalStages: stages.length, completedStages, currentStage, readyForB1 };
}

/** Même convention que `readyForB1` ci-dessus : le préfixe d'id de l'étape porte le niveau, jamais déduit d'autre chose. */
function levelOfStage(stage: ParcoursStage): CEFRLevel {
  if (stage.id.startsWith("a1-")) return "A1";
  if (stage.id.startsWith("a2-")) return "A2";
  return "B1";
}

/**
 * Niveau réel "où en suis-je maintenant" — distinct de `progress.level`
 * ("où dois-je commencer", le résultat brut du dernier test de
 * positionnement, voir `docs/product/diagnostic-progress-integration.md`
 * § règle de priorité). Basé sur `currentStage` (même source que
 * `readyForB1`) plutôt que sur un comptage d'exercices : dès qu'un
 * apprenant termine tout le contenu de son niveau évalué, `currentStage`
 * bascule déjà sur la première étape non terminée du niveau suivant — y
 * compris avant qu'il n'y ait touché le moindre exercice. Sans cette
 * fonction, `/progression`, `/parcours/seance` et la séance du jour, qui
 * filtrent leur catalogue par niveau, resteraient bloqués indéfiniment sur
 * l'ancien niveau évalué dès qu'il est entièrement terminé — plus aucun
 * module incomplet dans ce sous-ensemble, donc plus aucune recommandation,
 * alors qu'un parcours réel existe au niveau suivant (le bug documenté
 * "diagnostic B1 permanent", généralisé à n'importe quel niveau de départ).
 * Ne redescend jamais en dessous de `progress.level` : parcours entièrement
 * terminé (`currentStage === null`) est traité comme B1, le niveau le plus
 * haut du catalogue actuel.
 *
 * Plafonné à B1 : `progress.level` brut peut valoir "B2" (résultat du test
 * de positionnement au-dessus du plafond du catalogue, voir
 * `lib/pedagogy/data/placement-questions.ts` et le message dédié de
 * `/test-niveau`), mais aucun module/étape "B2" n'existe. Sans ce plafond,
 * les 6 appelants qui filtrent leur catalogue par égalité stricte sur ce
 * niveau (`/parcours`, `/progression`, `/parcours/seance`, la séance du
 * jour, `getNextModule`) se retrouvaient avec un sous-ensemble vide — même
 * classe de bug que celle documentée ci-dessus pour un niveau évalué
 * entièrement terminé, ici pour un niveau qui n'a jamais existé dans le
 * catalogue.
 */
export function getEffectiveLevel(progress: UserProgress, modules: PublicModule[]): CEFRLevel {
  const summary = getParcoursSummary(progress, modules);
  const reachedLevel = summary.currentStage ? levelOfStage(summary.currentStage) : "B1";
  const level =
    CEFR_LEVELS.indexOf(reachedLevel) > CEFR_LEVELS.indexOf(progress.level) ? reachedLevel : progress.level;
  return level === "B2" ? "B1" : level;
}

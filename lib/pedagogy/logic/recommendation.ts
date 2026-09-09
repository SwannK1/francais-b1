import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getModuleProgress } from "@/lib/pedagogy/logic/progress";
import { getEffectiveLevel, getStageModules } from "@/lib/pedagogy/logic/parcours";
import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { PublicModule, UserProgress } from "@/lib/pedagogy/types";

export interface NextModuleTarget {
  module: PublicModule;
  stage: ParcoursStage;
  /** true si l'apprenant a déjà commencé ce module (reprise), false pour une découverte. */
  isResuming: boolean;
}

/**
 * Identifie le module à proposer en priorité pour "Continuer mon parcours"
 * (utilisé par `PrimaryCta`, le CTA "Reprendre" et le mini-bilan de fin de
 * module) :
 * 1. Parmi les modules déjà commencés mais pas terminés, le plus récemment
 *    actif et accessible (reprise) — pas seulement le plus récent tout
 *    court : un module resté "en cours" peut être devenu verrouillé entre
 *    temps (ex. abonnement expiré), on ne doit jamais y renvoyer.
 * 2. Sinon, le premier module non terminé et accessible, dans l'ordre des
 *    étapes du parcours.
 * `isAccessible` reste optionnel et par défaut permissif : ce fichier ne
 * décide jamais lui-même de ce qui est verrouillé (seul `lib/commerce/access.ts`
 * le fait, voir son en-tête) — l'appelant (une page, qui connaît le statut
 * premium de la session) injecte cette règle. `PrimaryCta` appelle encore la
 * fonction sans ce paramètre (comportement historique, géré différemment
 * côté appelant) ; les nouveaux appelants (Reprendre, mini-bilan) l'utilisent.
 * Fonction pure, sans hypothèse au-delà de ce que `UserProgress` suit déjà
 * (`lastActivityAt`, `completed`). Ne filtre pas les modules "pas encore
 * rédigés" : aucun stub n'existe actuellement dans `MODULES`, ce filtrage
 * n'a donc pas lieu d'être pour l'instant.
 *
 * Pour une découverte (pas de reprise possible), ne propose jamais un
 * module d'un niveau strictement inférieur au niveau effectif de
 * l'apprenant (`getEffectiveLevel`, voir `lib/pedagogy/logic/parcours.ts`) :
 * sans ce plancher, un profil B1 sans `moduleProgress` (cas du tout premier
 * module après le test) se voyait renvoyé au tout premier module A1,
 * contredisant la promesse faite sur l'écran de résultat ("on t'emmène à
 * partir de là, pas de zéro"). Basé sur le niveau *effectif* plutôt que le
 * seul `progress.level` brut : un apprenant qui a réellement avancé
 * au-delà de son dernier test de positionnement ne doit jamais se voir
 * proposer un module en dessous de ce qu'il a déjà réellement acquis non
 * plus. Toujours calculé sur `PUBLIC_MODULES` (le catalogue complet),
 * jamais sur le `modules` reçu en paramètre : cette fonction est aussi
 * appelée avec un sous-ensemble déjà filtré par niveau (voir
 * `lib/daily/session-engine.ts`, `pickTargetModule`) — y calculer le niveau
 * effectif à partir de ce même sous-ensemble fausserait la détection
 * d'étape courante de `getEffectiveLevel` (des étapes d'un autre niveau
 * verraient 0 module et paraîtraient "jamais terminées"). Si aucun module
 * ne satisfait ce plancher (ex. tout ce qui est au niveau annoncé ou
 * au-dessus est déjà terminé, ou verrouillé pour un utilisateur gratuit —
 * voir l'asymétrie gratuit/premium documentée et volontairement inchangée
 * dans `recommendation.test.ts`), on retombe sur la recherche sans plancher
 * plutôt que de renvoyer `null` à tort.
 */
export function getNextModule(
  progress: UserProgress,
  modules: PublicModule[],
  options?: { isAccessible?: (mod: PublicModule) => boolean }
): NextModuleTarget | null {
  const isAccessible = options?.isAccessible ?? (() => true);
  const stagesInOrder = [...PARCOURS_STAGES].sort((a, b) => a.order - b.order);

  const inProgressCandidates = progress.moduleProgress
    .filter((mp) => !mp.completed && mp.lastActivityAt)
    .sort((a, b) => (a.lastActivityAt! < b.lastActivityAt! ? 1 : -1));

  for (const mp of inProgressCandidates) {
    const mod = modules.find((m) => m.id === mp.moduleId);
    if (!mod || !isAccessible(mod)) continue;
    const stage = stagesInOrder.find((s) => s.id === mod.stageId);
    if (stage) return { module: mod, stage, isResuming: true };
  }

  const isNextCandidate = (mod: PublicModule) =>
    !getModuleProgress(progress, mod.id)?.completed && isAccessible(mod);

  const effectiveLevel = getEffectiveLevel(progress, PUBLIC_MODULES);
  const levelFloorIndex = effectiveLevel ? CEFR_LEVELS.indexOf(effectiveLevel) : -1;
  const meetsLevelFloor = (mod: PublicModule) =>
    levelFloorIndex < 0 || CEFR_LEVELS.indexOf(mod.level) >= levelFloorIndex;

  for (const stage of stagesInOrder) {
    const next = getStageModules(stage, modules).find(
      (mod) => isNextCandidate(mod) && meetsLevelFloor(mod)
    );
    if (next) {
      return { module: next, stage, isResuming: false };
    }
  }

  if (levelFloorIndex >= 0) {
    for (const stage of stagesInOrder) {
      const next = getStageModules(stage, modules).find(isNextCandidate);
      if (next) {
        return { module: next, stage, isResuming: false };
      }
    }
  }

  return null;
}

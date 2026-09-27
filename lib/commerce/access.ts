import type { StageId } from "@/lib/pedagogy/types";

/**
 * Primitive centrale de contrôle d'accès — le seul endroit du code qui
 * décide si une ressource pédagogique est gratuite ou réservée à l'offre
 * complète. Tout écran qui a besoin de savoir "est-ce que j'affiche ce
 * contenu ou une incitation à payer" appelle `canAccess()` ici, plutôt que
 * de coder sa propre condition (`if (premium) ...`) dispersée dans les
 * composants.
 *
 * Source de vérité du statut premium : `AuthUser.premiumUntil`
 * (lib/auth/users.ts), écrit uniquement par le webhook Stripe
 * (app/api/webhooks/stripe/route.ts) après un paiement confirmé — jamais
 * par le client. Ce fichier ne lit lui-même ni cookie ni session : il reste
 * une fonction pure (`canAccess(resource, premiumUntil)`) pour rester
 * utilisable aussi bien dans un Server Component (qui obtient `premiumUntil`
 * via `getCurrentUser()`, lib/auth/dal.ts) que dans un Client Component
 * (qui l'obtient via `useAuth().user?.premiumUntil`, lib/auth/AuthProvider.tsx) —
 * sans jamais importer de code serveur (accès DB/cookies) dans un composant
 * client. La décision de sécurité réelle (bloquer l'accès à une ressource
 * payante) est prise côté serveur, dans les pages qui appellent cette
 * fonction avec le `premiumUntil` de la session ; un appel client ne sert
 * qu'à l'affichage (badge "Offre complète" avant même de cliquer).
 */

export type AccessLevel = "free" | "premium";

export type AccessResource =
  | { kind: "stage"; stageId: StageId }
  | { kind: "module"; slug: string }
  | { kind: "exam"; slug: string }
  | { kind: "speaking"; exerciseId: string }
  | { kind: "assessment"; checkpointId: string };

/** Étapes intégralement gratuites (test de positionnement : sert à qualifier le visiteur, pas à le retenir). */
const FREE_STAGE_IDS: StageId[] = ["faire-le-point"];

/**
 * Modules offerts en découverte gratuite, pour essayer réellement la
 * méthode avant de payer — au moins un vrai module à chaque niveau, pour
 * que tout apprenant puisse faire une vraie séance adaptée à son niveau
 * estimé avant de voir un paywall.
 *
 * Chaque module choisi est le PREMIER module de contenu de son niveau
 * (`se-presenter-a1`, `se-presenter-en-detail`, `se-presenter`) : c'est
 * précisément celui que `getNextModule` / `buildDailySession`
 * (lib/pedagogy/logic/recommendation.ts, lib/daily/session-engine.ts)
 * proposent comme première séance après le test de niveau — la découverte
 * gratuite et la première séance recommandée coïncident donc par
 * construction, sans aucun cas particulier dans les moteurs.
 * `decrire-vie-quotidienne` (B1) reste offert comme avant : on ne retire
 * jamais un accès gratuit déjà annoncé.
 *
 * Historique : jusqu'au chantier « coach quotidien », seuls deux modules B1
 * étaient gratuits — un apprenant estimé A1/A2 tombait sur le paywall dès
 * sa première séance (voir `docs/product/free-premium-audit.md`).
 */
const FREE_MODULE_SLUGS: string[] = [
  "se-presenter-a1",
  "se-presenter-en-detail",
  "se-presenter",
  "decrire-vie-quotidienne",
];

/** Exposé pour l'affichage (offre, paywall) — jamais pour une décision d'accès, qui passe par `canAccess`. */
export const FREE_DISCOVERY_MODULE_SLUGS: readonly string[] = FREE_MODULE_SLUGS;

/**
 * Exercices oraux offerts en découverte gratuite (chantier speaking-assessment,
 * `lib/speaking/`) — un exercice de chaque famille la plus simple (répétition,
 * situation) pour essayer la zone "Expression orale" avant de payer, même
 * logique que `FREE_MODULE_SLUGS`.
 */
const FREE_SPEAKING_EXERCISE_IDS: string[] = ["repetition-bonjour", "situation-se-presenter"];

export function isFreeResource(resource: AccessResource): boolean {
  switch (resource.kind) {
    case "stage":
      return FREE_STAGE_IDS.includes(resource.stageId);
    case "module":
      return FREE_MODULE_SLUGS.includes(resource.slug);
    case "exam":
      // Aucun examen blanc n'est offert en découverte : c'est la valeur
      // principale de l'offre complète (voir lib/commerce/plans.ts).
      return false;
    case "speaking":
      return FREE_SPEAKING_EXERCISE_IDS.includes(resource.exerciseId);
    case "assessment":
      // Même raisonnement que "exam" : les évaluations de passage sont une
      // valeur de l'offre complète, pas un contenu de découverte.
      return false;
  }
}

/** `premiumUntil` vient de `AuthUser`/`SessionUser` — `null` (jamais abonné/résilié) ou une date ISO passée compte comme non premium. */
export function isPremiumActive(premiumUntil: string | null | undefined): boolean {
  if (!premiumUntil) return false;
  return new Date(premiumUntil).getTime() > Date.now();
}

export function canAccess(resource: AccessResource, premiumUntil: string | null | undefined): boolean {
  if (isFreeResource(resource)) return true;
  return isPremiumActive(premiumUntil);
}

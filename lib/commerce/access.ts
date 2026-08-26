import type { StageId } from "@/lib/pedagogy/types";

/**
 * Primitive centrale de contrôle d'accès — le seul endroit du code qui
 * décide si une ressource pédagogique est gratuite ou réservée à l'offre
 * complète. Tout écran qui a besoin de savoir "est-ce que j'affiche ce
 * contenu ou une incitation à payer" appelle `canAccess()` ici, plutôt que
 * de coder sa propre condition (`if (premium) ...`) dispersée dans les
 * composants.
 *
 * DÉPENDANCE CHANTIER AUTH — lire avant de modifier `getCurrentAccessLevel` :
 * ce worktree n'a pas d'authentification ni de session utilisateur
 * persistée côté serveur (voir `lib/pedagogy/useProgress.ts`, qui stocke la
 * progression uniquement en localStorage, sans compte). Il est donc
 * impossible de savoir ici qui est connecté ni si cette personne a payé.
 * `getCurrentAccessLevel` retourne donc toujours "free" pour l'instant —
 * ce n'est pas un bug, c'est la frontière du chantier commerce tant que le
 * chantier auth n'est pas fusionné. Quand une session existera (ex. via un
 * `getServerSession()` ou équivalent), remplacer le corps de cette fonction
 * par une vraie lecture de l'entitlement associé à l'utilisateur (voir aussi
 * le TODO dans `app/api/webhooks/stripe/route.ts`, qui est le point où cet
 * entitlement doit être écrit après paiement).
 */

export type AccessLevel = "free" | "premium";

export type AccessResource =
  | { kind: "stage"; stageId: StageId }
  | { kind: "module"; slug: string }
  | { kind: "exam"; slug: string };

/** Étapes intégralement gratuites (test de positionnement : sert à qualifier le visiteur, pas à le retenir). */
const FREE_STAGE_IDS: StageId[] = ["faire-le-point"];

/**
 * Modules offerts en découverte gratuite, pour essayer réellement la
 * méthode avant de payer. Choisis parmi les modules fondateurs de la phase
 * "Poser les bases du B1" (voir `lib/pedagogy/data/modules.ts`), pas par
 * ordre arbitraire du tableau.
 */
const FREE_MODULE_SLUGS: string[] = ["se-presenter", "decrire-vie-quotidienne"];

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
  }
}

/** Toujours "free" tant que le chantier auth n'est pas intégré — voir le bloc de commentaire en tête de fichier. */
export function getCurrentAccessLevel(): AccessLevel {
  return "free";
}

export function canAccess(resource: AccessResource): boolean {
  if (isFreeResource(resource)) return true;
  return getCurrentAccessLevel() === "premium";
}

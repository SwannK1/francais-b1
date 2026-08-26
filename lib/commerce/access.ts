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

/** `premiumUntil` vient de `AuthUser`/`SessionUser` — `null` (jamais abonné/résilié) ou une date ISO passée compte comme non premium. */
export function isPremiumActive(premiumUntil: string | null | undefined): boolean {
  if (!premiumUntil) return false;
  return new Date(premiumUntil).getTime() > Date.now();
}

export function canAccess(resource: AccessResource, premiumUntil: string | null | undefined): boolean {
  if (isFreeResource(resource)) return true;
  return isPremiumActive(premiumUntil);
}

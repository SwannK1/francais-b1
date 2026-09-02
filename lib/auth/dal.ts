import { cache } from "react";
import { getSessionUserId } from "@/lib/auth/session";
import { findUserById, type AuthUser } from "@/lib/auth/users";

/**
 * Mémoïsé par passe de rendu (React `cache`) : plusieurs composants serveur
 * peuvent appeler `getCurrentUser()` sans multiplier les lectures de cookie
 * et de base de données.
 *
 * Ne remonte jamais d'erreur : une base de données absente ou temporairement
 * indisponible ne doit jamais faire échouer (500) une page dont le contenu
 * ne dépend pas du compte (module, examen, offre...) — on se rabat sur
 * "visiteur anonyme", le comportement le plus sûr par défaut (pas d'accès
 * premium accordé à tort). Les parcours d'écriture (connexion, inscription)
 * appellent directement `getSql()` et continuent d'échouer bruyamment.
 */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const userId = await getSessionUserId();
    if (!userId) return null;
    return (await findUserById(userId)) ?? null;
  } catch (error) {
    console.error("getCurrentUser: session/lecture utilisateur indisponible, repli anonyme.", error);
    return null;
  }
});

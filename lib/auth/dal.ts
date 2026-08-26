import { cache } from "react";
import { getSessionUserId } from "@/lib/auth/session";
import { findUserById, type AuthUser } from "@/lib/auth/users";

/**
 * Mémoïsé par passe de rendu (React `cache`) : plusieurs composants serveur
 * peuvent appeler `getCurrentUser()` sans multiplier les lectures de cookie
 * et de base de données.
 */
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return findUserById(userId) ?? null;
});

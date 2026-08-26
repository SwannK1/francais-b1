"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface SessionUser {
  id: string;
  email: string;
  /** Voir `AuthUser.premiumUntil` (lib/auth/users.ts) — même contrat, exposé côté client. */
  premiumUntil: string | null;
}

interface AuthContextValue {
  user: SessionUser | null;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * `initialUser` vient d'un rendu serveur (`getCurrentUser()` dans le layout
 * racine) pour éviter un flash "déconnecté" le temps d'un aller-retour
 * réseau. `refresh()` recharge l'état depuis `/api/auth/me` après une
 * connexion/déconnexion, pour que le contexte client reflète le nouveau
 * cookie de session sans recharger toute la page.
 */
export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: SessionUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : { user: null };
      setUser(data.user ?? null);
    } catch {
      // Hors ligne : on garde l'état de session connu jusqu'ici.
    }
  }, []);

  const value = useMemo(() => ({ user, refresh }), [user, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

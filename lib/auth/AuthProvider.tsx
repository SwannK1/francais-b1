"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface SessionUser {
  id: string;
  email: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  /** true tant que le premier `/api/auth/me` n'a pas répondu — voir le commentaire sur AuthProvider. */
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * L'état de session est hydraté côté client (`/api/auth/me`), jamais lu via
 * `cookies()` dans le layout racine : un layout qui lit les cookies force
 * Next.js à rendre TOUTE la surface de l'app en dynamique, y compris les
 * pages 100% publiques (accueil marketing, etc.) qui pourraient rester
 * statiques/cacheables. Coût de ce choix : un bref flash "déconnecté" le
 * temps du premier aller-retour réseau pour un visiteur déjà authentifié —
 * acceptable ici car la quasi-totalité du site est publique et seules
 * quelques pages (déjà dynamiques pour d'autres raisons : lecture
 * localStorage, formulaires) affichent réellement l'état de session.
 * `refresh()` recharge l'état après une connexion/déconnexion.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : { user: null };
      setUser(data.user ?? null);
    } catch {
      // Hors ligne : on garde l'état de session connu jusqu'ici.
    } finally {
      setLoading(false);
    }
  }, []);

  // Duplique le corps de `refresh` plutôt que de l'appeler : la règle
  // react-hooks/set-state-in-effect refuse d'invoquer depuis un effet une
  // fonction qu'elle reconnaît comme modifiant du state, même indirectement
  // via une promesse.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = res.ok ? await res.json() : { user: null };
        if (!cancelled) setUser(data.user ?? null);
      } catch {
        // Hors ligne : on garde l'état de session connu jusqu'ici.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ user, loading, refresh }), [user, loading, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

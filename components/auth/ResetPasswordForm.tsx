"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword, type AuthFormState } from "@/app/actions/auth";
import { buttonClasses } from "@/components/ui/button-styles";

const initialState: AuthFormState = {};

export default function ResetPasswordForm({ token, next }: { token: string; next?: string }) {
  const [state, action, pending] = useActionState(resetPassword, initialState);
  const router = useRouter();
  // Les sessions ouvertes sont détruites par la réinitialisation (voir
  // `resetPassword`, app/actions/auth.ts) : on repasse par la connexion,
  // avec `next` reporté pour ne pas perdre l'intention initiale (ex. un
  // module premium qui a déclenché tout ce détour).
  const loginHref = next ? `/connexion?next=${encodeURIComponent(next)}` : "/connexion";

  useEffect(() => {
    if (!state.success) return;
    const timeout = setTimeout(() => router.push(loginHref), 2000);
    return () => clearTimeout(timeout);
  }, [state.success, router, loginHref]);

  if (state.success) {
    return (
      <p role="status" className="text-sm text-foreground">
        Mot de passe mis à jour. Redirection vers la connexion…
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Nouveau mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-lg border border-input-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="text-xs text-muted-foreground">Au moins 8 caractères.</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-lg border border-input-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md", "w-full disabled:opacity-50")}>
        {pending ? "Mise à jour…" : "Réinitialiser le mot de passe"}
      </button>
    </form>
  );
}

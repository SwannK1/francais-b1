"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, type AuthFormState } from "@/app/actions/auth";
import { useAuth } from "@/lib/auth/AuthProvider";
import { buttonClasses } from "@/components/ui/button-styles";

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  const { refresh } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.success) return;
    void refresh().then(() => {
      router.push("/parcours");
      router.refresh();
    });
  }, [state.success, refresh, router]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md", "w-full disabled:opacity-50")}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

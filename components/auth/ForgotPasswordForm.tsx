"use client";

import { useActionState } from "react";
import { requestPasswordReset, type AuthFormState } from "@/app/actions/auth";
import { buttonClasses } from "@/components/ui/button-styles";

const initialState: AuthFormState = {};

export default function ForgotPasswordForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);

  if (state.success) {
    return (
      <p role="status" className="text-sm text-foreground">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
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
          className="w-full rounded-lg border border-input-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "md", "w-full disabled:opacity-50")}>
        {pending ? "Envoi…" : "Envoyer le lien de réinitialisation"}
      </button>
    </form>
  );
}

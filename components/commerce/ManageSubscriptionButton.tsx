"use client";

import { useState } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";

export default function ManageSubscriptionButton({
  label = "Gérer mon abonnement",
  variant = "secondary",
  size = "md",
  className,
}: {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function openPortal() {
    setStatus("loading");
    try {
      const response = await fetch("/api/billing-portal", { method: "POST" });
      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        setStatus("error");
        return;
      }

      window.location.href = data.url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={openPortal}
        disabled={status === "loading"}
        className={cn(buttonClasses(variant, size), "disabled:opacity-60", className)}
      >
        {status === "loading" ? "Ouverture…" : label}
      </button>
      {status === "error" ? (
        <p className="mt-2 text-sm text-red-600">
          Impossible d&apos;ouvrir la gestion d&apos;abonnement pour le moment. Réessaie plus tard ou
          contacte-nous.
        </p>
      ) : null}
    </div>
  );
}

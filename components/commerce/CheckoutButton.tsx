"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";

export default function CheckoutButton({
  label,
  variant = "primary",
  size = "lg",
  className,
  source,
}: {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Où ce bouton est affiché ("offre_page", "pricing"...) — voir lib/analytics/events.ts. */
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  async function startCheckout() {
    trackEvent("premium_cta_clicked", { source });
    setStatus("loading");
    try {
      const response = await fetch("/api/checkout", { method: "POST" });

      // Le checkout exige un compte (voir app/api/checkout/route.ts) : sans
      // session, on envoie vers la connexion plutôt que d'afficher une
      // erreur générique — /offre reprend le fil juste après. Pas un échec
      // du paiement lui-même : pas de `checkout_failed` ici.
      if (response.status === 401) {
        router.push("/connexion?next=/offre");
        return;
      }

      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        setStatus("error");
        trackEvent("checkout_failed", { source, reason: "client_no_checkout_url" });
        return;
      }

      window.location.href = data.url;
    } catch {
      setStatus("error");
      trackEvent("checkout_failed", { source, reason: "client_network_error" });
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={status === "loading"}
        className={cn(buttonClasses(variant, size), "disabled:opacity-60", className)}
      >
        {status === "loading" ? "Redirection…" : label}
      </button>
      {status === "error" ? (
        <p className="mt-2 text-sm text-red-600">
          Le paiement n&apos;est pas disponible pour le moment. Réessaie plus tard ou contacte-nous.
        </p>
      ) : null}
    </div>
  );
}

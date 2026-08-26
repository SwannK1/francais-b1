"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { logout } from "@/app/actions/auth";
import { clearLocalProgressOnLogout } from "@/lib/pedagogy/useProgress";
import { cn } from "@/lib/cn";

/** Bloc compte partagé entre le header marketing et le header de l'application. */
export default function AccountStatus({ className }: { className?: string }) {
  const { user, refresh } = useAuth();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  if (!user) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <Link
          href="/connexion"
          className="text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          Se connecter
        </Link>
        <Link
          href="/inscription"
          className="text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          Créer un compte
        </Link>
      </div>
    );
  }

  function handleLogout() {
    startTransition(async () => {
      await logout();
      clearLocalProgressOnLogout();
      await refresh();
      router.push("/");
      router.refresh();
    });
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="max-w-[14ch] truncate text-sm text-muted-foreground" title={user.email}>
        {user.email}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        className="text-sm font-medium text-foreground transition-colors hover:text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        {pending ? "Déconnexion…" : "Se déconnecter"}
      </button>
    </div>
  );
}

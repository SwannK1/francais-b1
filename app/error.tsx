"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Erreur</p>
      <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
        Une erreur inattendue s&apos;est produite.
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Cela ne vient pas de toi : réessaie, et si le problème persiste, reviens un peu plus tard.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => retry()} className={buttonClasses("primary", "lg")}>
          Réessayer
        </button>
        <Link href="/parcours" className={buttonClasses("secondary", "lg")}>
          Retourner à mon parcours
        </Link>
      </div>
    </div>
  );
}

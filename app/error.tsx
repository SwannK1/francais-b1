"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/button-styles";

/**
 * Filet de secours pour une erreur de rendu non interceptée ailleurs — sans
 * ce fichier, Next.js affiche un écran blanc générique en production
 * ("Application error: a client-side exception has occurred"), sans header
 * ni moyen de revenir en arrière. `error.tsx` doit être un composant client
 * (contrat Next.js).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Pas de tracking d'erreurs distant configuré dans ce chantier — au
    // minimum, la conserver dans la console pour le débogage local.
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-xl py-24 text-center sm:py-32">
          <p className="text-sm font-semibold text-primary">Erreur</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une erreur inattendue s&apos;est produite
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Ce n&apos;est pas ta faute — réessaie, ou reviens à l&apos;accueil. Si le problème persiste,
            contacte-nous.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={reset} className={buttonClasses("primary", "lg")}>
              Réessayer
            </button>
            <Link href="/" className={buttonClasses("secondary", "lg")}>
              Retour à l&apos;accueil
            </Link>
            <Link href="/parcours" className={buttonClasses("secondary", "lg")}>
              Retourner à mon parcours
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

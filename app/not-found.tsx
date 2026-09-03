import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

/**
 * Remplace la page 404 générique de Next.js par une page à l'identité du
 * site — sans elle, une URL invalide affichait un écran blanc sans header
 * ni navigation pour revenir en arrière.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-xl py-24 text-center sm:py-32">
          <p className="text-sm font-semibold text-primary">Erreur 404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cette page n&apos;existe pas
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Le lien est peut-être incorrect ou la page a été déplacée. Tu peux revenir à l&apos;accueil
            ou continuer ton parcours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className={buttonClasses("primary", "lg")}>
              Retour à l&apos;accueil
            </Link>
            <Link href="/parcours" className={buttonClasses("secondary", "lg")}>
              Voir mon parcours
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

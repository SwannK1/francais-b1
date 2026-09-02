import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page introuvable — ParcoursFR" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Container className="max-w-xl py-24 text-center sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Erreur 404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cette page n&apos;existe pas ou plus.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Le lien suivi est peut-être incorrect ou périmé. Reprends ton parcours ou retourne à
            l&apos;accueil.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/parcours" size="lg">
              Retourner à mon parcours
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Accueil
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

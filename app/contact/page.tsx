import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter ParcoursFR pour une question sur l'offre, le paiement ou la résiliation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-2xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Avant d&apos;écrire, un coup d&apos;œil à la{" "}
            <Link href="/faq" className="underline hover:text-foreground">
              FAQ
            </Link>{" "}
            répond peut-être déjà à ta question (offre, paiement, résiliation).
          </p>

          <Card className="mt-8">
            <h2 className="text-base font-semibold text-foreground">Nous écrire</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Email :{" "}
              <a
                href="mailto:swann.kerboeuf@gmail.com"
                className="underline hover:text-foreground"
              >
                swann.kerboeuf@gmail.com
              </a>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Téléphone :{" "}
              <a href="tel:+33607524281" className="underline hover:text-foreground">
                06 07 52 42 81
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pour une question sur tes données personnelles, voir la{" "}
              <Link href="/confidentialite" className="underline hover:text-foreground">
                politique de confidentialité
              </Link>
              . Pour l&apos;identité de l&apos;éditeur, voir les{" "}
              <Link href="/mentions-legales" className="underline hover:text-foreground">
                mentions légales
              </Link>
              .
            </p>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}

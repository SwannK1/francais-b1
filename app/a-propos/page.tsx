import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ParcoursFR est une formation en ligne originale pour apprendre le français, de A1 à B1, et vivre en France avec plus d'autonomie — sans affiliation avec un organisme officiel.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            À propos de ParcoursFR
          </h1>

          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              ParcoursFR est une formation en ligne de français pour vivre en France avec plus
              d&apos;autonomie : un test de niveau, un parcours guidé du niveau A1 au niveau B1
              (grammaire, vocabulaire, compréhension orale et écrite, production, pratique orale),
              et une préparation structurée au DELF B1 avec un examen blanc complet.
            </p>
            <p>
              Le contenu pédagogique (textes, exercices, audios, examens blancs) est entièrement
              original, conçu pour un public adulte, inspiré du format public du DELF sans jamais en
              reproduire le contenu.
            </p>
            <p>
              ParcoursFR n&apos;est ni éditeur, ni partenaire, ni affilié à France Éducation
              International ni à aucun organisme délivrant officiellement le DELF ou le TCF — voir
              les{" "}
              <Link href="/mentions-legales" className="underline hover:text-foreground">
                mentions légales
              </Link>
              .
            </p>
            <p>
              Pour en savoir plus sur l&apos;offre et les tarifs, voir la page{" "}
              <Link href="/offre" className="underline hover:text-foreground">
                Offre
              </Link>
              , ou consulter la{" "}
              <Link href="/faq" className="underline hover:text-foreground">
                FAQ
              </Link>
              .
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Paiement annulé — ParcoursFR" };

export default function PaiementAnnulationPage() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16 sm:py-24">
          <Card className="mx-auto max-w-md text-center">
            <h1 className="text-xl font-bold text-foreground">Paiement annulé</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Aucun montant n&apos;a été débité. Tu peux continuer à découvrir la formation
              gratuitement ou réessayer quand tu es prêt·e.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="/offre" size="lg">
                Revoir l&apos;offre
              </Button>
              <Button href="/parcours" size="lg" variant="secondary">
                Retourner au parcours
              </Button>
            </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Paiement confirmé — ParcoursFR" };

export default function PaiementSuccesPage() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16 sm:py-24">
          <Card className="mx-auto max-w-md text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckIcon className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-xl font-bold text-foreground">Paiement confirmé</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Merci ! Ton paiement a bien été reçu par Stripe. L&apos;activation automatique de
              l&apos;accès complet sur ton compte n&apos;est pas encore disponible sur cet
              environnement — écris-nous en indiquant l&apos;email utilisé pour le paiement et nous
              activerons ton accès manuellement.
            </p>
            <Button href="/parcours" size="lg" className="mt-6">
              Retourner au parcours
            </Button>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}

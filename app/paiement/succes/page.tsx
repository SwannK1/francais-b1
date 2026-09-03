import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { getCurrentUser } from "@/lib/auth/dal";
import { isPremiumActive } from "@/lib/commerce/access";

export const metadata: Metadata = {
  title: "Paiement confirmé",
  robots: { index: false, follow: true },
};

/**
 * L'activation réelle du premium vient du webhook Stripe
 * (`app/api/webhooks/stripe/route.ts`), pas de cette page — un simple
 * retour sur `/paiement/succes` ne prouve rien en soi. Le webhook arrive en
 * général en quelques secondes, mais rien ne garantit qu'il ait déjà été
 * traité au moment où le navigateur revient ici : on affiche donc l'état
 * réel du compte plutôt que d'annoncer un succès non vérifié.
 */
export default async function PaiementSuccesPage() {
  const user = await getCurrentUser();
  const active = isPremiumActive(user?.premiumUntil);

  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="py-16 sm:py-24">
          <Card className="mx-auto max-w-md text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckIcon className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-xl font-bold text-foreground">Paiement confirmé</h1>
            {active ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Merci ! Ton accès complet est activé sur ton compte.
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Merci ! Ton paiement a bien été reçu par Stripe. L&apos;activation de ton accès complet
                est en cours de confirmation (généralement quelques secondes) — actualise cette page
                dans un instant. Si l&apos;accès complet n&apos;apparaît toujours pas d&apos;ici
                quelques minutes, écris-nous en indiquant l&apos;email utilisé pour le paiement.
              </p>
            )}
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

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";
import CheckoutButton from "@/components/commerce/CheckoutButton";
import { MAIN_PLAN, FREE_PLAN_FEATURES } from "@/lib/commerce/plans";
import { isPaymentConfigured } from "@/lib/commerce/stripe";
import { isPremiumActive } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import ViewTracker from "@/lib/analytics/ViewTracker";

export const metadata: Metadata = {
  title: "Offre",
  description:
    "Découvre l'offre ParcoursFR : les 26 modules du parcours B1, les audios, les productions écrites corrigées et un examen blanc DELF B1 complet.",
  alternates: { canonical: "/offre" },
};

export default async function OffrePage() {
  const paymentReady = isPaymentConfigured();
  const user = await getCurrentUser();
  const alreadyPremium = isPremiumActive(user?.premiumUntil);

  return (
    <>
      <ViewTracker event="premium_offer_viewed" properties={{ isPremium: alreadyPremium }} />
      <Header />
      <main id="main-content">
        <Container className="py-16 sm:py-24">
          <Link href="/parcours" className="text-sm font-medium text-primary hover:underline">
            ← Retour au parcours
          </Link>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Une formation complète de français B1, une seule offre
            </h1>
            <p className="mt-4 text-muted-foreground">
              Pas d&apos;abonnements multiples à comparer. Un accès gratuit pour essayer, un accès
              complet pour aller jusqu&apos;au DELF B1.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold text-foreground">Découverte gratuite</h2>
              <p className="mt-1 text-3xl font-bold text-foreground">0 €</p>
              <ul className="mt-6 space-y-3 text-left">
                {FREE_PLAN_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/test-niveau"
                className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Commencer gratuitement
              </Link>
            </Card>

            <Card className="border-primary/40 ring-1 ring-primary/20">
              <h2 className="text-lg font-semibold text-foreground">{MAIN_PLAN.name}</h2>
              <p className="mt-1">
                <span className="text-3xl font-bold text-foreground">{MAIN_PLAN.priceLabel}</span>
                <span className="text-muted-foreground"> / {MAIN_PLAN.interval}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{MAIN_PLAN.tagline}</p>
              <ul className="mt-6 space-y-3 text-left">
                {MAIN_PLAN.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>

              {alreadyPremium ? (
                <>
                  <p className="mt-8 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
                    Tu as déjà l&apos;accès complet
                    {user?.premiumUntil
                      ? ` — actif jusqu'au ${new Date(user.premiumUntil).toLocaleDateString("fr-FR")}.`
                      : "."}
                  </p>
                  <Link
                    href="/parcours"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    Continuer mon parcours
                  </Link>
                </>
              ) : paymentReady ? (
                <CheckoutButton label={MAIN_PLAN.ctaLabel} className="mt-8 w-full" />
              ) : (
                <p className="mt-8 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  Le paiement en ligne n&apos;est pas encore activé sur cet environnement. Contacte-nous
                  pour souscrire.
                </p>
              )}
            </Card>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            Prix TTC. Abonnement sans engagement, résiliable à tout moment. Voir les{" "}
            <Link href="/cgv" className="underline hover:text-foreground">
              conditions générales de vente
            </Link>{" "}
            et la{" "}
            <Link href="/faq" className="underline hover:text-foreground">
              FAQ
            </Link>
            .
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";
import CheckoutButton from "@/components/commerce/CheckoutButton";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { isPremiumActive } from "@/lib/commerce/access";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function Pricing() {
  const { user } = useAuth();
  const alreadyPremium = isPremiumActive(user?.premiumUntil);

  return (
    <section id="tarifs" className="py-16 sm:py-24">
      <Container className="flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Un seul abonnement, tout inclus
        </h2>
        <p className="mt-3 max-w-md text-center text-sm text-muted-foreground">
          Le test de niveau et 2 modules complets sont gratuits, pour essayer avant de t&apos;engager.
        </p>

        <Card className="mt-10 w-full max-w-md text-center">
          <h3 className="text-lg font-semibold text-foreground">{MAIN_PLAN.name}</h3>
          <p className="mt-2">
            <span className="text-4xl font-bold text-foreground">{MAIN_PLAN.priceLabel}</span>
            <span className="text-muted-foreground"> / {MAIN_PLAN.interval}</span>
          </p>

          <ul className="mt-6 space-y-3 text-left">
            {MAIN_PLAN.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>

          {alreadyPremium ? (
            <p className="mt-8 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
              Tu as déjà l&apos;accès complet
              {user?.premiumUntil
                ? ` — actif jusqu'au ${new Date(user.premiumUntil).toLocaleDateString("fr-FR")}.`
                : "."}
            </p>
          ) : (
            <CheckoutButton label={MAIN_PLAN.ctaLabel} size="lg" className="mt-8 w-full" />
          )}
          <p className="mt-3 text-xs text-muted-foreground">{MAIN_PLAN.tagline}</p>
          <Link
            href="/test-niveau"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Ou commencer gratuitement avec le test de niveau
          </Link>
        </Card>
      </Container>
    </section>
  );
}

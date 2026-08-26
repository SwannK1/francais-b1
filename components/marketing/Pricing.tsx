import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { MAIN_PLAN } from "@/lib/commerce/plans";

export default function Pricing() {
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

          <Button href="/test-niveau" size="lg" className="mt-8 w-full">
            Commencer gratuitement
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            {MAIN_PLAN.tagline}{" "}
            <Link href="/offre" className="underline hover:text-foreground">
              Voir le détail de l&apos;offre
            </Link>
            .
          </p>
        </Card>
      </Container>
    </section>
  );
}

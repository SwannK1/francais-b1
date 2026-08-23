import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

const features = [
  "Tous les niveaux, du A1 au B2",
  "Toutes les leçons et tous les exercices",
  "Tous les audios de compréhension orale",
  "Productions écrites avec corrections",
  "Préparation au DELF et au TCF IRN",
  "Examens blancs",
  "Suivi de ta progression",
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-16 sm:py-24">
      <Container className="flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Un seul abonnement, tout inclus
        </h2>

        <Card className="mt-10 w-full max-w-md text-center">
          <h3 className="text-lg font-semibold text-foreground">Accès complet</h3>
          <p className="mt-2">
            <span className="text-4xl font-bold text-foreground">9,99 €</span>
            <span className="text-muted-foreground"> / mois</span>
          </p>

          <ul className="mt-6 space-y-3 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {feature}
              </li>
            ))}
          </ul>

          <Button href="/test-niveau" size="lg" className="mt-8 w-full">
            Commencer gratuitement
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">Sans engagement.</p>
        </Card>
      </Container>
    </section>
  );
}

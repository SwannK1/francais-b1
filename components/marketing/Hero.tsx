import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PrimaryCta from "@/components/marketing/PrimaryCta";
import ProgressPreviewCard from "@/components/marketing/ProgressPreviewCard";

export default function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Apprends le français pour vivre en France avec plus d&apos;autonomie.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Teste ton niveau, suis un parcours personnalisé de A1 à B1 et entraîne-toi au français
            de la vie quotidienne, du travail et des démarches.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta size="lg" startLabel="Tester mon niveau" source="hero" />
            <Button href="#niveaux" variant="secondary" size="lg">
              Voir le parcours
            </Button>
          </div>
        </div>

        <ProgressPreviewCard variant="compact" className="lg:max-w-md lg:justify-self-end" />
      </Container>
    </section>
  );
}

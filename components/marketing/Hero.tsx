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
            Apprends le français et prépare ton niveau B1, à ton rythme.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Teste ton niveau, suis ton parcours B1 et prépare ton DELF B1 à ton rythme.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta size="lg" startLabel="Tester mon niveau gratuitement" />
            <Button href="#fonctionnement" variant="secondary" size="lg">
              Découvrir la méthode
            </Button>
          </div>
        </div>

        <ProgressPreviewCard variant="compact" className="lg:max-w-md lg:justify-self-end" />
      </Container>
    </section>
  );
}

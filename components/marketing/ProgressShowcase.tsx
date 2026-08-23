import Container from "@/components/ui/Container";
import ProgressPreviewCard from "@/components/marketing/ProgressPreviewCard";

export default function ProgressShowcase() {
  return (
    <section id="apercu" className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un parcours clair, jour après jour.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Chaque jour, la plateforme te propose une séance courte et ciblée : une
            leçon, des exercices, une compréhension orale et une petite production
            écrite. Ta progression vers ton objectif se met à jour au fur et à mesure.
          </p>
        </div>
        <ProgressPreviewCard variant="full" />
      </Container>
    </section>
  );
}

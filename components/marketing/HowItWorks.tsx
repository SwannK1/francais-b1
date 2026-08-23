import Container from "@/components/ui/Container";

const steps = [
  {
    number: "1",
    title: "Teste ton niveau",
    description: "Un test permet d'estimer ton point de départ.",
  },
  {
    number: "2",
    title: "Suis ton parcours",
    description: "La plateforme te propose les compétences à travailler.",
  },
  {
    number: "3",
    title: "Prépare ton objectif",
    description: "Progresse puis entraîne-toi spécifiquement à ton examen.",
  },
];

export default function HowItWorks() {
  return (
    <section id="fonctionnement" className="bg-muted/60 py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Comment ça marche ?
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

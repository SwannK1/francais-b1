import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const levels = [
  {
    level: "A1",
    title: "Découverte",
    description: "Les bases pour se présenter, se débrouiller au quotidien et être compris·e.",
  },
  {
    level: "A2",
    title: "Élémentaire",
    description: "De quoi gérer les situations courantes : achats, rendez-vous, démarches simples.",
  },
  {
    level: "B1",
    title: "Intermédiaire",
    description: "L'autonomie pour le travail, les démarches administratives et le DELF B1.",
  },
];

export default function Levels() {
  return (
    <section id="niveaux" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Un seul parcours, du niveau A1 au niveau B1
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Commence où tu en es réellement : le test de niveau t&apos;oriente vers la bonne étape,
          puis le parcours t&apos;emmène progressivement jusqu&apos;au niveau B1.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {levels.map((item) => (
            <Card key={item.level}>
              <Badge variant="primary">Niveau {item.level}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { BookOpenIcon, HeadphonesIcon, PenIcon, TargetIcon } from "@/components/ui/icons";

const types = [
  {
    icon: HeadphonesIcon,
    title: "Comprendre",
    description:
      "Des audios préenregistrés pour travailler la compréhension orale à ton rythme.",
  },
  {
    icon: BookOpenIcon,
    title: "Lire",
    description: "Des textes adaptés à ton niveau pour progresser en lecture.",
  },
  {
    icon: PenIcon,
    title: "Écrire",
    description: "Des productions écrites accompagnées de corrections.",
  },
  {
    icon: TargetIcon,
    title: "S'entraîner",
    description: "Des exercices interactifs pour ancrer ce que tu apprends.",
  },
];

export default function LearningTypes() {
  return (
    <section id="apprentissage" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Quatre façons de progresser
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((type) => (
            <Card key={type.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <type.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{type.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

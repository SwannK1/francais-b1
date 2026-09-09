import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import {
  ClockIcon,
  ExamIcon,
  HeadphonesIcon,
  MicrophoneIcon,
  TargetIcon,
} from "@/components/ui/icons";

const benefits = [
  { icon: TargetIcon, title: "Un parcours adapté à ton niveau" },
  { icon: ClockIcon, title: "Des séances courtes et guidées" },
  { icon: HeadphonesIcon, title: "Compréhension orale" },
  { icon: TargetIcon, title: "Révision intelligente" },
  { icon: MicrophoneIcon, title: "Pratique orale" },
  { icon: ExamIcon, title: "Évaluations pour passer au niveau suivant" },
];

export default function Benefits() {
  return (
    <section className="bg-muted/60 py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tout ce qu&apos;il faut pour progresser
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <benefit.icon className="h-5 w-5" />
              </span>
              <span className="font-medium text-foreground">{benefit.title}</span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

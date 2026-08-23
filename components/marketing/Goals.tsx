import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import {
  ChatIcon,
  ExamIcon,
  FlagIcon,
  GraduationCapIcon,
  HomeIcon,
  IdCardIcon,
} from "@/components/ui/icons";

const goals = [
  { icon: HomeIcon, title: "Vivre en France" },
  { icon: IdCardIcon, title: "Obtenir ma carte de résident" },
  { icon: FlagIcon, title: "Préparer ma naturalisation" },
  { icon: GraduationCapIcon, title: "Étudier en France" },
  { icon: ExamIcon, title: "Passer un examen" },
  { icon: ChatIcon, title: "Améliorer mon français" },
];

export default function Goals() {
  return (
    <section id="objectifs" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pourquoi apprends-tu le français ?
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.title} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <goal.icon className="h-5 w-5" />
              </span>
              <span className="font-medium text-foreground">{goal.title}</span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

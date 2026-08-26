import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { ExamIcon } from "@/components/ui/icons";

const exams = [
  {
    title: "DELF B1",
    description: "Examens blancs complets, dans les conditions et le format de l'épreuve officielle.",
  },
  {
    title: "TCF IRN",
    description:
      "Les compétences du parcours (grammaire, vocabulaire, situations administratives) sont utiles pour ce test, mais aucun examen blanc TCF IRN dédié n'est encore disponible.",
  },
];

export default function Exams() {
  return (
    <section id="examens" className="bg-muted/60 py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Prépare ensuite ton examen
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {exams.map((exam) => (
            <Card key={exam.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ExamIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{exam.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Les exercices et sujets proposés sont des contenus pédagogiques originaux,
          inspirés du format de ces examens. ParcoursFR n&apos;est affilié à aucun
          organisme officiel.
        </p>
      </Container>
    </section>
  );
}

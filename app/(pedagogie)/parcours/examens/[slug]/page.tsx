import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import { getExamBySlug } from "@/lib/pedagogy/data/exams";

const TYPE_LABEL = { delf: "DELF", tcf_irn: "TCF IRN", interne: "Entraînement interne" } as const;

export default async function ExamPage({ params }: PageProps<"/parcours/examens/[slug]">) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href="/parcours/examens" className="text-sm font-medium text-primary hover:underline">
        ← Retour à la préparation examen
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{TYPE_LABEL[exam.type]}</Badge>
          <Badge variant="neutral">{exam.level}</Badge>
          {exam.isBlanc ? <Badge variant="secondary">Examen blanc</Badge> : null}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{exam.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {exam.durationMinutes} min · {exam.sections.length} sections · seuil de réussite{" "}
          {exam.passingScore}/{exam.maxScore}
        </p>
      </header>

      <div className="space-y-8">
        {exam.sections.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}-title`} className="space-y-3">
            <h2 id={`section-${section.id}-title`} className="text-base font-semibold text-foreground">
              {section.title} · {section.durationMinutes} min · {section.maxScore} points
            </h2>
            {section.exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

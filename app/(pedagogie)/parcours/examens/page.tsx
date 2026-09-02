import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import ExamCard from "@/components/pedagogy/ExamCard";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { EXAMS } from "@/lib/pedagogy/data/exams";
import { getStageBySlug } from "@/lib/pedagogy/data/parcours-stages";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Préparation à l'examen DELF B1",
  description:
    "Entraîne-toi avec des épreuves d'entraînement chronométrées, au format des examens DELF B1 et TCF IRN.",
  alternates: { canonical: "/parcours/examens" },
};

export default async function ExamensPage() {
  const stage = getStageBySlug("preparation-examen");
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: stage?.title ?? "Préparation examen" }]} />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Étape {stage?.order}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">{stage?.title ?? "Préparation examen"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{stage?.objective}</p>
        <p className="mt-2 text-sm text-muted-foreground">{stage?.description}</p>
      </header>

      <section>
        {EXAMS.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMS.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                href={`/parcours/examens/${exam.slug}`}
                locked={!canAccess({ kind: "exam", slug: exam.slug }, user?.premiumUntil)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">
              Aucune épreuve d&apos;entraînement disponible pour l&apos;instant.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}

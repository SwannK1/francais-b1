import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { ASSESSMENTS } from "@/lib/assessment/data/index";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Évaluations de passage",
  description:
    "Bilans de fin A1, fin A2 et passages A1 → A2, A2 → B1 : compréhension écrite, vocabulaire, grammaire, compréhension orale et production guidée.",
  alternates: { canonical: "/parcours/evaluations" },
};

/**
 * Indépendante du diagnostic/de la révision espacée/de la séance du jour
 * (voir `lib/assessment/types.ts`) — ne lit aucune donnée de
 * `lib/pedagogy/logic/`.
 */
export default async function EvaluationsPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: "Évaluations de passage" }]} />

      <header>
        <h1 className="text-2xl font-bold text-foreground">Évaluations de passage</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vérifie que tu maîtrises un niveau avant de passer au suivant : compréhension écrite,
          vocabulaire, grammaire, compréhension orale, et une courte production guidée.
        </p>
      </header>

      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {ASSESSMENTS.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              href={`/parcours/evaluations/${assessment.slug}`}
              locked={!canAccess({ kind: "assessment", checkpointId: assessment.id }, user?.premiumUntil)}
            />
          ))}
        </div>
        {ASSESSMENTS.length === 0 ? (
          <Card>
            <p className="text-sm text-muted-foreground">Aucune évaluation disponible pour l&apos;instant.</p>
          </Card>
        ) : null}
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAssessmentBySlug } from "@/lib/assessment/data/index";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import AssessmentExperience from "@/components/assessment/AssessmentExperience";

export async function generateMetadata({
  params,
}: PageProps<"/parcours/evaluations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const assessment = getAssessmentBySlug(slug);
  if (!assessment) return {};

  return {
    title: assessment.title,
    description: assessment.description,
    alternates: { canonical: `/parcours/evaluations/${assessment.slug}` },
  };
}

export default async function AssessmentPage({ params }: PageProps<"/parcours/evaluations/[slug]">) {
  const { slug } = await params;
  const assessment = getAssessmentBySlug(slug);

  if (!assessment) {
    notFound();
  }

  const user = await getCurrentUser();
  const isFree = canAccess({ kind: "assessment", checkpointId: assessment.id }, user?.premiumUntil);

  if (!isFree) {
    return (
      <PremiumLock
        title={assessment.title}
        description={assessment.description}
        backHref="/parcours/evaluations"
        backLabel="← Retour aux évaluations"
      />
    );
  }

  return <AssessmentExperience assessment={assessment} />;
}

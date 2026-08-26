import { notFound } from "next/navigation";
import { getExamBySlug } from "@/lib/pedagogy/data/exams";
import { canAccess } from "@/lib/commerce/access";
import PremiumLock from "@/components/commerce/PremiumLock";
import ExamExperience from "./ExamExperience";

export default async function ExamPage({ params }: PageProps<"/parcours/examens/[slug]">) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  if (!canAccess({ kind: "exam", slug: exam.slug })) {
    return (
      <PremiumLock title={exam.title} backHref="/parcours/examens" backLabel="← Retour aux examens" />
    );
  }

  return <ExamExperience exam={exam} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExamBySlug } from "@/lib/pedagogy/data/exams";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import { JsonLd, breadcrumbSchema, learningResourceSchema } from "@/lib/seo/schema";
import ExamExperience from "./ExamExperience";

export async function generateMetadata({
  params,
}: PageProps<"/parcours/examens/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    return {};
  }

  return {
    title: exam.title,
    description: exam.description,
    alternates: { canonical: `/parcours/examens/${exam.slug}` },
  };
}

export default async function ExamPage({ params }: PageProps<"/parcours/examens/[slug]">) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  const user = await getCurrentUser();
  const isFree = canAccess({ kind: "exam", slug: exam.slug }, user?.premiumUntil);

  const breadcrumb = breadcrumbSchema([
    { name: "Préparation à l'examen", path: "/parcours/examens" },
    { name: exam.title, path: `/parcours/examens/${exam.slug}` },
  ]);
  const learningResource = learningResourceSchema({
    name: exam.title,
    description: exam.description,
    url: `/parcours/examens/${exam.slug}`,
    isAccessibleForFree: isFree,
    educationalLevel: exam.level,
  });

  if (!isFree) {
    return (
      <>
        <JsonLd data={[breadcrumb, learningResource]} />
        <PremiumLock
          title={exam.title}
          description={exam.description}
          backHref="/parcours/examens"
          backLabel="← Retour aux examens"
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={[breadcrumb, learningResource]} />
      <ExamExperience exam={exam} />
    </>
  );
}

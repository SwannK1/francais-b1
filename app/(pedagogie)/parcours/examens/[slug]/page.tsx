import { notFound } from "next/navigation";
import { getExamBySlug } from "@/lib/pedagogy/data/exams";
import ExamExperience from "./ExamExperience";

export default async function ExamPage({ params }: PageProps<"/parcours/examens/[slug]">) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  return <ExamExperience exam={exam} />;
}

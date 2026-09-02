import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStageBySlug, PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { getStageModules } from "@/lib/pedagogy/logic/parcours";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import StageExperience from "./StageExperience";

export async function generateMetadata({
  params,
}: PageProps<"/parcours/[stageSlug]">): Promise<Metadata> {
  const { stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);

  if (!stage || stage.kind !== "content") {
    return {};
  }

  return {
    title: stage.title,
    description: stage.description,
    alternates: { canonical: `/parcours/${stage.slug}` },
  };
}

export function generateStaticParams() {
  return PARCOURS_STAGES.filter((stage) => stage.kind === "content").map((stage) => ({
    stageSlug: stage.slug,
  }));
}

export default async function StagePage({ params }: PageProps<"/parcours/[stageSlug]">) {
  const { stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);

  if (!stage || stage.kind !== "content") {
    notFound();
  }

  const modules = getStageModules(stage, MODULES);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Parcours", path: "/parcours" },
          { name: stage.title, path: `/parcours/${stage.slug}` },
        ])}
      />
      <StageExperience stage={stage} modules={modules} />
    </>
  );
}

import { notFound } from "next/navigation";
import { getStageBySlug } from "@/lib/pedagogy/data/parcours-stages";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { getStageModules } from "@/lib/pedagogy/logic/parcours";
import StageExperience from "./StageExperience";

export default async function StagePage({ params }: PageProps<"/parcours/[stageSlug]">) {
  const { stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);

  if (!stage || stage.kind !== "content") {
    notFound();
  }

  const modules = getStageModules(stage, MODULES);

  return <StageExperience stage={stage} modules={modules} />;
}

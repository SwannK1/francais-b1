import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import ModuleExperience from "./ModuleExperience";

export default async function ModulePage({ params }: PageProps<"/parcours/module/[slug]">) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    notFound();
  }

  return <ModuleExperience mod={mod} />;
}

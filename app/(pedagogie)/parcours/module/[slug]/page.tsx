import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import { getStageById } from "@/lib/pedagogy/data/parcours-stages";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import ModuleExperience from "./ModuleExperience";

export default async function ModulePage({ params }: PageProps<"/parcours/module/[slug]">) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    notFound();
  }

  const user = await getCurrentUser();

  if (!canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil)) {
    const stage = getStageById(mod.stageId);
    return (
      <PremiumLock
        title={mod.title}
        backHref={stage ? `/parcours/${stage.slug}` : "/parcours"}
        backLabel={stage ? `← Retour à l'étape « ${stage.title} »` : "← Retour au parcours"}
      />
    );
  }

  return <ModuleExperience mod={mod} />;
}

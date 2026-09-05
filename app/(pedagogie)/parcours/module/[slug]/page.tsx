import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import { getStageById } from "@/lib/pedagogy/data/parcours-stages";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import { JsonLd, breadcrumbSchema, learningResourceSchema } from "@/lib/seo/schema";
import ModuleExperience from "./ModuleExperience";

export async function generateMetadata({
  params,
}: PageProps<"/parcours/module/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    return {};
  }

  return {
    title: mod.title,
    description: mod.description,
    alternates: { canonical: `/parcours/module/${mod.slug}` },
  };
}

export default async function ModulePage({ params }: PageProps<"/parcours/module/[slug]">) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    notFound();
  }

  const user = await getCurrentUser();
  const stage = getStageById(mod.stageId);
  const isFree = canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);

  const breadcrumb = breadcrumbSchema([
    { name: "Parcours", path: "/parcours" },
    ...(stage ? [{ name: stage.title, path: `/parcours/${stage.slug}` }] : []),
    { name: mod.title, path: `/parcours/module/${mod.slug}` },
  ]);
  const learningResource = learningResourceSchema({
    name: mod.title,
    description: mod.description,
    url: `/parcours/module/${mod.slug}`,
    isAccessibleForFree: isFree,
    educationalLevel: mod.level,
  });

  if (!isFree) {
    return (
      <>
        <JsonLd data={[breadcrumb, learningResource]} />
        <PremiumLock
          title={mod.title}
          description={mod.description}
          objectives={mod.objectives}
          backHref={stage ? `/parcours/${stage.slug}` : "/parcours"}
          backLabel={stage ? `← Retour à l'étape « ${stage.title} »` : "← Retour au parcours"}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={[breadcrumb, learningResource]} />
      <ModuleExperience mod={mod} />
    </>
  );
}

"use client";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { getModuleCompletionRate, isModuleReviewed } from "@/lib/pedagogy/logic/progress";
import { getStageCompletionRate } from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { canAccess } from "@/lib/commerce/access";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import type { Module } from "@/lib/pedagogy/types";

export default function StageExperience({
  stage,
  modules,
}: {
  stage: ParcoursStage;
  modules: Module[];
}) {
  const { progress, toggleReview } = useProgress();
  const { user } = useAuth();
  const completionRate = getStageCompletionRate(stage, progress, modules);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: stage.title }]} />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Étape {stage.order}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">{stage.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{stage.objective}</p>
        <p className="mt-2 text-sm text-muted-foreground">{stage.description}</p>
        {modules.length > 0 ? (
          <ProgressBar value={completionRate} label="Progression de l'étape" className="mt-4 max-w-sm" />
        ) : null}
      </header>

      {modules.length > 0 ? (
        <section aria-labelledby="stage-modules-title">
          <h2 id="stage-modules-title" className="mb-3 text-lg font-semibold text-foreground">
            Modules
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {modules.map((mod) => {
              const locked = !canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
              return (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  completionRate={getModuleCompletionRate(progress, mod)}
                  href={`/parcours/module/${mod.slug}`}
                  locked={locked}
                  reviewed={isModuleReviewed(progress, mod.id)}
                  onToggleReview={locked ? undefined : () => toggleReview(mod.id)}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <Card>
          <p className="text-sm text-muted-foreground">
            Aucun module disponible pour l&apos;instant dans cette étape.
          </p>
        </Card>
      )}
    </div>
  );
}

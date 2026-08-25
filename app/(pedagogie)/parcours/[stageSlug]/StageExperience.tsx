"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { getStageCompletionRate } from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";
import type { ParcoursStage } from "@/lib/pedagogy/data/parcours-stages";
import type { Module } from "@/lib/pedagogy/types";

export default function StageExperience({
  stage,
  modules,
}: {
  stage: ParcoursStage;
  modules: Module[];
}) {
  const { progress } = useProgress();
  const completionRate = getStageCompletionRate(stage, progress, modules);

  return (
    <div className="space-y-6">
      <Link href="/parcours" className="text-sm font-medium text-primary hover:underline">
        ← Retour au parcours
      </Link>

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
            {modules.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                completionRate={getModuleCompletionRate(progress, mod)}
                href={`/parcours/module/${mod.slug}`}
              />
            ))}
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

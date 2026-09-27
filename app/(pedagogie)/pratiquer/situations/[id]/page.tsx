import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import SpeakingExerciseRow from "@/components/practice/SpeakingExerciseRow";
import SituationModules from "@/components/practice/SituationModules";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { getLifeSituationById } from "@/lib/pedagogy/data/life-situations";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getSpeakingExerciseById } from "@/lib/speaking/logic/exercises";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import type { SpeakingExercise } from "@/lib/speaking/types";

export async function generateMetadata({ params }: PageProps<"/pratiquer/situations/[id]">): Promise<Metadata> {
  const { id } = await params;
  const situation = getLifeSituationById(id);
  if (!situation) return {};
  return {
    title: `${situation.title} — le français pour la vie en France`,
    description: situation.promise,
    alternates: { canonical: `/pratiquer/situations/${situation.id}` },
  };
}

/**
 * Vue d'une situation de vie : les modules existants qui la travaillent (avec
 * leur état), puis les exercices oraux associés. Aucun contenu recopié —
 * uniquement des liens vers les pages module / exercice, qui gardent leur
 * propre vérification d'accès côté serveur.
 */
export default async function SituationPage({ params }: PageProps<"/pratiquer/situations/[id]">) {
  const { id } = await params;
  const situation = getLifeSituationById(id);
  if (!situation) notFound();

  const user = await getCurrentUser();
  const modules = situation.moduleSlugs
    .map((slug) => PUBLIC_MODULES.find((mod) => mod.slug === slug))
    .filter((mod) => mod !== undefined);
  const speaking = situation.speakingExerciseIds
    .map((exerciseId) => getSpeakingExerciseById(exerciseId))
    .filter((exercise): exercise is SpeakingExercise => Boolean(exercise));

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Pratiquer", path: "/pratiquer" },
          { name: situation.title, path: `/pratiquer/situations/${situation.id}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Pratiquer", href: "/pratiquer#situations" },
          { label: situation.title },
        ]}
      />

      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Situation réelle</p>
        <h1 className="mt-1 text-3xl font-bold text-foreground">{situation.title}</h1>
        <p className="mt-2 text-base text-muted-foreground">{situation.promise}</p>
      </header>

      <section aria-labelledby="situation-modules-title">
        <h2 id="situation-modules-title" className="text-lg font-semibold text-foreground">
          Ce que tu peux apprendre à faire
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Du plus simple (A1) au plus avancé (B1).</p>
        <div className="mt-4">
          <SituationModules modules={modules} />
        </div>
      </section>

      {speaking.length > 0 ? (
        <section aria-labelledby="situation-speaking-title">
          <h2 id="situation-speaking-title" className="text-lg font-semibold text-foreground">
            T&apos;entraîner à parler
          </h2>
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {speaking.map((exercise) => (
              <li key={exercise.id}>
                <SpeakingExerciseRow
                  exercise={exercise}
                  locked={!canAccess({ kind: "speaking", exerciseId: exercise.id }, user?.premiumUntil)}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

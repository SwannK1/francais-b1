import type { Metadata } from "next";
import { HeadphonesIcon, MicrophoneIcon, SunIcon } from "@/components/ui/icons";
import SpeakingPracticeSummary from "@/components/speaking/SpeakingPracticeSummary";
import SpeakingExerciseRow from "@/components/practice/SpeakingExerciseRow";
import SituationTiles from "@/components/practice/SituationTiles";
import ListeningList from "@/components/practice/ListeningList";
import ViewTracker from "@/lib/analytics/ViewTracker";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import { SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { SpeakingExerciseKind } from "@/lib/speaking/types";

export const metadata: Metadata = {
  title: "Pratiquer le français à l'oral",
  description:
    "Parle, écoute et entraîne-toi sur des situations réelles : logement, santé, travail, administration. Enregistre-toi et auto-évalue-toi avec une grille simple.",
  alternates: { canonical: "/pratiquer" },
};

const KIND_ORDER: SpeakingExerciseKind[] = ["situation", "mini_reponse", "repetition", "lecture"];

/**
 * « Pratiquer » — remplace « Oral » dans la navigation. Première version
 * volontairement sans nouveau contenu : elle rassemble ce qui existe déjà
 * (exercices oraux de `/oral`, écoutes des modules, situations de vie) au
 * lieu de construire un nouveau module de pratique.
 */
export default async function PratiquerPage() {
  const user = await getCurrentUser();
  const speakingByKind = KIND_ORDER.map((kind) => ({
    kind,
    exercises: SPEAKING_EXERCISES.filter((exercise) => exercise.kind === kind).sort(
      (a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level)
    ),
  })).filter((group) => group.exercises.length > 0);

  return (
    <div className="space-y-12">
      <JsonLd data={breadcrumbSchema([{ name: "Pratiquer", path: "/pratiquer" }])} />
      <ViewTracker event="practice_hub_viewed" />

      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Pratiquer</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Parle, écoute et entraîne-toi sur les situations de la vraie vie en France.
        </p>
        <nav aria-label="Sections de Pratiquer" className="mt-5 flex flex-wrap gap-2">
          {[
            { href: "#parler", label: "Parler", Icon: MicrophoneIcon },
            { href: "#ecouter", label: "Écouter", Icon: HeadphonesIcon },
            { href: "#situations", label: "Situations réelles", Icon: SunIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="parler" aria-labelledby="parler-title" className="scroll-mt-24">
        <h2 id="parler-title" className="text-xl font-bold text-foreground">
          Parler
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Écoute un modèle, enregistre-toi si tu veux, puis vérifie ta réponse avec une grille simple.
          C&apos;est toi qui t&apos;évalues : aucune machine ne note ta prononciation.
        </p>
        <div className="mt-4">
          <SpeakingPracticeSummary />
        </div>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          {speakingByKind.map(({ kind, exercises }) => (
            <div key={kind}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {SPEAKING_KIND_LABELS[kind]}
              </h3>
              <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
                {exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <SpeakingExerciseRow
                      exercise={exercise}
                      locked={!canAccess({ kind: "speaking", exerciseId: exercise.id }, user?.premiumUntil)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="ecouter" aria-labelledby="ecouter-title" className="scroll-mt-24">
        <h2 id="ecouter-title" className="text-xl font-bold text-foreground">
          Écouter
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Des dialogues et des annonces à ton niveau, avec des questions pour vérifier que tu as compris.
        </p>
        <div className="mt-4">
          <ListeningList publicModules={PUBLIC_MODULES} />
        </div>
      </section>

      <section id="situations" aria-labelledby="situations-title" className="scroll-mt-24">
        <h2 id="situations-title" className="text-xl font-bold text-foreground">
          Situations réelles
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Choisis une situation de ta vie en France et vois ce que tu sais déjà faire.
        </p>
        <div className="mt-4">
          <SituationTiles publicModules={PUBLIC_MODULES} />
        </div>
      </section>
    </div>
  );
}

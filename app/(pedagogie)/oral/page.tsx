import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { LockIcon } from "@/components/ui/icons";
import { SPEAKING_EXERCISES } from "@/lib/speaking/data/exercises";
import { SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import type { SpeakingExerciseKind } from "@/lib/speaking/types";

export const metadata: Metadata = {
  title: "Expression orale",
  description:
    "Entraîne-toi à parler français : répétition de phrases, lecture à voix haute, mini-réponses et mises en situation pratiques, avec auto-évaluation guidée.",
  alternates: { canonical: "/oral" },
};

const KIND_ORDER: SpeakingExerciseKind[] = ["repetition", "lecture", "mini_reponse", "situation"];

/**
 * Zone indépendante du diagnostic, de la révision espacée et de la séance du
 * jour (voir `lib/speaking/types.ts`) : cette page ne lit ni `PARCOURS_STAGES`
 * ni aucune logique de `lib/pedagogy/logic/`.
 */
export default async function OralPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: "Expression orale" }]} />

      <header>
        <h1 className="text-2xl font-bold text-foreground">Expression orale</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Écoute un modèle, enregistre-toi si tu le souhaites, puis auto-évalue-toi avec des critères
          simples. Aucune correction automatique de la prononciation n&apos;existe : personne (ni une IA)
          ne peut noter fiablement ta prononciation aujourd&apos;hui — c&apos;est à toi de juger, avec de
          l&apos;aide.
        </p>
      </header>

      {KIND_ORDER.map((kind) => {
        const exercises = SPEAKING_EXERCISES.filter((exercise) => exercise.kind === kind);
        if (exercises.length === 0) return null;

        return (
          <section key={kind} aria-labelledby={`kind-${kind}-title`}>
            <h2 id={`kind-${kind}-title`} className="mb-3 text-lg font-semibold text-foreground">
              {SPEAKING_KIND_LABELS[kind]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {exercises.map((exercise) => {
                const locked = !canAccess({ kind: "speaking", exerciseId: exercise.id }, user?.premiumUntil);
                return (
                  <Card key={exercise.id}>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="neutral">{exercise.level}</Badge>
                      {exercise.kind === "situation" ? (
                        <Badge variant="secondary">{exercise.situationLabel}</Badge>
                      ) : null}
                      {locked ? (
                        <Badge variant="secondary">
                          <LockIcon className="h-3 w-3" />
                          Offre complète
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{exercise.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{exercise.instructions}</p>
                    <Link
                      href={locked ? "/offre" : `/oral/${exercise.id}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {locked ? "Voir l'offre complète" : "S'entraîner"}
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

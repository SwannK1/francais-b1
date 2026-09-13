"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon } from "@/components/ui/icons";
import AudioExercise from "@/components/pedagogy/AudioExercise";
import { HOMEPAGE_PREVIEW_EXERCISE } from "@/lib/pedagogy/data/homepage-preview";
import { trackEvent } from "@/lib/analytics/client";
import { cn } from "@/lib/cn";

/**
 * Un visiteur non connecté doit pouvoir faire un vrai exercice avant même de
 * s'inscrire (voir `lib/commerce/access.ts` : le test de niveau et deux
 * modules sont déjà gratuits, sans compte). Réutilise tel quel le moteur
 * `AudioExercise`/`QuizQuestion` du reste de l'application — pas de second
 * moteur d'exercice parallèle pour l'accueil.
 */
export default function TryItNow() {
  const [answered, setAnswered] = useState<boolean | null>(null);

  return (
    <section id="essayer" className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Essaie maintenant, sans inscription
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Un vrai exercice du parcours A1, exactement comme dans l&apos;application.
        </p>

        <Card className="mt-8">
          <AudioExercise
            exercise={HOMEPAGE_PREVIEW_EXERCISE}
            onExerciseAnswered={(correct) => {
              setAnswered(correct);
              trackEvent("exercise_completed", {
                exerciseId: HOMEPAGE_PREVIEW_EXERCISE.id,
                exerciseType: HOMEPAGE_PREVIEW_EXERCISE.type,
                correct,
              });
            }}
          />

          {answered !== null ? (
            <div className="mt-5 border-t border-border pt-5 text-center">
              <p className="text-sm font-medium text-foreground">
                {answered
                  ? "Bien joué ! Prêt·e pour la suite ?"
                  : "Pas grave — la correction ci-dessus explique la réponse. Prêt·e pour la suite ?"}
              </p>
              <Link
                href="/test-niveau"
                className={cn(buttonClasses("primary", "lg"), "mt-4 gap-1.5")}
                onClick={() => trackEvent("primary_cta_clicked", { source: "homepage_preview" })}
              >
                Tester mon niveau
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </Card>
      </Container>
    </section>
  );
}

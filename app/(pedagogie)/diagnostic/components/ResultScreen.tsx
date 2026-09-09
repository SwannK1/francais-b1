import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";
import Card from "@/components/ui/Card";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics/client";
import { DIAGNOSTIC_SKILL_LABELS } from "@/lib/diagnostic/types";
import type { DiagnosticResult } from "@/lib/diagnostic/types";

const STOP_REASON_MESSAGE: Record<DiagnosticResult["stopReason"], string | null> = {
  completed: null,
  "early-floor":
    "Le diagnostic s'est arrêté un peu plus tôt : tes réponses aux questions les plus simples montrent que tu commences tout juste ton apprentissage. C'est justement fait pour repérer ça vite et t'orienter directement vers le bon point de départ.",
  "early-ceiling":
    "Le diagnostic s'est arrêté un peu plus tôt : tu as très bien répondu sur les deux premiers paliers de difficulté, ce qui suffit pour estimer ton niveau avec confiance.",
};

export default function ResultScreen({
  result,
  onRestart,
}: {
  result: DiagnosticResult;
  onRestart: () => void;
}) {
  const stopMessage = STOP_REASON_MESSAGE[result.stopReason];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Ton résultat</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ce résultat est un niveau estimé à titre indicatif, il ne remplace pas une
          certification CECRL officielle.
        </p>
      </header>

      {stopMessage ? (
        <p className="rounded-xl border border-border bg-muted p-3 text-sm text-foreground">
          {stopMessage}
        </p>
      ) : null}

      <Card>
        <LevelBadge level={result.estimatedLevel} />
        <p className="mt-3 text-3xl font-bold text-foreground">{result.globalScore}%</p>
        <p className="text-sm text-muted-foreground">
          de bonnes réponses sur {result.questionsAnswered} question
          {result.questionsAnswered > 1 ? "s" : ""}
        </p>
      </Card>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Résultats par domaine</h2>
        <div className="space-y-3">
          {result.skillResults
            .filter((score) => score.total > 0)
            .map((score) => (
              <div key={score.skill}>
                <ProgressBar
                  value={score.successRate}
                  label={`${DIAGNOSTIC_SKILL_LABELS[score.skill]} (${score.correct}/${score.total})`}
                />
                {score.irregular ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Réponses irrégulières sur ce domaine : résultat à confirmer avec plus de pratique.
                  </p>
                ) : null}
              </div>
            ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-foreground">Points forts</h3>
          {result.strengths.length > 0 ? (
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {result.strengths.map((skill) => (
                <li key={skill}>{DIAGNOSTIC_SKILL_LABELS[skill]}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Pas encore de point fort net, continue à t&apos;entraîner.
            </p>
          )}
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-foreground">Points à travailler</h3>
          {result.weaknesses.length > 0 ? (
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {result.weaknesses.map((skill) => (
                <li key={skill}>{DIAGNOSTIC_SKILL_LABELS[skill]}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Rien à signaler pour le moment.</p>
          )}
        </Card>
      </div>

      <Card>
        <p className="text-sm text-foreground">{result.recommendation.message}</p>
        <Link
          href={result.recommendation.stageSlug}
          className={cn(buttonClasses("primary", "md"), "mt-3")}
          onClick={() => trackEvent("diagnostic_cta_clicked", { diagnosticLevel: result.estimatedLevel })}
        >
          Commencer mon parcours
        </Link>
      </Card>

      <button type="button" onClick={onRestart} className={buttonClasses("secondary", "md")}>
        Refaire le diagnostic
      </button>
    </div>
  );
}

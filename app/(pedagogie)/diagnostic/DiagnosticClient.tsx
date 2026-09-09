"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/diagnostic/questions";
import { checkEarlyStop, computeDiagnosticResult } from "@/lib/diagnostic/scoring";
import type { DiagnosticAnswer, DiagnosticResult } from "@/lib/diagnostic/types";
import { trackEvent } from "@/lib/analytics/client";
import IntroScreen from "./components/IntroScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

type Phase = "intro" | "question" | "result";

/**
 * Orchestrateur du diagnostic — état local uniquement (pas de persistance,
 * pas d'écriture dans `useProgress`/`UserProgress` : ce chantier reste
 * délibérément autonome, voir `lib/diagnostic/types.ts`). Toute la logique de
 * décision (arrêt anticipé, score, recommandation) vit dans
 * `lib/diagnostic/scoring.ts`, pure et testée indépendamment de ce composant.
 */
export default function DiagnosticClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);

  function selectChoice(choiceId: string) {
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, choiceId },
    ]);
  }

  function goNext() {
    const nextIndex = currentIndex + 1;
    const administeredSoFar = DIAGNOSTIC_QUESTIONS.slice(0, nextIndex);

    // Le point de contrôle d'arrêt anticipé se situe toujours en fin de
    // palier (6 ou 12 questions administrées) — jamais en cours de palier,
    // voir `checkEarlyStop`.
    const stopReason = checkEarlyStop(administeredSoFar, answers);
    if (stopReason) {
      finalize(administeredSoFar, stopReason);
      return;
    }

    if (nextIndex >= DIAGNOSTIC_QUESTIONS.length) {
      finalize(DIAGNOSTIC_QUESTIONS, "completed");
      return;
    }

    setCurrentIndex(nextIndex);
  }

  function goBack() {
    // Revenir en arrière ne fausse jamais le score : celui-ci ne dépend que
    // de la dernière réponse choisie par question (`answers`, indexée par
    // questionId), jamais de l'ordre de navigation. Impossible de revenir
    // après un résultat déjà calculé (pas de bouton "précédent" sur l'écran
    // de résultat) : on ne défait jamais une décision d'arrêt anticipé.
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  function finalize(administeredQuestions: typeof DIAGNOSTIC_QUESTIONS, stopReason: Parameters<typeof computeDiagnosticResult>[2]) {
    const computed = computeDiagnosticResult(administeredQuestions, answers, stopReason);
    setResult(computed);
    setPhase("result");
    trackEvent("diagnostic_completed", { diagnosticLevel: computed.estimatedLevel });
  }

  function start() {
    setPhase("question");
    trackEvent("diagnostic_started");
  }

  function restart() {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
  }

  const breadcrumbLabel = phase === "result" ? "Ton résultat" : "Diagnostic de niveau";

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parcours", href: "/parcours" }, { label: breadcrumbLabel }]} />

      {phase === "intro" ? <IntroScreen onStart={start} /> : null}

      {phase === "question" && currentQuestion ? (
        <QuestionScreen
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedChoiceId={currentAnswer?.choiceId}
          canGoBack={currentIndex > 0}
          isLast={currentIndex === DIAGNOSTIC_QUESTIONS.length - 1}
          onSelect={selectChoice}
          onNext={goNext}
          onBack={goBack}
        />
      ) : null}

      {phase === "result" && result ? <ResultScreen result={result} onRestart={restart} /> : null}
    </div>
  );
}

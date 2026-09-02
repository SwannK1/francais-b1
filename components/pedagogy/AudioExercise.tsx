"use client";

import { useEffect, useRef, useState } from "react";
import { HeadphonesIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import { notifyAudioPlaying, notifyAudioStopped } from "@/lib/pedagogy/audio-playback";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

// Délai avant de considérer un chargement comme figé (voir `handlePlay`
// ci-dessous). Volontairement généreux : les pistes pèsent au plus quelques
// centaines de Ko, mais une connexion mobile lente doit avoir le temps de
// livrer les premiers octets sans déclencher un faux positif.
const STUCK_LOAD_TIMEOUT_MS = 8000;

export default function AudioExercise({
  exercise,
  onExerciseAnswered,
}: {
  exercise: ComprehensionOraleExercise;
  onExerciseAnswered?: (correct: boolean) => void;
}) {
  const [audioError, setAudioError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState<Record<string, boolean>>({});
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function clearLoadTimeout() {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  }

  // Un seul audio de compréhension orale ne joue jamais tout seul indéfiniment :
  // à la destruction du composant (changement d'étape, de leçon...), on
  // libère aussi bien le minuteur que la coordination inter-lecteurs pour ne
  // rien laisser en suspens.
  useEffect(() => {
    return () => {
      clearLoadTimeout();
      // La ref peut avoir changé d'élément DOM depuis le montage (un
      // `Réessayer` remonte un `<audio>` neuf via sa `key`) : on veut
      // justement la valeur la plus récente à la destruction, pas celle
      // capturée au montage.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      notifyAudioStopped(audioRef.current);
    };
  }, []);

  // Filet de sécurité : pour une source audio manquante, certains navigateurs
  // ne déclenchent ni `error` ni `loadstart` de façon fiable (le lecteur reste
  // bloqué en "lecture" sans jamais charger de données) — sans ce timeout,
  // il reste indéfiniment figé sans qu'aucun message ne s'affiche. `onPlay`
  // se déclenche dès l'appel à `play()`, avant même le chargement des
  // données, donc c'est le point d'ancrage le plus fiable pour armer le délai.
  function handlePlay() {
    notifyAudioPlaying(audioRef.current);
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => setAudioError(true), STUCK_LOAD_TIMEOUT_MS);
  }

  function handleStopped() {
    notifyAudioStopped(audioRef.current);
  }

  /** Remonte un `<audio>` neuf (via la `key`) plutôt que de réutiliser un élément
   * potentiellement resté dans un état d'erreur natif du navigateur. */
  function retry() {
    clearLoadTimeout();
    setAudioError(false);
    setAttempt((value) => value + 1);
  }

  function restartFromBeginning() {
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  function handleAnswered(questionId: string, correct: boolean) {
    const next = { ...answeredCorrect, [questionId]: correct };
    setAnsweredCorrect(next);
    if (Object.keys(next).length === exercise.questions.length) {
      const allCorrect = Object.values(next).every(Boolean);
      onExerciseAnswered?.(allCorrect);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
        <HeadphonesIcon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        {audioError ? (
          <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              Audio non disponible pour le moment. Utilise la transcription ci-dessous.
            </p>
            <button type="button" onClick={retry} className={buttonClasses("secondary", "md")}>
              Réessayer
            </button>
          </div>
        ) : (
          <div className="flex-1 space-y-2">
            <audio
              key={attempt}
              ref={audioRef}
              controls
              preload="none"
              src={exercise.audioSrc}
              aria-label={`Audio : ${exercise.instructions}`}
              onPlay={handlePlay}
              onLoadStart={handlePlay}
              onCanPlay={clearLoadTimeout}
              onLoadedData={clearLoadTimeout}
              onPlaying={clearLoadTimeout}
              onPause={handleStopped}
              onEnded={handleStopped}
              onError={() => {
                clearLoadTimeout();
                handleStopped();
                setAudioError(true);
              }}
              className="w-full"
            >
              Ton navigateur ne prend pas en charge la lecture audio.
            </audio>
            <button
              type="button"
              onClick={restartFromBeginning}
              className={cn(buttonClasses("ghost", "md"), "text-muted-foreground")}
            >
              ↺ Revenir au début
            </button>
          </div>
        )}
      </div>

      {exercise.transcript ? (
        <div>
          <button
            type="button"
            onClick={() => setShowTranscript((value) => !value)}
            className={cn(buttonClasses("secondary", "md"), "text-xs")}
            aria-expanded={showTranscript}
          >
            {showTranscript ? "Masquer la transcription" : "Afficher la transcription"}
          </button>
          {showTranscript ? (
            <p className="mt-2 whitespace-pre-line rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              {exercise.transcript}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-3">
        {exercise.questions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            onAnswered={(correct) => handleAnswered(question.id, correct)}
          />
        ))}
      </div>
    </div>
  );
}

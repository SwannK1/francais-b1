"use client";

import { useEffect, useRef, useState } from "react";
import { HeadphonesIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import QuizQuestion from "@/components/pedagogy/QuizQuestion";
import { toHumanAudioPath } from "@/lib/pedagogy/audio/paths";
import {
  INITIAL_AUDIO_STAGE,
  clearPlaybackIfCurrent,
  nextStageAfterFailure,
  registerPlayback,
  resetStage,
  resolveSrc,
} from "@/lib/pedagogy/audio/playback";
import { trackEvent } from "@/lib/analytics/client";
import type { ComprehensionOraleExercise } from "@/lib/pedagogy/types";

/**
 * Ordre de résolution audio (voir `docs/b1/audio-human-recording-plan.md`) :
 * 1. `human` — enregistrement humain, s'il existe au chemin conventionnel
 *    (`toHumanAudioPath`, dossier `human/` frère du fichier actuel) ;
 * 2. `synthetic` — fichier actuel (`exercise.audioSrc`), toujours conservé
 *    comme filet tant que le fichier humain n'est pas livré ;
 * 3. `error` — aucun des deux n'a pu être chargé : état propre avec un
 *    bouton pour réessayer, jamais un lecteur figé silencieusement.
 * La logique de transition (`nextStageAfterFailure`, `resolveSrc`...) vit
 * dans `lib/pedagogy/audio/playback.ts`, pure et testée indépendamment de ce
 * composant.
 */

const STAGE_LABEL: Record<"human" | "synthetic", string> = {
  human: "Voix humaine",
  synthetic: "Voix de synthèse (temporaire)",
};

export default function AudioExercise({
  exercise,
  onExerciseAnswered,
}: {
  exercise: ComprehensionOraleExercise;
  onExerciseAnswered?: (correct: boolean) => void;
}) {
  const humanSrc = toHumanAudioPath(exercise.audioSrc);
  const syntheticSrc = exercise.audioSrc;

  const [stage, setStage] = useState(INITIAL_AUDIO_STAGE);
  // Ne s'active qu'une fois qu'une source a réellement commencé à jouer —
  // jamais d'annonce du type de voix avant d'être sûr laquelle est utilisée
  // (voir la consigne UX du chantier audio : pas de label trompeur).
  const [confirmed, setConfirmed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wantsPlayRef = useRef(false);
  const skipNextLoadRef = useRef(true);
  // `onPlay` se redéclenche à chaque reprise après pause, y compris pour la
  // relecture automatique de la source synthétique après un repli invisible
  // (voir `advanceStage`) — ce garde-fou compte "l'apprenant a lancé la
  // lecture" une seule fois par tentative, jamais une fois par
  // pause/reprise. Réinitialisé uniquement par `retry()` (vraie nouvelle
  // tentative), jamais par un simple changement de `stage`.
  const playTrackedRef = useRef(false);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (audioRef.current) clearPlaybackIfCurrent(audioRef.current);
    };
  }, []);

  /**
   * Échec de la source en cours : humain -> synthétique -> erreur propre.
   * `audio_error` ne compte que l'échec **terminal** (le repli humain ->
   * synthétique est invisible pour l'apprenant, qui n'a jamais vu d'erreur —
   * le compter aurait pollué le taux d'erreur réel avec des replis silencieux
   * réussis).
   */
  function advanceStage(reason: "native_media_error" | "stuck_load_timeout") {
    clearLoadTimeout();
    setConfirmed(false);
    setStage((current) => {
      const next = nextStageAfterFailure(current);
      if (next === "error") trackEvent("audio_error", { exerciseId: exercise.id, reason });
      return next;
    });
  }

  function restartFromBeginning() {
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  /** Depuis l'état d'erreur : relance le cycle de résolution depuis le début. */
  function retry() {
    wantsPlayRef.current = true;
    playTrackedRef.current = false;
    setConfirmed(false);
    trackEvent("audio_retry", { exerciseId: exercise.id });
    setStage(resetStage());
  }

  // Filet de sécurité : pour une source audio manquante, certains navigateurs
  // ne déclenchent jamais `error` de façon fiable après un `play()` (le
  // lecteur reste bloqué en "lecture" sans jamais charger de données) — sans
  // ce timeout, il reste indéfiniment figé sans qu'aucun message ne
  // s'affiche. Armé uniquement par `onPlay` : `loadstart` se déclenche dès
  // qu'un `src` est posé, même avec `preload="none"` et sans la moindre
  // intention de lecture (vérifié : un `<audio>` fraîchement monté déclenche
  // `loadstart` sans qu'on y touche) — l'utiliser ici déclencherait le filet
  // avant même que l'utilisateur ait appuyé sur lecture.
  function handlePlay() {
    if (!playTrackedRef.current) {
      playTrackedRef.current = true;
      trackEvent("audio_play_started", { exerciseId: exercise.id });
    }
    wantsPlayRef.current = true;
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => advanceStage("stuck_load_timeout"), 4000);
    if (audioRef.current) registerPlayback(audioRef.current);
  }

  function handleReady() {
    clearLoadTimeout();
    setConfirmed(true);
  }

  function handlePause() {
    if (audioRef.current) clearPlaybackIfCurrent(audioRef.current);
  }

  // Bascule effective de la source lors d'un changement de `stage` (pas au
  // montage, pour ne rien charger tant que l'utilisateur n'a pas cliqué
  // lecture — `preload="none"` doit rester paresseux) : `.load()` force le
  // navigateur à réévaluer le nouveau `src`, et on relance la lecture si
  // l'utilisateur l'avait déjà demandée, pour un basculement (ou un
  // réessai) transparent.
  useEffect(() => {
    if (skipNextLoadRef.current) {
      skipNextLoadRef.current = false;
      return;
    }
    const el = audioRef.current;
    if (!el || stage === "error") return;
    el.load();
    if (wantsPlayRef.current) {
      el.play().catch(() => {
        // Lecture automatique refusée par le navigateur : l'utilisateur relance via les contrôles natifs.
      });
    }
  }, [stage]);

  function handleAnswered(questionId: string, correct: boolean) {
    const next = { ...answeredCorrect, [questionId]: correct };
    setAnsweredCorrect(next);
    if (Object.keys(next).length === exercise.questions.length) {
      const allCorrect = Object.values(next).every(Boolean);
      onExerciseAnswered?.(allCorrect);
    }
  }

  const currentSrc = resolveSrc(stage, humanSrc, syntheticSrc);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
        <HeadphonesIcon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        {stage === "error" ? (
          <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              Audio non disponible pour le moment. Utilise la transcription ci-dessous.
            </p>
            <button type="button" onClick={retry} className={cn(buttonClasses("secondary", "md"), "text-xs")}>
              Réessayer
            </button>
          </div>
        ) : (
          <div className="flex-1 space-y-1">
            <audio
              ref={audioRef}
              controls
              preload="none"
              src={currentSrc}
              aria-label={`Audio : ${exercise.instructions}`}
              onPlay={handlePlay}
              onCanPlay={handleReady}
              onLoadedData={handleReady}
              onPlaying={handleReady}
              onError={() => advanceStage("native_media_error")}
              onPause={handlePause}
              onEnded={() => {
                handlePause();
                trackEvent("audio_completed", { exerciseId: exercise.id });
              }}
              className="w-full"
            >
              Ton navigateur ne prend pas en charge la lecture audio.
            </audio>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={restartFromBeginning}
                className={cn(buttonClasses("ghost", "md"), "text-muted-foreground")}
              >
                ↺ Revenir au début
              </button>
              {confirmed ? <p className="text-xs text-muted-foreground">{STAGE_LABEL[stage]}</p> : null}
            </div>
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

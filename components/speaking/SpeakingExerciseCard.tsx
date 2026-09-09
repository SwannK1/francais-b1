"use client";

import { useEffect, useRef, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/button-styles";
import { HeadphonesIcon, MicrophoneIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { registerPlayback, clearPlaybackIfCurrent } from "@/lib/pedagogy/audio/playback";
import { trackEvent } from "@/lib/analytics/client";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";
import { getModelText, SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import type { SpeakingExercise, SpeakingSelfRating } from "@/lib/speaking/types";

/**
 * Étapes du déroulé, volontairement linéaires (voir la même décision dans
 * `components/pedagogy/SpokenExercise.tsx`, dont ce composant s'inspire pour
 * la robustesse micro — mais reste un fichier indépendant : ce chantier ne
 * doit importer/modifier aucun moteur central, voir `lib/speaking/types.ts`).
 */
type Phase = "intro" | "prep" | "record_ready" | "recording" | "review" | "self_assessment" | "done";

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function isRecordingSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    typeof navigator.mediaDevices?.getUserMedia === "function" &&
    typeof MediaRecorder !== "undefined"
  );
}

function isSpeechModelSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined"
  );
}

/** Message compréhensible, jamais le message brut de l'exception navigateur. */
function describeMicError(error: unknown): string {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Autorisation micro refusée. Tu peux continuer sans enregistrement.";
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return "Aucun microphone détecté sur cet appareil. Tu peux continuer sans enregistrement.";
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return "Le microphone n'a pas pu être utilisé (peut-être occupé par une autre application). Tu peux continuer sans enregistrement.";
  }
  return "Une erreur est survenue avec le microphone. Tu peux continuer sans enregistrement.";
}

const SELF_RATING_OPTIONS: { value: SpeakingSelfRating; label: string }[] = [
  { value: "a_revoir", label: "À revoir" },
  { value: "correct", label: "Ça peut aller" },
  { value: "tres_bien", label: "Très bien" },
];

export default function SpeakingExerciseCard({ exercise }: { exercise: SpeakingExercise }) {
  const { recordPractice } = useSpeakingPractice();
  const modelText = getModelText(exercise);

  const [phase, setPhase] = useState<Phase>("intro");
  const [micError, setMicError] = useState<string | null>(null);
  const [prepRemaining, setPrepRemaining] = useState(exercise.prepSeconds);
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedWithoutMic, setRecordedWithoutMic] = useState(false);
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({});
  const [selfRating, setSelfRating] = useState<SpeakingSelfRating | null>(null);
  const [modelSpeaking, setModelSpeaking] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const recordingSupported = isRecordingSupported();
  const speechModelSupported = isSpeechModelSupported();

  function clearTick() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  /** Coupe les pistes micro : jamais laisser le micro actif une fois inutile. */
  function releaseMic() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function revokeAudioUrl() {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }

  // Filet de sécurité : quitter la page en pleine préparation/enregistrement
  // libère quand même le micro, l'URL du blob, et coupe toute synthèse vocale en cours.
  useEffect(() => {
    return () => {
      clearTick();
      releaseMic();
      revokeAudioUrl();
      if (isSpeechModelSupported()) window.speechSynthesis.cancel();
    };
  }, []);

  function playModel() {
    if (!modelText || !speechModelSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(modelText);
    utterance.lang = "fr-FR";
    utterance.onstart = () => setModelSpeaking(true);
    utterance.onend = () => setModelSpeaking(false);
    utterance.onerror = () => setModelSpeaking(false);
    window.speechSynthesis.speak(utterance);
    trackEvent("speaking_model_played", { speakingExerciseId: exercise.id });
  }

  function startPrep() {
    if (exercise.prepSeconds <= 0) {
      setPhase("record_ready");
      return;
    }
    setPrepRemaining(exercise.prepSeconds);
    setPhase("prep");
    clearTick();
    intervalRef.current = setInterval(() => {
      setPrepRemaining((current) => {
        if (current <= 1) {
          clearTick();
          setPhase("record_ready");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }

  function skipPrep() {
    clearTick();
    setPhase("record_ready");
  }

  async function startRecording() {
    setMicError(null);
    if (!recordingSupported) {
      setMicError(
        "L'enregistrement audio n'est pas pris en charge par ce navigateur. Tu peux continuer sans enregistrement."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Interruption externe (permission révoquée en cours, périphérique
      // débranché) : on referme proprement plutôt que de rester figé.
      stream.getAudioTracks()[0]?.addEventListener("ended", () => {
        clearTick();
        if (recorderRef.current?.state === "recording") {
          recorderRef.current.stop();
        }
      });

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        setMicError("Une erreur est survenue pendant l'enregistrement. Tu peux réessayer.");
        clearTick();
        releaseMic();
        setPhase("record_ready");
      };
      recorder.onstop = () => {
        revokeAudioUrl();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;
        setAudioUrl(url);
        setRecordedWithoutMic(false);
        releaseMic();
        setPhase("review");
      };

      recorderRef.current = recorder;
      recorder.start();
      setElapsed(0);
      setPhase("recording");
      clearTick();
      intervalRef.current = setInterval(() => {
        setElapsed((current) => current + 1);
      }, 1000);
    } catch (error) {
      setMicError(describeMicError(error));
    }
  }

  function stopRecording() {
    clearTick();
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    } else {
      releaseMic();
      setPhase("review");
    }
  }

  function retake() {
    revokeAudioUrl();
    setAudioUrl(null);
    setMicError(null);
    setPhase("record_ready");
  }

  function continueWithoutRecording() {
    releaseMic();
    clearTick();
    setRecordedWithoutMic(true);
    setPhase("self_assessment");
  }

  function finish() {
    const withoutRecording = recordedWithoutMic || !audioUrl;
    recordPractice(exercise.id, selfRating, withoutRecording);
    trackEvent("speaking_practice_completed", {
      speakingExerciseId: exercise.id,
      speakingKind: exercise.kind,
      selfRating: selfRating ?? undefined,
    });
    setPhase("done");
  }

  function restartExercise() {
    revokeAudioUrl();
    setAudioUrl(null);
    setMicError(null);
    setCheckedCriteria({});
    setSelfRating(null);
    setElapsed(0);
    setRecordedWithoutMic(false);
    setPhase("intro");
  }

  const speakLimitReached =
    typeof exercise.maxSpeakSeconds === "number" && elapsed >= exercise.maxSpeakSeconds;

  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="primary">{SPEAKING_KIND_LABELS[exercise.kind]}</Badge>
        <Badge variant="neutral">{exercise.level}</Badge>
        {exercise.kind === "situation" ? <Badge variant="secondary">{exercise.situationLabel}</Badge> : null}
      </div>

      <h2 className="text-lg font-semibold text-foreground">{exercise.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{exercise.instructions}</p>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-border bg-background p-4">
          {modelText ? (
            <div className="space-y-3">
              <p className="text-base font-medium leading-relaxed text-foreground">« {modelText} »</p>
              {speechModelSupported ? (
                <button
                  type="button"
                  onClick={playModel}
                  className={cn(buttonClasses("secondary", "md"), "gap-2")}
                >
                  <HeadphonesIcon className="h-4 w-4" />
                  {modelSpeaking ? "Lecture du modèle..." : "Écouter le modèle"}
                </button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  La lecture du modèle n&apos;est pas prise en charge par ce navigateur. Entraîne-toi
                  directement à partir du texte ci-dessus.
                </p>
              )}
            </div>
          ) : exercise.kind === "mini_reponse" ? (
            <p className="text-base font-medium leading-relaxed text-foreground">{exercise.question}</p>
          ) : exercise.kind === "situation" ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{exercise.context}</p>
          ) : null}
        </div>

        {phase === "intro" ? (
          <button type="button" onClick={startPrep} className={buttonClasses("primary", "md")}>
            {exercise.prepSeconds > 0
              ? `Commencer la préparation (${formatTime(exercise.prepSeconds)})`
              : "Passer à l'enregistrement"}
          </button>
        ) : null}

        {phase === "prep" ? (
          <div className="space-y-3 rounded-xl border border-border bg-muted p-4" role="status" aria-live="polite">
            <p className="text-sm font-medium text-foreground">Préparation en cours</p>
            <p className="text-3xl font-bold tabular-nums text-foreground">{formatTime(prepRemaining)}</p>
            <button type="button" onClick={skipPrep} className={buttonClasses("secondary", "md")}>
              Passer la préparation →
            </button>
          </div>
        ) : null}

        {phase === "record_ready" ? (
          <div className="space-y-3">
            {micError ? (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">{micError}</p>
            ) : null}
            {!recordingSupported ? (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                L&apos;enregistrement audio n&apos;est pas pris en charge par ce navigateur. Tu peux
                t&apos;entraîner à voix haute, puis passer directement à l&apos;auto-évaluation.
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={startRecording}
                disabled={!recordingSupported}
                className={cn(buttonClasses("primary", "md"), "gap-2 disabled:opacity-50")}
              >
                <MicrophoneIcon className="h-4 w-4" />
                Démarrer l&apos;enregistrement
              </button>
              <button type="button" onClick={continueWithoutRecording} className={buttonClasses("secondary", "md")}>
                Continuer sans enregistrement
              </button>
            </div>
          </div>
        ) : null}

        {phase === "recording" ? (
          <div className="space-y-3 rounded-xl border border-red-500/40 bg-red-500/5 p-4" role="status" aria-live="polite">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="h-2.5 w-2.5 shrink-0 motion-safe:animate-pulse rounded-full bg-red-500" aria-hidden="true" />
              Enregistrement en cours — {formatTime(elapsed)}
              {typeof exercise.maxSpeakSeconds === "number"
                ? ` / ${formatTime(exercise.maxSpeakSeconds)} conseillées`
                : ""}
            </p>
            {speakLimitReached ? (
              <p className="text-xs text-muted-foreground">
                Temps conseillé dépassé — tu peux continuer ou arrêter dès que tu es prêt·e.
              </p>
            ) : null}
            <button type="button" onClick={stopRecording} className={buttonClasses("primary", "md")}>
              Arrêter l&apos;enregistrement
            </button>
          </div>
        ) : null}

        {phase === "review" && audioUrl ? (
          <div className="space-y-3 rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground">Ton enregistrement</p>
            <audio
              controls
              src={audioUrl}
              aria-label="Ton enregistrement"
              onPlay={(event) => registerPlayback(event.currentTarget)}
              onPause={(event) => clearPlaybackIfCurrent(event.currentTarget)}
              onEnded={(event) => clearPlaybackIfCurrent(event.currentTarget)}
              className="w-full"
            >
              Ton navigateur ne prend pas en charge la lecture audio.
            </audio>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={retake} className={buttonClasses("secondary", "md")}>
                Recommencer la prise
              </button>
              <button type="button" onClick={() => setPhase("self_assessment")} className={buttonClasses("primary", "md")}>
                Continuer →
              </button>
            </div>
          </div>
        ) : null}

        {phase === "self_assessment" ? (
          <div className="space-y-4 rounded-xl border border-border bg-background p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-évaluation</p>
              <p className="text-xs text-muted-foreground">
                Aucune correction automatique de la prononciation n&apos;existe : cette grille sert
                uniquement à t&apos;auto-évaluer, ce n&apos;est pas une note officielle.
              </p>
            </div>
            <ul className="space-y-2">
              {exercise.selfAssessmentCriteria.map((criterion, index) => (
                <li key={index}>
                  <label className="flex items-start gap-2.5 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={Boolean(checkedCriteria[index])}
                      onChange={(event) =>
                        setCheckedCriteria((prev) => ({ ...prev, [index]: event.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
                    />
                    {criterion}
                  </label>
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Comment tu te sens sur cet essai ?</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Auto-évaluation globale">
                {SELF_RATING_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selfRating === option.value}
                    onClick={() => setSelfRating(option.value)}
                    className={buttonClasses(selfRating === option.value ? "primary" : "secondary", "md")}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {exercise.tips ? (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Conseil : </span>
                {exercise.tips}
              </p>
            ) : null}

            <button
              type="button"
              onClick={finish}
              disabled={selfRating === null}
              className={cn(buttonClasses("primary", "md"), "disabled:opacity-50")}
            >
              Terminer l&apos;exercice
            </button>
          </div>
        ) : null}

        {phase === "done" ? (
          <div className="space-y-3 rounded-lg bg-muted p-3 text-sm text-foreground" role="status">
            <p className="font-semibold">Exercice terminé.</p>
            {selfRating ? (
              <p className="text-muted-foreground">
                Auto-évaluation : <span className="font-medium text-foreground">{SELF_RATING_OPTIONS.find((o) => o.value === selfRating)?.label}</span>
              </p>
            ) : null}
            {audioUrl ? (
              <div className="space-y-2">
                <p className="text-muted-foreground">Tu peux réécouter ta prise :</p>
                <audio
                  controls
                  src={audioUrl}
                  aria-label="Ton enregistrement"
                  onPlay={(event) => registerPlayback(event.currentTarget)}
                  onPause={(event) => clearPlaybackIfCurrent(event.currentTarget)}
                  onEnded={(event) => clearPlaybackIfCurrent(event.currentTarget)}
                  className="w-full"
                >
                  Ton navigateur ne prend pas en charge la lecture audio.
                </audio>
              </div>
            ) : null}
            <button type="button" onClick={restartExercise} className={buttonClasses("secondary", "md")}>
              Refaire cet exercice
            </button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

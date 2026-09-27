import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, LockIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { DailySessionPlan, DailySessionStepFocus } from "@/lib/daily/types";

const MODE_LABELS: Record<DailySessionPlan["mode"], string> = {
  decouverte: "Première séance",
  reprise: "Séance du jour",
  apprentissage: "Séance du jour",
  consolidation: "Séance de consolidation",
  retour_apres_absence: "Retour en douceur",
  fin_de_niveau: "Dernière ligne droite",
};

/** Un mot simple par étape : ce que l'apprenant va FAIRE, pas le nom technique de la leçon. */
export const STEP_FOCUS_LABELS: Record<DailySessionStepFocus, string> = {
  reviser: "Révision",
  decouvrir: "Découvrir",
  comprendre: "Comprendre",
  entrainer: "S'entraîner",
  ecouter: "Écouter",
  ecrire: "Écrire",
  parler: "Parler",
  evaluer: "Faire le point",
};

/**
 * Carte de la séance du jour (`lib/daily/`). Hiérarchie voulue : d'abord ce
 * que l'apprenant va savoir FAIRE (`plan.capability`), puis pourquoi, puis
 * le déroulé minuté, puis UNE action. Le titre du module reste secondaire,
 * en pied de carte.
 */
export default function GuidedSessionCard({
  plan,
  href,
  locked = false,
  prominent = false,
  completionRate,
  hideCta = false,
  headingLevel = "h3",
  onStart,
}: {
  plan: DailySessionPlan;
  href: string;
  /** true si le module ciblé fait partie de l'offre complète (voir lib/commerce/access.ts). */
  locked?: boolean;
  /** Mise en avant en point d'entrée principal (`/aujourdhui`) — même carte, présentation renforcée. */
  prominent?: boolean;
  /** Progression du module ciblé (0-100) — omis si non pertinent (ex. verrouillé). */
  completionRate?: number;
  /**
   * Masque le bouton final — uniquement pour le hero de l'accueil
   * (`HeroSessionPreview`), qui affiche cette carte comme contexte à côté
   * du vrai bouton d'action (`PrimaryCta`) : sans ce drapeau, la même action
   * apparaîtrait deux fois sur le même écran.
   */
  hideCta?: boolean;
  /** `h1` sur `/aujourdhui`, où la séance EST le sujet de la page. */
  headingLevel?: "h1" | "h2" | "h3";
  onStart?: () => void;
}) {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card shadow-sm",
        prominent ? "border-primary/25 p-5 sm:p-8" : "border-border p-6"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
          {MODE_LABELS[plan.mode]} · environ {plan.totalEstimatedMinutes} min
        </p>
        {locked ? (
          <Badge variant="secondary">
            <LockIcon className="h-3 w-3" />
            Accès complet
          </Badge>
        ) : null}
      </div>

      <Heading
        className={cn(
          "mt-2 font-bold leading-tight text-foreground",
          prominent ? "text-2xl sm:text-3xl" : "text-lg"
        )}
      >
        {plan.capability}
      </Heading>
      <p className={cn("mt-2 text-muted-foreground", prominent ? "text-base" : "text-sm")}>{plan.reason}</p>

      <ol className={cn("mt-5 divide-y divide-border rounded-xl border border-border", prominent ? "bg-background" : "")}>
        {plan.steps.map((step) => (
          <li key={step.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">{STEP_FOCUS_LABELS[step.focus]}</span>
              {step.title.toLowerCase() !== STEP_FOCUS_LABELS[step.focus].toLowerCase() ? (
                <span className="block truncate text-xs text-muted-foreground">{step.title}</span>
              ) : null}
            </span>
            <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{step.estimatedMinutes} min</span>
          </li>
        ))}
      </ol>

      {!locked && typeof completionRate === "number" && completionRate > 0 ? (
        <ProgressBar value={completionRate} label="Déjà fait dans ce module" className="mt-4" />
      ) : null}

      {!hideCta ? (
        <Link
          href={href}
          onClick={onStart}
          className={cn(
            buttonClasses("primary", prominent ? "lg" : "md"),
            "mt-6 h-auto! min-h-12 w-full gap-1.5 py-3 text-center sm:w-auto"
          )}
        >
          {locked ? "Voir l'accès complet" : plan.isResuming ? "Continuer ma séance" : "Commencer ma séance"}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}

      <p className="mt-4 text-xs text-muted-foreground">
        Module : {plan.moduleTitle} · {plan.stageTitle}
      </p>
    </div>
  );
}

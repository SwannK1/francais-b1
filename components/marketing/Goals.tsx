import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ChatIcon,
  ExamIcon,
  FlagIcon,
  GraduationCapIcon,
  HomeIcon,
} from "@/components/ui/icons";
import { LEARNING_GOALS } from "@/lib/pedagogy/data/goals";
import type { LearningGoal, LearningGoalId } from "@/lib/pedagogy/types";

/**
 * Sous-ensemble mis en avant sur l'accueil, parmi les objectifs réels de
 * `lib/pedagogy/data/goals.ts` (même source que le test de niveau et le
 * bandeau "Objectif" du parcours — jamais une liste parallèle). Les
 * objectifs plus spécifiques (carte de séjour, TCF IRN...) restent
 * disponibles au moment du test, pas dupliqués ici.
 */
const FEATURED_GOAL_IDS: LearningGoalId[] = [
  "vivre_en_france",
  "travail",
  "naturalisation",
  "etudes",
  "delf",
  "ameliorer_francais",
];

const GOAL_ICONS: Partial<Record<LearningGoalId, typeof HomeIcon>> = {
  vivre_en_france: HomeIcon,
  travail: BriefcaseIcon,
  naturalisation: FlagIcon,
  etudes: GraduationCapIcon,
  delf: ExamIcon,
  ameliorer_francais: ChatIcon,
};

export default function Goals() {
  const featuredGoals = FEATURED_GOAL_IDS
    .map((id) => LEARNING_GOALS.find((goal) => goal.id === id))
    .filter((goal): goal is LearningGoal => Boolean(goal));

  return (
    <section id="objectifs" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pourquoi apprends-tu le français ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Choisis ton objectif : le test de niveau démarre avec, et ton parcours s&apos;organise autour.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGoals.map((goal) => {
            const Icon = GOAL_ICONS[goal.id] ?? HomeIcon;
            return (
              <Link
                key={goal.id}
                href={`/test-niveau?goal=${goal.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 font-medium text-foreground">{goal.title}</span>
                <ArrowRightIcon
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

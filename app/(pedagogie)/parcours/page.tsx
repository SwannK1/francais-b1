import Card from "@/components/ui/Card";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import DailySessionCard from "@/components/pedagogy/DailySessionCard";
import ExamCard from "@/components/pedagogy/ExamCard";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import { DEMO_USER_PROGRESS } from "@/lib/pedagogy/data/demo-user-progress";
import { getLearningGoalById } from "@/lib/pedagogy/data/goals";
import { MODULES, getModulesByLevel } from "@/lib/pedagogy/data/modules";
import { EXAMS } from "@/lib/pedagogy/data/exams";
import { computeDailySession } from "@/lib/pedagogy/logic/recommendation";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";

export default function ParcoursPage() {
  const level = DEMO_USER_PROGRESS.level;
  const modules = getModulesByLevel(level);
  const goal = DEMO_USER_PROGRESS.goalId ? getLearningGoalById(DEMO_USER_PROGRESS.goalId) : undefined;
  const dailySession = computeDailySession(DEMO_USER_PROGRESS, MODULES);
  const dailySessionModule = dailySession ? MODULES.find((m) => m.id === dailySession.moduleId) : undefined;

  const completionRates = modules.map((mod) => getModuleCompletionRate(DEMO_USER_PROGRESS, mod));
  const modulesTermines = completionRates.filter((rate) => rate >= 100).length;

  return (
    <div className="space-y-8">
      <header>
        <LevelBadge level={level} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">Tableau de bord</h1>
        {goal ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Objectif : <strong className="text-foreground">{goal.title}</strong>
          </p>
        ) : null}
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs font-medium text-muted-foreground">Modules terminés</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {modulesTermines} / {modules.length}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-muted-foreground">Prochaine étape</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {dailySessionModule ? dailySessionModule.title : "Parcours terminé"}
          </p>
        </Card>
      </div>

      {dailySession && dailySessionModule ? (
        <section aria-labelledby="daily-session-title">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Aujourd&apos;hui
          </h2>
          <DailySessionCard session={dailySession} href={`/module/${dailySessionModule.slug}`} />
        </section>
      ) : null}

      <section aria-labelledby="modules-title">
        <h2 id="modules-title" className="mb-3 text-lg font-semibold text-foreground">
          Modules — niveau {level}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod, index) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              number={index + 1}
              completionRate={completionRates[index]}
              href={`/module/${mod.slug}`}
            />
          ))}

          <Card className="flex flex-col items-start justify-center border-dashed text-center sm:items-center">
            <p className="text-sm font-medium text-foreground">19 modules supplémentaires</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Le reste du parcours B1 arrive bientôt.
            </p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="exams-title">
        <h2 id="exams-title" className="mb-3 text-lg font-semibold text-foreground">
          Préparation examen
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Un utilisateur déjà B1 peut préparer directement un examen sans refaire tout le
          parcours.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {EXAMS.map((exam) => (
            <ExamCard key={exam.id} exam={exam} href={`#exam-${exam.slug}`} />
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {EXAMS.map((exam) => (
            <div key={exam.id} id={`exam-${exam.slug}`} className="scroll-mt-24 space-y-4">
              <h3 className="text-base font-semibold text-foreground">{exam.title}</h3>
              {exam.sections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {section.title} · {section.durationMinutes} min · {section.maxScore} points
                  </p>
                  {section.exercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

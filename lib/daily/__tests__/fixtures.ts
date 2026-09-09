import { countModuleExercises } from "@/lib/pedagogy/logic/module-structure";
import type { Exercise, Lesson, LessonStepType, Module, PublicModule, StageId } from "@/lib/pedagogy/types";

export {
  makeModule,
  makeModuleProgress,
  makeProgress,
  makePublicModule,
} from "@/lib/pedagogy/logic/__tests__/fixtures";

/**
 * Fixtures dédiées au moteur de séance : `makeModule`/`makePublicModule`
 * (réexportés ci-dessus) créent un module d'une seule leçon, insuffisant
 * pour tester la composition d'une séance à plusieurs étapes. Toujours du
 * contenu synthétique — jamais le vrai catalogue — pour que ces tests ne
 * cassent pas quand le contenu pédagogique réel change.
 */

function makeExercise(id: string, skillId = "test-skill"): Exercise {
  return {
    id,
    type: "vrai_faux",
    skillId,
    difficulty: "B1",
    instructions: "Vrai ou faux ?",
    statement: "Énoncé de test.",
    correctAnswer: true,
    correction: { correctAnswer: "Vrai", explanation: "Parce que." },
  };
}

function makeLesson(
  moduleId: string,
  type: LessonStepType,
  exerciseCount = 1,
  skillId = "test-skill"
): Lesson {
  return {
    id: `${moduleId}-${type}`,
    type,
    title: `Leçon ${type}`,
    optional: false,
    activities: [
      {
        id: `${moduleId}-${type}-activity`,
        title: "Activité",
        skillDomain: "vocabulaire",
        exercises: Array.from({ length: exerciseCount }, (_, index) =>
          makeExercise(`${moduleId}-${type}-ex${index + 1}`, skillId)
        ),
      },
    ],
  };
}

/**
 * Module complet à plusieurs leçons, dans l'ordre pédagogique habituel
 * (decouvrir → comprendre → entrainement → ecoute → ecriture → evaluation).
 * `lessonTypes` permet de simuler l'absence de certains types (ex. aucune
 * leçon "ecoute" → cas "absence d'audio") sans dupliquer cette fonction.
 */
export function makeSessionModule(overrides: {
  id: string;
  slug: string;
  stageId?: StageId;
  lessonTypes?: LessonStepType[];
  skillId?: string;
}): Module {
  const lessonTypes = overrides.lessonTypes ?? [
    "decouvrir",
    "comprendre",
    "ecoute",
    "entrainement",
    "ecriture",
    "evaluation",
  ];
  const lessons = lessonTypes.map((type) => makeLesson(overrides.id, type, 2, overrides.skillId));

  return {
    id: overrides.id,
    slug: overrides.slug,
    level: "B1",
    title: `Module ${overrides.id}`,
    description: "Module de test à plusieurs leçons.",
    objectives: ["Faire quelque chose de précis"],
    domain: "vocabulaire",
    stageId: overrides.stageId ?? "b1-debut",
    estimatedMinutes: lessons.length * 5,
    lessons,
  };
}

export function makeSessionPublicModule(overrides: Parameters<typeof makeSessionModule>[0]): PublicModule {
  const mod = makeSessionModule(overrides);
  return { ...mod, totalExercises: countModuleExercises(mod) };
}

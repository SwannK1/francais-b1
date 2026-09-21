// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import SeanceExperience from "@/app/(pedagogie)/parcours/seance/SeanceExperience";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { trackEvent } from "@/lib/analytics/client";
import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getEffectiveLevel } from "@/lib/pedagogy/logic/parcours";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { determineDailySessionMode, buildSessionSteps } from "@/lib/daily/session-engine";
import type { UserProgress, VraiFauxExercise } from "@/lib/pedagogy/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

/**
 * `SeanceExperience` orchestre `lib/daily/session-engine.ts` (déjà testé
 * isolément, `lib/daily/__tests__/session-engine.test.ts`) : ces tests
 * couvrent uniquement l'assemblage client — chargement, navigation entre
 * étapes, écriture réelle de la progression, écran de fin — et surtout la
 * régression du bug historique documenté dans le composant lui-même
 * (commentaire au-dessus du `useState` figeant `{ mode, steps }`) : recalculer
 * `steps` en réaction à `progress` pendant la séance désynchronisait
 * `stepIndex` de la liste réelle ("Étape 5 sur 4"). On vérifie donc
 * explicitement que répondre à un exercice — qui change forcément `progress`
 * et donc `determineDailySessionMode` si on le recalculait — ne fait NI
 * bouger le nombre d'étapes affiché NI son intitulé.
 *
 * Utilise le vrai module `se-presenter` (gratuit) du catalogue plutôt qu'un
 * module fabriqué à la main — mêmes raisons que `ReviserExperience.test.tsx` :
 * `recordResult` recalcule `skillProgress` depuis `moduleProgress` +
 * `PUBLIC_MODULES` (voir `lib/pedagogy/logic/progress.ts:computeSkillProgress`),
 * un exercice inventé ne s'y retrouverait jamais correctement compté.
 */
const STORAGE_KEY = "francais-b1:user-progress";
const MODULE_SLUG = "se-presenter";

function seedProgress(overrides: Partial<UserProgress> = {}) {
  const progress: UserProgress = { ...EMPTY_USER_PROGRESS, userId: "test-user", ...overrides };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

function readProgress(): UserProgress {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
}

function mockAuthFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ user: null }) }))
  );
}

/** Même calcul que le composant au montage — sert d'oracle pour les assertions, jamais de nombre codé en dur. */
function computeExpectedSteps(progress: UserProgress) {
  const levelModules = PUBLIC_MODULES.filter((m) => m.level === getEffectiveLevel(progress, PUBLIC_MODULES));
  const mode = determineDailySessionMode(progress, levelModules);
  const reviewItem = getReviewItems(progress, levelModules)[0] ?? null;
  const mod = getModuleBySlug(MODULE_SLUG)!;
  return { mode, steps: buildSessionSteps(mod, progress, mode, reviewItem) };
}

/** Premier exercice vrai/faux réel trouvé dans le module — jamais de contenu inventé. */
function findVraiFauxExercise() {
  const mod = getModuleBySlug(MODULE_SLUG)!;
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      const exercise = activity.exercises.find((ex): ex is VraiFauxExercise => ex.type === "vrai_faux");
      if (exercise) return { mod, lesson, exercise };
    }
  }
  throw new Error("Aucun exercice vrai_faux trouvé dans se-presenter");
}

/**
 * L'étape contenant l'exercice vrai/faux peut porter d'autres exercices
 * (plusieurs "Vérifier" sur la même page) — on scope donc la recherche au
 * conteneur direct du groupe "Vrai ou faux" plutôt que d'interroger toute
 * la page, jamais fragile face au nombre d'exercices voisins.
 */
async function answerVraiFaux(user: ReturnType<typeof userEvent.setup>, exercise: VraiFauxExercise) {
  const group = screen.getByRole("group", { name: /vrai ou faux/i });
  await user.click(within(group).getByRole("button", { name: exercise.correctAnswer ? "Vrai" : "Faux" }));
  const container = group.parentElement!;
  await user.click(within(container).getByRole("button", { name: "Vérifier" }));
}

beforeEach(() => {
  window.localStorage.clear();
  // jsdom n'implémente pas scrollIntoView — utilisé par le composant pour
  // ramener le focus sur le titre de l'étape après chaque navigation.
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.mocked(trackEvent).mockClear();
});

function renderSeance() {
  const mod = getModuleBySlug(MODULE_SLUG)!;
  return render(
    <AuthProvider>
      <SeanceExperience mod={mod} />
    </AuthProvider>
  );
}

describe("/parcours/seance — SeanceExperience", () => {
  it("charge la séance avec le bon nombre d'étapes et le titre du module", async () => {
    mockAuthFetch();
    const progress = seedProgress();
    const { steps } = computeExpectedSteps(progress);
    renderSeance();

    expect(await screen.findByRole("heading", { name: /séance du jour/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Se présenter")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`étape 1 sur ${steps.length}`, "i"))).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: new RegExp(`^1\\. ${steps[0].title}$`) })).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("daily_session_started", { moduleId: "b1-se-presenter" });
  });

  it("navigue entre les étapes (Suivant, Précédent, clic direct sur une puce) sans jamais sortir des bornes", async () => {
    const user = userEvent.setup();
    mockAuthFetch();
    const progress = seedProgress();
    const { steps } = computeExpectedSteps(progress);
    renderSeance();

    await screen.findByText(new RegExp(`étape 1 sur ${steps.length}`, "i"));
    expect(screen.getByRole("button", { name: /précédent/i })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /suivant/i }));
    expect(await screen.findByText(new RegExp(`étape 2 sur ${steps.length}`, "i"))).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: new RegExp(`^2\\. ${steps[1].title}$`) })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /précédent/i })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: /précédent/i }));
    expect(await screen.findByText(new RegExp(`étape 1 sur ${steps.length}`, "i"))).toBeInTheDocument();

    // Puce de la dernière étape : navigation directe, jamais seulement séquentielle.
    const lastIndex = steps.length - 1;
    const nav = screen.getByRole("navigation", { name: /étapes de la séance/i });
    await user.click(within(nav).getByRole("button", { name: new RegExp(steps[lastIndex].title) }));
    expect(await screen.findByText(new RegExp(`étape ${lastIndex + 1} sur ${steps.length}`, "i"))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /terminer la séance/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /quitter la séance/i })).toHaveAttribute("href", "/parcours");
  });

  it("garde le nombre d'étapes strictement figé après avoir répondu à un exercice, même si le mode recalculé changerait", async () => {
    const user = userEvent.setup();
    mockAuthFetch();
    const progress = seedProgress();
    const { mode: initialMode, steps: initialSteps } = computeExpectedSteps(progress);
    expect(initialMode).toBe("decouverte"); // garanti par EMPTY_USER_PROGRESS — voir determineDailySessionMode

    const { lesson, exercise } = findVraiFauxExercise();
    renderSeance();

    // Va directement à l'étape contenant cet exercice, via sa puce de navigation.
    const stepIndex = initialSteps.findIndex((s) => s.lessonId === lesson.id);
    expect(stepIndex).toBeGreaterThanOrEqual(0);
    const nav = screen.getByRole("navigation", { name: /étapes de la séance/i });
    const pillsBefore = within(nav).getAllByRole("button");
    expect(pillsBefore).toHaveLength(initialSteps.length);
    await user.click(within(nav).getByRole("button", { name: new RegExp(initialSteps[stepIndex].title) }));
    await screen.findByText(new RegExp(`étape ${stepIndex + 1} sur ${initialSteps.length}`, "i"));

    await answerVraiFaux(user, exercise);

    // La progression a bien changé...
    const updatedProgress = readProgress();
    expect(updatedProgress.moduleProgress.find((mp) => mp.moduleId === "b1-se-presenter")).toBeTruthy();
    // ...au point qu'un recalcul du mode donnerait un résultat différent de "decouverte"
    // (dès qu'un exercice est complété, hasAnyActivity devient vrai) — la preuve que le
    // composant DOIT ignorer ce nouveau calcul pour ne pas se désynchroniser.
    const recomputedMode = determineDailySessionMode(
      updatedProgress,
      PUBLIC_MODULES.filter((m) => m.level === getEffectiveLevel(updatedProgress, PUBLIC_MODULES))
    );
    expect(recomputedMode).not.toBe("decouverte");

    // Et pourtant l'affichage reste sur exactement le même total d'étapes qu'au montage.
    expect(screen.getByText(new RegExp(`étape ${stepIndex + 1} sur ${initialSteps.length}`, "i"))).toBeInTheDocument();
    expect(within(nav).getAllByRole("button")).toHaveLength(initialSteps.length);
  });

  it("mène la séance jusqu'au bilan de fin, avec un résultat cohérent et la progression réellement écrite", async () => {
    const user = userEvent.setup();
    mockAuthFetch();
    const progress = seedProgress();
    const { steps } = computeExpectedSteps(progress);
    const { lesson, exercise } = findVraiFauxExercise();
    const exerciseStepIndex = steps.findIndex((s) => s.lessonId === lesson.id);

    renderSeance();
    await screen.findByText(new RegExp(`étape 1 sur ${steps.length}`, "i"));

    for (let i = 0; i < steps.length; i++) {
      if (i === exerciseStepIndex) {
        await answerVraiFaux(user, exercise);
      }
      const isLast = i === steps.length - 1;
      await user.click(screen.getByRole("button", { name: isLast ? /terminer la séance/i : /^suivant/i }));
    }

    expect(await screen.findByRole("heading", { name: /bravo, séance complétée/i })).toBeInTheDocument();
    expect(screen.getByText(/réussite globale sur cette séance/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/1 \(100%\)/)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("daily_session_completed", { moduleId: "b1-se-presenter" });

    const finalProgress = readProgress();
    const moduleProgress = finalProgress.moduleProgress.find((mp) => mp.moduleId === "b1-se-presenter");
    expect(moduleProgress?.completedExerciseIds).toContain(exercise.id);
    expect(moduleProgress?.correctExerciseIds).toContain(exercise.id);
  });

  it("affiche un état de repli propre, jamais un écran cassé, quand le module n'a aucune leçon exploitable", async () => {
    mockAuthFetch();
    seedProgress();
    const emptyModule = { ...getModuleBySlug(MODULE_SLUG)!, lessons: [] };

    render(
      <AuthProvider>
        <SeanceExperience mod={emptyModule} />
      </AuthProvider>
    );

    expect(await screen.findByText(/aucune séance disponible/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /retour au parcours/i })).toHaveAttribute("href", "/parcours");
  });
});

// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import ReviserExperience from "@/app/(pedagogie)/reviser/ReviserExperience";
import { AuthProvider, type SessionUser } from "@/lib/auth/AuthProvider";
import { trackEvent } from "@/lib/analytics/client";
import { EMPTY_USER_PROGRESS } from "@/lib/pedagogy/data/initial-user-progress";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { recordExerciseResult } from "@/lib/pedagogy/logic/progress";
import type { Exercise, Module, SkillProgress, UserProgress } from "@/lib/pedagogy/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), back: vi.fn(), replace: vi.fn() }),
}));

/**
 * `/reviser` orchestre trois briques déjà testées isolément (`lib/review/`,
 * `lib/pedagogy/logic/review.ts`, `app/api/review/session/route.ts`) : ces
 * tests couvrent uniquement l'assemblage — quelle section s'affiche pour
 * quel état, la frontière contenu premium (voir le commentaire sur
 * `sessionPool` dans `ReviserExperience.tsx`), et que finir une séance écrit
 * vraiment dans la progression sans abîmer le reste. Jamais un deuxième test
 * des règles de classification elles-mêmes (`lib/review/__tests__/engine.test.ts`).
 *
 * Pour les scénarios qui déclenchent réellement `recordResult` (répondre à
 * un exercice), on construit l'état "avant" avec la vraie fonction pure
 * `recordExerciseResult` sur un vrai exercice du catalogue plutôt qu'en
 * fabriquant à la main un `SkillProgress` : `completedExercises`/
 * `correctExercises`/`successRate` sont recalculés à chaque appel depuis
 * `moduleProgress` + le catalogue réel (voir `computeSkillProgress`), jamais
 * simplement incrémentés depuis la valeur stockée — un `SkillProgress`
 * inventé à la main survivrait donc rarement intact au premier appel réel.
 * Pour les tests purement "lecture" (aucune réponse donnée), un
 * `SkillProgress` fabriqué à la main reste sûr : rien ne le recalcule.
 */
const STORAGE_KEY = "francais-b1:user-progress";
const FREE_MODULE_SLUG = "se-presenter"; // lib/commerce/access.ts: FREE_MODULE_SLUGS
const FREE_MODULE_ID = "b1-se-presenter";
const PREMIUM_SKILL_ID = "pe-reformuler-consignes"; // module "comprendre-instructions-pharmacien", premium
const PREMIUM_MODULE_SLUG = "comprendre-instructions-pharmacien";

function seedProgress(overrides: Partial<UserProgress>) {
  const progress: UserProgress = { ...EMPTY_USER_PROGRESS, userId: "test-user", ...overrides };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

function writeProgress(progress: UserProgress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function readProgress(): UserProgress {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
}

function isolatedErrorSkill(skillId: string, daysAgo = 0): SkillProgress {
  return {
    skillId,
    domain: "production_ecrite",
    totalExercises: 5,
    completedExercises: 1,
    correctExercises: 0,
    successRate: 0,
    lastPracticedAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
    recentOutcomes: [false],
  };
}

function stalePracticingSkill(skillId: string, daysAgo = 6): SkillProgress {
  return {
    skillId,
    domain: "production_ecrite",
    totalExercises: 5,
    completedExercises: 2,
    correctExercises: 1,
    successRate: 60,
    lastPracticedAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
    recentOutcomes: [true],
  };
}

/** Premier exercice réel d'un module/compétence/type donnés — jamais de contenu inventé. */
function findRealExercise(moduleSlug: string, skillId: string, type: Exercise["type"]): { module: Module; exercise: Exercise } {
  const mod = MODULES.find((m) => m.slug === moduleSlug);
  if (!mod) throw new Error(`Module introuvable : ${moduleSlug}`);
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      const exercise = activity.exercises.find((ex) => ex.skillId === skillId && ex.type === type);
      if (exercise) return { module: mod, exercise };
    }
  }
  throw new Error(`Exercice introuvable : ${moduleSlug}/${skillId}/${type}`);
}

function mockFetch(options: { user: SessionUser | null; sessionItems?: { skillId: string; module: Module; exercise: Exercise }[] }) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/api/auth/me")) {
        return { ok: true, status: 200, json: async () => ({ user: options.user }) };
      }
      if (url.includes("/api/review/session")) {
        return { ok: true, status: 200, json: async () => ({ items: options.sessionItems ?? [] }) };
      }
      return { ok: true, status: 200, json: async () => ({}) };
    })
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.mocked(trackEvent).mockClear();
});

function renderReviser() {
  return render(
    <AuthProvider>
      <ReviserExperience />
    </AuthProvider>
  );
}

describe("/reviser — ReviserExperience", () => {
  it("affiche « Tu es à jour » quand aucune compétence n'a jamais été pratiquée", async () => {
    mockFetch({ user: null });
    seedProgress({});
    renderReviser();

    expect(await screen.findByText(/tu es à jour/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continuer ma séance/i })).toHaveAttribute("href", "/parcours");
  });

  it("propose une séance interactive quand une compétence d'un module gratuit est à revoir", async () => {
    mockFetch({ user: null }); // anonyme/gratuit — se-presenter est un module gratuit
    seedProgress({ skillProgress: [isolatedErrorSkill("pe-se-presenter")] });
    renderReviser();

    expect(await screen.findByText(/1 élément à travailler/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /commencer ma révision/i })).toBeInTheDocument();
  });

  it("bascule sur les cartes « à revoir » (jamais une séance embarquée) quand la seule compétence due appartient à un module premium inaccessible", async () => {
    mockFetch({ user: null }); // compte gratuit
    seedProgress({ skillProgress: [isolatedErrorSkill(PREMIUM_SKILL_ID)] });
    renderReviser();

    expect(await screen.findByRole("heading", { name: /^à revoir$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reprendre/i })).toHaveAttribute(
      "href",
      `/parcours/module/${PREMIUM_MODULE_SLUG}`
    );
    // Frontière contenu premium : jamais de séance interactive embarquant du contenu verrouillé.
    expect(screen.queryByRole("button", { name: /commencer ma révision/i })).not.toBeInTheDocument();
  });

  it("propose au contraire la séance interactive pour cette même compétence premium dès que le compte est premium", async () => {
    mockFetch({
      user: { id: "u1", email: "a@b.com", premiumUntil: new Date(Date.now() + 86_400_000).toISOString() },
    });
    seedProgress({ skillProgress: [isolatedErrorSkill(PREMIUM_SKILL_ID)] });
    renderReviser();

    expect(await screen.findByRole("button", { name: /commencer ma révision/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^à revoir$/i })).not.toBeInTheDocument();
  });

  it("affiche la bande « Consolidation » pour une compétence en apprentissage qui commence à dater, sur un module premium inaccessible", async () => {
    mockFetch({ user: null });
    seedProgress({ skillProgress: [stalePracticingSkill(PREMIUM_SKILL_ID)] });
    renderReviser();

    expect(await screen.findByRole("heading", { name: /consolidation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reprendre/i })).toHaveAttribute(
      "href",
      `/parcours/module/${PREMIUM_MODULE_SLUG}`
    );
  });

  it("liste un module marqué « à revoir » manuellement, avec un lien correct, et le retire (écran + progression persistée) quand on clique sur retirer", async () => {
    const user = userEvent.setup();
    mockFetch({ user: null });
    seedProgress({ reviewedModuleIds: [FREE_MODULE_ID] });
    renderReviser();

    expect(await screen.findByRole("heading", { name: /modules marqués à revoir/i })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /y aller/i });
    expect(link).toHaveAttribute("href", `/parcours/module/${FREE_MODULE_SLUG}`);

    await user.click(screen.getByRole("button", { name: /retirer de « à revoir »/i }));

    expect(screen.queryByRole("heading", { name: /modules marqués à revoir/i })).not.toBeInTheDocument();
    expect(readProgress().reviewedModuleIds).toEqual([]);
  });

  it("mène une séance de bout en bout : répond réellement à un vrai exercice, jusqu'au bilan, sans jamais perdre l'accès à /parcours", async () => {
    const user = userEvent.setup();
    // Vrai exercice du catalogue (module gratuit) — voir le commentaire en tête de fichier
    // sur pourquoi on ne fabrique pas un SkillProgress à la main ici.
    const { module: seModule, exercise: seExercise } = findRealExercise(FREE_MODULE_SLUG, "ce-textes-courants", "vrai_faux");
    if (seExercise.type !== "vrai_faux") throw new Error("garde-fou TypeScript");

    // Une vraie tentative ratée au préalable, via la vraie fonction de calcul —
    // état "avant" garanti cohérent avec `moduleProgress`.
    const before = recordExerciseResult(EMPTY_USER_PROGRESS, seModule, seExercise, false);
    writeProgress({ ...before, userId: "test-user" });

    mockFetch({ user: null, sessionItems: [{ skillId: "ce-textes-courants", module: seModule, exercise: seExercise }] });
    renderReviser();

    await user.click(await screen.findByRole("button", { name: /commencer ma révision/i }));
    expect(await screen.findByText(/élément 1 sur 1/i)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("review_session_started", { itemCount: 1 });

    await user.click(screen.getByRole("button", { name: seExercise.correctAnswer ? "Vrai" : "Faux" }));
    await user.click(screen.getByRole("button", { name: "Vérifier" }));

    // Un retour de classification s'affiche forcément (une des 3 catégories
    // pédagogiques partagées avec /progression, voir lib/review/summary.ts) —
    // laquelle précisément dépend du volume réel d'exercices du catalogue
    // pour cette compétence, déjà couvert ailleurs (engine.test.ts) : on ne
    // le re-teste pas ici, seulement qu'un retour cohérent existe.
    const feedbackTitle = await screen.findByText(/^(à consolider|à revoir|maîtrisé)$/i);
    await user.click(screen.getByRole("button", { name: /voir le bilan/i }));

    expect(await screen.findByRole("heading", { name: /révision terminée/i })).toBeInTheDocument();
    expect(screen.getByText(/1 notion travaillée/i)).toBeInTheDocument();
    const recapLine = feedbackTitle.textContent!.toLowerCase();
    const expectedRecapText =
      recapLine === "maîtrisé" ? /1 maîtrisées/i : recapLine === "à consolider" ? /1 à consolider/i : /1 à revoir/i;
    expect(screen.getByText(expectedRecapText)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continuer mon parcours/i })).toHaveAttribute("href", "/parcours");
    expect(trackEvent).toHaveBeenCalledWith("review_session_completed", { itemCount: 1 });

    // La progression a vraiment été écrite (nouvelle réponse enregistrée)...
    const finalProgress = readProgress();
    const finalModuleProgress = finalProgress.moduleProgress.find((mp) => mp.moduleId === seModule.id);
    expect(finalModuleProgress?.completedExerciseIds).toContain(seExercise.id);
    if (seExercise.correctAnswer) {
      expect(finalModuleProgress?.correctExerciseIds).toContain(seExercise.id);
    }
    const finalSkill = finalProgress.skillProgress.find((sp: SkillProgress) => sp.skillId === "ce-textes-courants");
    expect(finalSkill?.recentOutcomes).toEqual([false, true]);
  });

  it("laisse la progression d'une autre compétence du même module parfaitement intacte après une séance de révision", async () => {
    const user = userEvent.setup();
    const { module: seModule, exercise: reviewedExercise } = findRealExercise(FREE_MODULE_SLUG, "ce-textes-courants", "vrai_faux");
    const { exercise: otherExercise } = findRealExercise(FREE_MODULE_SLUG, "gr-questions", "qcm");
    if (reviewedExercise.type !== "vrai_faux") throw new Error("garde-fou TypeScript");

    // Deux vraies compétences déjà pratiquées dans le même module, avant la séance.
    let before = recordExerciseResult(EMPTY_USER_PROGRESS, seModule, reviewedExercise, false);
    before = recordExerciseResult(before, seModule, otherExercise, true);
    writeProgress({ ...before, userId: "test-user" });
    const otherSkillBefore = before.skillProgress.find((sp) => sp.skillId === "gr-questions");

    mockFetch({
      user: null,
      sessionItems: [{ skillId: "ce-textes-courants", module: seModule, exercise: reviewedExercise }],
    });
    renderReviser();

    await user.click(await screen.findByRole("button", { name: /commencer ma révision/i }));
    await screen.findByText(/élément 1 sur 1/i);
    await user.click(screen.getByRole("button", { name: reviewedExercise.correctAnswer ? "Vrai" : "Faux" }));
    await user.click(screen.getByRole("button", { name: "Vérifier" }));
    await screen.findByText(/^(à consolider|à revoir|maîtrisé)$/i);

    const otherSkillAfter = readProgress().skillProgress.find((sp: SkillProgress) => sp.skillId === "gr-questions");
    expect(otherSkillAfter).toEqual(otherSkillBefore);
  });

  it("permet de quitter une séance en cours sans écrire de résultat ni casser la progression existante", async () => {
    const user = userEvent.setup();
    const { module: seModule, exercise: seExercise } = findRealExercise(FREE_MODULE_SLUG, "ce-textes-courants", "vrai_faux");
    const seeded = seedProgress({ skillProgress: [isolatedErrorSkill("ce-textes-courants")] });
    mockFetch({ user: null, sessionItems: [{ skillId: "ce-textes-courants", module: seModule, exercise: seExercise }] });
    renderReviser();

    await user.click(await screen.findByRole("button", { name: /commencer ma révision/i }));
    expect(await screen.findByText(/élément 1 sur 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /quitter la révision/i }));

    // Retour à l'écran d'accueil (à nouveau la proposition de séance), progression inchangée.
    expect(await screen.findByRole("button", { name: /commencer ma révision/i })).toBeInTheDocument();
    expect(readProgress()).toEqual(seeded);
  });
});

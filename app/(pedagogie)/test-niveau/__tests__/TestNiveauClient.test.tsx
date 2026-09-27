// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import TestNiveauClient from "@/app/(pedagogie)/test-niveau/TestNiveauClient";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { trackEvent } from "@/lib/analytics/client";
import { PLACEMENT_QUESTIONS } from "@/lib/pedagogy/data/placement-questions";
import { CEFR_LEVELS, type CEFRLevel, type UserProgress } from "@/lib/pedagogy/types";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

/**
 * Parcours critique du nouvel apprenant : objectif → temps quotidien → test
 * → résultat → lien direct vers sa première séance, à SON niveau et
 * gratuite (module découverte du niveau, voir lib/commerce/access.ts).
 */
const STORAGE_KEY = "francais-b1:user-progress";

beforeEach(() => {
  window.localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ user: null }) })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.mocked(trackEvent).mockClear();
});

/** Répond juste jusqu'au niveau visé inclus, faux au-delà — oracle tiré des vraies questions. */
async function answerUpTo(user: ReturnType<typeof userEvent.setup>, level: CEFRLevel) {
  for (const question of PLACEMENT_QUESTIONS) {
    const shouldSucceed = CEFR_LEVELS.indexOf(question.level) <= CEFR_LEVELS.indexOf(level);
    const choice = shouldSucceed
      ? question.choices.find((c) => c.id === question.correctChoiceId)!
      : question.choices.find((c) => c.id !== question.correctChoiceId)!;
    await user.click(screen.getByRole("radio", { name: choice.text }));
    await user.click(screen.getByRole("button", { name: /question suivante|voir mon résultat/i }));
  }
}

describe("/test-niveau — onboarding complet", () => {
  it.each([
    ["A1", "se-presenter-a1"],
    ["A2", "se-presenter-en-detail"],
    ["B1", "se-presenter"],
  ] as const)("niveau %s : objectif, rythme, test, puis première séance gratuite (%s)", async (level, slug) => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestNiveauClient />
      </AuthProvider>
    );

    expect(screen.getByRole("heading", { name: /pourquoi apprends-tu le français/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /vivre en france/i }));

    expect(await screen.findByRole("heading", { name: /combien de temps as-tu par jour/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /10 minutes/i }));

    expect(await screen.findByRole("heading", { name: /ton test de niveau/i })).toBeInTheDocument();
    await answerUpTo(user, level);

    expect(await screen.findByText("Ta première séance est prête.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: new RegExp(level) })).toBeInTheDocument();
    expect(screen.getByText("Vivre en France au quotidien")).toBeInTheDocument();
    expect(screen.getByText("10 min par jour")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /commencer ma première séance/i })).toHaveAttribute(
      "href",
      `/parcours/seance?module=${slug}`
    );
    // Le bilan approfondi reste proposé, mais en second.
    expect(screen.getByRole("link", { name: /bilan approfondi/i })).toHaveAttribute("href", "/diagnostic");

    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as UserProgress;
    expect(saved.goalId).toBe("vivre_en_france");
    expect(saved.dailyMinutes).toBe(10);
    expect(saved.level).toBe(level);
    expect(saved.placementCompletedAt).toBeTruthy();

    expect(trackEvent).toHaveBeenCalledWith("daily_minutes_selected", { dailyMinutes: 10, source: "onboarding" });
    expect(trackEvent).toHaveBeenCalledWith(
      "onboarding_completed",
      expect.objectContaining({ placementLevel: level, goalId: "vivre_en_france", dailyMinutes: 10 })
    );
  });

  it("« examen ou démarche » propose ensuite les sous-objectifs existants, avec un avertissement honnête", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestNiveauClient />
      </AuthProvider>
    );
    await user.click(screen.getByRole("button", { name: /préparer un examen ou une démarche/i }));
    expect(await screen.findByRole("heading", { name: /quel examen ou quelle démarche/i })).toBeInTheDocument();
    expect(screen.getByText(/jusqu'au niveau B1/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /naturalisation/i }));
    expect(await screen.findByRole("heading", { name: /combien de temps/i })).toBeInTheDocument();
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as UserProgress;
    expect(saved.goalId).toBe("naturalisation");
  });
});

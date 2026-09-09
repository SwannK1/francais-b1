import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiagnosticClient from "@/app/(pedagogie)/diagnostic/DiagnosticClient";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/diagnostic/questions";
import { trackEvent } from "@/lib/analytics/client";

vi.mock("@/lib/analytics/client", () => ({ trackEvent: vi.fn() }));

afterEach(cleanup);
beforeEach(() => {
  vi.mocked(trackEvent).mockClear();
});

/**
 * Répond à la question affichée en cliquant sur le bon choix (`correct:
 * true`, comportement par défaut) ou sur un choix faux, puis passe à la
 * suivante. Piloté par le texte du prompt affiché — jamais par un index —
 * pour rester robuste à un réordonnancement de `DIAGNOSTIC_QUESTIONS`.
 */
async function answerCurrentQuestion(user: ReturnType<typeof userEvent.setup>, correct: boolean) {
  const questionHeading = await screen.findByRole("heading", { level: 2 });
  const question = DIAGNOSTIC_QUESTIONS.find((q) => q.prompt === questionHeading.textContent);
  if (!question) throw new Error(`Question introuvable pour le texte : ${questionHeading.textContent}`);

  const choice = correct
    ? question.choices.find((c) => c.id === question.correctChoiceId)!
    : question.choices.find((c) => c.id !== question.correctChoiceId)!;

  await user.click(screen.getByRole("radio", { name: choice.text }));
  const nextButton = screen.getByRole("button", { name: /question suivante|voir mon résultat/i });
  await user.click(nextButton);
}

describe("DiagnosticClient — route /diagnostic", () => {
  it("part de l'écran d'introduction sans jamais demander de choisir un niveau de départ", () => {
    render(<DiagnosticClient />);
    expect(screen.getByRole("heading", { name: /diagnostic de niveau détaillé/i })).toBeInTheDocument();
    expect(screen.queryByText(/choisis ton niveau/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /commencer le diagnostic/i })).toBeInTheDocument();
  });

  it("mène à un résultat exploitable (niveau, score, recommandation avec un lien réel) en répondant correctement à tout", async () => {
    const user = userEvent.setup();
    const { container } = render(<DiagnosticClient />);

    await user.click(screen.getByRole("button", { name: /commencer le diagnostic/i }));

    // Des réponses toutes correctes déclenchent l'arrêt anticipé "plafond" à
    // la 12e question (voir scoring.test.ts) : la boucle s'arrête dès que
    // l'écran de résultat apparaît, sans présumer d'un nombre fixe de questions.
    for (let i = 0; i < DIAGNOSTIC_QUESTIONS.length; i++) {
      if (screen.queryByRole("heading", { name: /ton résultat/i })) break;
      await answerCurrentQuestion(user, true);
    }

    expect(await screen.findByRole("heading", { name: /ton résultat/i })).toBeInTheDocument();
    expect(screen.getByText(/A1 · Découverte|A2 · Intermédiaire|B1 · Autonome/)).toBeInTheDocument();
    // Score global mis en avant (pas les barres de progression par domaine, qui affichent aussi "100%").
    expect(container.querySelector(".text-3xl")).toHaveTextContent("100%");

    const cta = screen.getByRole("link", { name: /commencer mon parcours/i });
    expect(cta).toHaveAttribute("href", expect.stringMatching(/^\/parcours\//));

    expect(trackEvent).toHaveBeenCalledWith("diagnostic_started");
    expect(trackEvent).toHaveBeenCalledWith("diagnostic_completed", { diagnosticLevel: "B1" });
  });

  it("s'arrête plus tôt (arrêt plancher) après 6 questions en cas d'échec quasi total sur le palier A1", async () => {
    const user = userEvent.setup();
    render(<DiagnosticClient />);

    await user.click(screen.getByRole("button", { name: /commencer le diagnostic/i }));

    for (let i = 0; i < 6; i++) {
      await answerCurrentQuestion(user, false);
    }

    expect(await screen.findByRole("heading", { name: /ton résultat/i })).toBeInTheDocument();
    expect(screen.getByText(/s'est arrêté un peu plus tôt/i)).toBeInTheDocument();
  });

  it("permet de revenir à la question précédente sans perdre la réponse déjà donnée", async () => {
    const user = userEvent.setup();
    render(<DiagnosticClient />);

    await user.click(screen.getByRole("button", { name: /commencer le diagnostic/i }));

    const firstQuestion = DIAGNOSTIC_QUESTIONS[0];
    const firstChoice = firstQuestion.choices[0];
    await user.click(screen.getByRole("radio", { name: firstChoice.text }));
    await user.click(screen.getByRole("button", { name: /question suivante/i }));

    // Deuxième question affichée, avec un bouton "Précédent" disponible.
    expect(await screen.findByRole("button", { name: /précédent/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /précédent/i }));

    // De retour sur la première question, le choix précédemment sélectionné reste coché.
    expect(await screen.findByRole("radio", { name: firstChoice.text })).toBeChecked();
  });
});

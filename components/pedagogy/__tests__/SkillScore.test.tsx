import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SkillScore from "@/components/pedagogy/SkillScore";
import type { Skill, SkillProgress } from "@/lib/pedagogy/types";

afterEach(cleanup);

const skill: Skill = {
  id: "skill-test",
  name: "Se présenter",
  description: "Donner des informations simples sur soi.",
  domain: "production_ecrite",
};

describe("SkillScore", () => {
  it("distingue la couverture de la réussite pour ne pas afficher une fausse maîtrise", () => {
    const progress: SkillProgress = {
      skillId: skill.id,
      domain: skill.domain,
      totalExercises: 10,
      completedExercises: 1,
      correctExercises: 1,
      successRate: 100,
      recentOutcomes: [true],
      lastPracticedAt: "2026-09-09T10:00:00.000Z",
    };

    render(<SkillScore skill={skill} progress={progress} />);

    expect(screen.getByRole("progressbar", { name: "1/10 exercices pratiqués" })).toHaveAttribute(
      "aria-valuenow",
      "10"
    );
    expect(screen.getByText(/Réussite sur les exercices tentés/)).toHaveTextContent("100%");
  });
});

import { describe, expect, it, vi } from "vitest";

/**
 * Vérifie la vraie règle de sécurité de cette route : le contenu d'un
 * exercice n'est jamais renvoyé pour une compétence dont le module est
 * verrouillé pour ce compte — même logique que `/parcours/module/[slug]`
 * (`canAccess`), jamais un raccourci propre à cette route. `getCurrentUser`
 * est mocké pour contrôler le statut premium ; le catalogue réel
 * (`lib/pedagogy/data/modules.ts`) est utilisé tel quel — pas de double de
 * test qui pourrait diverger du contenu réel.
 */
const getCurrentUser = vi.fn();

vi.mock("@/lib/auth/dal", () => ({
  getCurrentUser: () => getCurrentUser(),
}));

async function postSession(skillIds: string[]) {
  const { POST } = await import("@/app/api/review/session/route");
  const request = new Request("http://localhost/api/review/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skillIds }),
  });
  const response = await POST(request);
  const body = await response.json();
  return { status: response.status, body };
}

describe("POST /api/review/session", () => {
  it("liste vide en entrée -> aucun appel réseau, réponse immédiate vide", async () => {
    getCurrentUser.mockResolvedValue(null);
    const { status, body } = await postSession([]);
    expect(status).toBe(200);
    expect(body.items).toEqual([]);
  });

  it("compte non premium : compétence d'un module gratuit -> exercice livré", async () => {
    getCurrentUser.mockResolvedValue(null);
    const { status, body } = await postSession(["gr-questions"]);
    expect(status).toBe(200);
    expect(body.items).toHaveLength(1);
    expect(body.items[0].skillId).toBe("gr-questions");
    expect(body.items[0].module.slug).toBe("se-presenter");
    expect(body.items[0].exercise.skillId).toBe("gr-questions");
  });

  it("compte non premium : compétence d'un module verrouillé -> omise, pas de contenu exposé", async () => {
    getCurrentUser.mockResolvedValue({ id: "u1", premiumUntil: null });
    const { status, body } = await postSession(["gr-passe-compose-imparfait"]);
    expect(status).toBe(200);
    expect(body.items).toEqual([]);
  });

  it("compte premium : la même compétence verrouillée devient accessible", async () => {
    const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    getCurrentUser.mockResolvedValue({ id: "u1", premiumUntil: future });
    const { status, body } = await postSession(["gr-passe-compose-imparfait"]);
    expect(status).toBe(200);
    expect(body.items).toHaveLength(1);
    expect(body.items[0].skillId).toBe("gr-passe-compose-imparfait");
  });

  it("compétence inconnue -> omise silencieusement", async () => {
    getCurrentUser.mockResolvedValue(null);
    const { status, body } = await postSession(["skill-qui-n-existe-pas"]);
    expect(status).toBe(200);
    expect(body.items).toEqual([]);
  });

  it("mélange accessible + verrouillé + inconnu -> ne renvoie que l'accessible", async () => {
    getCurrentUser.mockResolvedValue(null);
    const { status, body } = await postSession([
      "gr-passe-compose-imparfait",
      "gr-questions",
      "skill-qui-n-existe-pas",
    ]);
    expect(status).toBe(200);
    expect(body.items.map((item: { skillId: string }) => item.skillId)).toEqual(["gr-questions"]);
  });
});

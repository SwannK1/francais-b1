import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `lib/auth/mailer.ts` n'avait aucun test avant ce chantier — ces tests
 * couvrent les deux emails transactionnels existants (réinitialisation de
 * mot de passe, bienvenue) : déclenchement, non-envoi en dev (canal de test
 * explicite, jamais un vrai envoi), échec explicite en prod si non
 * configuré, et propagation d'une erreur du provider. Aucun vrai email
 * n'est envoyé : le SDK Resend est entièrement mocké.
 */

const sendMock = vi.fn();

vi.mock("resend", () => {
  class Resend {
    emails = { send: sendMock };
  }
  return { Resend };
});

async function importMailer() {
  return import("@/lib/auth/mailer");
}

beforeEach(() => {
  vi.resetModules();
  sendMock.mockReset();
  sendMock.mockResolvedValue({ error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sendPasswordResetEmail", () => {
  it("hors production, sans configuration Resend : journalise le lien, n'envoie rien, ne lève pas", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("AUTH_EMAIL_FROM", "");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendPasswordResetEmail } = await importMailer();
    await expect(
      sendPasswordResetEmail({ to: "a@b.com", resetUrl: "https://example.com/reset?token=abc" })
    ).resolves.toBeUndefined();

    expect(sendMock).not.toHaveBeenCalled();
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining("https://example.com/reset?token=abc"));
    infoSpy.mockRestore();
  });

  it("en production, sans configuration Resend : échoue explicitement plutôt qu'un faux succès", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("AUTH_EMAIL_FROM", "");

    const { sendPasswordResetEmail } = await importMailer();
    await expect(
      sendPasswordResetEmail({ to: "a@b.com", resetUrl: "https://example.com/reset" })
    ).rejects.toThrow("EMAIL_PROVIDER_NOT_CONFIGURED");

    expect(sendMock).not.toHaveBeenCalled();
  });

  it("configuré : envoie via Resend avec le bon destinataire et le lien de réinitialisation", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_EMAIL_FROM", "ParcoursFR <noreply@parcoursfr.fr>");

    const { sendPasswordResetEmail } = await importMailer();
    await sendPasswordResetEmail({ to: "a@b.com", resetUrl: "https://example.com/reset?token=abc" });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.to).toBe("a@b.com");
    expect(call.from).toBe("ParcoursFR <noreply@parcoursfr.fr>");
    expect(call.html).toContain("https://example.com/reset?token=abc");
    expect(call.text).toContain("https://example.com/reset?token=abc");
  });

  it("propage un échec du provider plutôt que de le masquer", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_EMAIL_FROM", "ParcoursFR <noreply@parcoursfr.fr>");
    sendMock.mockResolvedValue({ error: { name: "validation_error", message: "invalid `to` field" } });

    const { sendPasswordResetEmail } = await importMailer();
    await expect(
      sendPasswordResetEmail({ to: "a@b.com", resetUrl: "https://example.com/reset" })
    ).rejects.toThrow("RESEND_SEND_FAILED");
  });
});

describe("sendWelcomeEmail", () => {
  const payload = {
    to: "nouveau@exemple.com",
    parcoursUrl: "https://example.com/parcours",
    testNiveauUrl: "https://example.com/test-niveau",
  };

  it("hors production, sans configuration Resend : n'envoie rien, ne lève pas", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("AUTH_EMAIL_FROM", "");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendWelcomeEmail } = await importMailer();
    await expect(sendWelcomeEmail(payload)).resolves.toBeUndefined();

    expect(sendMock).not.toHaveBeenCalled();
    infoSpy.mockRestore();
  });

  it("en production, sans configuration Resend : échoue explicitement", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("AUTH_EMAIL_FROM", "");

    const { sendWelcomeEmail } = await importMailer();
    await expect(sendWelcomeEmail(payload)).rejects.toThrow("EMAIL_PROVIDER_NOT_CONFIGURED");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("configuré : envoie via Resend avec les liens vers le parcours et le test de niveau", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_EMAIL_FROM", "ParcoursFR <noreply@parcoursfr.fr>");

    const { sendWelcomeEmail } = await importMailer();
    await sendWelcomeEmail(payload);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.to).toBe("nouveau@exemple.com");
    expect(call.html).toContain(payload.parcoursUrl);
    expect(call.html).toContain(payload.testNiveauUrl);
    expect(call.text).toContain(payload.parcoursUrl);
    expect(call.text).toContain(payload.testNiveauUrl);
  });

  it("ne contient aucune pression commerciale (pas de lien vers l'offre premium)", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_EMAIL_FROM", "ParcoursFR <noreply@parcoursfr.fr>");

    const { sendWelcomeEmail } = await importMailer();
    await sendWelcomeEmail(payload);

    const call = sendMock.mock.calls[0][0];
    expect(call.html.toLowerCase()).not.toContain("/offre");
    expect(call.text.toLowerCase()).not.toContain("/offre");
  });

  it("propage un échec du provider plutôt que de le masquer", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_EMAIL_FROM", "ParcoursFR <noreply@parcoursfr.fr>");
    sendMock.mockResolvedValue({ error: { name: "validation_error", message: "invalid `to` field" } });

    const { sendWelcomeEmail } = await importMailer();
    await expect(sendWelcomeEmail(payload)).rejects.toThrow("RESEND_SEND_FAILED");
  });
});

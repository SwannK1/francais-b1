import { Resend } from "resend";
import { TOKEN_TTL_MINUTES } from "@/lib/auth/password-reset";

export interface PasswordResetEmailPayload {
  to: string;
  resetUrl: string;
}

export interface WelcomeEmailPayload {
  to: string;
  parcoursUrl: string;
  testNiveauUrl: string;
}

let cachedClient: Resend | null = null;

function getResendClient(apiKey: string): Resend {
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}

function passwordResetEmailText(resetUrl: string): string {
  return [
    "Réinitialisation de votre mot de passe ParcoursFR",
    "",
    "Vous avez demandé à réinitialiser votre mot de passe.",
    `Ce lien est valable ${TOKEN_TTL_MINUTES} minutes et ne peut être utilisé qu'une seule fois :`,
    resetUrl,
    "",
    "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email : votre mot de passe reste inchangé.",
  ].join("\n");
}

function passwordResetEmailHtml(resetUrl: string): string {
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#f7f5f0;font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;padding:32px;">
            <tr>
              <td style="font-size:20px;font-weight:bold;color:#1c2333;padding-bottom:16px;">
                Réinitialisation de votre mot de passe
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#3a3f4b;padding-bottom:24px;">
                Vous avez demandé à réinitialiser le mot de passe de votre compte ParcoursFR.
                Ce lien est valable <strong>${TOKEN_TTL_MINUTES} minutes</strong> et ne peut être
                utilisé qu'une seule fois.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <a href="${resetUrl}"
                   style="display:inline-block;background-color:#2c3654;color:#ffffff;text-decoration:none;
                          font-size:14px;font-weight:bold;padding:12px 24px;border-radius:9999px;">
                  Choisir un nouveau mot de passe
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;line-height:1.6;color:#6b7280;">
                Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email :
                votre mot de passe reste inchangé.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function welcomeEmailText(parcoursUrl: string, testNiveauUrl: string): string {
  return [
    "Bienvenue sur ParcoursFR",
    "",
    "Votre compte est créé. Vous êtes sur un parcours de français niveau B1 :",
    "l'objectif est de consolider votre niveau intermédiaire, à votre rythme.",
    "",
    `Reprendre le parcours : ${parcoursUrl}`,
    `Pas sûr·e de votre niveau ? Faites le test de positionnement : ${testNiveauUrl}`,
    "",
    "Bon apprentissage.",
  ].join("\n");
}

function welcomeEmailHtml(parcoursUrl: string, testNiveauUrl: string): string {
  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#f7f5f0;font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;padding:32px;">
            <tr>
              <td style="font-size:20px;font-weight:bold;color:#1c2333;padding-bottom:16px;">
                Bienvenue sur ParcoursFR
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.6;color:#3a3f4b;padding-bottom:24px;">
                Votre compte est créé. Vous êtes sur un parcours de français
                niveau <strong>B1</strong> : l'objectif est de consolider votre niveau
                intermédiaire, à votre rythme.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <a href="${parcoursUrl}"
                   style="display:inline-block;background-color:#2c3654;color:#ffffff;text-decoration:none;
                          font-size:14px;font-weight:bold;padding:12px 24px;border-radius:9999px;">
                  Reprendre le parcours
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:13px;line-height:1.6;color:#3a3f4b;padding-bottom:24px;">
                Pas sûr·e de votre niveau ?
                <a href="${testNiveauUrl}" style="color:#2c3654;">Faites le test de positionnement</a>.
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;line-height:1.6;color:#6b7280;">
                Bon apprentissage.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Envoi de l'email de bienvenue via Resend, à l'inscription. Même contrat
 * que `sendPasswordResetEmail` ci-dessous (mêmes variables d'environnement,
 * même canal de test en développement, même échec explicite en production
 * si non configuré) — voir ce commentaire pour le détail.
 *
 * Volontairement sans aucune pression commerciale (pas de CTA premium/offre) :
 * cet email confirme la création du compte et oriente vers le parcours et le
 * test de niveau, rien d'autre.
 */
export async function sendWelcomeEmail({ to, parcoursUrl, testNiveauUrl }: WelcomeEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("EMAIL_PROVIDER_NOT_CONFIGURED");
    }
    console.info(`[auth] (Resend non configuré, aucun email réel envoyé) Email de bienvenue pour ${to}`);
    return;
  }

  const resend = getResendClient(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Bienvenue sur ParcoursFR",
    html: welcomeEmailHtml(parcoursUrl, testNiveauUrl),
    text: welcomeEmailText(parcoursUrl, testNiveauUrl),
  });

  if (error) {
    throw new Error(`RESEND_SEND_FAILED: ${error.name} - ${error.message}`);
  }
}

/**
 * Envoi de l'email de réinitialisation via Resend (https://resend.com).
 *
 * Aucune fausse réussite : le comportement dépend uniquement de la présence
 * de `RESEND_API_KEY` et `AUTH_EMAIL_FROM`, jamais de `NODE_ENV` seul —
 * cela permet de tester un vrai envoi en développement en renseignant ces
 * deux variables dans `.env.local`, sans rien changer au code.
 *
 * - Configuré (les deux variables présentes) : envoi réel via Resend, dans
 *   n'importe quel environnement.
 * - Non configuré, hors production : le lien est journalisé en clair dans
 *   la console serveur — c'est le canal de test explicite, jamais un vrai
 *   envoi (voir aussi le commentaire dans `requestPasswordReset`,
 *   `app/actions/auth.ts`, sur pourquoi la présence du token ici est
 *   volontaire et distincte d'une fuite en production).
 * - Non configuré, en production : échec explicite plutôt qu'un succès
 *   simulé. L'appelant journalise cet échec côté serveur sans jamais
 *   l'exposer au client (voir `requestPasswordReset`).
 *
 * Le token ne transite jamais dans un log côté chemin d'envoi réel — seul
 * `resetUrl` (fourni par l'appelant) est passé à Resend, jamais journalisé
 * ici.
 */
export async function sendPasswordResetEmail({ to, resetUrl }: PasswordResetEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("EMAIL_PROVIDER_NOT_CONFIGURED");
    }
    console.info(
      `[auth] (Resend non configuré, aucun email réel envoyé) Lien de réinitialisation pour ${to} :\n  ${resetUrl}`
    );
    return;
  }

  const resend = getResendClient(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Réinitialisation de votre mot de passe — ParcoursFR",
    html: passwordResetEmailHtml(resetUrl),
    text: passwordResetEmailText(resetUrl),
  });

  if (error) {
    throw new Error(`RESEND_SEND_FAILED: ${error.name} - ${error.message}`);
  }
}

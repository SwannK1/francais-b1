"use server";

import { headers } from "next/headers";
import { createUser, findUserByEmail, updateUserPassword, verifyCredentials } from "@/lib/auth/users";
import { createSession, destroyAllUserSessions, destroySession } from "@/lib/auth/session";
import { clearLoginAttempts, isLoginThrottled, recordFailedLoginAttempt } from "@/lib/auth/rate-limit";
import { createPasswordResetToken, consumePasswordResetToken } from "@/lib/auth/password-reset";
import { sendPasswordResetEmail, sendWelcomeEmail } from "@/lib/auth/mailer";
import { hashPassword } from "@/lib/auth/password";
import { trackServerEvent } from "@/lib/analytics/server";
import { logServerError } from "@/lib/observability/log";

export interface AuthFormState {
  error?: string;
  success?: boolean;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Origine à utiliser pour construire le lien envoyé par email — jamais
 * dérivée du header `Host` de la requête entrante en production : ce header
 * est fourni par le client et une valeur falsifiée y ferait pointer le lien
 * de réinitialisation vers un domaine choisi par un attaquant ("password
 * reset poisoning"). En production, on préfère donc une origine que le
 * client ne contrôle pas : `NEXT_PUBLIC_APP_URL` si l'opérateur l'a fixée,
 * sinon `VERCEL_URL` (fournie par la plateforme de déploiement elle-même,
 * jamais par la requête). En développement, l'hôte local n'est pas exposé
 * publiquement : dériver l'origine du header `Host` y est sans risque et
 * évite d'imposer une variable d'environnement pour travailler en local.
 */
async function resolveAppOrigin(): Promise<string> {
  if (process.env.NODE_ENV === "production") {
    const configured = process.env.NEXT_PUBLIC_APP_URL;
    if (configured) return configured.replace(/\/$/, "");

    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) return `https://${vercelUrl}`;

    throw new Error("APP_ORIGIN_NOT_CONFIGURED");
  }

  const headersList = await headers();
  return `http://${headersList.get("host")}`;
}

function validateCredentials(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPassword = typeof password === "string" ? password : "";

  if (!EMAIL_RE.test(cleanEmail)) {
    return { error: "Adresse email invalide." } as const;
  }
  if (cleanPassword.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." } as const;
  }
  return { email: cleanEmail, password: cleanPassword } as const;
}

export async function signup(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = validateCredentials(formData.get("email"), formData.get("password"));
  if ("error" in validated) return { error: validated.error };

  try {
    const user = await createUser(validated.email, validated.password);
    await createSession(user.id);
    void trackServerEvent("signup_completed");

    // Email secondaire : ne doit jamais bloquer ni faire échouer l'inscription
    // elle-même — un incident Resend reste invisible pour l'utilisateur, qui a
    // bien son compte et sa session, seulement journalisé côté serveur.
    try {
      const origin = await resolveAppOrigin();
      await sendWelcomeEmail({
        to: validated.email,
        parcoursUrl: `${origin}/parcours`,
        testNiveauUrl: `${origin}/test-niveau`,
      });
    } catch (error) {
      logServerError("auth.welcome_email", error);
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return { error: "Un compte existe déjà avec cet email." };
    }
    // "Email déjà pris" est un résultat métier normal, pas une panne — tout
    // le reste (DB inaccessible...) doit rester visible côté serveur, sinon
    // une vraie panne d'infra ne laisserait aucune trace.
    logServerError("auth.signup", error);
    return { error: "Impossible de créer le compte pour le moment." };
  }
}

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = validateCredentials(formData.get("email"), formData.get("password"));
  if ("error" in validated) return { error: "Email ou mot de passe incorrect." };

  if (await isLoginThrottled(validated.email)) {
    void trackServerEvent("login_failed", { reason: "rate_limited" });
    return { error: "Trop de tentatives. Réessayez dans quelques minutes." };
  }

  const user = await verifyCredentials(validated.email, validated.password);
  if (!user) {
    await recordFailedLoginAttempt(validated.email);
    void trackServerEvent("login_failed", { reason: "invalid_credentials" });
    return { error: "Email ou mot de passe incorrect." };
  }

  await clearLoginAttempts(validated.email);
  await createSession(user.id);
  void trackServerEvent("login_completed");
  return { success: true };
}

export async function logout(): Promise<void> {
  await destroySession();
}

/**
 * Réponse volontairement identique que le compte existe ou non — ce
 * formulaire ne doit jamais permettre de deviner quels emails sont
 * enregistrés (voir aussi le commentaire dans `requestPasswordReset`).
 */
const GENERIC_RESET_REQUESTED: AuthFormState = {
  success: true,
  message: "Si un compte existe avec cet email, un lien de réinitialisation vient d'être envoyé.",
};

export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  // Repris tel quel dans le lien envoyé par email : seul un chemin interne
  // ("/...") est accepté, jamais une URL absolue (open redirect).
  const rawNext = formData.get("next");
  const next = typeof rawNext === "string" && rawNext.startsWith("/") ? rawNext : undefined;

  if (!EMAIL_RE.test(email)) {
    return { error: "Adresse email invalide." };
  }

  const user = await findUserByEmail(email);
  // Ne pas continuer (ni créer de token, ni tenter un envoi) si le compte
  // n'existe pas — mais renvoyer exactement la même réponse au client dans
  // les deux cas, pour ne jamais révéler l'existence d'un compte par ce
  // formulaire.
  if (!user) return GENERIC_RESET_REQUESTED;

  const token = await createPasswordResetToken(user.id);

  try {
    const origin = await resolveAppOrigin();
    const resetUrl = `${origin}/reinitialiser-mot-de-passe?token=${token}${next ? `&next=${encodeURIComponent(next)}` : ""}`;
    await sendPasswordResetEmail({ to: email, resetUrl });
  } catch (error) {
    // Ne jamais exposer cet échec au client (ça révélerait à la fois
    // l'existence du compte et un problème d'infra) — uniquement en log serveur.
    logServerError("auth.password_reset_email", error);
  }

  return GENERIC_RESET_REQUESTED;
}

export async function resetPassword(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const token = formData.get("token");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (typeof token !== "string" || !token) {
    return { error: "Lien de réinitialisation invalide." };
  }
  if (typeof password !== "string" || password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }
  if (password !== confirmPassword) {
    return { error: "Les deux mots de passe ne correspondent pas." };
  }

  const userId = await consumePasswordResetToken(token);
  if (!userId) {
    return { error: "Ce lien de réinitialisation est invalide ou a expiré." };
  }

  await updateUserPassword(userId, hashPassword(password));
  // Un accès ouvert avant le changement (sur cet appareil ou un autre) ne
  // doit pas survivre au changement de mot de passe.
  await destroyAllUserSessions(userId);

  return { success: true };
}

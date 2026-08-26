"use server";

import { headers } from "next/headers";
import { createUser, findUserByEmail, updateUserPassword, verifyCredentials } from "@/lib/auth/users";
import { createSession, destroyAllUserSessions, destroySession } from "@/lib/auth/session";
import { clearLoginAttempts, isLoginThrottled, recordFailedLoginAttempt } from "@/lib/auth/rate-limit";
import { createPasswordResetToken, consumePasswordResetToken } from "@/lib/auth/password-reset";
import { sendPasswordResetEmail } from "@/lib/auth/mailer";
import { hashPassword } from "@/lib/auth/password";

export interface AuthFormState {
  error?: string;
  success?: boolean;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return { error: "Un compte existe déjà avec cet email." };
    }
    return { error: "Impossible de créer le compte pour le moment." };
  }
}

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const validated = validateCredentials(formData.get("email"), formData.get("password"));
  if ("error" in validated) return { error: "Email ou mot de passe incorrect." };

  if (await isLoginThrottled(validated.email)) {
    return { error: "Trop de tentatives. Réessayez dans quelques minutes." };
  }

  const user = await verifyCredentials(validated.email, validated.password);
  if (!user) {
    await recordFailedLoginAttempt(validated.email);
    return { error: "Email ou mot de passe incorrect." };
  }

  await clearLoginAttempts(validated.email);
  await createSession(user.id);
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
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const resetUrl = `${protocol}://${host}/reinitialiser-mot-de-passe?token=${token}`;

  try {
    await sendPasswordResetEmail({ to: email, resetUrl });
  } catch (error) {
    // Ne jamais exposer cet échec au client (ça révélerait à la fois
    // l'existence du compte et un problème d'infra) — uniquement en log serveur.
    console.error("[auth] échec d'envoi de l'email de réinitialisation", error);
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

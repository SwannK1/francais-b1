"use server";

import { createUser, verifyCredentials } from "@/lib/auth/users";
import { createSession, destroySession } from "@/lib/auth/session";
import { clearLoginAttempts, isLoginThrottled, recordFailedLoginAttempt } from "@/lib/auth/rate-limit";

export interface AuthFormState {
  error?: string;
  success?: boolean;
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

export interface PasswordResetEmailPayload {
  to: string;
  resetUrl: string;
}

/**
 * Abstraction d'envoi d'email — aucun fournisseur n'est branché dans ce
 * chantier (aucun système email n'existait avant ce commit, et l'énoncé
 * demande explicitement de ne pas en intégrer un arbitrairement).
 *
 * En développement (`NODE_ENV !== "production"`), le lien est simplement
 * journalisé en clair dans la console serveur : c'est le canal de livraison
 * utilisé pour tester le flux de bout en bout sans dépendance externe,
 * jamais un vrai envoi.
 *
 * En production, faute de fournisseur configuré, l'envoi échoue
 * explicitement (l'erreur est interceptée par l'appelant et journalisée
 * côté serveur, jamais montrée au client — voir `requestPasswordReset` dans
 * `app/actions/auth.ts`) plutôt que de prétendre avoir réussi. Brancher un
 * vrai fournisseur transactionnel (Resend, Postmark, SES...) est un
 * prérequis explicite avant toute mise en production réelle de ce flux.
 */
export async function sendPasswordResetEmail({ to, resetUrl }: PasswordResetEmailPayload): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[auth] (mode développement, aucun email réel envoyé) Lien de réinitialisation pour ${to} :\n  ${resetUrl}`
    );
    return;
  }

  throw new Error("EMAIL_PROVIDER_NOT_CONFIGURED");
}

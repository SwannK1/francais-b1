import { headers } from "next/headers";

/**
 * Origine à utiliser pour construire une URL destinée à sortir du serveur
 * (lien envoyé par email, `success_url`/`return_url` Stripe...) — jamais
 * dérivée du header `Host` de la requête entrante en production : ce header
 * est fourni par le client et une valeur falsifiée y ferait pointer le lien
 * vers un domaine choisi par un attaquant ("password reset poisoning" et,
 * de la même façon, un `return_url` Stripe détourné). En production, on
 * préfère donc une origine que le client ne contrôle pas :
 * `NEXT_PUBLIC_APP_URL` si l'opérateur l'a fixée, sinon `VERCEL_URL`
 * (fournie par la plateforme de déploiement elle-même, jamais par la
 * requête). En développement, l'hôte local n'est pas exposé publiquement :
 * dériver l'origine du header `Host` y est sans risque et évite d'imposer
 * une variable d'environnement pour travailler en local.
 *
 * Utilisé aussi bien depuis une Server Action (app/actions/auth.ts) que
 * depuis un Route Handler (app/api/checkout, app/api/billing-portal) :
 * `next/headers` fonctionne dans les deux contextes.
 */
export async function resolveAppOrigin(): Promise<string> {
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

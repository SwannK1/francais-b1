/**
 * Source de vérité unique pour les constantes SEO transverses (URL du site,
 * nom de marque, description par défaut) — utilisées par `app/layout.tsx`,
 * `app/sitemap.ts`, `app/robots.ts` et les `generateMetadata` des pages
 * dynamiques, pour ne jamais dupliquer ces valeurs.
 *
 * `NEXT_PUBLIC_APP_URL` est la même variable que celle déjà utilisée par
 * `resolveAppOrigin` (app/actions/auth.ts) pour les liens envoyés par email —
 * on la réutilise ici plutôt que d'introduire une deuxième variable d'env
 * pour la même donnée, avec le même ordre de priorité : `NEXT_PUBLIC_APP_URL`
 * configurée explicitement, sinon `VERCEL_URL` (fournie automatiquement par
 * Vercel en production/preview, voir .env.example), sinon localhost — qui ne
 * sert alors vraiment qu'en dev/build local, jamais en déploiement Vercel
 * sans domaine personnalisé configuré.
 */

const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const SITE_URL = configuredUrl || vercelUrl || "http://localhost:3000";

export const SITE_NAME = "ParcoursFR";

export const SITE_DESCRIPTION =
  "Formation complète de français niveau B1 : teste ton niveau, suis un parcours de modules guidés et prépare le DELF B1 avec des examens blancs, à ton rythme.";

# Environnement QA authentifié et premium

Cet environnement est local, isolé et destiné uniquement à la validation des parcours protégés. Il ne modifie ni le paywall ni Stripe et n'utilise aucune donnée de production.

## Architecture

- PostgreSQL 17 dans Docker, exposé seulement sur `127.0.0.1:55432`.
- Schéma applicatif réel : `lib/auth/schema.sql`.
- Authentification réelle : mêmes tables, sessions HTTP-only et hash scrypt que l'application.
- Deux comptes générés : un premium et un gratuit.
- Le premium QA représente l'état final produit par un webhook, uniquement dans la base locale. Aucun mode premium automatique n'existe dans l'application.
- Neon HTTP reste le driver par défaut. `DATABASE_DRIVER=postgres` active l'adaptateur TCP seulement dans l'environnement local explicite.

## Démarrage reproductible

Prérequis : Docker en fonctionnement.

```bash
npm run qa:setup
npm run qa:verify
npm run qa:smoke
npm run qa:dev
```

`qa:setup` crée au premier lancement `.env.qa.local` avec des valeurs aléatoires, mode 0600. Le fichier est couvert par `.env*` dans `.gitignore`. Les exécutions suivantes réappliquent le schéma idempotent et remettent les deux comptes dans l'état attendu.

`qa:dev` charge ce fichier dans l'environnement du processus Next sans le copier vers `.env.local` et sans afficher son contenu.

Ne jamais copier ces variables dans Vercel Production. Ne jamais afficher ni committer `.env.qa.local`.

## QA navigateur

`npm run qa:smoke` lance Chrome via Playwright, connecte réellement les deux comptes et vérifie les deux branches de sécurité : contenu livré au premium, paywall et absence du contenu pour le compte gratuit. Il écrit l'état authentifié premium dans `playwright/.auth/qa-user.json`, dossier ignoré par Git. Ce fichier peut ensuite être chargé pour la matrice visuelle des cinq productions B1 ; il ne doit jamais être committé.

Pour une vérification manuelle, ouvrir `/connexion`, utiliser les variables `QA_USER_EMAIL` / `QA_USER_PASSWORD` sans les copier dans un script suivi, vérifier `/api/auth/me`, puis ouvrir une route premium. Refaire avec le compte gratuit pour confirmer le paywall.

## Arrêt et réinitialisation

```bash
npm run qa:down
```

Cette commande arrête les conteneurs mais conserve le volume local. Pour repartir de zéro, supprimer explicitement le volume `francais-b1-qa-data` après vérification ; cette opération n'est jamais automatisée par le projet.

## Garde-fous

Les scripts refusent de s'exécuter si `NODE_ENV=production`, si `QA_ENV=true` manque, si le driver n'est pas `postgres`, si l'hôte DB n'est pas strictement local, si le nom de base ne contient pas `qa`, ou si une variable de compte manque. Aucun script n'est importé par l'application et aucune route web ne permet d'accorder le premium.

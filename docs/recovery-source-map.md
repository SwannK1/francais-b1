# Reconstruction contrôlée — cartographie des sources

Cette cartographie décrit la sélection de contenu effectuée depuis la sauvegarde physique du 9 septembre 2026. Les anciens dépôts et le recovery restent des sources en lecture seule.

## Socle retenu

`external-francais-b1-final-launch` (`0136402`) est retenu comme socle parce qu'il contient 470 fichiers métier, 115 audios et 56 tests, passe lint, TypeScript, tests et build, et descend de `main` en intégrant explicitement `launch-polish`, `diagnostic-progress` et `audio-humanisation`.

## Matrice fonctionnelle

| Fonction | Source la plus complète | Source la plus récente pertinente | Fichiers clés | Tests | Conflit | Action |
|---|---|---|---|---|---|---|
| Contenu A1 | final-launch | final-launch | `lib/pedagogy/data/a1/`, `public/audio/a1/` | intégrité A1, sync transcription | Faible | Retenu |
| Contenu A2 | final-launch | final-launch | `modules-a2*.ts`, `exams-a2.ts`, `public/audio/a2/` | intégrité A2, audio A2 | Moyen | Retenu ; variantes publiques anciennes auditées séparément |
| Contenu B1 | final-launch | final-launch | `modules.ts`, `exams.ts`, `public/audio/b1/` | contenu, modules publics, SEO | Faible | Retenu |
| Diagnostic | final-launch | diagnostic-progress intégré | `lib/diagnostic/`, route `/diagnostic` | scoring, questions, recommandation, UI | Faible | Retenu |
| Recommandation | final-launch | diagnostic-progress intégré | `lib/pedagogy/logic/recommendation.ts`, `lib/diagnostic/recommendation.ts` | tests unitaires et parcours | Faible | Retenu |
| Session du jour | final-launch | launch-polish/diagnostic-progress intégrés | `lib/daily/`, `GuidedSessionCard.tsx`, `/parcours/seance` | moteur, récapitulatif, cas niveaux | Faible | Retenu |
| Révision espacée | final-launch | final-launch | `lib/review/`, `/reviser` | moteur, adapter, intégration A1/A2/B1 | Faible | Retenu |
| Oral / speaking | final-launch | final-launch | `lib/speaking/`, `/oral`, composants speaking | logique et composants | Faible | Retenu |
| Évaluations | final-launch | final-launch | `lib/assessment/`, `/parcours/evaluations` | scoring, intégrité, anti-fuite | Faible | Retenu |
| Examens / DELF | final-launch | final-launch | `exams*.ts`, références DELF, routes examens | données publiques et SEO | Faible | Retenu |
| Progression | final-launch | diagnostic-progress intégré | `progress.ts`, `parcours.ts`, pages progression | maîtrise, parcours, recommandation | Faible | Retenu |
| Analytics | final-launch | final-launch | `lib/analytics/`, événements et trackers | client, serveur, événements, composants | Faible | Retenu |
| SEO | final-launch | launch-polish intégré | sitemap, metadata, `lib/seo/` | tests SEO Node | Faible | Retenu |
| Lifecycle | final-launch | final-launch | auth, progression, session/review | tests fonctionnels associés | Moyen | Retenu sans ancienne variante isolée |
| Auth | final-launch | final-launch | `lib/auth/`, routes et formulaires | mailer, formulaires, API | Moyen | Retenu |
| Premium / paiement | final-launch | final-launch | `lib/commerce/`, checkout, billing, webhook | accès, composants, webhook | Moyen | Retenu |
| Audio runtime | final-launch | audio-humanisation intégré | manifests A1/A2/B1, TTS, playback | fichiers, voix, normalisation, sync | Moyen | Retenu |
| Tests/scripts/docs/migrations | final-launch | final-launch | 56 tests, 35 docs, scripts audio/public, `schema.sql` | gate complet | Faible | Retenu |

## Sources antérieures non superposées

- `diagnostic-progress`, `audio-humanisation`, `launch-polish` et `main` sont des ancêtres vérifiés de `final-launch`.
- `release-candidate`, `v1-polish` et `positioning` contiennent des états antérieurs des mêmes fichiers ; les correctifs ultérieurs de final-launch sont conservés.
- Les deux copies internes dites « non commitées » contiennent surtout un index Git ancien face à un contenu intermédiaire. Les différences inspectées manquent les ajouts ultérieurs (analytics, correction B2→B1, tests de recommandation) et ne doivent pas remplacer le socle.

## Fichiers uniques examinés

| Fichier/groupe | Décision | Justification |
|---|---|---|
| `components/pedagogy/DailySessionCard.tsx` | Non retenu | Non référencé, type supprimé, remplacé explicitement par `GuidedSessionCard` ; reste dans origin/main et recovery |
| `components/pedagogy/LessonStep.tsx` | Non retenu | Ancien composant non référencé, runner actuel intégré à `SeanceExperience` |
| `ParcoursClient.tsx`, `ProgressionClient.tsx` | Non retenus | Anciens noms/composants remplacés par les expériences actuelles ; aucune référence active |
| `exams-public-a2*.ts`, `modules-public-a2*.ts` | Non retenu comme runtime | Variantes intermédiaires remplacées par les catalogues unifiés générés ; conservées dans recovery |
| générateurs publics A2 séparés | Non retenus | Pipeline unifié `generate-public-modules/exams` présent et testé |
| `audio-playback.ts` ancien emplacement | Non retenu | Remplacé par `lib/pedagogy/audio/playback.ts` et ses tests |
| `check-audio-assets.mjs` | Non retenu | Couverture assurée par les tests de manifests/fichiers A1/A2/B1 et `audio:status` |
| `alias-loader.mjs` | Non retenu | Ancienne variante ; `ts-alias-loader.mjs` et `register-alias-loader.mjs` sont utilisés par tous les scripts actuels |
| `docs/analytics.md` | Non retenu | Remplacé par `docs/analytics/product-analytics.md` et les plans produit plus récents |
| `docs/user-testing-protocol.md` | Intégré | Document autonome utile, sans secret ni dépendance runtime |
| `BlockerFeedback.tsx` | Non retenu | Composant expérimental SEO non référencé dans le produit final |
| `initial-user-progress 2.ts` | Non retenu | Doublon nommé accidentellement ; version canonique testée présente |
| `.claude/scheduled_tasks.lock` | Non retenu | Verrou d'outil local, sans contenu produit |

## Couverture reconstruite

| Niveau | Modules | Leçons | Activités | Exercices | Examens | Évaluations liées | Audio |
|---|---:|---:|---:|---:|---:|---:|---:|
| A1 | 27 | 123 | 131 | 283 | 1 | 2 | 65 |
| A2 | 23 | 100 | 121 | 234 | 2 | 3 | 31 |
| B1 | 26 | 114 | 120 | 310 | 2 | 1 | 16 |

Trois fichiers audio supplémentaires servent aux examens/démos, soit 115 fichiers sélectionnés au total. Le catalogue contient 76 modules, 337 leçons, 372 activités et 827 exercices.

## Secrets

Seul `.env.example` est autorisé dans Git. Aucun `.env.local` provenant du recovery n'est importé. Les valeurs réelles nécessaires à la base, Stripe, Resend ou l'URL applicative doivent être configurées hors Git.

---
title: Plan analytics V1 — audit de couverture
type: product-audit
lastUpdated: 2026-09-07
---

# Plan analytics V1

Ce document répond à la question posée par le chantier **Final Polish V1** :
« le produit mesure-t-il correctement son funnel réel ? ». La taxonomie
détaillée (noms d'événements, propriétés, garde-fous anti-donnée-personnelle,
procédure d'ajout) reste dans `docs/analytics/product-analytics.md` — ce
document ne la duplique pas, il constate l'écart entre ce funnel demandé et
ce qui existait avant ce chantier, puis ce qui a été corrigé.

## Fournisseur

Inchangé : **Vercel Web Analytics** (`@vercel/analytics`), cookieless, un
seul SDK pour pageviews et événements custom. Aucun nouveau fournisseur
installé dans ce chantier — conforme à la consigne ("ne pas installer un
nouveau fournisseur arbitrairement").

## Constat avant ce chantier

`docs/analytics/product-analytics.md` a été écrit avant l'intégration
diagnostic + révision espacée + séance du jour + oral + évaluations
(`chantier/product-integration`). Un audit du code réel (grep exhaustif de
`trackEvent`/`trackServerEvent`/`ViewTracker` sur ces cinq zones) a trouvé
un vrai décalage entre le funnel demandé par ce chantier et ce qui était
effectivement câblé :

| Signal demandé | État avant ce chantier |
|---|---|
| Diagnostic commencé / terminé | **Absent.** `DiagnosticClient.tsx` n'avait aucun import analytics. |
| Niveau recommandé | **Absent** (dépendait de l'événement précédent). |
| Séance commencée / terminée | **Absent.** `SeanceExperience.tsx` (`/parcours/seance`) n'hérite pas de `module_started`/`module_completed` (ceux-ci ne tirent que depuis `ModuleExperience.tsx`, page module classique). |
| Module commencé / terminé | Présent (`module_started`/`module_completed`), mais seulement via `/parcours/module/[slug]` — jamais via la séance du jour. |
| Audio joué | Présent (`audio_play_started`/`audio_completed`, `AudioExercise.tsx`) — couvre modules, examens et évaluations, un seul point d'instrumentation. |
| Révision utilisée | **Absent.** `/reviser` (chantier spaced-review) n'existait pas encore à la rédaction du document original ; une fois développée, jamais instrumentée. |
| Oral utilisé | **Partiel.** Pas d'événement nommé "oral_used", mais `speaking_practice_viewed`/`speaking_model_played`/`speaking_practice_completed` couvrent déjà la vue, l'écoute du modèle et l'auto-évaluation — fonctionnellement équivalent, juste un nom différent. |
| Évaluation commencée / terminée | Présent (`assessment_started`/`assessment_completed`) — entièrement câblé dès l'intégration du chantier speaking-assessment. |
| Paywall vu | **Absent.** `PremiumLock` ne trackait que le clic (`premium_cta_clicked`), jamais le fait d'atterrir sur un mur premium. |

Net : sur 4 fonctionnalités entières intégrées par `chantier/product-integration`
(diagnostic, révision, séance du jour, une partie de la mesure premium), la
mesure était soit absente soit incomplète — pas parce qu'elle avait été
oubliée par erreur, mais parce que ces fonctionnalités sont arrivées après
la rédaction du plan analytics initial et qu'aucun chantier suivant n'était
revenu combler l'écart avant celui-ci.

## Corrections apportées par ce chantier

Six événements ajoutés à `ANALYTICS_EVENTS` (`lib/analytics/events.ts`),
tous câblés au point métier réel (jamais au rendu seul, sauf quand la vue
*est* l'action à mesurer — `paywall_viewed`, `review_page_viewed`) :

- `diagnostic_started` — clic "Commencer le diagnostic" (`DiagnosticClient.tsx`)
- `diagnostic_completed` — calcul réel du résultat, avec `diagnosticLevel`
  (A1/A2/B1) : répond directement au signal "niveau recommandé" sans
  événement séparé, comme `placement_completed` le fait déjà pour
  `/test-niveau`
- `daily_session_started` / `daily_session_completed` — montage de
  `SeanceExperience` avec une séance réellement construite, et clic
  "Terminer la séance"
- `review_page_viewed` — montage de `/reviser` (`ViewTracker`, même patron
  que `journey_viewed`/`stage_viewed`)
- `paywall_viewed` — montage de `PremiumLock`, quel que soit le contenu
  verrouillé (module, examen, séance, oral, évaluation)

Tests ajoutés (voir aussi `docs/product/v1-readiness.md` § tests) :
`DiagnosticClient.test.tsx` (assertions `diagnostic_started`/
`diagnostic_completed`), `PremiumLock.test.tsx` (nouveau test
`paywall_viewed`). `daily_session_*`/`review_page_viewed` sont câblés mais
non couverts par un test dédié dans ce chantier — `SeanceExperience` et
`ReviserExperience` demandent un montage de contexte lourd (`useProgress`,
`useAuth`, catalogue de modules) disproportionné pour ce point précis ; leur
logique métier sous-jacente (construction de la séance, priorisation de la
révision) reste déjà couverte par `lib/daily/__tests__/session-engine.test.ts`
et `lib/review/__tests__/`. **Limite connue, à combler si un futur chantier
touche à nouveau ces deux composants.**

## Volontairement non fait

- **`oral_used` renommé** : pas de renommage des événements `speaking_*`
  existants pour matcher littéralement le vocabulaire du brief — ils
  couvrent déjà le même signal (vue, écoute du modèle, auto-évaluation
  terminée) sous des noms plus précis. Renommer aurait cassé un historique
  de mesure pour un gain seulement cosmétique.
- **Détail par bande de priorité sur `review_page_viewed`** (haute/à
  revoir/consolidation) : la vue d'ensemble suffit pour un premier chantier
  de mesure sur cette page ; pas ajouté par anticipation d'un besoin non
  confirmé.
- **`module_marked_for_review`/`module_unmarked_for_review`** : action
  secondaire (marquer un module "à revoir" à la main), pas ajoutée — voir
  `docs/analytics/product-analytics.md` § Apprentissage.
- **Nouveau fournisseur, dashboard dédié, alerting** : hors périmètre
  explicite de ce chantier.

## Référence

Taxonomie complète, propriétés, garde-fous anti-données-personnelles,
funnels et procédure d'ajout d'un événement : voir
`docs/analytics/product-analytics.md` (mis à jour par ce chantier avec les
six événements ci-dessus).

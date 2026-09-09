---
title: Intégration diagnostic → progression
type: product-integration
lastUpdated: 2026-09-08
---

# Intégration diagnostic → progression

Chantier `chantier/diagnostic-progress`, base `chantier/launch-polish`.
Voir `docs/product/diagnostic-progress-audit.md` pour l'audit détaillé
(réponses aux 10 questions posées) qui a mené à ce travail.

## Problème initial

Le diagnostic (`/test-niveau`) donnait déjà un résultat exploitable et
persisté (`progress.level`, `progress.placementCompletedAt`), et
`chantier/launch-polish` avait déjà corrigé un premier bug (un nouveau
profil A2/B1 se voyait recommander le tout premier module A1). Mais deux
angles morts plus profonds restaient non corrigés :

1. **Rien ne protégeait une vraie progression contre un nouveau résultat
   de test plus bas** — ni en le refaisant en direct, ni en fusionnant un
   compte à la connexion.
2. **`progress.level` ne se mettait jamais à jour tout seul** en avançant
   dans le parcours unifié A1 → A2 → B1, ce qui plafonnait silencieusement
   `/progression` et la séance du jour sur le niveau évalué au tout début,
   une fois celui-ci entièrement terminé.

## Règle de priorité (implémentée)

**Progrès existants > résultat du diagnostic.** Deux fonctions pures
portent cette règle, avec des rôles distincts et volontairement séparés :

- `resolvePlacementLevel(moduleProgress, diagnosticLevel)`
  (`lib/pedagogy/logic/progress.ts`) — répond à *"quel niveau retenir
  quand un nouveau résultat de test arrive"*. Ne redescend jamais en
  dessous du plus haut niveau couvert par une vraie activité (au moins un
  exercice complété). Sans activité réelle, le résultat du test est
  toujours accepté tel quel — c'est le cas normal, pas l'exception.
- `getEffectiveLevel(progress, modules)`
  (`lib/pedagogy/logic/parcours.ts`) — répond à *"où en est vraiment
  l'apprenant maintenant"*, pour l'affichage et le filtrage. Dérivé de la
  même logique d'étape courante que `readyForB1` (`getParcoursSummary`),
  pas d'un comptage d'exercices : dès qu'un niveau entier est terminé,
  l'étape courante bascule déjà sur le niveau suivant, avant même que le
  moindre exercice n'y ait été fait.

Ces deux fonctions ne se chevauchent pas : `progress.level` (brut) reste
la seule source pour "où commencer un premier apprentissage" ;
`getEffectiveLevel` est la seule source pour "où en suis-je maintenant"
partout ailleurs. Voir la priorité absolue du chantier — les deux rôles ne
sont jamais mélangés dans le code.

## Stockage

Inchangé — aucun nouveau champ ajouté à `UserProgress`. `level` et
`placementCompletedAt` existaient déjà et suffisaient ; la correction est
dans *comment* ils sont calculés et lus, pas dans *quoi* est stocké.
Conforme à la consigne "évite de dupliquer une notion déjà existante".

## Anonyme

Inchangé dans son fonctionnement : `localStorage`
(`francais-b1:user-progress`), lu au montage, persiste après refresh.
`markPlacementCompleted` applique désormais `resolvePlacementLevel` avant
d'écrire — un visiteur anonyme qui refait le test après avoir déjà une
vraie progression locale est protégé de la même façon qu'un compte
connecté.

## Connecté / fusion

`mergeUserProgress` → `resolvePlacement` (interne) : le choix du côté
"gagnant" par date de test la plus récente reste inchangé (comportement
déjà correct et testé), mais le niveau retenu passe maintenant par
`resolvePlacementLevel` avec la progression **déjà fusionnée** — un compte
avec de vrais modules terminés à un niveau donné ne peut plus être
redescendu par un test refait par erreur sur un autre appareil, même si ce
test est plus récent. `placementCompletedAt` reste honnête : il indique
toujours la date du test le plus récent, même quand le niveau affiché a
été protégé.

Scénario testé (`lib/pedagogy/logic/progress.test.ts`) : anonyme → nouveau
diagnostic A1 → connexion à un compte réel avec des modules A2 terminés →
niveau fusionné reste A2, modules jamais perdus.

## A1 / A2 / B1 — point d'entrée

Pour un apprenant neuf (aucune activité réelle) :
- **A1** : plancher trivial (rien en dessous), premier module A1 réel.
- **A2** : `getNextModule` saute les modules A1, propose un vrai module A2
  (verrouillé si gratuit — asymétrie gratuit/premium assumée, inchangée).
- **B1** : idem, saute A1 et A2 ; en pratique atterrit souvent sur un
  module B1 réellement gratuit (`se-presenter`), vérifié en conditions
  réelles (voir § Vérification manuelle).

Le point d'entrée est toujours une vraie structure du catalogue
(`PARCOURS_STAGES` réel), jamais une valeur inventée — aucun changement
sur ce point, déjà correct depuis `launch-polish`.

## Parcours

`/parcours` affiche désormais `getEffectiveLevel` (badge + titre "Ton
parcours X") au lieu de `progress.level` brut : un apprenant qui a
réellement avancé au-delà de son niveau évalué le voit refléter
immédiatement, sans qu'aucune action manuelle ne soit nécessaire.

## Séance du jour

`buildDailySession` (`lib/daily/session-engine.ts`) filtre maintenant son
catalogue par `getEffectiveLevel`, pas `progress.level`. Effet concret :
un apprenant qui termine tout son niveau évalué ne se retrouve plus avec
"rien à faire aujourd'hui" alors qu'un vrai contenu existe au niveau
suivant — vérifié en conditions réelles (un apprenant marqué `level: "A1"`
avec les 27 modules A1 réellement terminés voit sa séance du jour et son
bilan basculer sur l'A2 sans aucune autre action).

## Reprise

Priorité inchangée et vérifiée : un module réellement en cours
(`moduleProgress` avec `lastActivityAt`) est toujours proposé en premier
par `getNextModule`, avant même de considérer le plancher de niveau — le
plancher ne s'applique qu'à une découverte, jamais à une reprise. Testé
explicitement (`recommendation.test.ts`, "une reprise ignore le plancher
de niveau").

## Révision

Vérifié, aucun changement nécessaire : `getReviewItems`
(`lib/pedagogy/logic/review.ts`) ne lit ni `progress.level` ni
`placementCompletedAt` — uniquement `reviewedModuleIds`, `weakSkillIds`,
`moduleProgress` et les tentatives d'examen, tous fondés sur une activité
réelle. Testé explicitement : un profil qui vient seulement de passer le
test de positionnement (aucun exercice fait) n'a rien à réviser.

## Passages de niveau

Inchangé, vérifié cohérent : `isReadyForB1`/`readyForB1`
(`getParcoursSummary`) reste la seule source de vérité pour "prêt à
passer au niveau supérieur", indépendante du diagnostic. Les évaluations
de passage (`/parcours/evaluations`) restent le vrai geste de validation
formelle. `getEffectiveLevel` réutilise ce même moteur de détection
d'étape courante, sans le modifier — pas de risque de désaccord entre les
deux mécanismes.

## Premium

Aucune régression possible par construction : ni `resolvePlacementLevel`
ni `getEffectiveLevel` ne touchent `lib/commerce/access.ts` ou
`canAccess()`. Le plancher de niveau de `getNextModule` continue de
n'influencer que *l'ordre* des recommandations, jamais leur statut d'accès
— `isAccessible` reste entièrement piloté par l'appelant, comme avant.
Suite de tests premium existante (asymétrie gratuit/premium, modules
verrouillés jamais proposés) toujours verte sans modification.

## Analytics

Funnel déjà entièrement mesurable (voir
`docs/product/launch-analytics-funnel.md` du chantier précédent). Ajout
ciblé de ce chantier : `placement_cta_clicked` (résultat `/test-niveau`)
et `diagnostic_cta_clicked` (résultat `/diagnostic`), avec le niveau en
propriété — mesure désormais le taux de clic réel depuis le résultat vers
le parcours, jusque-là invisible. Pas de nouvel événement pour
"recommended_path_start" : déjà couvert par `module_started`/
`journey_viewed` existants, ajouter un troisième événement aurait fait
doublon.

## Tests ajoutés

- `lib/pedagogy/logic/progress.test.ts` : `resolvePlacementLevel` (4 cas)
  + protection de fusion (2 cas, dont le scénario exact "A2 terminé +
  diagnostic A1 accidentel" et "B1 terminé + diagnostic A2").
- `lib/pedagogy/logic/__tests__/review.test.ts` : le diagnostic seul ne
  crée jamais d'élément à réviser.
- `lib/daily/__tests__/session-engine.test.ts` : un apprenant qui a
  terminé tout son niveau évalué obtient une séance au niveau suivant
  (confirmé faire échouer le test si on retire le correctif, voir
  historique de commit).

## Vérification manuelle (navigateur réel, `next dev`)

- Fresh B1 → CTA principal envoie directement vers un vrai module B1
  gratuit (`se-presenter`), pas vers un déblocage inutile.
- A1 avec les 27 modules A1 réellement marqués terminés (via
  `/api/modules/public` pour les vrais ids) et `progress.level` laissé à
  `"A1"` : `/progression` et `/parcours` affichent tous deux "A2"
  immédiatement, la séance recommandée cible un vrai module A2.
- Aucune erreur console, aucun débordement horizontal à 375/320px sur
  `/test-niveau`, `/diagnostic`, `/progression`, `/parcours`.

## Limites

- `/diagnostic` (bilan détaillé à 18 questions) reste fonctionnellement
  isolé de `useProgress` — décision documentée par un chantier antérieur,
  confirmée ici, non traitée (refonte technique hors périmètre "corriger
  la connexion diagnostic → progression" : fusionner deux moteurs de
  scoring indépendants est un chantier à part entière).
- La fusion de compte n'a pas été vérifiée de bout en bout avec une vraie
  base de données/authentification réelle dans ce chantier (nécessite un
  environnement Postgres complet) — la logique de fusion elle-même
  (`mergeUserProgress`/`resolvePlacement`) est couverte par des tests
  unitaires précis, pas par un test d'intégration navigateur complet
  inscription → connexion → fusion.
- QA mobile limitée aux pages directement modifiées ou dont le
  comportement change (`/test-niveau`, `/diagnostic`, `/progression`,
  `/parcours`) à 375/320px via mesure directe en iframe — pas un balayage
  exhaustif de toutes les pages (voir la checklist QA humaine du chantier
  `launch-polish` pour le reste).

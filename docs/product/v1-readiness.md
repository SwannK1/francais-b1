---
title: V1 readiness — France B1 (A1 → B1)
type: product-audit
lastUpdated: 2026-09-07
---

# V1 readiness

Bilan du chantier **Final Polish V1** (`chantier/v1-polish`, base
`chantier/product-integration` @ `67933de`). Ce chantier ne visait pas à
ajouter de fonctionnalité : corriger les problèmes connus, vérifier les
parcours réels, tester les états limites, préparer le lancement.

## 1. Fonctionnalités

Plateforme d'apprentissage du français **A1 → B1** : diagnostic de niveau,
parcours de 76 modules (grammaire, vocabulaire, compréhension écrite/orale,
production écrite), révision espacée, séance du jour guidée, pratique
orale honnête (jamais de scoring phonétique inventé), 4 bilans/passages de
niveau, examens blancs DELF (A1, A2, B1), suivi de progression, offre
premium unique.

## 2. A1

27 modules, parcours à 6 étapes (`a1-decouverte` → `a1-bilan`). Audio :
aucune référence cassée trouvée (voir § 11). Recommandation du diagnostic
vers `decouverte` (première étape réelle) — corrigé lors de l'intégration
précédente (`docs/integration/product-v1.md` § 2.1), revérifié fonctionnel
ici. Aucun module A1 offert en découverte gratuite (voir § 12).

## 3. A2

23 modules, parcours à 6 étapes (`a2-faire-le-point` → `a2-pret-pour-le-b1`).
Recommandation diagnostic vers `a2-poser-les-bases`, vérifiée. Même
asymétrie de découverte gratuite que A1 (§ 12).

## 4. B1

26 modules, parcours à 6 étapes (`faire-le-point` → `pret-pour-le-b1`). 2
modules offerts en découverte (`se-presenter`, `decrire-vie-quotidienne`).
Le "prêt pour le B1" (`/progression`) est corrigé dans ce chantier — voir
§ 6.

## 5. Diagnostic

18 questions max, arrêt anticipé (plancher/plafond), recommandation A1/A2/B1
vers une vraie étape de parcours. Testé (parcours réponses parfaites,
échec précoce, retour en arrière) : comportement correct, CTA final mène
toujours vers une destination réelle. Instrumentation analytics ajoutée
dans ce chantier (`diagnostic_started`/`diagnostic_completed`, § 15).

**Limite connue, non corrigée (signalée, cohérente avec l'existant)** :
`DIAGNOSTIC_QUESTIONS` (avec `correctChoiceId`) est chargé directement dans
un composant client — les réponses sont visibles dans le bundle navigateur
pour qui ouvre les DevTools. Même schéma déjà accepté pour `/test-niveau`.
Aucun contenu payant en jeu (outil de qualification gratuit, non gradé) :
pas un risque commercial, mais permettrait de "tricher" son propre
résultat. Pas corrigé ici — changer l'architecture uniquement pour masquer
un outil gratuit aurait ajouté de la complexité sans bénéfice commercial
réel, conformément à la consigne du chantier. À revoir si le diagnostic
devient un jour certifiant.

## 6. Progression — correction `isReadyForB1`

**Bug corrigé** : `isReadyForB1` était défini comme
`completedStages === totalStages` sur le parcours à 18 étapes. 6 de ces
étapes (`practice`/`bilan`, 2 par niveau) n'ont jamais de métrique fiable et
ne passent donc jamais à "terminé" — cette égalité était mathématiquement
impossible à atteindre, quel que soit l'apprenant.

**Correction** : `readyForB1` (nouveau champ de `ParcoursSummary`,
`lib/pedagogy/logic/parcours.ts`) se déduit désormais de `currentStage` —
qui saute déjà les étapes `practice`/`bilan` sans métrique pour trouver la
première étape de contenu réelle non terminée. Un apprenant est "prêt pour
le B1" dès que cette étape courante n'est plus une étape A1/A2 (préfixe
`a1-`/`a2-`), ou qu'il n'en reste plus (parcours entièrement parcouru).
Volontairement indépendant de `weakSkillIds` : la maîtrise des compétences
fragiles reste le rôle de `/reviser`, pas une condition ajoutée ici sans
base dans le système existant.

Message UI mis à jour en conséquence (`ProgressionExperience.tsx`) : distingue
désormais "A1 et A2 terminés, prêt pour le B1" de "tout le parcours
parcouru, prêt pour l'examen blanc".

Tests ajoutés : `lib/pedagogy/logic/__tests__/parcours.test.ts` (7 cas —
non prêt, proche du seuil, A2 terminé, déjà avancé en B1, tout terminé,
compétences fragiles restantes, régression de l'ancien calcul impossible).

## 7. Révision espacée

Testé : aucune donnée (message "à jour, rien à réviser" + suggestion de
consolidation), compétence fragile, module marqué "à revoir" manuellement.
Priorité claire (haute → à revoir → consolidation → épreuves d'examen sous
le seuil), raisons affichées lisibles, aucun doublon structurel (le moteur
dédoublonne déjà par compétence). Aucune logique B1-only trouvée — le
moteur lit `progress.level` et le catalogue réel, fonctionne pour les 3
niveaux. Page non gated, chaque lien cible respecte le statut premium réel.
Instrumentation `review_page_viewed` ajoutée (§ 15, pas testée par un
composant dédié — voir § 17 limites).

## 8. Séance du jour

Modes contextuels vérifiés dans le code (`decouverte`, `reprise`,
`consolidation`, `retour_apres_absence`, `fin_de_niveau`) — couverts par
`lib/daily/__tests__/session-engine.test.ts` sur le catalogue A1→A2→B1
réel. Étapes reconstruites à l'ouverture (jamais une planification figée),
garde-fou "aucune étape construite" avec retour propre au parcours (pas
d'écran cassé). Instrumentation `daily_session_started`/
`daily_session_completed` ajoutée dans ce chantier.

## 9. Oral

Pratique honnête confirmée dans le code : jamais de scoring phonétique
automatique, wording orienté pratique/écoute/répétition/auto-évaluation.
2 exercices de découverte gratuits. **Non vérifié manuellement dans ce
chantier** : comportement réel avec synthèse vocale indisponible, micro
refusé, navigateur sans `MediaRecorder` — ces trois cas dépendent de
permissions navigateur que l'environnement d'automatisation de ce chantier
ne permet pas de simuler de façon fiable (accorder/refuser un micro
réellement). Le code source montre des fallbacks pour ces cas
(`SpokenExercise.tsx`), non exécutés en conditions réelles ici — limite
documentée, pas une garantie vérifiée.

## 10. Évaluations

4 bilans/passages (fin-a1, passage-a1-a2, fin-a2, passage-a2-b1), chacun
noté sur plusieurs dimensions. Toujours premium. Sécurité vérifiée (§ 12).
Cohérence avec `isReadyForB1` : les deux mécanismes sont désormais
complémentaires et non contradictoires — `readyForB1` reflète la
progression du parcours (contenu terminé), les évaluations de passage
restent le vrai geste de validation formelle entre niveaux. Aucune
situation impossible trouvée (évaluation réussie + niveau non débloqué, ou
inverse) dans le code audité.

## 11. Audio

Aucune régénération de voix dans ce chantier (consigne respectée). Audit
technique complet (voir `docs/audio/humanisation-backlog.md`) :

- **Aucun fichier audio 404, aucune piste orpheline, aucun exercice
  `comprehension_orale` sans `audioSrc`.**
- Deux appariements thématiques faibles confirmés (déjà signalés comme
  approximatifs) : A2 "Se repérer en ville" utilise une annonce de gare
  sans rapport, A1 "La santé" se limite à un rendez-vous médical sans
  toucher le vocabulaire du module. Priorisés dans le backlog.
- Trou de couverture de test (pas un bug fonctionnel) : les tests
  d'intégrité A1 et A2 (niveau module) ne vérifient pas l'existence disque
  des fichiers, contrairement à celui de B1 — les fichiers existent
  aujourd'hui, mais rien n'empêche une régression silencieuse. Recommandé,
  non implémenté ici (hors périmètre "audit", pas "bug manifeste").

## 12. Premium / gratuit

Voir `docs/product/free-premium-audit.md` pour le détail complet.
Résumé : aucun changement d'accès dans ce chantier (consigne respectée).

- Sécurité premium revérifiée : aucune fuite de contenu protégé trouvée.
  `correctAnswer`/`correctChoiceId`/`correction` n'apparaissent dans un
  composant `"use client"` que comme type/prop générique, jamais comme
  import direct de données premium. `.next/static` grepé pour des chaînes
  de réponses réelles (assessment) : aucune occurrence. Gardes anti-fuite
  existants couvrant modules, examens, assessment et manifeste audio A2 —
  aucune catégorie de contenu premium sans garde équivalente.
- Incohérence produit confirmée (pas un bug) : aucun module A1/A2 offert
  en découverte gratuite, contrairement au B1 (2 modules). Signal produit
  documenté, non arbitré (consigne explicite : ne pas décider
  arbitrairement d'ouvrir/fermer du contenu).
- **Bug corrigé** : `lib/commerce/plans.ts` décrivait l'offre payante comme
  "26 modules du parcours B1" et "un examen blanc DELF B1" — stale depuis
  l'intégration A1/A2. La vraie offre couvre 76 modules (A1+A2+B1), des
  examens DELF sur les 3 niveaux et 4 bilans de passage. Cette copie
  alimente `/offre`, `/cgv` (conditions de vente) et `PremiumLock` — un
  seul point corrigé propage la correction aux trois surfaces.
- `paywall_viewed` ajouté (§ 15) : avant ce chantier, seul le clic sur le
  CTA premium était mesuré, jamais le fait d'atterrir sur le mur lui-même.

## 13. QA mobile

Le point signalé comme non résolu par les sessions précédentes
(`resize_window` de l'outil navigateur ne descend jamais sous ~500px de
largeur CSS réelle, quelle que soit la taille demandée — vérifié : 375 et
320 demandés donnent tous deux `window.innerWidth === 500`) a été contourné
par une **mesure directe en `iframe`** de largeur fixe (375px et 320px),
qui établit son propre contexte de viewport CSS indépendamment de la
fenêtre du navigateur — donc un test réel, pas une extrapolation.

Routes testées à 375px et 320px, aucun débordement horizontal
(`scrollWidth > clientWidth`) détecté : `/`, `/diagnostic`, `/test-niveau`,
`/reviser`, `/oral`, `/parcours/evaluations`, `/parcours`, `/progression`,
un module par niveau (`/parcours/module/se-presenter-a1|en-detail|(b1)`).
Spot-check visuel (zoom) sur la page d'accueil à 375px : mise en page
propre, pas de texte coupé ni de bouton hors écran.

**Non testé dans ce chantier faute de temps** : contrôles audio en
lecture, modales, formulaires d'authentification, et les routes non
listées ci-dessus, à 375/320px. Desktop (1400px) et 768px non testés
spécifiquement au-delà de la navigation normale effectuée pendant l'audit
fonctionnel — aucune anomalie rencontrée en passant, mais pas un balayage
systématique.

## 14. Accessibilité

Vérifié : bouton menu mobile avec `aria-label` dynamique
("Ouvrir le menu"/"Fermer le menu"), navigation avec `aria-label`,
`aria-current="step"` sur l'étape courante de la séance du jour, structure
de titres cohérente (`h1`/`h2` par section) sur les pages inspectées. Garde
de contraste WCAG AA déjà en place et testée (`lib/design/color-contrast.test.ts`,
empêche une régression silencieuse d'un token de couleur sous le seuil
4.5:1). Boutons radio du diagnostic/test-niveau accessibles par leur nom
(vérifié par les tests existants, `getByRole("radio", { name })`).

**Non audité exhaustivement dans ce chantier** : navigation clavier
complète bout en bout, lecteur d'écran réel, ordre de focus sur les
modales/formulaires. Spot-checks positifs, pas un audit WCAG complet.

## 15. Analytics

Voir `docs/product/analytics-plan.md`. Écart trouvé : diagnostic, révision
espacée, séance du jour et vue du mur premium n'étaient pas mesurés (0
événement chacun), alors que le funnel demandé par ce chantier les inclut
explicitement. 6 événements ajoutés avec le patron existant
(`trackEvent`/`ViewTracker`, aucun nouveau fournisseur) :
`diagnostic_started`, `diagnostic_completed`, `daily_session_started`,
`daily_session_completed`, `review_page_viewed`, `paywall_viewed`.

## 16. SEO

`France B1` doit être présenté comme une plateforme A1 → B1 : corrigé à
plusieurs endroits trouvés par l'audit (pas seulement les métadonnées) :

- `lib/seo/site.ts` (`SITE_DESCRIPTION`, alimente layout racine, OpenGraph,
  Twitter card, page d'accueil)
- `components/marketing/Hero.tsx` (titre H1 de la page d'accueil —
  "atteindre le niveau B1" → "progresser du A1 au B1")
- `components/layout/Footer.tsx` (libellé de nav "Parcours B1" → "Parcours
  A1 → B1", tagline du footer)

Laissé inchangé, à raison : `/francais-b1`, `/grammaire-b1`,
`/exercices-b1`, `/comprehension-orale-b1` (pages légitimement scopées B1,
contenu réellement B1-only), le `<title>` SEO statique de `/parcours`
("Ton parcours B1", décision déjà documentée pour les visiteurs anonymes),
et `ProgressPreviewCard` (mockup marketing statique, "Objectif : B1" reste
honnête comme destination finale du parcours).

## 17. Limites connues (non bloquantes)

- Diagnostic : réponses visibles côté client (accepté, cohérent avec
  l'existant, voir § 5).
- Oral : comportement réel micro refusé/synthèse indisponible non vérifié
  manuellement (voir § 9).
- Tests d'intégrité audio A1/A2 (module) : pas de vérification disque,
  contrairement à B1 (voir § 11).
- `daily_session_*`/`review_page_viewed` : câblés, non couverts par un
  test de composant dédié (voir `docs/product/analytics-plan.md`).
- QA mobile : 375/320 vérifiés sur les routes prioritaires, pas un
  balayage exhaustif de toutes les modales/formulaires (voir § 13).
- Accessibilité : spot-checks positifs, pas un audit WCAG exhaustif
  (voir § 14).
- Asymétrie de découverte gratuite A1/A2 vs B1 : signal produit documenté,
  décision commerciale non arbitrée par ce chantier (voir § 12).
- Deux appariements audio thématiquement faibles identifiés, non corrigés
  (humanisation hors périmètre, voir § 11 et le backlog dédié).

## 18. Backlog post-V1

- Chantier "Humanisation audio A1/A2/B1" — voir
  `docs/audio/humanisation-backlog.md` pour le détail priorisé.
- Étendre `content-integrity-a1.test.ts`/`content-integrity-a2.test.ts`
  avec la vérification d'existence disque (même patron que B1).
- Décider explicitement de l'ouverture (ou non) d'un module A1/A2 gratuit
  en découverte, pour cohérence avec le B1.
- Tests de composant dédiés pour `SeanceExperience`/`ReviserExperience`
  (analytics et comportement UI), si un futur chantier retouche ces
  composants.
- Vérification manuelle des trois états micro/synthèse vocale de `/oral`
  sur un vrai navigateur (hors environnement d'automatisation).
- Si le diagnostic devient un jour un test certifiant : revoir l'exposition
  client de `correctChoiceId`.

## Verdict

**READY WITH MINOR LIMITATIONS**

Aucun problème bloquant réel identifié : le build de production réussit,
lint et typecheck sont propres, 475+ tests passent (voir détail dans le
rapport final), aucune fuite de contenu premium trouvée, aucun débordement
mobile détecté sur les routes prioritaires, aucun écran blanc rencontré
sur les états limites testés (route inconnue, `localStorage` corrompu). Le
bug mathématique bloquant `isReadyForB1` — signalé mais non corrigé par
l'intégration précédente — est corrigé et testé. Les limitations listées en
§ 17 sont des trous de couverture ou des vérifications manuelles non
faites faute de temps/outillage (permissions navigateur réelles), pas des
défauts fonctionnels constatés.

---
title: Candidat final pré-lancement — consolidation des 3 chantiers
type: product-integration
lastUpdated: 2026-09-08
---

# Candidat final pré-lancement

`chantier/final-launch`, base `main` (`e96b27f`). Intègre proprement, dans
cet ordre, les trois chantiers récents :

1. `chantier/launch-polish` (2 commits : `e456d4b`, `1056a5a`)
2. `chantier/diagnostic-progress` (4 commits : `e934a26`, `6afd485`,
   `0732174`, `02e6ffd` — déjà basé sur `launch-polish`, donc les inclut)
3. `chantier/audio-humanisation` (13 commits, de `0254ef4` à `267d8dc`,
   branché indépendamment sur `main`)

Objectif : une seule branche consolidée, techniquement stable, prête pour
QA humaine finale. **Ne merge jamais vers `main`.**

## 1. Stratégie d'intégration et conflits

Les trois branches partageaient le même point de divergence
(`merge-base` = `e96b27f`, tip de `main`). `diagnostic-progress` était déjà
rebasée sur `launch-polish` (ses 2 commits apparaissent dans son historique) ;
`audio-humanisation` était indépendante.

Ordre appliqué : `git merge --no-ff chantier/launch-polish`, puis
`chantier/diagnostic-progress` (triviale, contenu déjà inclus), puis
`chantier/audio-humanisation`.

**Conflits rencontrés : aucun.** Les trois merges se sont résolus
automatiquement (stratégie `ort`), y compris sur `lib/pedagogy/data/modules.ts`
(touché par `audio-humanisation` pour les corrections `a1-la-sante`/`ville-o`
et par `diagnostic-progress` indirectement via `parcours.ts`/`recommendation.ts`
qui le consomment sans le modifier) — aucune fonctionnalité supprimée
silencieusement, rien à arbitrer manuellement.

## 2. Bug trouvé et corrigé pendant l'intégration

**`getEffectiveLevel` n'était jamais plafonné à B1** (`lib/pedagogy/logic/parcours.ts`).
`progress.level` (résultat brut du diagnostic) peut légitimement valoir `"B2"`
(`CEFRLevel` inclut B2 pour signaler "au-dessus du plafond du catalogue" —
`lib/pedagogy/data/placement-questions.ts`). `/test-niveau` gère déjà
correctement ce cas dans son propre message ("Le parcours B2 n'est pas
encore disponible, découvre le B1"), mais `getEffectiveLevel` (ajoutée par
`chantier/diagnostic-progress`, commit `6afd485`) ne faisait pas la même
chose : elle propageait `"B2"` tel quel vers ses 6 points d'appel
(`/parcours`, `/progression`, `/parcours/seance`, la séance du jour,
`getNextModule`).

**Reproduit en conditions réelles (navigateur)** : un profil ayant obtenu
92% au test de positionnement (résultat B2) voyait `/parcours` afficher
"Ton parcours B2" et `/progression` afficher "Modules — niveau B2" avec une
grille de modules **entièrement vide** (aucun module B2 n'existe dans le
catalogue) — exactement la classe de bug ("plus aucune recommandation
alors qu'un contenu réel existe") que `chantier/diagnostic-progress` avait
pour mandat de corriger, réapparue sur le cas B2 non couvert par ses tests.

**Corrigé** : `getEffectiveLevel` plafonne désormais son retour à `"B1"`
quand le calcul produit `"B2"` (`lib/pedagogy/logic/parcours.ts`). Effet en
cascade sur les 6 appelants, vérifié en navigateur après correctif :
`/progression` affiche "B1 · Autonome" et recommande le vrai module B1
gratuit (`se-presenter`) au lieu d'une grille vide.

**Tests ajoutés** : 2 cas dans `lib/pedagogy/logic/__tests__/parcours.test.ts`
(plafond B2→B1, y compris avec une vraie progression A1 en dessous). Un
test préexistant dans `recommendation.test.ts` codifiait l'ancien
comportement bugué (`buildDailySession` attendu `null` pour B2) — corrigé
pour exercer le vrai cas qu'il visait ("aucun module pour le niveau
demandé", désormais simulé par un catalogue filtré plutôt que par B2) et
un nouveau test explicite confirme qu'un résultat B2 reçoit maintenant une
vraie séance B1.

Total tests après correctif : **536 Vitest** (534 avant + 2 nouveaux
`parcours.test.ts`, moins 1 test réécrit) **+ 8 SEO** — voir §14.

## 3. Validation diagnostic / progression

- **A1 → recommandation A1** : vérifié — `getNextModule`/`buildDailySession`
  proposent bien un vrai module A1 (`a1-se-presenter`, "Se saluer et se
  présenter") pour un profil A1 frais, sous réserve de l'asymétrie
  gratuit/premium documentée ci-dessous.
- **A2 → recommandation A2** : comportement inchangé, documenté et testé
  par `chantier/diagnostic-progress` (saute les modules A1, propose un
  vrai module A2, verrouillé si gratuit — asymétrie assumée).
- **B1 → recommandation B1** : vérifié en navigateur — atterrit sur
  `se-presenter`, le module B1 réellement gratuit.
- **B2 (au-dessus du plafond)** : bug trouvé et corrigé, voir §2.
- **Progression existante prioritaire sur diagnostic / pas de downgrade** :
  logique `resolvePlacementLevel` inchangée par cette intégration, testée
  (4 cas + 2 cas de fusion) par `chantier/diagnostic-progress`.
- **Reprise prioritaire dès qu'un module est commencé** : inchangé, testé
  (`recommendation.test.ts`, "une reprise ignore le plancher de niveau").
- **Diagnostic ne pollue pas la révision** : vérifié — `getReviewItems` ne
  lit ni `progress.level` ni `placementCompletedAt`. Note méthodologique :
  un profil anonyme frais dans ce navigateur affichait 2 éléments "à
  réviser" sur `/reviser` ; confirmé qu'il s'agit du seed de démo
  `INITIAL_USER_PROGRESS` (`userId: "demo-user"`, comportement volontaire
  et préexistant pour la vitrine anonyme, voir
  `lib/pedagogy/data/initial-user-progress.ts` — distinct de
  `EMPTY_USER_PROGRESS` utilisé pour un vrai nouveau compte), pas une
  fuite du diagnostic.
- **Résultat persiste** : `localStorage` (`francais-b1:user-progress`),
  confirmé après rechargement complet (hard reload) en navigateur.
- **Anonyme fonctionne / fusion locale-compte** : logique inchangée par
  cette intégration (`mergeUserProgress`), testée unitairement ; non
  re-testée de bout en bout avec une vraie base (voir §8, `DATABASE_URL`
  absente de ce sandbox).
- **Premium reste protégé** : `resolvePlacementLevel`/`getEffectiveLevel`
  ne touchent jamais `lib/commerce/access.ts`/`canAccess()` — confirmé par
  lecture de code, suite premium existante toujours verte.

## 4. Validation launch polish

Homepage, CTA, offre, connexion, inscription vérifiés en navigateur —
aucune erreur console, positionnement A1→B1 cohérent partout (homepage,
`/offre`). Les utilisateurs A2/B1 ne sont jamais renvoyés vers du contenu
A1 par erreur (protection `getNextModule`/plancher de niveau, inchangée).
Analytics : événements `placement_cta_clicked`/`diagnostic_cta_clicked`
ajoutés par `diagnostic-progress`, funnel de base déjà couvert par
`launch-polish` — voir `docs/product/launch-analytics-funnel.md`.
Mobile : voir limite §9.

## 5. Validation audio

Architecture complète confirmée présente et intacte après merge : pipeline
`say`/ElevenLabs (`lib/pedagogy/audio/tts/`), profils de voix A1/A2/B1,
manifests, synchronisation transcript, scripts de génération A1/A2/B1,
documentation (`docs/audio/`), tests. **58 pistes humanisées** sur 7 lots
(détail complet : `docs/audio/humanisation-a1-a2-b1.md`).

- `a1-la-sante` (`m18-f1`) : **résolu** — script entièrement réécrit
  (pharmacie/douleur/conseil médical), fichier régénéré et présent sur
  disque, confirmé.
- Mismatch A2 `ville-o` : **résolu** — nouvelle piste
  `a2-directions-poste-banque.m4a` écrite et générée, ancienne piste
  (`a2-annonce-gare-perturbation`) reconvertie en piste de banque d'écoute
  plutôt que laissée orpheline.
- Fichiers physiquement vérifiés présents (`ls`) pour les 3 pistes les
  plus sensibles de ce chantier (`prendre-rendez-vous-medecin.m4a`,
  `a2-directions-poste-banque.m4a`, `bilan-a2-recit-journee-chronologie.m4a`).
- Aucune écoute humaine réelle effectuée (hors de portée d'un agent IA,
  avertissement déjà documenté par le chantier lui-même) — voir la
  checklist mise à jour, §8bis.

## 6. QA audio technique

- `npm run audio:status` : 115 pistes suivies, **0 manquante**, 0 orpheline.
- `npm run audio:a2:status` : bibliothèque A2 complète et cohérente, 0
  fichier manquant, 0 problème structurel.
- Chemins valides, IDs uniques, transcripts synchronisés : couverts par
  les tests existants (`transcript-sync.test.ts`,
  `humanized-tracks-sync.test.ts`, `content-integrity-*.test.ts`), tous
  verts après intégration.
- Aucune piste orpheline créée par l'intégration elle-même (les 3 merges
  n'ont touché aucun fichier `public/audio/` de façon conflictuelle).
- `lib/pedagogy/data/modules-public.generated.ts` et
  `exams-public.generated.ts` (artefacts de build) régénérés après merge
  pour vérifier l'absence de dérive — **aucune différence**, déjà à jour.

## 7. Scan premium

Tests dédiés existants (`no-client-leak.test.ts`, "Frontière premium" dans
`a2-content-integrity.test.ts`, `content-integrity*.test.ts`,
`modules-public.test.ts`, `exams-public.test.ts`) tous verts après
intégration. Vérification manuelle complémentaire : `correctChoiceId`/
`correctAnswer` n'apparaissent dans le bundle client buildé
(`.next/static/`) que dans les composants d'exercice génériques
(`ExerciseCard.tsx`, `WrittenExercise.tsx`, `QuizQuestion.tsx`), jamais
liés aux 4 documents `bilan-a2-*` — confirmé non raccordés à aucune page
live (`docs/audio/humanisation-a1-a2-b1.md` §6.5). Pas de diff exhaustif
bundle-par-tier effectué au-delà de cette vérification ciblée.

## 8. Auth / Stripe / email

Ce sandbox n'a pas de `DATABASE_URL` configurée — `getSessionUserId`
bascule proprement en "repli anonyme" (erreur loggée côté serveur, aucun
crash côté client, confirmé sur `/offre`). Inscription, connexion,
formulaires "mot de passe oublié" rendus et vérifiés visuellement, mais
**aucun flux réel (DB, session, Stripe, email) n'a pu être testé de bout
en bout** — non simulé, conformément à la consigne. Reste entièrement à la
charge de la QA humaine (voir checklist, sections 2-4, 13-14).

## 9. Mobile / accessibilité

Limite d'outillage rencontrée et documentée : l'outil de contrôle
navigateur disponible dans cette session clampe la largeur de fenêtre à
~1150px de CSS malgré une demande de redimensionnement à 375px
(`window.innerWidth` vérifié après coup, confirmé non 375) — aucune
capture mobile réelle n'a donc pu être produite pendant cette intégration,
malgré la tentative. Les pages concernées (`/`, `/test-niveau`,
`/parcours`, `/progression`, `/offre`, `/connexion`, `/inscription`) ont
été vérifiées en revanche à la largeur desktop disponible sans erreur
console ni régression visuelle évidente. QA mobile réelle (375/320px,
vrais appareils) reste entièrement à faire par un humain — déjà demandé
en checklist §15.

## 10. Performance

Aucune régression de build évidente : `npm run build` termine sans erreur,
route table cohérente (statique/dynamique conforme aux attentes — pages
utilisant `cookies()` correctement marquées dynamiques `ƒ`). Pas d'audit
de taille de bundle chiffré effectué (hors périmètre d'une intégration de
3 chantiers sans régression connue signalée sur ce point).

## 11. Code mort / conflits résiduels

Aucun trouvé après intégration : les 3 merges automatiques n'ont produit
aucune duplication de code, et aucun chemin explicitement contourné n'a
été identifié en dehors des artefacts déjà connus et documentés (le
manifest A1 parallèle non branché, déjà documenté comme tel par
`chantier/audio-humanisation`, §2 de `humanisation-a1-a2-b1.md` — pas un
résidu de cette intégration).

## 12. Tests / build

| Vérification | Résultat |
|---|---|
| `npm run lint` | ✅ aucune erreur |
| `npx tsc --noEmit` | ✅ aucune erreur (après `next typegen`, requis par cette version de Next pour générer `PageProps`/`LayoutProps`) |
| `npm test` (Vitest + SEO) | ✅ 536 Vitest + 8 SEO, tous verts |
| `npm run build` | ✅ succès, 51 pages générées |

Référence : `diagnostic-progress` seul annonçait 505 Vitest + 8 SEO,
`audio-humanisation` seul 519 Vitest + 8 SEO. Total final **536 Vitest**
(> aux deux références — inclut les tests des deux branches plus 2 tests
de régression ajoutés pendant cette intégration pour le bug §2) **+ 8
SEO**. Aucune régression du total.

## 13. Risques résiduels

- **Bloquant pour un vrai lancement, pas pour cette branche** : aucun flux
  auth/Stripe/email réel testé (environnement sans base de données) — à
  faire intégralement en QA humaine avec un environnement complet avant
  toute ouverture publique.
- **Non bloquant, déjà connu** : asymétrie gratuit A1/A2 (rien) vs B1 (2
  modules) peut recommander un module B1 à un profil A1 frais faute
  d'alternative accessible — décision produit assumée et documentée avant
  cette intégration (`docs/product/final-human-qa-checklist.md`), pas
  introduite par elle.
- **Non bloquant** : aucune écoute humaine des 58 pistes audio
  humanisées — nécessaire avant lancement (checklist §8bis).
- **Non bloquant** : QA mobile réelle non faite (limite d'outillage de
  cette session, voir §9).
- **Non bloquant** : normalisation de niveau sonore non appliquée
  rétroactivement à la bibliothèque A1 (44,1kHz) vs A2 (22 050Hz) —
  différence de fréquence d'échantillonnage documentée comme non urgente
  par `chantier/audio-humanisation`.

## 14. Documentation

- Ce document (`docs/product/final-launch-candidate.md`).
- `docs/product/final-human-qa-checklist.md` mise à jour (§8bis ajoutée,
  limites §ajustées).
- Documents préexistants réutilisés tels quels (déjà à jour) :
  `docs/product/diagnostic-progress-audit.md`,
  `docs/product/diagnostic-progress-integration.md`,
  `docs/product/launch-polish-audit.md`, `docs/product/launch-polish.md`,
  `docs/product/launch-analytics-funnel.md`, `docs/audio/*`.

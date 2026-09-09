---
title: Audit du parcours utilisateur — Launch Polish
type: product-audit
lastUpdated: 2026-09-08
---

# Audit du parcours utilisateur — chantier Launch Polish

Chantier `chantier/launch-polish`, base `main` @ `e96b27f` (identique à
`chantier/release-candidate`). Ce document ne repart pas de zéro : le
produit a déjà traversé trois chantiers de polish documentés
(`docs/product/v1-readiness.md`, `docs/product/free-premium-audit.md`,
`docs/product/positioning-a1-b1.md`, `docs/product/release-candidate.md`)
sur ce même code. Ce qu'ils ont déjà vérifié et jugé sain n'est pas
ré-audité en détail ici — seuls les écarts trouvés, confirmés ou corrigés
par ce chantier sont développés. Se référer à ces documents pour le détail
historique (sécurité premium, SEO, audio, accessibilité de base).

## Constat central : le diagnostic avait une conséquence réelle... jusqu'à un certain point

C'était la priorité n°1 de ce chantier. Verdict après audit précis du code
(`lib/pedagogy/logic/recommendation.ts`, `lib/pedagogy/useProgress.ts`,
`app/(pedagogie)/parcours/ParcoursExperience.tsx`, `components/marketing/PrimaryCta.tsx`) :

**Ce qui fonctionnait déjà bien :**
- Le résultat de `/test-niveau` (le vrai test de positionnement, CTA
  principal partout) est persisté via `markPlacementCompleted(level)` →
  `progress.level` + `progress.placementCompletedAt`, côté client
  (`localStorage`) puis synchronisé côté compte (`/api/progress`,
  `/api/progress/merge`). La fusion à la connexion est une union sans
  perte (`mergeUserProgress`), jamais un écrasement — aucun risque de
  perdre une vraie progression en se connectant.
- `/parcours` n'affiche qu'une seule recommandation principale
  ("Reprendre" / "Prochaine étape"), pas de CTA concurrents — la
  déduplication contre l'ancienne carte "Séance du jour" avait déjà été
  faite par un chantier précédent.

**Bug confirmé et corrigé par ce chantier :** `getNextModule()` (le moteur
qui choisit "quel module proposer ensuite", utilisé par `PrimaryCta`, le
CTA "Reprendre" de `/parcours` et le mini-bilan de fin de module) ignorait
totalement `progress.level`. Pour un apprenant qui vient de terminer
`/test-niveau` avec un résultat A2 ou B1 et n'a encore touché aucun module
(`moduleProgress` vide), la fonction parcourait les étapes du parcours dans
leur ordre physique — qui commence par l'A1 — et proposait donc sans
distinction le tout premier module A1 du catalogue. Cela contredisait
directement le message affiché sur l'écran de résultat du test
("le parcours t'emmène à partir de là, pas de zéro").

**Correctif** (`lib/pedagogy/logic/recommendation.ts`) : ajout d'un
plancher de niveau — pour une recommandation de découverte (pas une
reprise, qui reste inconditionnelle), un module dont le niveau CECRL est
strictement inférieur à `progress.level` n'est plus proposé. Si plus aucun
module ne satisfait ce plancher (tout terminé ou verrouillé au niveau
annoncé), on retombe sur la recherche sans plancher plutôt que de casser
la recommandation. 4 tests de régression ajoutés
(`lib/pedagogy/logic/__tests__/recommendation.test.ts`) : B1 sans
progression ne reçoit plus jamais de module A1 ; A2 saute l'A1 mais reste
éligible à l'A2/B1 ; repli sous le plancher si rien d'autre n'existe ;
une reprise réelle en cours n'est jamais bloquée par le plancher.

Vérifié en conditions réelles (serveur `next dev`, navigateur) : un
utilisateur A2 fraîchement diagnostiqué obtient désormais une
recommandation basée sur un vrai module A2 (verrouillé, `/offre` — cohérent
avec l'asymétrie gratuit/premium ci-dessous), plus jamais un module A1.

**Non touché, à raison :** le comportement documenté et testé où un
utilisateur *gratuit* A1/A2, filtré par accessibilité réelle
(`isAccessible`), retombe sur l'un des 2 modules B1 offerts en découverte
(aucun module A1/A2 n'est jamais gratuit) — voir
`recommendation.test.ts`, test "asymétrie connue, pas une régression".
Ce chantier ne change aucune règle d'accès (`lib/commerce/access.ts`),
conformément à la consigne. Le plancher ajouté n'annule pas ce filet de
secours : sans lui, ce même utilisateur recevrait `null` (aucune
recommandation) plutôt qu'un module B1 gratuit à essayer — pas
souhaitable.

**Reste fonctionnellement isolé, documenté comme tel depuis un chantier
antérieur, non traité ici** (refonte technique hors périmètre "polish") :
`/diagnostic` (18 questions, bilan détaillé) ne partage ni son contenu ni
sa persistance avec `useProgress` — son résultat ne met à jour ni
`progress.level` ni `progress.placementCompletedAt`. Il reste un
complément optionnel proposé depuis l'écran de résultat de `/test-niveau`
("Envie d'un bilan plus détaillé ?"), jamais un point d'entrée concurrent.
Un utilisateur qui ne passe que par `/diagnostic` sans jamais faire
`/test-niveau` ne voit donc aucune conséquence sur son parcours — cas
marginal (aucun CTA n'amène directement à `/diagnostic` en dehors de ce
lien secondaire) mais réel. Brancher `/diagnostic` sur `useProgress`
impliquerait de fusionner deux moteurs de scoring indépendants : un vrai
chantier technique à part entière, pas un correctif de polish.

## A. Visiteur inconnu

Homepage → promesse claire dès le H1 ("Apprends le français pour vivre en
France avec plus d'autonomie") + sous-titre qui couvre A1→B1, test de
niveau, situations concrètes. CTA principal unique et cohérent partout
(header, hero, pricing, offre, footer) : `/test-niveau`. Positionnement
déjà validé par `docs/product/positioning-a1-b1.md` — aucune régression
trouvée, aucun changement nécessaire ici.

## B/C/D. Utilisateur A1 / A2 / B1

Diagnostic → recommandation → parcours → séance du jour → révision : voir
le constat central ci-dessus. Une fois ce correctif appliqué, les 3
niveaux obtiennent une première recommandation cohérente avec leur
résultat réel (dans la limite du gratuit/premium, asymétrie assumée).

## E. Utilisateur premium

Offre → checkout → retour paiement → accès premium → progression : déjà
audité en détail par `docs/product/free-premium-audit.md` et
`docs/product/v1-readiness.md` §12. Page `/offre` claire (comparaison
gratuit/premium, gestion de l'état déjà-premium, paiement non configuré
géré proprement). Aucune régression trouvée en relisant le code de
`app/offre/page.tsx`, `app/api/checkout`, `app/api/webhooks/stripe`,
`app/paiement/succes`.

## F. Utilisateur gratuit

Tableau détaillé déjà dans `docs/product/free-premium-audit.md`. Asymétrie
A1/A2 (rien de gratuit) vs B1 (2 modules) confirmée toujours en place et
toujours documentée comme décision commerciale volontaire, pas un bug —
non arbitrée par ce chantier, conformément à la consigne. La seule
amélioration apportée ici est indirecte : la recommandation ne "ment" plus
sur le niveau (voir constat central), donc quand un mur premium apparaît,
il apparaît au bon endroit du parcours plutôt qu'après un détour par un
module A1 non pertinent.

## Résumé des changements de ce chantier

| Zone | Changement |
|---|---|
| `lib/pedagogy/logic/recommendation.ts` | Plancher de niveau CECRL sur les recommandations de découverte |
| `lib/pedagogy/logic/__tests__/recommendation.test.ts` | +4 tests de régression |

Aucun changement d'accès premium, aucune réécriture d'auth, aucune
nouvelle fonctionnalité — conformément au périmètre du chantier.

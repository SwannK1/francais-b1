---
title: Intégration A1 + A2 + B1
type: integration-notes
lastUpdated: 2026-09-06
---

# Intégration A1 + A2 + B1

Ce document décrit l'état final après fusion des quatre chantiers isolés
(`chantier/a1-content`, `chantier/a1-audio`, `chantier/a2-content`,
`chantier/a2-audio`) dans `chantier/integration-a1-a2-b1`, avec le B1
existant. Il remplace la lecture séparée de `a1-content.md`, `a1-audio.md`,
`a2-content.md` et `a2-audio.md` (conservés pour l'historique) pour tout ce
qui concerne l'état **après** intégration.

## 1. Architecture finale

Un seul catalogue par type de donnée, three niveaux confondus :

| Catalogue central | Contenu |
|---|---|
| `lib/pedagogy/data/modules.ts` (`MODULES`) | 26 modules B1 + 26 modules A1 (`MODULES_A1`) + 22 modules A2 (`MODULES_A2`), soit 74, plus 2 modules « banque d'écoute » (voir §3) = **76** |
| `lib/pedagogy/data/skills.ts` (`SKILLS`) | Compétences B1 + `SKILLS_A1` (35, préfixe `a1-`) + `SKILLS_A2` (préfixe `a2-`) |
| `lib/pedagogy/data/parcours-stages.ts` (`PARCOURS_STAGES`) | 18 étapes : 6 A1 (`order` 1-6) + 6 A2 (`order` 7-12) + 6 B1 (`order` 13-18) — voir §2 |
| `lib/pedagogy/data/exams.ts` (`EXAMS`) | Examens B1 + `EXAMS_A1` (1 évaluation finale) + `EXAMS_A2` (1 entraînement + 1 examen blanc) |
| `lib/pedagogy/types.ts` (`StageId`) | Union étendue avec les 6 valeurs `a1-*` et les 6 valeurs `a2-*`, en plus des valeurs B1 existantes |

Les fichiers sources isolés des quatre chantiers (`lib/pedagogy/data/a1/**`,
`lib/pedagogy/data/skills-a2.ts`, `modules-a2-part{1,2,3}.ts`, `exams-a2.ts`,
`lib/pedagogy/audio/a1/**`, `lib/pedagogy/audio/a2/**`) sont **conservés tels
quels** comme sources de vérité amont ; les catalogues centraux les
importent et les concatènent (`...MODULES_A1`, `...SKILLS_A2`, etc.).

**Doublons supprimés à l'intégration** (devenus redondants une fois
`MODULES`/`EXAMS` fusionnés) : `lib/pedagogy/data/index-a2.ts`,
`modules-public-a2.ts(.generated.ts)`, `exams-public-a2.ts(.generated.ts)`,
`scripts/generate-public-{modules,exams}-a2.mjs`. Le catalogue public
unique (`modules-public.generated.ts` / `exams-public.generated.ts`,
régénéré par `npm run generate:public-modules` / `generate:public-exams`)
couvre désormais A1 + A2 + B1.

## 2. Ordre du parcours et navigation

Décision produit prise à l'intégration (documentée comme différée par
`a1-content.md` §5.5 et `a2-content.md` §7.3) : **un seul parcours continu
A1 → A2 → B1**, pas de sélecteur de niveau séparé. Concrètement :

- `PARCOURS_STAGES` liste les étapes dans l'ordre A1, puis A2, puis B1 ;
  leur champ `order` (1 à 18) reflète cette continuité — l'UI existante
  (`ParcoursExperience`, `StageCard`, `/parcours/[stageSlug]`) affiche déjà
  « Étape N » à partir de ce champ, donc aucun changement de composant n'a
  été nécessaire.
- Aucune route/page n'a été ajoutée ou renommée : `/parcours`,
  `/parcours/[stageSlug]`, `/parcours/module/[slug]`,
  `/parcours/examens/[slug]` servent maintenant les trois niveaux sans
  distinction de code.
- La page `/parcours` reste actuellement titrée « Ton parcours B1 » de
  façon statique (texte pré-existant, non spécifique au niveau réel de
  l'apprenant) — limitation connue, cohérente avec l'absence de sélecteur
  de niveau, non corrigée ici (changement de copie/UX hors périmètre d'une
  intégration de données).

## 3. Banque d'écoute A1 / A2 — pourquoi et comment

Les bibliothèques audio A1 (65 pistes) et A2 (30 pistes) ont été produites
en autonomie, sans connaître les exercices `comprehension_orale` déjà
écrits par les chantiers de contenu correspondants. Résultat : seuls 14
exercices A1 et 13 exercices/examens A2 avaient un `audioSrc` déclaré à
l'avance — les chemins ne correspondaient à aucun fichier réellement produit
(extension `.mp3` inventée côté contenu A1, dossiers différents côté A2).

**Raccordement des exercices déjà déclarés** (14 A1 + 13 A2) : pour chaque
exercice, remplacement de `audioSrc`/`transcript`/`questions` par le
contenu réel de la piste audio la plus proche thématiquement (procédure
documentée dans `a1-audio.md` §7 et `a2-audio.md` §7 : reprendre
`track.exercise`/`formatA1Transcript(track)` tel quel). Le contenu
pédagogique (transcript, questions) devient donc celui réellement
enregistré/synthétisé — pas de piste de synthèse fabriquée à la volée.
Quelques appariements sont approximatifs faute de piste correspondante
exacte dans la bibliothèque (ex. aucune piste A1 sur la santé : l'exercice
`la-sante` utilise la piste « prendre un rendez-vous médical », thème
adjacent) — signalé au §8 « Limitations ».

**Pistes restantes (51 A1 + 17 A2)** : plutôt que de les redistribuer une à
une dans des leçons existantes (risque de gonfler arbitrairement le nombre
d'exercices — donc le seuil de complétion — de modules déjà finalisés), un
module supplémentaire et **optionnel** par niveau les regroupe par thème :

- `lib/pedagogy/data/a1/modules/banque-ecoute.ts` → module `a1-banque-ecoute`
  (stage `a1-bilan`), 17 leçons thématiques, 51 pistes.
- `lib/pedagogy/data/modules-a2-banque-ecoute.ts` → module `a2-banque-ecoute`
  (stage `a2-pret-pour-le-b1`), 11 leçons thématiques, 17 pistes.

Chaque leçon est marquée `optional: true` (note : ce champ n'est aujourd'hui
lu par aucune logique de progression — voir §8) et regroupe les exercices
`comprehension_orale` d'un même thème (ex. « Écoute libre : salutations »).
Résultat : **aucune piste orpheline** (vérifié par
`lib/pedagogy/data/integration-a1-a2-b1.test.ts`), sans toucher à la
structure d'aucun module gradé existant.

## 4. Sécurité premium

Aucune règle nouvelle : A1 et A2 traversent exactement le même mécanisme
que le B1 (`lib/commerce/access.ts` : `canAccess()`, `FREE_MODULE_SLUGS`,
`FREE_STAGE_IDS`). Comme aucun slug A1/A2 n'a été ajouté à ces listes,
**tout le contenu A1 et A2 est premium par défaut** (aperçu — titre,
description, objectifs — visible ; exercices verrouillés derrière
`PremiumLock`), au même titre que la majorité du contenu B1 actuel. C'est
une décision produit délibérément conservatrice, pas un oubli : ouvrir tout
ou partie d'A1 en accès gratuit (funnel d'essai) reste une décision à
prendre séparément, hors périmètre technique de cette intégration.

Vérifications faites (voir rapport final pour le détail) : scan de
`.next/static` après build (aucune fuite de transcript/réponse/audioSrc du
contenu gradé ; seules les `PLACEMENT_QUESTIONS`, déjà publiques avant
cette intégration, apparaissent en clair côté client — comportement
inchangé), et extension du test statique de graphe d'imports
(`modules-public.test.ts`) pour couvrir aussi les fichiers sources
isolés A1/A2 (`data/a1/modules-a1`, `data/modules-a2*`,
`audio/a1/manifest`, `audio/a2/manifest`), pas seulement les barrels
centraux.

## 5. Limitations résiduelles connues

- Pas de sélecteur de niveau ni de copie UI adaptée au niveau réel de
  l'apprenant (voir §2).
- Quelques appariements piste ↔ exercice sont thématiquement approximatifs
  faute de contenu audio pile correspondant (voir §3) — à revoir si un futur
  chantier audio comble ces trous (notamment : aucune piste A1 sur la santé,
  aucune piste A2 sur les indications de rue en ville).
- Le champ `Lesson.optional` (utilisé pour marquer les leçons de la banque
  d'écoute) n'est lu par aucune logique de progression/complétion
  aujourd'hui — une leçon optionnelle compte donc comme n'importe quelle
  autre dans le calcul de complétion du module qui la contient. Sans
  incidence ici (la banque d'écoute est un module à part, jamais mélangée à
  un module gradé), mais à garder en tête si ce champ est réutilisé
  ailleurs.
- Toutes les pistes audio (B1 comme A1/A2) restent 100 % synthétiques
  (voix macOS `say`) : aucun enregistrement humain, comportement inchangé.
- Aucune vraie écoute humaine des pistes A1/A2 n'a été faite pendant cette
  intégration (échantillon technique uniquement : décodage, durée,
  amplitude — voir rapport final §19).

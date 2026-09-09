---
title: Intégration du contenu A2
type: integration-notes
lastUpdated: 2026-09-05
---

# Intégration du contenu A2

Ce document explique l'architecture du chantier de contenu A2
(`chantier/a2-content`), pourquoi il est délibérément isolé du catalogue B1
existant, et ce qu'il reste à faire pour le raccorder au produit (routes,
logique de parcours, audio). Il ne modifie **aucun** fichier de contenu B1.

## 1. Pourquoi isolé

Le brief de ce chantier demande explicitement d'éviter les registres
centraux partagés et de documenter les raccordements futurs ici plutôt que
de les faire maintenant. Deux raisons concrètes à cela, au-delà de la
consigne :

- **Sessions concurrentes.** Ce dépôt tourne plusieurs chantiers Claude Code
  en parallèle dans des worktrees séparés (voir la liste des branches
  `chantier/*`), y compris un **`chantier/a2-audio`** distinct qui doit
  produire les fichiers audio A2 pointés par ce chantier. Toucher aux
  fichiers B1 partagés (`data/modules.ts`, `data/index.ts`,
  `data/skills.ts`...) créerait un risque de conflit de fusion avec ces
  sessions sans rapport avec le contenu A2.
- **Contenu vs architecture.** Ce chantier est un chantier de contenu et de
  pédagogie, pas d'intégration produit. Décider *où* et *comment* le
  parcours A2 apparaît dans l'UI (routes, navigation, test de
  positionnement unifié...) est une décision produit qui dépasse la
  rédaction de contenu — d'où la liste de raccordements au §7, à traiter
  dans un chantier dédié.

## 2. Architecture livrée

Chaque fichier B1 a un équivalent A2 isolé, jamais l'inverse (le B1 n'a
aucune dépendance vers l'A2) :

| B1 | A2 | Rôle |
|---|---|---|
| `lib/pedagogy/data/skills.ts` | `lib/pedagogy/data/skills-a2.ts` (`SKILLS_A2`) | Compétences, tous les ids préfixés `a2-` |
| `lib/pedagogy/data/parcours-stages.ts` | `lib/pedagogy/data/parcours-stages-a2.ts` (`PARCOURS_STAGES_A2`) | 6 étapes, mêmes `kind` (diagnostic/content/practice/bilan) |
| `lib/pedagogy/data/modules.ts` | `lib/pedagogy/data/modules-a2-part{1,2,3}.ts` + `modules-a2.ts` (`MODULES_A2`) | 22 modules, répartis par phase pour rester lisibles |
| `lib/pedagogy/data/delf-b1-reference.ts` | `lib/pedagogy/data/delf-a2-reference.ts` (`DELF_A2_REFERENCE`) | Barème/durées DELF A2 officielles |
| `lib/pedagogy/data/exams.ts` | `lib/pedagogy/data/exams-a2.ts` (`EXAMS_A2`) | 1 entraînement + 1 examen blanc complet |
| `lib/pedagogy/data/index.ts` | `lib/pedagogy/data/index-a2.ts` | Barrel serveur, contenu intégral |
| `lib/pedagogy/data/modules-public.ts` + `.generated.ts` | `modules-public-a2.ts` + `.generated.ts` | Vue client sans réponses |
| `lib/pedagogy/data/exams-public.ts` + `.generated.ts` | `exams-public-a2.ts` + `.generated.ts` | Idem pour les examens |
| `scripts/generate-public-modules.mjs` | `scripts/generate-public-modules-a2.mjs` | `npm run generate:public-modules-a2` |
| `scripts/generate-public-exams.mjs` | `scripts/generate-public-exams-a2.mjs` | `npm run generate:public-exams-a2` |
| `lib/pedagogy/data/content-integrity.test.ts` | `lib/pedagogy/data/content-integrity-a2.test.ts` | Dupliqué, pas factorisé (même logique de garde-fou) |
| `lib/pedagogy/data/modules-public.test.ts` | `lib/pedagogy/data/modules-public-a2.test.ts` | Idem, avec sa propre frontière statique `"use client"` |
| `lib/pedagogy/data/exams-public.test.ts` | `lib/pedagogy/data/exams-public-a2.test.ts` | Idem |
| `docs/b1/curriculum.md` | `docs/a2/curriculum.md` | Programme détaillé, 22 modules |
| `docs/b1/grammar/grammar-notions.md` | `docs/a2/grammar/grammar-notions-a2.md` | Progression grammaticale |
| `docs/b1/vocabulary/vocabulary-domains.md` | `docs/a2/vocabulary/vocabulary-domains-a2.md` | Domaines lexicaux |

**Seule exception à l'isolation stricte** : `lib/pedagogy/types.ts` (le type
`StageId`) a dû être étendu avec les 6 identifiants `a2-*`, ce type étant
fermé par conception (voir son commentaire de tête : « pour qu'une
affectation de module vers une étape inexistante soit une erreur de
compilation »). C'est une extension additive d'un type partagé, jamais une
donnée partagée — aucun module, skill ou étape B1 existant n'est modifié.

`lib/pedagogy/data/goals.ts`, `placement-questions.ts` et `domain-labels.ts`
n'ont **pas** d'équivalent A2 : ce sont déjà des registres transversaux par
conception (un objectif utilisateur ou une question de positionnement porte
plusieurs niveaux CECRL à la fois — `PLACEMENT_QUESTIONS` a par exemple déjà
3 questions `level: "A2"`). Les dupliquer aurait fragmenté un système déjà
pensé pour être partagé ; ce chantier les laisse intacts.

## 3. Modules, compétences, grammaire, vocabulaire

Voir en détail :
- `docs/a2/curriculum.md` — 22 modules, 3 phases (Début 1-8, Intermédiaire
  9-16, Consolidation 17-22), objectifs/grammaire/vocabulaire/situation par
  module.
- `docs/a2/grammar/grammar-notions-a2.md` — 21 notions grammaticales,
  chacune avec son module d'introduction et de reprise.
- `docs/a2/vocabulary/vocabulary-domains-a2.md` — 19 domaines lexicaux.
- `lib/pedagogy/data/skills-a2.ts` — catalogue complet des `skillId`.

Amélioration délibérée par rapport au B1 : le module bilan A2
(`bilan-a2`, module 22) couvre les **4** compétences DELF (compréhension
écrite, compréhension orale, production écrite, production orale).
`docs/b1/pedagogical-audit-2026.md` §3 documentait que l'équivalent B1
(`bilan-b1`) affirme couvrir « les 4 compétences » sans avoir de
compréhension orale — un audio réel manquant à l'époque. Le module A2
correspondant a été conçu dès le départ avec son exercice de compréhension
orale, vérifié par un test dédié
(`content-integrity-a2.test.ts` → describe "Bilan transversal").

## 4. Matrice A1 → A2 → B1

**Avertissement sur le périmètre.** Au moment de la rédaction de ce
chantier, `chantier/a1-content` existe comme worktree séparé mais n'est
**pas encore fusionné dans `main`** — cette branche (`chantier/a2-content`)
a été créée à partir d'un `main` qui ne contient aucun module A1 réel (voir
`lib/pedagogy/data/modules.ts` : seulement des modules `"B1"`). La colonne
« A1 acquis » ci-dessous s'appuie donc sur les descripteurs CECRL A1
standards (ce qu'un programme A1 sérieux couvre), pas sur une lecture du
code A1 réel — à revérifier une fois `chantier/a1-content` fusionné, au cas
où son contenu diverge de cette hypothèse.

La colonne « Prérequis B1 » est en revanche vérifiée sur le code réel du B1
existant (`docs/b1/curriculum.md`, `docs/b1/grammar/grammar-notions.md`).

| Notion | A1 acquis (hypothèse CECRL) | A2 — consolidation | Prérequis B1 (vérifié) |
|---|---|---|---|
| Présent | Verbes réguliers -er, être/avoir/aller de base | Verbes fréquents irréguliers (venir, vouloir, pouvoir, faire) — module 1, 12 | B1 module 1 : « présent (révision et régularisation) » — suppose déjà acquis |
| Verbes pronominaux | s'appeler (isolé) | Verbes pronominaux du quotidien et des relations — modules 2, 3 | B1 les réutilise sans les réintroduire |
| Passé composé | Non abordé ou très partiel | Introduit avec accords essentiels — module 5 ; consolidé modules 10, 13 | B1 module 2 : « passé composé (révision **complète** : auxiliaires, accords) » — l'A2 fournit la base à réviser |
| Imparfait | Non abordé | Introduction (description/habitude passée) — module 14 ; contraste avec passé composé — modules 15, 20 | B1 module 6 : distinction passé composé/imparfait — suppose l'imparfait déjà rencontré, pas encore maîtrisé en contraste rapide |
| Futur proche | Non abordé ou très partiel | Introduit module 9, réutilisé 12, 16 | B1 module 7 : « futur proche » listé comme prérequis implicite de la suite |
| Futur simple | Non abordé | Introduction module 13, réutilisé 16, 17, 19 | B1 module 8 : « futur simple (introduction) » — l'A2 pose une première base que le B1 peut alors qualifier d'« introduction » sans repartir de zéro |
| Impératif | Formes figées isolées (« Regardez », consignes de classe) | Introduit en contexte (indications, conseils) — module 7 ; repris 11, 18 | B1 module 5 : « impératif (introduction) » — cohérent avec un impératif A2 encore limité aux emplois courants |
| Comparatif | Non abordé | Introduit module 4, réutilisé 6, 17 | B1 module 4 liste pourtant aussi « comparatif (introduction) » — voir note ci-dessous |
| Superlatif | Non abordé | Introduit module 8 (simple) | B1 module 10 : « superlatif (approfondissement) » — cohérent, l'A2 pose la forme simple |
| Pronoms COD/COI | Non abordé | COD module 7, COI module 10, repris 16 | B1 module 9 : « pronoms personnels compléments... introduction » — voir note |
| Pronoms y/en | Non abordé | Introduction très limitée — module 21 | B1 module 9 : introduction légère, approfondie module 18 |
| Relatifs qui/que | Non abordé | Introduction module 4, repris 20 | B1 module 4 : « pronoms relatifs simples (qui, que, où) » — cohérent |
| Quantité/partitifs | du/de la isolés (« je voudrais du pain ») | Consolidés avec expressions de quantité — module 6, repris 21 | B1 module 3 les mentionne sans `skillId` dédié (trou documenté côté B1, voir §5 ci-dessous) |
| Adverbes de fréquence | toujours/jamais isolés | Systématisés — module 3, repris 8 | B1 module 3 les réutilise directement |
| Cause/conséquence simples | Non abordé | parce que/car, donc/alors — module 5, repris 22 | B1 module 12 : « cause simple », module 14 : approfondi — l'A2 fournit la première brique |
| Si + présent | Non abordé | Introduit module 19 (condition élémentaire) | B1 module 11 : « si + présent (condition réelle) » listé aussi — voir note |
| Discours rapporté, subjonctif, plus-que-parfait, conditionnel d'hypothèse | — | **Volontairement absents** (notions B1, voir `docs/a2/grammar/grammar-notions-a2.md` principe 4) | Introduits en B1 (modules 16, 20, 21) |

**Note sur les chevauchements apparents** (comparatif, pronoms
compléments, si+présent) : le programme B1 actuel liste certaines de ces
notions comme « introduction » à son propre module 4/9/11, ce qui a été
vérifié en lisant `docs/b1/curriculum.md` pendant l'audit de ce chantier.
Deux lectures possibles, non tranchées ici (décision produit, pas
contenu) :
1. Le B1 actuel a été écrit en supposant un prérequis A2 plus faible que ce
   que ce chantier vient de construire — une fois l'A2 intégré, ces
   modules B1 pourraient être allégés (vraie révision plutôt que
   ré-introduction complète).
2. Garder une légère répétition B1 volontaire, comme filet de sécurité
   pour l'apprenant qui saute directement en B1 sans faire l'A2.
   `docs/b1/curriculum.md` dit explicitement que le programme est prévu
   pour un public qui a « déjà le niveau A2 (compris) » — la redite
   actuelle suggère que le B1 n'a, à ce jour, jamais pu compter sur un vrai
   contenu A2 amont. Ce chantier change cette donnée de fait.

**Recommandation** : ne pas toucher au B1 dans ce chantier (hors périmètre,
risque de conflit avec les sessions concurrentes), mais signaler ce
chevauchement comme point à trancher dans un futur chantier d'intégration
A1/A2/B1 unifié.

## 5. Trou hérité du B1, non corrigé ici

`docs/b1/pedagogical-audit-2026.md` §5 documente que « quantité/partitifs »
et « négation de base » n'ont pas de `skillId` B1 dédié. Ce chantier ne
corrige pas le B1 (hors périmètre), mais **n'a pas reproduit ce trou côté
A2** : `a2-gr-quantite-partitifs` est un `skillId` A2 à part entière. La
négation de base (ne...jamais, ne...plus, ne...rien) est en revanche restée
diffuse dans le vocabulaire A2 plutôt que dotée d'un `skillId` grammaire
dédié — à revoir si un futur audit A2 juge cela nécessaire (même arbitrage
que le B1 : gain de granularité modeste contre risque sur le calcul de
progression existant).

## 6. Audio

Chaque exercice `comprehension_orale` A2 référence un `audioSrc` de la
forme `/audio/a2/<slug-du-module>.m4a` (un fichier par module, même
convention que le B1 dans `public/audio/b1/`). **Aucun de ces fichiers
n'existe encore sur disque** : la production audio (synthèse ou
enregistrement humain) est le périmètre de `chantier/a2-audio`, une
session séparée. `content-integrity-a2.test.ts` vérifie donc la forme du
chemin et la présence d'un transcript, mais **pas** l'existence réelle du
fichier — à la différence du test B1 équivalent, qui suppose des fichiers
déjà livrés.

**Raccordement nécessaire** : une fois `chantier/a2-audio` livré, porter
son pipeline `AUDIO_TRACKS`-like (voir `lib/pedagogy/audio/manifest.ts`
pour le modèle B1) vers ce catalogue A2 en s'assurant qu'il source
`MODULES_A2`/`EXAMS_A2`, pas `MODULES`/`EXAMS`, et durcir
`content-integrity-a2.test.ts` avec la même vérification d'existence sur
disque que son équivalent B1.

Modules avec audio prévu (10/22, ~45%) : 3, 5, 7, 9, 11, 13, 15, 17, 21, 22
(le bilan inclut délibérément une compréhension orale, voir §3).

## 7. Raccordements produit restants

Non traités ici (hors périmètre contenu/pédagogie de ce chantier) :

1. **Barrel commun.** `lib/pedagogy/data/index.ts` (B1) et `index-a2.ts`
   restent deux fichiers parallèles. Le jour où le produit doit lister les
   deux niveaux ensemble (ex. page de choix de niveau), soit un composant
   importe les deux barrels explicitement, soit les deux catalogues sont
   fusionnés en un point d'entrée paramétré par niveau — à trancher en
   fonction du besoin UI réel, pas anticipé ici.
2. **Logique de parcours non générique.** `lib/pedagogy/logic/parcours.ts`
   et `lib/pedagogy/logic/recommendation.ts` importent en dur
   `PARCOURS_STAGES` (B1) — vérifié par lecture directe de ces fichiers
   pendant ce chantier. Utiliser ces fonctions pour le parcours A2 demande
   soit de les généraliser pour accepter `PARCOURS_STAGES_A2` en paramètre,
   soit de créer des équivalents `parcours-a2.ts`/`recommendation-a2.ts`
   isolés (même principe que la couche données). Ni l'un ni l'autre n'a été
   fait ici : c'est de la logique produit, pas du contenu.
3. **Routes et navigation.** Aucune route `app/francais-a2`,
   `app/grammaire-a2`, `app/exercices-a2` ou
   `app/comprehension-orale-a2` n'existe : ce chantier ne livre que la
   couche `lib/pedagogy/data/*-a2*`. Les composants existants
   (`components/pedagogy/*`) consomment aujourd'hui `PUBLIC_MODULES`
   (B1) — les rendre génériques par niveau, ou dupliquer les pages, est un
   choix produit pour le chantier d'intégration.
4. **Test de positionnement.** `PLACEMENT_QUESTIONS` (partagé, non modifié
   ici) a déjà 3 questions `A2` sur 15 au total. Un futur chantier pourrait
   vouloir en ajouter pour affiner la détection du niveau A2 spécifiquement
   — non fait ici pour respecter l'isolation (fichier partagé).
5. **Objectifs utilisateur.** `lib/pedagogy/data/goals.ts` recommande déjà
   `"A2"` pour plusieurs objectifs (`ameliorer_francais`, `vivre_en_france`,
   `carte_sejour`) — ce contenu A2 est directement pertinent pour ces
   objectifs dès qu'il est raccordé, sans modification nécessaire de ce
   fichier.

## 8. État des lieux — checklist d'intégration future

- [ ] Décider du traitement des chevauchements A2/B1 identifiés au §4
      (alléger le B1, ou assumer une répétition volontaire).
- [ ] Fusionner `chantier/a1-content` puis revérifier la colonne « A1
      acquis » de la matrice §4 contre le contenu A1 réel.
- [ ] Raccorder `chantier/a2-audio` (fichiers `.m4a` + manifest de
      production) et durcir `content-integrity-a2.test.ts`.
- [ ] Décider de la stratégie de barrel commun (§7.1) et de logique de
      parcours générique (§7.2).
- [ ] Construire les routes/pages A2 (§7.3) une fois la stratégie UI
      choisie.

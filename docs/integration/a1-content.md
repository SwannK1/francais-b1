# Intégration du contenu A1 — chantier `chantier/a1-content`

Ce document décrit ce que ce chantier a produit et comment l'intégrer dans
l'architecture centrale (`lib/pedagogy/data/*`), sans que ce chantier lui-même
n'ait touché ces fichiers partagés — voir « Principe d'isolation » ci-dessous.

## 1. Ce qui a été construit

Un parcours A1 complet et autonome sous `lib/pedagogy/data/a1/`, avec sa
propre arborescence de types, données et tests — voir § 3 pour la liste des
fichiers. Il couvre :

- **26 modules** (`MODULES_A1`), répartis en 6 étapes (`A1_PARCOURS_STAGES`) :
  Découverte (4), Ma vie quotidienne (5 + bilan intermédiaire 1), Sortir et
  se déplacer (5 + bilan intermédiaire 2), Quotidien/travail/loisirs
  (6 + bilan intermédiaire 3), S'entraîner façon DELF A1 (2), Bilan A1 (1).
- **35 compétences** (`SKILLS_A1`), toutes préfixées `a1-` : 12 grammaire,
  17 vocabulaire, 4 compréhension (écrite/orale), 3 production écrite/orale
  partagées, 1 préparation examen.
- **1 évaluation finale** (`EXAMS_A1`), au format DELF A1 (4 épreuves :
  CO/CE/PE/PO), contenu 100% original.
- Une **audit pédagogique** a été menée et deux corrections appliquées
  (voir § 6).

## 2. Principe d'isolation — pourquoi rien n'a été fusionné

La consigne du chantier demande d'éviter les fichiers que les chantiers
parallèles `a1-audio`, `a2-content` et `a2-audio` risquent aussi de modifier.
Concrètement, ce chantier n'a **jamais modifié** :

- `lib/pedagogy/types.ts` (types centraux, notamment `StageId` — union
  fermée qui ne connaît que les étapes B1)
- `lib/pedagogy/data/index.ts` (barrel central)
- `lib/pedagogy/data/modules.ts`, `skills.ts`, `parcours-stages.ts`,
  `exams.ts`, `domain-labels.ts` (catalogues B1)
- `lib/pedagogy/data/modules-public.ts` / `modules-public.generated.ts`
  et `scripts/generate-public-modules.mjs` (pipeline de dérivation publique,
  câblé exclusivement sur `data/modules.ts`)
- `lib/pedagogy/audio/manifest.ts` (dérivé de `EXAMS`/`MODULES` centraux,
  périmètre du chantier `a1-audio`)

À la place, tout le contenu A1 vit dans un dossier dédié
`lib/pedagogy/data/a1/`, avec ses propres types (`A1Module`, `A1StageId`,
`A1ParcoursStage`) qui **copient structurellement** `Module`/`StageId`/
`ParcoursStage` sans en dépendre. Concrètement :

- `A1Module` = même forme que `Module`, sauf `stageId: A1StageId` (au lieu de
  `StageId`) et `level` figé à `"A1"`.
- Tous les autres types réutilisés tels quels depuis `lib/pedagogy/types.ts`
  (ils ne référencent jamais `StageId`) : `Lesson`, `Activity`, `Exercise`
  (et toute l'union `QcmExercise | VraiFauxExercise | ...`), `Skill`,
  `SkillDomain`, `VocabularyEntry`, `LanguagePoint`, `Exam`, `ExamSection`.
  `Exam` en particulier n'a **pas eu besoin d'être dupliqué** : il n'a jamais
  de `stageId`, `EXAMS_A1` est donc directement un `Exam[]`.

Ce choix rend la bascule vers les types centraux **triviale** au moment de
l'intégration (voir § 5) : une fois `StageId` étendu avec les 6 valeurs A1,
`A1Module` devient interchangeable avec `Module` sans toucher au contenu.

## 3. Fichiers créés

```
lib/pedagogy/data/a1/
├── types.ts                          # A1StageId, A1ParcoursStage, A1Module
├── skills-a1.ts                      # SKILLS_A1 (35 compétences, ids préfixés a1-)
├── parcours-stages-a1.ts             # A1_PARCOURS_STAGES (6 étapes)
├── modules-a1.ts                     # MODULES_A1 — barrel combinant les fichiers ci-dessous
├── modules/
│   ├── decouverte.ts                 # 4 modules (se présenter, nombres/âge, nationalités, famille)
│   ├── vie-quotidienne.ts            # 5 modules (décrire, vêtements, maison, jours/mois, heure)
│   ├── sortir-et-bouger.ts           # 5 modules (ville, transports, café/resto, courses, achats)
│   ├── quotidien-et-loisirs.ts       # 6 modules (journée, loisirs, travail, santé, météo, rdv)
│   ├── bilans.ts                     # 3 bilans intermédiaires
│   ├── preparation-examen.ts         # 2 modules d'entraînement DELF A1
│   └── bilan-final.ts                # 1 module de bilan de fin de parcours
├── exams-a1.ts                       # EXAMS_A1 — évaluation finale (type Exam réutilisé tel quel)
├── index.ts                          # barrel A1 (équivalent de data/index.ts, non câblé dessus)
└── content-integrity-a1.test.ts      # tests dédiés (20 assertions, voir § 4)

docs/integration/a1-content.md        # ce document
```

Aucun fichier existant n'a été modifié.

## 4. Tests dédiés

`lib/pedagogy/data/a1/content-integrity-a1.test.ts` adapte
`lib/pedagogy/data/content-integrity.test.ts` (B1) au périmètre A1
uniquement (n'importe jamais les données B1). Il vérifie :

- IDs et slugs uniques (skills, stages, modules, exams) et sans collision
  avec les stages B1 pour les stageId
- Slugs en kebab-case valide
- `level` = `"A1"` partout (modules et exam)
- Chaque module référence un `stageId` existant dans `A1_PARCOURS_STAGES`
- Titre/description/objectifs non vides, au moins une leçon par module,
  au moins une activité par leçon, au moins un exercice par activité
- Chaque module se termine par une leçon `evaluation` (mini-bilan)
- Unicité des ids lesson/activity/exercise/sous-question sur tout le corpus
- Absence de placeholder/TODO/lorem ipsum
- Validité de chaque exercice selon son type (réponses cohérentes,
  `correctChoiceId` dans les choix, `correctOrder` cohérent avec `items`,
  blancs texte-à-trous alignés avec les placeholders, etc.)
- Barème/durée de l'examen cohérents avec la somme des épreuves, et
  couverture des 4 épreuves DELF (CO/CE/PE/PO)

Volontairement absent : la vérification "le fichier audio existe sur disque"
(présente dans les tests B1). Voir § 5.3.

`npm test` exécute déjà ce fichier (vitest ramasse tout `*.test.ts` du
repo) : aucune configuration supplémentaire nécessaire.

## 5. Raccordements nécessaires au moment de l'intégration

### 5.1 Étendre `StageId` (`lib/pedagogy/types.ts`)

Ajouter les 6 valeurs A1 à l'union `StageId` :

```ts
export type StageId =
  | "faire-le-point"
  | "b1-debut"
  | "b1-intermediaire"
  | "b1-consolidation"
  | "preparation-examen"
  | "pret-pour-le-b1"
  // --- A1 ---
  | "a1-decouverte"
  | "a1-vie-quotidienne"
  | "a1-sortir-et-bouger"
  | "a1-quotidien-et-loisirs"
  | "a1-preparation-examen"
  | "a1-bilan";
```

⚠️ Le chantier `a2-content` ajoutera probablement ses propres valeurs A2 au
même endroit — un conflit de fusion sur cette union est probable et attendu ;
résoudre en gardant les deux jeux de valeurs (A1 et A2 sont deux ensembles
disjoints, aucune contradiction sémantique entre eux).

Une fois cette extension faite, `A1Module` (dans
`lib/pedagogy/data/a1/types.ts`) devient structurellement identique à
`Module` — le contenu de `lib/pedagogy/data/a1/modules/*.ts` n'a besoin
d'aucune transformation, seul le type d'import change (`Module` au lieu de
`A1Module`).

### 5.2 Fusionner les catalogues centraux

Dans `lib/pedagogy/data/` :

- `parcours-stages.ts` : ajouter les 6 entrées de `A1_PARCOURS_STAGES` à
  `PARCOURS_STAGES` (`order` à recalculer selon la place voulue du parcours
  A1 dans la navigation globale — décision produit hors du périmètre de ce
  chantier : le parcours A1 précède-t-il le B1, ou les deux niveaux
  coexistent-ils en parallèle avec un sélecteur de niveau ?).
- `skills.ts` : ajouter les 35 entrées de `SKILLS_A1` à `SKILLS` (aucun
  risque de collision d'id, tout est préfixé `a1-`).
- `modules.ts` : ajouter les 26 entrées de `MODULES_A1` à `MODULES`, après
  changement du type d'import (`A1Module` → `Module`, voir § 5.1).
- `exams.ts` : ajouter l'entrée de `EXAMS_A1` à `EXAMS` (aucun changement de
  type nécessaire, `Exam` est déjà réutilisé tel quel).
- `domain-labels.ts` : aucun changement — les 6 `SkillDomain` utilisés par
  `SKILLS_A1` sont déjà tous couverts par `DOMAIN_LABELS`.

Après fusion, régénérer le contenu public :
`npm run generate:public-modules` (et `generate:public-exams` si un exam
public équivalent existe déjà pour B1 — ce chantier n'a pas construit
d'équivalent `modules-public`/`exams-public` pour l'A1, voir § 5.4).

### 5.3 Pipeline audio (périmètre du chantier `a1-audio`)

Les 20 exercices `comprehension_orale` de ce chantier référencent des
chemins `audioSrc` suivant la convention
`/audio/a1/<slug-du-module>/<id-exercice>.mp3` (voir aussi
`/audio/a1/examen-final/` pour les 2 pistes de l'examen final), avec un
`transcript` complet à chaque fois. Aucun fichier audio n'existe encore sous
`public/` : c'est le périmètre du chantier `a1-audio`.

Une fois les modules A1 fusionnés dans `MODULES`/`EXAMS` (§ 5.2), il faudra :

1. Produire les fichiers audio (ou un filet synthétique, comme pour le B1)
   aux chemins ci-dessus.
2. Étendre `lib/pedagogy/audio/manifest.ts` (`AUDIO_TRACKS`) avec une entrée
   par piste A1 — le test B1
   `content-integrity.test.ts > Pipeline audio humain` échouera sinon
   (vérifie qu'il existe une piste de manifest pour **chaque** exercice
   `comprehension_orale` de `MODULES`/`EXAMS`, A1 compris une fois fusionné).
3. Rejouer `npm run audio:status` pour vérifier l'état de la couverture.

### 5.4 Contenu public (`modules-public.ts` / `exams-public.ts`)

Ce chantier n'a pas construit d'équivalent `PUBLIC_MODULES`/`PUBLIC_EXAMS`
pour l'A1 — ces fichiers sont générés par script à partir de `MODULES`/
`EXAMS` (`scripts/generate-public-modules.mjs`,
`scripts/generate-public-exams.mjs`), qui n'opèrent que sur les catalogues
centraux. Une fois la fusion du § 5.2 faite, relancer simplement :

```
npm run generate:public-modules
npm run generate:public-exams
```

Aucune modification de script n'est nécessaire : ils sont déjà génériques
sur `MODULES`/`EXAMS`, quel que soit le niveau CECRL des entrées.

### 5.5 Navigation / homepage / routing

Ce chantier n'a touché aucun fichier de navigation, page ou route (aucun
fichier sous `app/` ou `components/`). Une fois le contenu A1 fusionné dans
les catalogues centraux, il apparaîtra automatiquement dans les pages qui
lisent déjà `PARCOURS_STAGES`/`PUBLIC_MODULES`/`PUBLIC_EXAMS`
(`/parcours`, `/parcours/[stageSlug]`, `/parcours/module/[slug]`,
`/parcours/examens/[slug]`) sans changement de code — à condition que
l'intégration décide comment présenter un parcours multi-niveaux (un
sélecteur de niveau sur `/parcours` n'existe pas aujourd'hui, l'UI actuelle
suppose un seul niveau B1 continu). C'est une décision produit à trancher
lors de l'intégration, pas un simple raccordement mécanique.

## 6. Audit pédagogique — corrections appliquées

1. **Vocabulaire non enseigné testé en mini-bilan** : le module
   `ma-famille` (et le bilan intermédiaire 1, qui le recyclait) testaient
   « oncle »/« tante » sans jamais les avoir introduits dans le vocabulaire
   du module. Remplacé par « grand-père »/« grand-mère », déjà enseignés.
2. **Verbes irréguliers annoncés mais jamais conjugués explicitement** :
   la compétence `a1-gr-verbes-irreguliers` promet la conjugaison de aller,
   faire, venir et prendre, mais aller/faire n'apparaissaient qu'en usage
   (futur proche, expressions figées), sans jamais présenter leur
   conjugaison au présent. Ajout d'un point de langue explicite sur
   « aller » (module `en-ville`) et sur « faire » (module
   `faire-les-courses`), chacun accompagné d'un exercice dédié.
3. Seuils de mini-évaluation harmonisés avec la convention B1 existante
   (le libellé UI affiche toujours « X/10 bonnes réponses minimum » — voir
   `ModuleExperience.tsx` — indépendamment du nombre réel d'items ; ce
   chantier n'a pas corrigé cette incohérence d'affichage préexistante,
   partagée avec le B1 et hors périmètre contenu).

## 7. Tests à rejouer après intégration

Dans l'ordre, depuis la racine du repo intégré :

```
npm test               # inclut content-integrity.test.ts (B1) ET content-integrity-a1.test.ts
npm run lint
npx tsc --noEmit
npm run build
npm run generate:public-modules && npm run generate:public-exams   # après fusion § 5.2
npm test               # rejouer une fois les fichiers générés à jour (modules-public.test.ts / exams-public.test.ts vérifient la synchronisation)
npm run audio:status   # après § 5.3
```

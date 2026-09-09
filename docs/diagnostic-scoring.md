# Diagnostic de niveau (`/diagnostic`) — logique de scoring

Ce document explique comment le diagnostic de niveau calcule son résultat.
Il complète les commentaires de `lib/diagnostic/scoring.ts` (source de
vérité pour le détail des seuils) avec une vue d'ensemble destinée à un
relecteur non technique (produit, pédagogie).

## Portée

- Chantier entièrement autonome : `lib/diagnostic/*` ne dépend d'aucun type
  ni d'aucune logique de `lib/pedagogy/*` (le cœur pédagogique existant), à
  une seule exception volontaire — `recommendation.ts` lit les métadonnées
  (`slug`, `title`) de deux étapes du parcours déjà publiques, pour proposer
  un vrai lien de départ plutôt qu'une URL inventée. Si ces étapes venaient à
  disparaître, le lien replie sur `/parcours`.
- Ne remplace pas `/test-niveau` (le test de positionnement existant, utilisé
  dans l'onboarding, les emails, le footer...) : les deux coexistent. Le
  diagnostic est plus long et plus détaillé (18 questions vs 12, détection
  d'incohérence, arrêt anticipé), pensé comme une alternative approfondie.
- Restitue uniquement A1, A2 ou B1 — jamais B2 : la plateforme n'a de
  contenu qu'en B1, un niveau "B2" n'orienterait vers rien de concret.
- Pas de compréhension orale : le pipeline audio existant
  (`components/pedagogy/AudioExercise.tsx`) résout chaque piste via un
  fichier humain **et** un filet synthétique par exercice
  (`lib/pedagogy/audio/*`), avec son propre plan d'enregistrement
  (`docs/b1/audio-human-recording-plan.md`). Réutiliser cette mécanique pour
  quelques questions de diagnostic aurait exigé de produire de nouveaux
  fichiers audio (humains + synthétiques) suivant cette convention — une
  vraie dépendance de contenu, pas un simple ajout de code. C'est exactement
  la "dépendance lourde" que la consigne du chantier demande d'éviter.

## Les questions

18 questions dans `lib/diagnostic/questions.ts`, contenu original (aucune
question partagée avec `/test-niveau`) :

- 3 paliers de niveau : A1, A2, B1 — 6 questions chacun.
- 3 domaines : compréhension écrite, vocabulaire, grammaire — 6 questions
  chacun, répartis à parts égales sur les 3 paliers (2 par domaine et par
  palier).
- Administrées **dans l'ordre du tableau** : tout le palier A1, puis tout le
  palier A2, puis tout le palier B1. Jamais mélangé — c'est ce qui produit la
  difficulté progressive demandée.

## Score par palier de niveau

Chaque palier compte 6 questions. Le nombre de bonnes réponses classe le
palier en 3 statuts :

| Bonnes réponses / 6 | Statut       | Sens                                    |
| -------------------- | ------------ | ---------------------------------------- |
| 4, 5 ou 6             | `acquired`   | Le niveau est considéré maîtrisé          |
| 2 ou 3                | `partial`    | Ni maîtrisé, ni en échec — ignoré         |
| 0 ou 1                | `gap`        | Lacune critique sur ce palier             |

Pourquoi ces seuils (et pas "tout juste" ou "tout faux") :

- **Un seuil à 4/6 (pas 6/6) pour "acquired"** : une seule erreur, même sur
  une question difficile, ne fait jamais chuter un palier par ailleurs
  réussi.
- **Un seuil à 1/6 (pas 0/6) pour "gap"** : une bonne réponse isolée (chance,
  clic hâtif) sur un palier par ailleurs raté ne suffit pas à sauver ce
  palier.
- **Aucun seuil à 100%** nulle part : avec 6 questions par palier, exiger la
  perfection rendrait le test trop sensible au hasard d'une question mal
  formulée ou ambiguë pour un apprenant par ailleurs solide.

## Du score par palier au niveau estimé

Le niveau estimé part de **A1** par défaut, puis progresse palier par palier
dans l'ordre A1 → A2 → B1 :

- Un palier `acquired` fait progresser l'estimation à ce palier.
- Un palier `partial` est **ignoré** : il ne fait ni progresser, ni chuter
  l'estimation.
- Un palier `gap` **plafonne** l'estimation : les paliers suivants, même
  `acquired`, ne sont alors plus pris en compte. Une vraie lacune sur les
  bases rend un score supérieur peu fiable (l'apprenant a pu réussir des
  questions plus difficiles par un mécanisme différent — mémorisation
  ponctuelle, chance — sans maîtriser les fondations).

Exemple : A1 acquis, A2 partiel, B1 acquis → estimation **B1** (le palier A2
partiel n'empêche rien). A1 acquis, A2 en lacune, B1 acquis → estimation
plafonnée à **A1** (la lacune sur A2 prime sur la réussite en B1).

## Arrêt anticipé

Le diagnostic peut s'arrêter avant sa fin naturelle (18 questions), mais
uniquement à deux points de contrôle précis — jamais en cours de palier — et
seulement dans des cas jugés suffisamment fiables :

1. **Arrêt "plancher"** (`early-floor`), vérifié juste après la 6ᵉ question
   (fin du palier A1) : si 1 bonne réponse ou moins sur 6, le diagnostic
   s'arrête et estime **A1** directement. Continuer avec des questions A2/B1
   n'apporterait pas d'information utile — et A1 est déjà le niveau plancher
   restitué par ce diagnostic.
2. **Arrêt "plafond"** (`early-ceiling`), vérifié juste après la 12ᵉ question
   (fin des paliers A1+A2) : si 11 bonnes réponses ou plus sur ces 12
   premières questions, le diagnostic s'arrête et estime **B1** directement
   (cas spécial documenté dans `computeDiagnosticResult` : aucun recalcul
   palier par palier, puisque le palier B1 n'a par construction pas été
   administré). B1 étant le niveau le plus haut restitué par ce diagnostic,
   une performance quasi parfaite sur les deux premiers paliers suffit à le
   confirmer sans in fliger 6 questions B1 de plus.

Ces deux seuils sont volontairement stricts (échec quasi total / réussite
quasi parfaite) : la consigne du chantier demande de ne raccourcir le test
"que si cela reste fiable", pas pour gagner du temps à tout prix.

## Score par domaine et détection d'incohérence

Pour chaque domaine (compréhension écrite, vocabulaire, grammaire), le
diagnostic calcule un taux de réussite global, **et** compare ce taux palier
par palier au sein du même domaine. Si un palier plus difficile obtient un
score meilleur d'au moins 50 points de pourcentage qu'un palier plus facile
(ex. 0% en A1 vs 100% en B1, sur le même domaine), ce domaine est marqué
**irrégulier** (`irregular: true`).

Un domaine irrégulier n'est **jamais** compté comme point fort, même si sa
moyenne brute dépasse le seuil (70%) — un score élevé porté par des réponses
incohérentes (chance sur les questions difficiles, clic hâtif sur les
faciles) n'est pas un signal de compétence fiable. Il reste en revanche
éligible comme point à travailler si sa moyenne est basse : l'incohérence ne
"sauve" jamais un domaine faible, elle retire seulement la confiance qu'on
peut accorder à un domaine qui semblait fort.

## Points forts / points à travailler

- **Point fort** : taux de réussite du domaine ≥ 70%, et domaine non marqué
  irrégulier.
- **Point à travailler** : taux de réussite du domaine < 45%.

Un domaine avec au moins une question administrée mais sans données
suffisantes (ex. diagnostic interrompu avant toute question de ce domaine)
n'apparaît ni comme point fort ni comme point à travailler — jamais classé
par défaut.

## Recommandation ("Commencer mon parcours")

La plateforme couvre désormais A1, A2 et B1 (intégration
`chantier/integration-a1-a2-b1`). Le point de départ recommandé est toujours
une étape réelle du parcours de son propre niveau — jamais une étape B1
utilisée comme repli générique pour A1/A2 :

| Niveau estimé | Domaines fragiles | Étape recommandée                              |
| -------------- | ------------------ | ------------------------------------------------ |
| A1              | —                   | Découverte (premier module A1)                    |
| A2              | —                   | Se présenter et s'installer (phase Début A2)      |
| B1              | Au moins un         | Poser les bases du B1 (consolider d'abord)        |
| B1              | Aucun               | Argumenter et échanger (phase Intermédiaire)      |

## Toujours exploitable

`computeDiagnosticResult` ne lance jamais d'exception, même avec 0 réponse
(diagnostic interrompu immédiatement) : elle retourne un résultat valide
(niveau A1 par défaut, score à 0%, aucune force ni faiblesse, recommandation
non vide). Testé explicitement dans
`lib/diagnostic/__tests__/scoring.test.ts`.

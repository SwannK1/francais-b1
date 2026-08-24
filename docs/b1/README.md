# Contenus pédagogiques B1 — guide

Ce dossier contient le **programme pédagogique B1** de la plateforme : la
progression complète, les références de grammaire et de vocabulaire, et les
modules rédigés. Il est volontairement **isolé du reste de l'application**
(voir `AGENTS.md` / le chantier « contenus » du projet) : rien ici ne dépend
du moteur de progression, de l'UI, ni d'un schéma TypeScript particulier.

## Arborescence

```
content/b1/
├── README.md                 → ce document
├── curriculum.md             → programme complet : les 24 modules, phases, progression
├── grammar/
│   └── grammar-notions.md    → notions grammaticales B1, mappées aux modules
├── vocabulary/
│   └── vocabulary-domains.md → domaines lexicaux B1, mappés aux modules
└── modules/
    ├── module-06-raconter-un-evenement-passe.md
    ├── module-09-donner-son-opinion.md
    ├── module-12-parler-de-son-travail-et-projets.md
    ├── module-14-expliquer-un-probleme.md
    └── module-16-comprendre-une-demarche-administrative.md
```

Les 5 fichiers de `modules/` sont les **modules pilotes**, entièrement
rédigés, qui servent de modèle. Les 19 autres modules du programme existent
pour l'instant seulement comme fiches de cadrage dans `curriculum.md` — à
rédiger en intégralité plus tard, en suivant ce même modèle.

## Format des données

**Format retenu : Markdown structuré avec front-matter YAML.**

Pourquoi ce choix plutôt que du JSON ou des fichiers TypeScript :

- lisible et modifiable directement par un rédacteur pédagogique (pas
  seulement par un développeur) ;
- le front-matter YAML porte les métadonnées structurées (numéro, objectif,
  compétences, grammaire, vocabulaire, durée, prérequis...), facilement
  parsable par n'importe quel outil (`gray-matter`, `next-mdx-remote`, un
  script Python, etc.) ;
- le corps Markdown porte le contenu pédagogique riche (texte, dialogues,
  exercices) sans contrainte de schéma rigide ;
- ce format ne présuppose rien de la structure de données que le chantier 2
  (architecture technique / types) pourrait définir en parallèle. Il suffit
  d'écrire, plus tard, un petit script de conversion Markdown → JSON/TS si
  besoin, sans jamais avoir à retoucher le contenu lui-même.

**Chaque module est un seul fichier** `content/b1/modules/module-XX-slug.md`.
Toutes les activités (compréhension, exercices, audio, production,
mini-évaluation) sont regroupées dans ce fichier, sous des titres de section
identiques d'un module à l'autre (voir plus bas). Ce choix évite
d'éparpiller un module cohérent entre dix petits fichiers ; si l'équipe
technique a besoin d'extraire une section précise (par ex. tous les scripts
audio dans une base de données), elle peut le faire par un script qui
découpe sur les titres `## F. Compréhension orale`, identiques dans chaque
fichier.

## Front-matter d'un module — champs obligatoires

```yaml
title: <titre du module>
module: <numéro entier>
level: B1
phase: Début | Intermédiaire | Consolidation
slug: <identifiant-url>
objective: <une phrase, formulée « à la fin de ce module, tu pourras... »>
competencies: [<liste courte>]
grammar: [<notions grammaticales du module>]
vocabularyDomains: [<domaines lexicaux du module>]
situation: <situation réelle, une phrase>
duration: <durée estimée, ex. "30-35 min">
prerequisites: [<slugs des modules prérequis, liste vide si aucun>]
examLinks: [<lien DELF B1 / TCF IRN, 1 à 2 lignes>]
type: module
```

## Comment créer un nouveau module

1. **Choisir une compétence réelle et une situation concrète.** Repartir de
   `curriculum.md` : chaque module y a déjà une fiche de cadrage (objectif,
   grammaire, vocabulaire, situation, prérequis). Ne pas inventer une
   nouvelle compétence hors de cette liste sans mettre `curriculum.md` à
   jour en conséquence.
2. **Créer le fichier** `content/b1/modules/module-XX-slug.md`, `XX` étant le
   numéro à deux chiffres du module dans `curriculum.md`.
3. **Remplir le front-matter** (voir ci-dessus), en copiant les champs déjà
   définis dans `curriculum.md` pour ce module.
4. **Rédiger le corps du module**, dans cet ordre, avec ces titres exacts
   (`##`) :
   - `A. Objectif`
   - `B. Situation`
   - `C. Vocabulaire` (vocabulaire principal / expressions utiles / verbes
     utiles / connecteurs utiles)
   - `D. Point de langue`
   - `E. Compréhension écrite` (texte original + questions + corrections)
   - `F. Compréhension orale` (voir section dédiée ci-dessous)
   - `G. Exercices` (voir section dédiée ci-dessous)
   - `H. Production écrite` (voir section dédiée ci-dessous)
   - `I. Mini-évaluation` (voir section dédiée ci-dessous)
5. **Relire avec la checklist qualité** (dernière section de ce document)
   avant de considérer le module terminé.

## Comment créer un script audio (section F)

Chaque compréhension orale suit ce gabarit, à l'intérieur du fichier du
module :

```markdown
**Titre** : « ... »
**Situation** : ...
**Personnages** : ...
**Durée approximative** : ...

**Texte intégral**
> **Nom1** — ...
> **Nom2** — ...

**Questions**
1. ...

**Réponses attendues**
1. ...
```

Règles :
- 1 ou 2 personnages maximum, jamais plus (au B1, un dialogue à 3+ voix
  devient difficile à suivre à l'oral).
- Un dialogue naturel : phrases courtes, hésitations légères possibles
  (« en fait », « bon »), pas de phrases de manuel artificielles.
- Débit et longueur adaptés au B1 : 1 à 3 minutes de parole, soit environ
  150 à 220 mots de dialogue.
- Toujours indiquer une durée approximative — utile plus tard pour le
  calibrage de la génération audio.
- **Ne jamais générer le son.** Ce dossier ne contient que des scripts
  textuels ; l'enregistrement/la synthèse est une étape ultérieure, hors
  périmètre de ce chantier.

## Comment créer une activité / un exercice (section G)

Prévoir 5 à 6 exercices par module, en variant les formats parmi :

QCM · vrai/faux · texte à trous · remettre une phrase dans l'ordre ·
associer · choisir le bon mot · conjuguer · comprendre un texte ·
comprendre un audio · trouver l'information · corriger une phrase ·
reformuler · réponse courte.

Règles :
- Ne jamais utiliser deux fois le même format consécutivement dans un
  module.
- Toujours fournir une **correction expliquée**, pas seulement la bonne
  réponse — surtout pour les exercices de grammaire (expliquer *pourquoi*
  la réponse est correcte).
- Les exercices doivent réutiliser le vocabulaire et les exemples déjà
  présentés dans les sections C, D, E et F du même module (pas de mot ou de
  structure jamais vue avant).

## Comment ajouter une production écrite (section H)

Gabarit :

```markdown
**Consigne** : ...
**Longueur recommandée** : ... mots
**Compétences évaluées** : ...
**Éléments attendus**
- ...

**Grille de correction pédagogique**

| Critère | Points |
|---|---|
| ... | / n |
```

Règles :
- La consigne doit toujours partir de la situation réelle du module (B),
  jamais d'un sujet abstrait.
- La longueur recommandée reste courte : entre 60 et 150 mots selon le
  module (viser 10 à 15 minutes de rédaction, voir section 15 de la charte
  du chantier).
- La grille de correction totalise entre 8 et 10 points, avec des critères
  pédagogiques explicites (jamais juste « orthographe » : préciser quoi).
- **Ne jamais reprendre un sujet officiel DELF ou TCF.** On peut s'inspirer
  du type de tâche (raconter, réclamer, donner son avis...), jamais du
  contenu d'une épreuve existante.

## Comment créer les corrections (sections E, F, G, I)

- Une correction n'est jamais une simple liste de réponses : ajouter, pour
  les points de grammaire, une courte explication (« pourquoi ce temps et
  pas un autre », « pourquoi ce pronom »).
- Pour les questions de compréhension, la correction cite si possible la
  phrase du texte/dialogue qui justifie la réponse.
- La mini-évaluation (section I) compte toujours 10 items, mélange
  vocabulaire / grammaire / compréhension / production courte, se termine
  par une ligne **Validation du module** précisant le seuil de réussite
  (7/10 dans les modules pilotes — à ajuster si besoin selon la difficulté
  du module).

## Règles éditoriales (rappel)

1. **Français simple.** Consignes courtes, un verbe d'action clair
   (« Écoute... », « Réponds... », « Choisis... »). Jamais de phrase de
   consigne académique ou administrative.
2. **Contenu 100% original.** Aucun texte, dialogue, question ou sujet ne
   doit être recopié d'un examen (DELF, TCF), d'un livre ou d'une
   plateforme concurrente. On peut s'inspirer des compétences et des
   formats publics des examens, jamais de leur contenu.
3. **Public adulte.** Situations réalistes de vie en France (logement,
   travail, administration, santé...), jamais de dialogues infantilisants
   ou artificiels.
4. **Séances courtes.** Une leçon complète (sections A à I) doit rester
   consommable en 25 à 35 minutes ; si un module dépasse largement cette
   durée, le découper plutôt que le raccourcir en supprimant des sections.
5. **Progression contrôlée.** Une notion grammaticale « introduite » dans un
   module ne doit pas être présentée deux fois comme une nouveauté ailleurs
   — vérifier `grammar/grammar-notions.md` avant d'ajouter une notion à un
   module.
6. **Réemploi du vocabulaire.** Un mot déjà glosé dans un module antérieur
   peut être réutilisé librement sans être re-expliqué — vérifier
   `vocabulary/vocabulary-domains.md`.

## Checklist qualité avant de considérer un module terminé

- [ ] L'objectif est formulé du point de vue de l'apprenant (« tu pourras... »).
- [ ] La situation est réaliste et adulte, pas artificielle.
- [ ] Le vocabulaire (10 à 25 items) est complet : mots, expressions,
      verbes, connecteurs.
- [ ] Le point de langue correspond aux notions listées dans
      `grammar/grammar-notions.md` pour ce module — pas plus.
- [ ] Le texte de compréhension écrite est original, adapté au niveau B1.
- [ ] Le script audio est original, naturel, avec durée et personnages
      précisés.
- [ ] Au moins 5 exercices, avec des formats variés, tous corrigés et
      expliqués.
- [ ] La production écrite part de la situation du module, avec grille de
      correction.
- [ ] La mini-évaluation contient 10 items et un seuil de validation.
- [ ] Aucun contenu (texte, dialogue, sujet) copié d'un examen officiel ou
      d'une source protégée.
- [ ] Le module reste consommable en 25 à 35 minutes.

## Connexion future au moteur pédagogique

Ce dossier ne dépend d'aucune route, composant ou type applicatif — c'est
volontaire, pour ne pas bloquer ce chantier sur le travail parallèle du
chantier 2 (architecture technique / progression) ni du chantier 1
(fondation visuelle). Quand le moteur pédagogique sera prêt à consommer ces
contenus, deux approches sont possibles, sans qu'aucune ne nécessite de
réécrire le contenu :

1. **Lecture directe du Markdown côté serveur** (par ex. avec `gray-matter`
   pour le front-matter + un renderer Markdown/MDX pour le corps), si le
   moteur pédagogique peut afficher du contenu structuré par sections.
2. **Génération d'un export JSON/TS** à partir de ces fichiers Markdown (un
   script de build qui parse le front-matter + découpe le corps sur les
   titres `## A.` à `## I.`), si le chantier 2 a défini un schéma de
   données strict à respecter.

Dans les deux cas, le contrat stable entre ce chantier et le moteur
pédagogique est : **un module = un fichier, un slug unique, neuf sections
identifiées par leur titre `## X.`, un front-matter avec les champs listés
plus haut.** Tant que ce contrat est respecté, le contenu peut continuer à
être enrichi sans casser l'intégration.

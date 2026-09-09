# Protocole de test utilisateur — accueil et premier parcours

Protocole pour 5 à 10 testeurs, destiné à vérifier si un nouvel apprenant
comprend l'offre et arrive à démarrer seul, sans aide. Pas d'outil dédié
requis : partage d'écran + chrono suffisent. Prévoir 15-20 minutes par
personne.

## Profil des testeurs

Recruter un mélange proche des 4 profils visés par le produit (voir
`components/marketing/Goals.tsx`) : une personne étrangère installée en
France, un·e salarié·e, un·e étudiant·e, une personne se préparant à un
examen (DELF/TCF). Éviter les collègues déjà familiers du produit — le
signal recherché est la première impression d'un inconnu.

## Règle d'or : ne rien expliquer

L'animateur·rice ne doit jamais dire "clique ici" ni "va dans le menu".
Donner uniquement la consigne de la tâche, laisser chercher, et noter ce
qui se passe réellement — hésitation, mauvais clic, abandon, ou réussite
directe. Une tâche que le testeur ne termine pas est un résultat valide,
pas un échec de la session.

## Déroulé

Avant de commencer : ouvrir l'accueil (`/`), écran partagé, testeur au
clavier/souris. Poser une seule consigne à la fois, attendre la fin de la
tâche avant la suivante.

### Tâche 1 — Comprendre ce que propose le site

**Consigne donnée :** "Regarde cette page 30 secondes, sans cliquer. Explique-moi ensuite avec tes mots ce que propose ce site, à qui c'est destiné, et ce que tu peux faire gratuitement."

**À observer, pas à expliquer :**
- Le testeur mentionne-t-il spontanément "niveau B1" et "DELF" (ou une préparation d'examen) ?
- Mentionne-t-il qu'il existe quelque chose de gratuit, sans qu'on le lui souffle ?
- Combien de temps avant qu'il formule une réponse claire ? Hésitation = signal de flou sur la promesse.
- Utilise-t-il ses propres mots ou reformule-t-il littéralement une phrase lue à l'écran (signe qu'il n'a pas vraiment compris, juste relu) ?

### Tâche 2 — Trouver un module

**Consigne donnée :** "Trouve un exemple concret de ce que tu apprendrais dans ce parcours."

**À observer :**
- Passe-t-il par le test de niveau, par le lien "module gratuit" du Hero, ou scrolle-t-il jusqu'à la section "Ce que tu sauras faire" ?
- Combien de clics avant d'arriver sur une page de module réelle ?
- Hésite-t-il entre plusieurs sections avant de trouver ?
- Abandon : à quel moment précis ?

### Tâche 3 — Commencer une activité

**Consigne donnée :** "Une fois sur un module, commence n'importe quel exercice."

**À observer :**
- Comprend-il la structure de la page (leçon, puis exercices) sans qu'on lui indique où cliquer ?
- Sait-il distinguer une leçon d'un exercice ?
- Hésite-t-il sur un module verrouillé (badge "Offre complète") — comprend-il pourquoi c'est bloqué, sans confusion avec un bug ?

### Tâche 4 — Utiliser l'audio

**Consigne donnée :** "Trouve un exercice avec de l'audio et écoute-le."

**À observer :**
- Repère-t-il le contrôle audio sans le chercher longtemps ?
- Tente-t-il de réécouter, de mettre en pause ? Le fait-il sans difficulté ?
- Remarque particulière si le testeur utilise un casque/mobile en environnement bruyant — le contrôle reste-t-il utilisable ?

### Tâche 5 — Terminer une leçon

**Consigne donnée :** "Termine cette leçon jusqu'au bout."

**À observer :**
- Comprend-il quand une leçon est "terminée" (retour visuel clair ou confusion) ?
- Revient-il naturellement vers le module ou le parcours après la fin, ou reste-t-il bloqué sur une page sans savoir où aller ?

### Tâche 6 — Reprendre sa progression

**Consigne donnée (nouvelle session, quelques minutes plus tard ou après avoir navigué ailleurs) :** "Retrouve où tu en étais dans ton parcours."

**À observer :**
- Utilise-t-il le CTA principal du header (qui doit l'amener directement à la suite pertinente), ou repart-il de zéro (signe que ce mécanisme n'est pas visible/comprise) ?
- Retrouve-t-il sa progression sans avoir besoin de se souvenir de l'URL exacte du module ?

## Après les 6 tâches — questions ouvertes courtes

Poser au maximum 2-3 questions, jamais plus (éviter la fatigue déclarative) :
1. "Qu'est-ce qui t'a semblé le plus flou ou hésitant pendant ce test ?"
2. "Qu'est-ce qui t'aurait arrêté avant de créer un compte ou de payer ?"

Ne pas suggérer de réponses. Noter les mots exacts utilisés par le testeur.

## Synthèse à produire après les sessions

Pour chaque tâche, sur l'ensemble des testeurs :
- Taux de réussite sans aide.
- Temps médian.
- Point de friction récurrent (le même endroit cité par 2+ testeurs = priorité de correction).

Ne pas corriger sur la base d'un seul retour isolé — chercher la
récurrence avant de modifier le produit.

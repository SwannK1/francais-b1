---
title: Backlog humanisation audio A1/A2/B1
type: audio-backlog
lastUpdated: 2026-09-07
---

# Backlog humanisation audio

Ce document liste ce qu'un futur chantier **"Humanisation audio A1/A2/B1"**
(déjà annoncé comme hors périmètre par
`docs/integration/product-v1.md` § 8) devra traiter. Rien n'est implémenté
ici — audit technique + qualité d'appariement uniquement, comme demandé par
le chantier Final Polish V1.

## Progrès du chantier `audio-humanisation` (mis à jour au fil de l'eau)

Ce chantier a depuis démarré sur `chantier/audio-humanisation` — voir
`docs/audio/humanisation-a1-a2-b1.md` pour l'audit complet et
l'architecture. Pistes de la section "Pistes à humaniser en premier"
(ci-dessous) déjà traitées :

**Lot pilote (3 pistes)** :
- ✅ A1 `a1-presentations-nom-age` (`m02-f1`) — 1ʳᵉ piste du parcours A1
- ✅ A1 `a1-prix-vetements-taille` (`m06-f1`) — situation de vie quotidienne
- ✅ B1 `discuter-avec-un-proprietaire` (`prop-e`) — situation réelle P0, défaut de voix dupliquée corrigé au passage
- ✅ A2 `a2-recit-weekend-entre-amies` — 1ᵉʳ module du stage `a2-fin`

**Deuxième lot (10 pistes)** — voir `humanisation-a1-a2-b1.md` §6 pour le
détail par piste (statut, voix, QA humaine restante) :
- ✅ A1 `a1-famille-presenter-photo` (`m04-f1`), `a1-cafe-commande-simple`
  (`m12-f1`), `a1-quotidien-week-end-activites` (`m16-f1`),
  `a1-directions-demander-son-chemin` (`m10-f1`)
- ✅ A2 `a2-pharmacie-conseil`, `a2-logement-fuite-eau-plombier`,
  `a2-interview-simple-metiers` (3 voix)
- ✅ B1 `decrire-vie-quotidienne` (`quotidien-f`) et `hypothese-et-conseil`
  (`cns-e`) — les 2 derniers défauts de voix dupliquée connus, corrigés ;
  `comprendre-un-courrier-simple` (`courrier-f`)

**Troisième lot (18 pistes)** — voir `humanisation-a1-a2-b1.md` §6.2 pour
le détail par piste :
- ✅ A1 (7) : les 3 pistes `salutations` restantes (`se-presenter`,
  `comment-ca-va`, `au-revoir`, banque d'écoute libre), `a-la-boulangerie`
  et `caisse-supermarche` (situations "boulangerie"/"supermarché"
  explicitement prioritaires), `acheter-billet` et `horaires-magasin`
  (module "préparation examen façon DELF A1")
- ✅ A2 (6) : `a2-rdv-medecin-secretariat`, `a2-logement-appel-agence`
  (stage `a2-debut`), `a2-medecin-suivi-consultation`,
  `a2-appel-service-client-colis` (stage `a2-fin`),
  `a2-travail-nouveau-collegue`, `a2-hotel-reservation-dates` (stage
  `a2-milieu`) — santé, logement, colis/réclamation, emploi, réservation
- ✅ B1 (5) : `prendre-rendez-vous`, `comprendre-une-demarche-administrative`,
  `aller-chez-le-medecin`, `parler-de-son-travail-et-projets`,
  `parler-ecole-enfant` — santé, administration, emploi, école de l'enfant

**Quatrième lot (14 pistes + 1 audit sans régénération)** — voir
`humanisation-a1-a2-b1.md` §6.3 pour le détail par piste :
- ✅ B1 (5, les 5 pistes réellement prioritaires du backlog) :
  `utiliser-les-transports`, `donner-son-opinion`,
  `expliquer-un-probleme-et-demander-une-solution`, `parler-de-ses-projets`,
  `rapporter-les-paroles`
- 🔍 B1 `raconter-un-evenement-passe` **auditée et conservée telle quelle**
  (déjà naturelle — hésitations, reformulations, voix distinctes déjà
  présentes ; non régénérée pour ne pas remplacer un bon audio par
  souci d'uniformité technique, conformément à la consigne de ce lot)
- ✅ A1 (9) : `a1-nombres-numero-telephone`, `a1-transports-bus-horaire`,
  `a1-directions-metro-changement`, `a1-directions-pharmacie-proche`,
  `a1-rdv-annuler-rendez-vous`, `a1-message-absence-bureau`,
  `a1-message-rappel-rdv`, `a1-quotidien-routine-matin`,
  `a1-annonce-recherche-colocataire` — téléphone, transports, horaires,
  directions, rendez-vous, messages vocaux, vie quotidienne, logement

**Total humanisé à ce jour : 58 pistes** (4 + 10 + 18 + 14 + 9 + 1 + 2, ce
dernier "+2" comptant `a1-la-sante` réécrite et la nouvelle piste
`a2-directions-poste-banque`). Les 3 défauts
de voix dupliquée documentés dans `docs/b1/audio-human-recording-plan.md`
§1/§2 restent **tous corrigés** au niveau synthétique
(`discuter-avec-un-proprietaire`, `decrire-vie-quotidienne`,
`hypothese-et-conseil`). Aucun nouveau défaut de ce type détecté depuis
(toutes les paires de locuteurs restantes étaient déjà de genre différent).

Les 5 pistes B1 "réellement prioritaires" identifiées à l'issue du lot
précédent sont maintenant **toutes traitées**. Il ne reste plus de piste
B1 individuelle en attente hors des cas volontairement réservés
ci-dessous.

**Cinquième lot — audit complet du reste du backlog A1 (41 pistes
auditées une à une, voir `humanisation-a1-a2-b1.md` §6.4 pour le détail
piste par piste)** :

- ✅ **9 humanisées** : `a1-presentations-nationalite`,
  `a1-presentations-etudiant`, `a1-meteo-dialogue-sortie`,
  `a1-salutations-bonjour-matin`, `a1-dates-quelle-heure`,
  `a1-rdv-coiffeur`, `a1-nombres-repondeur-numero`,
  `a1-description-physique-ami`, `a1-directions-tout-droit`
- 🟢 **31 conservées telles quelles** (déjà naturelles, ou registre
  intentionnellement factuel/officiel — annonces, petites annonces,
  consignes de classe — où humaniser aurait été moins fidèle au genre
  réel, pas plus) : `a1-presentations-profession` ; les 3 `a1-consigne-*`
  (salle-classe, exercice-ecrit, securite-avion) ; `a1-meteo-aujourdhui`,
  `a1-meteo-semaine` ; les 4 `a1-bilan-*` (message-nouvel-appartement,
  dialogue-agence-voyage, annonce-gare-complete, conversation-nouvelle-vie
  — **prudence accrue respectée**, déjà très bien écrites) ;
  `a1-nombres-code-porte`, `a1-nombres-compter-dix` ; `a1-famille-mamie-papi`,
  `a1-famille-combien-enfants`, `a1-famille-reunion-dimanche` ;
  `a1-description-personnalite`, `a1-description-vetements-aujourdhui` ;
  `a1-cafe-serveur-question`, `a1-cafe-restaurant-menu` ;
  `a1-annonce-appartement-a-louer`, `a1-annonce-objet-a-vendre` ;
  `a1-quotidien-loisirs-preferes`, `a1-quotidien-sport`,
  `a1-quotidien-recit-samedi` ; `a1-rdv-rejoindre-un-ami` ;
  `a1-message-ami-retard`, `a1-message-invitation-anniversaire` ;
  `m11-f1`/annonce-quai (transports) ; `a1-dates-anniversaire`,
  `a1-dates-jours-semaine` ; `m14-f1`/au-marche (prix-achats)
- 🔒 **1 réservée** (déjà connue) : `a1-la-sante` (mismatch thématique,
  voir cas réservés)

**Backlog A1 réellement restant après ce lot : 0 piste non auditée.**
Chaque piste A1 de la bibliothèque a maintenant été soit humanisée, soit
auditée et jugée déjà satisfaisante, soit explicitement réservée. L'A1
est considéré comme terminé au niveau du chantier `audio-humanisation` ;
seule `a1-la-sante` reste en attente d'un futur ré-enregistrement humain
combiné (hors périmètre ici).

**Sixième lot — clôture du chantier : les 4 `bilan-a2-*`, le mismatch
`ville-o`, et confirmation de `a1-la-sante`** (voir
`humanisation-a1-a2-b1.md` §6.5 pour le détail complet) :

- Les 4 pistes de l'évaluation finale A2 (`bilan-a2-comprehension-orale`,
  25 min, 12 points, seuil de réussite 8) ont été auditées une à une avec
  la prudence demandée (transcript ↔ question ↔ bonne réponse ↔ scoring
  vérifiés pour chacune, aucune citation exacte de correction touchée) :
  - 🟢 **3 conservées telles quelles**, déjà excellentes :
    `bilan-a2-annonce-aeroport`, `bilan-a2-repondeur-coiffeur`,
    `bilan-a2-dialogue-patinoire` (cette dernière contient déjà une vraie
    hésitation naturelle : « Euh, je ne sais pas trop... »)
  - ✅ **1 humanisée** : `bilan-a2-recit-journee-chronologie` — seule
    piste du lot déjà identifiée dans l'audit initial de ce chantier
    comme trop "manuel" ("d'abord... puis... l'après-midi... enfin...").
    Connecteurs variés, **chaque citation exacte utilisée par les 3
    corrections préservée mot pour mot**. Aucune réponse, aucun barème,
    aucune fuite modifiés.
  - Confirmé : aucun composant `"use client"` n'importe le manifest A2
    (test dédié déjà existant, toujours vert) — ces 4 documents ne sont
    de toute façon **pas encore raccordés à une page live** (uniquement
    manifest + tests + scripts de génération), donc aucun risque de fuite
    côté produit à ce jour.
**Septième lot — résolution effective de `a1-la-sante` et `ville-o`**
(voir `humanisation-a1-a2-b1.md` §6.6 pour le détail complet) : les deux
derniers cas "réservés" ont finalement été **corrigés avec le pipeline
existant**, pas laissés en réserve — un nouvel audit plus approfondi a
montré qu'aucun des deux ne nécessitait réellement une voix humaine :

- ✅ **`a1-la-sante` (m18-f1) — RÉSOLU.** Cause exacte : l'exercice
  utilisait une piste "prise de rendez-vous" (jour/heure uniquement) alors
  que le module enseigne "avoir mal à + partie du corps" et l'impératif
  de conseil médical — et le champ `situation` du module décrivait déjà
  la scène attendue ("À la pharmacie, Chloé... a mal à la tête... demande
  conseil"), jamais exploitée. Script entièrement réécrit (Chloé/
  Pharmacien, `say`, pipeline A1 standard), 2 questions désormais
  vérifiables à l'écoute (douleur + conseil), fichier régénéré
  (`prendre-rendez-vous-medecin.m4a`, même chemin, aucun orphelin créé).
- ✅ **`ville-o` — RÉSOLU.** Cause exacte confirmée : aucune des 30 pistes
  A2 existantes ne couvre "indications en ville" (vérifié par recherche
  textuelle complète, pas seulement par thème déclaré) — vrai trou de
  contenu, pas un problème de mapping réparable par un simple repointage.
  Nouvelle piste `a2-directions-poste-banque` écrite et générée
  (pipeline A2 standard, stage `a2-debut`, thème `vie_quotidienne` —
  aucun thème "ville" n'existe dans le type `A2Theme`, fermé à 15
  valeurs). `ville-o` repointé vers cette nouvelle piste.
  - **Effet de bord découvert et corrigé** : l'ancienne piste
    `a2-annonce-gare-perturbation.m4a` (bien écrite, thème "transports"
    correct) n'était en réalité référencée par **aucun autre exercice
    live** — seul le mismatch `ville-o` la maintenait hors de la liste
    des pistes orphelines (`integration-a1-a2-b1.test.ts`). Plutôt que de
    la laisser devenir orpheline, elle reçoit désormais son propre
    exercice dans la banque d'écoute A2 (`modules-a2-banque-ecoute.ts`,
    nouvelle section "Écoute libre : transports") — aucune piste perdue,
    aucun contenu jeté.

**Aucun des deux cas ne nécessite donc plus une voix humaine/neuronale
pour être exploitable pédagogiquement.** Les deux restent, comme toute la
bibliothèque, en voix de synthèse `say` — leur statut n'était jamais "la
synthèse ne suffit pas", mais "le contenu assigné était le mauvais".

Le chantier `audio-humanisation` est maintenant **entièrement clos** :
plus aucun cas de contenu identifié comme problématique. Reste, hors
périmètre (jamais un manque de correction, un choix délibéré) : les
examens/DELF, volontairement jamais touchés (voir encadré DELF de
`audio-style-guide.md` §3) ; l'ensemble du pack d'enregistrement humain
B1 (`docs/b1/audio-human-recording-plan.md`), toujours en attente d'un
studio/locuteurs réels pour remplacer la synthèse par de vraies voix.

## État technique constaté (rassurant)

Audit complet des références `audioSrc` (A1, A2, B1, examens, évaluations)
contre `public/audio/**` :

- **Aucun fichier audio 404 / manquant.** Toutes les références réelles
  (hors placeholders `human/*.m4a` intentionnels et fixtures de test)
  pointent vers un fichier qui existe.
- **Aucune piste orpheline** dans `public/audio/**`.
- **Aucun exercice `comprehension_orale` sans `audioSrc`.**
- Transcript ↔ piste : cohérent partout où vérifié (le transcript déclaré
  correspond au contenu réellement synthétisé).

Couverture des tests existants :

| Test | Couvre |
|---|---|
| `lib/pedagogy/data/content-integrity.test.ts` | B1 : existence disque de chaque piste référencée |
| `lib/pedagogy/audio/a2/__tests__/a2-content-integrity.test.ts` | A2 : existence disque, mais seulement pour les pistes du manifeste `AUDIO_TRACKS_A2_ALL` (recoupe largement les pistes utilisées par les modules) |
| `lib/pedagogy/data/a1/content-integrity-a1.test.ts` | A1 : **ne vérifie pas** l'existence disque (délégué explicitement à un chantier "a1-audio" séparé, documenté en tête de fichier) — les fichiers existent aujourd'hui, mais rien n'empêche une régression silencieuse si un futur commit renomme/supprime un fichier A1 sans toucher ce test |
| `lib/pedagogy/data/content-integrity-a2.test.ts` | A2 (niveau module) : même limitation que ci-dessus, documentée comme volontaire |

**Recommandation technique (hors périmètre d'implémentation ici)** :
étendre `content-integrity-a1.test.ts` et `content-integrity-a2.test.ts`
avec la même vérification `existsUnderPublic` que la version B1, pour fermer
ce trou de couverture avant qu'un renommage de fichier ne passe inaperçu.

## Appariements thématiques à revoir

### Priorité haute

1. **A2 — "Se repérer en ville" (`a2-se-reperer-en-ville`,
   `lib/pedagogy/data/modules-a2-part1.ts`)** : l'exercice d'écoute
   `ville-o` utilise `audioSrc: /audio/a2/a2-annonce-gare-perturbation.m4a`
   — une annonce de perturbation/annulation en gare, sans aucun rapport
   avec le thème du module (demander/comprendre un itinéraire en ville,
   poste/banque/mairie). Mauvais appariement confirmé, pas seulement
   "approximatif" — la piste ne correspond à aucun contenu du module.
   **À refaire en priorité** : dialogue de demande d'itinéraire en ville
   (ex. "pour aller à la poste, s'il vous plaît ?").

### Priorité moyenne

2. **A1 — "La santé" (`a1-la-sante`,
   `lib/pedagogy/data/a1/modules/quotidien-et-loisirs.ts`)** : le module
   couvre les parties du corps, la douleur, les conseils médicaux
   ("mal à la tête", "médicament", "conseil"), mais son seul exercice
   d'écoute (`m18-f1`) se limite à la prise de rendez-vous chez le médecin
   (heure, jour) — thème adjacent (santé) mais qui ne touche jamais le
   vocabulaire réellement enseigné par le module. Moins grave que #1 (même
   domaine général), mais toujours un appariement faible.

Ces deux cas correspondent exactement aux limitations déjà signalées comme
connues par `docs/integration/a1-a2-b1-integration.md` § 5 ("A1 santé",
"A2 indications de rue") — confirmées, précisées avec l'exercice exact
concerné, pas de nouvelle régression trouvée au-delà de ces deux-là.

## Dialogues à deux voix

Aucun audio actuel n'est un vrai dialogue à deux voix distinctes — toutes
les pistes sont une seule voix synthétique (narration, annonce, message
répondeur, ou question isolée). Candidats naturels pour une future version
dialoguée (conversation réelle, pas un monologue qui simule un échange) :

- A1 : `salutations` (se présenter), `rendez-vous` (prendre/annuler un RDV),
  `cafe-restaurant` (commande, addition)
- A2 : les modules `a2-logement`, `a2-medecin`, `a2-restaurant` (déjà des
  scénarios d'échange, actuellement portés par une seule voix qui joue les
  deux rôles en alternance dans le texte)
- B1 : `discuter-avec-un-proprietaire`, `expliquer-un-probleme-et-demander-une-solution`

## Débits trop artificiels

Non audité piste par piste ici (jugement d'écoute humaine nécessaire, hors
périmètre d'un audit technique/structurel). **À faire par un humain avant le
chantier d'humanisation** : écoute d'échantillon représentatif par niveau
(3-4 pistes A1, A2, B1) pour prioriser les domaines où le débit synthétique
nuit le plus à la compréhension (probablement les pistes les plus longues :
`bilan-*`, `recit-*`, `raconter-un-evenement-passe`).

## Pistes à humaniser en premier (A1/A2/B1)

Par ordre de priorité produit (pistes les plus fréquemment entendues par un
nouvel apprenant, donc celles où une voix humaine a le plus d'impact
perçu) :

1. Pistes de `bilan`/`preparation-examen` par niveau (dernière impression
   avant l'évaluation de fin de niveau)
2. Pistes des tout premiers modules de chaque niveau (`a1-decouverte`,
   `a2-debut`, `b1-debut`) — première impression audio du produit
3. Les deux appariements faibles ci-dessus (santé A1, ville A2), à corriger
   en même temps que leur ré-enregistrement humain plutôt qu'en deux passes

## Variantes futures (hors périmètre V1)

- **Variante "apprentissage"** : débit ralenti, articulation appuyée,
  pauses marquées entre groupes de sens — pour la première écoute.
- **Variante "situation réelle"** : débit naturel, hésitations légères,
  bruit de fond minimal — pour l'entraînement à la compréhension en
  conditions réelles, probablement proposée en second temps une fois un
  module maîtrisé.

Ces deux variantes ne remplacent pas l'audio actuel dans ce backlog : elles
s'ajouteraient en complément, une fois l'enregistrement humain de base
disponible (voir `docs/b1/audio-human-recording-plan.md`, déjà préparé pour
le B1, à étendre à A1/A2 par ce futur chantier).

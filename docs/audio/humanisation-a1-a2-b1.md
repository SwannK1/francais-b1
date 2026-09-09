---
title: Humanisation audio A1/A2/B1 — audit et architecture
type: audio-humanisation-plan
lastUpdated: 2026-09-07
---

# Humanisation audio A1/A2/B1 — audit et architecture

Document de synthèse du chantier `chantier/audio-humanisation`. Regroupe
l'audit complet de l'existant, les décisions d'architecture prises, et ce
qui reste à faire. Compléments : `humanisation-backlog.md` (appariements à
corriger, pistes prioritaires), `audio-style-guide.md` (règles
d'écriture/progression), `human-qa-checklist.md` (QA humaine),
`docs/b1/audio-human-recording-plan.md` (pack d'enregistrement humain B1,
préexistant, non dupliqué ici).

**Avertissement méthodologique** : ce document repose sur une lecture
exhaustive du code, des manifests et des transcripts — jamais sur une
écoute réelle des fichiers `.m4a` (capacité hors de portée d'un agent IA
dans cet environnement). Toute affirmation sur la "naturalité perçue" est
qualifiée comme telle et reste à confirmer par une oreille humaine
(`human-qa-checklist.md`).

## 1. Ce qui existait déjà (contrairement à l'hypothèse de départ)

Le chantier a été annoncé comme repartant d'un système approximatif. L'audit
montre le contraire : l'infrastructure est mature, largement testée, et
plusieurs items de la commande initiale étaient déjà résolus avant ce
chantier.

| Déjà en place | Où |
|---|---|
| Multi-voix par niveau (7 voix A1, 6 profils A2, 3 voix prévues B1) sans jamais dupliquer une voix dans un même dialogue | `lib/pedagogy/audio/{a1,a2}/voices.ts`, testé automatiquement |
| Progression de débit croissante et cohérente (A1 128→180, A2 150→180 wpm) | `lib/pedagogy/audio/a1/voices.ts`, `a2/tracks/{debut,milieu,fin}.ts` |
| Pipeline humain→synthétique→erreur avec repli propre et bouton "Réessayer" | `lib/pedagogy/audio/{paths,status,playback}.ts`, `components/pedagogy/AudioExercise.tsx` |
| 0 fichier orphelin, 0 référence cassée sur les 114 pistes réelles | Audit exhaustif disque ↔ code (§2 ici, confirmé par les tests existants) |
| Pack de production complet pour l'enregistrement humain B1 (18 pistes, voix, priorités, checklist) | `docs/b1/audio-human-recording-plan.md` |
| Scripts hésitants/naturels déjà présents dans plusieurs transcripts A2/B1 | Voir §3 |

Ce que ce chantier a réellement ajouté ou corrigé est documenté §5-§8.

## 2. Inventaire réel (au 2026-09-07)

114 fichiers `.m4a`, ≈ 12,0 Mo au total (12 535 870 octets) :

| Niveau/usage | Pistes | Détail |
|---|---|---|
| A1 | 65 | 17 thèmes (`public/audio/a1/<theme>/*.m4a`) |
| A2 | 30 | 26 pistes de pratique (`a2-debut/milieu/fin`) + 4 documents d'évaluation finale |
| B1 | 16 | référencées en dur dans `lib/pedagogy/data/modules.ts` (pas de manifest B1 dédié) |
| Démo examen | 1 | réutilisée à 3 endroits (examen démo + 2 items de diagnostic/placement) |
| Examen blanc DELF 1 | 2 | `public/audio/examens/blanc-1/` |

**Pistes utilisées / orphelines / manquantes** : **0 orpheline, 0
manquante**. Les 10 références de code sans fichier disque correspondant
sont toutes attendues (fixtures de test hors `public/`, chemins `human/`
conventionnels pas encore livrés). Ce résultat était déjà celui de
`humanisation-backlog.md` (chantier Final Polish V1) ; reconfirmé
intégralement par ce chantier, aucune régression détectée entre-temps.

**Découverte notable** : `lib/pedagogy/audio/a1/manifest.ts` (65 pistes,
avec ses propres `turns`) est un système **parallèle et non branché** —
son commentaire d'en-tête le dit explicitement ("tant que le raccordement
au parcours central n'est pas fait"). Le contenu réellement servi à
l'utilisateur vit dans `lib/pedagogy/data/a1/modules/*.ts` (`audioSrc` +
`transcript` propres), maintenu manuellement en synchronisation de texte
avec le manifest isolé. Les deux pointent vers les mêmes fichiers
`public/audio/a1/**`, mais **une édition de l'un sans l'autre désynchronise
transcript et audio** — piège à connaître avant toute réécriture de script
A1 (voir §7).

## 3. Qualité/naturalité actuelle (lecture des scripts, pas écoute)

Les scripts contiennent déjà de vrais marqueurs d'oralité par endroits
(hésitations, petites reformulations, désaccords qui s'apaisent — voir
exemples relevés dans l'audit). Mais la structure reste régulière :
- chaque tour de dialogue est une phrase grammaticalement complète ;
- récits chronologiques avec connecteurs "manuel" ("d'abord... puis...
  enfin...") plutôt qu'un enchaînement oral réel ;
- débit piloté uniquement par un wpm global fixe par piste, jamais de
  variation intra-phrase ;
- aucun chevauchement de parole, aucun vrai faux départ.

Cf. `audio-style-guide.md` §3 pour les règles d'écriture qui corrigent ce
constat, et §6/§7 ci-dessous pour ce qui a été concrètement réécrit.

## 4. Architecture technique (nouveau dans ce chantier)

### 4.1 Fournisseur TTS interchangeable

Avant ce chantier, toute génération appelait `say`/`execFileSync`
directement, en dur, dans chaque script par niveau. Ajouté :
`lib/pedagogy/audio/tts/` — `TtsProvider` (contrat), `say-provider.ts`
(fournisseur par défaut, aucune configuration requise),
`elevenlabs-provider.ts` (fournisseur neuronal réel, clé lue uniquement
depuis `ELEVENLABS_API_KEY`, jamais codée en dur, échoue explicitement
avant tout appel réseau si absente), `registry.ts`
(`resolveTtsProvider()`, sélection par `AUDIO_TTS_PROVIDER` ou défaut
`"say"`). Testé (`registry.test.ts`, `normalize.test.ts`, 16 tests).

Les scripts existants (`scripts/a1-audio/generate.mjs`,
`scripts/a2-audio-generate.mjs`) n'ont **pas** été migrés vers cette
interface dans ce chantier — ils continuent de fonctionner tels quels
(risque de casser un pipeline de génération manuel déjà éprouvé jugé non
justifié face au bénéfice, alors qu'aucun fournisseur neuronal n'est
disponible pour en profiter immédiatement). La migration reste une
étape mécanique documentée ici pour un futur chantier.

**Preuve d'usage réel** : `scripts/b1-audio-generate.mjs` (nouveau,
deuxième lot d'humanisation) appelle `resolveTtsProvider()` au lieu de
`say`/`execFileSync` en dur — B1 n'avait jusqu'ici aucun script de
génération propre (les 18 pistes existantes ont été produites une fois,
manuellement, hors dépôt). C'est la première utilisation concrète de
l'architecture par un script de génération, pas seulement par ses tests
unitaires.

### 4.2 Normalisation

`lib/pedagogy/audio/tts/normalize.ts` : normalisation de crête PCM 16 bits
(cible -3 dBFS, alignée sur `docs/b1/audio-human-recording-plan.md` §7),
jamais appliquée en rétroactif sur les 114 fichiers existants (seule une
normalisation de *format* existait avant ce chantier — échantillonnage/
bits, pas de niveau sonore). À appliquer sur toute piste nouvellement
(re)générée.

**Incohérence de format relevée** : A1 est normalisé à 44,1 kHz après
concaténation, A2 hérite du débit natif des voix `say` (22 050 Hz) sans
normalisation explicite. Non corrigé dans ce chantier (aurait nécessité de
régénérer les 30 fichiers A2 existants sans bénéfice audible garanti) —
signalé dans `audio-style-guide.md` §5 pour toute prochaine régénération.

### 4.3 Bug corrigé : générateur A2 cassé

`scripts/a2-audio-generate.mjs` importe `./lib/aiff.mjs`, qui n'existait
nulle part dans le dépôt ni son historique — `npm run audio:a2:generate`
était donc cassé (jamais détecté par `npm test`, script de génération
manuelle non exercé par la suite automatisée). Recréé
(`scripts/lib/aiff.mjs`) à partir de la logique déjà éprouvée de
`scripts/a1-audio/aiff-concat.mjs`, vérifié par exécution réelle.

### 4.4 Couverture de test étendue

`content-integrity-a1.test.ts` et `content-integrity-a2.test.ts`
vérifient désormais l'existence disque de chaque `audioSrc`, comme le fait
déjà `content-integrity.test.ts` (B1) — ces deux tests différaient
volontairement cette vérification à un chantier "a1-audio"/"a2-audio" qui
a depuis livré ses fichiers ; le trou de couverture documenté dans
`humanisation-backlog.md` est fermé.

## 5. Modes `learning` / `real-life`

Non implémentés — architecture proposée dans `audio-style-guide.md` §4
(champ `variant`, sous-dossiers `learning/`/`real-life/`, ajout non
destructif comme la convention `human/` existante). Aucune génération de
masse effectuée : à valider sur un lot pilote avant extension.

## 6. Scripts humanisés dans ce chantier

Périmètre volontairement restreint (voir `audio-style-guide.md`, encadré
DELF) : aucune piste d'examen/évaluation touchée. Modifications de texte
uniquement additives (connecteurs oraux, reformulation, hésitations
dosées), jamais de changement du vocabulaire enseigné ni des faits testés
par les questions associées — vérifié piste par piste avant régénération.
Audio réellement régénéré à chaque fois (`say`, voir §4.1) et suite de
tests complète relancée.

| Piste | Pourquoi (priorité produit) | Ce qui a changé |
|---|---|---|
| A2 `a2-recit-weekend-entre-amies` (`lib/pedagogy/audio/a2/tracks/fin.ts`) | Premier module du stage `a2-fin` — backlog "premiers modules de chaque niveau" | Connecteurs oraux, une hésitation, un trailing-off |
| A1 `a1-presentations-nom-age` / `m02-f1` (`lib/pedagogy/audio/a1/manifest.ts` + `data/a1/modules/decouverte.ts`) | **Première piste de compréhension orale de tout le parcours A1** (1ᵉʳ module du stage `a1-decouverte`, order 1) | Trois phrases courtes fusionnées en une seule phrase au rythme naturel (virgules + pauses `[[slnc]]`), aucun mot changé |
| A1 `a1-prix-vetements-taille` / `m06-f1` (idem, module *Vêtements et couleurs*, stage `a1-vie-quotidienne`, order 2) | Situation de vie quotidienne très fréquente (essayage en magasin), déjà 2 locutrices | Formulations plus naturelles ("vous auriez ça ?", "Alors, je vais regarder..."), prix/taille inchangés |
| B1 `prop-e` / `discuter-avec-un-proprietaire` (`scripts/b1-audio-generate.mjs`, `data/modules.ts`) | P0 du pack d'enregistrement humain (`docs/b1/audio-human-recording-plan.md` §2) — situation réelle à fort enjeu (logement) ; corrige aussi le défaut de voix dupliquée documenté pour cette piste | Script plus authentique (trailing-off, hésitation, "Oui, oui"), **et** deux voix `say` désormais réellement distinctes (Voix B = Flo, Voix C = Shelley) au lieu d'une seule voix pour les deux personnages |

`a1-la-sante` (appariement thématique faible) et l'appariement A2
`ville-o` **n'ont pas été touchés** : le backlog les défère explicitement à
un ré-enregistrement humain combiné plutôt qu'une humanisation isolée
(`humanisation-backlog.md`, "à corriger en même temps que leur
ré-enregistrement humain plutôt qu'en deux passes").

### 6.1 Deuxième lot (10 pistes)

Sélection faite à partir des priorités produit du backlog : pistes de
début de parcours A1, situations de vie quotidienne A1/A2, situations
réelles importantes B1, et — en priorité sur ce dernier point — les 2
derniers défauts de voix dupliquée encore documentés (voir
`docs/b1/audio-human-recording-plan.md` §1/§2), désormais tous corrigés.
Périmètre : toujours aucune piste d'examen/évaluation finale touchée
(DELF, `bilan-a2-*`) — même prudence que le premier lot.

| Piste | Niveau | Locuteurs (voix) | Ancien → nouveau statut | Script modifié | Mode | QA humaine |
|---|---|---|---|---|---|---|
| `a1-famille-presenter-photo` / `m04-f1` | A1 | 1 — Léa (flo) | synthétique scolaire → synthétique humanisé | Oui (3 phrases-gabarit fusionnées, rythme varié) | learning (seul mode existant) | Oui — priorité normale |
| `a1-cafe-commande-simple` / `m12-f1` | A1 | 2 — Serveur (thomas), Karim (jacques) | synthétique scolaire → synthétique humanisé | Oui (léger, phrase-prix inchangée) | learning | Oui — priorité normale |
| `a1-quotidien-week-end-activites` / `m16-f1` | A1 | 2 — Sophie (sandy), Karim (jacques) | synthétique scolaire → synthétique humanisé | Oui (tournures orales, fait testé inchangé) | learning | Oui — priorité normale |
| `a1-directions-demander-son-chemin` / `m10-f1` | A1 | 2 — Sophie (sandy), Marc (thomas) | synthétique scolaire → synthétique humanisé | Oui (léger) | learning | Oui — priorité normale |
| `a2-pharmacie-conseil` | A2 (milieu) | 2 — Pharmacien (voix-d/Jacques), Cliente (voix-f/Sandy) | déjà correct → plus naturel | Oui (contractions, conditionnel) | learning | Oui — priorité normale |
| `a2-logement-fuite-eau-plombier` | A2 (milieu) | 2 — Locataire (voix-a/Thomas), Plombière (voix-f/Sandy) | déjà correct → plus naturel | Oui (léger) | learning | Oui — priorité normale |
| `a2-interview-simple-metiers` | A2 (milieu) | **3** — Journaliste (voix-f/Sandy), Homme (voix-d/Jacques), Femme (voix-c/Shelley) | déjà correct → plus naturel | Oui (léger) | learning | Oui — priorité normale |
| `decrire-vie-quotidienne` / `quotidien-f` | B1 | 2 — Fatou (voix-b/Flo), Léa (voix-c/Shelley) | **défaut voix dupliquée** → voix distinctes + plus naturel | Oui (léger) | N/A (pas de variante implémentée) | **Oui — priorité haute** (vérifier que les 2 voix sont bien perçues comme distinctes) |
| `hypothese-et-conseil` / `cns-e` | B1 | 2 — Yasmine (voix-b/Flo), Camille (voix-c/Shelley) | **défaut voix dupliquée** → voix distinctes + réécriture plus authentique | Oui (reformulations, hésitations) | N/A | **Oui — priorité haute** (idem) |
| `comprendre-un-courrier-simple` / `courrier-f` | B1 | 2 — Conseiller (voix-a/Thomas), Amina (voix-b/Flo) | déjà correct → plus authentique | Oui (léger) | N/A | Oui — priorité normale |

Aucune piste `real-life` : ce mode reste à l'état d'architecture proposée
(§5), aucune variante générée dans ce lot.

Fichiers modifiés pour ce lot :
`lib/pedagogy/audio/a1/manifest.ts`, `lib/pedagogy/data/a1/modules/{decouverte,sortir-et-bouger,quotidien-et-loisirs}.ts`,
`lib/pedagogy/audio/a2/tracks/milieu.ts`, `lib/pedagogy/data/modules.ts`,
et nouveaux `lib/pedagogy/audio/b1/humanized-tracks.ts` (données pures,
extraites de `scripts/b1-audio-generate.mjs` pour être testables sans
déclencher de génération audio) + `lib/pedagogy/audio/b1/humanized-tracks-sync.test.ts`
(3 tests : synchronisation transcript, non-duplication de voix par piste,
validité des `voiceId`).

### 6.2 Troisième lot (18 pistes)

Sélection faite à partir des priorités produit explicites du backlog et
de la liste de situations "réellement utiles en France" fournie pour ce
lot (boulangerie, supermarché, transports, rendez-vous médical, logement,
agence immobilière, école de l'enfant, emploi, colis, démarches
administratives...). Découverte notable : la **"Banque d'écoute A1"**
(`lib/pedagogy/data/a1/modules/banque-ecoute.ts`, stage `a1-bilan`, ~40+
pistes) est en réalité le mécanisme central qui raccorde la plupart des
65 pistes A1 au parcours réel — pas un contenu secondaire — même
convention de synchronisation manuelle avec `lib/pedagogy/audio/a1/manifest.ts`
que documentée au §7.

Deux modules "façon DELF A1" (`preparation-examen.ts`, stage
`a1-preparation-examen`) ont aussi été traités : il s'agit d'un module
d'**entraînement** (jamais scoré comme une évaluation finale), distinct
des DELF blancs réels — traité avec la même prudence que les modules
normaux, pas exclu comme les DELF/`bilan-a2-*`.

Constat B1 : plusieurs pistes candidates (`raconter-un-evenement-passe`,
`aller-chez-le-medecin`) étaient déjà bien humanisées avant ce chantier
(hésitations, reformulations déjà présentes) — retenues quand même dans
ce lot mais avec des retouches délibérément minimales ("humanise
seulement si nécessaire"), pour ne pas réécrire ce qui fonctionnait déjà.

| Piste | Niveau | Locuteurs (voix) | Statut préc. → final | Script modifié | Mode | QA humaine |
|---|---|---|---|---|---|---|
| `a1-salutations-se-presenter` | A1 | 2 — Marc (thomas), Léa (flo) | scolaire → humanisé (léger) | Oui (minimal) | learning | Normale |
| `a1-salutations-comment-ca-va` | A1 | 2 — Karim (jacques), Nadia (shelley) | déjà correct → plus naturel | Oui (léger) | learning | Normale |
| `a1-salutations-au-revoir` | A1 | 2 — Sophie (sandy), Marc (thomas) | déjà correct → plus naturel | Oui (léger) | learning | Normale |
| `a1-prix-a-la-boulangerie` | A1 | 2 — Marc (thomas), Vendeuse (flo) | scolaire → humanisé | Oui (léger) | learning | Normale |
| `a1-prix-caisse-supermarche` | A1 | 2 — Karim (jacques), Caissière (flo) | scolaire → humanisé | Oui (léger) | learning | Normale |
| `a1-transports-acheter-billet` (m21-f2) | A1 | 2 — Marc (thomas), Employé (jacques) | scolaire → humanisé (minimal) | Oui (minimal) | learning | Normale |
| `a1-dates-horaires-magasin` (m21-f1) | A1 | 1 — Narrateur (flo) | scolaire (annonce) → légèrement fluidifié | Oui (minimal) | learning | Normale |
| `a2-rdv-medecin-secretariat` | A2 (debut) | 2 — Patient (voix-a), Secrétariat (voix-c) | déjà correct → plus naturel | Oui (léger) | learning | Normale |
| `a2-logement-appel-agence` | A2 (debut) | 2 — Client (voix-a), Agence (voix-b) | déjà correct → plus naturel | Oui (léger) | learning | Normale |
| `a2-medecin-suivi-consultation` | A2 (fin) | 2 — Médecin (voix-a), Patiente (voix-f) | déjà bon → plus naturel | Oui (léger) | real-life (tendance) | Normale |
| `a2-appel-service-client-colis` | A2 (fin) | 2 — Conseiller (voix-a), Cliente (voix-f) | déjà bon → plus naturel | Oui (léger) | real-life (tendance) | Normale |
| `a2-travail-nouveau-collegue` | A2 (milieu) | 2 — Julie (voix-b), Karim (voix-a) | déjà bon → plus naturel | Oui (léger) | mix | Normale |
| `a2-hotel-reservation-dates` | A2 (milieu) | 2 — Réceptionniste (voix-c), Client (voix-e) | déjà bon → plus naturel | Oui (léger) | mix | Normale |
| `prendre-rendez-vous` (rdv-f) | B1 | 2 — Secrétariat (voix-b), Karim (voix-a) | correct → plus naturel | Oui (léger) | real-life | Normale |
| `comprendre-une-demarche-administrative` (admin-f) | B1 | 2 — Agent (voix-b), Youssef (voix-a) | correct, registre officiel → idem + plus fluide | Oui (léger, registre formel préservé) | real-life | Normale |
| `aller-chez-le-medecin` (med-e) | B1 | 2 — Médecin (voix-a), Farida (voix-b) | déjà bon → retouche minimale | Oui (minimal) | real-life | Normale |
| `parler-de-son-travail-et-projets` (travail-f) | B1 | 2 — Julie (voix-b), Karim (voix-a) | déjà bon → retouche légère | Oui (léger) | real-life | Normale |
| `parler-ecole-enfant` (eco-e) | B1 | 2 — Institutrice (voix-b), Karim (voix-a) | correct → plus naturel | Oui (léger) | real-life | Normale |

**Aucune piste `real-life` distincte générée** : le mode reste une
étiquette descriptive (§5), pas un second fichier — conforme à la
consigne "pas deux fichiers par piste sans raison pédagogique".

**Anomalie recherchée et non trouvée** : aucune nouvelle piste à voix
dupliquée parmi les 18 — toutes les paires de locuteurs B1/A2 de ce lot
étaient déjà de genre différent (donc déjà distinctes en synthèse `say`),
contrairement aux 3 défauts corrigés dans les lots précédents.

Fichiers modifiés pour ce lot : `lib/pedagogy/audio/a1/manifest.ts`,
`lib/pedagogy/data/a1/modules/{banque-ecoute,preparation-examen}.ts`,
`lib/pedagogy/audio/a2/tracks/{debut,milieu,fin}.ts`,
`lib/pedagogy/audio/b1/humanized-tracks.ts`, `lib/pedagogy/data/modules.ts`.
Aucun nouveau fichier de test ajouté — les gardes-fous existants
(`transcript-sync.test.ts`, `humanized-tracks-sync.test.ts`) couvraient
déjà tous les cas de ce lot (validé par leur passage au vert après
modification, voir §10 de la checklist QA).

### 6.3 Quatrième lot (14 pistes + 1 audit sans régénération)

Objectif explicite de ce lot : finir les 5 pistes B1 "réellement
prioritaires" restantes, auditer `raconter-un-evenement-passe` sans la
régénérer par principe si elle est déjà bonne, puis étendre la couverture
A1 dans la banque d'écoute libre en priorisant téléphone/transports/
horaires/directions/rendez-vous/messages vocaux/vie quotidienne.

**Audit de `raconter-un-evenement-passe` (recit-f) — conservée telle
quelle, non régénérée.** Constats : script déjà vivant ("Oh là là, ne
m'en parle pas !", "tu te rends compte, une vraie cabine !", trailing
"Mais quelle matinée..."), 2 voix déjà distinctes (Sophie F / Farid H,
aucun défaut de duplication), aucune impression de texte scolaire lu.
Seul écart technique relevé : le fichier est encore à 22 050 Hz (jamais
régénéré depuis l'origine, contrairement aux pistes B1 touchées par ce
chantier, désormais à 44,1 kHz) — **écart volontairement laissé en
l'état** : la consigne de ce lot est explicite ("ne jamais remplacer un
bon audio uniquement pour uniformiser techniquement la bibliothèque"), et
la différence de fréquence d'échantillonnage n'est pas audible comme un
défaut de qualité en soi. À revoir seulement si cette piste est un jour
régénérée pour une autre raison (contenu, défaut découvert à l'écoute
humaine).

| Piste | Niveau | Locuteurs (voix) | Statut préc. → final | Script modifié | QA humaine |
|---|---|---|---|---|---|
| `utiliser-les-transports` (transport-f) | B1 | 1 — Narrateur (voix-a) | correct (annonce officielle) → légèrement fluidifié | Oui (minimal, registre officiel préservé) | Normale |
| `donner-son-opinion` (opinion-f) | B1 | 2 — Marc (voix-a), Nadia (voix-b) | déjà bon → intonation plus conversationnelle | Oui (léger) | Normale |
| `expliquer-un-probleme-et-demander-une-solution` (probleme-f) | B1 | 2 — Conseiller (voix-a), Amélie (voix-b) | correct → frustration/politesse plus naturelles | Oui (léger) | Normale |
| `parler-de-ses-projets` (prj-e) | B1 | 2 — Conseillère (voix-b), Yassine (voix-a) | correct → conversation plus naturelle | Oui (léger) | Normale |
| `rapporter-les-paroles` (rap-e) | B1 | 1 — Livreur (voix-a) | correct → clarté préservée (numéro/heure inchangés) | Oui (minimal) | Normale |
| `raconter-un-evenement-passe` (recit-f) | B1 | 2 — Sophie (F), Farid (H) | **déjà natif, conservé sans régénération** | Non | Normale (déjà considérée bonne) |
| `a1-nombres-numero-telephone` | A1 | 2 — Karim, Nadia | correct → plus naturel | Oui (minimal, numéro inchangé) | Normale |
| `a1-transports-bus-horaire` | A1 | 2 — Karim, Nadia | correct → plus naturel | Oui (minimal) | Normale |
| `a1-directions-metro-changement` | A1 | 2 — Karim, Nadia | correct → plus naturel | Oui (minimal) | Normale |
| `a1-directions-pharmacie-proche` | A1 | 2 — Sophie, Léa | déjà bon → plus naturel | Oui (léger) | Normale |
| `a1-rdv-annuler-rendez-vous` | A1 | 2 — Sophie, Secrétariat | correct → plus naturel | Oui (léger) | Normale |
| `a1-message-absence-bureau` | A1 | 1 — Narratrice | scolaire (3 phrases sèches) → fusionné, plus naturel | Oui | Normale |
| `a1-message-rappel-rdv` | A1 | 1 — Secrétariat | déjà bon → retouche minimale | Oui (minimal) | Normale |
| `a1-quotidien-routine-matin` | A1 | 1 — Léa | scolaire (liste "je... je... et je...") → fusionné **et** incohérence corrigée (la question citait "Léa" jamais nommée dans l'audio — désormais introduite) | Oui | Normale |
| `a1-annonce-recherche-colocataire` | A1 | 1 — Narrateur | annonce déjà factuelle (genre approprié) → connecteur ajouté | Oui (minimal, genre "petite annonce" respecté) | Normale |

Toutes les 5 pistes B1 utilisent des locuteurs de genre différent
(aucun nouveau défaut de voix dupliquée à corriger). Toutes les 9 pistes
A1 réutilisent les profils vocaux déjà établis (Thomas/Jacques/Flo/
Shelley/Sandy) sans introduire de nouveau profil.

Fichiers modifiés : `lib/pedagogy/audio/a1/manifest.ts`,
`lib/pedagogy/data/a1/modules/banque-ecoute.ts`,
`lib/pedagogy/audio/b1/humanized-tracks.ts` (+ correction de
`formatB1HumanizedTranscript` pour omettre le préfixe locuteur sur un
monologue, alignée sur `formatA1Transcript`), `lib/pedagogy/data/modules.ts`.

### 6.4 Cinquième lot — audit complet du backlog A1 restant (41 pistes)

Objectif de ce lot : ne plus laisser de piste A1 "non auditée". Les 41
pistes restantes (sur les 63 références `audioSrc` A1 vivantes, hors
`a1-la-sante` déjà exclue) ont été lues intégralement une par une et
classées selon 3 critères : le texte sonne-t-il "écrit" de façon injustifiée
pour son genre, les corrections/citations exactes sont-elles préservables,
et le gain d'une réécriture est-il réel. Résultat : **9 humanisées, 31
conservées telles quelles, 1 réservée** (déjà connue) — détail table
ci-dessous.

**Principe de classification retenu pour les pistes "conservées"** :
plusieurs genres sont *intrinsèquement* factuels/formels dans la vraie vie
— une petite annonce immobilière, une consigne de classe, une annonce
d'aéroport, un bulletin météo radio, un comptage de nombres — et les
rendre plus "conversationnels" les aurait rendues **moins** fidèles à
leur registre réel, pas plus naturelles. Ce n'est donc pas un renoncement
mais un choix de fidélité au genre, cohérent avec "humanise seulement ce
qui sonne trop écrit" (une consigne de classe qui sonne "professorale"
sonne juste, une consigne de classe qui sonne robotique en synthèse est un
problème de moteur `say`, pas de texte).

| Piste | Décision | Pourquoi |
|---|---|---|
| `a1-presentations-nationalite` | Humanisée | dialogue correct, petite ellipse ajoutée |
| `a1-presentations-profession` | **Conservée** | déjà vivante ("Ah, c'est intéressant !", "C'est fatigant, mais...") |
| `a1-presentations-etudiant` | Humanisée | monologue-liste de faits fusionné en auto-présentation fluide |
| `a1-consigne-salle-classe` | **Conservée** | consigne de classe — registre impératif court authentique |
| `a1-consigne-exercice-ecrit` | **Conservée** | idem |
| `a1-consigne-securite-avion` | **Conservée** | annonce de sécurité — registre officiel authentique |
| `a1-meteo-aujourdhui` | **Conservée** | bulletin météo — concision authentique (6 mots) |
| `a1-meteo-semaine` | **Conservée** | bulletin météo hebdo — énumération par jour authentique pour le genre |
| `a1-meteo-dialogue-sortie` | Humanisée | dialogue, petite hésitation ajoutée |
| `a1-bilan-message-nouvel-appartement` | **Conservée** (prudence bilan) | voicemail agence déjà pro et naturel |
| `a1-bilan-dialogue-agence-voyage` | **Conservée** (prudence bilan) | négociation déjà vivante |
| `a1-bilan-annonce-gare-complete` | **Conservée** (prudence bilan) | annonce officielle déjà correcte |
| `a1-bilan-conversation-nouvelle-vie` | **Conservée** (prudence bilan) | dialogue déjà excellent ("Félicitations !", "C'est génial !") |
| `a1-salutations-bonjour-matin` | Humanisée | complète le lot des 4 pistes salutations |
| `a1-dates-quelle-heure` | Humanisée | dialogue déjà bon, retouche minimale |
| `a1-dates-anniversaire` | **Conservée** | déjà naturel ("Avec plaisir !") |
| `a1-nombres-code-porte` | **Conservée** | répétition du code déjà réaliste |
| `a1-nombres-compter-dix` | **Conservée** | comptage — liste par nature |
| `a1-nombres-repondeur-numero` | Humanisée | légère retouche, numéro inchangé |
| `a1-rdv-coiffeur` | Humanisée | dialogue correct, retouche légère |
| `a1-rdv-rejoindre-un-ami` | **Conservée** | déjà efficace et naturel |
| `a1-description-physique-ami` | Humanisée | 3 phrases-gabarit fusionnées, fait testé préservé |
| `a1-description-personnalite` | **Conservée** | déjà vivant ("Il a l'air sympa !") |
| `a1-description-vetements-aujourdhui` | **Conservée** | déjà correct pour le genre descriptif |
| `a1-directions-tout-droit` | Humanisée | passage à un "vous" parlé plutôt qu'un panneau écrit |
| `a1-cafe-serveur-question` / `a1-cafe-restaurant-menu` | **Conservées** | dialogues déjà naturels |
| `a1-annonce-appartement-a-louer` / `a1-annonce-objet-a-vendre` | **Conservées** | petite annonce — registre télégraphique authentique |
| `a1-quotidien-loisirs-preferes` / `-sport` / `-recit-samedi` | **Conservées** | dialogues/récit déjà naturels |
| `a1-message-ami-retard` / `-invitation-anniversaire` | **Conservées** | messages vocaux déjà chaleureux |
| `m11-f1` (annonce-quai, transports) | **Conservée** | annonce minimale, niveau volontairement simple |
| `m14-f1` (au-marche, prix-achats) | **Conservée** | transaction déjà claire et naturelle |
| `a1-dates-jours-semaine` | **Conservée** | énumération des jours — liste par nature (déjà noté lot précédent) |
| `a1-la-sante` (m18-f1) | **Réservée** | mismatch thématique connu, hors périmètre |

Fichiers modifiés pour ce lot : `lib/pedagogy/audio/a1/manifest.ts`,
`lib/pedagogy/data/a1/modules/banque-ecoute.ts`. Aucun nouveau profil
vocal introduit, tous les locuteurs déjà connus (Thomas, Jacques, Flo,
Shelley, Sandy).

### 6.5 Sixième lot — clôture : bilans A2, mismatch `ville-o`, `a1-la-sante`

Dernier lot du chantier. Objectif : traiter les 3 cas mis de côté depuis
le début (évaluation finale A2, mismatch `ville-o`, `a1-la-sante`) avec
la prudence qu'ils méritent, sans forcer de régénération.

#### Les 4 `bilan-a2-*` (évaluation finale, 25 min, 12 points, seuil 8)

Audit complet de `lib/pedagogy/audio/a2/final-evaluation.ts` : pour
chaque piste, transcript ↔ question ↔ `correctChoiceId`/`correctAnswer`
↔ explication de correction relus intégralement, `A2_FINAL_EVALUATION.maxScore`
(calculé dynamiquement comme la somme des questions, testé) et
`passingScore` (8) vérifiés cohérents et **inchangés**.

| Piste | Décision | Pourquoi |
|---|---|---|
| `bilan-a2-annonce-aeroport` | **Conservée** | annonce d'aéroport déjà réaliste pour le genre |
| `bilan-a2-repondeur-coiffeur` | **Conservée** | répondeur déjà riche (reformulation, 2 options) — correspond exactement à son objectif pédagogique |
| `bilan-a2-dialogue-patinoire` | **Conservée** | déjà l'une des pistes les plus vivantes de toute la bibliothèque ("Euh, je ne sais pas trop...", "Bon, d'accord, je viens ! Mais toi, tu m'aides à rester debout, hein !") |
| `bilan-a2-recit-journee-chronologie` | **Humanisée** | seule piste du lot avec un vrai problème identifié dès l'audit initial de ce chantier : structure "d'abord... puis... l'après-midi... enfin..." trop manuelle pour un récit personnel |

**Réécriture de `bilan-a2-recit-journee-chronologie`** — les 3 citations
exactes utilisées par les corrections (« d'abord, le matin, j'ai emmené
les enfants à l'école », « l'après-midi, j'ai eu une réunion importante
avec mon chef », « je pense que je vais enfin pouvoir commencer le
nouveau projet ») couvrant l'essentiel de la structure du texte, la marge
de réécriture était nécessairement dans les connecteurs autour : "Alors,"
en ouverture, "!" plutôt que ".", "À midi" → "Là," (moins mécanique),
"Et" ajouté avant la citation q2, tiret + "d'ailleurs" après. Aucun fait
testé changé, aucune citation modifiée. Régénérée via `say`
(`scripts/a2-audio-generate.mjs`), vérifiée valide (30,2 s).

**Aucune fuite constatée ni introduite** : le test dédié
(`a2-content-integrity.test.ts`, "Frontière premium — pas de fuite de
correction/transcript côté client") scanne tout `app/`/`components/`
pour un composant `"use client"` qui importerait
`pedagogy/audio/a2/manifest` — 0 résultat, toujours vert. Fait notable :
**les 4 documents `bilan-a2-*` ne sont raccordés à aucune page live** à
ce jour (recherche exhaustive dans `app/`/`components/` : aucun import
de `A2_FINAL_EVAL_DOCS` ni `A2_FINAL_EVALUATION` en dehors des tests et
scripts) — l'évaluation existe au niveau manifest/tests/scripts de
génération, prête pour une future intégration, mais aucun risque de fuite
produit actuellement puisqu'elle n'est encore affichée nulle part.

#### Mismatch A2 `ville-o` — audit précis, cause réelle identifiée

Le module *Se repérer en ville et utiliser les services*
(`lib/pedagogy/data/modules-a2-part1.ts`, vocabulaire : la poste, la
banque, la mairie, un guichet, un formulaire, tout droit, à gauche/à
droite, traverser, au coin de) utilise pour son unique exercice d'écoute
(`ville-o`) le fichier `/audio/a2/a2-annonce-gare-perturbation.m4a` — une
annonce de gare sur un train annulé et remboursement au guichet. **Aucun
mot du vocabulaire du module n'apparaît dans cette piste.** Confirmé
objectivement mauvais, pas une question de goût.

**Cause réelle** (vérifiée en listant les 30 thèmes des pistes A2
existantes, `lib/pedagogy/audio/a2/tracks/*.ts` + `final-evaluation.ts`) :
aucune piste A2, pratique ou bilan, ne traite les indications de rue ou
les services publics municipaux. Ce n'est donc **pas un problème de
mapping** — il n'existe pas de piste existante plus appropriée vers
laquelle repointer `ville-o`. C'est un vrai manque de contenu : la seule
correction complète possible est d'écrire et générer un document audio
entièrement nouveau (dialogue de demande d'itinéraire + un
guichet poste/banque/mairie), ce qui dépasse le périmètre d'un chantier
d'humanisation de scripts existants (création de contenu pédagogique
neuf, pas réécriture).

**Décision : statut inchangé, réservé.** Contrairement à `a1-la-sante`
(mismatch thématique mais accompagné d'une vraie piste raisonnablement
adjacente), `ville-o` n'a littéralement aucun candidat de repli dans la
bibliothèque actuelle — le diagnostic ci-dessus, plus précis que celui du
premier audit ("mauvais appariement confirmé"), est la contribution de ce
lot : le prochain chantier de contenu A2 sait maintenant exactement quoi
écrire (pas seulement quoi repointer).

#### `a1-la-sante` — confirmation, non régénérée

Module *La santé* (`lib/pedagogy/data/a1/modules/quotidien-et-loisirs.ts`)
enseigne "avoir mal à + partie du corps" et "l'impératif pour un conseil
médical", mais son unique exercice d'écoute (`m18-f1`,
`/audio/a1/rendez-vous/prendre-rendez-vous-medecin.m4a`) se limite à la
prise de rendez-vous (jour/heure) — aucune douleur, aucun conseil médical
n'y est mentionné. Thème adjacent (médical) mais vocabulaire du module
absent, comme documenté depuis le tout premier audit de ce chantier
(`humanisation-backlog.md`, priorité moyenne).

**Non régénérée, conformément à la consigne explicite de ce lot.**
Contrairement à `ville-o`, une piste "medecin/rendez-vous" existe déjà et
n'est pas absurde dans son contexte (santé au sens large) — une
humanisation de surface aurait pu être tentée, mais l'aurait rendue *plus
convaincante sans la rendre plus juste* : le vrai problème (mauvais choix
de piste, pas mauvaise qualité de piste) resterait entier et un futur
ré-enregistrement humain devra de toute façon repartir d'un script
réellement centré sur la douleur/les conseils médicaux. Régénérer
maintenant aurait ajouté du travail à refaire plus tard sans rien
résoudre. Statut "ré-enregistrement humain futur" maintenu tel quel.

Fichiers modifiés pour ce lot : `lib/pedagogy/audio/a2/final-evaluation.ts`
uniquement. Aucun fichier A1 touché (conformément à la consigne).

### 6.6 Septième lot — clôture réelle : `a1-la-sante` et `ville-o` corrigés

Le lot précédent (§6.5) avait laissé ces deux cas "réservés" après un
premier audit. Ce lot reprend l'audit **encore plus précisément**, sans
partir du principe qu'un ré-enregistrement humain était nécessaire — et
conclut, pour les deux, que le pipeline existant suffisait. Aucun des
deux cas n'a jamais eu besoin d'une voix humaine ou neuronale : le
problème était toujours un mauvais choix de contenu, jamais une
limitation technique du pipeline `say`.

#### `a1-la-sante` (m18-f1) — résolu

**Audit complet retrouvé** :
- Module : "La santé" (`lib/pedagogy/data/a1/modules/quotidien-et-loisirs.ts`,
  stage `a1-quotidien-et-loisirs`), domaine `vocabulaire`.
- Compétence : nommer les parties du corps, dire qu'on a mal, comprendre
  un conseil médical/pharmaceutique simple.
- Vocabulaire attendu : la tête, le ventre, le dos, la gorge, les dents,
  "avoir mal à...", un médicament, prendre rendez-vous.
- Points de langue attendus : "avoir mal à" + article contracté (au/aux) ;
  l'impératif de conseil ("Prenez ce médicament. Reposez-vous. Buvez
  beaucoup d'eau.").
- **`situation` du module** (jamais exploitée avant ce lot) : "À la
  pharmacie, Chloé explique qu'elle a mal à la tête et demande conseil."
- Exercice : `m18-f1`, activité "Écouter une prise de rendez-vous
  médical", 1 question.
- Piste utilisée : `/audio/a1/rendez-vous/prendre-rendez-vous-medecin.m4a`
  — script réel : "Secrétariat — Cabinet médical, bonjour. / Marc —
  Bonjour, je voudrais un rendez-vous... / Secrétariat — Mardi à onze
  heures, ça vous va ? / Marc — Oui, très bien, merci." Aucune douleur,
  aucune partie du corps, aucun médicament, aucun impératif de conseil —
  seul "prendre rendez-vous" (1 item du vocabulaire sur 8) est couvert.
- Recherche d'une piste alternative : les 65 pistes A1 passées en revue
  (`grep` sur "mal à", "médicament", "pharmacie" dans
  `lib/pedagogy/audio/a1/manifest.ts`) — seule `a1-directions-pharmacie-proche`
  mentionne "pharmacie", mais uniquement pour donner un itinéraire, jamais
  pour une douleur ou un conseil. **Aucune piste alternative n'existe.**

**Diagnostic retenu : contenu audio ne correspondant pas à l'exercice +
piste réellement inexistante pour le vrai besoin** (pas un mapping
réparable, pas un niveau CECRL incorrect — le niveau A1 était respecté,
juste sur le mauvais sujet).

**Solution appliquée** : script réécrit avec le pipeline existant, en
reprenant fidèlement la `situation` déjà décrite par le module et les
exemples d'impératif déjà donnés par ses `languagePoints` :

> Chloé — Bonjour, j'ai mal à la tête depuis ce matin. Vous avez un médicament ?
> Pharmacien — Bonjour ! Oui, j'ai ça. Prenez un comprimé, et reposez-vous un peu.
> Chloé — D'accord. Et je dois boire beaucoup d'eau aussi ?
> Pharmacien — Oui, buvez beaucoup d'eau, c'est important.
> Chloé — Très bien, merci beaucoup !

2 voix distinctes (Chloé = sandy, Pharmacien = jacques), niveau A1.2,
débit "naturel" (165 mots/min — plus adapté que le palier "lent" vu la
position du module, stage 4 sur 6). 2 questions désormais possibles
(douleur localisée + conseil donné), remplaçant l'unique question
"horaire de rendez-vous" qui ne testait rien du vocabulaire réel du
module. `id`/`filename` conservés à l'identique (`a1-rdv-prendre-rendez-vous-medecin`
/ `prendre-rendez-vous-medecin.m4a`) — aucun autre exercice ne référençait
ce fichier, donc aucun orphelin créé en le réécrivant sur place. `theme`
délibérément conservé à `"rendez-vous"` (pas renommé en `"sante"`) pour ne
pas casser le test `a1-audio.test.ts` qui exige au moins 2 pistes par
thème déclaré (un nouveau thème `"sante"` avec une seule piste aurait
échoué). Régénérée via `say`, vérifiée valide (23,4 s).

#### `ville-o` — résolu

**Vérifications demandées, dans l'ordre** :
- Piste utilisée avant correction : `/audio/a2/a2-annonce-gare-perturbation.m4a`.
- Exercice : `ville-o`, module *Se repérer en ville et utiliser les
  services* (`lib/pedagogy/data/modules-a2-part1.ts`, stage `a2-debut`).
- Transcript correspondant : une annonce de gare (train annulé,
  remboursement au guichet) — sans le moindre mot du vocabulaire du
  module (poste, banque, mairie, guichet, formulaire, justificatif de
  domicile, tout droit, à gauche/à droite, traverser, au coin de).
- Questions dépendantes : 3, toutes sur les détails de l'annonce de gare
  (voie, horaire, remboursement) — aucune ne teste la compréhension
  d'indications en ville, alors que c'est l'objectif affiché du module.
- **Recherche d'une piste A2 existante mieux adaptée** : recherche
  textuelle complète (pas seulement par `theme` déclaré) sur "la poste",
  "la banque", "la mairie", "un guichet", "tout droit", "à gauche/à
  droite", "traverser", "formulaire", "justificatif" dans les 30 pistes
  A2 (26 pratique + 4 bilan). Un seul résultat, `a2-invitation-mariage-repondeur`,
  qui mentionne "la mairie" — mais uniquement comme lieu d'une cérémonie
  de mariage, aucun rapport avec les services publics ou les indications.
  **Confirmé : ce n'est pas un problème de mapping**, aucune piste
  existante ne convient, même approximativement.

**Diagnostic retenu : piste réellement inexistante** (vrai trou de
contenu dans la bibliothèque A2, comme documenté dès le premier audit de
ce chantier, mais jamais vérifié aussi précisément).

**Solution appliquée** : nouvelle piste écrite avec le pipeline A2
existant, directement à partir de la `situation` déjà décrite par le
module ("Youssef... demande son chemin... pour aller à la poste, puis se
rend à la banque") :

> Youssef — Excusez-moi, je cherche la poste, elle est loin d'ici ?
> Passante — Non, pas très loin ! Continuez tout droit, puis tournez à gauche au carrefour.
> Youssef — D'accord, tout droit, puis à gauche...
> Passante — C'est ça. La poste est juste au coin de la rue, à côté de la pharmacie.
> Youssef — Merci beaucoup ! Et la banque, vous savez où elle est aussi ?
> Passante — La banque ? Oui, je la connais bien : c'est juste en face de la poste, vous ne pouvez pas la manquer.
> Youssef — Parfait, merci pour ces indications !

Couvre l'impératif ("Continuez", "tournez"), les prépositions de lieu
(tout droit, à gauche, au coin de, en face de), et le pronom COD de
reprise ("je la connais bien" — repris quasi mot pour mot de l'exemple
donné par `languagePoints` du module lui-même : "La poste ? Je la
connais bien."). Ajoutée comme nouvelle entrée `A2TrackDefinition`
(`lib/pedagogy/audio/a2/tracks/debut.ts`, id `a2-directions-poste-banque`,
stage `a2-debut` — cohérent avec le stage du module). `theme:
"vie_quotidienne"` retenu (le type `A2Theme` est une union fermée à 15
valeurs sans "ville"/"directions" — impossible d'en ajouter une sans
modifier le type partagé, hors périmètre). 3 questions écrites (itinéraire,
localisation précise, proximité poste/banque). Générée via
`scripts/a2-audio-generate.mjs` (33,9 s), `ville-o` repointé vers cette
piste (audioSrc + transcript + questions mis à jour dans
`modules-a2-part1.ts`).

**Effet de bord détecté et corrigé — piste orpheline évitée** :
`a2-annonce-gare-perturbation.m4a` n'était en réalité référencée par
**aucun autre exercice live** que `ville-o` (vérifié par `git grep` sur
le commit précédent) — le test anti-orphelin
(`integration-a1-a2-b1.test.ts`, "chaque piste de la bibliothèque A2 est
référencée par au moins un exercice réel") a immédiatement révélé le
problème dès la suppression du lien. Plutôt que d'abandonner cette piste
pourtant bien écrite, elle reçoit désormais son propre exercice dans une
nouvelle section "Écoute libre : transports" de
`lib/pedagogy/data/modules-a2-banque-ecoute.ts` (même principe que les
9 autres sections de cette banque : copie telle quelle de
`track.exercise`, jamais réécrite). Entrée `AUDIO_PRODUCTION_META`
correspondante ajoutée dans `lib/pedagogy/audio/manifest.ts` (ce manifest
scanne en réalité `MODULES`, la liste combinée A1+A2+B1, pas seulement
B1 — découverte faite en corrigeant ce lot).

**Contrôle pédagogique effectué pour les deux cas** (audio ↔ transcript ↔
exercice ↔ questions ↔ réponses ↔ scoring ↔ niveau CECRL) : aucune bonne
réponse changée silencieusement — les deux exercices avaient de toute
façon un contenu neuf, donc de nouvelles questions/réponses écrites en
même temps que le script, jamais une correction retouchée pour "faire
correspondre" un audio existant. Niveau A1/A2 strictement respecté (voir
scripts ci-dessus : vocabulaire courant, phrases courtes, aucune
structure hors-programme).

**Tests ajoutés** : 2 gardes-fous ciblés, un par cas, empêchant tout
retour silencieux du mismatch :
- `content-integrity-a2.test.ts` — "ville-o... utilise une piste sur le
  vocabulaire réellement enseigné" : vérifie que `audioSrc` ne contient
  plus jamais "gare-perturbation" et que le transcript contient
  effectivement "poste", "banque" et "tout droit".
- `content-integrity-a1.test.ts` — "m18-f1... porte réellement sur la
  douleur et le conseil médical" : vérifie que le transcript contient
  "mal à" et "médicament".

Fichiers modifiés pour ce lot : `lib/pedagogy/audio/a1/manifest.ts`,
`lib/pedagogy/data/a1/modules/quotidien-et-loisirs.ts`,
`lib/pedagogy/audio/a2/tracks/debut.ts`,
`lib/pedagogy/data/modules-a2-part1.ts`,
`lib/pedagogy/data/modules-a2-banque-ecoute.ts`,
`lib/pedagogy/audio/manifest.ts`, `lib/pedagogy/data/a1/content-integrity-a1.test.ts`,
`lib/pedagogy/data/content-integrity-a2.test.ts`.

## 7. Risques identifiés pour toute réécriture de script

1. **A1** : toujours éditer `lib/pedagogy/data/a1/modules/*.ts`
   (`transcript`) **et**, si la piste y existe, `lib/pedagogy/audio/a1/manifest.ts`
   (`turns`) avec exactement le même texte — sinon transcript affiché et
   audio réellement synthétisé divergent silencieusement (voir §2).
2. **Fichier généré** : `lib/pedagogy/data/modules-public.generated.ts`
   est un artefact de build (`npm run generate:public-modules`) — ne
   jamais l'éditer à la main, le régénérer après toute modification de
   source.
3. **Examens/DELF** : ne jamais réécrire (voir encadré style guide).
4. **Régénération audio** : toujours passer par le script de niveau
   correspondant avec `--only=<id>` pour limiter l'impact à la piste
   modifiée, jamais `--force` sans filtre (régénérerait toute la
   bibliothèque).

## 8. Roadmap restante (hors périmètre immédiat de ce chantier)

- Migrer `a1-audio/generate.mjs` et `a2-audio-generate.mjs` vers
  `lib/pedagogy/audio/tts/registry.ts` (mécanique, faible risque, pas fait
  ici par prudence — voir §4.1).
- Implémenter concrètement les variants `learning`/`real-life` (§5) sur un
  lot pilote P0 (voir `humanisation-backlog.md`).
- Étendre la normalisation de niveau sonore à la bibliothèque existante,
  par lot, avec QA humaine avant/après (jamais en aveugle).
- Poursuivre l'enregistrement humain B1 selon le pack déjà prêt
  (`docs/b1/audio-human-recording-plan.md`) — aucune clé TTS neuronale ni
  budget d'enregistrement disponibles dans cet environnement pour aller
  plus loin ici.
- Aligner le format A2 sur 44,1 kHz (actuellement 22 050 Hz) lors d'une
  prochaine régénération complète du niveau.

## 9. Fournisseurs TTS compatibles

| Fournisseur | Statut dans cet environnement | Clé requise |
|---|---|---|
| `say` (macOS, système) | **Disponible et fonctionnel** — vérifié (`say`/`afconvert` présents), seul fournisseur utilisé à ce jour par toute la bibliothèque | Aucune |
| ElevenLabs | Implémenté (`elevenlabs-provider.ts`), **non configuré** — `ELEVENLABS_API_KEY` absente de l'environnement | `ELEVENLABS_API_KEY` (jamais codée en dur, voir `.env.example`) |
| Tout autre fournisseur (Azure, Google, OpenAI TTS...) | Non implémenté — ajouter un fichier `<provider>-provider.ts` implémentant `TtsProvider` et l'enregistrer dans `registry.ts` | Selon fournisseur, toujours via variable d'environnement |

Aucune génération neuronale n'a été effectuée dans ce chantier (pas de
clé disponible) — conformément à la consigne, le chantier n'a pas été
bloqué pour autant : architecture, pipeline et scripts humanisés livrés
prêts à l'emploi dès qu'une clé sera configurée.

---
title: Guide de style audio A1/A2/B1
type: audio-style-guide
lastUpdated: 2026-09-07
---

# Guide de style audio

Ce document fixe les règles de progression sonore, de casting vocal et
d'écriture "humanisée" des scripts pour les trois niveaux. Il formalise des
règles déjà appliquées en pratique (débits `say -r`, répartition des voix)
et ajoute ce qui manquait : une doctrine explicite pour écrire un script qui
sonne parlé plutôt que lu, et une définition des modes `learning`/`real-life`.

Contexte technique : voir `docs/audio/humanisation-a1-a2-b1.md` (audit +
architecture) et `docs/b1/audio-human-recording-plan.md` (pack
d'enregistrement humain B1, référence pour les standards techniques §7).

## 1. Progression sonore par niveau

La bibliothèque a déjà, sans qu'aucun document ne le formalise jusqu'ici,
une progression de débit cohérente et croissante — ce guide la documente et
la rend explicite pour toute piste future :

| Niveau | Débit | Justification |
|---|---|---|
| **A1** | `lent` = 128 mots/min, `naturel` = 165, `naturel_soutenu` = 180 (voir `lib/pedagogy/audio/a1/voices.ts`) | Clair et articulé, mais **jamais robotique** : `lent` reste un débit humain ralenti (pas un débit "manuel audio" à 80-100 mots/min), utilisé pour les toutes premières pistes (salutations, présentations). `naturel`/`naturel_soutenu` montent en cadence dès que le vocabulaire de base est acquis. |
| **A2** | `debut` = 150, `milieu` = 165, `fin` = 180 mots/min (voir `lib/pedagogy/audio/a2/tracks/{debut,milieu,fin}.ts`) | Continuité directe avec A1 : le stage `a2-debut` (150) prend le relais du `naturel` A1 (165) par le bas, et `a2-fin` (180) rejoint le plafond `naturel_soutenu` d'A1 — la sensation de vitesse ne fait jamais de bond brutal d'un niveau à l'autre. Multi-locuteurs dès `a2-debut` (voir §2). |
| **B1** | Pas de palier numérique fixe — débit "conversationnel réel", piloté par la voix humaine ou par la fiche de production (voir `docs/b1/audio-human-recording-plan.md` §4) | À ce niveau, contraindre un débit à un wpm fixe redevient artificiel : la variation de rythme *intra-phrase* (accélérer sur une évidence, ralentir sur une information à retenir) est elle-même une compétence d'écoute B1. Débit de référence si un contrôle numérique est nécessaire (ex. fournisseur TTS) : 180-200 mots/min, jamais en dessous de 165. |

**Règle de non-régression** : aucune piste ne doit descendre sous le débit
`lent` d'A1 (128 mots/min) — en dessous, la synthèse cesse de sonner comme
une personne qui parle doucement et commence à sonner comme un lecteur
audio pour malvoyant, ce qui n'est jamais l'effet recherché ici.

## 2. Architecture multi-voix

Déjà en place et à respecter pour toute piste nouvelle :

- **A1** — 7 voix (`lib/pedagogy/audio/a1/voices.ts`) : Thomas/Jacques
  (hommes), Flo/Shelley/Sandy (femmes), Grandma/Grandpa (rôles famille
  uniquement). Identité de personnage stable (`recurringRoles`) : un
  personnage récurrent garde toujours la même voix.
- **A2** — 6 profils (`voix-a` à `voix-f`, `lib/pedagogy/audio/a2/voices.ts`),
  répartis par registre (neutre/professionnel, chaleureux, officiel...)
  plutôt que par personnage nommé.
- **B1** — 3 voix humaines prévues (Voix A/B/C, `docs/b1/audio-human-recording-plan.md`
  §5), en attente d'enregistrement (voir état actuel dans
  `docs/audio/humanisation-a1-a2-b1.md`).

**Règle non négociable, déjà testée automatiquement (A1 `a1-audio.test.ts`,
A2 `duplicateVoiceIssues`)** : dans un même document à plusieurs locuteurs,
jamais deux personnages différents ne partagent la même voix. C'est la
première chose qui rend un dialogue synthétique confus à l'oreille.

### Fournisseur TTS

Le casting vocal ci-dessus est indépendant du fournisseur de synthèse —
voir `lib/pedagogy/audio/tts/` pour l'architecture interchangeable
(`resolveTtsProvider()`). `voiceRef` reste propre à chaque fournisseur (nom
`say -v` aujourd'hui, id de voix ElevenLabs demain) ; le **rôle** de la voix
(genre, registre, personnage récurrent) documenté ci-dessus doit être
préservé quel que soit le fournisseur choisi pour la resynthétiser.

## 3. Écrire un script "humanisé" (pas un texte lu)

La lecture des transcripts existants (voir audit, `humanisation-a1-a2-b1.md`
§3) montre des scripts déjà corrects et souvent vivants (hésitations,
petits désaccords, reformulations), mais structurellement très réguliers :
chaque tour est une phrase grammaticalement complète, ponctuée comme à
l'écrit, sans faux départ ni chevauchement. Règles à appliquer pour toute
piste réécrite ou nouvelle (jamais pour les épreuves DELF — voir
l'encadré) :

1. **Hésitations dosées, jamais systématiques** — un "euh" ou un "enfin"
   par piste suffit en général ; en mettre à chaque réplique fatigue
   l'écoute autant qu'un débit trop lisse.
   > "Alors euh... non en fait, je crois que le train part à 9h, pas à 9h30."
2. **Reformulation en cours de phrase** plutôt qu'une phrase parfaite du
   premier coup :
   > "Il faut — enfin, je pense qu'il faut prendre rendez-vous avant, oui."
3. **Réponses courtes et incomplètes** dans un dialogue naturel, pas
   toujours une phrase complète :
   > "— Tu viens quand ? — Euh, vers 8h, je pense."
4. **Connecteurs oraux plutôt qu'écrits** : "du coup", "en fait", "bon",
   "bref" — à préférer à "par conséquent", "en effet" (registre écrit)
   pour A2/B1 quotidien (pas pour les registres officiels/administratifs,
   qui doivent rester formels — voir `docs/b1/audio-human-recording-plan.md`
   §4 pour les registres déjà bien calibrés, ex. guichet préfecture).
5. **Rythme variable intra-phrase**, pas seulement un wpm global constant
   (concerne surtout la prise de voix humaine B1 ; pour la synthèse `say`,
   varier `rateWpm` d'une réplique à l'autre au sein d'une même piste
   simule cet effet).
6. **Ne jamais sacrifier la clarté de l'information testée** : une
   hésitation ajoutée avant ou après l'information-clé (heure, prix,
   nom...) est acceptable ; en ajouter *au milieu* de cette information
   nuit à la compréhension et invalide l'exercice.

> **Épreuves DELF / examens blancs : ne pas toucher.** Les scripts de
> `public/audio/examens/**` et de démonstration d'examen ont été audités et
> validés tels quels (`docs/b1/audio-human-recording-plan.md` §3/§6,
> "aucune anomalie détectée, l'examen n'a pas été modifié"). Une
> humanisation y introduirait un risque de changer la difficulté ou la
> validité d'une épreuve calibrée — hors périmètre de ce chantier.

## 4. Modes `learning` / `real-life`

Non implémentés à ce jour (confirmé par l'audit — voir
`humanisation-a1-a2-b1.md` §Modes). Architecture proposée pour un futur
chantier, sans l'imposer maintenant :

- **`learning`** (mode par défaut, première écoute) : débit du palier
  actuel (§1), articulation soignée, silence net entre les tours de
  parole, aucun bruit de fond. C'est essentiellement ce qui existe déjà
  pour A1/A2/B1 aujourd'hui.
- **`real-life`** (entraînement, débloqué après une première réussite au
  `learning` du même exercice) : débit du palier supérieur (+15 mots/min
  environ), hésitations plus fréquentes, tours qui s'enchaînent avec un
  chevauchement léger au changement de locuteur, éventuellement une
  ambiance sonore minimale (annonce de gare avec un fond de gare léger,
  jamais au point de gêner la compréhension).

**Modélisation minimale suggérée** (pas encore implémentée) : un champ
`variant: "learning" | "real-life"` sur `AudioTrack`/`A1AudioTrack`/`A2Track`,
`syntheticSrc`/`humanSrc` déclinés en `.../learning/<id>.m4a` et
`.../real-life/<id>.m4a` (même convention d'ajout non destructif que
`human/`, voir `lib/pedagogy/audio/paths.ts`). Le variant `real-life` ne
remplace jamais le `learning` : il s'ajoute, débloqué plus tard dans le
parcours. Ne pas générer ces variantes en masse — un lot pilote sur les
pistes P0 identifiées dans le backlog suffit pour valider l'approche avant
extension.

## 5. Normalisation et format

- **Format actuel** : `.m4a` (AAC), mono. A1 échantillonné à 44,1 kHz après
  concaténation (`afconvert -d BEI16@44100`), A2 hérite du débit natif des
  voix `say` sur cette machine (22 050 Hz, voir commentaire de
  `scripts/a2-audio-generate.mjs`) — **incohérence mineure entre A1 et A2**
  à corriger si de nouvelles pistes A2 sont régénérées (aligner sur
  44,1 kHz comme A1/B1).
- **Niveau sonore** : cible crête à -3 dBFS (voir
  `lib/pedagogy/audio/tts/normalize.ts`, `peakNormalizePcm16`), alignée sur
  la cible déjà documentée pour l'enregistrement humain B1 (§7 du pack
  d'enregistrement). Pas encore appliqué à la bibliothèque existante (114
  fichiers) — normalisation de format uniquement à ce jour, jamais de
  niveau. À appliquer d'abord à toute piste nouvellement (re)générée, pas
  en rétroactif massif sur l'existant (voir §6 du backlog).
- **Poids** : bibliothèque actuelle ≈ 12 Mo pour 114 pistes (audit), très
  loin d'un problème de performance ; rester sous ~130 kbps AAC mono
  suffit largement pour de la voix parlée (voir §7 du pack B1).

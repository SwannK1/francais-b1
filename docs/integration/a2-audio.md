# Intégration — Bibliothèque de compréhension orale A2

**Chantier :** `chantier/a2-audio` — bibliothèque de compréhension orale A2, indépendante du chantier "A2 contenu" (parcours écrit/grammaire) parallèle, non fusionné dans cette branche au moment de la rédaction.

**Statut :** bibliothèque complète, autonome, testée. Prête à être raccordée à un module A2 une fois celui-ci disponible — voir §7.

---

## 0. Pourquoi cette architecture

Sur cette branche, `lib/pedagogy/data/modules.ts`/`exams.ts` (contenu B1) et le futur contenu A2 (chantier parallèle `chantier/a2-content`, non visible ici) sont les seules sources de vérité pédagogiques existantes. Le manifest audio B1 (`lib/pedagogy/audio/manifest.ts`) **dérive** ses pistes des exercices `comprehension_orale` de ces fichiers.

Comme le module A2 "contenu" n'existe pas dans cette branche, il n'y a rien dont dériver un manifest A2 de la même façon. Deux options ont été écartées :

- **Attendre la fusion du chantier "A2 contenu"** pour écrire l'audio — aurait bloqué ce chantier sur un autre, et contredit l'objectif "chantier autonome et substantiel".
- **Modifier `data/modules.ts`/`exams.ts`** pour y injecter des exercices A2 — fichiers centraux explicitement hors périmètre (risque de conflit avec le chantier parallèle qui les modifie aussi).

**Solution retenue :** une bibliothèque A2 entièrement autonome sous `lib/pedagogy/audio/a2/`, qui réutilise en lecture seule les types partagés (`ComprehensionOraleExercise`, `Question`, `Correction`, `Exam`... de `lib/pedagogy/types.ts`) sans jamais toucher aux fichiers de données centraux. Chaque piste est un exercice `comprehension_orale` **complet et directement exploitable** — prêt à être repris tel quel dans un `Module`/`Lesson`/`Activity` A2 une fois celui-ci fusionné (voir §7).

---

## 1. Inventaire

### 1.1 Bibliothèque de pratique — 26 pistes

| Étape | Pistes | Débit | Durée totale mesurée |
|---|---|---|---|
| `a2-debut` | 8 | 150 mots/min | ~3,7 min |
| `a2-milieu` | 9 | 165 mots/min | ~6,4 min |
| `a2-fin` | 9 | 175-180 mots/min | ~7,5 min |
| **Total pratique** | **26** | | **~15,9 min** |

### 1.2 Évaluation orale A2 finale — 4 documents

| Document | Objectif testé |
|---|---|
| `bilan-a2-annonce-aeroport` | Repérage d'information (destination, porte, délai) |
| `bilan-a2-repondeur-coiffeur` | Détails et reformulation (raison, deux options, action attendue) |
| `bilan-a2-dialogue-patinoire` | Compréhension globale et intentions évidentes |
| `bilan-a2-recit-journee-chronologie` | Chronologie simple et inférence élémentaire |

~1,8 min, 12 questions au total.

**Total bibliothèque : 30 pistes, ~17,6 minutes de contenu audio réel** (mesuré via `afinfo`, voir §6 — pas une estimation).

### 1.3 Couverture des 15 domaines d'écoute A2 du brief

Vie quotidienne, travail, famille, achats, transports, voyages, logement, santé, météo, loisirs, rendez-vous, messages, événements, projets, récits — **les 15 domaines sont couverts**, vérifié automatiquement (`a2-content-integrity.test.ts` > "couvre les 15 grands domaines d'écoute A2 du brief").

### 1.4 Couverture des types de documents du brief

Dialogues, messages vocaux, annonces en gare (+ annonce aéroport pour l'évaluation finale), répondeur, appel téléphonique, conversation au travail, réservation (via ses variantes concrètes hôtel/restaurant), médecin/pharmacie, interview très simple, météo, programme, récit de week-end, projet de vacances, invitation, problème dans un logement (+ réunion de copropriété) — **tous représentés**, vérifié automatiquement.

---

## 2. Progression pédagogique

- **Début A2** (150 mots/min, silences longs entre tours, 0-2 locuteurs) : débit clair, documents courts (12-40s), vocabulaire connu, informations 100% explicites.
- **Milieu A2** (165 mots/min) : 2-3 locuteurs, reformulation (un horaire ou un nombre change en cours de dialogue — ex. `a2-restaurant-reservation-telephone`, `a2-hotel-reservation-dates`), distracteur simple à ne pas confondre avec la bonne réponse.
- **Fin A2** (175-180 mots/min) : messages plus longs (jusqu'à ~56s), annonces à deux informations combinées, conversations à 3 voix, récit court avec un imprévu, inférence élémentaire (la réponse se déduit d'une information explicite proche, jamais d'une implication complexe façon B1 — ex. "le lancement du site sera-t-il retardé ?" se déduit directement de "on peut mettre des photos temporaires").

## 3. Voix

6 profils vocaux macOS (`say`, voix système fr_FR — même technique que le pipeline audio B1 existant, voir `docs/b1/audio-human-recording-plan.md` §0), définis dans `lib/pedagogy/audio/a2/voices.ts` :

| Profil | Voix `say` | Genre | Registre |
|---|---|---|---|
| Voix A | Thomas | H | Neutre à professionnel |
| Voix B | Flo (Français (France)) | F | Chaleureux/quotidien |
| Voix C | Shelley (Français (France)) | F | Alternative à Voix B |
| Voix D | Jacques | H | Formel/officiel (annonces, syndic) |
| Voix E | Rocko (Français (France)) | H | Complément scènes à 3 |
| Voix F | Sandy (Français (France)) | F | Complément scènes à 3 / institutionnel |

**Règle appliquée et vérifiée automatiquement** (`duplicateVoiceIssues`, `a2-content-integrity.test.ts`) : dans un même document, deux locuteurs différents n'utilisent jamais le même profil vocal — défaut identifié sur 3 pistes B1 (`docs/b1/audio-human-recording-plan.md` §1), délibérément évité ici dès la conception.

Les voix macOS partagées entre plusieurs locales (Eddy, Flo, Grandma, Rocko, Sandy, Shelley) sont invoquées avec leur forme parenthésée complète (`"Flo (Français (France))"`) — la forme courte est ambiguë et peut silencieusement résoudre vers une autre locale.

## 4. Scripts source

Chaque piste a une source textuelle maîtrisée dans `lib/pedagogy/audio/a2/tracks/{debut,milieu,fin}.ts` et `final-evaluation.ts`, sous la forme d'une `A2TrackDefinition` :

- `id` — identifiant stable, aussi nom de fichier (`<id>.m4a`)
- `theme` / `docType` / `stage` — classification (voir `types.ts`)
- `objectif` — ce que l'apprenant doit être capable de repérer/comprendre
- `pace` — note de mise en scène (intention, rythme)
- `turns[]` — script complet : `{ voiceId, speakerRole, text }` par tour de parole
- `exercise` — exercice `comprehension_orale` complet (questions, correction, difficulté)

**Une seule source de vérité** : `turns` sert à la fois de script de génération audio (`scripts/a2-audio-generate.mjs`) et de transcript pédagogique (`manifest.ts: transcriptFor()`), jamais retapé à la main deux fois — donc jamais de désynchronisation entre ce qui est dit et ce que l'apprenant peut lire.

## 5. Questions de compréhension

Chaque piste porte 3 à 4 questions (QCM ou vrai/faux), avec `correction.explanation` citant la phrase exacte du script qui justifie la réponse — jamais une simple affirmation "c'est faux". 91 questions au total (79 sur la bibliothèque de pratique, 12 sur l'évaluation finale).

## 6. Évaluation orale A2 finale

`lib/pedagogy/audio/a2/final-evaluation.ts` + assemblage dans `manifest.ts` (`A2_FINAL_EVALUATION`, de type `Exam`) : 4 documents **originaux**, distincts des 26 pistes de pratique (vérifié automatiquement), combinés en une seule épreuve testant ensemble repérage d'information, détails/reformulation, compréhension globale/intentions, et chronologie/inférence — couvrant ainsi explicitement les 5 axes demandés par le brief.

## 7. Raccordement au futur module A2 "contenu"

**Aucune modification de `lib/pedagogy/data/modules.ts`/`exams.ts` n'a été faite** (fichiers du chantier parallèle). Procédure d'intégration une fois ce chantier fusionné, à faire côté "A2 contenu" :

1. Pour chaque piste de `AUDIO_TRACKS_A2` (`lib/pedagogy/audio/a2/manifest.ts`), reprendre `track.exercise` (déjà un `ComprehensionOraleExercise` complet et valide) tel quel dans le `lessons[].activities[].exercises[]` du module A2 correspondant au thème de la piste (`track.definition.theme`).
2. Pour l'évaluation finale, reprendre `A2_FINAL_EVALUATION` (déjà un `Exam` complet) tel quel dans le catalogue `EXAMS`, ou fusionner sa section unique dans un examen A2 plus large si le chantier "A2 contenu" en prévoit un.
3. Les fichiers audio sont déjà au bon endroit et dans le bon format (`public/audio/a2/<id>.m4a`, AAC mono 22050 Hz — identique au pipeline B1) : aucun déplacement de fichier nécessaire.
4. `skillId` : les pistes réutilisent les deux compétences `comprehension_orale` déjà existantes dans `lib/pedagogy/data/skills.ts` (`co-dialogues-simples` pour les documents à 2+ locuteurs, `co-annonces-publiques` pour les monologues/annonces) — aucune nouvelle compétence à créer pour intégrer cette bibliothèque telle quelle. Si le chantier "A2 contenu" souhaite des compétences plus fines (ex. distinguer message vocal / annonce gare / interview), ce sera à faire à ce moment-là, pas ici.
5. Le composant `AudioExercise.tsx` (lecteur audio, résolution humain → synthétique → erreur) n'a **pas été modifié** : il fonctionne déjà tel quel avec n'importe quel `ComprehensionOraleExercise`, donc avec les exercices de cette bibliothèque, sans changement de code une fois l'intégration ci-dessus faite.
6. Aucune route/page n'a été créée pour éviter tout conflit avec la navigation du chantier parallèle. Le premier composant client qui consommera ces exercices devra passer par la même frontière contenu public/protégé que le B1 (`PublicModule` dérivé côté serveur, `Module` complet jamais envoyé tel quel au client) — voir `docs/architecture/user-lifecycle.md` § Premium content boundary, et §9 ci-dessous.

## 8. Manifest et pipeline de génération

- `lib/pedagogy/audio/a2/manifest.ts` — équivalent A2 du manifest B1 : dérive `audioSrc`/`transcript` depuis les `turns`, assemble `AUDIO_TRACKS_A2` (pratique), `AUDIO_TRACKS_A2_FINAL_EVAL` (évaluation), `A2_FINAL_EVALUATION` (`Exam` complet).
- `scripts/a2-audio-generate.mjs` — génère les fichiers `.m4a` : chaque tour de parole est synthétisé séparément (`say -v <voix> -r <débit> -o tour.aiff`), les PCM bruts sont concaténés avec un silence entre tours (`scripts/lib/aiff.mjs`), puis encodés en AAC via `afconvert -f m4af -d aac`. Idempotent (`npm run audio:a2:generate`, `--force` pour régénérer, `--only=<id>` pour une piste). Nécessite macOS + Xcode Command Line Tools (`say`, `afconvert`) — pas de dépendance npm ajoutée.
- `scripts/a2-audio-validate.mjs` (`npm run audio:a2:status`) — rapport de couverture : présence, taille, durée réelle (`afinfo`) vs estimée, problèmes structurels. N'échoue le process (`exitCode = 1`) que si un fichier manque ou qu'un problème structurel est détecté ; jamais de faux positif sur une machine sans `afinfo` (Linux CI) — la mesure de durée est alors simplement omise.

## 9. QA effectuée / limites

**Automatisé (exécuté avec succès dans cette session) :**
- 82 tests dédiés (`lib/pedagogy/audio/a2/__tests__/*`) : intégrité de contenu (ids uniques, structure, couverture thèmes/types), questions (QCM valides, corrections non vides), manifest (audioSrc/transcript dérivés, pas de doublon), évaluation finale (4 documents distincts, barème cohérent), frontière premium (aucun composant `"use client"` n'importe le manifest A2), fichiers physiques (présence, taille > 0, format `.m4a`, durée réelle plausible via `afinfo`), et accessibilité du lecteur (`AudioExercise.a2.test.tsx` : aria-label, navigation clavier, bascule humain/synthétique/erreur au clavier, `aria-expanded` de la transcription).
- `npm test` (suite complète, 261 tests + 8 tests SEO), `npm run lint`, `npx tsc --noEmit`, `npm run build` — voir rapport final.

**Non automatisable dans cet environnement — limite explicite :**
- **Aucune écoute humaine réelle des 30 fichiers n'a été faite.** La validation porte sur la présence, le format, la taille et la durée mesurée (`afinfo`) de chaque fichier, et sur la cohérence script ↔ transcript ↔ questions — pas sur la qualité perçue de la prononciation ou du débit. Les voix sont des voix système macOS de synthèse (comme l'intégralité de l'audio B1 actuel, voir `docs/b1/audio-human-recording-plan.md`) : elles sont intelligibles et au format attendu, mais ne remplacent pas un enregistrement humain. La même logique de repli humain → synthétique déjà en place pour le B1 (`AudioExercise.tsx`, `paths.ts: toHumanAudioPath`) s'applique nativement à ces pistes : déposer un jour un fichier dans `public/audio/a2/human/<id>.m4a` suffira à le faire remplacer la voix de synthèse, sans aucun changement de code.
- Aucun test de navigateur réel (Chrome) n'a été exécuté sur le lecteur audio — seuls des tests jsdom/vitest (accessibilité DOM, clavier simulé) ont été faits, comme pour l'équivalent B1 existant.

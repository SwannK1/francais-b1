# Bibliothèque audio A1 — intégration

**Statut :** bibliothèque audio A1 complète et isolée, 65 pistes 100 % synthétiques (voix `say` macOS), livrée dans `chantier/a1-audio`. **Non raccordée** au parcours pédagogique central (pas d'entrée dans `lib/pedagogy/data`, pas de page qui les affiche) — ce document sert précisément à documenter comment faire ce raccordement plus tard, sans que ce chantier n'ait eu besoin de toucher au contenu A1 (chantier séparé, en cours en parallèle).

Isolation respectée : aucun fichier de `lib/pedagogy/data/`, `lib/pedagogy/types.ts`, `lib/pedagogy/audio/manifest.ts` (B1), `app/`, `components/` (hors ce doc) n'a été modifié. Tout le travail vit dans des fichiers dédiés :

- `lib/pedagogy/audio/a1/` — types, voix, manifest, statut disque, tests
- `public/audio/a1/<theme>/*.m4a` — 65 fichiers audio
- `scripts/a1-audio/` — génération et statut
- `docs/integration/a1-audio.md` — ce fichier

---

## 1. Inventaire complet

**65 pistes**, réparties sur 17 thèmes, 18,0 minutes d'audio mesurées, 4,77 Mo au total. Aucune piste manquante, aucun fichier orphelin, aucun fichier de taille nulle (vérifié par `npm test` et `node scripts/a1-audio/status.mjs`).

| Thème (dossier `public/audio/a1/<theme>/`) | Pistes | Durée mesurée |
|---|---|---|
| `salutations` | 4 | 66 s |
| `presentations` | 4 | 79 s |
| `nombres-telephone` | 4 | 64 s |
| `dates-heures` | 4 | 56 s |
| `prix-achats` | 4 | 71 s |
| `famille` | 4 | 78 s |
| `description` | 3 | 35 s |
| `cafe-restaurant` | 4 | 60 s |
| `petites-annonces` | 3 | 44 s |
| `directions` | 4 | 67 s |
| `transports` | 4 | 47 s |
| `meteo` | 3 | 40 s |
| `quotidien-loisirs` | 5 | 85 s |
| `rendez-vous` | 4 | 73 s |
| `messages-vocaux` | 4 | 44 s |
| `consignes` | 3 | 26 s |
| `bilan` (synthèse fin A1) | 4 | 144 s |
| **Total** | **65** | **≈ 1079 s (18,0 min)** |

Couverture des situations demandées : salutations, présentations, noms, âge, nationalités, nombres, téléphone, dates, heures, prix, famille, descriptions simples, commande au café, petites annonces, magasin, directions, transports, météo, activités quotidiennes, loisirs, rendez-vous, messages vocaux simples, consignes simples — chacune a au moins un thème dédié avec ≥ 2 pistes (vérifié par le test « couvre tous les thèmes... »).

Types de pistes produits : monologues (17), dialogues (37), annonces (5), messages vocaux (6), consignes (3) — mélange volontairement varié plutôt qu'un seul format répété (`kind` dans le manifest).

Détail piste par piste (id, script, locuteurs, questions) : voir directement `lib/pedagogy/audio/a1/manifest.ts`, seule source de vérité — non reproduit ici pour éviter une double maintenance. Rapport lisible équivalent : `node scripts/a1-audio/status.mjs`.

---

## 2. Difficulté et progression

Deux paliers internes (`A1Level` : `"A1.1" | "A1.2"`, champ `level` du manifest) :

- **A1.1** (28 pistes) : débit lent (128 mots/min), phrases très courtes, une information à la fois, souvent un seul locuteur ou un dialogue à deux répliques très simples. Plusieurs monologues utilisent des marqueurs de pause `say` (`[[slnc 400]]`) pour marquer une vraie respiration entre deux informations (ex. `a1-nombres-compter-dix`, `a1-dates-jours-semaine`).
- **A1.2** (37 pistes) : débit naturel (165 mots/min, 180 pour les annonces officielles), mini-dialogues à 2-3 locuteurs, plusieurs informations à retenir dans une même piste, reformulations naturelles (« Vendredi à seize heures, c'est mieux pour moi » reformule une proposition). Les 4 pistes `bilan` combinent volontairement plusieurs informations (date + prix + lieu, ou quatre thèmes dans une seule conversation) pour tester une vraie synthèse de fin de niveau, sans jamais tomber dans un français artificiellement robotique — les dialogues gardent des hésitations, reformulations et tours de parole naturels.

---

## 3. Voix

Toutes les pistes utilisent la synthèse vocale macOS (`say`), **aucun outil externe ni téléchargement**. Audit réalisé avant tout choix (voir le commentaire complet dans `lib/pedagogy/audio/a1/voices.ts`) :

- 9 voix `fr_FR` distinctes sont listées par `say -v '?'` : Eddy, Flo, Grandma, Grandpa, Jacques, Rocko, Sandy, Shelley, Thomas.
- Des voix de meilleure qualité nominale (Audrey, Aurélie, les voix neurales « Marie »/« Daniel ») ont des fichiers d'assets présents sur le disque système mais **ne sont pas activées** : `say -v Audrey ...` produit un fichier strictement identique (comparaison binaire) à `say -v Thomas ...`, c'est-à-dire une bascule silencieuse vers Thomas — pas une vraie voix Audrey. Vérifié aussi pour Aurelie/Marie. Ces voix ne sont donc **pas utilisées** : les activer demanderait un téléchargement via Réglages Système, explicitement hors périmètre pour un chantier autonome sans intervention humaine.
- Les 9 voix candidates ont été vérifiées **mutuellement distinctes** par comparaison binaire deux à deux (pas d'alias silencieux entre elles).

**7 voix retenues** sur les 9, avec un rôle récurrent stable par personnage (jamais deux locuteurs d'un même dialogue sur la même voix — vérifié par un test dédié) :

| Voix | Genre | Rôles récurrents |
|---|---|---|
| Thomas | H | Marc, Narrateur (annonces), Livreur |
| Jacques | H | Karim, vendeurs/employés hommes |
| Flo | F | Léa, vendeuses/réceptionnistes |
| Shelley | F | Nadia, agent de voyage |
| Sandy | F | Sophie, rôle féminin tertiaire |
| Grandma | F | Mamie — réservée au thème `famille`, usage réaliste |
| Grandpa | H | Papi — réservée au thème `famille` |

Eddy et Rocko ne sont pas utilisées (7 voix suffisent à couvrir toutes les pistes sans ambiguïté de tour de parole).

---

## 4. Pipeline technique (scripts A1, isolé du pipeline B1)

`say` ne synthétise qu'une seule voix par appel et ne sait pas nativement produire un dialogue à plusieurs voix dans un seul fichier. Pipeline construit pour contourner cette limite sans aucun outil externe (pas de ffmpeg/sox disponibles sur la machine) :

1. **`say -v <voix> -r <débit> -o turn.aiff "<texte>"`** — un fichier AIFF par réplique.
2. **`afconvert -f AIFF -d BEI16@44100 -c 1`** — normalisation de chaque réplique au même format PCM (les voix `say` n'ont pas toutes le même sample rate natif ; la concaténation brute exige un format identique).
3. **`scripts/a1-audio/aiff-concat.mjs`** — concaténateur AIFF écrit pour ce chantier (parseur de chunks FORM/COMM/SSND, ~110 lignes) : recolle les répliques normalisées bout à bout avec un silence de 400 ms entre chaque réplique (250 ms pour une piste à un seul locuteur) et 900 ms de silence final, conformément à la convention B1 (§7 du plan d'enregistrement humain B1).
4. **`afconvert -f m4af -d aac -b 120000`** — conversion finale en `.m4a` AAC mono 44,1 kHz ~120 kbps, au chemin conventionnel `public/audio/a1/<theme>/<filename>`. Même format que les pistes synthétiques B1 (`Content-Type: audio/mp4` déjà géré par Next.js, pas de configuration supplémentaire).

Scripts :

| Fichier | Rôle |
|---|---|
| `lib/pedagogy/audio/a1/manifest.ts` | Source de vérité : 65 `A1AudioTrack` (script, locuteurs, débit, questions) |
| `lib/pedagogy/audio/a1/voices.ts` | Roster des 7 voix retenues + débits par palier |
| `lib/pedagogy/audio/a1/paths.ts` | Convention de chemin, pure (`/audio/a1/<theme>/<filename>`, futur `human/` frère) |
| `lib/pedagogy/audio/a1/status.ts` | Disponibilité disque (réutilise les primitives génériques de `lib/pedagogy/audio/status.ts` — B1, sans dépendre de son contenu) |
| `lib/pedagogy/audio/a1/a1-audio.test.ts` | 16 tests d'intégrité (structure + disque) |
| `scripts/a1-audio/generate.mjs` | Génère les fichiers manquants (`--force` régénère tout, `--id=<id>` cible une piste) |
| `scripts/a1-audio/aiff-concat.mjs` | Concaténateur AIFF (dialogues multi-voix) |
| `scripts/a1-audio/status.mjs` | Rapport de couverture (équivalent A1 de `npm run audio:status`) |

Aucune entrée n'a été ajoutée à `package.json` (`scripts`) pour éviter tout risque de conflit sur un fichier partagé activement édité par d'autres chantiers — invocation directe :

```
node scripts/a1-audio/generate.mjs
node scripts/a1-audio/status.mjs
```

---

## 5. Compréhension orale

Chaque piste porte ses propres questions de compréhension (`questions` dans le manifest, forme `qcm` ou `vrai_faux`, avec `correction.explanation` justifiant la réponse à partir du texte exact) — **données créées dans ce chantier, dans un fichier audio dédié**, sans toucher au contenu A1 central, conformément à la consigne. 1 à 3 questions par piste, 106 questions au total.

Ces questions ne sont **pas encore reliées** à un composant `QuizQuestion`/`AudioExercise` ni à un exercice `comprehension_orale` du cœur pédagogique — voir §7 pour le raccordement prévu.

---

## 6. Fallback, accessibilité, robustesse

Le mécanisme de repli B1 (`lib/pedagogy/audio/playback.ts`, `AudioExercise.tsx`) est générique et **directement réutilisable sans modification** : il résout une source depuis n'importe quel couple `(humanSrc, syntheticSrc)`, avec cycle humain → synthétique → erreur propre, jamais de lecteur figé silencieusement. `lib/pedagogy/audio/a1/paths.ts` respecte exactement la même convention de chemin humain (`<dossier>/human/<même nom de fichier>`) que le B1, donc `toHumanAudioPath`-style resolution fonctionnera identiquement une fois branché (voir §7).

Accessibilité déjà garantie par ce composant existant, vérifiée en le relisant (aucune modification nécessaire) :
- `aria-label` sur l'élément `<audio>` (`Audio : <instructions>`)
- Bouton « Afficher/Masquer la transcription » avec `aria-expanded`
- `preload="none"` : aucune lecture automatique, aucun chargement avant clic utilisateur
- Bouton « Réessayer » explicite en cas d'échec des deux sources
- Boutons natifs `<button type="button">`, focusables au clavier, labellisés en texte visible (pas d'icône seule)

Aucune modification requise pour bénéficier de ces garanties : il suffit de passer un objet compatible `ComprehensionOraleExercise` (voir §7).

---

## 7. Raccordement au parcours central (à faire par/avec le chantier contenu A1)

**Non fait volontairement** — le chantier « contenu A1 » possède `lib/pedagogy/data/` et `lib/pedagogy/types.ts` (`StageId` n'a par exemple aujourd'hui aucune valeur A1 dans ce worktree). Toucher ces fichiers ici aurait un risque de conflit direct avec ce travail en cours.

Étapes attendues lors du raccordement, une fois des modules A1 avec des exercices `comprehension_orale` existeront dans `lib/pedagogy/data/modules.ts` :

1. **Correspondance piste ↔ exercice.** Chaque `A1AudioTrack.id` (`lib/pedagogy/audio/a1/manifest.ts`) devrait devenir l'`id` d'un exercice `comprehension_orale` réel. `A1AudioTrack.skillLabel` documente la compétence entraînée en clair (aucun `skillId` réel résolu ici, volontairement — ce chantier n'a pas la liste `SKILLS` sous les yeux) : à faire correspondre à un `skillId` existant au moment du raccordement.
2. **Questions.** `A1AudioTrack.questions` (forme `A1Question`, qui recopie volontairement `Question`/`Correction` de `lib/pedagogy/types.ts` à l'identique) peut être copié tel quel dans le champ `questions` de l'exercice réel — même structure `qcm`/`vrai_faux`, mêmes clés. Pas de transformation nécessaire, juste un copier-coller contrôlé.
3. **Audio.** `exercise.audioSrc` de l'exercice réel = `a1SyntheticSrc(track)` (ex. `/audio/a1/salutations/bonjour-matin.m4a`) — les fichiers existent déjà dans `public/`, aucun nouveau fichier à produire à ce stade.
4. **Transcript.** `exercise.transcript` = `formatA1Transcript(track)` (`lib/pedagogy/audio/a1/types.ts`) — déjà le bon format (une réplique par ligne, `Rôle — texte` si plusieurs locuteurs), identique à la convention B1.
5. **Manifest global.** Une fois les exercices réels créés, `lib/pedagogy/audio/manifest.ts` (B1) les référencera automatiquement — c'est un manifest *dérivé* de `MODULES`/`EXAMS` (voir son en-tête), rien à ajouter à la main dans ce fichier. Seule `AUDIO_PRODUCTION_META` (locuteurs/voix/intention par id) devra être complétée pour chaque piste A1 — les valeurs existent déjà dans `lib/pedagogy/audio/a1/manifest.ts` (`speakers`, `intention`, `pace`) et peuvent être copiées directement dans ce format.
6. **Dépréciation de ce manifest isolé.** Une fois le raccordement fait, `lib/pedagogy/audio/a1/manifest.ts` et son test dédié (`a1-audio.test.ts`) deviennent redondants avec le manifest central et `content-integrity.test.ts` — à supprimer à ce moment-là (pas avant, pour ne pas perdre la seule source de vérité en attendant).

### Sécurité premium (à respecter strictement au raccordement)

Le champ `A1AudioTrack.premium` (6 pistes sur 65 : `a1-famille-reunion-dimanche`, `a1-quotidien-recit-samedi`, et les 4 pistes `bilan`) est un **marqueur informatif seulement** — ce manifest n'est importé par aucune page aujourd'hui, donc aucune fuite possible actuellement. Au raccordement, respecter exactement le principe déjà en place pour le B1 (voir `lib/pedagogy/data/index.ts` et `docs/architecture/user-lifecycle.md` § Premium content boundary) : le contenu intégral (transcript, `audioSrc`, réponses) ne doit jamais atteindre un composant `"use client"` pour un module dont l'accès n'a pas été vérifié côté serveur — passer par `PublicModule`/`modules-public.ts` pour toute donnée de navigation, jamais par `Module` complet.

---

## 8. QA effectuée vs QA manuelle recommandée

**Fait par ce chantier (automatisable, vérifié réellement) :**
- Existence de chaque fichier sur disque, taille non nulle (`npm test`, `node scripts/a1-audio/status.mjs`)
- Décodage : chaque `.m4a` relu avec succès par `afinfo` (durée extraite pour les 65 pistes, aucune erreur de décodage)
- Absence de silence total : un fichier témoin a été redécodé en PCM et son amplitude mesurée (`maxAbs ≈ 30923/32767`, `meanAbs ≈ 2119` sur `se-presenter.m4a`) — signal réel, pas un fichier silencieux
- Cohérence script ↔ fichier : le texte synthétisé est exactement `turns[].text` du manifest (aucune étape manuelle de retranscription possible qui diverge)
- Noms de fichiers conformes à la convention, aucune référence cassée, aucun orphelin, aucun doublon d'id ou de fichier synthétique (tests dédiés)
- Absence de voix dupliquée au sein d'un même dialogue (test dédié)

**Non fait — nécessite une écoute humaine, à faire avant toute mise en avant commerciale :**
- Qualité perçue réelle des voix « personnage » (Flo, Shelley, Sandy, Grandma, Grandpa) sur du contenu long — vérifiées seulement comme *distinctes techniquement*, jamais écoutées par une oreille humaine dans ce chantier
- Naturel du débit choisi (128/165/180 mots/min) — valeurs choisies par cohérence avec le plan B1, jamais validées à l'oreille
- Qualité des transitions entre répliques recollées (le silence de 400 ms est-il perceptible comme naturel ou mécanique ?)
- Prononciation des nombres/heures complexes par les voix personnage (jamais vérifiée par le pack B1 non plus, qui n'utilisait que Thomas/Amélie)

**Recommandation :** avant intégration commerciale, écouter au minimum les 4 pistes `bilan` (les plus longues, les plus exposées si mises en avant comme test de fin de niveau) et une piste par voix personnage.

---

## 9. Tests, lint, tsc, build

- `npm test` : ✅ vert, 16 tests dédiés A1 (`a1-audio.test.ts`) + suite existante inchangée
- `npm run lint` : ✅ aucune erreur
- `npx tsc --noEmit` : ✅ aucune erreur (une fois `.next/types` généré par un premier `npm run build` — comportement Next.js standard sur un worktree neuf, sans lien avec ce chantier)
- `npm run build` : ✅ build complet réussi

---

## 10. Risques et points d'attention

- **Pas de fichier humain** : les 65 pistes sont 100 % synthétiques, comme les 18 pistes B1 avant enregistrement. Même statut, même mécanisme de repli déjà prêt à recevoir un futur fichier humain sans modification de code.
- **Contenu jamais raccordé** : sans les étapes du §7, ces pistes ne sont visibles nulle part dans l'application. C'est intentionnel (isolation), mais signifie que ce travail n'a de valeur qu'une fois le raccordement fait.
- **`A1Question`/`Correction` dupliqués** : ce chantier a choisi la duplication de types plutôt qu'une dépendance vers `lib/pedagogy/types.ts` (qui appartient au chantier contenu, en évolution parallèle). Le rapprochement (suppression du doublon) est une étape volontaire du §7, pas un oubli.
- **Voix synthétiques uniquement** : qualité correcte pour de l'entraînement (voix Apple standard), mais pas au niveau d'un enregistrement humain professionnel — même limite que le pack B1 avant son propre chantier d'enregistrement humain.
- **Worktree instable pendant ce chantier** : le dossier de travail (`francais-b1-a1-audio`) a été supprimé par une opération externe pendant la première génération (tous les worktrees de chantiers du Desktop ont disparu simultanément), avant tout commit. Le worktree a été recréé depuis la branche `chantier/a1-audio` (aucune perte côté git, la branche n'avait pas encore de commit de ce chantier) et l'intégralité du travail — code et 65 fichiers audio — a été reconstruite à l'identique puis commitée immédiatement. Leçon pour la suite : committer plus fréquemment en cours de chantier sur ce type d'environnement multi-worktree partagé.

---

## Conclusion

**CHANTIER A1 AUDIO COMPLET — PRÊT À INTÉGRER**

(Complet et vérifié sur son propre périmètre isolé ; le raccordement au parcours central au sens strict — §7 — reste une étape distincte, dépendante du chantier contenu A1, décrite ci-dessus mais non exécutée ici par choix d'isolation.)

---
title: Audit pédagogique du parcours B1 — 2026
level: B1
type: pedagogical-audit
lastUpdated: 2026-09-02
---

# Audit pédagogique du parcours B1 (26 modules)

Audit complet des 26 modules réellement livrés dans `lib/pedagogy/data/modules.ts`
(9 455 lignes), fondé sur les données de code — pas seulement sur
`docs/b1/curriculum.md` — après extraction d'une matrice structurée (compte
d'exercices, de vocabulaire, de leçons, de compétences par module) et lecture
détaillée d'un échantillon représentatif de contenu réel (modules pilotes,
modules courts, module bilan).

## 1. Matrice des 26 modules

| # | Slug | Titre | Étape | Domaine | Leçons | Exercices | Sous-Q | Vocab | Audio | Prod. orale | Seuil mini-éval |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | se-presenter | Se présenter | Début | grammaire | 4 | 9 | 4 | 12 | non | **oui (ajouté)** | 2/10 |
| 2 | raconter-une-experience-personnelle | Raconter une expérience personnelle | Début | grammaire | 4 | 8 | 4 | 14 | non | non | 2/10 |
| 3 | decrire-vie-quotidienne | Décrire sa vie quotidienne et ses habitudes | Début | vocabulaire | 5 | 18 | 7 | 25 | oui | non | 7/10 |
| 4 | chercher-un-logement | Chercher un logement | Début | comprehension_ecrite | 4 | 8 | 5 | 12 | non | non | 2/10 |
| 5 | habitudes-et-gouts | Parler de ses habitudes et de ses goûts *(court)* | Début | vocabulaire | 4 | 8 | 4 | 12 | non | non | 2/10 |
| 6 | faire-des-achats | Faire des achats et comparer *(court)* | Début | vocabulaire | 4 | 8 | 4 | 12 | non | non | 2/10 |
| 7 | discuter-avec-un-proprietaire | Discuter avec un propriétaire ou un voisin | Début | comprehension_orale | 4 | 8 | 4 | 11 | oui | non | 2/10 |
| 8 | raconter-un-evenement-passe ★ | Raconter un événement passé | Début | grammaire | 5 | 20 | 10 | 38 | oui | **oui (ajouté)** | 7/10 |
| 9 | comprendre-un-courrier-simple | Comprendre un courrier simple | Début | comprehension_ecrite | 5 | 18 | 6 | 18 | oui | non | 7/10 |
| 10 | prendre-rendez-vous | Prendre rendez-vous | Début | grammaire | 5 | 18 | 7 | 20 | oui | non | 7/10 |
| 11 | donner-son-opinion ★ | Donner son opinion | Intermédiaire | production_ecrite | 5 | 20 | 10 | 34 | oui | **oui (ajouté)** | 7/10 |
| 12 | comparer-modes-de-vie | Comparer des choses, des lieux, des modes de vie | Intermédiaire | production_ecrite | 4 | 8 | 4 | 12 | non | non | 2/10 |
| 13 | parler-de-ses-projets | Parler de ses projets | Intermédiaire | grammaire | 4 | 8 | 4 | 11 | oui | non | 2/10 |
| 14 | parler-de-son-travail-et-projets ★ | Parler de son travail et de ses projets | Intermédiaire | production_ecrite | 5 | 20 | 10 | 33 | oui | **oui (ajouté)** | 7/10 |
| 15 | aller-chez-le-medecin | Aller chez le médecin et parler de sa santé | Intermédiaire | comprehension_orale | 4 | 8 | 4 | 11 | oui | non | 2/10 |
| 16 | expliquer-un-probleme-et-demander-une-solution ★ | Expliquer un problème et demander une solution | Intermédiaire | production_ecrite | 5 | 19 | 10 | 37 | oui | non | 7/10 |
| 17 | faire-une-reclamation | Faire une réclamation | Intermédiaire | production_ecrite | 4 | 8 | 4 | 8 | non | non | 2/10 |
| 18 | comprendre-une-demarche-administrative ★ | Comprendre une démarche administrative | Intermédiaire | comprehension_ecrite | 5 | 19 | 10 | 34 | oui | non | 7/10 |
| 19 | parler-ecole-enfant | Parler de l'école de son enfant | Consolidation | comprehension_orale | 4 | 8 | 4 | 11 | oui | non | 2/10 |
| 20 | utiliser-les-transports | Utiliser les transports et comprendre une annonce | Consolidation | comprehension_orale | 5 | 18 | 7 | 18 | oui | non | 7/10 |
| 21 | rechercher-un-emploi | Rechercher un emploi et passer un entretien | Consolidation | production_ecrite | 4 | 9 | 4 | 11 | non | **oui (ajouté)** | 2/10 |
| 22 | hypothese-et-conseil | Exprimer une hypothèse et donner un conseil | Consolidation | grammaire | 4 | 8 | 4 | 9 | oui | non | 2/10 |
| 23 | rapporter-les-paroles | Rapporter les paroles de quelqu'un | Consolidation | production_ecrite | 4 | 8 | 4 | 8 | oui | non | 2/10 |
| 24 | organiser-un-voyage | Organiser un voyage | Consolidation | comprehension_ecrite | 4 | 8 | 4 | 11 | non | non | 2/10 |
| 25 | opinion-question-de-societe | Donner son opinion sur une question de société | Consolidation | production_ecrite | 4 | 8 | 4 | 7 | non | non | 2/10 |
| 26 | bilan-b1 | Bilan B1 : se présenter à un examen | Consolidation | comprehension_ecrite | 4 | 9 | 4 | 7 | non | **oui (ajouté)** | 2/10 |

★ = module pilote (rédigé en premier, sert de référence qualité). Colonnes
« Exercices »/« Prod. orale » reflètent l'état **après** les corrections de
ce chantier (6 modules enrichis, +1 exercice chacun).

**Total : 26 modules, 113 leçons, 309 exercices (303 avant ce chantier),
146 sous-questions, 62 compétences, 2 examens — inchangé hors les 6 ajouts.**

## 2. Modules modifiés dans ce chantier

| Module | Changement |
|---|---|
| `se-presenter` | + 1 exercice `production_orale` ("Se présenter à l'oral") ; tu/vous uniformisé dans la consigne écrite |
| `raconter-un-evenement-passe` ★ | + 1 exercice `production_orale` ("Raconter un imprévu à l'oral") |
| `donner-son-opinion` ★ | + 1 exercice `production_orale` ("Donner son avis à l'oral") |
| `parler-de-son-travail-et-projets` ★ | + 1 exercice `production_orale` ("Se présenter professionnellement à l'oral") |
| `rechercher-un-emploi` | + 1 exercice `production_orale` ("Répondre à des questions d'entretien") ; tu/vous uniformisé |
| `bilan-b1` | + 1 exercice `production_orale` calibré comme l'épreuve DELF (120s prép/120s parole) — voir §3 |
| `chercher-un-logement` | tu/vous uniformisé (question `reponse_courte`) |
| `discuter-avec-un-proprietaire` | tu/vous uniformisé (question `reponse_courte`) |
| `aller-chez-le-medecin` | tu/vous uniformisé (consigne `production_ecrite`) |
| `faire-une-reclamation` | tu/vous uniformisé (consigne `production_ecrite`) |
| `organiser-un-voyage` | tu/vous uniformisé (consigne `production_ecrite`) |

Tous les autres modules (15/26) : **aucun changement de contenu**, examinés et
jugés déjà solides.

## 3. Problème trouvé le plus significatif : zéro production orale dans les 26 modules

**Constat vérifié par le code** : `grep -c '"production_orale"' lib/pedagogy/data/modules.ts`
renvoyait **0** avant ce chantier, contre 6 occurrences dans `exams.ts`
(l'examen blanc DELF). Le composant `SpokenExercise.tsx` (enregistrement
micro, minuteur de préparation, auto-évaluation) était donc entièrement
fonctionnel et déjà utilisé... mais seulement en examen, jamais en
entraînement. Un apprenant qui arrive à l'examen blanc y pratique
l'enregistrement de sa voix pour la toute première fois, sans jamais s'y
être exercé dans le parcours qui est censé l'y préparer.

Aggravant : le module 26 « **Bilan B1 : se présenter à un examen** »
affirme explicitement « bilan transversal des 4 compétences » (DELF **et**
TCF IRN) dans ses `examLinks`, mais sa composition réelle avant ce
chantier était : compréhension écrite, grammaire, production écrite,
évaluation — **zéro compréhension orale, zéro production orale**. Une
« synthèse des 4 compétences » qui n'en couvre que 2 est une incohérence
concrète entre ce que le module promet et ce qu'il livre.

**Correction apportée** : ajout d'un exercice `production_orale` original
dans les 6 modules dont les `examLinks` déclarés mentionnaient déjà
explicitement « DELF B1 — production orale » (modules 1, 2, 9, 12, 14 pilote,
19 — numérotation curriculum) — situation, vocabulaire et compétence
réutilisés depuis le module lui-même, jamais un nouveau scénario
déconnecté. Le module bilan reçoit une tâche calibrée comme l'épreuve
réelle (120 s préparation / 120 s parole, mêmes critères d'auto-évaluation
que l'examen), sur un sujet **original** distinct de celui déjà utilisé
dans `exams.ts` (télétravail, plutôt que circulation en centre-ville).

**Ce qui n'a pas été corrigé, et pourquoi** : ajouter une compréhension
orale au module bilan (pour couvrir réellement les « 4 compétences »)
demanderait un nouveau fichier audio réel — hors périmètre et hors capacité
de cette session (« ne crée aucun vrai fichier audio humain », et aucun
outil de synthèse vocale n'est disponible ici). Généraliser la production
orale aux 20 autres modules serait un chantier de contenu à part entière,
pas une correction ponctuelle. Les 6 modules choisis sont ceux où le lien
DELF « production orale » était déjà explicitement annoncé — la correction
minimale qui rend une promesse déjà faite réellement tenue, sans en
fabriquer de nouvelles.

## 4. Alignement B1 (Phase 2)

Aucun module ne relève d'un niveau A1/A2 mal calibré : les structures
grammaticales (passé composé/imparfait, subjonctif après « il faut que »,
conditionnel, discours rapporté, connecteurs d'opposition/concession) et le
vocabulaire (démarches administratives, entretien d'embauche, réclamation
formelle) correspondent à un CECRL B1 réel, pas à une simplification A2
déguisée. Aucun module ne bascule non plus vers un B2 prématuré : le
subjonctif reste cantonné à « il faut que »/« pour que » + formes
régulières courantes (jamais le subjonctif imparfait ou des verbes
irréguliers rares), conformément au principe explicite de
`docs/b1/grammar/grammar-notions.md` (« le subjonctif reste volontairement
discret sur tout le B1 »). Vérifié par lecture directe d'un échantillon
(modules 1, 6★, 9★, 12★, 14★, 16★, 18★, 26) : aucune correction nécessaire
sur ce plan.

## 5. Progression (Phase 3)

La chaîne de prérequis documentée dans `curriculum.md` est cohérente : les
notions grammaticales lourdes (passé composé/imparfait, subjonctif,
discours rapporté) ne sont jamais introduites deux à la fois dans un même
module, et chaque notion « reprise » réutilise un module antérieur déjà
couvert (vérifié sur `grammar-notions.md`, lui-même cohérent avec les
`skillId` réellement utilisés dans `modules.ts` — aucune référence orpheline,
confirmé par `content-integrity.test.ts`). Aucun saut brutal de difficulté
ni compétence utilisée avant d'être enseignée détecté.

**Manque réel identifié, non corrigé** : deux notions grammaticales du
programme éditorial (« quantité / partitifs » et « négation de base »,
introduites au Module 3) n'ont **pas** de `skillId` dédié dans `skills.ts`
— elles sont absorbées dans `gr-present-habitudes`. Conséquence concrète :
`weakSkillIds` (compétences faibles, page `/reviser`) ne peut jamais
signaler spécifiquement une difficulté sur la négation ou les partitifs,
seulement sur « présent/habitudes » en bloc. Corriger cela proprement
demanderait de créer 2 nouveaux `skillId`, de retagger les exercices
concernés, et de vérifier l'impact sur le calcul de progression existant —
un changement d'architecture de compétences, pas un ajustement de contenu.
Documenté ici plutôt que traité par prudence (risque de casser le calcul
de progression pour un gain de granularité modeste).

## 6. Notions grammaticales (Phase 4)

Couverture vérifiée entre `grammar-notions.md` et les 21 `skillId` de type
`gr-*` réellement présents dans `skills.ts` : présent, passé composé,
imparfait, plus-que-parfait, futur proche/simple, conditionnel (politesse
et hypothèse), impératif, subjonctif présent (usage restreint), pronoms
compléments, pronoms y/en, pronoms relatifs (qui/que/où et dont),
comparatif/superlatif, négation (base et renforcée), connecteurs
(chronologiques, logiques, de choix), cause/conséquence/but,
opposition/concession, hypothèse, discours rapporté. **Trou réel identifié**
au §5 (quantité/partitifs et négation de base sans `skillId` dédié) — le
seul trou de couverture trouvé. Aucune notion forcée artificiellement :
le programme n'essaie pas de caser, par exemple, le subjonctif imparfait
ou la voix passive, absents à raison d'un vrai B1.

## 7. Vocabulaire (Phase 5)

17 domaines lexicaux documentés dans `vocabulary-domains.md`, tous
retrouvés dans les données réelles (`voc-*` skillId). Répartition
équilibrée entre survie administrative (logement, santé, administration),
vie professionnelle (travail, recherche d'emploi) et vie sociale (opinion,
relations, société) — pas de sur-représentation d'un seul domaine.
Vocabulaire réutilisable dans la vraie vie (« caution », « préavis »,
« pièce justificative », « entretien d'embauche »), pas de vocabulaire
scolaire abstrait déconnecté d'un usage réel. Principe de réemploi
(un mot appris une fois n'est pas re-glosé) confirmé par lecture croisée
des modules 4 (loyer) et 19/curriculum (budget) — cohérent.

## 8. Compréhension écrite et orale (Phase 6-7)

**Diversité des textes** (échantillon lu en entier) : message WhatsApp entre
voisins, annonce immobilière, courrier CAF, billet de blog, dialogue
médical — pas de texte artificiel construit uniquement pour caser une règle ;
chaque texte porte une vraie situation de vie en France.

**Audio** : 15 des 26 modules (58 %) incluent un exercice `comprehension_orale`
avec un fichier `.m4a` réel (18 fichiers audio au total avec les 2 examens et
la démo — tous référencés, aucun orphelin, vérifié). Chaque audio a un
transcript (vérifié : 0 exercice sans transcript sur les 15 — désormais
également gardé par un test automatique, voir §12). **11 modules (42 %)
n'ont aucun exercice audio** — répartition qui suit approximativement le
`domain` déclaré du module (un module `comprehension_ecrite` privilégie la
lecture, un `comprehension_orale` l'écoute), mais reste un choix éditorial
qui pourrait, dans un futur chantier de contenu, être rééquilibré pour que
davantage de modules pratiquent l'écoute — non traité ici : cela
demanderait de nouveaux fichiers audio, hors capacité de cette session.

## 9. Exercices et distracteurs (Phase 8-9)

Inventaire par type sur les 309 exercices : `qcm`, `vrai_faux`,
`texte_a_trous`, `remise_en_ordre`, `association`, `comprehension_ecrite`,
`comprehension_orale`, `reponse_courte`, `production_ecrite`, et
désormais `production_orale` (6). Aucun module ne se limite à un seul
format : même les modules « courts » (8-9 exercices) couvrent 6 à 7 types
différents. Distracteurs QCM échantillonnés (modules 1, 26) : plausibles
sans être absurdes — ex. une question sur une ville propose l'origine
réelle de la locutrice comme piège plausible, pas une option aléatoire ;
les distracteurs grammaticaux (ordre des mots avec « est-ce que ») testent
une vraie erreur d'apprenant, pas un choix arbitraire. Aucune ambiguïté ni
réponse absurde trouvée dans l'échantillon lu.

## 10. Feedback (Phase 10)

**Force** : les 448 champs `explanation` du jeu de données sont tous
substantiels (le plus court fait 29 caractères et reste une phrase complète
et référencée au contenu — jamais un « Faux » nu). Aucune trace de feedback
générique détectée.

**Manque réel, non corrigé** : les champs optionnels `rappelRegle` et
`conseil` de `Correction` — conçus précisément pour rappeler une règle ou
donner un conseil stratégique, et déjà affichés par `CorrectionPanel`
lorsqu'ils sont présents — ne sont utilisés **nulle part** dans les 392
objets `Correction` du programme. Le feedback fonctionne (explique le
pourquoi de la bonne réponse) mais n'exploite pas cette occasion de
renforcement explicite de la règle. Combler ce manque pour 392 corrections
serait un chantier de contenu à part entière (à l'échelle de la rédaction
initiale des modules) — documenté plutôt que traité partiellement, pour
éviter un remplissage inégal en fin de session.

## 11. Révision et réactivation (Phase 11)

Le mécanisme de réactivation espacée existe déjà au niveau **produit**
(fonctionnalité livrée dans un chantier concurrent pendant cet audit — voir
`lib/pedagogy/logic/review.ts`, page `/reviser` : modules marqués « à
revoir », compétences faibles, modules laissés en cours, épreuves sous 50 %).
Au niveau **contenu**, la réactivation par la donnée elle-même est déjà
prévue dans `grammar-notions.md` (chaque notion listée avec son point de
reprise) et vérifiée cohérente au §5 — pas de nouveau système algorithmique
ajouté ici, conformément à la consigne.

## 12. Intégrité du contenu (Phase 17) — renforcée

`lib/pedagogy/data/content-integrity.test.ts` couvrait déjà largement ce
qui est demandé (ids/slugs uniques, références de compétence/étape valides,
modules non vides, exercices présents, réponses cohérentes par type
d'exercice, audio existant, absence de placeholder/TODO). Deux garde-fous
ajoutés dans ce chantier :

- **Transcript obligatoire** pour tout exercice `comprehension_orale` (aucun
  des 15 exercices actuels n'en manquait, mais rien ne l'empêchait avant).
- **`maxSpeakSeconds` valide** (> 0 si renseigné) pour `production_orale` —
  seul `prepSeconds` était vérifié auparavant.

18 tests, tous verts après les 6 ajouts de contenu et les 8 corrections
tu/vous.

## 13. Cohérence éditoriale (Phase 14)

**Trouvé et corrigé** : 8 consignes/questions sur 28 (`production_ecrite`,
`reponse_courte`) vouvoyaient l'apprenant (« Vous venez d'emménager... »,
« Écrivez... ») alors que le reste du produit — descriptions de module,
UI, et les 20 autres consignes du même type — le tutoie systématiquement
(« à la fin de ce module, tu pourras... »). Uniformisé vers le tutoiement,
avec les accords de conjugaison corrects (« Vous avez acheté » → « Tu as
acheté », etc.). Deux occurrences de « vous » **volontairement laissées** :
un distracteur QCM testant une forme interrogative fautive, et une citation
réaliste d'un recruteur s'adressant formellement à un candidat en entretien
d'embauche (registre correct dans son contexte, pas une adresse à
l'apprenant).

## 14. Doublons (Phase 15)

Aucun contenu quasi identique trouvé entre modules : chaque situation
(personnages, lieu, enjeu) est distincte, y compris entre les deux modules
courts de structure similaire (`habitudes-et-gouts` et `faire-des-achats`),
qui partagent un gabarit (8 exercices) mais pas de contenu.

## 15. DELF / TCF (Phase 13)

`exams.ts` reste cohérent avec le parcours : `examLinks` déclarés dans
chaque module pointent vers de vraies sections DELF/TCF, et l'examen blanc
(`delf-b1-examen-blanc-1`) décrit précisément sa différence avec le vrai
DELF (« documents audio réécoutables librement, alors qu'ils ne sont
diffusés que deux fois le jour de l'examen ») — aucune promesse de
réussite garantie détectée dans les descriptions. Le module bilan (§3) est
la seule vraie incohérence trouvée, partiellement corrigée.

## 16. Manques réels — liste complète

Traités dans ce chantier :
1. Zéro `production_orale` dans les modules → 6 exercices ajoutés (§3).
2. Transcript non garanti par un test → test ajouté (§12).
3. `maxSpeakSeconds` non validé → test ajouté (§12).
4. Incohérence tu/vous → 8 corrections (§13).

Non traités, documentés pour un futur chantier :
5. `bilan-b1` n'a toujours pas de compréhension orale (nécessite un nouveau
   fichier audio réel — hors capacité de cette session).
6. « Quantité/partitifs » et « négation de base » sans `skillId` dédié
   (§5) — changement d'architecture de compétences, pas de contenu.
7. `rappelRegle`/`conseil` jamais renseignés sur 392 corrections (§10) —
   ampleur d'un chantier de contenu à part entière.
8. Seulement 15/26 modules pratiquent l'écoute (§8) — rééquilibrage
   éventuel nécessitant de nouveaux audios.

## 17. Risques

- Les 6 nouveaux exercices `production_orale` n'ont pas été relus par un
  locuteur natif tiers autre que cette session — qualité linguistique
  vérifiée par relecture attentive, mais pas de double validation humaine.
- Le module bilan continue d'afficher « bilan transversal des 4
  compétences » alors qu'il ne couvre encore que 3/4 (CE, PE, PO — toujours
  pas de CO) : partiellement corrigé seulement, le risque d'affirmation
  légèrement optimiste subsiste tant qu'un audio n'est pas ajouté.

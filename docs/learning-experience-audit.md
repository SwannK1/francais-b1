# Audit de l’expérience apprenant

Document de travail du chantier « excellence pédagogique ». Les constats sont reliés à une correction vérifiable ; les améliorations purement cosmétiques restent hors périmètre.

## Parcours réel

| Étape | Ce qui fonctionne | Friction ou risque | Priorité | Correction proposée | Statut |
|---|---|---|---|---|---|
| Diagnostic → résultat | Niveau, forces et recommandations alimentent la progression existante | À confirmer sur les cas limites A1/A2/B1 | P1 | QA ciblée et tests de cohérence | À auditer |
| Résultat → parcours | Le niveau effectif suit l’avancement, même après le niveau diagnostiqué | Deux actions proches peuvent concurrencer la séance recommandée | P2 | Vérifier la hiérarchie en QA, conserver si elle reste claire | À auditer |
| Parcours → séance du jour | Séance déterministe, courte, ordonnée et compatible A1/A2/B1 | La priorité avancée de `/reviser` n’alimentait pas la séance ; l’ordre brut de `weakSkillIds` gagnait | P1 | Réutiliser la priorité du moteur de révision espacé dans la séance | Corrigé, tests en cours |
| Exercice → feedback | Chaque exercice dispose d’une correction structurée dans le modèle | Qualité éditoriale inégale possible ; à mesurer sur échantillon | P1 | Échantillon début/milieu/fin par niveau | À auditer |
| Erreur → révision | Résultats récents, erreurs répétées et ancienneté alimentent `/reviser` | La boucle s’arrêtait avant la Daily Session | P1 | Ajouter le rappel prioritaire et cibler la compétence fragile | Corrigé, tests en cours |
| Progression → maîtrise | Compétences et taux de réussite sont visibles | Une seule bonne réponse sur dix pouvait afficher une barre à 100 %, confondant réussite et couverture | P1 | Barre = couverture ; réussite affichée séparément | Corrigé, tests en cours |
| Révision → nouvelle tentative | Les liens ramènent vers un vrai module du catalogue | Vérifier la sortie de révision après réussite | P1 | Tests moteur + QA du parcours | À auditer |
| Évaluation → passage de niveau | Parcours unifié et niveaux effectifs existent | Couverture et seuils à valider pédagogiquement | P1 | Audit ciblé des transitions A1→A2 et A2→B1 | À auditer |
| Production → maîtrise | Des productions écrites et orales contextualisées existent aux trois niveaux | Toute production envoyée était comptée correcte, sans tenir compte de la grille | P0 | Faire de l’auto-évaluation existante le signal de réussite | Corrigé et validé |
| Mini-bilan → consigne | Les questions et corrections sont structurées | 189 exercices affichaient un repère interne (« Item N. ») au lieu d’indiquer l’action attendue | P1 | Déduire une consigne claire du type, uniquement pour ce placeholder | Corrigé et validé |

## Lots

## Échantillon pédagogique représentatif

| Niveau | Début | Milieu | Fin | Constat principal |
|---|---|---|---|---|
| A1 | Se saluer et se présenter | Faire les courses | Bilan / banque d’écoute | Consignes et feedback fermés solides ; production simple adaptée ; écoute surtout distribuée dans 11/26 modules cœur et la banque dédiée |
| A2 | Se présenter en détail | Parler de son travail | Bilan / banque d’écoute | Production très présente (21/22 modules cœur), progression vers le récit et les situations quotidiennes cohérente |
| B1 | Se présenter | Travail et projets | Bilan B1 | Contextes plausibles et écrit fréquent ; oral guidé sous-représenté dans les modules cœur (6/26) malgré la route orale séparée |

Le comptage transversal confirme 11/26, 10/22 et 16/26 modules cœur avec compréhension orale pour A1, A2 et B1. Le produit dispose bien de 115 fichiers audio, mais leur présence en banque séparée ne garantit pas leur réutilisation au moment où une compétence est apprise. L’intégration contextuelle de l’écoute et le renforcement de l’oral B1 restent des P1 éditoriaux ; ils ne justifient pas une génération audio globale dans ce chantier.

## Transitions et évaluations

- Les passages A1→A2 et A2→B1 couvrent compréhension écrite, vocabulaire, grammaire, compréhension orale et production guidée, avec seuil global documenté à 60 %.
- Les résultats par dimension signalent les lacunes ; la production guidée reste explicitement auto-évaluée et n’est pas présentée comme une note officielle.
- Correction : une tentative finalisée produit désormais dans `UserProgress` une preuve compacte (verdict, score, date et dimensions faibles), sans réponses individuelles. Une réussite de passage peut relever le niveau ; un échec, un abandon ou une tentative incomplète ne le peut jamais.
- Compatibilité : le nouveau champ reste optionnel pour les anciens documents JSONB, est initialisé pour les nouveaux profils et fusionné sans doublon entre appareils. Une preuve de passage réussie protège aussi le niveau contre une régression lors de la fusion.
- Gain sûr appliqué : la liste des évaluations réaffiche désormais la dernière tentative locale réelle (score et seuil atteint / consolidation) ou signale une tentative à reprendre. Aucun score n’est déduit d’une activité incomplète et aucune réponse protégée n’est envoyée au client.

### Lot 4 — preuve d’évaluation centrale

- Passage A1→A2 et A2→B1 : le niveau est relevé uniquement après une tentative `completed`, un score complet et un seuil atteint.
- Échec complet : preuve conservée avec les dimensions insuffisantes, niveau inchangé.
- Tentative en cours, abandonnée ou incomplète : preuve refusée.
- Synchronisation : union par identifiant de tentative ; les réponses détaillées restent dans le stockage d’évaluation et ne sont jamais envoyées dans la progression centrale.

### Lot 5 — remédiation après un passage insuffisant

- Problème démontré : les dimensions faibles d’un passage raté étaient désormais conservées, mais la prochaine action continuait à suivre seulement l’ordre générique du parcours.
- Décision : après toute reprise réellement commencée, cibler le premier module incomplet et accessible correspondant à l’une des dimensions faibles du dernier passage du niveau courant.
- Explication apprenant : la carte de reprise et la Session du jour peuvent afficher la raison factuelle issue du passage (« priorité en compréhension orale », par exemple).
- Garde-fous : une réussite plus récente annule l’ancienne remédiation ; un module verrouillé est ignoré ; aucun échec, abandon ou résultat incomplet n’est transformé en preuve par le lot précédent.

### Lot 6 — production orale B1 ciblée

- Inventaire : 6 modules cœur B1 sur 26 proposaient une production orale avant ce lot. Les 20 absences restantes ont été classées selon la valeur communicative, sans viser une couverture artificielle à 100 %.
- Catégorie A intégrée : raconter une expérience, téléphoner pour visiter un logement, expliquer ses symptômes en consultation, négocier une réclamation et nuancer une opinion dans une discussion.
- Catégorie B conservée pour revue ultérieure : prise de rendez-vous, projets, entretien professionnel, conseil, voyage et clarification administrative ; ajout seulement si les tests apprenants montrent un besoin.
- Catégorie C conservée sans oral ajouté : modules centrés sur la réception d’un courrier, une annonce de transport ou un point grammatical quand la répétition orale n’apporterait pas une interaction authentique.
- Chaque ajout contient une situation, un objectif communicatif, un temps de préparation, une durée conseillée, quatre critères observables et une stratégie courte. Couverture obtenue : 11/26 modules cœur, par sélection qualitative.
- QA : catalogue public régénéré et contrôles d’intégrité/TypeScript réussis. Le navigateur a chargé le module sans overlay, mais le contenu est légitimement verrouillé pour la session anonyme ; le daemon a ensuite expiré. Ce lot n’est donc pas déclaré validé visuellement en mobile sans session premium.

### Lot 7 — cartographie et décision d’intégration audio

- Cartographie du catalogue complet : A1 compte 12 exercices/pistes dans les modules cœur et 51 dans sa banque ; A2 en compte 10 dans les modules cœur et 18 dans sa banque ; B1 en compte 16 dans les modules cœur. Les huit autres pistes appartiennent aux évaluations/examens, soit 115/115 au total.
- Essai contrôlé : deux pistes de banque ont été rattachées à des modules correspondants (première rencontre A1, premier jour de travail A2). Le manifeste a immédiatement signalé une identité d’exercice sans métadonnées propres et deux fichiers synthétiques réutilisés sous des pistes différentes.
- Décision : essai retiré avant commit, tests rétablis. Une intégration future devra ajouter une référence pédagogique explicite vers une piste existante, ou créer une nouvelle piste avec son propre manifest ; dupliquer l’exercice ou contourner l’unicité dégraderait la progression et le pipeline audio.
- Aucun fichier audio n’a été régénéré, remplacé ou supprimé.

### Lot 8 — scénarios de transition complets

- A1 réussi : score complet → preuve centrale → niveau A2 → prochaine action A2.
- A1 insuffisant : preuve d’échec → niveau A1 conservé → module A1 du domaine faible avec raison explicite.
- A2 réussi : score complet → preuve centrale → niveau B1 → prochaine action B1.
- Les tests complètent les garde-fous unitaires existants sur l’abandon, l’incomplétude, l’idempotence et la fusion multi-appareils.

### Lot 1 — prochaine action, erreurs et maîtrise

- Problème démontré : la séance du jour utilisait l’ancien mécanisme de rappel et le premier identifiant faible, tandis que `/reviser` classait déjà les compétences selon erreurs récentes, répétition, couverture et ancienneté.
- Décision : réutiliser la recommandation prioritaire existante, uniquement lorsqu’elle correspond à un module réel du niveau effectif.
- Garde-fous : sélection déterministe, repli sur le comportement historique, aucun module inventé, aucune donnée nouvelle.
- Problème démontré : le composant de compétence présentait le taux de réussite comme remplissage de progression.
- Décision : séparer la couverture du catalogue pratiqué et la réussite sur les tentatives.
- Tests : à compléter puis quality gate globale.

### Lot 2 — productions et preuve de maîtrise

- Échantillon : début/milieu/fin A1, A2 et B1, puis inventaire transversal des types d’exercice.
- Constat : les productions proposent déjà contexte, consigne et critères, mais leur simple envoi appelait `onExerciseAnswered(true)`.
- Risque : progression, taux global, compétence faible et révision étaient tous alimentés par une réussite non démontrée.
- Décision : conserver l’auto-évaluation (pas de fausse correction automatique), enregistrer la réussite seulement lorsque tous les critères sont cochés ; sinon terminer l’activité comme compétence à consolider.
- Portée : toutes les productions écrites et les 42 productions orales du catalogue, sans modifier leur contenu ni ajouter d’IA.
- Validation : tests ciblés écrit/oral/progression, suite complète, lint, TypeScript, build, audit dépendances et QA mobile 390 px sur le module B1 « Se présenter ».

### Lot 3 — consignes actionnables

- Constat transversal : 59 exercices A1, 45 A2 et 85 B1 conservaient une consigne technique de génération (« Item N. »), surtout dans les mini-bilans.
- Décision : au rendu, remplacer seulement ce motif exact par une instruction adaptée au type (choisir, compléter, associer, lire, écouter, produire).
- Garde-fou : toutes les consignes pédagogiques spécifiques restent inchangées ; les données et identifiants du catalogue ne bougent pas.
- Validation : test ciblé, suite complète (542 tests), SEO, lint, TypeScript, build, audit et QA mobile 375 px sur le mini-bilan B1.

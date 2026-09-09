# Audit BEST OF — Français A1 / A2 / B1

Date : 9 septembre 2026

HEAD initial : `58b475ab127f80fd207a2e89f47d983d6100509b`

Référence : `main` gagne par défaut ; une variante n'est retenue que si son gain est démontré et supérieur au risque.

## Méthode et périmètre

L'audit croise les historiques Git lisibles, les contenus physiques des worktrees, les checksums, les manifests, les tests et les documents de reconstruction. Les comparaisons excluent `.git`, `node_modules`, `.next`, les artefacts de build, les caches et les `.env*`.

Sources directement examinées :

- `francais-b1-final-launch` — `0136402` ;
- `francais-b1-diagnostic-progress` — `02e6ffd` ;
- `francais-b1-audio-humanisation` — `267d8dc` ;
- `francais-b1-release-candidate` — `ba4da7d` ;
- `francais-b1-launch-polish` — `1056a5a` ;
- `francais-b1-v1-polish` — `d43eafb` ;
- `francais-b1-positioning` — `8fdcca6` ;
- copies spécialisées A1, A2, diagnostic, daily, review, speaking, analytics et SEO inventoriées dans le recovery ;
- `docs/recovery-source-map.md` et `docs/recovery-audio-inventory.csv`.

Constat structurant : `final-launch` intègre explicitement `launch-polish`, `diagnostic-progress` et `audio-humanisation`. Une comparaison checksum entre `final-launch` et `main` ne trouve aucune différence de contenu métier : seules les dépendances sécurisées et les pièces de traçabilité recovery ajoutées après reconstruction diffèrent. Les autres worktrees sont des états antérieurs ou spécialisés déjà absorbés.

## Matrice fonctionnelle

| Domaine | Fonctionnalité | Main actuelle | Variante(s) examinée(s) | Différence / avantage historique | Avantage main | Risque | Décision | Justification | Statut |
|---|---|---|---|---|---|---|---|---|---|
| A1 | Catalogue et parcours | 27 modules, 123 leçons, 131 activités, 283 exercices | A1 content, integration, final-launch | États intermédiaires et fichiers publics séparés | Catalogue unifié, évaluations, progression et tests d'intégrité | Élevé si remplacement global | KEEP_MAIN | Main contient le catalogue final intégré et testé | Vérifié |
| A2 | Catalogue et parcours | 23 modules, 100 leçons, 121 activités, 234 exercices | A2 content, integration, final-launch | Générateurs/exports A2 intermédiaires | Pipeline public unifié et couverture d'intégrité | Élevé | KEEP_MAIN | Les variantes séparées sont remplacées par les exports unifiés | Vérifié |
| B1 | Catalogue et parcours | 26 modules, 114 leçons, 120 activités, 310 exercices | contenus, pedagogy audit, final-launch | États plus anciens du catalogue B1 | Corrections audio/contenu et intégration A1-A2-B1 finales | Élevé | KEEP_MAIN | Aucun module utile absent n'a été identifié | Vérifié |
| Diagnostic | Questions et scoring | Diagnostic détaillé, scoring déterministe, résultat par forces/fragilités | diagnostic, diagnostic-progress | Base fonctionnelle historique | Correctifs de non-régression de niveau et tests plus récents | Moyen | KEEP_MAIN | `diagnostic-progress` est déjà absorbé par final-launch | Vérifié |
| Diagnostic | Recommandation | CTA et recommandation explicable | diagnostic-progress, positioning | Versions antérieures de redirection | Respect du niveau évalué et de la progression réelle | Moyen | KEEP_MAIN | Correctifs `e456d4b`, `e934a26`, `6afd485` déjà présents | Vérifié |
| Parcours | Progression / maîtrise | Progression A1-A2-B1 unifiée | integration, v1-polish, diagnostic-progress | Premières versions de la logique | Évite le plafonnement par un ancien diagnostic ; tests parcours | Élevé | KEEP_MAIN | Main est l'état corrigé le plus récent | Vérifié |
| Daily | Session guidée | `GuidedSessionCard`, moteur `lib/daily`, route `/parcours/seance` | daily, `DailySessionCard`, integration | Ancienne carte autonome | Runner, récapitulatif et logique multi-niveaux cohérents | Moyen | REJECT_OBSOLETE | `DailySessionCard` n'est plus référencée et dépend de types supprimés | Vérifié |
| Review | Révision espacée | Moteur, adapter, interface et tests A1-A2-B1 | review, review1, integration | Étapes de construction antérieures | Scheduling consolidé et tests inter-niveaux | Élevé | KEEP_MAIN | Aucun comportement supplémentaire non absorbé | Vérifié |
| Oral | Routes et pratique | `/oral`, `/oral/[id]`, exercices et persistance locale | speaking, speaking1, final-launch | Versions initiales du composant | Expérience consolidée, accessibilité et tests UI | Moyen | KEEP_MAIN | Main contient la version intégrée la plus complète | Vérifié |
| Évaluations | Passages et fins de niveau | Fins A1/A2, passages A1→A2 et A2→B1, scoring | product-integration, release-candidate | Apport historique majeur | Déjà intégré avec garde anti-fuite et tests | Élevé | KEEP_MAIN | Réimporter dupliquerait ou ferait régresser les correctifs | Vérifié |
| Examens | DELF et examens blancs | A1, A2, B1, références DELF et audio | A1/A2 content, final-launch | Catalogues intermédiaires | Catalogues finaux et exports publics testés | Élevé | KEEP_MAIN | Données unifiées et routes actives | Vérifié |
| Audio | Runtime et manifests | 115/115 chemins, aucun manquant | A1 audio, A2 audio, audio-humanisation | 231 binaires historiques pour 115 chemins | Sélection final-launch documentée, manifests synchronisés | Élevé | KEEP_MAIN | Aucun critère objectif nouveau ne dépasse la sélection existante | Vérifié |
| Audio | Lecteur | Lecteur accessible et testé | audio, audio-humanisation | Ancien runtime/emplacements | Playback actuel, transcription et tests | Moyen | KEEP_MAIN | Ancien `audio-playback.ts` remplacé | Vérifié |
| UX | Landing et navigation | Positionnement A1→B1, navigation actuelle | positioning, v1-polish, launch-polish | Étapes de copywriting et composants antérieurs | Corrections finales, responsive et QA récente | Moyen | KEEP_MAIN | Les variantes sont ancêtres du rendu actuel | Vérifié |
| Auth | Sessions et formulaires | DAL/session, formulaires et repli anonyme | lifecycle, conversion, final-launch | États antérieurs | Correctifs mailer et intégration courante | Élevé | KEEP_MAIN | Aucun secret ni mécanisme plus sûr absent identifié | Vérifié |
| Premium | Accès et paiement | Contrôle centralisé, checkout, portail, webhook | conversion, v1-polish | Première instrumentation | Accès serveur et wording final | Élevé | KEEP_MAIN | Aucun paiement réel déclenché ; pas d'import `.env` | Vérifié |
| SEO | Metadata et indexation | Metadata, canonical, sitemap, robots, JSON-LD | SEO, SEO editorial, launch-polish | Pages et tests ajoutés historiquement | Ensemble déjà intégré et testé | Faible | KEEP_MAIN | Les tests SEO couvrent slugs et sitemap | Vérifié |
| Analytics | Funnel pédagogique | Événements visite, diagnostic, révision, séance, paywall | analytics, v1-polish, final-launch | Instrumentation initiale | CTA diagnostic et nomenclature finale | Moyen | KEEP_MAIN | Les compléments ultérieurs sont déjà présents | Vérifié |
| Performance | Frontend | Correctifs perf/a11y de main historique + final-launch | performance, launch-polish | Optimisations ciblées historiques | Incluses avant le socle recovery | Moyen | KEEP_MAIN | Aucun delta supérieur isolé | Vérifié |
| Accessibilité | Navigation, formulaires, audio | Focus, labels, touch targets, transcription | UX, performance, audio-humanisation | Correctifs successifs | Version cumulée et testée | Moyen | KEEP_MAIN | Les anciennes UI perdraient des correctifs ultérieurs | Vérifié |
| Sécurité | Dépendances et secrets | Next 16.3.4, audit 0, `.env.example` seul | tous worktrees | Versions de dépendances antérieures | Correctifs CVE post-recovery | Élevé | KEEP_MAIN | Toute copie globale réintroduirait des dépendances vulnérables | Vérifié |

## Journal des lots

### Lot 1 — Diagnostic + recommandations

- Variantes : diagnostic, diagnostic-progress, launch-polish, final-launch.
- Décision : `KEEP_MAIN`.
- Motif : les correctifs empêchant un nouveau diagnostic de dégrader une progression réelle et empêchant un ancien niveau de plafonner la recommandation sont déjà intégrés.
- Fichiers importés : aucun.
- Rejets : composants et logiques antérieurs, moins complets.

### Lot 2 — Progression + maîtrise + parcours

- Variantes : product-integration, v1-polish, diagnostic-progress, final-launch.
- Décision : `KEEP_MAIN`.
- Motif : modèle multi-niveaux unifié, progression réelle prioritaire et tests parcours présents.
- Fichiers importés : aucun.

### Lot 3 — Daily Session

- Variantes : daily, daily1, product-integration, `DailySessionCard`.
- Décision : `REJECT_OBSOLETE` pour l'ancienne carte ; `KEEP_MAIN` pour le moteur et `GuidedSessionCard`.
- Motif : l'ancien composant n'est pas référencé ; le runner actuel couvre préparation, exécution et récapitulatif.

### Lot 4 — Spaced Review

- Variantes : review, review1, product-integration, final-launch.
- Décision : `KEEP_MAIN`.
- Motif : moteur, adapter et tests A1/A2/B1 déjà consolidés.

### Lot 5 — Oral + Speaking

- Variantes : speaking, speaking1, product-integration, final-launch.
- Décision : `KEEP_MAIN`.
- Motif : routes, composant de pratique, persistance et tests sont présents dans leur version intégrée.

### Lot 6 — Évaluations + examens + DELF

- Variantes : A1/A2 content, product-integration, release-candidate, final-launch.
- Décision : `KEEP_MAIN`.
- Motif : passages, évaluations finales, scoring, garde anti-fuite, références DELF et audio sont déjà réunis.

### Lots 7 à 9 — Contenus A1, A2 et B1

- Décision : `KEEP_MAIN` pour les trois niveaux.
- Motif : les catalogues finaux sont complets, reliés aux stages, aux évaluations et aux manifests. Les anciens exports publics A2 séparés sont remplacés par les générateurs unifiés.
- Régression évitée : remplacement massif d'un catalogue final par une variante intermédiaire.

### Lot 10 — SEO + analytics

- Variantes : SEO, SEO editorial, analytics, lifecycle, v1-polish, launch-polish.
- Décision : `KEEP_MAIN`.
- Motif : les apports sont déjà inclus, avec tests SEO et événements pédagogiques finaux.

### Lot 11 — UX + accessibilité + performance

- Variantes : UX, performance, conversion, positioning, launch-polish.
- Décision : `KEEP_MAIN`.
- Motif : l'interface actuelle cumule les corrections successives ; aucune ancienne page ne présente un gain isolable sans perdre des correctifs.

### Lot 12 — Audio BEST OF

- Variantes : 231 contenus binaires historiques pour 115 chemins logiques.
- Décision : `KEEP_MAIN` pour les 115 pistes.
- Motif : la sélection `final-launch` est déjà documentée piste par piste dans `docs/recovery-audio-inventory.csv`, tous les chemins sont présents et les manifests sont cohérents. La durée ou la taille seule ne démontre pas une meilleure qualité perceptive.
- Remplacement : aucun.
- Humanisation globale : explicitement hors périmètre.

## Fichiers historiques uniques rejetés

| Élément | Décision | Motif |
|---|---|---|
| `DailySessionCard.tsx` | REJECT_OBSOLETE | Remplacé par `GuidedSessionCard`, non référencé |
| `LessonStep.tsx` | REJECT_OBSOLETE | Ancien runner non référencé |
| `ParcoursClient.tsx`, `ProgressionClient.tsx` | REJECT_OBSOLETE | Anciens composants remplacés |
| exports/générateurs publics A2 séparés | REJECT_OBSOLETE | Pipeline unifié présent et testé |
| ancien `audio-playback.ts` | REJECT_OBSOLETE | Runtime déplacé et couvert par tests |
| `check-audio-assets.mjs` | REJECT_OBSOLETE | Couverture assurée par manifests, tests et `audio:status` |
| anciens alias loaders | REJECT_OBSOLETE | Loaders utilisés par les scripts actuels présents |
| `BlockerFeedback.tsx` | REJECT_OBSOLETE | Expérimental et non référencé |
| `initial-user-progress 2.ts` | REJECT_OBSOLETE | Doublon accidentel |
| locks d'outils locaux | REJECT_OBSOLETE | Aucun contenu produit |

`docs/user-testing-protocol.md`, seul document autonome utile identifié lors de la reconstruction, est déjà intégré.

## Couverture finale conservée

| Niveau | Modules | Leçons | Activités | Exercices | Examens | Évaluations liées | Audio |
|---|---:|---:|---:|---:|---:|---:|---:|
| A1 | 27 | 123 | 131 | 283 | 1 | 2 | 65 |
| A2 | 23 | 100 | 121 | 234 | 2 | 3 | 31 |
| B1 | 26 | 114 | 120 | 310 | 2 | 1 | 16 |

Trois pistes supplémentaires servent aux examens et démonstrations : 115 pistes au total.

## Conclusion

Le BEST OF ne nécessite aucune réintroduction métier : `main` est déjà la consolidation la plus complète des variantes récupérées, puis a reçu la stabilisation de dépendances. Remplacer un lot par une ancienne variante aurait un gain nul ou non démontré et un risque de régression réel. Le résultat de l'audit est donc volontairement conservateur : **KEEP_MAIN pour tous les lots actifs**, rejet explicite des artefacts obsolètes, et aucune modification audio.

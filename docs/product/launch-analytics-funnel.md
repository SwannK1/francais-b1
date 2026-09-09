---
title: Funnel analytics de lancement
type: product-analytics
lastUpdated: 2026-09-08
---

# Funnel analytics de lancement

Vérification, pour le chantier `launch-polish`, que le funnel minimum
demandé est réellement mesurable avec l'instrumentation existante
(`lib/analytics/events.ts`, `lib/analytics/client.ts`,
`lib/analytics/server.ts`, provider Vercel Analytics). Voir
`docs/product/analytics-plan.md` pour l'historique complet de
l'instrumentation (ajoutée principalement lors du chantier `v1-polish`).

## Funnel demandé → événement réel

| Étape demandée | Événement réel | Où il se déclenche |
|---|---|---|
| `homepage_view` | Pageview automatique Vercel Analytics sur `/` | `<Analytics />` (`app/layout.tsx`), sans code dédié — voir note ci-dessous |
| `diagnostic_start` | `placement_started` | `TestNiveauClient.tsx` — début du test de niveau, le vrai point d'entrée gratuit |
| `diagnostic_complete` | `placement_completed` (+ `placementLevel`) | `TestNiveauClient.tsx` — résultat du test de niveau |
| `parcours_start` | `journey_viewed` | `ParcoursExperience.tsx` — vue de `/parcours` |
| `module_start` | `module_started` | composant module (mini-recap / `ModuleExperience`) |
| `module_complete` | `module_completed` | idem, à la complétion |
| `signup` | `signup_completed` (+ `signup_started`) | flux d'inscription |
| `checkout_start` | `checkout_started` | `app/api/checkout/route.ts`, côté serveur |
| `premium_active` | `purchase_completed` | `app/api/webhooks/stripe/route.ts` — déclenché uniquement par l'événement Stripe confirmé, jamais optimiste côté client |

**Aucun événement manquant** pour ce funnel minimum. Les noms diffèrent du
libellé générique demandé mais portent une sémantique plus précise et déjà
cohérente avec le reste de la taxonomie (`ANALYTICS_EVENTS`) — les
renommer casserait la continuité des séries déjà collectées sans aucun
bénéfice, donc pas fait ici.

## Sur `homepage_view`

Pas d'événement custom ajouté : `<Analytics />` (Vercel) enregistre déjà
une pageview automatique pour `/`, visible telle quelle dans le dashboard
Vercel Analytics, sans instrumentation supplémentaire. Ajouter un événement
`homepage_view` dupliquerait une donnée déjà collectée nativement — contraire
à la consigne "éviter une explosion d'événements inutiles". Limite à
connaître : pour croiser ce chiffre avec les événements custom dans un même
funnel calculé à la main, il faut aller chercher le nombre de pageviews `/`
séparément du nombre d'événements custom (deux vues différentes du même
dashboard Vercel) plutôt qu'une seule requête — acceptable pour un lancement,
pas un vrai product analytics (Amplitude/Mixpanel) avec funnel intégré.

## Diagnostic approfondi (`/diagnostic`)

Distinct du funnel principal ci-dessus (voir
`docs/product/launch-polish-audit.md` § constat central) : `diagnostic_started`
et `diagnostic_completed` (avec `diagnosticLevel`) mesurent l'usage du bilan
détaillé optionnel, utile pour savoir s'il est réellement utilisé
(question ouverte listée dans `docs/product/positioning-a1-b1.md`), mais ne
doivent pas être confondus avec `placement_started`/`placement_completed`
qui mesurent le vrai funnel d'onboarding.

## Qualité de la recommandation (bonus, déjà en place)

`resume_clicked` porte une propriété `recommendationType`
(`resume_in_progress` / `next_new_module` / `journey_complete`) — permet,
sans événement supplémentaire, de suivre dans le temps la proportion de
clics qui sont de vraies reprises vs. des découvertes, utile pour observer
l'effet du correctif de plancher de niveau documenté dans l'audit sans
ajouter de nouvelle instrumentation.

## Conclusion

Le funnel minimum demandé est intégralement mesurable avec
l'instrumentation existante. Aucun ajout de code fait dans ce chantier sur
`lib/analytics/` — uniquement cette cartographie documentaire.

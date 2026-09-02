import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/**
 * Seules les routes techniques (API) sont bloquées ici. Les pages à faible
 * valeur pour la recherche (connexion, paiement, progression personnelle...)
 * restent crawlables mais sont marquées `noindex` via leur propre
 * `generateMetadata`/`metadata` — un `Disallow` les aurait aussi empêchées
 * d'être explorées, donc Google n'aurait jamais pu lire cette directive
 * `noindex` ni désindexer une URL déjà connue.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

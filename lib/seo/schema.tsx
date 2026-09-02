import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";

/**
 * Générateurs de données structurées schema.org — chaque fonction ne fait
 * que refléter des données réelles du site (aucun champ inventé : pas de
 * note, pas d'organisme certificateur, pas de prix suggéré). Rendu via le
 * composant `JsonLd` ci-dessous dans un tag `<script type="application/ld+json">`.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdObject = Record<string, any>;

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "fr-FR",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * `LearningResource` pour un module ou un examen d'entraînement — pas
 * `Course` : il n'y a pas d'inscription, d'instructeur ni de session
 * associée à ces pages, seulement une ressource pédagogique consultable.
 * `isAccessibleForFree` reflète l'accès réel (voir lib/commerce/access.ts),
 * jamais une valeur par défaut.
 */
export function learningResourceSchema(resource: {
  name: string;
  description: string;
  url: string;
  isAccessibleForFree: boolean;
  educationalLevel?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: resource.name,
    description: resource.description,
    url: `${SITE_URL}${resource.url}`,
    inLanguage: "fr",
    isAccessibleForFree: resource.isAccessibleForFree,
    ...(resource.educationalLevel ? { educationalLevel: resource.educationalLevel } : {}),
    learningResourceType: "Module pédagogique",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { MetadataRoute } from "next";
import { MODULES } from "@/lib/pedagogy/data/modules";
import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import { EXAMS } from "@/lib/pedagogy/data/exams";
import { SITE_URL } from "@/lib/seo/site";

/**
 * Sitemap généré depuis les mêmes données statiques que l'app (modules,
 * étapes, examens) — jamais une liste dupliquée à la main, pour ne pas
 * désynchroniser sitemap et contenu réel au premier module ajouté ou
 * renommé.
 *
 * Volontairement exclues : pages d'authentification, de paiement et de
 * progression personnelle (aucun contenu unique indexable — voir leur
 * `metadata.robots.index: false`), routes API, et les étapes du parcours
 * qui ne sont pas de type "content" (elles n'ont pas de page dédiée sous
 * /parcours/[stageSlug], voir app/(pedagogie)/parcours/[stageSlug]/page.tsx).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/offre`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/parcours`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/parcours/examens`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/test-niveau`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/francais-b1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/exercices-b1`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/grammaire-b1`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${SITE_URL}/comprehension-orale-b1`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const stagePages: MetadataRoute.Sitemap = PARCOURS_STAGES.filter((stage) => stage.kind === "content").map(
    (stage) => ({
      url: `${SITE_URL}/parcours/${stage.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const modulePages: MetadataRoute.Sitemap = MODULES.map((mod) => ({
    url: `${SITE_URL}/parcours/module/${mod.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const examPages: MetadataRoute.Sitemap = EXAMS.map((exam) => ({
    url: `${SITE_URL}/parcours/examens/${exam.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...stagePages, ...modulePages, ...examPages];
}

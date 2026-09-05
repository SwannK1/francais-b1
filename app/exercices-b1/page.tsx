import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PrimaryCta from "@/components/marketing/PrimaryCta";
import ModulePreviewCard from "@/components/marketing/ModulePreviewCard";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { SITE_NAME } from "@/lib/seo/site";
import type { SkillDomain } from "@/lib/pedagogy/types";

const title = "Exercices de français B1";
const description =
  "Des exercices de français niveau B1 organisés par compétence — grammaire, vocabulaire, compréhension orale et écrite, production écrite — issus du parcours guidé ParcoursFR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/exercices-b1" },
  openGraph: { title: `${title} — ${SITE_NAME}`, description, url: "/exercices-b1" },
};

interface DomainSection {
  domain: SkillDomain;
  intro: string;
  dedicatedPage?: { href: string; label: string };
}

const sections: DomainSection[] = [
  {
    domain: "grammaire",
    intro:
      "Les structures qui te permettent de raconter, nuancer et argumenter — passé composé et imparfait, subjonctif, conditionnel, discours rapporté.",
    dedicatedPage: { href: "/grammaire-b1", label: "Voir la page dédiée à la grammaire B1" },
  },
  {
    domain: "comprehension_orale",
    intro:
      "S'entraîner à comprendre des messages, des annonces et des conversations courantes, sans avoir besoin de saisir chaque mot.",
    dedicatedPage: {
      href: "/comprehension-orale-b1",
      label: "Voir la page dédiée à la compréhension orale B1",
    },
  },
  {
    domain: "comprehension_ecrite",
    intro:
      "Lire une annonce, un courrier administratif ou un article court, et en retirer les informations utiles.",
  },
  {
    domain: "vocabulaire",
    intro: "Le vocabulaire du quotidien : habitudes, achats, vie de tous les jours.",
  },
  {
    domain: "production_ecrite",
    intro:
      "Donner son avis, expliquer un problème, rédiger un message professionnel ou une réclamation.",
  },
];

export default function ExercicesB1Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Exercices B1", path: "/exercices-b1" }])} />
      <Header />
      <main id="main-content">
        <Container className="max-w-4xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Exercices de français niveau B1
          </h1>

          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            Plutôt que des exercices isolés, voici un aperçu, par compétence, des modules réels du{" "}
            <Link href="/parcours" className="underline hover:text-foreground">
              parcours guidé B1
            </Link>{" "}
            — chacun avec des activités, des corrections et, pour beaucoup, des audios originaux.
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => {
              const modules = PUBLIC_MODULES.filter((mod) => mod.domain === section.domain).slice(
                0,
                3
              );
              return (
                <section key={section.domain} aria-labelledby={`${section.domain}-title`}>
                  <h2
                    id={`${section.domain}-title`}
                    className="text-xl font-semibold text-foreground"
                  >
                    {DOMAIN_LABELS[section.domain]} B1
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{section.intro}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {modules.map((mod) => (
                      <ModulePreviewCard key={mod.slug} module={mod} />
                    ))}
                  </div>

                  {section.dedicatedPage ? (
                    <Link
                      href={section.dedicatedPage.href}
                      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      {section.dedicatedPage.label} →
                    </Link>
                  ) : (
                    <Link
                      href="/parcours"
                      className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      Voir tous les modules dans le parcours →
                    </Link>
                  )}
                </section>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <PrimaryCta source="exercices_b1_page" />
            <Link href="/test-niveau" className="text-sm font-medium text-primary hover:underline">
              Pas sûr d&apos;être B1 ? Fais le test de niveau
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

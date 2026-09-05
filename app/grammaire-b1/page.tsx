import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PrimaryCta from "@/components/marketing/PrimaryCta";
import ModulePreviewCard from "@/components/marketing/ModulePreviewCard";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { SITE_NAME } from "@/lib/seo/site";

const title = "Grammaire B1";
const description =
  "Les points de grammaire clés du niveau B1 en français, avec des exemples simples et des modules d'entraînement réels pour les mettre en pratique.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/grammaire-b1" },
  openGraph: { title: `${title} — ${SITE_NAME}`, description, url: "/grammaire-b1" },
};

const grammarPoints = [
  {
    name: "Passé composé et imparfait",
    explanation:
      "Le passé composé raconte ce qui s'est passé (une action, un événement), l'imparfait décrit le contexte (une habitude, une situation).",
    example: "« Quand je suis arrivé, il pleuvait déjà depuis une heure. »",
  },
  {
    name: "Subjonctif présent après des expressions courantes",
    explanation:
      "Après « il faut que », « je voudrais que » ou « j'aimerais que », le verbe se met au subjonctif.",
    example: "« Il faut que tu envoies ce document avant vendredi. »",
  },
  {
    name: "Conditionnel présent",
    explanation:
      "Utile pour formuler une hypothèse, une demande polie ou un conseil.",
    example: "« À ta place, je changerais de logement avant l'hiver. »",
  },
  {
    name: "Pronoms relatifs qui, que, où, dont",
    explanation:
      "Ils permettent de relier deux idées sans les répéter — indispensable pour des phrases plus fluides.",
    example: "« C'est le quartier où j'ai habité, celui dont je t'ai parlé hier. »",
  },
  {
    name: "Discours rapporté",
    explanation: "Pour rapporter ce que quelqu'un a dit, avec les changements de temps et de pronoms que cela implique.",
    example: "« Il m'a dit qu'il arriverait un peu en retard. »",
  },
];

export default function GrammaireB1Page() {
  const grammarModules = PUBLIC_MODULES.filter((mod) => mod.domain === "grammaire");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Grammaire B1", path: "/grammaire-b1" }])} />
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Grammaire française de niveau B1
          </h1>

          <p className="mt-6 text-sm text-muted-foreground">
            Au niveau B1, la grammaire n&apos;est plus une fin en soi : c&apos;est ce qui te permet
            d&apos;exprimer des choses plus précises — raconter un événement passé, envisager une
            hypothèse, rapporter les paroles de quelqu&apos;un. Voici les points qui reviennent le
            plus souvent.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Les points de grammaire à maîtriser
          </h2>
          <dl className="mt-6 space-y-6">
            {grammarPoints.map((point) => (
              <div key={point.name}>
                <dt className="text-sm font-semibold text-foreground">{point.name}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{point.explanation}</dd>
                <dd className="mt-1 text-sm italic text-muted-foreground">{point.example}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            S&apos;entraîner avec de vrais modules
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ces points sont travaillés en contexte dans les modules suivants du parcours B1 :
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {grammarModules.map((mod) => (
              <ModulePreviewCard key={mod.slug} module={mod} />
            ))}
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">Après la grammaire</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pour progresser sur d&apos;autres compétences, voir aussi nos{" "}
            <Link href="/exercices-b1" className="underline hover:text-foreground">
              exercices de français B1
            </Link>{" "}
            et la page{" "}
            <Link href="/comprehension-orale-b1" className="underline hover:text-foreground">
              compréhension orale B1
            </Link>
            , ou reprendre l&apos;ensemble du{" "}
            <Link href="/parcours" className="underline hover:text-foreground">
              parcours guidé
            </Link>
            .
          </p>

          <div className="mt-10">
            <PrimaryCta source="grammaire_b1_page" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

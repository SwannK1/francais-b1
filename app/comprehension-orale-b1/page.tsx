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

const title = "Compréhension orale B1";
const description =
  "Ce qu'on attend de toi en compréhension orale au niveau B1, des méthodes concrètes pour progresser, et des modules d'entraînement réels.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/comprehension-orale-b1" },
  openGraph: { title: `${title} — ${SITE_NAME}`, description, url: "/comprehension-orale-b1" },
};

export default function ComprehensionOraleB1Page() {
  const listeningModules = PUBLIC_MODULES.filter((mod) => mod.domain === "comprehension_orale");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Compréhension orale B1", path: "/comprehension-orale-b1" }])}
      />
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Travailler la compréhension orale au niveau B1
          </h1>

          <p className="mt-6 text-sm text-muted-foreground">
            C&apos;est souvent la compétence la plus déstabilisante : on ne peut pas relire une
            phrase à l&apos;oral comme on relit un texte. Voici ce qu&apos;on attend de toi à ce
            niveau, et comment t&apos;entraîner efficacement.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Ce qu&apos;on attend de toi en compréhension orale B1
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Au niveau B1, tu dois pouvoir comprendre l&apos;essentiel d&apos;un discours clair sur
              des sujets familiers rencontrés dans la vie quotidienne, au travail ou à
              l&apos;école — sans avoir besoin de saisir chaque mot. Tu peux aussi suivre les points
              principaux d&apos;une émission de radio ou d&apos;un message vocal sur un sujet qui
              t&apos;intéresse, à condition que la personne parle de façon relativement claire.
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Des méthodes qui font la différence
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Écoute une première fois pour saisir le sens général, sans chercher à comprendre
              chaque mot.
            </li>
            <li>
              Repère les mots-clés qui structurent le message : qui parle, de quoi, où, quand.
            </li>
            <li>
              Un mot inconnu ne doit pas te bloquer : continue d&apos;écouter, le sens se précise
              souvent après coup.
            </li>
            <li>Réécoute ensuite en ciblant les détails qui te manquent, plutôt que tout reprendre.</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-foreground">Un exemple concret</h2>
          <div className="mt-4 rounded-2xl border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
            <p className="italic">
              « Bonjour, c&apos;est Mme Lefèvre du cabinet médical. Je vous appelle pour votre
              rendez-vous de jeudi : le docteur n&apos;est finalement pas disponible ce jour-là. Je
              vous propose vendredi à la même heure, ou lundi matin. Rappelez-moi pour me dire ce qui
              vous arrange, merci, au revoir. »
            </p>
            <p className="mt-3">En écoutant ce message, tu dois pouvoir répondre à :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Qui appelle, et pourquoi ?</li>
              <li>Que s&apos;est-il passé avec le rendez-vous initial ?</li>
              <li>Quelles sont les deux solutions proposées ?</li>
            </ul>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            S&apos;entraîner avec de vrais modules
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ces situations sont travaillées avec de vrais audios dans les modules suivants :
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {listeningModules.map((mod) => (
              <ModulePreviewCard key={mod.slug} module={mod} />
            ))}
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">Et à l&apos;examen ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            La compréhension orale est l&apos;une des quatre épreuves du DELF B1. Tu peux
            t&apos;entraîner dans les conditions réelles avec nos{" "}
            <Link href="/parcours/examens" className="underline hover:text-foreground">
              épreuves d&apos;entraînement
            </Link>
            , ou revoir la{" "}
            <Link href="/grammaire-b1" className="underline hover:text-foreground">
              grammaire B1
            </Link>{" "}
            et nos{" "}
            <Link href="/exercices-b1" className="underline hover:text-foreground">
              exercices de français B1
            </Link>{" "}
            par ailleurs.
          </p>

          <div className="mt-10">
            <PrimaryCta source="comprehension_orale_b1_page" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

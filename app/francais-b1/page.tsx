import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PrimaryCta from "@/components/marketing/PrimaryCta";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { SITE_NAME } from "@/lib/seo/site";

const title = "Le niveau B1 en français";
const description =
  "Ce que signifie le niveau B1 en français (CECRL) : ce que tu sais déjà faire à ce niveau, pourquoi il compte, et comment y arriver.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/francais-b1" },
  openGraph: { title: `${title} — ${SITE_NAME}`, description, url: "/francais-b1" },
};

export default function FrancaisB1Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Français B1", path: "/francais-b1" }])} />
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Le niveau B1 en français, expliqué simplement
          </h1>

          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              Le B1 est l&apos;un des six niveaux du CECRL (Cadre européen commun de référence pour
              les langues), l&apos;échelle utilisée pour situer un apprenant du niveau A1 (débutant)
              au niveau C2 (maîtrise). Le B1 correspond à un utilisateur dit « indépendant » : tu
              peux te débrouiller seul dans la plupart des situations de la vie quotidienne, sans
              pour autant maîtriser les nuances les plus fines de la langue.
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Ce que tu sais faire au niveau B1
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>Concrètement, arriver au niveau B1 veut dire que tu peux :</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Parler de toi, de ton quotidien et gérer des situations pratiques simples (logement,
                rendez-vous, courrier administratif) ;
              </li>
              <li>
                Donner ton avis, comparer deux choses, parler de ton travail et de tes projets, et
                expliquer un problème pour demander une solution ;
              </li>
              <li>
                Nuancer tes propos, envisager une hypothèse, rapporter les paroles de quelqu&apos;un,
                et comprendre l&apos;essentiel de documents un peu plus riches (courrier, annonce,
                article court).
              </li>
            </ul>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Pourquoi viser le niveau B1
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Le B1 est souvent le niveau visé pour vivre au quotidien en France, échanger dans un
              cadre professionnel, ou obtenir une carte de résident. C&apos;est aussi le niveau du
              DELF B1 et du TCF pour l&apos;intégration, la résidence et la nationalité (TCF IRN).
            </p>
            <p>
              Pour une demande de naturalisation en revanche, le niveau exigé est le B2 depuis le 1er
              janvier 2026 (décret n° 2025-648) : le B1 reste une étape utile vers ce niveau, mais
              insuffisant à lui seul pour ce dossier précis — à vérifier auprès des autorités
              compétentes selon ta situation.
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Comment savoir si tu es déjà B1
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Le moyen le plus rapide est de faire notre{" "}
              <Link href="/test-niveau" className="underline hover:text-foreground">
                test de positionnement gratuit
              </Link>{" "}
              : il estime ton niveau entre A1 et B2 en quelques minutes et te dit si le parcours B1
              te correspond.
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Comment progresser vers le B1
          </h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Notre{" "}
              <Link href="/parcours" className="underline hover:text-foreground">
                parcours guidé
              </Link>{" "}
              t&apos;emmène étape par étape, module après module, vers le niveau B1. Si tu préfères
              t&apos;exercer sur une compétence en particulier, tu peux aussi consulter nos{" "}
              <Link href="/exercices-b1" className="underline hover:text-foreground">
                exercices de français B1
              </Link>
              , notamment les pages dédiées à la{" "}
              <Link href="/grammaire-b1" className="underline hover:text-foreground">
                grammaire B1
              </Link>{" "}
              et à la{" "}
              <Link href="/comprehension-orale-b1" className="underline hover:text-foreground">
                compréhension orale B1
              </Link>
              .
            </p>
            <p>
              Pour te préparer à un examen, le parcours propose aussi des{" "}
              <Link href="/parcours/examens" className="underline hover:text-foreground">
                épreuves d&apos;entraînement au format DELF B1
              </Link>
              . Le détail des modules, audios et examens blancs est présenté sur la page{" "}
              <Link href="/offre" className="underline hover:text-foreground">
                Offre
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryCta source="francais_b1_page" />
            <Link href="/faq" className="text-sm font-medium text-primary hover:underline">
              Questions fréquentes
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de ParcoursFR.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mentions légales
          </h1>

          <div className="mt-8">
            <LegalDraftNotice />
          </div>

          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h2 className="text-base font-semibold text-foreground">Éditeur du site</h2>
              <dl className="mt-2 space-y-1.5">
                {[
                  ["Nom et prénom de l'exploitant", "Swann Kerboeuf"],
                  [
                    "Statut juridique",
                    "Entrepreneur individuel (micro-entrepreneur), sous réserve de création effective de l'activité",
                  ],
                  ["Nom commercial (site)", "France B1 (provisoire)"],
                  ["Adresse professionnelle", "[À COMPLÉTER APRÈS IMMATRICULATION]"],
                  ["Numéro SIREN", "[À COMPLÉTER APRÈS IMMATRICULATION]"],
                  ["Numéro SIRET (établissement)", "[À COMPLÉTER APRÈS IMMATRICULATION]"],
                  [
                    "Immatriculation (RCS, RM ou RNE selon la nature de l'activité)",
                    "[À COMPLÉTER APRÈS IMMATRICULATION]",
                  ],
                  [
                    "Numéro de TVA intracommunautaire",
                    "[À COMPLÉTER APRÈS IMMATRICULATION — non applicable si la franchise en base de TVA (art. 293 B du Code général des impôts) s'applique]",
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap gap-x-1.5">
                    <dt className="font-medium text-foreground">{label} :</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Directeur de la publication</h2>
              <p className="mt-1">Swann Kerboeuf.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <dl className="mt-2 space-y-1.5">
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Email :</dt>
                  <dd>swann.kerboeuf@gmail.com</dd>
                </div>
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Téléphone :</dt>
                  <dd>06 07 52 42 81</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Hébergement</h2>
              <p className="mt-1">
                Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (source :
                pages légales publiques de Vercel — à revérifier avant mise en ligne commerciale, ces
                informations pouvant évoluer).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Propriété intellectuelle</h2>
              <p className="mt-1">
                L&apos;ensemble des contenus pédagogiques (textes, exercices, audios, corrections)
                publiés sur ParcoursFR est original et protégé par le droit d&apos;auteur. Toute
                reproduction non autorisée est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Responsabilité</h2>
              <p className="mt-1">
                ParcoursFR met tout en œuvre pour assurer l&apos;accès et le bon fonctionnement du
                site, sans garantir une disponibilité continue (maintenance, incidents techniques
                indépendants de sa volonté). L&apos;éditeur ne peut être tenu responsable des
                dommages indirects résultant de l&apos;utilisation du site. [À compléter : clause de
                responsabilité définitive, à valider par un juriste avant mise en ligne.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Absence d&apos;affiliation officielle</h2>
              <p className="mt-1">
                ParcoursFR n&apos;est ni éditeur, ni partenaire, ni affilié à France Éducation
                International, ni à aucun organisme délivrant officiellement le DELF ou le TCF. Les
                sigles DELF et TCF IRN sont cités uniquement pour décrire l&apos;objectif pédagogique
                du contenu proposé.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";

export const metadata: Metadata = { title: "Mentions légales — ParcoursFR" };

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main>
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
              <p className="mt-1">
                [Raison sociale / nom de l&apos;éditeur] — [forme juridique, ex. SASU, EI...] au
                capital de [montant] € — RCS [ville] [numéro SIREN] — Siège social : [adresse
                complète] — Numéro de TVA intracommunautaire : [numéro].
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Directeur de la publication</h2>
              <p className="mt-1">[Nom du responsable de publication].</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <p className="mt-1">Email : [adresse email de contact] — [téléphone si applicable].</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Hébergement</h2>
              <p className="mt-1">
                [Nom de l&apos;hébergeur] — [adresse de l&apos;hébergeur] — [contact de
                l&apos;hébergeur].
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

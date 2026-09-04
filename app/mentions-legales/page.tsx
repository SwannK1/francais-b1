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
                  ["Raison sociale / nom de l'éditeur", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["Statut juridique (ex. SASU, EI, auto-entrepreneur...)", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["Capital social (si applicable)", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["RCS et ville d'immatriculation", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["Numéro SIREN", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["Numéro de TVA intracommunautaire (si applicable)", "À FOURNIR PAR LE PROPRIÉTAIRE"],
                  ["Siège social", "À FOURNIR PAR LE PROPRIÉTAIRE"],
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
              <p className="mt-1">À FOURNIR PAR LE PROPRIÉTAIRE.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <dl className="mt-2 space-y-1.5">
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Email :</dt>
                  <dd>À FOURNIR PAR LE PROPRIÉTAIRE</dd>
                </div>
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Téléphone (si applicable) :</dt>
                  <dd>À FOURNIR PAR LE PROPRIÉTAIRE</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Hébergement</h2>
              <p className="mt-1">
                À FOURNIR PAR LE PROPRIÉTAIRE (nom, adresse et contact de l&apos;hébergeur —
                probablement Vercel Inc. au vu de la stack technique, mais à confirmer avant mise en
                ligne : l&apos;hébergeur exact et ses coordonnées légales doivent être vérifiés au
                moment du déploiement en production).
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

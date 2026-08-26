import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";

export const metadata: Metadata = { title: "Confidentialité — ParcoursFR" };

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main>
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Politique de confidentialité
          </h1>

          <div className="mt-8">
            <LegalDraftNotice />
          </div>

          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h2 className="text-base font-semibold text-foreground">Ce que nous stockons aujourd&apos;hui</h2>
              <p className="mt-1">
                Dans l&apos;état actuel du produit, la progression pédagogique (niveau, modules
                terminés, réponses aux exercices) est enregistrée uniquement dans le navigateur
                (« localStorage »), sur l&apos;appareil de la personne qui apprend — elle
                n&apos;est transmise à aucun serveur. Aucun compte utilisateur n&apos;existe encore
                sur cette version du produit.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Paiement</h2>
              <p className="mt-1">
                Le paiement est traité par Stripe (prestataire de paiement tiers). ParcoursFR ne
                reçoit et ne stocke aucune donnée de carte bancaire ; Stripe agit comme sous-traitant
                au sens du RGPD pour les données nécessaires au paiement (voir sa propre politique de
                confidentialité).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Ce qui reste à définir</h2>
              <p className="mt-1">
                La création d&apos;un compte utilisateur (chantier en cours dans une autre branche du
                projet) introduira un traitement de données personnelles côté serveur (email, statut
                d&apos;abonnement, progression). Cette section devra être complétée à ce moment-là
                avec : la base légale du traitement, la durée de conservation, les destinataires des
                données, les droits d&apos;accès/rectification/suppression et le contact du
                responsable de traitement — voir [adresse email dédiée RGPD].
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Cookies</h2>
              <p className="mt-1">
                Le site n&apos;utilise pas de cookies de mesure d&apos;audience ni de publicité à ce
                jour. Si des cookies techniques (autres que ceux strictement nécessaires au
                fonctionnement) étaient ajoutés, un bandeau de consentement conforme serait mis en
                place au préalable.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

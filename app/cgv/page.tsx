import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";
import { MAIN_PLAN } from "@/lib/commerce/plans";

export const metadata: Metadata = { title: "Conditions générales de vente — ParcoursFR" };

export default function CgvPage() {
  return (
    <>
      <Header />
      <main>
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conditions générales de vente
          </h1>

          <div className="mt-8">
            <LegalDraftNotice />
          </div>

          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h2 className="text-base font-semibold text-foreground">1. Objet</h2>
              <p className="mt-1">
                Les présentes conditions régissent la vente de l&apos;abonnement « {MAIN_PLAN.name} »
                donnant accès à la formation de français niveau B1 proposée sur ParcoursFR (parcours
                de modules, exercices, audios, examens blancs).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">2. Prix</h2>
              <p className="mt-1">
                Le prix de l&apos;abonnement « {MAIN_PLAN.name} » est de {MAIN_PLAN.priceLabel} TTC
                par {MAIN_PLAN.interval}, tel qu&apos;affiché sur la page Offre au moment de la
                souscription. [À compléter : taux de TVA applicable et mention du régime fiscal de
                l&apos;éditeur.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">3. Paiement</h2>
              <p className="mt-1">
                Le paiement est effectué en ligne par carte bancaire via Stripe, prestataire de
                paiement sécurisé. ParcoursFR ne collecte ni ne stocke aucune donnée de carte
                bancaire.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">4. Durée et résiliation</h2>
              <p className="mt-1">
                L&apos;abonnement est sans engagement de durée et se renouvelle automatiquement
                chaque {MAIN_PLAN.interval} jusqu&apos;à résiliation par la personne abonnée.
                L&apos;accès reste actif jusqu&apos;à la fin de la période déjà payée. [À compléter :
                procédure exacte de résiliation une fois l&apos;espace compte disponible.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">5. Droit de rétractation</h2>
              <p className="mt-1">
                Conformément au code de la consommation, tout consommateur dispose en principe d&apos;un
                délai de 14 jours pour se rétracter d&apos;un achat en ligne. Ce droit peut toutefois
                ne pas s&apos;appliquer à un contenu numérique dont l&apos;exécution a commencé
                immédiatement avec l&apos;accord exprès du consommateur et sa renonciation expresse à
                ce droit. <strong>Le point exact — formulation de la renonciation, moment de son
                recueil au moment du paiement — doit être validé par un juriste avant mise en ligne</strong>,
                car il conditionne la validité de toute clause de renonciation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">6. Absence de garantie de résultat</h2>
              <p className="mt-1">
                ParcoursFR fournit un outil pédagogique et des examens blancs d&apos;entraînement.
                Aucune garantie de réussite à un examen officiel (DELF, TCF ou autre) n&apos;est
                donnée, quelle que soit l&apos;assiduité de l&apos;utilisateur·rice.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">7. Droit applicable et litiges</h2>
              <p className="mt-1">
                [À compléter avec le droit applicable et la juridiction compétente, ou le médiateur de
                la consommation applicable, une fois l&apos;éditeur identifié.]
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";
import { MAIN_PLAN } from "@/lib/commerce/plans";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de l'offre ParcoursFR (abonnement, paiement, résiliation).",
  alternates: { canonical: "/cgv" },
};

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
                donnant accès à la formation de français niveau B1 proposée sur ParcoursFR.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">2. Caractéristiques de l&apos;offre</h2>
              <p className="mt-1">L&apos;abonnement « {MAIN_PLAN.name} » comprend :</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {MAIN_PLAN.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="mt-2">
                Un test de positionnement et deux modules complets restent accessibles gratuitement,
                sans compte payant, pour essayer la méthode avant de souscrire.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">3. Prix</h2>
              <p className="mt-1">
                Le prix de l&apos;abonnement « {MAIN_PLAN.name} » est de {MAIN_PLAN.priceLabel} TTC
                par {MAIN_PLAN.interval}, tel qu&apos;affiché sur la page Offre au moment de la
                souscription. Taux de TVA applicable et régime fiscal de l&apos;éditeur : À FOURNIR
                PAR LE PROPRIÉTAIRE.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">4. Paiement</h2>
              <p className="mt-1">
                Le paiement est effectué en ligne par carte bancaire via Stripe, prestataire de
                paiement sécurisé. ParcoursFR ne collecte ni ne stocke aucune donnée de carte
                bancaire.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">5. Accès au contenu numérique</h2>
              <p className="mt-1">
                L&apos;accès complet est activé automatiquement dès la confirmation du paiement par
                Stripe, sur le compte utilisé pour souscrire. Aucun support physique n&apos;est
                fourni : l&apos;abonnement donne uniquement accès au contenu en ligne, depuis un
                navigateur récent et une connexion Internet.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">6. Durée et résiliation</h2>
              <p className="mt-1">
                L&apos;abonnement est sans engagement de durée et se renouvelle automatiquement
                chaque {MAIN_PLAN.interval} jusqu&apos;à résiliation par la personne abonnée.
                L&apos;accès reste actif jusqu&apos;à la fin de la période déjà payée. La résiliation
                en libre-service depuis le compte n&apos;est pas encore disponible : elle se fait en
                contactant ParcoursFR (voir la page{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact
                </Link>
                ).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">7. Droit de rétractation</h2>
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
              <h2 className="text-base font-semibold text-foreground">8. Remboursement</h2>
              <p className="mt-1">
                Hors cas de rétractation valablement exercé (voir section 7), aucun remboursement
                n&apos;est garanti pour une période d&apos;abonnement déjà entamée. Politique de
                remboursement définitive (notamment en cas de dysfonctionnement du service imputable
                à ParcoursFR) : À FOURNIR PAR LE PROPRIÉTAIRE.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">9. Responsabilité</h2>
              <p className="mt-1">
                ParcoursFR fournit un outil pédagogique et des examens blancs d&apos;entraînement.
                Aucune garantie de réussite à un examen officiel (DELF, TCF ou autre) n&apos;est
                donnée, quelle que soit l&apos;assiduité de l&apos;utilisateur·rice. ParcoursFR ne
                saurait être tenu responsable d&apos;une interruption temporaire du service (maintenance,
                panne d&apos;un prestataire technique) ni d&apos;un usage non conforme du service par
                l&apos;utilisateur·rice. [À compléter : clause de limitation de responsabilité
                définitive, à valider par un juriste.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">10. Propriété intellectuelle</h2>
              <p className="mt-1">
                L&apos;abonnement donne un droit d&apos;usage personnel et non transférable des
                contenus pédagogiques, pour la durée de l&apos;abonnement. Ces contenus restent la
                propriété de leur éditeur (voir les{" "}
                <Link href="/mentions-legales" className="underline hover:text-foreground">
                  mentions légales
                </Link>
                ) et ne peuvent être reproduits, redistribués ou partagés sans autorisation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">11. Données personnelles</h2>
              <p className="mt-1">
                Le traitement des données personnelles nécessaires à la souscription et à
                l&apos;utilisation de l&apos;abonnement est détaillé dans la{" "}
                <Link href="/confidentialite" className="underline hover:text-foreground">
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">12. Droit applicable et litiges</h2>
              <dl className="mt-2 space-y-1.5">
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Droit applicable / juridiction compétente :</dt>
                  <dd>À FOURNIR PAR LE PROPRIÉTAIRE</dd>
                </div>
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Médiateur de la consommation :</dt>
                  <dd>À FOURNIR PAR LE PROPRIÉTAIRE</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">13. Contact</h2>
              <p className="mt-1">
                Pour toute question relative à ces conditions ou à un abonnement en cours, voir la
                page{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

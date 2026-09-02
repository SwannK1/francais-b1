import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import LegalDraftNotice from "@/components/commerce/LegalDraftNotice";

export const metadata: Metadata = { title: "Confidentialité — ParcoursFR" };

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Politique de confidentialité
          </h1>

          <div className="mt-8">
            <LegalDraftNotice />
          </div>

          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h2 className="text-base font-semibold text-foreground">Données de compte</h2>
              <p className="mt-1">
                La création d&apos;un compte (email, mot de passe) est nécessaire pour retrouver ta
                progression sur plusieurs appareils. Le mot de passe n&apos;est jamais stocké en
                clair : seul un hachage (scrypt, avec sel unique par compte) est conservé. La
                connexion repose sur une session stockée côté serveur (seul le hachage du jeton de
                session est en base, jamais le jeton lui-même) et un cookie technique{" "}
                <code>session</code>, nécessaire au fonctionnement du compte.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Progression pédagogique</h2>
              <p className="mt-1">
                Ta progression (niveau, modules terminés, réponses aux exercices, tentatives
                d&apos;examen) est enregistrée dans ton navigateur (« localStorage »). Si tu es
                connecté·e à un compte, elle est aussi synchronisée vers un stockage serveur pour
                rester disponible d&apos;un appareil à l&apos;autre ; sans compte, elle ne quitte
                jamais ton navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Statut d&apos;abonnement</h2>
              <p className="mt-1">
                Si tu souscris à l&apos;offre payante, ton compte conserve la date jusqu&apos;à
                laquelle ton accès complet est actif, ainsi que l&apos;identifiant client attribué
                par Stripe — nécessaire pour faire le lien entre un paiement confirmé et ton
                compte. Cette information n&apos;est écrite que par notre intégration Stripe,
                jamais directement par toi ou par un autre visiteur.
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
              <h2 className="text-base font-semibold text-foreground">Emails transactionnels</h2>
              <p className="mt-1">
                Les emails nécessaires au fonctionnement du compte (par exemple la réinitialisation
                de mot de passe) sont envoyés via Resend, prestataire d&apos;envoi d&apos;emails
                tiers, qui traite à cette fin ton adresse email et le contenu de ces emails.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Sous-traitants</h2>
              <p className="mt-1">
                Les données de compte et de progression sont hébergées dans une base de données
                Postgres fournie par Neon. Les paiements sont traités par Stripe. Les emails
                transactionnels sont envoyés via Resend. Ces trois prestataires agissent comme
                sous-traitants au sens du RGPD, dans le cadre strict de leur fonction (hébergement de
                données / traitement du paiement / envoi d&apos;emails). L&apos;hébergeur de
                l&apos;application elle-même est indiqué dans les{" "}
                <Link href="/mentions-legales" className="underline hover:text-foreground">
                  mentions légales
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Finalités et durée de conservation</h2>
              <p className="mt-1">
                Les données de compte et de progression sont conservées tant que le compte existe,
                pour permettre l&apos;accès au service et le suivi pédagogique. Durée précise de
                conservation après suppression du compte ou inactivité prolongée, et base légale
                retenue pour chaque traitement (exécution du contrat, intérêt légitime...) : À
                FOURNIR PAR LE PROPRIÉTAIRE.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Tes droits</h2>
              <p className="mt-1">
                Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de rectification,
                d&apos;effacement, de limitation et de portabilité de tes données, ainsi que d&apos;un
                droit d&apos;opposition. Pour les exercer, écris-nous à : À FOURNIR PAR LE
                PROPRIÉTAIRE (adresse email dédiée RGPD). Tu peux aussi introduire une réclamation
                auprès de la CNIL (cnil.fr).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Cookies et mesure d&apos;audience</h2>
              <p className="mt-1">
                Un compte utilisateur utilise un cookie de session, strictement nécessaire au
                fonctionnement du service (rester connecté·e). Le site utilise aussi Vercel Web
                Analytics pour mesurer l&apos;audience et l&apos;usage des principales étapes du
                parcours (inscription, test de niveau, modules, examen blanc, offre) : cet outil ne
                pose aucun cookie et n&apos;identifie pas les personnes individuellement. Aucun
                cookie de publicité n&apos;est utilisé. [Qualification juridique exacte du régime de
                consentement applicable à cette mesure d&apos;audience — à valider par un juriste
                avant mise en ligne, notamment au regard des dernières recommandations de la CNIL.]
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <p className="mt-1">
                Pour toute question sur cette politique ou sur tes données, voir les coordonnées sur
                la page{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact
                </Link>{" "}
                ou dans les{" "}
                <Link href="/mentions-legales" className="underline hover:text-foreground">
                  mentions légales
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

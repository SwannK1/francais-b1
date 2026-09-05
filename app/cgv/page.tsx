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
      <main id="main-content">
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
                Le prix de l&apos;abonnement « {MAIN_PLAN.name} » est de {MAIN_PLAN.priceLabel} par{" "}
                {MAIN_PLAN.interval}, tel qu&apos;affiché sur la page Offre au moment de la
                souscription. Régime de TVA applicable : [À COMPLÉTER APRÈS IMMATRICULATION —
                franchise en base de TVA (art. 293 B du Code général des impôts, prix non soumis à
                TVA) ou assujettissement à la TVA selon le régime finalement retenu par
                l&apos;éditeur].
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
                L&apos;accès reste actif jusqu&apos;à la fin de la période déjà payée, sans
                remboursement du temps restant. La résiliation se fait en libre-service, à tout
                moment, depuis le bouton « Gérer mon abonnement » disponible sur la page{" "}
                <Link href="/offre" className="underline hover:text-foreground">
                  Offre
                </Link>{" "}
                une fois connecté·e (portail de gestion sécurisé fourni par Stripe). En cas de
                difficulté, voir aussi la page{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">7. Droit de rétractation</h2>
              <p className="mt-1">
                Conformément aux articles L221-18 et suivants du code de la consommation, tout
                consommateur dispose d&apos;un délai de 14 jours à compter de la souscription pour se
                rétracter, sans avoir à justifier de motif ni à supporter d&apos;autres coûts que ceux
                prévus par la loi.
              </p>
              <p className="mt-2">
                La loi prévoit que ce droit peut cesser de s&apos;appliquer, avant la fin des 14 jours,
                pour un service ou un contenu numérique non fourni sur support matériel dont
                l&apos;exécution a commencé, à la double condition que le consommateur ait donné son
                accord préalable exprès pour une exécution immédiate <em>et</em> reconnu expressément
                perdre son droit de rétractation une fois le service pleinement exécuté (articles
                L221-28 12° et 13° du code de la consommation). <strong>Tant que le parcours de
                paiement ne recueille pas explicitement cet accord et cette renonciation au moment de
                la commande, cette exception ne peut pas être valablement invoquée par
                l&apos;éditeur</strong> : le délai de rétractation de 14 jours s&apos;applique alors
                dans les conditions de droit commun. La mise en conformité de ce point (recueil du
                consentement dans le parcours de paiement) reste à finaliser techniquement — voir le
                rapport d&apos;audit correspondant.
              </p>
              <p className="mt-2">
                <strong>Modalités d&apos;exercice :</strong> pour exercer ce droit, écris une
                déclaration dénuée d&apos;ambiguïté (par exemple le modèle ci-dessous) à l&apos;adresse{" "}
                <a href="mailto:swann.kerboeuf@gmail.com" className="underline hover:text-foreground">
                  swann.kerboeuf@gmail.com
                </a>
                , avant l&apos;expiration du délai de 14 jours. Adresse postale de l&apos;éditeur pour
                l&apos;exercice de ce droit par courrier : [À COMPLÉTER APRÈS IMMATRICULATION].
              </p>
              <p className="mt-2 rounded-lg bg-muted p-3 text-xs italic">
                Modèle de formulaire de rétractation (à compléter et renvoyer uniquement si tu
                souhaites te rétracter) : « Je notifie par la présente ma rétractation du contrat
                portant sur l&apos;abonnement « {MAIN_PLAN.name} » souscrit le [date]. Nom du
                consommateur : [...]. Adresse du consommateur : [...]. Date : [...]. »
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground">8. Remboursement</h2>
              <p className="mt-1">
                En dehors des cas de rétractation valablement exercée (voir section 7) et des recours
                prévus par la loi en cas de non-conformité du service imputable à l&apos;éditeur,
                aucun remboursement supplémentaire n&apos;est proposé au titre d&apos;une période
                d&apos;abonnement déjà entamée. Modalités pratiques de traitement d&apos;une demande de
                remboursement légalement due : [À COMPLÉTER APRÈS IMMATRICULATION].
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
                  <dt className="font-medium text-foreground">Droit applicable :</dt>
                  <dd>Droit français.</dd>
                </div>
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="font-medium text-foreground">Médiateur de la consommation :</dt>
                  <dd>[MÉDIATEUR À DÉSIGNER AVANT OUVERTURE COMMERCIALE]</dd>
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

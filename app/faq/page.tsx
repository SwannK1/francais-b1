import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { JsonLd, faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Réponses aux questions fréquentes sur ParcoursFR : niveaux A1 à B1 couverts, essai gratuit, contenu de l'offre, résiliation et paiement.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "À qui s'adresse ParcoursFR ?",
    answer:
      "À toute personne qui veut progresser en français pour vivre en France avec plus d'autonomie, du niveau A1 au niveau B1 : vie quotidienne, travail, démarches administratives, ou préparation du DELF B1.",
  },
  {
    question: "Le produit couvre-t-il tous les niveaux, du A1 au C2 ?",
    answer:
      "Le test de positionnement estime ton niveau sur l'échelle A1 à B2. Le contenu du parcours (modules, exercices, examens blancs) couvre les niveaux A1, A2 et B1 ; au-delà de B1, aucun parcours dédié n'est encore disponible.",
  },
  {
    question: "Qu'est-ce que je peux essayer gratuitement ?",
    answer:
      "Le test de positionnement (ou le diagnostic détaillé) et 2 modules B1 complets, avec leurs exercices, audios et corrections — pas des versions tronquées. Si ton niveau estimé est A1 ou A2, tu peux consulter la fiche des modules correspondants, mais l'exercice lui-même reste réservé à l'offre complète : la découverte gratuite n'ouvre pour l'instant que 2 modules B1.",
  },
  {
    question: `Qu'est-ce que contient l'offre « ${MAIN_PLAN.name} » ?`,
    answer: `Le parcours complet du niveau A1 au niveau B1 (des dizaines de modules), tous les audios, la pratique orale, les productions écrites avec grille d'auto-évaluation, des examens blancs DELF (A2 et B1) et une évaluation finale A1, et le suivi de progression. Voir le détail sur la page Offre.`,
  },
  {
    question: "Le DELF B1 est-il garanti ?",
    answer:
      "Non, aucune formation ne peut garantir la réussite à un examen. ParcoursFR propose un entraînement structuré et des examens blancs fidèles au format officiel, pas une garantie de résultat.",
  },
  {
    question: "ParcoursFR est-il affilié à France Éducation International ou au DELF/TCF officiels ?",
    answer:
      "Non. ParcoursFR n'est affilié à aucun organisme officiel. Les exercices et examens blancs sont des contenus pédagogiques originaux, inspirés du format public de ces examens.",
  },
  {
    question: "Puis-je résilier à tout moment ?",
    answer:
      "Oui, l'abonnement est sans engagement. La résiliation en libre-service depuis ton compte n'est pas encore disponible : contacte-nous pour résilier. Ton accès reste actif jusqu'à la fin de la période déjà payée. Voir les CGV pour le détail.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "Le paiement est géré par Stripe, un prestataire spécialisé : aucune donnée de carte bancaire ne transite ni n'est stockée par ParcoursFR.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <Header />
      <main id="main-content">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h1>

          <dl className="mt-10 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { MAIN_PLAN } from "@/lib/commerce/plans";

export const metadata: Metadata = { title: "FAQ — ParcoursFR" };

const faqs = [
  {
    question: "À qui s'adresse ParcoursFR ?",
    answer:
      "À toute personne qui veut atteindre le niveau B1 en français, avec ou sans objectif d'examen : vie quotidienne en France, travail, études, ou préparation du DELF B1.",
  },
  {
    question: "Le produit couvre-t-il tous les niveaux, du A1 au C2 ?",
    answer:
      "Non. Le test de positionnement estime ton niveau sur l'échelle A1 à B2 pour te dire si le parcours te convient, mais le contenu du parcours (modules, exercices, examens blancs) couvre le niveau B1.",
  },
  {
    question: "Qu'est-ce que je peux essayer gratuitement ?",
    answer:
      "Le test de positionnement et 2 modules complets du parcours B1, avec leurs exercices, audios et corrections — pas des versions tronquées.",
  },
  {
    question: `Qu'est-ce que contient l'offre « ${MAIN_PLAN.name} » ?`,
    answer: `Les 26 modules du parcours B1, tous les audios, les productions écrites avec grille d'auto-évaluation, un examen blanc DELF B1 complet et le suivi de progression. Voir le détail sur la page Offre.`,
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

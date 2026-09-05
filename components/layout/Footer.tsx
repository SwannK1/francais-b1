import Link from "next/link";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Produit",
    links: [
      { href: "/parcours", label: "Parcours B1" },
      { href: "/test-niveau", label: "Test de niveau" },
      { href: "/offre", label: "Offre" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Apprendre le B1",
    links: [
      { href: "/francais-b1", label: "Le niveau B1" },
      { href: "/exercices-b1", label: "Exercices B1" },
      { href: "/grammaire-b1", label: "Grammaire B1" },
      { href: "/comprehension-orale-b1", label: "Compréhension orale B1" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/cgv", label: "CGV" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Parcours<span className="text-primary">FR</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Apprendre le français et préparer son DELF B1, à son rythme.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} ParcoursFR. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}

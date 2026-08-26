import Link from "next/link";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Produit",
    links: [
      { href: "#apprentissage", label: "Apprendre" },
      { href: "#examens", label: "Examens" },
      { href: "/offre", label: "Offre" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "#", label: "À propos" },
      { href: "#", label: "Contact" },
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
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
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

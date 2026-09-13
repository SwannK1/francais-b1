import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * `href` pointe vers la première étape de contenu de chaque niveau — la
 * même page que verrait un apprenant réel arrivant à cette étape du
 * parcours unifié (voir `lib/pedagogy/data/{a1/parcours-stages-a1,
 * parcours-stages-a2,parcours-stages}.ts`), jamais une page dédiée
 * dupliquée. Les modules y sont librement consultables ; certains sont
 * verrouillés (offre complète), affiché honnêtement sur place plutôt que
 * masqué ici.
 */
const levels = [
  {
    level: "A1",
    title: "Découverte",
    pitch: "Je peux comprendre et utiliser des expressions simples.",
    description: "Les bases pour se présenter, se débrouiller au quotidien et être compris·e.",
    href: "/parcours/decouverte",
  },
  {
    level: "A2",
    title: "Élémentaire",
    pitch: "Je peux communiquer lors de tâches simples et habituelles.",
    description: "De quoi gérer les situations courantes : achats, rendez-vous, démarches simples.",
    href: "/parcours/a2-poser-les-bases",
  },
  {
    level: "B1",
    title: "Intermédiaire",
    pitch: "Je peux me débrouiller dans la plupart des situations de la vie en France.",
    description: "L'autonomie pour le travail, les démarches administratives et le DELF B1.",
    href: "/parcours/poser-les-bases",
  },
];

export default function Levels() {
  return (
    <section id="niveaux" className="py-16 sm:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Un seul parcours, du niveau A1 au niveau B1
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Commence où tu en es réellement : le test de niveau t&apos;oriente vers la bonne étape,
          puis le parcours t&apos;emmène progressivement jusqu&apos;au niveau B1.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {levels.map((item) => (
            <div
              key={item.level}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Badge variant="primary">Niveau {item.level}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground">{item.pitch}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <Link
                href={item.href}
                className={cn(buttonClasses("secondary", "md"), "mt-4 self-start gap-1.5")}
              >
                Essayer {item.level}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Tu ne connais pas ton niveau ?{" "}
          <Link href="/test-niveau" className="font-semibold text-primary hover:underline">
            Fais le test de niveau
          </Link>
        </p>
      </Container>
    </section>
  );
}

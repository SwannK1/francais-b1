import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import ParcoursExperience from "./ParcoursExperience";

export const metadata: Metadata = {
  title: "Ton parcours de français",
  description:
    "Suis ton parcours guidé en plusieurs étapes, de A1 à B1, pour progresser en français et gagner en autonomie dans la vie quotidienne en France.",
  alternates: { canonical: "/parcours" },
};

export default function ParcoursPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Parcours", path: "/parcours" }])} />
      <ParcoursExperience publicModules={PUBLIC_MODULES} />
    </>
  );
}

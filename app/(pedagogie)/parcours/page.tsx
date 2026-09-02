import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import ParcoursExperience from "./ParcoursExperience";

export default function ParcoursPage() {
  return <ParcoursExperience publicModules={PUBLIC_MODULES} />;
}

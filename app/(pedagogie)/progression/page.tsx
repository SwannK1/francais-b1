import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import ProgressionExperience from "./ProgressionExperience";

export default function ProgressionPage() {
  return <ProgressionExperience publicModules={PUBLIC_MODULES} />;
}

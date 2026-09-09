import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpeakingExerciseById, SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import ViewTracker from "@/lib/analytics/ViewTracker";
import SpeakingExerciseCard from "@/components/speaking/SpeakingExerciseCard";

export async function generateMetadata({
  params,
}: PageProps<"/oral/[id]">): Promise<Metadata> {
  const { id } = await params;
  const exercise = getSpeakingExerciseById(id);
  if (!exercise) return {};

  return {
    title: `${exercise.title} — Expression orale`,
    description: exercise.instructions,
    alternates: { canonical: `/oral/${exercise.id}` },
  };
}

export default async function OralExercisePage({ params }: PageProps<"/oral/[id]">) {
  const { id } = await params;
  const exercise = getSpeakingExerciseById(id);

  if (!exercise) {
    notFound();
  }

  const user = await getCurrentUser();
  const isFree = canAccess({ kind: "speaking", exerciseId: exercise.id }, user?.premiumUntil);

  if (!isFree) {
    return (
      <PremiumLock
        title={exercise.title}
        description={exercise.instructions}
        backHref="/oral"
        backLabel="← Retour à l'expression orale"
      />
    );
  }

  return (
    <div className="space-y-6">
      <ViewTracker
        event="speaking_practice_viewed"
        properties={{ speakingExerciseId: exercise.id, speakingKind: exercise.kind }}
      />
      <Breadcrumbs
        items={[
          { label: "Parcours", href: "/parcours" },
          { label: "Expression orale", href: "/oral" },
          { label: SPEAKING_KIND_LABELS[exercise.kind], href: "/oral" },
          { label: exercise.title },
        ]}
      />
      <SpeakingExerciseCard exercise={exercise} />
    </div>
  );
}

import { buttonClasses } from "@/components/ui/button-styles";
import Card from "@/components/ui/Card";

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Diagnostic de niveau détaillé</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          18 questions au maximum, environ 5 à 8 minutes. La difficulté augmente
          progressivement : commence simplement, sans te soucier de ton niveau de départ.
        </p>
      </header>

      <Card>
        <ul className="space-y-2 text-sm text-foreground">
          <li>• Compréhension écrite, vocabulaire et grammaire</li>
          <li>• Le test peut s&apos;arrêter plus tôt si ton niveau est déjà clair</li>
          <li>• À la fin : un niveau estimé (A1, A2 ou B1), tes points forts et fragiles</li>
          <li>• Résultat indicatif, pas une certification officielle</li>
        </ul>
      </Card>

      <button type="button" onClick={onStart} className={buttonClasses("primary", "lg")}>
        Commencer le diagnostic
      </button>
    </div>
  );
}

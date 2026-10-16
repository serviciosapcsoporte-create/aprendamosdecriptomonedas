import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const CORRECTA = "B";

export function SeedQuiz() {
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const respondida = seleccion !== null;
  const acierto = seleccion === CORRECTA;

  return (
    <section className="col-span-full mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
      <h3 className="mb-2 font-serif text-xl">Quiz de retencion: seed phrase</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Un soporte tecnico te pide tus 12 palabras clave para ayudarte a recuperar
        fondos. Que haces?
      </p>
      <div className="space-y-3">
        <button
          disabled={respondida}
          onClick={() => setSeleccion("A")}
          className={seleccion === "A" ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-red-500/60 bg-red-500/10" : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"}
        >
          <span className="font-bold">A)</span>
          <span>Se las entrego si tienen foto oficial.</span>
        </button>
        <button
          disabled={respondida}
          onClick={() => setSeleccion("B")}
          className={seleccion === "B" ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-green-500/60 bg-green-500/10" : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"}
        >
          <span className="font-bold">B)</span>
          <span>Jamas las entrego; la frase semilla NUNCA se comparte.</span>
        </button>
      </div>
      {respondida && (
        <div
          className={acierto ? "mt-4 flex items-start gap-3 rounded-xl px-4 py-3 text-sm border border-green-500/40 bg-green-500/10 text-green-800 dark:text-green-200" : "mt-4 flex items-start gap-3 rounded-xl px-4 py-3 text-sm border border-red-500/40 bg-red-500/10 text-red-800 dark:text-red-200"}
        >
          {acierto ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
          <p>
            {acierto ? "Correcto. Ningun soporte legitimo te pedira tu frase semilla." : "Incorrecto. La frase semilla nunca se comparte con nadie, ni soporte."}
          </p>
        </div>
      )}
    </section>
  );
}

import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const CORRECTA = "B";

export function InmutableQuiz() {
  const [sel, setSel] = useState<string | null>(null);
  const ok = sel === CORRECTA;
  return (
    <section className="mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
      <h3 className="mb-3 font-serif text-xl">Quiz de retencion</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Por que se dice que la blockchain es inmutable?
      </p>
      <div className="space-y-3">
        {[
          { k: "A", t: "Porque esta guardada en la nube de Google." },
          { k: "B", t: "Porque requeriria modificar el registro en la mayoria de los nodos simultaneamente." },
          { k: "C", t: "Porque no permite hacer transacciones de mas de $1,000 USD." },
        ].map((o) => (
          <button
            key={o.k}
            disabled={sel !== null}
            onClick={() => setSel(o.k)}
            className={
              sel === o.k
                ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-amber-500/60 bg-amber-500/10"
                : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"
            }
          >
            <span className="font-bold">{o.k})</span>
            <span>{o.t}</span>
          </button>
        ))}
      </div>
      {sel && (
        <div
          className={
            ok
              ? "mt-4 flex items-start gap-3 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-800 dark:text-green-200"
              : "mt-4 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200"
          }
        >
          {ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
          <p>
            {ok
              ? "Correcto. Modificar la cadena exigiria alterar la mayoria de los nodos a la vez."
              : "Incorrecto. La inmutabilidad viene de la red distribuida, no de la nube ni de limites de monto."}
          </p>
        </div>
      )}
    </section>
  );
}

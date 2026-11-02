/**
 * CustodiaSimulador: widget interactivo de la landing de inventario de wallets.
 *
 * POR QUE EXISTE
 * La plantilla ensena a separar capital por tipo de custodia, pero una tabla
 * vacia no muestra la consecuencia de esa mezcla. Este simulador convierte los
 * tres saldos en porcentajes y en un estado de exposicion legible al instante.
 *
 * REGLAS
 * - Todo se calcula en el navegador: no se envia ni se guarda ningun monto.
 * - Los montos se guardan como texto sin normalizar para que el campo se pueda
 *   vaciar y reescribir sin ceros a la izquierda; el numero se deriva al vuelo.
 * - Los umbrales son editoriales y explicitos (>20 % en CEX = exposicion alta,
 *   menos de la mitad en autocustodia = exposicion media), no un consejo de
 *   inversion ni una medicion de riesgo real de mercado.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, Building2, CheckCircle2, Flame, Snowflake } from "lucide-react";

type IdCustodia = "cold" | "hot" | "cex";

interface Entrada {
  id: IdCustodia;
  etiqueta: string;
  detalle: string;
  Icono: typeof Snowflake;
  claseBorde: string;
  claseTexto: string;
}

const ENTRADAS: Entrada[] = [
  {
    id: "cold",
    etiqueta: "Cold storage (USD)",
    detalle: "Hardware wallet o papel, bajo tu control",
    Icono: Snowflake,
    claseBorde: "border-success/30 focus:border-success",
    claseTexto: "text-success",
  },
  {
    id: "hot",
    etiqueta: "Hot wallets (USD)",
    detalle: "Capital operativo en extensiones o apps",
    Icono: Flame,
    claseBorde: "border-warning/30 focus:border-warning",
    claseTexto: "text-warning",
  },
  {
    id: "cex",
    etiqueta: "Exchanges (USD)",
    detalle: "Custodia de terceros, sin tus claves",
    Icono: Building2,
    claseBorde: "border-danger/30 focus:border-danger",
    claseTexto: "text-danger",
  },
];

const formato = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

function aNumero(texto: string): number {
  const n = Number(texto.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function CustodiaSimulador() {
  const [montos, setMontos] = useState<Record<IdCustodia, string>>({
    cold: "15000",
    hot: "3500",
    cex: "2000",
  });

  const datos = useMemo(() => {
    const coldUsd = aNumero(montos.cold);
    const hotUsd = aNumero(montos.hot);
    const cexUsd = aNumero(montos.cex);
    const total = coldUsd + hotUsd + cexUsd;
    const pct = (v: number) => (total > 0 ? (v / total) * 100 : 0);
    const cold = pct(coldUsd);
    const hot = pct(hotUsd);
    const cex = pct(cexUsd);

    let estado: { tono: "success" | "warning" | "danger"; titulo: string; detalle: string };
    if (total === 0) {
      estado = {
        tono: "warning",
        titulo: "Sin datos todavía",
        detalle: "Escribe al menos un saldo para ver la distribución.",
      };
    } else if (cex > 20) {
      estado = {
        tono: "danger",
        titulo: "Exposición alta",
        detalle: "Más del 20 % del capital está en custodios centralizados: no tienes las claves.",
      };
    } else if (cold < 50) {
      estado = {
        tono: "warning",
        titulo: "Exposición media",
        detalle: "Menos de la mitad del capital está en autocustodia (cold storage).",
      };
    } else {
      estado = {
        tono: "success",
        titulo: "Exposición controlada",
        detalle: "La mayoría del capital está bajo tu control y el peso en exchanges es bajo.",
      };
    }

    return { total, cold, hot, cex, estado };
  }, [montos]);

  const EstadoIcono = datos.estado.tono === "success" ? CheckCircle2 : AlertTriangle;

  return (
    <section
      aria-labelledby="simulador-titulo"
      className="mb-10 rounded-3xl border border-warning/30 bg-gradient-to-br from-card via-card-dark to-card p-6 shadow-2xl md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <h2 id="simulador-titulo" className="flex items-center gap-2 text-sm font-bold text-warning">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/15">
            <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          Simulador de distribución de custodia
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Se calcula en tu navegador
        </span>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {ENTRADAS.map((e) => {
          const valorPct =
            e.id === "cold" ? datos.cold : e.id === "hot" ? datos.hot : datos.cex;
          return (
            <div key={e.id} className="rounded-2xl border border-border bg-background/60 p-4">
              <label
                htmlFor={`custodia-${e.id}`}
                className={`mb-1 flex items-center gap-1.5 text-xs font-bold ${e.claseTexto}`}
              >
                <e.Icono className="h-3.5 w-3.5" aria-hidden="true" />
                {e.etiqueta}
              </label>
              <input
                id={`custodia-${e.id}`}
                type="number"
                inputMode="numeric"
                min={0}
                step={100}
                placeholder="0"
                value={montos[e.id]}
                onChange={(ev) =>
                  setMontos((prev) => ({ ...prev, [e.id]: ev.target.value }))
                }
                className={`w-full rounded-xl border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors ${e.claseBorde}`}
              />
              <span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">
                {e.detalle} · {valorPct.toFixed(1)} %
              </span>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-background/70 p-4">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-xs text-muted-foreground">Capital total auditado</span>
          <strong className="font-mono text-lg text-warning">
            {formato.format(datos.total)} USD
          </strong>
        </div>

        <div
          className="mb-3 flex h-3 w-full overflow-hidden rounded-full bg-secondary"
          role="img"
          aria-label={`Composición: ${datos.cold.toFixed(1)} % cold storage, ${datos.hot.toFixed(1)} % hot wallets, ${datos.cex.toFixed(1)} % exchanges`}
        >
          {datos.total > 0 && (
            <>
              <div
                className="h-full bg-success transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${datos.cold}%` }}
              />
              <div
                className="h-full bg-warning transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${datos.hot}%` }}
              />
              <div
                className="h-full bg-danger transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${datos.cex}%` }}
              />
            </>
          )}
        </div>

        <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Cold {datos.cold.toFixed(1)} %
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
            Hot {datos.hot.toFixed(1)} %
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
            Exchanges {datos.cex.toFixed(1)} %
          </li>
        </ul>

        <p
          aria-live="polite"
          className={`flex items-start gap-2 rounded-xl border p-3 text-xs ${
            datos.estado.tono === "danger"
              ? "border-danger/30 bg-danger/10 text-danger"
              : datos.estado.tono === "warning"
                ? "border-warning/30 bg-warning/10 text-warning"
                : "border-success/30 bg-success/10 text-success"
          }`}
        >
          <EstadoIcono className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>{datos.estado.titulo}:</strong> {datos.estado.detalle}
          </span>
        </p>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Los umbrales son de referencia editorial (más del 20 % en exchanges = exposición alta) y no
        constituyen asesoría de inversión. No escribas montos reales: nada se envía ni se guarda.
      </p>
    </section>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { miniaturaDe } from "@/data/thumbnails";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/O107924637I";

export function LeccionDerivados({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [entryPrice, setEntryPrice] = useState(3000);
  const [leverage, setLeverage] = useState(10);
  const [positionSize, setPositionSize] = useState(5000);
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const marginRequired = positionSize / leverage;
  const maintenanceMarginPct = 0.005;
  const liquidationPrice =
    positionType === "long"
      ? entryPrice * (1 - 1 / leverage + maintenanceMarginPct)
      : entryPrice * (1 + 1 / leverage - maintenanceMarginPct);
  const estimatedFundingFee = (positionSize * 0.0001).toFixed(2);
  const clave = "nivel-4/derivados-futures-y-opciones";
  const portada = miniaturaDe("4", 4, topic.slug, topic.title);

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/nivel-4-experto" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al Nivel 4
            </Link>
          </nav>

          <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 4</span>
              <span className="text-sm text-gray-400">31% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[31%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src={portada.src} alt="Trading de Derivados Cripto Futuros y Opciones" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Futuros Perpetuos & Funding</div>
              <p className="text-xs text-gray-300">Sin fecha de vencimiento. La Tasa de Financiacion (Funding Rate) equilibra el precio del contrato con el mercado Spot mediante pagos entre Longs y Shorts.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Contango vs Backwardation</div>
              <p className="text-xs text-gray-300">Contango ocurre cuando el precio del futuro cotiza con prima sobre el spot (Bullish). Backwardation ocurre cuando el futuro cotiza con descuento (Bearish).</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Opciones (Greeks)</div>
              <p className="text-xs text-gray-300">Contratos de derecho sin obligacion (Call/Put). Permiten coberturas de cartera (hedging) midiendo sensibilidad con Delta, Gamma, Theta y Vega.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Calculadora de Riesgo de Liquidacion & Margen (Perpetuals Engine)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta tu apalancamiento y tamano de posicion para calcular el margen requerido y la distancia al precio de liquidacion:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Direccion de la Posicion:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPositionType("long")}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${positionType === "long" ? "border border-green-400 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Long (Comprar)
                  </button>
                  <button
                    onClick={() => setPositionType("short")}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${positionType === "short" ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Short (Vender)
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Apalancamiento: <strong className="text-amber-400">{leverage}x</strong></label>
                <input type="range" min="2" max="50" step="1" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Tamano Posicion: <strong className="text-white">${positionSize.toLocaleString()} USD</strong></label>
                <input type="range" min="1000" max="50000" step="1000" value={positionSize} onChange={(e) => setPositionSize(Number(e.target.value))} className="w-full cursor-pointer accent-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/80 p-4 text-center font-mono text-xs md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Margen Inicial Requerido:</span>
                <strong className="text-base text-amber-400">${marginRequired.toFixed(2)} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Precio de Liquidacion Estimado:</span>
                <strong className="text-base font-extrabold text-red-400">${liquidationPrice.toFixed(2)} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Funding Fee Est. (cada 8h):</span>
                <strong className="text-base text-gray-300">±${estimatedFundingFee} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src={portada.src} alt="Curso Experto Derivados y Futuros Cripto" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Hedging con Opciones, Arbitraje de Funding & Derivados en Deribit</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a proteger carteras institucionales con estrategias Delta-Neutral, explotar deltas en opciones cripto y automatizar coberturas en Deribit y dYdX.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que sucede con la Tasa de Financiacion (Funding Rate) en contratos de Futuros Perpetuos cuando la mayoria del mercado esta posicionado en Long y el precio del futuro supera al precio Spot?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) El Funding Rate se vuelve positivo; los traders en posicion Long pagan una tarifa periodica a los traders en Short para equilibrar los precios. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) El exchange cierra automaticamente todas las posiciones apalancadas para prevenir insolvencia.
              </button>
            </div>
          </div>

          <FinLeccion
            clave={clave}
            hrefAnterior={anterior ? `/nivel-4/${anterior.slug}` : null}
            tituloAnterior={anterior?.title ?? null}
            hrefSiguiente={siguiente ? `/nivel-4/${siguiente.slug}` : null}
            tituloSiguiente={siguiente?.title ?? null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

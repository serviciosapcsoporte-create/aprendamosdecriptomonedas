import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionGestionRiesgo({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [stopLossPercent, setStopLossPercent] = useState(2);
  const [rewardRatio, setRewardRatio] = useState(2);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const maxRiskUsd = (accountBalance * (riskPercentage / 100)).toFixed(2);
  const positionSizeUsd = (parseFloat(maxRiskUsd) / (stopLossPercent / 100)).toFixed(2);
  const targetProfitUsd = (parseFloat(maxRiskUsd) * rewardRatio).toFixed(2);
  const clave = "nivel-3/trading-avanzado-gestión-de-riesgo";

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/nivel-3-avanzado" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al Nivel 3
            </Link>
          </nav>

          <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 11</span>
              <span className="text-sm text-gray-400">61% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[61%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-11.webp" alt="Trading Avanzado: Gestión de Riesgo y Emociones" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Regla del 1% - 2%</div>
              <p className="text-xs text-gray-300">Nunca arriesgues mas del 1% al 2% de la cuenta total en un solo trade, independientemente del nivel de apalancamiento.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-green-400">Ratio Riesgo/Beneficio (R:R)</div>
              <p className="text-xs text-gray-300">Busca operaciones con un ratio minimo de 1:2. Si arriesgas $100, la meta de ganancia debe ser de al menos $200.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Stop Loss Inviolable</div>
              <p className="text-xs text-gray-300">El Stop Loss no se mueve durante la operacion. Define tu invalidez antes de ejecutar la entrada.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Calculadora Interactiva de Tamano de Posicion (Position Sizing)</h3>
            <p className="mb-4 text-sm text-gray-300">Ingresa el capital de tu cuenta y ajusta el riesgo para calcular exactamente cuanto comprar:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Balance de la Cuenta: <strong className="text-white">${accountBalance.toLocaleString()} USD</strong></label>
                <input type="range" min="1000" max="100000" step="1000" value={accountBalance} onChange={(e) => setAccountBalance(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Riesgo Maximo por Trade: <strong className="text-amber-400">{riskPercentage}%</strong></label>
                <input type="range" min="0.5" max="5" step="0.5" value={riskPercentage} onChange={(e) => setRiskPercentage(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Distancia al Stop Loss: <strong className="text-red-400">{stopLossPercent}%</strong></label>
                <input type="range" min="1" max="10" step="0.5" value={stopLossPercent} onChange={(e) => setStopLossPercent(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/60 p-4 text-center text-sm md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Perdida Maxima Tolera ($):</span>
                <strong className="text-base text-red-400">${maxRiskUsd} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Tamano de Posicion Sugerido:</span>
                <strong className="text-base text-amber-400">${positionSizeUsd} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Objetivo de Ganancia (R:R 1:{rewardRatio}):</span>
                <strong className="text-base text-green-400">+${targetProfitUsd} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-11.webp" alt="Curso Trading Profesional" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Trading Institucional y Gestion Monetaria</h3>
                <p className="mb-4 text-sm text-gray-300">Domina el calculo de riesgo, el uso de apalancamiento responsable y bitacoras de trading en vivo.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Curso en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">Si tienes una cuenta de $10,000 USD y aplicas la regla del 1% de riesgo con un Stop Loss del 5%, ¿de cuanto debe ser tu posicion total?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800"}`}
              >
                A) $2,000 USD (Para que una caida del 5% equivalga a la perdida maxima de $100 USD). (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800"}`}
              >
                B) $10,000 USD con apalancamiento 10x.
              </button>
            </div>
          </div>

          <FinLeccion
            clave={clave}
            hrefAnterior={anterior ? `/nivel-3/${anterior.slug}` : null}
            tituloAnterior={anterior?.title ?? null}
            hrefSiguiente={siguiente ? `/nivel-3/${siguiente.slug}` : null}
            tituloSiguiente={siguiente?.title ?? null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
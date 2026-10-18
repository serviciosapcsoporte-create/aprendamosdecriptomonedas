import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionYieldFarming({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [apy, setApy] = useState(40);
  const [days, setDays] = useState(90);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const ratePerDay = apy / 100 / 365;
  const finalValue = (initialInvestment * Math.pow(1 + ratePerDay, days)).toFixed(2);
  const totalEarned = (parseFloat(finalValue) - initialInvestment).toFixed(2);
  const clave = "nivel-3/yield-farming-de-fi";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 3</span>
              <span className="text-sm text-gray-400">16% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[16%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-03.webp" alt="Yield Farming y Rendimiento DeFi" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Liquidity Provider (LP)</div>
              <p className="text-xs text-gray-300">Aportas un par de tokens a un pool de liquidez y recibes comisiones de las operaciones de trading.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Staking de Tokens</div>
              <p className="text-xs text-gray-300">Bloqueas tus tokens LP o tokens de gobernanza para recibir recompensas adicionales del protocolo.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Compounding (Interes Compuesto)</div>
              <p className="text-xs text-gray-300">Reinviertes las recompensas obtenidas para multiplicar exponencialmente el rendimiento del capital.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Interes Compuesto (Yield Compounder)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta los parametros para ver el rendimiento estimado al reinvertir tus ganancias diariamente:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Inversion Inicial: <strong className="text-white">${initialInvestment} USD</strong></label>
                <input type="range" min="100" max="10000" step="100" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">APY Estimado: <strong className="text-amber-400">{apy}%</strong></label>
                <input type="range" min="5" max="200" step="5" value={apy} onChange={(e) => setApy(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Periodo: <strong className="text-white">{days} dias</strong></label>
                <input type="range" min="30" max="365" step="30" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-xl border border-gray-800 bg-black/60 p-4 text-sm md:flex-row">
              <div>
                <span className="text-gray-400">Ganancia Neta Estimada: </span>
                <strong className="ml-2 text-lg text-green-400">+${totalEarned} USD</strong>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-gray-400">Balance Total al Finalizar: </span>
                <strong className="ml-2 text-lg text-amber-400">${finalValue} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-03.webp" alt="Curso DeFi Yield Farming" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Yield Farming y Vaults Automaticos</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a configurar estrategias en Beefy Finance, Yearn y Curve para automatizar tus ganancias sin cometer errores de seguridad.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es el objetivo principal de la estrategia de Compounding (Interes Compuesto) en Yield Farming?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Vender todos los tokens principales para quedarse solo con stablecoins.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Reinvertir periodicamente las recompensas generadas para hacer crecer la base del capital depositado. (¡Correcto!)
              </button>
            </div>
          </div>

          <div className="container mx-auto max-w-4xl px-4 py-10">
            <FinLeccion
              clave={clave}
              hrefAnterior={anterior ? `/nivel-3/${anterior.slug}` : null}
              tituloAnterior={anterior?.title ?? null}
              hrefSiguiente={siguiente ? `/nivel-3/${siguiente.slug}` : null}
              tituloSiguiente={siguiente?.title ?? null}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
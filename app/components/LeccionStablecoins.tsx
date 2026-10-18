import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionStablecoins({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [collateralRatio, setCollateralRatio] = useState(150);
  const [marketPanic, setMarketPanic] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const effectiveCollateral = collateralRatio * (1 - marketPanic / 100);
  const stablePrice = effectiveCollateral < 100 ? (effectiveCollateral / 100).toFixed(2) : "1.00";
  const isDepegged = parseFloat(stablePrice) < 0.98;
  const clave = "nivel-3/tipos-de-stablecoins";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 4</span>
              <span className="text-sm text-gray-400">22% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[22%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-04.webp" alt="Tipos de Stablecoins y Balanza de Colateral" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Respaldadas por Fiat (1:1)</div>
              <p className="mb-2 text-xs text-gray-300">Cada token esta respaldado por dinero fiduciario o bonos del tesoro en un banco tradicional.</p>
              <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] text-blue-300">Ej: USDC, USDT</span>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-amber-400">Sobrecolateralizadas (Cripto)</div>
              <p className="mb-2 text-xs text-gray-300">Respaldadas por un exceso de criptomonedas (ej. $150 de ETH para emitir $100 en la stablecoin).</p>
              <span className="rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-300">Ej: DAI / USDS</span>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-red-400">Algoritmicas (Sin Colateral)</div>
              <p className="mb-2 text-xs text-gray-300">Mantienen la paridad mediante algoritmos de oferta/demanda y un token secundario.</p>
              <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono text-[11px] text-red-300">Ej: UST (Colapsado)</span>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Perdida de Paridad (De-peg Risk)</h3>
            <p className="mb-4 text-sm text-gray-300">Simula la presion de venta en el mercado para evaluar la estabilidad del precio:</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Colateral Cripto Inicial: <strong className="text-white">{collateralRatio}%</strong></label>
                <input type="range" min="80" max="200" value={collateralRatio} onChange={(e) => setCollateralRatio(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Panico / Caida del Mercado: <strong className="text-red-400">-{marketPanic}%</strong></label>
                <input type="range" min="0" max="60" value={marketPanic} onChange={(e) => setMarketPanic(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
            </div>

            <div className={`flex flex-col items-center justify-between rounded-xl border p-4 text-sm md:flex-row ${isDepegged ? "border-red-500 bg-red-950/80" : "border-gray-800 bg-black/60"}`}>
              <div>
                <span className="text-gray-400">Precio Estimado de la Stablecoin: </span>
                <strong className={`ml-2 text-xl font-extrabold ${isDepegged ? "text-red-400" : "text-green-400"}`}>${stablePrice} USD</strong>
              </div>
              <div className="mt-2 font-semibold md:mt-0">
                {isDepegged ? (
                  <span className="animate-pulse text-red-400">¡PERDIDA DE PARIDAD DETECTADA (DE-PEG)!</span>
                ) : (
                  <span className="text-green-400">Paridad Estable ($1.00 USD)</span>
                )}
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-04.webp" alt="Curso Stablecoins DeFi" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Gestion de Riesgo y Cobertura con Stablecoins</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a auditar los respaldos de emisores fiat y a estructurar carteras blindadas contra colapsos algoritmicos.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Por que las stablecoins sobrecolateralizadas en cripto (como DAI) requieren depositar mas de $100 USD en colateral para emitir $100 USD en tokens?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Para pagar las tarifas de mineria de la red Ethereum.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Para absorber la volatilidad del activo colateralizado (ETH) sin comprometer la paridad de $1.00 USD. (Correcto!)
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
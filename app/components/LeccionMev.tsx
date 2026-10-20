import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionMev({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [userSlippage, setUserSlippage] = useState(3);
  const [tradeAmountUsd, setTradeAmountUsd] = useState(10000);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const mevExtractedUsd = (tradeAmountUsd * (userSlippage / 100) * 0.85).toFixed(2);
  const finalReceivedUsd = (tradeAmountUsd - parseFloat(mevExtractedUsd)).toFixed(2);
  const clave = "nivel-3/mev-maximal-extractable-value";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 16</span>
              <span className="text-sm text-gray-400">88% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[88%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-16.webp" alt="MEV Maximal Extractable Value y Mempool Bots" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-red-400">Ataque Sandwich</div>
              <p className="text-xs text-gray-300">Un bot detecta tu orden en la mempool, compra antes que tu (Front-running) para elevar el precio y vende inmediatamente despues (Back-running).</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-amber-400">Arbitraje & Liquidaciones</div>
              <p className="text-xs text-gray-300">Aprovecha discrepancias de precios entre pools DEX o liquida posiciones insolventes en protocolos de prestamo antes que otros validadores.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-green-400">Proteccion MEV-Boost / Flashbots</div>
              <p className="text-xs text-gray-300">Envia transacciones de forma privada a constructores de bloques sin pasar por la mempool publica, evitando ser objetivo de bots.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Ataque Sandwich (Mempool Front-running)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta la tolerancia de Slippage en tu DEX y observa como un bot MEV extrae valor de tu transaccion:</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Monto de la Transaccion Swap: <strong className="text-white">${tradeAmountUsd.toLocaleString()} USD</strong></label>
                <input type="range" min="1000" max="50000" step="1000" value={tradeAmountUsd} onChange={(e) => setTradeAmountUsd(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Tolerancia a la Desviacion (Slippage): <strong className="text-red-400">{userSlippage}%</strong></label>
                <input type="range" min="0.1" max="5" step="0.1" value={userSlippage} onChange={(e) => setUserSlippage(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/60 p-4 text-center text-sm md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Valor Extraido por el MEV Bot:</span>
                <strong className="text-base text-red-400">-${mevExtractedUsd} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Monto Recibido Efectivo:</span>
                <strong className="text-base text-amber-400">${finalReceivedUsd} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Solucion Sugerida:</span>
                <strong className="block mt-1 text-xs text-green-400">Usar MEV-Blocker / Private RPC (Slippage &lt; 0.5%)</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-16.webp" alt="Curso MEV y Mempool Bots" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Mempool, MEV-Boost y Proteccion en Swaps</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a configurar RPCs privados en MetaMask, proteger grandes ordenes contra bots depredadores y entender la subasta de bloques PBS.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Como ayuda la configuracion de un RPC Privado (como Flashbots Protect) a evitar ataques de Front-running/Sandwich?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Aumentando la comision de gas para ganar la prioridad de bloque.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Enviando la transaccion directamente a los constructores de bloques sin hacerla publica en la mempool donde acechan los bots. (¡Correcto!)
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

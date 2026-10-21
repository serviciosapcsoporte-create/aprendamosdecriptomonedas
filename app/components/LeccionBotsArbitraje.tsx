import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionBotsArbitraje({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [flashLoanAmount, setFlashLoanAmount] = useState(100000);
  const [dexPriceDiff, setDexPriceDiff] = useState(1.2);
  const [gasFeeUsd, setGasFeeUsd] = useState(45);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const flashLoanFee = flashLoanAmount * 0.0009;
  const grossProfit = flashLoanAmount * (dexPriceDiff / 100);
  const netProfit = grossProfit - flashLoanFee - gasFeeUsd;
  const clave = "nivel-4/bots-arbitraje-mev";

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 5</span>
              <span className="text-sm text-gray-400">38% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[38%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-4/leccion-05.webp" alt="Bots de Arbitraje Cripto Flash Loans y Flashbots" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Flash Loans Atomicos</div>
              <p className="text-xs text-gray-300">Prestamos sin colateral donde el dinero debe solicitarse, ejecutarse en swaps y devolverse dentro de la misma transaccion en el mismo bloque.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Arbitraje Triangular</div>
              <p className="text-xs text-gray-300">Explotacion de discrepancias de precio en 3 pares dentro de uno o varios DEXs (ej. USDC → ETH → LINK → USDC).</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Private Bundles (Flashbots)</div>
              <p className="text-xs text-gray-300">Envio directo de paquetes de transacciones a los mineros/validadores pagando un soborno (priority fee) sin pasar por la mempool publica.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Arbitraje Atomico con Flash Loan (Aave Engine)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta el capital prestado y la diferencia de precio entre DEXs para verificar si el beneficio neto supera las comisiones de gas y protocolo:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Flash Loan Prestado: <strong className="text-white">${flashLoanAmount.toLocaleString()} USD</strong></label>
                <input type="range" min="10000" max="500000" step="10000" value={flashLoanAmount} onChange={(e) => setFlashLoanAmount(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Spread de Precio DEXs: <strong className="text-green-400">{dexPriceDiff}%</strong></label>
                <input type="range" min="0.1" max="3" step="0.1" value={dexPriceDiff} onChange={(e) => setDexPriceDiff(Number(e.target.value))} className="w-full cursor-pointer accent-green-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Costo de Gas L1/L2: <strong className="text-red-400">${gasFeeUsd} USD</strong></label>
                <input type="range" min="5" max="150" step="5" value={gasFeeUsd} onChange={(e) => setGasFeeUsd(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/80 p-4 text-center font-mono text-xs md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Beneficio Bruto Trade:</span>
                <strong className="text-base text-green-400">+${grossProfit.toFixed(2)} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Comision Flash Loan (0.09%):</span>
                <strong className="text-base text-red-400">-${flashLoanFee.toFixed(2)} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Ganancia Neta Atomica:</span>
                <strong className={`text-base font-extrabold ${netProfit >= 0 ? "text-amber-400" : "text-red-500"}`}>
                  ${netProfit.toFixed(2)} USD {netProfit < 0 ? "(Transaccion Revertida)" : "OK"}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-4/leccion-05.webp" alt="Curso Experto Bots de Arbitraje y Flashbots" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Programacion de Bots de Arbitraje en Ethers.js & Flashbots</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a escribir Smart Contracts de Flash Loans en Solidity, escanear mempools en tiempo real y enviar bundles con Flashbots protect.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que ocurre en la red Ethereum si la ejecucion de un arbitraje con Flash Loan resulta no rentable al final de la transaccion?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Toda la transaccion se revierte por completo (atomicidad); el bot no recibe el prestamo y solo pierde el gas fee consumido. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) El protocolo Aave liquida la wallet del bot confiscando sus activos colaterales.
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

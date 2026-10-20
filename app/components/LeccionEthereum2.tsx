import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionEthereum2({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [stakedEth, setStakedEth] = useState(32);
  const [stakingType, setStakingType] = useState<"solo" | "liquid">("liquid");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const baseApr = 0.038;
  const liquidFee = stakingType === "liquid" ? 0.1 : 0;
  const netApr = baseApr * (1 - liquidFee);
  const annualRewardEth = (stakedEth * netApr).toFixed(3);
  const ethPriceUsd = 2600;
  const annualRewardUsd = (parseFloat(annualRewardEth) * ethPriceUsd).toFixed(2);
  const clave = "nivel-3/ethereum-2-staking";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 15</span>
              <span className="text-sm text-gray-400">83% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[83%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-15.webp" alt="Ethereum 2.0 Staking y Nodos Validadores" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Proof of Stake (PoS)</div>
              <p className="text-xs text-gray-300">Sustituye el consumo intensivo de energia de PoW por mineria virtual basada en depositos en garantia (capital staked).</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Liquid Staking (stETH)</div>
              <p className="text-xs text-gray-300">Permite hacer staking con cualquier cantidad de ETH sin bloquear liquidez, recibiendo un token derivado transferible.</p>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-red-400">Riesgo de Slashing</div>
              <p className="text-xs text-gray-300">Penalizacion criptografica que destruye parte del ETH depositado si un validador intenta proponer bloques dobles o actuar maliciosamente.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Calculadora de Rendimiento de Staking en Ethereum</h3>
            <p className="mb-4 text-sm text-gray-300">Calcula los retornos anuales estimados ajustando la cantidad de ETH y la modalidad de deposito:</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Monto de ETH a Depositar: <strong className="text-amber-400">{stakedEth} ETH</strong></label>
                <input type="range" min="0.1" max="64" step="0.5" value={stakedEth} onChange={(e) => setStakedEth(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Modalidad de Staking:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStakingType("liquid")}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${stakingType === "liquid" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Liquid Staking (Lido / RocketPool)
                  </button>
                  <button
                    onClick={() => setStakingType("solo")}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${stakingType === "solo" ? "border border-green-400 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Solo Staking (32 ETH Nivel Nodo)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/60 p-4 text-center text-sm md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">APR Neto Estimado:</span>
                <strong className="text-base text-green-400">{(netApr * 100).toFixed(2)}%</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Recompensa Anual en ETH:</span>
                <strong className="text-base text-amber-400">+{annualRewardEth} ETH</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Rendimiento USD Aprox ($2,600/ETH):</span>
                <strong className="text-base font-extrabold text-green-400">+${annualRewardUsd} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-15.webp" alt="Curso Ethereum Staking" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Validacion, Nodos y Liquid Staking en Ethereum</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a configurar clientes de validacion (Prysm/Lighthouse), gestionar estrategias Restaking con EigenLayer y maximizar tus retornos.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la principal ventaja del Liquid Staking en comparacion con operar un nodo validador independiente de 32 ETH?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Que elimina por completo el pago de comisiones de red.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Permite participar con cualquier monto inferior a 32 ETH y mantiene la liquidez mediante un token liquido (ej. stETH) que puede reutilizarse en DeFi. (¡Correcto!)
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

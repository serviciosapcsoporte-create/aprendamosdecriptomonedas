import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionMineria({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [hashrate, setHashrate] = useState(100);
  const [electricityCost, setElectricityCost] = useState(0.06);
  const [powerConsumption, setPowerConsumption] = useState(3250);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const dailyElectricityUsd = ((powerConsumption * 24) / 1000) * electricityCost;
  const estimatedDailyBtcUsd = (hashrate * 0.18).toFixed(2);
  const netProfitDaily = (parseFloat(estimatedDailyBtcUsd) - dailyElectricityUsd).toFixed(2);
  const clave = "nivel-3/mineria-y-hashrate";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 12</span>
              <span className="text-sm text-gray-400">66% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[66%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-12.webp" alt="Mineria de Criptomonedas y rigs ASIC" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Proof of Work (PoW)</div>
              <p className="text-xs text-gray-300">Mecanismo de consenso donde computadoras compiten por encontrar un hash valido para asegurar la red y validar bloques.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Hashrate & Dificultad</div>
              <p className="text-xs text-gray-300">El Hashrate es la potencia de computo total. La dificultad se ajusta automaticamente para mantener el tiempo de bloque en 10 min.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Mining Pools</div>
              <p className="text-xs text-gray-300">Agrupacion de mineros que unen su potencia de calculo para recibir recompensas de forma constante y equitativa.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Mineria de Bitcoin (ASIC Profitability)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta la potencia de tu equipo ASIC y la tarifa electrica para calcular el margen neto diario:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Hashrate del Rig: <strong className="text-amber-400">{hashrate} TH/s</strong></label>
                <input type="range" min="50" max="300" step="10" value={hashrate} onChange={(e) => setHashrate(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Consumo Electrico: <strong className="text-white">{powerConsumption} W</strong></label>
                <input type="range" min="1000" max="6000" step="250" value={powerConsumption} onChange={(e) => setPowerConsumption(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Costo Electrico ($/kWh): <strong className="text-red-400">${electricityCost} USD</strong></label>
                <input type="range" min="0.02" max="0.20" step="0.01" value={electricityCost} onChange={(e) => setElectricityCost(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/60 p-4 text-center text-sm md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Ingreso Estimado por Dia:</span>
                <strong className="text-base text-green-400">+${estimatedDailyBtcUsd} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Gasto de Luz Diario:</span>
                <strong className="text-base text-red-400">-${dailyElectricityUsd.toFixed(2)} USD</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Ganancia Neta Diaria:</span>
                <strong className={`text-base font-extrabold ${parseFloat(netProfitDaily) >= 0 ? "text-amber-400" : "text-red-500"}`}>${netProfitDaily} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-12.webp" alt="Curso Mineria Cripto" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Mineria Profesional de Bitcoin & Eficiencia Energetica</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a montar farms de mineria, calcular el ROI de mineros ASIC de ultima generacion y optimizar contratos de energia.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que ocurre con la Dificultad de Mineria en Bitcoin cuando se conectan masivamente miles de nuevos equipos ASIC a la red?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) La dificultad se reduce para acelerar la creacion de bloques.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) La dificultad aumenta automaticamente para mantener constante el tiempo de generacion de bloques (~10 minutos). (¡Correcto!)
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

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionDexAvanzados({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [ethPrice, setEthPrice] = useState(3000);
  const [lowerPrice, setLowerPrice] = useState(2800);
  const [upperPrice, setUpperPrice] = useState(3200);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const depositUsd = 10000;
  const priceRangeWidth = upperPrice - lowerPrice;
  const capitalEfficiencyMultiplier =
    priceRangeWidth > 0 ? (3000 / priceRangeWidth).toFixed(1) : "1.0";
  const isPriceInRange = ethPrice >= lowerPrice && ethPrice <= upperPrice;
  const estimatedDailyFeesUsd = isPriceInRange
    ? (depositUsd * 0.001 * parseFloat(capitalEfficiencyMultiplier)).toFixed(2)
    : "0.00";
  const clave = "nivel-4/dex-avanzados-gamma-swap";

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 3</span>
              <span className="text-sm text-gray-400">23% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[23%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-4/leccion-03.webp" alt="Liquidez Concentrada en DEX Avanzados y Oraculos TWAP" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Liquidez Concentrada</div>
              <p className="text-xs text-gray-300">A diferencia de V2 (0 a infinito), V3 permite asignar capital dentro de rangos acotados, incrementando drasticamente la eficiencia y los fees ganados.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Oraculos TWAP</div>
              <p className="text-xs text-gray-300">Time-Weighted Average Price. Calcula el promedio de precios ponderado en el tiempo directamente desde los swaps on-chain para prevenir manipulacion por Flash Loans.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">GammaSwap (Volatilidad)</div>
              <p className="text-xs text-gray-300">Protocolo que permite a los traders ponerse "Long Gamma" (apostar a la volatilidad) comprando la posicion de riesgo de los Liquidity Providers.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Liquidez Concentrada (Uniswap V3 Engine)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta el rango de precio para un deposito de $10,000 USD y evalua la multiplicacion de eficiencia frente a un AMM tradicional V2:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Precio Minimo Rango: <strong className="text-amber-400">${lowerPrice} USD</strong></label>
                <input type="range" min="2000" max="2950" step="50" value={lowerPrice} onChange={(e) => setLowerPrice(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Precio Maximo Rango: <strong className="text-amber-400">${upperPrice} USD</strong></label>
                <input type="range" min="3050" max="4500" step="50" value={upperPrice} onChange={(e) => setUpperPrice(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Precio ETH Actual: <strong className="text-white">${ethPrice} USD</strong></label>
                <input type="range" min="2200" max="4000" step="25" value={ethPrice} onChange={(e) => setEthPrice(Number(e.target.value))} className="w-full cursor-pointer accent-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/80 p-4 text-center font-mono text-xs md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Multiplicador de Eficiencia:</span>
                <strong className="text-base text-green-400">{capitalEfficiencyMultiplier}x vs V2</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Estado de la Posicion:</span>
                <strong className={`text-sm ${isPriceInRange ? "text-green-400" : "text-red-400"}`}>
                  {isPriceInRange ? "En Rango (Generando Fees)" : "Fuera de Rango (0 Fees / 100% Token Inactivo)"}
                </strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Fees Diarios Estimados:</span>
                <strong className="text-base text-amber-400">+${estimatedDailyFeesUsd} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-4/leccion-03.webp" alt="Curso Experto DeFi y AMMs" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Liquidez Concentrada, Hooks de Uniswap V4 y Hedging en DeFi</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a estructurar rangos dinamicos mediante bots de rebalanceo, mitigar Impermanent Loss con derivados y programar custom hooks en Uniswap V4.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que sucede con una posicion de liquidez concentrada en Uniswap V3 cuando el precio del mercado supera el limite superior de tu rango predefinido?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Toda tu liquidez se convierte al 100% en el token menos valioso (o stablecoin) y la posicion deja de acumular comisiones hasta que el precio regrese al rango. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) El contrato inteligente liquida la posicion automaticamente enviando el capital a tu wallet en ETH.
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

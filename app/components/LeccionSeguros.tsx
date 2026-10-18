import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionSeguros({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [coveredCapital, setCoveredCapital] = useState(5000);
  const [coverageMonths, setCoverageMonths] = useState(6);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const riskMultiplier = riskLevel === "low" ? 0.02 : riskLevel === "medium" ? 0.05 : 0.12;
  const premiumCost = ((coveredCapital * riskMultiplier * coverageMonths) / 12).toFixed(2);
  const clave = "nivel-3/seguros-en-defi";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 10</span>
              <span className="text-sm text-gray-400">55% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[55%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-10.webp" alt="Seguros en DeFi y Proteccion de Contratos Inteligentes" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Vulnerabilidad en Smart Contracts</div>
              <p className="text-xs text-gray-300">Cubre perdidas de capital originadas por errores de codigo, hacks o exploits no detectados en auditorias.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Eventos de De-peg</div>
              <p className="text-xs text-gray-300">Asegura tu posicion frente a la perdida sostenida de paridad ($1.00 USD) en stablecoins colateralizadas.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Hack de Custodia y Puentes</div>
              <p className="text-xs text-gray-300">Proteccion de activos depositados en verificadores de puentes cross-chain o bovedas de rendimiento.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Poliza de Seguro DeFi (Nexus Mutual / InsurAce)</h3>
            <p className="mb-4 text-sm text-gray-300">Calcula el costo estimado de la prima para proteger tu capital depositado en un protocolo DeFi:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Capital a Coberturar: <strong className="text-white">${coveredCapital} USD</strong></label>
                <input type="range" min="500" max="50000" step="500" value={coveredCapital} onChange={(e) => setCoveredCapital(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Duracion: <strong className="text-white">{coverageMonths} meses</strong></label>
                <input type="range" min="1" max="12" step="1" value={coverageMonths} onChange={(e) => setCoverageMonths(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Perfil de Riesgo del Protocolo:</label>
                <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as "low" | "medium" | "high")} className="mt-1 w-full rounded-xl border border-gray-700 bg-black/60 p-2 text-xs text-white focus:border-amber-400 focus:outline-none">
                  <option value="low">Aave / Compound (Bajo Riesgo - 2% APR)</option>
                  <option value="medium">Uniswap / Curve (Riesgo Medio - 5% APR)</option>
                  <option value="high">Yield Farms Nuevas (Alto Riesgo - 12% APR)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-xl border border-gray-800 bg-black/60 p-4 text-sm md:flex-row">
              <div>
                <span className="text-gray-400">Costo Estimado de la Poliza: </span>
                <strong className="ml-2 text-lg text-amber-400">${premiumCost} USD</strong>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-gray-400">Cobertura Garantizada: </span>
                <strong className="ml-2 text-lg text-green-400">${coveredCapital} USD</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-10.webp" alt="Curso Ciberseguridad DeFi" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Ciberseguridad y Auditoria de Protocolos DeFi</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a analizar auditorias en CertiK, verificar permisos de aprobacion de tokens (Allowances) y mitigar riesgos antes de depositar tu capital.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que tipo de evento NO suele estar cubierto por los seguros de contratos inteligentes tradicionales?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Perdidas por negligencia del usuario al revelar su frase semilla o clave privada. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Fallas o exploits en el codigo del smart contract.
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

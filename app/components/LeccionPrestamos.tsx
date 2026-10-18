import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import { HealthFactorCalculator } from "@/components/Nivel3Widgets";
import type { Topic } from "@/data/curriculum";

export function LeccionPrestamos({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const clave = "nivel-3/protocolas-de-prestamo";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 9</span>
              <span className="text-sm text-gray-400">50% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[50%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-09.webp" alt="Protocolos de Prestamo en DeFi" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
          </div>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
              <h3 className="mb-3 text-lg font-bold text-amber-400">Prestamo Tradicional (Banco)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Requiere historial crediticio, aprobacion de riesgo e identidad (KYC).</li>
                <li>Riesgo de impago asumido por la entidad financiera.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-6 shadow-lg">
              <h3 className="mb-3 text-lg font-bold text-green-400">Prestamo Cripto en DeFi (Aave / Compound)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Sin permiso ni KYC: Cualquiera solicita un prestamo depositando colateral.</li>
                <li><strong>Sobre-colateralizado:</strong> Debes depositar mas valor del que pides prestado.</li>
              </ul>
            </div>
          </div>

          <HealthFactorCalculator />

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-09.webp" alt="Curso DeFi Avanzado" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Estrategias de Prestamo y Apalancamiento DeFi</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a ejecutar estrategias de apalancamiento seguro (Looping), evitar liquidaciones y generar rendimiento sobre tus activos en video.</p>
                <a href="https://go.hotmart.com/V107924570Q?dp=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Curso en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que ocurre cuando el Factor de Salud (Health Factor) de tu posicion de prestamo cae por debajo de 1.0?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) El protocolo detiene las transacciones hasta que pagues la deuda.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Los bots liquidadores venden parte de tu colateral para cubrir la deuda y reequilibrar el protocolo. (Correcto!)
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
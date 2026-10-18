import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionOracle({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [nodesCount, setNodesCount] = useState(1);
  const [flashLoanAttack, setFlashLoanAttack] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const realPrice = 2000;
  const manipulatedPrice = flashLoanAttack && nodesCount < 5 ? 500 : realPrice;
  const isManipulated = manipulatedPrice !== realPrice;
  const clave = "nivel-3/el-problema-del-oracle";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 6</span>
              <span className="text-sm text-gray-400">33% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[33%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-06.webp" alt="El Problema del Oraculo en Blockchain" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
          </div>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/30 bg-gray-900/80 p-6">
              <h3 className="mb-3 text-lg font-bold text-red-400">Oraculo Centralizado (Un solo servidor/API)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Un unico proveedor inyecta el precio al contrato inteligente.</li>
                <li><strong>Riesgo Critico:</strong> Punto unico de falla. Si la API es hackeada o manipulada con un prestamo flash, todo el protocolo pierde sus fondos.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-6 shadow-lg">
              <h3 className="mb-3 text-lg font-bold text-amber-400">Red de Oraculos Descentralizada (DON / Chainlink)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Multiples nodos independientes recaban datos de decenas de exchanges.</li>
                <li><strong>Seguridad:</strong> Se calcula la mediana matematica de los precios. Un nodo malicioso no puede alterar el resultado final.</li>
              </ul>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Ataque a Oraculo (Flash Loan Attack)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta la cantidad de nodos de la red del oraculo y simula un ataque de liquidez masivo para ver si el protocolo se corrompe:</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Red de Nodos del Oraculo: <strong className="text-amber-400">{nodesCount} nodo(s)</strong></label>
                <input type="range" min="1" max="10" value={nodesCount} onChange={(e) => setNodesCount(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => setFlashLoanAttack(!flashLoanAttack)}
                  className={`w-full rounded-xl py-2.5 text-sm font-bold transition ${flashLoanAttack ? "bg-red-600 hover:bg-red-500 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
                >
                  {flashLoanAttack ? "Desactivar Ataque Flash Loan" : "Simular Ataque de Manipulacion DEX"}
                </button>
              </div>
            </div>

            <div className={`flex flex-col items-center justify-between rounded-xl border p-4 text-sm md:flex-row ${isManipulated ? "border-red-500 bg-red-950/80" : "border-gray-800 bg-black/60"}`}>
              <div>
                <span className="text-gray-400">Precio del Asset Alimentado al Smart Contract: </span>
                <strong className={`ml-2 text-xl font-extrabold ${isManipulated ? "text-red-400" : "text-green-400"}`}>${manipulatedPrice} USD</strong>
              </div>
              <div className="mt-2 font-semibold md:mt-0">
                {isManipulated ? (
                  <span className="animate-pulse text-red-400">¡PRECIO MANIPULADO! LIQUIDACION FRAUDULENTA</span>
                ) : (
                  <span className="text-green-400">Precio Resiliente y Correcto ($2,000 USD)</span>
                )}
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-06.webp" alt="Curso Chainlink y Oraculos" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Arquitectura Web3: Oraculos y Data Feeds Seguros</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a integrar datos del mundo real mediante Chainlink Data Feeds, VRF (Aleatoriedad) y funciones off-chain sin vulnerabilidades.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Por que usar el precio de un solo par de un DEX (como Uniswap) como oraculo directo puede ser peligroso para un protocolo de prestamos?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Porque los DEX cierran los fines de semana.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Porque un atacante puede alterar temporalmente el precio en ese pool mediante un Flash Loan y vaciar la tesoreria. (Correcto!)
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
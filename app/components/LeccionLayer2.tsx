import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionLayer2({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [selectedRollup, setSelectedRollup] = useState<"optimistic" | "zk">("optimistic");
  const [l1GasFee, setL1GasFee] = useState(15);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const l2Fee = selectedRollup === "optimistic" ? (l1GasFee * 0.05).toFixed(2) : (l1GasFee * 0.01).toFixed(2);
  const clave = "nivel-3/layer-2-soluciones-de-scaling";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 7</span>
              <span className="text-sm text-gray-400">38% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[38%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-07.webp" alt="Layer 2: Soluciones de Scaling para Ethereum" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
              <h3 className="mb-3 text-lg font-bold text-amber-400">Optimistic Rollups (Arbitrum / Optimism)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Asumen que las transacciones son validas por defecto.</li>
                <li><strong>Pruebas de Fraude (Fraud Proofs):</strong> Periodo de desafio de 7 dias para retiradas a la L1.</li>
                <li>Alta compatibilidad con la EVM (Ethereum Virtual Machine).</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-6 shadow-lg">
              <h3 className="mb-3 text-lg font-bold text-green-400">ZK-Rollups (zkSync / Starknet / Scroll)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li>Utilizan pruebas criptograficas de conocimiento cero (Validity Proofs / SNARKs).</li>
                <li><strong>Finalidad Inmediata:</strong> Retiros a L1 en minutos en lugar de dias.</li>
                <li>Mayor complejidad matematica y menor costo de transaccion a gran escala.</li>
              </ul>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Comparador de Tarifas de Gas (L1 vs Layer 2)</h3>
            <p className="mb-4 text-sm text-gray-300">Simula la congestion de Ethereum L1 y observa el ahorro al operar en soluciones Rollup:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Costo de Transaccion en Ethereum L1: <strong className="text-red-400">${l1GasFee.toFixed(2)} USD</strong></label>
                <input type="range" min="2" max="80" step="1" value={l1GasFee} onChange={(e) => setL1GasFee(Number(e.target.value))} className="w-full cursor-pointer accent-red-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Arquitectura Rollup Seleccionada:</label>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedRollup("optimistic")} className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${selectedRollup === "optimistic" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"}`}>Optimistic</button>
                  <button onClick={() => setSelectedRollup("zk")} className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${selectedRollup === "zk" ? "border border-green-400 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}>ZK-Rollup</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-xl border border-gray-800 bg-black/60 p-4 text-sm md:flex-row">
              <div>
                <span className="text-gray-400">Costo Estimado en Layer 2: </span>
                <strong className="ml-2 text-xl text-green-400">${l2Fee} USD</strong>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-gray-400">Ahorro Estimado: </span>
                <strong className="ml-2 font-bold text-amber-400">-{((1 - parseFloat(l2Fee) / l1GasFee) * 100).toFixed(0)}%</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-07.webp" alt="Curso Layer 2" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Desarrollo e Inversion en Ecosistemas Layer 2</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a posicionarte en airdrops y protocolos de alto rendimiento dentro de Arbitrum, Optimism y zkSync.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la diferencia fundamental en la verificacion de datos entre Optimistic Rollups y ZK-Rollups?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800"}`}
              >
                A) Los Optimistic usan pruebas de fraude (Fraud Proofs) con periodo de desafio, mientras los ZK usan pruebas matematicas de validez (Validity Proofs) instantaneas. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800"}`}
              >
                B) Los ZK-Rollups no ejecutan transacciones fuera de la cadena.
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
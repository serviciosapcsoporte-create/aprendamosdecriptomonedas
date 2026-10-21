import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionZkRollups({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [proofType, setProofType] = useState<"snark" | "stark">("stark");
  const [batchSize, setBatchSize] = useState(5000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const handleGenerateProof = () => {
    setIsGenerating(true);
    setProofGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setProofGenerated(true);
    }, 2000);
  };
  const clave = "nivel-4/zk-rollups-starknet-zksync";

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 2</span>
              <span className="text-sm text-gray-400">15% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[15%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-4/leccion-02.webp" alt="ZK-Rollups Starknet y zkSync Zero Knowledge Proofs" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">zk-SNARKs (zkSync Era)</div>
              <p className="text-xs text-gray-300">Succinct Non-Interactive Argument of Knowledge. Pruebas ultra compactas con verificacion rapida en L1, requiriendo un Trusted Setup inicial.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">zk-STARKs (Starknet)</div>
              <p className="text-xs text-gray-300">Scalable Transparent ARgument of Knowledge. Resisten al computo cuantico, no requieren Trusted Setup y procesan millones de operaciones off-chain.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">zkEVM vs Cairo VM</div>
              <p className="text-xs text-gray-300">zkSync prioriza la compatibilidad directa con EVM/Solidity; Starknet utiliza el lenguaje nativo Cairo optimizado para probar calculos matematicos complejos.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Prover (Pruebas de Validez en L1)</h3>
            <p className="mb-4 text-sm text-gray-300">Selecciona el sistema de prueba y el volumen de transacciones agregadas en el lote (batch) para verificar su validacion criptografica:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Criptografia de Prueba:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setProofType("snark"); setProofGenerated(false); }}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${proofType === "snark" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    zk-SNARK
                  </button>
                  <button
                    onClick={() => { setProofType("stark"); setProofGenerated(false); }}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${proofType === "stark" ? "border border-green-400 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    zk-STARK
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Lote de Transacciones (Batch): <strong className="text-white">{batchSize.toLocaleString()} TXs</strong></label>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="1000"
                  value={batchSize}
                  onChange={(e) => { setBatchSize(Number(e.target.value)); setProofGenerated(false); }}
                  className="w-full cursor-pointer accent-amber-400"
                />
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleGenerateProof}
                  disabled={isGenerating}
                  className="w-full rounded-xl bg-amber-400 py-2.5 text-xs font-extrabold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500"
                >
                  {isGenerating ? "Computando Polynomial Proof..." : "Generar Pruebas ZK"}
                </button>
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-gray-800 bg-black/80 p-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Tamano del Lote:</span>
                <span className="font-bold text-white">{batchSize.toLocaleString()} operaciones comprimidas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trusted Setup Requerido:</span>
                <span className={proofType === "snark" ? "text-amber-400" : "font-bold text-green-400"}>
                  {proofType === "snark" ? "Si (Ceremonia Multiparte)" : "No (Transparente / Quantum Proof)"}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-1">
                <span className="text-gray-400">Estado en Ethereum L1:</span>
                <strong className={proofGenerated ? "text-green-400" : "text-gray-500"}>
                  {proofGenerated ? "Validity Proof Aceptada (Finalidad Instantanea sin Ventana de 7 dias)" : "Aguardando generacion de prueba..."}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-4/leccion-02.webp" alt="Curso Experto ZK Proofs" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Criptografia Zero-Knowledge & Programacion en Cairo</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende la matematica detras de los polinomios de validacion, despliega smart contracts en Starknet y construye circuitos en ZK-SNARKs.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la ventaja fundamental de los ZK-Rollups en los tiempos de retiro hacia la Layer 1 de Ethereum frente a los Optimistic Rollups?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) La retirada es practicamente inmediata una vez verificada la prueba de validez (Validity Proof) en L1, sin requerir la ventana de desafio de 7 dias. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) No requieren pagar ninguna comision de gas al validador de Ethereum.
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

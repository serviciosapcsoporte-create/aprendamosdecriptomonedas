import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionL2Rollups({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [sequencerState, setSequencerState] = useState<"honest" | "fraudulent">("honest");
  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeResolved, setChallengeResolved] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const handleSimulateChallenge = () => {
    setChallengeActive(true);
    setTimeout(() => {
      setChallengeActive(false);
      setChallengeResolved(true);
      setSequencerState("honest");
    }, 2500);
  };
  const clave = "nivel-4/arbitrum-optimism-layer-2";

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 1</span>
              <span className="text-sm text-gray-400">8% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[8%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-4/leccion-01.webp" alt="Arbitrum y Optimism Layer 2 Architecture" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Arbitrum Nitro (ArbOS)</div>
              <p className="text-xs text-gray-300">Aumenta el rendimiento compilando codigo EVM a WebAssembly (Wasm) para ejecutar pruebas de fraude interactivas de multiples rondas en L1.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-red-400">OP Stack (Optimism)</div>
              <p className="text-xs text-gray-300">Framework modular para construir Superchains interconectadas compartiendo secuenciacion, gobernanza y puentes nativos.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Availability & AnyTrust</div>
              <p className="text-xs text-gray-300">Manejo de datos fuera de la cadena mediante Data Availability Committees (DAC) para reducir comisiones al minimo.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Mecanismo de Desafio (Fraud Proof Window)</h3>
            <p className="mb-4 text-sm text-gray-300">Simula el comportamiento del secuenciador y ejecuta una prueba de fraude interactiva en Ethereum L1:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Estado del Secuenciador:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSequencerState("honest"); setChallengeResolved(false); }}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${sequencerState === "honest" ? "border border-green-500 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Bloque Honesto
                  </button>
                  <button
                    onClick={() => { setSequencerState("fraudulent"); setChallengeResolved(false); }}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${sequencerState === "fraudulent" ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Transaccion Anomala
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSimulateChallenge}
                  disabled={sequencerState === "honest" || challengeActive}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition ${sequencerState === "fraudulent" && !challengeActive ? "bg-amber-400 hover:bg-amber-300 font-extrabold text-black" : "cursor-not-allowed bg-gray-800 text-gray-500"}`}
                >
                  {challengeActive ? "Verificando en Ethereum L1 (Wasm Bisection)..." : "Emitir Fraud Proof en L1"}
                </button>
              </div>
            </div>

            <div className={`rounded-xl border p-4 font-mono text-xs ${sequencerState === "fraudulent" && !challengeResolved ? "border-red-500 bg-red-950/80" : "border-gray-800 bg-black/80"}`}>
              <div>
                <span className="text-gray-400">Estado del Rollup: </span>
                <strong className={sequencerState === "honest" ? "text-green-400" : challengeResolved ? "text-green-400" : "text-red-400"}>
                  {sequencerState === "honest" && "Raiz de estado valida (Esperando ventana de 7 dias)"}
                  {sequencerState === "fraudulent" && !challengeResolved && "Transaccion maliciosa detectada en la Mempool L2"}
                  {challengeResolved && "Fraud Proof aceptada en L1: Secuenciador penalizado y estado corregido"}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-4/leccion-01.webp" alt="Curso Experto L2" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Desarrollo de DApps y Superchains en OP Stack</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a desplegar tus propios L2 Rollups, configurar secuenciadores con Flashblocks y conectar puentes interoperables.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Por que existe una ventana de retencion de 7 dias al retirar fondos desde un Optimistic Rollup (como Arbitrum) hacia la Layer 1 de Ethereum de forma nativa?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Para dar tiempo a que los mineros de Ethereum validen la tarifa de gas.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Para dar margen a que cualquier validador independiente pueda presentar una prueba de fraude (Fraud Proof) si el secuenciador envio un estado invalido. (¡Correcto!)
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

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionBridges({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [sourceChain, setSourceChain] = useState("Ethereum");
  const [targetChain, setTargetChain] = useState("Polygon");
  const [bridgeStatus, setBridgeStatus] = useState<"idle" | "locking" | "minting" | "completed">("idle");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const handleBridgeAction = () => {
    setBridgeStatus("locking");
    setTimeout(() => setBridgeStatus("minting"), 1500);
    setTimeout(() => setBridgeStatus("completed"), 3000);
  };
  const clave = "nivel-3/bridges-cross-chain";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 5</span>
              <span className="text-sm text-gray-400">27% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[27%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-05-bridges-cross-chain.webp" alt="Bridges Cross-Chain" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Lock & Mint (Bloqueo y Emision)</div>
              <p className="text-xs text-gray-300">Bloqueas el activo original en la Cadena A y se emite un token envuelto (Wrapped Token, ej. wBTC) en la Cadena B.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Liquidity Pools Cross-Chain</div>
              <p className="text-xs text-gray-300">Usa reservas nativas en ambas cadenas (Stargate / Synapse) para intercambiar activos nativos sin tokens envueltos.</p>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-red-400">Riesgo de Multisig / Hack</div>
              <p className="text-xs text-gray-300">Los puentes son el objetivo principal de los exploits al concentrar enormes fondos depositados en un unico contrato.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Transferencia Cross-Chain (Lock & Mint)</h3>
            <p className="mb-4 text-sm text-gray-300">Selecciona las cadenas de origen y destino para simular el proceso de puenteo:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Cadena Origen (Lock):</label>
                <select value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black/60 p-2.5 text-xs text-white">
                  <option value="Ethereum">Ethereum (L1)</option>
                  <option value="Arbitrum">Arbitrum (L2)</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Cadena Destino (Mint):</label>
                <select value={targetChain} onChange={(e) => setTargetChain(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-black/60 p-2.5 text-xs text-white">
                  <option value="Polygon">Polygon PoS</option>
                  <option value="Avalanche">Avalanche C-Chain</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleBridgeAction}
              disabled={bridgeStatus === "locking" || bridgeStatus === "minting"}
              className="mb-4 w-full rounded-xl bg-amber-400 py-3 font-bold text-black transition hover:bg-amber-300"
            >
              {bridgeStatus === "idle" || bridgeStatus === "completed" ? "Ejecutar Bridge de 1 ETH" : "Procesando..."}
            </button>

            <div className="space-y-2 rounded-xl border border-gray-800 bg-black/60 p-4 font-mono text-xs">
              <div className={bridgeStatus === "locking" || bridgeStatus === "minting" || bridgeStatus === "completed" ? "text-amber-400" : "text-gray-500"}>
                1. Bloqueando 1 ETH en contrato custodio de {sourceChain}... {bridgeStatus !== "idle" && "OK"}
              </div>
              <div className={bridgeStatus === "minting" || bridgeStatus === "completed" ? "text-amber-400" : "text-gray-500"}>
                2. Validacion de oraculos cross-chain y firma de relayer... {bridgeStatus === "completed" && "OK"}
              </div>
              <div className={bridgeStatus === "completed" ? "font-bold text-green-400" : "text-gray-500"}>
                3. Emision exitosa de 1 eETH en la red {targetChain}. ¡Transaccion Completada!
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-05-bridges-cross-chain.webp" alt="Curso Cross-Chain DeFi" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Arquitectura Multi-Chain & Liquidez Cross-Chain</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a mover fondos de forma segura entre Layer 1 y Layer 2 reduciendo comisiones.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Que sucede con el activo original cuando utilizas un puente basado en la arquitectura Lock & Mint?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800"}`}
              >
                A) Permanece bloqueado en el contrato inteligente de la cadena de origen. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800"}`}
              >
                B) Se destruye (burn) inmediatamente.
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

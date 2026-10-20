import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionDaos({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [userTokens, setUserTokens] = useState(2500);
  const [proposalChoice, setProposalChoice] = useState<"yes" | "no" | null>(null);
  const [totalYesVotes, setTotalYesVotes] = useState(45000);
  const [totalNoVotes, setTotalNoVotes] = useState(30000);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const handleVote = (choice: "yes" | "no") => {
    if (proposalChoice === choice) return;
    if (proposalChoice === "yes") setTotalYesVotes((prev) => prev - userTokens);
    else if (proposalChoice === "no") setTotalNoVotes((prev) => prev - userTokens);
    if (choice === "yes") setTotalYesVotes((prev) => prev + userTokens);
    else setTotalNoVotes((prev) => prev + userTokens);
    setProposalChoice(choice);
  };

  const totalVotes = totalYesVotes + totalNoVotes;
  const yesPercentage = ((totalYesVotes / totalVotes) * 100).toFixed(1);
  const clave = "nivel-3/daos-y-gobernanza-descentralizada";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 14</span>
              <span className="text-sm text-gray-400">77% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[77%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-14.webp" alt="DAOs y Gobernanza Descentralizada" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Votacion On-Chain vs Off-Chain</div>
              <p className="text-xs text-gray-300">On-chain ejecuta contratos inteligentes pagando gas fee. Off-chain (Snapshot) usa firmas criptograficas sin gas para medir el consenso previo.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Boveda & Timelock</div>
              <p className="text-xs text-gray-300">Las decisiones aprobadas no se ejecutan de inmediato; pasan a un contrato Timelock que congela la ejecucion durante un tiempo de seguridad.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Votacion Cuadratica</div>
              <p className="text-xs text-gray-300">Mecanismo donde el costo del voto escala al cuadrado, reduciendo el poder de los grandes tenedores (whales) a favor de la comunidad.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Propuesta de Gobernanza (Snapshot Interface)</h3>
            <p className="mb-4 text-sm text-gray-300">Ajusta tu saldo de tokens de gobernanza y ejerce tu voto para modificar la tesoreria del protocolo:</p>

            <div className="rounded-xl border border-gray-800 bg-black/60 p-4">
              <div className="mb-1 text-xs font-bold uppercase text-amber-400">Propuesta #42 — Asignacion de Tesoreria</div>
              <div className="mb-2 text-sm font-semibold text-white">¿Asignar $250,000 USDC del Treasury para financiar auditorias de seguridad en el protocolo V2?</div>

              <div className="mb-4">
                <label className="mb-1 block text-xs text-gray-400">Tus Tokens de Gobernanza (Poder de Voto): <strong className="text-amber-400">{userTokens.toLocaleString()} GOV</strong></label>
                <input type="range" min="500" max="20000" step="500" value={userTokens} onChange={(e) => setUserTokens(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>

              <div className="mb-4 flex gap-4">
                <button
                  onClick={() => handleVote("yes")}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${proposalChoice === "yes" ? "bg-green-500 font-extrabold text-black" : "border border-green-500 bg-green-500/20 text-green-300"}`}
                >
                  Votar A favor ({totalYesVotes.toLocaleString()} GOV)
                </button>
                <button
                  onClick={() => handleVote("no")}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${proposalChoice === "no" ? "bg-red-500 font-extrabold text-white" : "border border-red-500 bg-red-500/20 text-red-300"}`}
                >
                  Votar En Contra ({totalNoVotes.toLocaleString()} GOV)
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Resultado Actual: <strong>{yesPercentage}% A favor</strong></span>
                  <span>Total Votos: {totalVotes.toLocaleString()} GOV</span>
                </div>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full bg-green-400" style={{ width: `${yesPercentage}%` }} />
                  <div className="h-full flex-1 bg-red-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-14.webp" alt="Curso DAOs y Gobernanza" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Liderazgo, Gobernanza e Inversion en DAOs</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a estructurar propuestas de gobernanza en Aragon y Tally, gestionar tesorerias multisig en Safe y participar activamente en protocolos DeFi.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la funcion principal de un contrato "Timelock" tras la aprobacion de una votacion en una DAO?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Reembolsar las tarifas de gas pagadas por los votantes.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Anadir un retraso de tiempo obligatorio antes de la ejecucion para permitir que la comunidad reaccione en caso de ataques de gobernanza. (¡Correcto!)
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

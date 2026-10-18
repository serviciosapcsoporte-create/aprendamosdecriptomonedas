import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionDexVsCex({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [selectedExchange, setSelectedExchange] = useState<"cex" | "dex">("cex");
  const [exchangeStatus, setExchangeStatus] = useState<"normal" | "insolvent">("normal");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const clave = "nivel-3/dex-vs-exchange-centralizado";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 1</span>
              <span className="text-sm text-gray-400">5% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[5%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-01.webp" alt="DEX vs CEX Trading Terminal" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
              <h3 className="mb-3 text-lg font-bold text-red-400">Exchange Centralizado (CEX - ej. Binance, Coinbase)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li><strong>Custodia:</strong> El CEX posee tus llaves privadas ("Not your keys, not your coins").</li>
                <li><strong>Ejecucion:</strong> Libro de ordenes tradicional (Order Book) fuera de la cadena.</li>
                <li><strong>Identidad:</strong> Verificacion KYC obligatoria.</li>
                <li><strong>Riesgo:</strong> Insolvencia de la entidad, congelamiento de fondos o hackeo del servidor central.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-6 shadow-lg">
              <h3 className="mb-3 text-lg font-bold text-amber-400">Exchange Descentralizado (DEX - ej. Uniswap, dYdX)</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                <li><strong>Custodia:</strong> Autocustodia total desde tu Web3 Wallet (MetaMask, Rabby).</li>
                <li><strong>Ejecucion:</strong> Contratos inteligentes y Pools de Liquidez (AMM) On-Chain.</li>
                <li><strong>Identidad:</strong> Sin KYC, acceso pseudonimo global.</li>
                <li><strong>Riesgo:</strong> Vulnerabilidades en el codigo del smart contract o slippage alto.</li>
              </ul>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Prueba de Solvencia y Custodia</h3>
            <p className="mb-4 text-sm text-gray-300">Selecciona donde mantienes tus fondos y simula un evento de panico o bancarrota en el mercado:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Ubicacion de tus Fondos:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedExchange("cex")}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${selectedExchange === "cex" ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    Depositados en CEX (Centralizado)
                  </button>
                  <button
                    onClick={() => setSelectedExchange("dex")}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${selectedExchange === "dex" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"}`}
                  >
                    En tu Wallet / DEX (Autocustodia)
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => setExchangeStatus(exchangeStatus === "normal" ? "insolvent" : "normal")}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition ${exchangeStatus === "insolvent" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
                >
                  {exchangeStatus === "insolvent" ? "Restablecer Estado del Mercado" : "Simular Corrida Bancaria / Insolvencia"}
                </button>
              </div>
            </div>

            <div className={`flex flex-col items-center justify-between rounded-xl border p-4 text-sm md:flex-row ${exchangeStatus === "insolvent" && selectedExchange === "cex" ? "border-red-500 bg-red-950/80" : "border-gray-800 bg-black/60"}`}>
              <div>
                <span className="text-gray-400">Estado de tus Criptomonedas: </span>
                <strong className={`ml-2 text-base ${exchangeStatus === "insolvent" && selectedExchange === "cex" ? "text-red-400" : "text-green-400"}`}>
                  {selectedExchange === "cex"
                    ? exchangeStatus === "insolvent"
                      ? "FONDOS CONGELADOS (Bancarrota de la Entidad)"
                      : "Bajo Custodia de Terceros"
                    : "100% Protegidos en tu Wallet (Inmune a Quiebras)"}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-01.webp" alt="Curso Trading & DEX" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Trading Avanzado y Operatoria en DEX</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a operar sin entregar tus claves privadas, conectar tu hardware wallet y gestionar liquidez en intercambios descentralizados.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la ventaja fundamental en terminos de seguridad al operar en un DEX en comparacion con un CEX?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Que las comisiones siempre son de $0 USD.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Que mantienes la custodia de tus claves privadas en todo momento, eliminando el riesgo de quiebra de la plataforma. (¡Correcto!)
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

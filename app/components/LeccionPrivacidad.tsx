import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/G107924594S";

export function LeccionPrivacidad({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [privacyMethod, setPrivacyMethod] = useState<"transparent" | "zk" | "ring">("transparent");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const clave = "nivel-3/privacidad-zcash-monero";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 18</span>
              <span className="text-sm text-gray-400">100% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-full bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-18.webp" alt="Privacidad en Criptomonedas y Criptografia ZK" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Monero (XMR) - Privacidad por Defecto</div>
              <p className="text-xs text-gray-300">Utiliza Ring Signatures y Stealth Addresses para ocultar emisor, receptor y monto transferido en cada transaccion de forma obligatoria.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Zcash (ZEC) - zk-SNARKs Opcionales</div>
              <p className="text-xs text-gray-300">Utiliza pruebas de conocimiento cero para validar que la transaccion es legitima sin revelar ningun dato privado.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Seudonimas vs Privadas</div>
              <p className="text-xs text-gray-300">Bitcoin y Ethereum son seudonimas: todas las transacciones son publicas y rastreables si se vincula una identidad al 0x.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Rastreo de Transacciones (Explorer View)</h3>
            <p className="mb-4 text-sm text-gray-300">Selecciona el protocolo para ver como se registra una transferencia de $1,000 USD en el explorador publico:</p>

            <div className="mb-6">
              <label className="mb-2 block text-xs text-gray-400">Metodo de Transferencia:</label>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <button
                  onClick={() => setPrivacyMethod("transparent")}
                  className={`rounded-xl py-2.5 text-xs font-bold transition ${privacyMethod === "transparent" ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 text-gray-400"}`}
                >
                  Bitcoin / Ethereum (Publico)
                </button>
                <button
                  onClick={() => setPrivacyMethod("ring")}
                  className={`rounded-xl py-2.5 text-xs font-bold transition ${privacyMethod === "ring" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-gray-800 text-gray-400"}`}
                >
                  Monero (RingCT + Stealth)
                </button>
                <button
                  onClick={() => setPrivacyMethod("zk")}
                  className={`rounded-xl py-2.5 text-xs font-bold transition ${privacyMethod === "zk" ? "border border-green-400 bg-green-500/20 text-green-300" : "bg-gray-800 text-gray-400"}`}
                >
                  Zcash (zk-SNARK Shielded)
                </button>
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-gray-800 bg-black/80 p-4 font-mono text-xs">
              <div>
                <span className="text-gray-500">Emisor (From): </span>
                <strong className={privacyMethod === "transparent" ? "text-red-400" : "text-green-400"}>
                  {privacyMethod === "transparent" ? "0x71C...8A92 (Publico)" : " [OFUSCADO / FIRMA EN ANILLO]"}
                </strong>
              </div>
              <div>
                <span className="text-gray-500">Receptor (To): </span>
                <strong className={privacyMethod === "transparent" ? "text-red-400" : "text-green-400"}>
                  {privacyMethod === "transparent" ? "0x39B...12F4 (Publico)" : " [DIRECCION STEALTH OCULTA]"}
                </strong>
              </div>
              <div>
                <span className="text-gray-500">Monto Enviado: </span>
                <strong className={privacyMethod === "transparent" ? "text-amber-400" : "text-green-400"}>
                  {privacyMethod === "transparent" ? "1,000 USDC ($1,000.00)" : " [OCULTO MEDIANTE CERO CONOCIMIENTO]"}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-18.webp" alt="Curso Criptografia y Privacidad" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Criptografia Avanzada & Pruebas ZK</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende los fundamentos matematicos de las tecnologias Zero-Knowledge (ZK-Rollups y ZK-SNARKs) y su aplicacion practica en privacidad.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la propiedad clave de las pruebas de conocimiento cero (Zero-Knowledge Proofs)?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Permitir realizar transacciones sin pagar ningun tipo de tarifa de gas.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Demostrar que una afirmacion es verdadera sin revelar la informacion o los datos subyacentes. (¡Correcto!)
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

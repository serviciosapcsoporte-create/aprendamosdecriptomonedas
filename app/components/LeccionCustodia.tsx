import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionCustodia({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [signers, setSigners] = useState<{ id: number; name: string; signed: boolean }[]>([
    { id: 1, name: "CEO (Clave Hardware #1)", signed: true },
    { id: 2, name: "CFO (Clave Hardware #2)", signed: true },
    { id: 3, name: "CTO (Clave Hardware #3)", signed: false },
    { id: 4, name: "Auditor Externo", signed: false },
    { id: 5, name: "Boveda de Respaldo", signed: false },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const requiredSignatures = 3;
  const currentSignatures = signers.filter((s) => s.signed).length;
  const isTransactionApproved = currentSignatures >= requiredSignatures;

  const toggleSigner = (id: number) => {
    setSigners((prev) => prev.map((s) => (s.id === id ? { ...s, signed: !s.signed } : s)));
  };
  const clave = "nivel-4/custodia-institucional";

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Leccion 6</span>
              <span className="text-sm text-gray-400">46% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[46%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-4/leccion-06.webp" alt="Custodia Institucional Multi-Sig y MPC Threshold Signatures" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">Multi-Firma (Safe / Multi-Sig)</div>
              <p className="text-xs text-gray-300">Exige M firmas de N firmantes para ejecutar cualquier transaccion directamente en un Smart Contract on-chain (ej. quorum 3/5).</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Threshold Signatures (MPC)</div>
              <p className="text-xs text-gray-300">Divide la clave privada en fragmentos secretos off-chain. La firma se genera de forma conjunta emitiendo una sola firma valida on-chain sin exponer la clave entera.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Custodia Calificada / Hibrida</div>
              <p className="text-xs text-gray-300">Proveedores regulados (BitGo, Fireblocks, Anchorage) que combinan polizas de seguro, Hardware Security Modules (HSM) y firmas MPC.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Quorum Multi-Sig (Safe Contract Engine)</h3>
            <p className="mb-4 text-sm text-gray-300">
              Transferencia propuesta: <strong>$500,000 USDC</strong> de la tesoreria. Se requieren al menos {requiredSignatures} de {signers.length} firmas aprobadas:
            </p>

            <div className="mb-6 space-y-2">
              {signers.map((signer) => (
                <div
                  key={signer.id}
                  onClick={() => toggleSigner(signer.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${signer.signed ? "border-green-500/50 bg-green-500/20 text-white" : "border-gray-800 bg-black/60 text-gray-400"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${signer.signed ? "bg-green-400" : "bg-gray-600"}`} />
                    <span className="text-xs font-semibold">{signer.name}</span>
                  </div>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${signer.signed ? "bg-green-400 text-black" : "bg-gray-800 text-gray-500"}`}>
                    {signer.signed ? "Firmado" : "Pendiente"}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/80 p-4 text-center font-mono text-xs md:grid-cols-2">
              <div>
                <span className="block text-xs text-gray-400">Firmas Recolectadas:</span>
                <strong className={`text-base ${isTransactionApproved ? "text-green-400" : "text-amber-400"}`}>
                  {currentSignatures} / {requiredSignatures} Minimas ({signers.length} Totales)
                </strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Estado en Blockchain L1:</span>
                <strong className={`text-base font-extrabold ${isTransactionApproved ? "text-green-400" : "text-red-400"}`}>
                  {isTransactionApproved ? "Transaccion Transmitida y Ejecutada" : "En Espera de Quorum Suficiente"}
                </strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-4/leccion-06.webp" alt="Curso Experto Custodia Web3" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Custodia Institucional, Fireblocks API & Gobernanza Safe</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a desplegar cofres inteligentes en Safe, integrar reglas de cumplimiento con Fireblocks API y proteger tesorerias corporativas contra ataques internos.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cual es la diferencia principal en la eficiencia de gas de una firma MPC (Threshold Signature) frente a un Smart Contract Multi-Sig tradicional (Safe) en la Layer 1 de Ethereum?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) MPC consolida la firma off-chain y consume el gas equivalente a una sola firma estandar ECDSA/Ed25519 on-chain, mientras que Multi-Sig procesa multiples verificaciones en el contrato. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Multi-Sig no requiere pagar comisiones de gas al realizar la verificacion.
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

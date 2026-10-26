import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { miniaturaDe } from "@/data/thumbnails";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/U107924633L";

export function LeccionHardwareWallets({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [selectedWallet, setSelectedWallet] = useState<'coldcard' | 'trezor' | 'ledger' | 'bitbox'>('coldcard');
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const walletData = {
    coldcard: { name: 'Coldcard (Mk4)', type: 'Air-gapped (Bitcoin Only)', secureElement: 'Dual SE', openSource: 'Parcial', score: '9.8 / 10' },
    trezor: { name: 'Trezor Safe 3', type: 'USB / Multi-crypto', secureElement: 'Optiga Trust M', openSource: '100% Open Source', score: '9.2 / 10' },
    ledger: { name: 'Ledger Stax / Nano X', type: 'Bluetooth / USB Multi', secureElement: 'ST33 Secure Element', openSource: 'Cerrado / Proprietary', score: '8.5 / 10' },
    bitbox: { name: 'BitBox02', type: 'Minimalista USB-C', secureElement: 'Chip Dual con ATECC608A', openSource: '100% Open Source', score: '9.4 / 10' },
  };

  const clave = "nivel-4/hardware-wallets-y-cold-storage";
  const portada = miniaturaDe("4", 7, topic.slug, topic.title);

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
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 4 — Lección 7</span>
              <span className="text-sm text-gray-400">54% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[54%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img
              src={portada.src}
              alt="Hardware Wallets y Cold Storage Coldcard Trezor Ledger"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">🧊 Air-gapped (Coldcard)</div>
              <p className="text-xs text-gray-300">Sin conexión física ni inalámbrica por USB o Bluetooth; la firma de transacciones se realiza de forma totalmente aislada mediante tarjetas MicroSD.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">🔓 Open Source (Trezor / BitBox)</div>
              <p className="text-xs text-gray-300">Firmware y hardware 100% abiertos y auditables por la comunidad, permitiendo verificar que no existen puertas traseras ocultas.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">🛡️ Secure Element (SE)</div>
              <p className="text-xs text-gray-300">Chip criptográfico certificado que protege contra ataques físicos de lectura de memoria, aunque su código interno suele ser privativo.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">⚡ Selector de Especificaciones Técnicas (Hardware Comparator)</h3>
            <p className="mb-4 text-sm text-gray-300">Selecciona un dispositivo para auditar sus características clave de seguridad:</p>

            <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
              <button
                onClick={() => setSelectedWallet('coldcard')}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${selectedWallet === 'coldcard' ? 'border border-amber-400 bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              >
                Coldcard Mk4
              </button>
              <button
                onClick={() => setSelectedWallet('trezor')}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${selectedWallet === 'trezor' ? 'border border-amber-400 bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              >
                Trezor Safe 3
              </button>
              <button
                onClick={() => setSelectedWallet('ledger')}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${selectedWallet === 'ledger' ? 'border border-amber-400 bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              >
                Ledger Nano X
              </button>
              <button
                onClick={() => setSelectedWallet('bitbox')}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${selectedWallet === 'bitbox' ? 'border border-amber-400 bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'}`}
              >
                BitBox02
              </button>
            </div>

            <div className="space-y-2 rounded-xl border border-gray-800 bg-black/80 p-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Modelo Seleccionado:</span>
                <strong className="font-bold text-white">{walletData[selectedWallet].name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo de Conectividad:</span>
                <span className="text-amber-400">{walletData[selectedWallet].type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Elemento de Seguridad:</span>
                <span className="text-green-400">{walletData[selectedWallet].secureElement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transparencia de Software:</span>
                <span className="text-gray-300">{walletData[selectedWallet].openSource}</span>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-2">
                <span className="text-gray-400">Calificación Experta:</span>
                <strong className="text-sm text-amber-400">{walletData[selectedWallet].score}</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img
                  src={portada.src}
                  alt="Curso Experto Ciberseguridad y Cold Storage"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 5.0 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Institucional</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass Avanzada: Ciberseguridad Física, Multisiq & Resguardo en Cold Storage</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a configurar passphrases ocultas BIP39, respaldos multipartitos SeedXor y operaciones Air-Gapped sin comprometer tus llaves privadas.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa Experto en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">🧠 Quiz de Retención Experto</h3>
            <p className="mb-4 text-sm text-gray-300">¿Cuál es la principal ventaja de seguridad de un dispositivo de almacenamiento en frío operado en modo "Air-gapped"?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? 'border border-amber-400 bg-amber-500/20 font-bold text-amber-300' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                A) Elimina totalmente cualquier vector de ataque por conexión de red o malware conectado por USB al carecer de conexiones por cable o inalámbricas directas. (¡Correcto!)
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? 'border border-red-500 bg-red-500/20 text-red-300' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                B) Permite acelerar las confirmaciones de transacciones en la red de Ethereum un 50%.
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

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/V107924570Q?dp=1";

export function LeccionNfts({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [nftPrice, setNftPrice] = useState(1.5);
  const [creatorRoyalty, setCreatorRoyalty] = useState(5);
  const marketplaceFee = 2.5;
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const marketplaceCut = (nftPrice * (marketplaceFee / 100)).toFixed(3);
  const creatorCut = (nftPrice * (creatorRoyalty / 100)).toFixed(3);
  const sellerNetProfit = (nftPrice - parseFloat(marketplaceCut) - parseFloat(creatorCut)).toFixed(3);
  const clave = "nivel-3/mercado-de-nfts";

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion 13</span>
              <span className="text-sm text-gray-400">72% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 w-[72%] bg-amber-400" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src="/assets/lecciones/nivel-3/leccion-13.webp" alt="Mercado de NFTs y Propiedad Digital" className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-amber-400">ERC-721 vs ERC-1155</div>
              <p className="text-xs text-gray-300">ERC-721 es para items unicos e indivisibles. ERC-1155 permite crear colecciones hibridas (fungibles y no fungibles en una sola transaccion).</p>
            </div>
            <div className="rounded-2xl border border-amber-500/40 bg-gray-900/80 p-5 shadow-lg">
              <div className="mb-2 text-base font-bold text-green-400">Metadata & IPFS</div>
              <p className="text-xs text-gray-300">La imagen no se guarda dentro de la blockchain; se almacena en IPFS (red descentralizada) y el smart contract apunta a un hash URI seguro.</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
              <div className="mb-2 text-base font-bold text-blue-400">Utilidad Real</div>
              <p className="text-xs text-gray-300">Mas alla del arte digital: licencias de software, tickets de eventos, identidad de dominio, bienes raices tokenizados y membresias.</p>
            </div>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-gray-900 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">Simulador de Venta de NFT & Distribucion de Fees</h3>
            <p className="mb-4 text-sm text-gray-300">Calcula la comision neta que recibe el vendedor tras restar las tarifas del Marketplace y las regalias del creador original:</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Precio de Venta del NFT: <strong className="text-amber-400">{nftPrice} ETH</strong></label>
                <input type="range" min="0.1" max="10" step="0.1" value={nftPrice} onChange={(e) => setNftPrice(Number(e.target.value))} className="w-full cursor-pointer accent-amber-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Regalias del Creador (Royalties): <strong className="text-green-400">{creatorRoyalty}%</strong></label>
                <input type="range" min="0" max="10" step="0.5" value={creatorRoyalty} onChange={(e) => setCreatorRoyalty(Number(e.target.value))} className="w-full cursor-pointer accent-green-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-black/60 p-4 text-center text-sm md:grid-cols-3">
              <div>
                <span className="block text-xs text-gray-400">Marketplace Fee (2.5%):</span>
                <strong className="text-base text-red-400">-{marketplaceCut} ETH</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Royalties Creador ({creatorRoyalty}%):</span>
                <strong className="text-base text-green-400">-{creatorCut} ETH</strong>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Monto Neto al Vendedor:</span>
                <strong className="text-base font-extrabold text-amber-400">{sellerNetProfit} ETH</strong>
              </div>
            </div>
          </div>

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src="/assets/lecciones/nivel-3/leccion-13.webp" alt="Curso NFT & Web3 Assets" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Creacion, Tokenizacion y Valuacion de NFTs</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a desplegar colecciones ERC-721 en Solidity, configurar almacenamiento IPFS y analizar metricas on-chain en Blur y OpenSea.</p>
                <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Programa en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retencion</h3>
            <p className="mb-4 text-sm text-gray-300">¿Por que es preferible almacenar las imagenes de una coleccion NFT en IPFS en lugar de un servidor centralizado (AWS)?</p>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedQuiz(1)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 1 ? "border border-red-500 bg-red-500/20 text-red-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                A) Porque reduce a cero el precio del gas fee al mintear.
              </button>
              <button
                onClick={() => setSelectedQuiz(2)}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${selectedQuiz === 2 ? "border border-amber-400 bg-amber-500/20 font-bold text-amber-300" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                B) Porque IPFS es descentralizado e inmutable; evita que la imagen desaparezca si el servidor privado deja de pagarse. (¡Correcto!)
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

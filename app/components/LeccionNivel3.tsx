import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import { Markdown } from "@/components/Markdown";
import { curriculumData } from "@/data/curriculum";
import {
  CustodySimulator, YieldCalculator, PegSimulator, BridgeSimulator, OracleManipulator,
  L2GasComparer, POLSimulator, HealthFactorCalculator, InsuranceCoverageSim
} from "@/components/Nivel3Widgets";
import type { Topic } from "@/data/curriculum";

const QUIZ_N3: Record<string, { pregunta: string; opciones: { k: string; t: string }[]; correcta: string; ok: string; bad: string }> = {
  "dex-vs-exchange-centralizado": {
    pregunta: "¿Qué diferencia clave existe entre un CEX y un DEX?",
    opciones: [
      { k: "A", t: "El CEX no pide KYC." },
      { k: "B", t: "En el DEX tú custodias tus llaves privadas." },
      { k: "C", t: "El DEX es más centralizado." },
    ],
    correcta: "B",
    ok: "Correcto. En un DEX no hay custodio central.",
    bad: "Incorrecto. En un DEX controlas tus propias llaves.",
  },
  "yield-farming-de-fi": {
    pregunta: "¿Cuál es el objetivo principal del Compounding en Yield Farming?",
    opciones: [
      { k: "A", t: "Vender todos los tokens principales." },
      { k: "B", t: "Reinvertir periódicamente las recompensas para hacer crecer el capital." },
      { k: "C", t: "Mantener el capital quieto sin reinvertir." },
    ],
    correcta: "B",
    ok: "Correcto. Reinvertir multiplica el rendimiento.",
    bad: "Incorrecto. El compounding reinvierte las recompensas.",
  },
  "tipos-de-stablecoins": {
    pregunta: "¿Qué stablecoin usa cripto como colateral?",
    opciones: [
      { k: "A", t: "USDT." },
      { k: "B", t: "DAI." },
      { k: "C", t: "USDC." },
    ],
    correcta: "B",
    ok: "Correcto. DAI se genera con colateral cripto.",
    bad: "Incorrecto. DAI es colateralizada en cripto.",
  },
  "bridges-cross-chain": {
    pregunta: "¿Qué método usan muchos bridges para mover tokens?",
    opciones: [
      { k: "A", t: "Lock & Mint." },
      { k: "B", t: "Quemar todo el supply." },
      { k: "C", t: "Copiar el saldo." },
    ],
    correcta: "A",
    ok: "Correcto. Se bloquea en origen y se acuña en destino.",
    bad: "Incorrecto. El patrón es Lock & Mint.",
  },
  "el-problema-del-oracle": {
    pregunta: "¿Qué hace un oráculo en blockchain?",
    opciones: [
      { k: "A", t: "Minar bloques." },
      { k: "B", t: "Traer datos del mundo real a la cadena." },
      { k: "C", t: "Guardar contraseñas." },
    ],
    correcta: "B",
    ok: "Correcto. Conecta blockchain con datos externos.",
    bad: "Incorrecto. Los oráculos proveen datos off-chain.",
  },
  "layer-2-soluciones-de-scaling": {
    pregunta: "¿Qué tecnología agrupa transacciones fuera de L1?",
    opciones: [
      { k: "A", t: "Rollups." },
      { k: "B", t: "Sidechains." },
      { k: "C", t: "Bridges." },
    ],
    correcta: "A",
    ok: "Correcto. Los rollups agrupan transacciones.",
    bad: "Incorrecto. Los rollups escalan Ethereum.",
  },
  "seguros-en-defi": {
    pregunta: "¿Qué cubre típicamente un seguro DeFi?",
    opciones: [
      { k: "A", t: "Hacks de contratos y de-peg de stablecoins." },
      { k: "B", t: "Caídas del precio de mercado." },
      { k: "C", t: "Impuestos." },
    ],
    correcta: "A",
    ok: "Correcto. Cubre riesgos de protocolo.",
    bad: "Incorrecto. No cubre volatilidad de mercado.",
  },
  "trading-avanzado-gestión-de-riesgo": {
    pregunta: "¿Qué es el position sizing?",
    opciones: [
      { k: "A", t: "Definir el tamaño de la posición según el riesgo." },
      { k: "B", t: "Comprar todo el capital disponible." },
      { k: "C", t: "Ignorar el stop-loss." },
    ],
    correcta: "A",
    ok: "Correcto. Controla el riesgo por operación.",
    bad: "Incorrecto. El position sizing gestiona el riesgo.",
  },
  "mineria-y-hashrate": {
    pregunta: "¿Qué mide el hashrate?",
    opciones: [
      { k: "A", t: "El poder computacional de la red." },
      { k: "B", t: "El precio del token." },
      { k: "C", t: "El supply total." },
    ],
    correcta: "A",
    ok: "Correcto. Más hashrate = más seguridad.",
    bad: "Incorrecto. Hashrate = poder de cómputo.",
  },
  "mercado-de-nfts": {
    pregunta: "¿Qué es un NFT?",
    opciones: [
      { k: "A", t: "Un token no fungible y único." },
      { k: "B", t: "Una stablecoin." },
      { k: "C", t: "Un pool de liquidez." },
    ],
    correcta: "A",
    ok: "Correcto. Es un activo único e indivisible.",
    bad: "Incorrecto. NFT = non-fungible token.",
  },
  "daos-y-gobernanza-descentralizada": {
    pregunta: "¿Qué es una DAO?",
    opciones: [
      { k: "A", t: "Una organización descentralizada gobernada por su comunidad." },
      { k: "B", t: "Un exchange centralizado." },
      { k: "C", t: "Un banco tradicional." },
    ],
    correcta: "A",
    ok: "Correcto. Gobernanza colectiva on-chain.",
    bad: "Incorrecto. DAO = organización descentralizada.",
  },
  "ethereum-2-staking": {
    pregunta: "¿Qué hace el staking en Ethereum?",
    opciones: [
      { k: "A", t: "Validar y asegurar la red a cambio de recompensas." },
      { k: "B", t: "Minar con GPU." },
      { k: "C", t: "Quemar tokens." },
    ],
    correcta: "A",
    ok: "Correcto. Los validadores aseguran la red.",
    bad: "Incorrecto. El staking valida bloques.",
  },
  "mev-maximal-extractable-value": {
    pregunta: "¿Qué es el MEV?",
    opciones: [
      { k: "A", t: "Valor extraíble al reordenar transacciones." },
      { k: "B", t: "Un token de gobernanza." },
      { k: "C", t: "Un bridge cross-chain." },
    ],
    correcta: "A",
    ok: "Correcto. Beneficio por ordenar/incluir transacciones.",
    bad: "Incorrecto. MEV = valor extraíble por reordenamiento.",
  },
  "identidad-web3": {
    pregunta: "¿Qué es ENS?",
    opciones: [
      { k: "A", t: "Sistema de nombres legibles en Ethereum." },
      { k: "B", t: "Un exchange centralizado." },
      { k: "C", t: "Una wallet física." },
    ],
    correcta: "A",
    ok: "Correcto. Convierte direcciones en nombres.",
    bad: "Incorrecto. ENS = Ethereum Name Service.",
  },
  "privacidad-zcash-monero": {
    pregunta: "¿Qué característica ofrece Monero?",
    opciones: [
      { k: "A", t: "Privacidad por defecto en las transacciones." },
      { k: "B", t: "Transparencia total." },
      { k: "C", t: "KYC obligatorio." },
    ],
    correcta: "A",
    ok: "Correcto. Oculta emisor, receptor y monto.",
    bad: "Incorrecto. Monero prioriza privacidad.",
  },
};

const HOTLINK_A = "https://go.hotmart.com/V107924570Q?dp=1";
const HOTLINK_B = "https://go.hotmart.com/G107924594S";

export function LeccionNivel3({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const lista = curriculumData["nivel-3"].sections.flatMap((s) => s.topics);
  const idx = Math.max(0, lista.findIndex((t) => t.id === topic.id));
  const total = lista.length || 1;
  const progreso = Math.round(((idx + 1) / total) * 100);
  const cover = `/assets/lecciones/nivel-3/leccion-${String(idx + 1).padStart(2, "0")}.webp`;
  const hotlink = idx % 2 === 0 ? HOTLINK_A : HOTLINK_B;
  const [quizSel, setQuizSel] = useState<string | null>(null);
  const quiz = QUIZ_N3[topic.slug];

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
              <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">Nivel 3 — Leccion {idx + 1}</span>
              <span className="text-sm text-gray-400">{progreso}% del Nivel Completado</span>
            </div>
            <div className="w-1/3 overflow-hidden rounded-full bg-gray-800">
              <div className="h-2 bg-amber-400" style={{ width: `${progreso}%` }} />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-white">{topic.title}</h1>
          <p className="mb-6 text-sm text-gray-400">{topic.description}</p>

          <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-gray-900 shadow-2xl aspect-video">
            <img src={cover} alt={topic.title} className="h-full w-full object-cover" />
          </div>

          <div className="my-8 grid gap-4">
            {topic.content.map((parrafo, i) => (
              <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5">
                <div className="lesson-prose"><Markdown content={[parrafo]} /></div>
              </div>
            ))}
          </div>

          {topic.slug === "dex-vs-exchange-centralizado" && <CustodySimulator />}
          {topic.slug === "yield-farming-de-fi" && <YieldCalculator />}
          {topic.slug === "tipos-de-stablecoins" && <PegSimulator />}
          {topic.slug === "bridges-cross-chain" && <BridgeSimulator />}
          {topic.slug === "el-problema-del-oracle" && <OracleManipulator />}
          {topic.slug === "layer-2-soluciones-de-scaling" && <L2GasComparer />}
          {topic.slug === "seguros-en-defi" && <InsuranceCoverageSim />}

          <div className="my-10 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3 aspect-video">
                <img src={cover} alt="Curso recomendado" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">PATROCINADO</span>
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-400">★ 4.9 (Hotmart)</span>
                  <span className="text-xs text-gray-400">· Certificado Incluido</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Masterclass en Estrategias DeFi y Trading</h3>
                <p className="mb-4 text-sm text-gray-300">Aprende a analizar protocolos, gestionar riesgo y maximizar rendimientos con acompañamiento en video.</p>
                <a href={hotlink} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                  <span>Ver Curso en Hotmart →</span>
                </a>
              </div>
            </div>
          </div>

          {quiz && (
            <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Quiz de Retención</h3>
              <p className="mb-4 text-sm text-gray-300">{quiz.pregunta}</p>
              <div className="space-y-2">
                {quiz.opciones.map((o) => (
                  <button
                    key={o.k}
                    disabled={quizSel !== null}
                    onClick={() => setQuizSel(o.k)}
                    className={quizSel === o.k ? "w-full rounded-xl border border-amber-400 bg-amber-500/20 p-3 text-left text-sm font-bold text-amber-300" : "w-full rounded-xl bg-gray-800 p-3 text-left text-sm hover:bg-gray-700"}
                  >
                    {o.k}) {o.t}
                  </button>
                ))}
              </div>
              {quizSel && (
                <div className={quizSel === quiz.correcta ? "mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200" : "mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"}>
                  {quizSel === quiz.correcta ? quiz.ok : quiz.bad}
                </div>
              )}
            </div>
          )}

          <FinLeccion
            clave={`nivel-3/${topic.slug}`}
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

/**
 * LeccionLayout: el DISEÑO DE UNA LECCION, en un solo archivo.
 *
 * POR QUE UN COMPONENTE Y NO CINCO PLANTILLAS
 * Las cinco rutas nivel-N/$topicSlug.tsx eran copias del mismo molde con el
 * numero cambiado. Cualquier ajuste —el contenedor oscuro, el H1 serif, el
 * icono, los badges de temas relacionados— se aplicaba a una y se olvidaba de
 * las otras: los niveles se veian distintos entre si sin que nadie lo decidiera.
 * Ahora las cinco rutas pasan por aqui y el sistema no puede divergir.
 *
 * QUE CUMPLE
 *  - Icono real (Lucide en niveles 1-2, emoji en 3-5) en vez del texto crudo.
 *  - H1 en serif (Playfair Display), igual que las cabeceras de nivel.
 *  - Contenido en tarjeta oscura con borde sutil.
 *  - Tipografia cuidada para listas numeradas, negritas y citas (clase
 *    .lesson-prose, definida en app/styles.css).
 *  - "Temas relacionados" como tarjetas clicables, no una linea de texto.
 *  - Bloque de accion con "Marcar como completada" y navegacion anterior/siguiente.
 */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { Markdown } from "@/components/Markdown";
import { TopicIcon } from "@/components/TopicIcon";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { GasCalculator } from "@/components/GasCalculator";
import { DexFlow } from "@/components/DexFlow";
import { VideoLeccion } from "@/components/VideoLeccion";
import { curriculumData } from "@/data/curriculum";
import { miniaturaDe } from "@/data/thumbnails";
import { minutosLectura } from "@/lib/progreso";
import type { Topic } from "@/data/curriculum";

const BADGE: Record<string, { text: string; className: string }> = {
  free: { text: "GRATIS", className: "border-success/30 bg-success/15 text-success" },
  register: {
    text: "REGISTRO",
    className: "border-info/30 bg-info/15 text-info",
  },
  paid: { text: "PREMIUM", className: "border-warning/30 bg-warning/15 text-warning" },
};

const QUIZZES: Record<string, { pregunta: string; opciones: { k: string; t: string }[]; correcta: string; ok: string; bad: string }> = {
  "mineria-validacion": {
    pregunta: "¿Qué diferencia principal hay entre Proof of Work y Proof of Stake?",
    opciones: [
      { k: "A", t: "PoW usa poder computacional; PoS bloquea cripto como garantía." },
      { k: "B", t: "PoW no consume energía; PoS sí." },
      { k: "C", t: "Ambos son idénticos." },
    ],
    correcta: "A",
    ok: "Correcto. PoW compite con cómputo y PoS usa stake como garantía.",
    bad: "Incorrecto. PoW consume mucha energía y PoS usa bloqueo de cripto.",
  },
  "wallets": {
    pregunta: "¿Qué guarda realmente una wallet?",
    opciones: [
      { k: "A", t: "Las monedas físicas." },
      { k: "B", t: "Tus llaves privadas." },
      { k: "C", t: "El historial del banco." },
    ],
    correcta: "B",
    ok: "Correcto. La wallet guarda tus llaves privadas, no las monedas.",
    bad: "Incorrecto. Las monedas viven en la blockchain; la wallet guarda llaves.",
  },
  "claves-publicas-privadas": {
    pregunta: "¿La relación entre llave privada y pública es de un solo sentido?",
    opciones: [
      { k: "A", t: "No, es reversible." },
      { k: "B", t: "Sí, solo de privada a pública." },
      { k: "C", t: "Solo en Bitcoin." },
    ],
    correcta: "B",
    ok: "Correcto. De la privada se obtiene la pública, no al revés.",
    bad: "Incorrecto. Es matemáticamente inviable deducir la privada desde la pública.",
  },
  "transacciones-fees": {
    pregunta: "¿A quién van las fees de una transacción?",
    opciones: [
      { k: "A", t: "Al proyecto o empresa." },
      { k: "B", t: "A mineros o validadores." },
      { k: "C", t: "Al gobierno." },
    ],
    correcta: "B",
    ok: "Correcto. Las fees incentivan a quienes aseguran la red.",
    bad: "Incorrecto. Las fees van a mineros/validadores, no al proyecto.",
  },
  "que-es-token-cripto": {
    pregunta: "¿Un token ERC-20 vive sobre qué red?",
    opciones: [
      { k: "A", t: "Bitcoin." },
      { k: "B", t: "Ethereum." },
      { k: "C", t: "Ninguna." },
    ],
    correcta: "B",
    ok: "Correcto. Los tokens ERC-20 viven sobre Ethereum.",
    bad: "Incorrecto. ERC-20 es un estándar de Ethereum.",
  },
  "buenas-practicas": {
    pregunta: "¿Qué método de 2FA es más seguro?",
    opciones: [
      { k: "A", t: "SMS." },
      { k: "B", t: "App autenticadora." },
      { k: "C", t: "Solo contraseña." },
    ],
    correcta: "B",
    ok: "Correcto. Las apps autenticadoras evitan SIM swapping.",
    bad: "Incorrecto. SMS puede ser interceptado; usa app autenticadora.",
  },
  "evitar-estafas": {
    pregunta: "¿Cuál es señal clara de estafa?",
    opciones: [
      { k: "A", t: "Promesa de rendimiento garantizado." },
      { k: "B", t: "Uso de hardware wallet." },
      { k: "C", t: "Verificar la dirección." },
    ],
    correcta: "A",
    ok: "Correcto. No existe rentabilidad garantizada.",
    bad: "Incorrecto. Las promesas de ganancia segura son estafa.",
  },
  "cex-vs-dex": {
    pregunta: "¿En un DEX quién custodia tus fondos?",
    opciones: [
      { k: "A", t: "La empresa exchange." },
      { k: "B", t: "Tú mismo." },
      { k: "C", t: "El gobierno." },
    ],
    correcta: "B",
    ok: "Correcto. En un DEX controlas tus fondos.",
    bad: "Incorrecto. En DEX no hay custodio central.",
  },
  "seed-phrase-backups": {
    pregunta: "¿Dónde guardar la seed phrase?",
    opciones: [
      { k: "A", t: "En la nube." },
      { k: "B", t: "En papel o metal físico." },
      { k: "C", t: "En un correo." },
    ],
    correcta: "B",
    ok: "Correcto. Guárdala offline en papel o metal.",
    bad: "Incorrecto. Nunca la guardes en digital.",
  },
  "crear-wallet": {
    pregunta: "¿Crear una wallet cuesta dinero?",
    opciones: [
      { k: "A", t: "Sí, siempre." },
      { k: "B", t: "No." },
      { k: "C", t: "Solo en Bitcoin." },
    ],
    correcta: "B",
    ok: "Correcto. Crear una wallet es gratis.",
    bad: "Incorrecto. Desconfía de sitios que cobren por crear wallet.",
  },
  "hacer-transaccion": {
    pregunta: "¿Una transacción confirmada se puede revertir?",
    opciones: [
      { k: "A", t: "Sí." },
      { k: "B", t: "No." },
      { k: "C", t: "Solo si contactas soporte." },
    ],
    correcta: "B",
    ok: "Correcto. Las transacciones confirmadas son irreversibles.",
    bad: "Incorrecto. No hay reversión en blockchain.",
  },
  "entender-red": {
    pregunta: "¿Qué significa EVM?",
    opciones: [
      { k: "A", t: "Ethereum Virtual Machine." },
      { k: "B", t: "Exchange Virtual Market." },
      { k: "C", t: "Encrypted Value Module." },
    ],
    correcta: "A",
    ok: "Correcto. EVM es la máquina virtual de Ethereum.",
    bad: "Incorrecto. EVM = Ethereum Virtual Machine.",
  },
  "leer-transaccion-explorer": {
    pregunta: "¿Qué muestra un block explorer?",
    opciones: [
      { k: "A", t: "Solo precios." },
      { k: "B", t: "Transacciones y estados en la cadena." },
      { k: "C", t: "Contraseñas." },
    ],
    correcta: "B",
    ok: "Correcto. Muestra actividad real de la red.",
    bad: "Incorrecto. Un explorer muestra transacciones y estados.",
  },
  "funciones-hash": {
    pregunta: "¿Qué propiedad clave tiene una función hash criptográfica?",
    opciones: [
      { k: "A", t: "Es reversible." },
      { k: "B", t: "Un pequeño cambio altera el hash por completo." },
      { k: "C", t: "Siempre devuelve el mismo número." },
    ],
    correcta: "B",
    ok: "Correcto. Pequeños cambios producen hashes muy diferentes.",
    bad: "Incorrecto. Las funciones hash son sensibles a cambios.",
  },
  "merkle-trees": {
    pregunta: "¿Para qué sirve un Merkle Tree?",
    opciones: [
      { k: "A", t: "Guardar contraseñas." },
      { k: "B", t: "Verificar integridad de muchas transacciones de forma eficiente." },
      { k: "C", t: "Minar bloques." },
    ],
    correcta: "B",
    ok: "Correcto. Permite pruebas de inclusión eficientes.",
    bad: "Incorrecto. Merkle Trees verifican integridad de datos.",
  },
  "pow-vs-pos": {
    pregunta: "¿Qué consume menos energía?",
    opciones: [
      { k: "A", t: "Proof of Work." },
      { k: "B", t: "Proof of Stake." },
      { k: "C", t: "Ambos igual." },
    ],
    correcta: "B",
    ok: "Correcto. PoS consume mucha menos energía.",
    bad: "Incorrecto. PoW requiere alto cómputo.",
  },
  "gas-evm": {
    pregunta: "¿Qué determina el costo de una transacción en Ethereum?",
    opciones: [
      { k: "A", t: "Solo el monto enviado." },
      { k: "B", t: "Gas limit y precio del gas." },
      { k: "C", t: "El nombre del token." },
    ],
    correcta: "B",
    ok: "Correcto. Gas limit × precio gas = fee.",
    bad: "Incorrecto. El fee depende del gas y su precio.",
  },
  "nodos": {
    pregunta: "¿Qué tipo de nodo tiene toda la cadena?",
    opciones: [
      { k: "A", t: "Light node." },
      { k: "B", t: "Full node." },
      { k: "C", t: "Archive node solo metadata." },
    ],
    correcta: "B",
    ok: "Correcto. Full node almacena la cadena completa.",
    bad: "Incorrecto. Full node mantiene toda la blockchain.",
  },
  "que-son-smart-contracts": {
    pregunta: "¿Qué es un smart contract?",
    opciones: [
      { k: "A", t: "Un contrato legal en papel." },
      { k: "B", t: "Código que se ejecuta en la blockchain." },
      { k: "C", t: "Un exchange centralizado." },
    ],
    correcta: "B",
    ok: "Correcto. Es código autoejecutable en la cadena.",
    bad: "Incorrecto. Smart contracts son programas on-chain.",
  },
  "para-que-sirven": {
    pregunta: "¿Un uso común de smart contracts es?",
    opciones: [
      { k: "A", t: "Enviar emails." },
      { k: "B", t: "Automatizar acuerdos y DeFi." },
      { k: "C", t: "Guardar fotos." },
    ],
    correcta: "B",
    ok: "Correcto. Automatizan lógica y finanzas descentralizadas.",
    bad: "Incorrecto. Sirven para automatizar procesos on-chain.",
  },
  "riesgos-comunes": {
    pregunta: "¿Un riesgo común en smart contracts es?",
    opciones: [
      { k: "A", t: "Bugs en el código." },
      { k: "B", t: "Exceso de documentación." },
      { k: "C", t: "Demasiada descentralización." },
    ],
    correcta: "A",
    ok: "Correcto. Bugs pueden causar pérdidas.",
    bad: "Incorrecto. Errores de código son riesgos clave.",
  },
  "oraculos": {
    pregunta: "¿Qué hace un oráculo en blockchain?",
    opciones: [
      { k: "A", t: "Minar bloques." },
      { k: "B", t: "Traer datos del mundo real a la cadena." },
      { k: "C", t: "Guardar contraseñas." },
    ],
    correcta: "B",
    ok: "Correcto. Conecta blockchain con datos externos.",
    bad: "Incorrecto. Oráculos proveen datos off-chain.",
  },
  "oferta-demanda": {
    pregunta: "¿Qué afecta el precio de un activo cripto?",
    opciones: [
      { k: "A", t: "Solo el nombre." },
      { k: "B", t: "Oferta y demanda." },
      { k: "C", t: "El color del logo." },
    ],
    correcta: "B",
    ok: "Correcto. Oferta y demanda determinan precio.",
    bad: "Incorrecto. El mercado responde a oferta/demanda.",
  },
  "emision": {
    pregunta: "¿Qué es la emisión de una criptomoneda?",
    opciones: [
      { k: "A", t: "La creación de nuevas unidades." },
      { k: "B", t: "La quema de tokens." },
      { k: "C", t: "El precio en USD." },
    ],
    correcta: "A",
    ok: "Correcto. Emisión es la creación de nuevas unidades.",
    bad: "Incorrecto. Emisión se refiere a supply nuevo.",
  },
  "halving": {
    pregunta: "¿Qué hace el halving de Bitcoin?",
    opciones: [
      { k: "A", t: "Duplica la recompensa." },
      { k: "B", t: "Reduce la recompensa a la mitad." },
      { k: "C", t: "Elimina fees." },
    ],
    correcta: "B",
    ok: "Correcto. El halving reduce la recompensa minera.",
    bad: "Incorrecto. Halving = mitad de recompensa.",
  },
  "quema-de-tokens": {
    pregunta: "¿Qué es la quema de tokens?",
    opciones: [
      { k: "A", t: "Enviar tokens a una dirección inaccesible." },
      { k: "B", t: "Vender todos los tokens." },
      { k: "C", t: "Minar nuevos tokens." },
    ],
    correcta: "A",
    ok: "Correcto. Quemar reduce el supply circulante.",
    bad: "Incorrecto. Quema = destrucción de tokens.",
  },
  "market-cap": {
    pregunta: "¿Qué es el market cap?",
    opciones: [
      { k: "A", t: "Precio × supply circulante." },
      { k: "B", t: "Solo el precio." },
      { k: "C", t: "El número de usuarios." },
    ],
    correcta: "A",
    ok: "Correcto. Market cap = precio × supply.",
    bad: "Incorrecto. Market cap considera supply circulante.",
  },
  "defi-que-es": {
    pregunta: "¿Qué es DeFi?",
    opciones: [
      { k: "A", t: "Finanzas centralizadas tradicionales." },
      { k: "B", t: "Finanzas descentralizadas sobre blockchain." },
      { k: "C", t: "Un exchange custodial." },
    ],
    correcta: "B",
    ok: "Correcto. DeFi es finanzas sin intermediarios.",
    bad: "Incorrecto. DeFi es descentralizado.",
  },
  "pools-liquidity": {
    pregunta: "¿Qué es un pool de liquidez?",
    opciones: [
      { k: "A", t: "Un fondo de tokens bloqueados para facilitar intercambios." },
      { k: "B", t: "Una cuenta bancaria." },
      { k: "C", t: "Un minero." },
    ],
    correcta: "A",
    ok: "Correcto. Los pools permiten swaps automáticos.",
    bad: "Incorrecto. Pools bloquean tokens para AMMs.",
  },
  "amm-uniswap": {
    pregunta: "¿Qué usa Uniswap para fijar precios?",
    opciones: [
      { k: "A", t: "Un order book centralizado." },
      { k: "B", t: "Fórmula de producto constante (x*y=k)." },
      { k: "C", t: "Un banco." },
    ],
    correcta: "B",
    ok: "Correcto. AMM usa x*y=k.",
    bad: "Incorrecto. Uniswap es AMM, no order book.",
  },
  "lending": {
    pregunta: "¿Qué es lending en DeFi?",
    opciones: [
      { k: "A", t: "Prestar/borrowar cripto con colateral." },
      { k: "B", t: "Minar Bitcoin." },
      { k: "C", t: "Comprar NFTs." },
    ],
    correcta: "A",
    ok: "Correcto. Lending permite préstamos descentralizados.",
    bad: "Incorrecto. Lending es préstamo con colateral.",
  },
  "staking-yield": {
    pregunta: "¿Qué es el yield farming?",
    opciones: [
      { k: "A", t: "Ganar recompensas por proveer liquidez/stake." },
      { k: "B", t: "Minar con GPU." },
      { k: "C", t: "Comprar hardware." },
    ],
    correcta: "A",
    ok: "Correcto. Yield farming genera rendimiento por participación.",
    bad: "Incorrecto. Yield farming busca rendimiento en DeFi.",
  },
};

const SUFIJO: Record<string, string> = {
  "1": "principiante",
  "2": "intermedio",
  "3": "avanzado",
  "4": "experto",
  "5": "especializaciones",
};

/**
 * El `to` de <Link> esta tipado contra el arbol de rutas generado, y aqui las
 * rutas se arman en runtime porque el nivel llega por prop. El cast es
 * necesario: sin el, "/nivel-${nivel}/${slug}" no compila. Los cinco valores de
 * SUFIJO y los slugs vienen de curriculumData, no de entrada de usuario.
 */
const rutaNivel = (nivel: string) => `/nivel-${nivel}-${SUFIJO[nivel] ?? ""}` as never;
const rutaLeccion = (nivel: string, slug: string) => `/nivel-${nivel}/${slug}` as never;

interface LeccionLayoutProps {
  nivel: string;
  topic: Topic;
  /** Temas contiguos en el orden de lectura del nivel (pueden ser null). */
  anterior: Topic | null;
  siguiente: Topic | null;
  /** Resuelve los slugs de "related" a titulos; null si ya no existen. */
  resolverRelacionado: (slug: string) => Topic | null;
}

export function LeccionLayout({
  nivel,
  topic,
  anterior,
  siguiente,
  resolverRelacionado,
}: LeccionLayoutProps) {
  const badge = BADGE[topic.badge ?? "free"] ?? BADGE.free;
  const clave = `nivel-${nivel}/${topic.slug}`;

  const declarados = (topic.related ?? [])
    .map((slug) => resolverRelacionado(slug))
    .filter((t): t is Topic => Boolean(t));

  // Los niveles 3 a 5 no traen `related` en los datos (0 de sus 42 temas), asi
  // que sin este respaldo 42 de las 76 lecciones se quedarian sin el bloque y el
  // nivel se veria descuadrado contra el 1 y el 2. Caemos en los vecinos del
  // orden de lectura: son datos reales del curriculum, no una sugerencia
  // inventada.
  const relacionados =
    declarados.length > 0 ? declarados : [anterior, siguiente].filter((t): t is Topic => Boolean(t));

  const todosLosTemas = curriculumData[`nivel-${nivel}`]?.sections.flatMap((s) => s.topics) ?? [];
  const indiceLeccion = Math.max(0, todosLosTemas.findIndex((t) => t.id === topic.id));
  const totalLecciones = todosLosTemas.length || 1;
  const progresoPct = Math.round(((indiceLeccion + 1) / totalLecciones) * 100);
  const minutos = minutosLectura(topic.content);
  const portada = miniaturaDe(nivel, indiceLeccion + 1, topic.slug, topic.title);
  const [quizSel, setQuizSel] = useState<string | null>(null);
  const quiz = QUIZZES[topic.slug];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={rutaNivel(nivel)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al Nivel {nivel}
            </Link>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
            >
              {badge.text}
            </span>
          </nav>

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Nivel {nivel} — Leccion {indiceLeccion + 1} de {totalLecciones} · {progresoPct}% completado
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${progresoPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">⏱️ {minutos} min de lectura</p>
          </div>

          {/* Tarjeta oscura: es el contenedor de lectura de todo el sitio, el
              mismo que usan las guias de /recursos. */}
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              <img
                src={portada.src}
                alt={portada.alt}
                className={`aspect-video w-full ${portada.ajuste === "contain" ? "object-contain" : "object-cover"}`}
                loading="lazy"
              />
            </div>
            <header className="mb-6">
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <TopicIcon icon={topic.icon} className="h-6 w-6" />
              </span>
              <h1 className="font-serif text-3xl font-medium leading-tight tracking-[0.01em] text-foreground md:text-4xl">
                {topic.title}
              </h1>
              <p className="mt-3 text-base text-muted-foreground">{topic.description}</p>
            </header>

            <VideoLeccion topic={topic} />

            {topic.resources && topic.resources.length > 0 && (
              <section className="mb-6 rounded-xl border border-warning/25 bg-warning/10 p-4">
                <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-warning">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Recursos descargables
                </h2>
                <ul className="space-y-1.5">
                  {topic.resources.map((recurso) => (
                    <li key={recurso.href}>
                      <a
                        href={recurso.href}
                        download
                        className="text-sm text-warning underline underline-offset-4 hover:opacity-80"
                      >
                        {recurso.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topic.keywords && topic.keywords.length > 0 && (
              <p className="mb-6 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wider">Temas relacionados:</span>{" "}
                {topic.keywords.join(" · ")}
              </p>
            )}

            {/* El cuerpo va dentro de .lesson-prose: ver los estilos en
                app/styles.css. No se usa la clase `prose` de Tailwind porque el
                proyecto no tiene instalado @tailwindcss/typography y escribarla
                no generaria nada. */}
            <div className="grid gap-4">
              {topic.content.map((parrafo, i) => (
                <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                  <div className="lesson-prose">
                    <Markdown content={[parrafo]} />
                  </div>
                </div>
              ))}
            </div>

            {topic.slug === "gas-evm" && <GasCalculator />}
            {topic.slug === "amm-uniswap" && <DexFlow />}

            <HotmartNativeBanner nivel={nivel} className="my-8" />

            {quiz && (
              <section className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
                <h3 className="mb-3 font-serif text-xl">Quiz de retencion</h3>
                <p className="mb-4 text-sm text-muted-foreground">{quiz.pregunta}</p>
                <div className="space-y-3">
                  {quiz.opciones.map((o) => (
                    <button
                      key={o.k}
                      disabled={quizSel !== null}
                      onClick={() => setQuizSel(o.k)}
                      className={quizSel === o.k ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-amber-500/60 bg-amber-500/10" : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"}
                    >
                      <span className="font-bold">{o.k})</span>
                      <span>{o.t}</span>
                    </button>
                  ))}
                </div>
                {quizSel && (
                  <div className={quizSel === quiz.correcta ? "mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-800 dark:text-green-200" : "mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200"}>
                    {quizSel === quiz.correcta ? quiz.ok : quiz.bad}
                  </div>
                )}
              </section>
            )}

            {relacionados.length > 0 && (
              <section className="mt-10 border-t border-slate-800 pt-8">
                <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  Sigue con estos temas
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Los mismos cinco niveles, en orden de lectura.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {relacionados.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        to={rutaLeccion(nivel, rel.slug)}
                        className="group flex h-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 transition-[transform,border-color,background-color] duration-200 ease-out hover-hover:-translate-y-0.5 hover:border-primary/60 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                          aria-hidden="true"
                        >
                          <TopicIcon icon={rel.icon} className="h-4 w-4" />
                        </span>
                        <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                          <span className="text-sm font-medium text-foreground transition-colors group-hover-hover:text-primary">
                            {rel.title}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover-hover:translate-x-0.5 group-hover-hover:text-primary"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <FinLeccion
            clave={clave}
            hrefAnterior={anterior ? rutaLeccion(nivel, anterior.slug) : null}
            tituloAnterior={anterior?.title ?? null}
            hrefSiguiente={siguiente ? rutaLeccion(nivel, siguiente.slug) : null}
            tituloSiguiente={siguiente?.title ?? null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
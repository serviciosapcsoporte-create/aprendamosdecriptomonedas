import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { miniaturaDe } from "@/data/thumbnails";
import { curriculumData } from "@/data/curriculum";
import type { Topic } from "@/data/curriculum";

type LessonProps = { topic: Topic; anterior: Topic | null; siguiente: Topic | null };
type Quiz = { question: string; answers: [string, string]; correct: number };

const QUIZZES: Record<string, Quiz> = {
  "zk-rollups-y-el-futuro-ethereum": { question: "¿Qué diferencia clave distingue a un Validium de un rollup con disponibilidad de datos en Ethereum?", answers: ["En Validium los datos se publican fuera de Ethereum, con supuestos adicionales de disponibilidad.", "Validium elimina la necesidad de probar el estado o verificar transiciones."], correct: 0 },
  "mev-maximizer-y-auction-design": { question: "En PBS, ¿qué papel cumple el proposer?", answers: ["Elegir una oferta de bloque y proponerla, sin construir necesariamente el bloque.", "Ejecutar cada transacción de usuario antes que los builders."], correct: 0 },
  "account-abstraction-y-smart-contracts": { question: "¿Qué aporta un paymaster en EIP-4337?", answers: ["Puede patrocinar el gas o permitir otro mecanismo de pago bajo sus reglas.", "Garantiza que cualquier operación sea gratuita y segura."], correct: 0 },
  "cross-rollup-communication": { question: "¿Qué debe verificarse al recibir un mensaje cross-chain?", answers: ["Autenticidad, origen, destino, replay protection y condiciones de finalización.", "Solo que el mensaje tenga un hash de 32 bytes."], correct: 0 },
  "zk-identity-y-privacy": { question: "¿Qué demuestra una credencial ZK bien diseñada?", answers: ["Una propiedad concreta sin revelar necesariamente todos los datos subyacentes.", "Que no se recopilaron ni almacenaron datos personales en ningún punto."], correct: 0 },
  "modular-blockchain-y-op-stack": { question: "¿Qué implica separar disponibilidad de datos y ejecución?", answers: ["La seguridad y las suposiciones del sistema dependen también de la capa de disponibilidad elegida.", "La cadena deja de depender de validadores, operadores o puentes."], correct: 0 },
  "starknet-y-lenguaje-cairo": { question: "¿Qué es `felt252` en Cairo?", answers: ["Un elemento de un campo finito usado por el modelo de cómputo de Cairo.", "Un entero sin límite que nunca se reduce módulo un primo."], correct: 0 },
  "restaking-y-eigenlayer": { question: "¿Qué añade el restaking al riesgo del stake original?", answers: ["Obligaciones y posibles condiciones de slashing adicionales por cada servicio.", "Una garantía de que las recompensas aumentan sin riesgo adicional."], correct: 0 },
  "defi-security-y-formal-verification": { question: "¿Qué demuestra una suite de pruebas con alta cobertura?", answers: ["Que se ejecutaron muchas rutas, pero no que el contrato esté libre de vulnerabilidades.", "Que todas las propiedades de seguridad están demostradas formalmente."], correct: 0 },
  "ingenieria-de-cartera-crypto": { question: "¿Qué representa la volatilidad de cartera del simulador?", answers: ["Una estimación que depende de volatilidades, pesos y correlación supuestos.", "Una pérdida máxima garantizada para cualquier periodo."], correct: 0 },
  "regulacion-y-compliance-global": { question: "¿Cómo usar esta matriz de regulación?", answers: ["Como mapa inicial; hay que verificar fuentes oficiales y asesoría para el caso concreto.", "Como dictamen legal universal y actualizado para todas las actividades."], correct: 0 },
};

function LessonFrame({ topic, anterior, siguiente, children }: LessonProps & { children: ReactNode }) {
  const [selected, setSelected] = useState<number | null>(null);
  const topics = curriculumData["nivel-5"]?.sections.flatMap((section) => section.topics) ?? [];
  const foundIndex = topics.findIndex((item) => item.id === topic.id);
  const lesson = foundIndex >= 0 ? foundIndex + 1 : 1;
  const progress = Math.round((lesson / (topics.length || 1)) * 100);
  const cover = miniaturaDe("5", lesson, topic.slug, topic.title);
  const quiz = QUIZZES[topic.slug];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/nivel-5-especializaciones" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />Volver al Nivel 5
            </Link>
            <span className="rounded-full border border-warning/30 bg-warning/15 px-2.5 py-0.5 text-xs font-semibold text-warning">Nivel 5 · Lección {lesson} de {topics.length}</span>
          </nav>
          <div className="mb-6">
            <div className="mb-2 flex justify-between gap-3 text-sm text-muted-foreground"><span>{progress}% del nivel</span><span>{lesson}/{topics.length} lecciones</span></div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label="Progreso del nivel" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <h1 className="mb-2 font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">{topic.title}</h1>
          <p className="mb-6 text-sm text-muted-foreground">{topic.description}</p>
          <div className="mb-8 overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900">
            <img src={cover.src} alt={cover.alt} className={`aspect-video w-full ${cover.ajuste === "contain" ? "object-contain" : "object-cover"}`} width={1280} height={720} fetchPriority="high" />
          </div>
          {children}
          {quiz && <section aria-labelledby="level5-quiz" className="my-8 rounded-xl border border-border bg-card p-6">
            <h2 id="level5-quiz" className="mb-3 text-lg font-bold text-foreground">Quiz de retención</h2>
            <p className="mb-4 text-sm text-muted-foreground">{quiz.question}</p>
            <div className="space-y-2">
              {quiz.answers.map((answer, index) => <button key={answer} type="button" disabled={selected !== null} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${selected === index ? index === quiz.correct ? "border-success/50 bg-success/10 text-success" : "border-destructive/50 bg-destructive/10 text-destructive" : "border-border bg-background hover:bg-accent disabled:opacity-70"}`}>
                {String.fromCharCode(65 + index)}) {answer}{selected === index && index === quiz.correct ? " Correcto." : ""}
              </button>)}
            </div>
            {selected !== null && <p role="status" className={`mt-4 rounded-lg border p-3 text-sm ${selected === quiz.correct ? "border-success/40 bg-success/10 text-success" : "border-warning/40 bg-warning/10 text-warning"}`}>{selected === quiz.correct ? "Correcto. Has identificado el concepto clave." : "No exactamente. Revisa la explicación de esta lección."}</p>}
          </section>}
          <HotmartNativeBanner nivel="5" imagen={cover.src} className="my-8" />
          <FinLeccion clave={`nivel-5/${topic.slug}`} hrefAnterior={anterior ? `/nivel-5/${anterior.slug}` : null} tituloAnterior={anterior?.title ?? null} hrefSiguiente={siguiente ? `/nivel-5/${siguiente.slug}` : null} tituloSiguiente={siguiente?.title ?? null} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function InteractiveModule({ slug }: { slug: string }) {
  switch (slug) {
    case "zk-rollups-y-el-futuro-ethereum": return <ZkAvailability />;
    case "mev-maximizer-y-auction-design": return <MevAuction />;
    case "account-abstraction-y-smart-contracts": return <AccountAbstraction />;
    case "cross-rollup-communication": return <CrossRollup />;
    case "zk-identity-y-privacy": return <ZkIdentity />;
    case "modular-blockchain-y-op-stack": return <ModularStack />;
    case "starknet-y-lenguaje-cairo": return <CairoField />;
    case "restaking-y-eigenlayer": return <RestakingRisk />;
    case "defi-security-y-formal-verification": return <InvariantCheck />;
    case "ingenieria-de-cartera-crypto": return <PortfolioRisk />;
    case "regulacion-y-compliance-global": return <RegulatoryMap />;
    default: return null;
  }
}

export function LeccionNivel5Interactiva(props: LessonProps) {
  return <LessonFrame key={props.topic.slug} {...props}><InteractiveModule slug={props.topic.slug} /></LessonFrame>;
}

function ZkAvailability() {
  const [mode, setMode] = useState<"rollup" | "validium">("rollup");
  const isRollup = mode === "rollup";
  return <section aria-labelledby="zk-availability" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="zk-availability" className="mb-2 text-lg font-bold text-warning">Comparador de disponibilidad de datos</h2>
    <p className="mb-5 text-sm text-muted-foreground">La prueba de validez y la disponibilidad de los datos son propiedades distintas.</p>
    <div role="group" aria-label="Arquitectura" className="mb-5 flex flex-wrap gap-2">
      {(["rollup", "validium"] as const).map((value) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === value ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{value === "rollup" ? "ZK-Rollup" : "Validium"}</button>)}
    </div>
    <dl aria-live="polite" className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-border bg-background p-4"><dt className="text-sm text-muted-foreground">Disponibilidad de datos</dt><dd className="mt-1 font-semibold text-foreground">{isRollup ? "Publicados en L1 (u otra DA verificable)" : "Fuera de L1, con comité/servicio de disponibilidad"}</dd></div>
      <div className="rounded-lg border border-border bg-background p-4"><dt className="text-sm text-muted-foreground">Supuesto a revisar</dt><dd className="mt-1 font-semibold text-foreground">{isRollup ? "Coste y reglas de publicación de datos" : "Que los datos necesarios puedan recuperarse"}</dd></div>
    </dl>
    <p className="mt-4 text-xs text-muted-foreground">Ambos diseños pueden usar pruebas de validez; una prueba válida no demuestra por sí sola que los datos estén disponibles.</p>
  </section>;
}

function MevAuction() {
  const [bidA, setBidA] = useState(0.42);
  const [bidB, setBidB] = useState(0.37);
  const winner = bidA >= bidB ? "Builder A" : "Builder B";
  return <section aria-labelledby="mev-auction" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="mev-auction" className="mb-2 text-lg font-bold text-warning">Subasta de bloques: proposer-builder separation</h2>
    <p className="mb-5 text-sm text-muted-foreground">Ajusta ofertas hipotéticas. La mayor puja gana en este modelo simplificado; no representa MEV real ni las reglas de un relay específico.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      {[["Builder A", bidA, setBidA], ["Builder B", bidB, setBidB]].map(([label, value, setter]) => <label key={label as string} className="grid gap-2 text-sm text-muted-foreground">{label as string}: {(value as number).toFixed(2)} ETH<span className="flex items-center gap-3"><input type="range" min="0" max="1" step="0.01" value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="min-w-0 flex-1 accent-amber-400" /><output>{(value as number).toFixed(2)}</output></span></label>)}
    </div>
    <div aria-live="polite" className="mt-5 rounded-lg border border-border bg-background p-4 text-sm"><span className="text-muted-foreground">Oferta seleccionada en el ejemplo:</span> <strong className="text-info">{winner}</strong></div>
  </section>;
}

function AccountAbstraction() {
  const [step, setStep] = useState(0);
  const steps = ["Wallet crea una UserOperation", "Bundler valida y agrupa operaciones", "EntryPoint ejecuta validación y llamada", "Paymaster opcional patrocina el gas"];
  return <section aria-labelledby="aa-flow" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="aa-flow" className="mb-2 text-lg font-bold text-warning">Recorrido de una UserOperation</h2>
    <p className="mb-5 text-sm text-muted-foreground">Avanza por el flujo simplificado de EIP-4337. El paymaster y el patrocinio son opcionales y tienen sus propias reglas.</p>
    <ol className="space-y-2">{steps.map((label, index) => <li key={label}><button type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)} className={`w-full rounded-lg border p-3 text-left text-sm ${step === index ? "border-amber-400 bg-amber-500/15 text-foreground" : "border-border bg-background text-muted-foreground hover:bg-accent"}`}><span className="mr-2 font-bold">{index + 1}.</span>{label}</button></li>)}</ol>
    <p aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">{step === 0 ? "La operación describe la intención y contiene datos de validación; no es una transacción Ethereum estándar firmada directamente por una EOA." : step === 1 ? "El bundler simula y agrupa operaciones antes de enviarlas al contrato EntryPoint." : step === 2 ? "EntryPoint aplica las reglas de validación y ejecución del smart account." : "El paymaster puede cubrir el coste si la operación cumple sus políticas y límites."}</p>
  </section>;
}

function CrossRollup() {
  const [step, setStep] = useState(0);
  const steps = ["Mensaje emitido en origen", "Prueba/atestación disponible", "Finalidad y verificación", "Ejecución en destino"];
  return <section aria-labelledby="cross-rollup" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="cross-rollup" className="mb-2 text-lg font-bold text-warning">Simulador de ciclo de un mensaje cross-rollup</h2>
    <p className="mb-5 text-sm text-muted-foreground">Selecciona los pasos para ver dónde se comprueban autenticidad y finalidad. No envía mensajes a ninguna red.</p>
    <div className="grid gap-2 sm:grid-cols-2">{steps.map((label, index) => <button key={label} type="button" aria-pressed={step === index} onClick={() => setStep(index)} className={`rounded-lg border p-3 text-left text-sm ${step === index ? "border-amber-400 bg-amber-500/15 text-foreground" : "border-border bg-background text-muted-foreground hover:bg-accent"}`}><span className="mr-2 font-bold">{index + 1}.</span>{label}</button>)}</div>
    <p aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">{["El contrato origen emite una intención o mensaje con dominio y nonce definidos.", "Relayers, oráculos o clientes ligeros aportan la evidencia prevista por el protocolo.", "El destino valida el origen, el formato, la protección contra replay y la política de finalización.", "La aplicación destino ejecuta solo después de validar; fallos y reintentos deben estar contemplados."][step]}</p>
  </section>;
}

function ZkIdentity() {
  const [credential, setCredential] = useState(false);
  const [member, setMember] = useState(false);
  const eligible = credential && member;
  return <section aria-labelledby="zk-identity" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="zk-identity" className="mb-2 text-lg font-bold text-warning">Demostración conceptual de una credencial privada</h2>
    <p className="mb-5 text-sm text-muted-foreground">Marca atributos que un usuario podría probar sin publicar el valor original. Esto es solo una maqueta; no genera una prueba criptográfica.</p>
    <div className="space-y-3">
      <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm"><input type="checkbox" checked={credential} onChange={(event) => setCredential(event.target.checked)} className="mt-0.5 accent-amber-400" /><span>Tengo una credencial válida emitida por una fuente aceptada.</span></label>
      <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm"><input type="checkbox" checked={member} onChange={(event) => setMember(event.target.checked)} className="mt-0.5 accent-amber-400" /><span>Mi compromiso pertenece al grupo requerido.</span></label>
    </div>
    <p aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm">Resultado ilustrativo: <strong className={eligible ? "text-success" : "text-muted-foreground"}>{eligible ? "requisitos demostrados" : "faltan requisitos"}</strong>. Los datos personales no se recogen ni se envían.</p>
  </section>;
}

function ModularStack() {
  const [execution, setExecution] = useState("OP Stack");
  const [data, setData] = useState("Ethereum blobs");
  const [settlement, setSettlement] = useState("Ethereum");
  return <section aria-labelledby="modular-stack" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="modular-stack" className="mb-2 text-lg font-bold text-warning">Constructor de una arquitectura modular</h2>
    <p className="mb-5 text-sm text-muted-foreground">Cada capa introduce dependencias distintas; cambiar una opción modifica las suposiciones de confianza y disponibilidad.</p>
    <div className="grid gap-4 sm:grid-cols-3">{[["Ejecución", execution, setExecution, ["OP Stack", "Polygon CDK", "Cairo"]], ["Disponibilidad de datos", data, setData, ["Ethereum blobs", "Celestia", "EigenDA"]], ["Settlement", settlement, setSettlement, ["Ethereum", "Otra L1", "Propio"]]].map(([label, value, setter, options]) => <label key={label as string} className="grid gap-2 text-sm text-muted-foreground">{label as string}<select value={value as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground">{(options as string[]).map((option) => <option key={option}>{option}</option>)}</select></label>)}</div>
    <div aria-live="polite" className="mt-5 rounded-lg border border-border bg-background p-4"><p className="text-sm font-semibold text-foreground">Stack seleccionado</p><p className="mt-2 text-sm text-muted-foreground">Ejecución: {execution} · Datos: {data} · Settlement: {settlement}</p><p className="mt-3 text-xs text-warning">Revisa disponibilidad de datos, operadores, actualización de software, puentes y procedimiento de salida antes de comparar costes.</p></div>
  </section>;
}

function CairoField() {
  const [left, setLeft] = useState(12);
  const [right, setRight] = useState(9);
  const [operation, setOperation] = useState<"+" | "×">("+");
  const result = operation === "+" ? (left + right) % 97 : (left * right) % 97;
  return <section aria-labelledby="cairo-field" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="cairo-field" className="mb-2 text-lg font-bold text-warning">Operaciones en un campo finito</h2>
    <p className="mb-5 text-sm text-muted-foreground">Mini-ejemplo con el campo de juguete p=97 para visualizar la reducción modular. Cairo usa `felt252` y un campo mucho mayor; esto no ejecuta Cairo ni estima gas.</p>
    <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <label className="grid gap-2 text-sm text-muted-foreground">Valor A<input type="number" min="0" max="96" value={left} onChange={(event) => setLeft(Math.min(96, Math.max(0, Number(event.target.value))))} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground" /></label>
      <select aria-label="Operación" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground"><option value="+">+</option><option value="×">×</option></select>
      <label className="grid gap-2 text-sm text-muted-foreground">Valor B<input type="number" min="0" max="96" value={right} onChange={(event) => setRight(Math.min(96, Math.max(0, Number(event.target.value))))} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground" /></label>
    </div>
    <p aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">({left} {operation} {right}) mod 97 = <strong className="text-info">{result}</strong></p>
  </section>;
}

function RestakingRisk() {
  const [services, setServices] = useState<string[]>([]);
  const options = ["Disponibilidad de datos", "Oracle", "Bridge", "Servicio de cómputo"];
  const toggle = (option: string) => setServices((current) => current.includes(option) ? current.filter((value) => value !== option) : [...current, option]);
  return <section aria-labelledby="restaking-risk" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="restaking-risk" className="mb-2 text-lg font-bold text-warning">Mapa de exposición al restaking</h2>
    <p className="mb-5 text-sm text-muted-foreground">Selecciona servicios a los que participa un operador. El riesgo depende de cada contrato, reglas de slashing, operador y correlación; no se resume en un APY.</p>
    <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => <label key={option} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-sm"><input type="checkbox" checked={services.includes(option)} onChange={() => toggle(option)} className="accent-amber-400" />{option}</label>)}</div>
    <div aria-live="polite" className="mt-4 rounded-lg border border-border bg-background p-4 text-sm"><strong className="text-foreground">Servicios seleccionados: {services.length}</strong><p className="mt-2 text-muted-foreground">{services.length ? `Revisa separadamente las condiciones de slashing, dependencias y respuesta a fallos de: ${services.join(", ")}.` : "Selecciona al menos un servicio para mapear sus condiciones."}</p></div>
  </section>;
}

function InvariantCheck() {
  const [before, setBefore] = useState(1000);
  const [minted, setMinted] = useState(25);
  const [burned, setBurned] = useState(10);
  const [after, setAfter] = useState(1015);
  const expected = before + minted - burned;
  const valid = expected === after;
  const fields = [["Supply inicial", before, setBefore], ["Mint autorizado", minted, setMinted], ["Burn", burned, setBurned], ["Supply final observado", after, setAfter]] as const;
  return <section aria-labelledby="invariant-check" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="invariant-check" className="mb-2 text-lg font-bold text-warning">Comprobador de invariante de supply</h2>
    <p className="mb-5 text-sm text-muted-foreground">Modelo didáctico: el supply final debe igualar supply inicial + mint autorizado − burn. En un contrato real hay que modelar todas las rutas y estados.</p>
    <div className="grid gap-3 sm:grid-cols-2">{fields.map(([label, value, setter]) => <label key={label} className="grid gap-2 text-sm text-muted-foreground">{label}<input type="number" min="0" value={value} onChange={(event) => setter(Math.max(0, Number(event.target.value)))} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground" /></label>)}</div>
    <p aria-live="polite" className={`mt-4 rounded-lg border p-4 text-sm ${valid ? "border-success/40 bg-success/10 text-success" : "border-destructive/40 bg-destructive/10 text-destructive"}`}>{valid ? `Invariante satisfecha: ${after} = ${expected}.` : `Invariante rota: se esperaba ${expected}, se observó ${after}.`}</p>
    <p className="mt-3 text-xs text-muted-foreground">Una invariante comprobada en este ejemplo no sustituye fuzzing, revisión manual ni verificación de propiedades del contrato.</p>
  </section>;
}

function PortfolioRisk() {
  const [weight, setWeight] = useState(60);
  const [volA, setVolA] = useState(55);
  const [volB, setVolB] = useState(35);
  const [correlation, setCorrelation] = useState(65);
  const w = weight / 100;
  const rho = correlation / 100;
  const volatility = Math.sqrt(w * w * (volA / 100) ** 2 + (1 - w) ** 2 * (volB / 100) ** 2 + 2 * w * (1 - w) * rho * (volA / 100) * (volB / 100)) * 100;
  const controls = [["Peso del activo A", weight, setWeight], ["Volatilidad A (supuesto)", volA, setVolA], ["Volatilidad B (supuesto)", volB, setVolB], ["Correlación (de -1 a +1)", correlation, setCorrelation]] as const;
  return <section aria-labelledby="portfolio-risk" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="portfolio-risk" className="mb-2 text-lg font-bold text-warning">Estimador de volatilidad de cartera</h2>
    <p className="mb-5 text-sm text-muted-foreground">Dos activos, volatilidades y correlación constantes. Datos hipotéticos; no es una previsión de riesgo ni recomendación de inversión.</p>
    <div className="space-y-4">{controls.map(([label, value, setter]) => <label key={label} className="grid gap-2 text-sm text-muted-foreground">{label}<span className="flex items-center gap-3"><input type="range" min={label.startsWith("Correlación") ? 0 : 0} max="100" value={value} onChange={(event) => setter(Number(event.target.value))} className="min-w-0 flex-1 accent-amber-400" /><output className="w-14 text-right text-foreground">{label.startsWith("Correlación") ? (value / 50 - 1).toFixed(2) : `${value}%`}</output></span></label>)}</div>
    <div aria-live="polite" className="mt-5 rounded-lg border border-border bg-background p-4"><p className="text-sm text-muted-foreground">Volatilidad estimada (anualizada)</p><p className="mt-1 text-2xl font-bold text-info">{volatility.toFixed(2)}%</p><p className="mt-2 text-xs text-muted-foreground">A: {weight}% · B: {100 - weight}% · ρ: {(rho * 2 - 1).toFixed(2)}</p></div>
  </section>;
}

function RegulatoryMap() {
  const [region, setRegion] = useState("UE");
  const details: Record<string, { framework: string; checklist: string }> = {
    UE: { framework: "MiCA y normativa financiera/AML aplicable", checklist: "Clasificación del activo, servicios prestados, autorización CASP, obligaciones de información y reglas nacionales." },
    "EE. UU.": { framework: "Normativa federal y estatal; SEC/CFTC según actividad y activo", checklist: "Naturaleza de la actividad, custodia, oferta, derivados, transmisión de dinero y requisitos estatales." },
    Japón: { framework: "FSA y legislación japonesa sobre pagos e instrumentos financieros", checklist: "Registro del proveedor, custodia, tipo de token, stablecoin y reglas de distribución." },
    "Otra jurisdicción": { framework: "Marco local vigente", checklist: "Verificar autoridades, licencias, sanciones, fiscalidad, protección al consumidor y reglas transfronterizas." },
  };
  const current = details[region];
  return <section aria-labelledby="regulatory-map" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
    <h2 id="regulatory-map" className="mb-2 text-lg font-bold text-warning">Mapa de verificación regulatoria</h2>
    <p className="mb-5 text-sm text-muted-foreground">Selecciona una región para ver áreas que suelen requerir revisión. Es orientación educativa, no asesoría legal; la normativa cambia.</p>
    <label className="grid max-w-sm gap-2 text-sm text-muted-foreground">Jurisdicción<select value={region} onChange={(event) => setRegion(event.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground">{Object.keys(details).map((item) => <option key={item}>{item}</option>)}</select></label>
    <div aria-live="polite" className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-lg border border-border bg-background p-4"><h3 className="text-sm font-semibold text-foreground">Marco a investigar</h3><p className="mt-2 text-sm text-muted-foreground">{current.framework}</p></div><div className="rounded-lg border border-border bg-background p-4"><h3 className="text-sm font-semibold text-foreground">Lista inicial</h3><p className="mt-2 text-sm text-muted-foreground">{current.checklist}</p></div></div>
    <p className="mt-4 text-xs text-warning">Confirma requisitos en las fuentes oficiales de la jurisdicción para la fecha y actividad concretas.</p>
  </section>;
}
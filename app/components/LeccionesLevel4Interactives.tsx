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

function LessonFrame({ topic, anterior, siguiente, children, question, answers, correct }: LessonProps & {
  children: ReactNode;
  question: string;
  answers: [string, string];
  correct: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const topics = curriculumData["nivel-4"]?.sections.flatMap((section) => section.topics) ?? [];
  const index = topics.findIndex((item) => item.id === topic.id);
  const lesson = index >= 0 ? index + 1 : 1;
  const progress = Math.round((lesson / (topics.length || 1)) * 100);
  const cover = miniaturaDe("4", lesson, topic.slug, topic.title);

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/nivel-4-experto" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />Volver al Nivel 4
            </Link>
            <span className="rounded-full border border-warning/30 bg-warning/15 px-2.5 py-0.5 text-xs font-semibold text-warning">Nivel 4 · Lección {lesson} de {topics.length}</span>
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
          <HotmartNativeBanner nivel="4" imagen={cover.src} className="my-8" />
          <section aria-labelledby="retention-quiz" className="my-8 rounded-xl border border-border bg-card p-6">
            <h2 id="retention-quiz" className="mb-3 text-lg font-bold text-foreground">Quiz de retención</h2>
            <p className="mb-4 text-sm text-muted-foreground">{question}</p>
            <div className="space-y-2">
              {answers.map((answer, answerIndex) => (
                <button key={answer} type="button" disabled={selected !== null} aria-pressed={selected === answerIndex} onClick={() => setSelected(answerIndex)} className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${selected === answerIndex ? answerIndex === correct ? "border-success/50 bg-success/10 text-success" : "border-destructive/50 bg-destructive/10 text-destructive" : "border-border bg-background hover:bg-accent disabled:opacity-70"}`}>
                  {String.fromCharCode(65 + answerIndex)}) {answer}{selected === answerIndex && answerIndex === correct ? " Correcto." : ""}
                </button>
              ))}
            </div>
            {selected !== null && <p role="status" className={`mt-4 rounded-lg border p-3 text-sm ${selected === correct ? "border-success/40 bg-success/10 text-success" : "border-warning/40 bg-warning/10 text-warning"}`}>{selected === correct ? "Correcto. Has identificado el concepto clave." : "No exactamente. Revisa la explicación y vuelve a intentarlo en otra visita."}</p>}
          </section>
          <FinLeccion clave={`nivel-4/${topic.slug}`} hrefAnterior={anterior ? `/nivel-4/${anterior.slug}` : null} tituloAnterior={anterior?.title ?? null} hrefSiguiente={siguiente ? `/nivel-4/${siguiente.slug}` : null} tituloSiguiente={siguiente?.title ?? null} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LeccionTokenUnlocks(props: LessonProps) {
  const [circulating, setCirculating] = useState(100_000_000);
  const [unlock, setUnlock] = useState(10_000_000);
  const dilution = circulating > 0 ? (unlock / circulating) * 100 : 0;
  return (
    <LessonFrame {...props} question="¿Qué indica mejor el impacto potencial de un unlock?" answers={["La nueva oferta relativa a la oferta circulante, junto con quién recibe los tokens y cuándo puede venderlos.", "Que el precio necesariamente caerá el día exacto del unlock."]} correct={0}>
      <section aria-labelledby="unlock-sim" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
        <h2 id="unlock-sim" className="mb-2 text-lg font-bold text-warning">Simulador de dilución por unlock</h2>
        <p className="mb-5 text-sm text-muted-foreground">Cambia los valores para estimar la oferta nueva frente a la circulante actual. La dilución no predice por sí sola el precio.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted-foreground">Oferta circulante actual
            <input type="number" min="1" step="1000000" value={circulating} onChange={(event) => setCirculating(Math.max(0, Number(event.target.value)))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground" />
          </label>
          <label className="grid gap-2 text-sm text-muted-foreground">Tokens desbloqueados
            <input type="number" min="0" step="1000000" value={unlock} onChange={(event) => setUnlock(Math.max(0, Number(event.target.value)))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground" />
          </label>
        </div>
        <dl aria-live="polite" className="mt-5 grid gap-3 rounded-lg border border-border bg-background p-4 sm:grid-cols-2">
          <div><dt className="text-sm text-muted-foreground">Aumento relativo de oferta</dt><dd className="mt-1 text-xl font-bold text-warning">{dilution.toFixed(2)}%</dd></div>
          <div><dt className="text-sm text-muted-foreground">Oferta tras el unlock</dt><dd className="mt-1 text-xl font-bold text-foreground">{(circulating + unlock).toLocaleString("es-ES")}</dd></div>
        </dl>
      </section>
    </LessonFrame>
  );
}

export function LeccionAnalisisOnChain(props: LessonProps) {
  const [metric, setMetric] = useState<"nvt" | "mvrv" | "sopr" | "flows">("nvt");
  const [marketCap, setMarketCap] = useState(50_000_000_000);
  const [dailyVolume, setDailyVolume] = useState(1_000_000_000);
  const metrics = {
    nvt: { label: "NVT", title: "Valor de red frente a actividad", body: "Compara la capitalización con el volumen diario de transacciones. Interprétalo respecto a su historia y a la calidad del volumen; no es una señal aislada." },
    mvrv: { label: "MVRV", title: "Valor de mercado frente a valor realizado", body: "Compara el valor de mercado con la base de coste agregada estimada. Lecturas extremas pueden contextualizar ciclos, no señalar un techo o suelo con certeza." },
    sopr: { label: "SOPR", title: "Ganancia o pérdida realizada", body: "Compara el valor de salida de monedas gastadas con su valor cuando se recibieron. Un valor por encima de 1 indica realización agregada de ganancias en esa ventana." },
    flows: { label: "Flujos", title: "Movimientos hacia y desde exchanges", body: "Los depósitos y retiros ayudan a estudiar posibles cambios de liquidez, pero una transferencia no revela por sí sola la intención de compra o venta." },
  };
  const selected = metrics[metric];
  const nvt = dailyVolume > 0 ? marketCap / dailyVolume : 0;
  return (
    <LessonFrame {...props} question="¿Cómo conviene interpretar una métrica on-chain aislada?" answers={["Como contexto junto a su historia, calidad de datos y otras señales; no como una predicción segura.", "Como una instrucción automática de compra o venta."]} correct={0}>
      <section aria-labelledby="onchain-title" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
        <h2 id="onchain-title" className="mb-2 text-lg font-bold text-warning">Explorador de métricas on-chain</h2>
        <div role="tablist" aria-label="Métrica on-chain" className="mb-5 flex flex-wrap gap-2">
          {Object.entries(metrics).map(([key, item]) => <button key={key} type="button" role="tab" aria-selected={metric === key} onClick={() => setMetric(key as typeof metric)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${metric === key ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{item.label}</button>)}
        </div>
        <div role="tabpanel" aria-live="polite" className="rounded-lg border border-border bg-background p-4">
          <h3 className="font-semibold text-foreground">{selected.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{selected.body}</p>
          {metric === "nvt" && <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted-foreground">Capitalización de mercado (USD)<input type="number" min="0" step="1000000000" value={marketCap} onChange={(event) => setMarketCap(Math.max(0, Number(event.target.value)))} className="rounded-lg border border-input bg-card px-3 py-2 text-foreground" /></label>
            <label className="grid gap-2 text-sm text-muted-foreground">Volumen diario on-chain (USD)<input type="number" min="0" step="1000000" value={dailyVolume} onChange={(event) => setDailyVolume(Math.max(0, Number(event.target.value)))} className="rounded-lg border border-input bg-card px-3 py-2 text-foreground" /></label>
            <p className="sm:col-span-2 text-sm text-muted-foreground">NVT simplificado: <strong className="text-info">{dailyVolume > 0 ? nvt.toFixed(1) : "No disponible"}</strong></p>
          </div>}
        </div>
      </section>
    </LessonFrame>
  );
}

export function LeccionOptimizacionCartera(props: LessonProps) {
  const [riskyAllocation, setRiskyAllocation] = useState(70);
  const [marketDrop, setMarketDrop] = useState(30);
  const [hedgeCoverage, setHedgeCoverage] = useState(30);
  const estimatedLoss = riskyAllocation * marketDrop * (1 - hedgeCoverage / 100) / 100;
  const controls = [
    { label: "Asignación a activos de riesgo", value: riskyAllocation, set: setRiskyAllocation },
    { label: "Caída hipotética del mercado", value: marketDrop, set: setMarketDrop },
    { label: "Cobertura de esa exposición", value: hedgeCoverage, set: setHedgeCoverage },
  ];
  return (
    <LessonFrame {...props} question="¿Qué logra una cobertura de cartera?" answers={["Reduce parte de la exposición a un escenario adverso, con costes y riesgo residual.", "Garantiza que la cartera no tendrá pérdidas."]} correct={0}>
      <section aria-labelledby="portfolio-sim" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
        <h2 id="portfolio-sim" className="mb-2 text-lg font-bold text-warning">Simulador de exposición y cobertura</h2>
        <p className="mb-5 text-sm text-muted-foreground">Modelo lineal ilustrativo sobre una cartera de 100 unidades. No contempla primas, basis, liquidez, correlaciones ni cambios de volatilidad.</p>
        <div className="space-y-5">
          {controls.map((control) => <label key={control.label} className="grid gap-2 text-sm text-muted-foreground">{control.label}<span className="flex items-center gap-4"><input type="range" min="0" max="100" value={control.value} onChange={(event) => control.set(Number(event.target.value))} className="min-w-0 flex-1 accent-amber-400" /><output className="w-12 text-right font-semibold text-foreground">{control.value}%</output></span></label>)}
        </div>
        <div aria-live="polite" className="mt-6 rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Pérdida estimada después de la cobertura</p>
          <p className="mt-1 text-2xl font-bold text-warning">{estimatedLoss.toFixed(2)}% <span className="text-sm font-normal text-muted-foreground">de la cartera</span></p>
        </div>
      </section>
    </LessonFrame>
  );
}

export function LeccionLiquidStaking(props: LessonProps) {
  const [provider, setProvider] = useState<"lido" | "rocket" | "coinbase">("lido");
  const [ethAmount, setEthAmount] = useState(1);
  const [discount, setDiscount] = useState(1);
  const providers = {
    lido: { label: "Lido · stETH", risk: "Concentración de validadores y desviación de precio." },
    rocket: { label: "Rocket Pool · rETH", risk: "Riesgo de contrato, operadores y liquidez secundaria." },
    coinbase: { label: "Coinbase · cbETH", risk: "Riesgo de custodia, proveedor y desviación de precio." },
  };
  const selected = providers[provider];
  const estimatedValue = ethAmount * (1 - discount / 100);
  return (
    <LessonFrame {...props} question="¿Qué riesgo puede afectar a un token de liquid staking además del precio de ETH?" answers={["Que cotice con descuento frente al ETH subyacente por liquidez, salida o riesgo del protocolo.", "Que siempre pueda canjearse al instante por exactamente un ETH."]} correct={0}>
      <section aria-labelledby="staking-sim" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
        <h2 id="staking-sim" className="mb-2 text-lg font-bold text-warning">Comparador de liquid staking</h2>
        <p className="mb-5 text-sm text-muted-foreground">Selecciona un proveedor y explora un descuento hipotético frente a ETH; no son cotizaciones en vivo.</p>
        <div className="mb-5 grid gap-2 sm:grid-cols-3" role="group" aria-label="Proveedor de liquid staking">
          {Object.entries(providers).map(([key, item]) => <button key={key} type="button" aria-pressed={provider === key} onClick={() => setProvider(key as typeof provider)} className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${provider === key ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>{item.label}</button>)}
        </div>
        <p aria-live="polite" className="mb-5 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground"><strong className="text-foreground">Riesgo a revisar: </strong>{selected.risk}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted-foreground">ETH depositado<input type="number" min="0" step="0.1" value={ethAmount} onChange={(event) => setEthAmount(Math.max(0, Number(event.target.value)))} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground" /></label>
          <label className="grid gap-2 text-sm text-muted-foreground">Descuento hipotético frente a ETH (%)<input type="number" min="0" max="100" step="0.1" value={discount} onChange={(event) => setDiscount(Math.min(100, Math.max(0, Number(event.target.value))))} className="rounded-lg border border-input bg-background px-3 py-2 text-foreground" /></label>
        </div>
        <div aria-live="polite" className="mt-5 rounded-lg border border-border bg-background p-4"><p className="text-sm text-muted-foreground">Valor indicativo al descuento seleccionado</p><p className="mt-1 text-2xl font-bold text-info">{estimatedValue.toFixed(3)} ETH</p></div>
      </section>
    </LessonFrame>
  );
}
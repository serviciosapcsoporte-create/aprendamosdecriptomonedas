import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { curriculumData } from "@/data/curriculum";
import type { Topic } from "@/data/curriculum";

type StrategyType = "conservative" | "aggressive" | "deltaNeutral";

interface LeccionComposabilidadDefiProps {
  topic: Topic;
  anterior: Topic | null;
  siguiente: Topic | null;
}

const IMAGEN = "/assets/lecciones/nivel-4/composabilidad-defi.webp";

export function LeccionComposabilidadDefi({
  topic,
  anterior,
  siguiente,
}: LeccionComposabilidadDefiProps) {
  const [strategyType, setStrategyType] = useState<StrategyType>("conservative");
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const topics = curriculumData["nivel-4"]?.sections.flatMap((section) => section.topics) ?? [];
  const topicIndex = topics.findIndex((item) => item.id === topic.id);
  const lessonNumber = topicIndex >= 0 ? topicIndex + 1 : 1;
  const progress = Math.round((lessonNumber / (topics.length || 1)) * 100);
  const effectiveApy =
    strategyType === "conservative"
      ? (5.4 * 1.2).toFixed(2)
      : strategyType === "aggressive"
        ? (5.4 * 3 * 1.8).toFixed(2)
        : (5.4 * 2.5).toFixed(2);
  const risk =
    strategyType === "conservative"
      ? "Bajo · colateral sólido"
      : strategyType === "aggressive"
        ? "Alto · liquidación y bad debt"
        : "Medio · riesgo de smart contract";
  const clave = `nivel-4/${topic.slug}`;

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
            <span className="rounded-full border border-warning/30 bg-warning/15 px-2.5 py-0.5 text-xs font-semibold text-warning">
              Nivel 4 · Lección {lessonNumber} de {topics.length}
            </span>
          </nav>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>{progress}% del nivel</span>
              <span>{lessonNumber}/{topics.length} lecciones</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-label="Progreso del nivel"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <h1 className="mb-2 font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">{topic.title}</h1>
          <p className="mb-6 text-sm text-muted-foreground">{topic.description}</p>

          <div className="mb-8 overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900">
            <img src={IMAGEN} alt="Composabilidad DeFi: Yield Aggregation y Risk Parity" className="aspect-video w-full object-cover" width={1280} height={720} fetchPriority="high" />
          </div>

          <section aria-label="Conceptos clave" className="my-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-base font-bold text-warning">Yield aggregators</h2>
              <p className="text-sm text-muted-foreground">Protocolos que rebalancean posiciones y reinvierten recompensas. Yearn y Beefy son ejemplos; cada bóveda tiene estrategias y riesgos propios.</p>
            </article>
            <article className="rounded-xl border border-warning/40 bg-card p-5">
              <h2 className="mb-2 text-base font-bold text-success">Risk parity</h2>
              <p className="text-sm text-muted-foreground">Distribuir la contribución al riesgo entre posiciones, no solo repartir el capital en porcentajes iguales.</p>
            </article>
            <article className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-2 text-base font-bold text-info">Money legos</h2>
              <p className="text-sm text-muted-foreground">Combinar protocolos puede reutilizar colateral y estrategias, pero también encadena dependencias y amplifica fallos.</p>
            </article>
          </section>

          <section aria-labelledby="vault-title" className="my-8 rounded-xl border border-amber-500/30 bg-card p-6">
            <h2 id="vault-title" className="mb-2 text-lg font-bold text-warning">Simulador de estrategias de yield</h2>
            <p className="mb-4 text-sm text-muted-foreground">Compara perfiles hipotéticos. Las cifras son una simulación didáctica, no una proyección ni una oferta de rendimiento.</p>
            <div className="mb-6 grid gap-2 md:grid-cols-3" role="group" aria-label="Perfil de estrategia">
              <button type="button" aria-pressed={strategyType === "conservative"} onClick={() => setStrategyType("conservative")} className={`rounded-lg px-3 py-2.5 text-xs font-bold transition-colors ${strategyType === "conservative" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                Conservadora · LP stablecoin
              </button>
              <button type="button" aria-pressed={strategyType === "aggressive"} onClick={() => setStrategyType("aggressive")} className={`rounded-lg px-3 py-2.5 text-xs font-bold transition-colors ${strategyType === "aggressive" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                Agresiva · apalancamiento recursivo
              </button>
              <button type="button" aria-pressed={strategyType === "deltaNeutral"} onClick={() => setStrategyType("deltaNeutral")} className={`rounded-lg px-3 py-2.5 text-xs font-bold transition-colors ${strategyType === "deltaNeutral" ? "border border-amber-400 bg-amber-500/20 text-amber-300" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                Delta-neutral · points farming
              </button>
            </div>
            <dl aria-live="polite" className="space-y-3 rounded-lg border border-border bg-background p-4 text-sm">
              <div className="flex flex-wrap justify-between gap-2 border-b border-border pb-2">
                <dt className="text-muted-foreground">Perfil seleccionado</dt>
                <dd className="font-bold text-foreground">{strategyType === "deltaNeutral" ? "Delta-neutral" : strategyType === "aggressive" ? "Agresiva" : "Conservadora"}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted-foreground">APY estimado del ejemplo</dt>
                <dd className="font-bold text-success">{effectiveApy}%</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted-foreground">Riesgo principal</dt>
                <dd className={strategyType === "conservative" ? "font-semibold text-success" : "font-semibold text-warning"}>{risk}</dd>
              </div>
            </dl>
          </section>

          <HotmartNativeBanner nivel="4" imagen={IMAGEN} className="my-8" />

          <section aria-labelledby="quiz-title" className="my-8 rounded-xl border border-border bg-card p-6">
            <h2 id="quiz-title" className="mb-3 text-lg font-bold text-foreground">Quiz de retención</h2>
            <p className="mb-4 text-sm text-muted-foreground">¿Cuál es el principal riesgo sistémico de encadenar varios protocolos DeFi en una misma estrategia?</p>
            <div className="space-y-2">
              <button type="button" disabled={selectedQuiz !== null} aria-pressed={selectedQuiz === 1} onClick={() => setSelectedQuiz(1)} className={`w-full rounded-lg p-3 text-left text-sm transition-colors ${selectedQuiz === 1 ? "border border-success/50 bg-success/10 text-success" : "border border-border bg-background hover:bg-accent disabled:opacity-70"}`}>
                A) Un fallo en un protocolo puede propagarse y comprometer las posiciones dependientes. {selectedQuiz === 1 && "Correcto."}
              </button>
              <button type="button" disabled={selectedQuiz !== null} aria-pressed={selectedQuiz === 2} onClick={() => setSelectedQuiz(2)} className={`w-full rounded-lg p-3 text-left text-sm transition-colors ${selectedQuiz === 2 ? "border border-destructive/50 bg-destructive/10 text-destructive" : "border border-border bg-background hover:bg-accent disabled:opacity-70"}`}>
                B) La red aumenta permanentemente sus comisiones por usar varios protocolos.
              </button>
            </div>
            {selectedQuiz === 2 && <p role="status" className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">No exactamente. El riesgo clave es la propagación de fallos entre protocolos dependientes.</p>}
          </section>

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
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import { AMMSimulator } from "@/components/AMMSimulator";
import type { Topic } from "@/data/curriculum";

export function LeccionAMM({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [quiz, setQuiz] = useState<string | null>(null);
  const clave = "nivel-3/automated-market-maker";
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

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Nivel 3 — Leccion 1 de 18 · 5% completado
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[5%] rounded-full bg-amber-400" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">⏱️ 6 min de lectura | Nivel Avanzado | DeFi & Matemáticas</p>
          </div>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
            <header className="mb-6">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary" aria-hidden="true">
                <TopicIcon icon={topic.icon} className="h-6 w-6" />
              </span>
              <h1 className="font-serif text-3xl font-medium leading-tight tracking-[0.01em] text-foreground md:text-4xl">
                {topic.title}
              </h1>
              <p className="mt-3 text-base text-muted-foreground">{topic.description}</p>
            </header>

            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              <img src="/assets/lecciones/nivel-3/leccion-01.webp" alt="Portada AMM" className="aspect-video w-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-cyan-300">x (Reserva Token A)</h2>
                <p className="text-sm text-slate-300">Cantidad de ETH en el pool de liquidez.</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-300">y (Reserva Token B)</h2>
                <p className="text-sm text-slate-300">Cantidad de USDT en el pool de liquidez.</p>
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-300">k (Invariante)</h2>
                <p className="text-sm text-slate-300">El producto total que debe mantenerse constante tras cada intercambio.</p>
              </div>
            </div>

            <AMMSimulator />

            <div className="my-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3">
                  <div className="aspect-video">
                    <img src="/assets/lecciones/nivel-3/leccion-01.webp" alt="Curso DeFi" className="h-full w-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.src = "/assets/lecciones/default-cover.webp"; }} />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <span className="text-xs font-bold uppercase text-amber-400">RECOMENDADO · HOTMART</span>
                  <h3 className="mb-2 text-xl font-bold text-white">Masterclass DeFi: Estrategias de Liquidez y Yield Farming</h3>
                  <p className="mb-4 text-sm text-gray-300">Aprende a proveer liquidez en Uniswap V3, gestionar Impermanent Loss y maximizar tus rendimientos en video.</p>
                  <a href="https://go.hotmart.com/V107924570Q?dp=1" target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                    Ver Programa DeFi en Hotmart →
                  </a>
                </div>
              </div>
            </div>

            <section className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
              <h3 className="mb-3 font-serif text-xl">Quiz de retencion</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Si compras una gran cantidad de Token X en un AMM de formula x*y=k, ¿que ocurre con el precio del Token X para la siguiente transaccion?
              </p>
              <div className="space-y-3">
                {[
                  { k: "A", t: "El precio disminuye porque hay mas liquidez." },
                  { k: "B", t: "El precio aumenta automaticamente debido a la reduccion de oferta del Token X en el pool." },
                  { k: "C", t: "El precio se mantiene fijo porque k es constante." },
                ].map((o) => (
                  <button key={o.k} onClick={() => setQuiz(o.k)} className={quiz === o.k ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-amber-500/60 bg-amber-500/10" : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"}>
                    <span className="font-bold">{o.k})</span> {o.t}
                  </button>
                ))}
              </div>
              {quiz && (
                <div className={quiz === "B" ? "mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-800 dark:text-green-200" : "mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200"}>
                  {quiz === "B" ? "Correcto. El precio sube al reducirse la oferta del token en el pool." : "Incorrecto. La respuesta correcta es B."}
                </div>
              )}
            </section>
          </article>

          <FinLeccion
            clave={clave}
            hrefAnterior={null}
            tituloAnterior={null}
            hrefSiguiente={siguiente ? `/nivel-3/${siguiente.slug}` : null}
            tituloSiguiente={siguiente?.title ?? null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
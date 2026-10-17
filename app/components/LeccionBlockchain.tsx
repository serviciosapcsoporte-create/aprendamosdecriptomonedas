import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { BlockSimulator } from "@/components/BlockSimulator";
import { InmutableQuiz } from "@/components/InmutableQuiz";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/L107924590C";

export function LeccionBlockchain({
  topic,
  anterior,
  siguiente,
}: {
  topic: Topic;
  anterior: Topic | null;
  siguiente: Topic | null;
}) {
  const clave = "nivel-1/que-es-blockchain";
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/nivel-1-principiante"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al Nivel 1
            </Link>
          </nav>

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Nivel 1 — Leccion 1 de 15 · 7% completado
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[7%] rounded-full bg-amber-400" />
            </div>
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

            {topic.video && (
              <figure className="not-prose mb-8">
                <div className="overflow-hidden rounded-xl border border-border bg-black">
                  <video
                    className="aspect-video w-full"
                    src={topic.video}
                    poster="/assets/lecciones/leccion-01-que-es-blockchain.webp"
                    controls
                    preload="none"
                    playsInline
                    aria-label={`Video: ${topic.videoAlt ?? topic.title}`}
                  />
                </div>
              </figure>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-red-500/30 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-red-300">Sistema tradicional (Banco)</h2>
                <p className="text-sm text-slate-300">
                  Un servidor centralizado controla el libro contable. Si el banco falla o congela tu cuenta, pierdes el control.
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-300">Sistema Blockchain (Descentralizado)</h2>
                <p className="text-sm text-slate-300">
                  Red distribuida entre miles de nodos. Ninguna entidad controla los datos y la informacion es inmutable.
                </p>
              </div>
            </div>

            <BlockSimulator />

            <div className="my-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3">
                  <div className="aspect-video">
                    <img
                      src="/assets/lecciones/leccion-01-que-es-blockchain.webp"
                      alt="Curso Hotmart"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <span className="text-xs font-bold uppercase text-amber-400">RECOMENDADO · HOTMART</span>
                  <h3 className="mb-2 text-xl font-bold text-white">Aprende a invertir en criptomonedas en menos de 3 dias</h3>
                  <p className="mb-4 text-sm text-gray-300">
                    Aprende el proceso paso a paso con acompanamiento en video y certificado oficial.
                  </p>
                  <a
                    href={HOTLINK}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="inline-block rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300"
                  >
                    Ver Curso en Hotmart →
                  </a>
                </div>
              </div>
            </div>

            <InmutableQuiz />

            <section className="mt-10 border-t border-slate-800 pt-8">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
                Sigue con estos temas
              </h2>
            </section>
          </article>

          <FinLeccion
            clave={clave}
            hrefAnterior={null}
            tituloAnterior={null}
            hrefSiguiente={siguiente ? `/nivel-1/${siguiente.slug}` : null}
            tituloSiguiente={siguiente?.title ?? null}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

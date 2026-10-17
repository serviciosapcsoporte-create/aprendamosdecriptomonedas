import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { TopicIcon } from "@/components/TopicIcon";
import type { Topic } from "@/data/curriculum";

const HOTLINK = "https://go.hotmart.com/C107924474S";

export function LeccionBloque({ topic, anterior, siguiente }: { topic: Topic; anterior: Topic | null; siguiente: Topic | null }) {
  const [roto, setRoto] = useState(false);
  const [quiz, setQuiz] = useState<string | null>(null);
  const clave = "nivel-1/como-funciona-un-bloque";

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
          <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/nivel-1-principiante" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al Nivel 1
            </Link>
          </nav>

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Nivel 1 — Leccion 2 de 15 · 13% completado
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[13%] rounded-full bg-amber-400" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">⏱️ 3 min de lectura</p>
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

            <div className="mb-6 overflow-hidden rounded-xl border border-border bg-slate-950/40">
              <img src="/assets/lecciones/leccion-02.webp" alt="Portada" className="aspect-video w-full object-cover" loading="lazy" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-cyan-300">1. Datos (Transactions)</h2>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>Alice → Bob: 0.5 BTC</li>
                  <li>Bob → Carol: 0.2 BTC</li>
                  <li>Carol → Dave: 0.1 BTC</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-300">2. Hash Actual</h2>
                <p className="break-all font-mono text-xs text-amber-200">0000abc89f3e7d1c4b2a9f0e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9</p>
              </div>
              <div className="rounded-xl border border-amber-500/40 bg-slate-950/40 p-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-300">3. Hash Anterior</h2>
                <p className="break-all font-mono text-xs text-amber-200">00009f8e7d6c5b4a3928172635445566778899aabbccddeeff00112233445566</p>
                <p className="mt-2 text-xs text-slate-400">Conecta este bloque con el bloque previo y forma la cadena.</p>
              </div>
            </div>

            <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <h2 className="mb-4 font-serif text-xl text-foreground">Inspector de cadena de bloques</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { n: "Bloque 100", hash: roto ? "0000ff00aa11bb22cc33dd44ee55ff66778899aabbccddeeff00112233445566" : "0000abc89f3e7d1c4b2a9f0e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9" },
                  { n: "Bloque 101", hash: "0000123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef" },
                  { n: "Bloque 102", hash: "0000fedcba9876543210fedcba9876543210fedcba9876543210fedcba98765432" },
                ].map((b, idx) => (
                  <div key={b.n} className={`rounded-xl border p-4 ${roto && idx === 0 ? "border-red-500/60 bg-red-500/10" : "border-slate-800 bg-slate-900/60"}`}>
                    <p className="mb-2 text-sm font-bold text-foreground">{b.n}</p>
                    <p className={`break-all font-mono text-[10px] ${roto && idx === 0 ? "text-red-300" : "text-amber-200"}`}>{b.hash}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setRoto(true)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-400"
                >
                  Modificar transaccion en Bloque 100
                </button>
                <button
                  onClick={() => setRoto(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                >
                  Restaurar cadena
                </button>
              </div>
              {roto && (
                <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  ¡Cadena invalida / Fraude detectado! El hash del Bloque 100 cambio y rompio la conexion con los bloques 101 y 102.
                </p>
              )}
            </section>

            <div className="my-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-gray-800 md:w-1/3">
                  <div className="aspect-video">
                    <img src="/assets/lecciones/leccion-02.webp" alt="Estructura de Bloques" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <span className="text-xs font-bold uppercase text-amber-400">RECOMENDADO · HOTMART</span>
                  <h3 className="mb-2 text-xl font-bold text-white">Aprende a analizar bloques y transacciones en tiempo real</h3>
                  <p className="mb-4 text-sm text-gray-300">Aprende a leer exploradores de bloques y verificar transacciones directamente en la cadena.</p>
                  <a href={HOTLINK} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-black transition hover:bg-amber-300">
                    Ver Curso en Hotmart →
                  </a>
                </div>
              </div>
            </div>

            <section className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
              <h3 className="mb-3 font-serif text-xl">Quiz de retencion</h3>
              <p className="mb-4 text-sm text-muted-foreground">Si se cambia un solo dato dentro de un bloque confirmado, que sucede con el Hash?</p>
              <div className="space-y-3">
                {[
                  { k: "A", t: "Permanece exactamente igual." },
                  { k: "B", t: "Cambia por completo, rompiendo la conexion con los bloques siguientes." },
                  { k: "C", t: "El sistema lo corrige automaticamente sin notificar a la red." },
                ].map((o) => (
                  <button
                    key={o.k}
                    disabled={quiz !== null}
                    onClick={() => setQuiz(o.k)}
                    className={quiz === o.k ? "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-amber-500/60 bg-amber-500/10" : "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition border-border bg-card hover:border-accent/50"}
                  >
                    <span className="font-bold">{o.k})</span>
                    <span>{o.t}</span>
                  </button>
                ))}
              </div>
              {quiz && (
                <div className={quiz === "B" ? "mt-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-800 dark:text-green-200" : "mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200"}>
                  {quiz === "B" ? "Correcto. El hash cambia y rompe la cadena." : "Incorrecto. Cualquier cambio altera el hash y rompe el enlace."}
                </div>
              )}
            </section>

            <section className="mt-10 border-t border-slate-800 pt-8">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">Sigue con estos temas</h2>
            </section>
          </article>

        </div>
      </main>
      <Footer />
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <FinLeccion
          clave={clave}
          hrefAnterior={anterior ? `/nivel-1/${anterior.slug}` : null}
          tituloAnterior={anterior?.title ?? null}
          hrefSiguiente={siguiente ? `/nivel-1/${siguiente.slug}` : null}
          tituloSiguiente={siguiente?.title ?? null}
        />
      </div>
    </>
  );
}

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
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { FinLeccion } from "@/components/FinLeccion";
import { Markdown } from "@/components/Markdown";
import { TopicIcon } from "@/components/TopicIcon";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
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
            <div className="lesson-prose">
              <Markdown content={topic.content} />
            </div>

            <HotmartNativeBanner nivel={nivel} className="my-8" />

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
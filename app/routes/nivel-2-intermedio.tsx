// @ts-nocheck
/**
 * Landing del Nivel 2: cabecera con estado, modulos en tarjetas interactivas y
 * banner destacado del curso complementario.
 *
 * Reutiliza lo que ya se construyo para el Nivel 1 (NivelHero, LessonCard,
 * HotmartNativeBanner, app/lib/progreso.ts) para que los dos niveles se lean
 * como la misma pagina y no como dos sitios distintos.
 *
 * Lo unico que este nivel aporta de nuevo:
 *   - el desglose en modulos con numeracion ("Modulo 1 de 4"), porque son 19
 *     lecciones y sin esa senal la pagina se lee como una lista interminable;
 *   - el icono vectorial de cada tema, resuelto desde `topic.icon`.
 */
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { LessonCard } from "@/components/LessonCard";
import { NivelHero } from "@/components/NivelHero";
import { iconoDe } from "@/components/icons";
import { curriculumData } from "@/data/curriculum";
import { miniaturaDe } from "@/data/thumbnails";
import { minutosLectura, resumenDe, useProgreso } from "@/lib/progreso";
import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/nivel-2-intermedio")({
  component: Nivel2Page,
  head: () => ({
    title: "NIVEL 2 — Intermedio | Blockchain Técnica, Smart Contracts | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Nivel 2 Intermedio gratis: Blockchain técnica, smart contracts, economía cripto y DeFi básico. Sin registro, acceso inmediato.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 2 · Intermedio", description: "Ruta guiada de Nivel 2 · Intermedio con lecciones gratuitas y material descargable.", path: "/nivel-2-intermedio", level: "Nivel 2 · Intermedio" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 2 · Intermedio", path: "/nivel-2-intermedio" }]),
    )],
  }),
});

function Nivel2Page() {
  const nivel = curriculumData["nivel-2"];
  const { progreso } = useProgreso();

  const claves = nivel.sections.flatMap((s) => s.topics.map((t) => `nivel-2/${t.slug}`));
  const resumen = resumenDe(claves, progreso);

  // Numeracion global de leccion y de modulo: el contador de leccion viene del
  // curriculumData, no de un numero escrito a mano.
  let leccion = 0;
  const modulos = nivel.sections.map((seccion, i) => ({
    titulo: seccion.title,
    indice: i,
    total: nivel.sections.length,
    temas: seccion.topics.map((t) => {
      leccion += 1;
      return { topic: t, numero: leccion };
    }),
  }));

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <NivelHero
            nivel="2"
            titulo="Nivel 2 — Intermedio"
            badge="Nivel 2"
            objetivo={nivel.description}
            etiqueta="100% GRATIS · Sin registro"
            resumenTexto={`${resumen.total} lecciones divididas en ${nivel.sections.length} módulos técnicos`}
            resumen={resumen}
            hrefSiguiente={
              resumen.siguiente ? `/nivel-2/${resumen.siguiente.split("/")[1]}` : null
            }
          />

          <div>
            {modulos.map((modulo) => (
              <section key={modulo.titulo} className="mb-12">
                <header className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Módulo {modulo.indice + 1} de {modulo.total}
                  </span>
                  <h2 className="font-serif text-2xl font-medium">{modulo.titulo}</h2>
                  <span className="text-sm text-muted-foreground">
                    {modulo.temas.length}{" "}
                    {modulo.temas.length === 1 ? "lección" : "lecciones"}
                  </span>
                </header>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {modulo.temas.map(({ topic, numero }) => (
                    <LessonCard
                      key={topic.slug}
                      href={`/nivel-2/${topic.slug}`}
                      numero={numero}
                      titulo={topic.title}
                      descripcion={topic.description}
                      minutos={minutosLectura(topic.content)}
                      miniatura={miniaturaDe("2", numero, topic.slug, topic.title)}
                      estado={progreso[`nivel-2/${topic.slug}`]?.estado ?? null}
                      tieneVideo={Boolean(topic.video)}
                      icono={iconoDe(topic.icon)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Curso complementario: banner destacado con borde de acento y CTA
              con hover activo. Sale de hotmart-links.ts, que ya verifico cada
              enlace; si el nivel no tuviera curso valido no renderiza nada. */}
          <AnimatedSection animation="fade-in-up" className="relative z-10 mt-4">
            <HotmartNativeBanner nivel="2" indice={0} />
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
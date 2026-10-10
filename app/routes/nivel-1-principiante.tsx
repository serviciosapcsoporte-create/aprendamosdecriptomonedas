// @ts-nocheck
/**
 * Landing del Nivel 1: hero con progreso + grilla de tarjetas por bloque +
 * banners intercalados.
 *
 * Que cambia respecto a la version de solo texto:
 *   - Cada leccion es una LessonCard con portada, minutos de lectura y estado
 *     ([✓ Completado] / [▶ Continuar]). El estado sale de app/lib/progreso.ts.
 *   - Un banner de recomendacion de Hotmart y otro de descarga del recurso
 *     propio se intercalan cada 3-4 lecciones: quien recorre una grilla de 15
 *     tarjetas seguidas sin un corte abandona a la mitad.
 *   - El hero ofrece "Continuar desde donde te quedaste".
 *
 * El flujo se arma como lista plana y no seccion por seccion porque el banner
 * va DESPUES de la leccion 4, dentro del primer bloque: agrupar por secciones
 * obligaria a mover el corte al final del bloque y quedaria a 7 de distancia.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AffiliateCta } from "@/components/AffiliateCta";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { LessonCard } from "@/components/LessonCard";
import { NivelHero } from "@/components/NivelHero";
import { RecursoLeadBanner } from "@/components/RecursoLeadBanner";
import { curriculumData } from "@/data/curriculum";
import { miniaturaDe } from "@/data/thumbnails";
import { borrarTodo, minutosLectura, resumenDe, useProgreso } from "@/lib/progreso";
import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/nivel-1-principiante")({
  component: Nivel1Page,
  head: () => ({
    title: "NIVEL 1 — Principiante | Curso Blockchain & Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Nivel 1: Conceptos Fundamentales, Seguridad Inicial y Primeros Pasos Prácticos. Entra al ecosistema cripto sin riesgos.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 1 · Principiante", description: "Ruta guiada de Nivel 1 · Principiante con lecciones gratuitas y material descargable.", path: "/nivel-1-principiante", level: "Nivel 1 · Principiante" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 1 · Principiante", path: "/nivel-1-principiante" }]),
    )],
  }),
});

/** Se inserta un banner al terminar la leccion con este numero. */
const CORTES = [
  { alTerminar: 4, tipo: "hotmart", indiceCurso: 0 },
  { alTerminar: 11, tipo: "recurso" },
];

function Nivel1Page() {
  const nivel = curriculumData["nivel-1"];
  const { progreso } = useProgreso();

  // Flujo plano: titulo de bloque, lecciones y banners, en orden de lectura.
  const claves = nivel.sections.flatMap((s) => s.topics.map((t) => `nivel-1/${t.slug}`));
  const resumen = resumenDe(claves, progreso);

  const items = [];
  let numero = 0;
  nivel.sections.forEach((s, i) => {
    items.push({ tipo: "bloque", titulo: s.title, key: `bloque-${i}` });
    for (const topic of s.topics) {
      numero += 1;
      items.push({ tipo: "leccion", topic, numero, key: `lec-${topic.slug}` });
      const corte = CORTES.find((c) => c.alTerminar === numero);
      if (corte) items.push({ tipo: "banner", corte, key: `banner-${numero}` });
    }
  });

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <NivelHero
            nivel="1"
            titulo="Nivel 1 — Principiante"
            badge="Nivel 1"
            objetivo="Que cualquier persona entienda lo esencial y pueda entrar al ecosistema cripto sin riesgos. Todo este nivel es gratis y no pide registro."
            resumen={resumen}
            hrefSiguiente={
              resumen.siguiente ? `/nivel-1/${resumen.siguiente.split("/")[1]}` : null
            }
            permitirReiniciar
            onReiniciar={borrarTodo}
          />

          {/* Una sola rejilla: las cabeceras de bloque y los banners ocupan
              todas las columnas (col-span-full), asi que rompen la fila sin
              tener que cerrar y abrir el grid a mano en cada corte. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              if (item.tipo === "bloque") {
                const delBloque = nivel.sections.find((s) => s.title === item.titulo);
                return (
                  <header key={item.key} className="col-span-full mt-8 first:mt-0">
                    <h2 className="font-serif text-2xl font-medium">{item.titulo}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {delBloque.topics.length} lecciones en este bloque
                    </p>
                  </header>
                );
              }

              if (item.tipo === "leccion") {
                return (
                  <LessonCard
                    key={item.key}
                    href={`/nivel-1/${item.topic.slug}`}
                    numero={item.numero}
                    titulo={item.topic.title}
                    descripcion={item.topic.description}
                    minutos={minutosLectura(item.topic.content)}
                    miniatura={miniaturaDe("1", item.topic.slug)}
                    estado={progreso[`nivel-1/${item.topic.slug}`]?.estado ?? null}
                    tieneVideo={Boolean(item.topic.video)}
                  />
                );
              }

              return item.corte.tipo === "hotmart" ? (
                <HotmartNativeBanner
                  key={item.key}
                  nivel="1"
                  indice={item.corte.indiceCurso ?? 0}
                  className="col-span-full my-4"
                />
              ) : (
                <RecursoLeadBanner
                  key={item.key}
                  titulo="Checklist de supervivencia cripto"
                  descripcion="La lista que se revisa antes de firmar, antes de conectar una wallet y antes de mover fondos. Lectura de 5 minutos, sin registro."
                  formato="Guia"
                  href="/recursos/checklist-supervivencia-cripto"
                  className="col-span-full my-4"
                />
              );
            })}
          </div>

          <AnimatedSection animation="fade-in-up" className="relative z-10 mt-16">
            <div className="rounded-2xl border border-border bg-card p-6 text-center dark:bg-card-dark">
              <h3 className="mb-2 text-lg font-bold">Guías gratuitas</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Refuerza tu aprendizaje con nuestras guías de seguridad y control.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/recursos/el-escudo-de-5-minutos"
                  className="inline-flex items-center justify-center rounded-md bg-warning px-4 py-2 text-sm font-medium text-navy hover:bg-warning/70"
                >
                  El Escudo de 5 minutos (GRATIS)
                </Link>
                <Link
                  to="/recursos/checklist-supervivencia-cripto"
                  className="inline-flex items-center justify-center rounded-md bg-warning px-4 py-2 text-sm font-medium text-navy hover:bg-warning/70"
                >
                  Checklist de Supervivencia Cripto (GRATIS)
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AffiliateCta nivel="1" />
        </div>
      </main>
      <Footer />
    </>
  );
}
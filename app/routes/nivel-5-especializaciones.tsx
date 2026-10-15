// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { minutosLectura, resumenDe, useProgreso } from "@/lib/progreso";
import { miniaturaDe } from "@/data/thumbnails";
import { NivelHero } from "@/components/NivelHero";
import { LessonCard } from "@/components/LessonCard";

import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";
export const Route = createFileRoute("/nivel-5-especializaciones")({
  component: Nivel5Page,
  head: () => ({
    title: "NIVEL 5 — Especializaciones | ZK-Tech, Arbitraje, StarkNet y Regulación | Curso Gratis",
    meta: [
      {
        name: "description",
        content:
          "Nivel 5 Especializado: programación ZK, StarkNet/Cairo, regulación y proyectos complejos. 11 temas para dominar el ecosistema.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 5 · Especializaciones", description: "Ruta guiada de Nivel 5 · Especializaciones con lecciones gratuitas y material descargable.", path: "/nivel-5-especializaciones", level: "Nivel 5 · Especializaciones" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 5 · Especializaciones", path: "/nivel-5-especializaciones" }]),
    )],
  }),
});

function Nivel5Page() {
  const levelData = curriculumData["nivel-5"];
  const { progreso } = useProgreso();

  // Flujo plano: titulo de bloque y lecciones, en orden de lectura.
  const claves = levelData.sections.flatMap((s) => s.topics.map((t) => `nivel-5/${t.slug}`));
  const resumen = resumenDe(claves, progreso);

  const items = [];
  let numero = 0;
  levelData.sections.forEach((s, i) => {
    items.push({ tipo: "bloque", titulo: s.title, key: `bloque-${i}` });
    for (const topic of s.topics) {
      numero += 1;
      items.push({ tipo: "leccion", topic, numero, key: `lec-${topic.slug}` });
    }
  });

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <NivelHero
          nivel="5"
          titulo="Nivel 5 — Especializaciones"
          badge="NIVEL 5"
          objetivo="Programacion ZK, StarkNet/Cairo, regulacion y proyectos complejos. El nivel mas especializado."
          resumen={resumen}
          hrefSiguiente={
            resumen.siguiente ? `/nivel-5/${resumen.siguiente.split("/")[1]}` : null
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            if (item.tipo === "bloque") {
              return (
                <header key={item.key} className="col-span-full mt-8 first:mt-0">
                  <h2 className="font-serif text-2xl font-medium">{item.titulo}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {levelData.sections.find((s) => s.title === item.titulo)?.topics.length ?? 0} lecciones en este bloque
                  </p>
                </header>
              );
            }

            if (item.tipo === "leccion") {
              return (
                <LessonCard
                  key={item.key}
                  href={`/nivel-5/${item.topic.slug}`}
                  numero={item.numero}
                  slug={item.topic.slug}
                  titulo={item.topic.title}
                  descripcion={item.topic.description}
                  minutos={minutosLectura(item.topic)}
                  estado={progreso[`nivel-5/${item.topic.slug}`] ?? "nuevo"}
                  miniatura={miniaturaDe("5", item.numero, item.topic.slug, item.topic.title)}
                />
              );
            }

            return null;
          })}
        </div>

        <AffiliateCta nivel="5" />
      </main>
      <Footer />
    </>
  );
}
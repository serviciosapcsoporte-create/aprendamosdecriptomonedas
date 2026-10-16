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
export const Route = createFileRoute("/nivel-3-avanzado")({
  component: Nivel3Page,
  head: () => ({
    title: "NIVEL 3 — Avanzado | DeFi Avanzado, Trading y Análisis On-Chain | Curso Gratis",
    meta: [
      {
        name: "description",
        content:
          "Nivel 3 Avanzado gratis: DeFi profundo, AMMs, stablecoins, bridges, Layer 2 y trading con gestión de riesgo. 18 temas completos, sin registro.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 3 · Avanzado", description: "Ruta guiada de Nivel 3 · Avanzado con lecciones gratuitas y material descargable.", path: "/nivel-3-avanzado", level: "Nivel 3 · Avanzado" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 3 · Avanzado", path: "/nivel-3-avanzado" }]),
    )],
  }),
});

function Nivel3Page() {
  const levelData = curriculumData["nivel-3"];
  const { progreso } = useProgreso();

  // Flujo plano: titulo de bloque y lecciones, en orden de lectura.
  const claves = levelData.sections.flatMap((s) => s.topics.map((t) => `nivel-3/${t.slug}`));
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
          nivel="3"
          titulo="Nivel 3 — Avanzado"
          badge="NIVEL 3"
          objetivo="Domina DeFi avanzado, trading, cross-chain y analisis on-chain con casos reales del mercado."
          resumen={resumen}
          hrefSiguiente={
            resumen.siguiente ? `/nivel-3/${resumen.siguiente.split("/")[1]}` : null
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
                  href={`/nivel-3/${item.topic.slug}`}
                  numero={item.numero}
                  slug={item.topic.slug}
                  titulo={item.topic.title}
                  descripcion={item.topic.description}
                  minutos={minutosLectura(item.topic.content)}
                  estado={progreso[`nivel-3/${item.topic.slug}`] ?? "nuevo"}
                  miniatura={miniaturaDe("3", item.numero, item.topic.slug, item.topic.title)}
                />
              );
            }

            return null;
          })}
        </div>

        <AffiliateCta nivel="3" />
      </main>
      <Footer />
    </>
  );
}
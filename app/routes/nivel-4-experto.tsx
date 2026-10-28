// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { resumenDe, useProgreso } from "@/lib/progreso";
import { miniaturaDe } from "@/data/thumbnails";
import { NivelHero } from "@/components/NivelHero";
import { AffiliateCta } from "@/components/AffiliateCta";
import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/nivel-4-experto")({
  component: Nivel4Page,
  head: () => ({
    title: "NIVEL 4 — Experto Premium | Infraestructura Avanzada, MEV y Ciberseguridad Web3",
    meta: [
      {
        name: "description",
        content:
          "Nivel 4 Experto: bots de arbitraje, custodia institucional, hardware wallets, exploits, composabilidad DeFi y análisis de token unlocks.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 4 — Experto", description: "Ruta guiada de Nivel 4 — Experto con lecciones gratuitas y material descargable.", path: "/nivel-4-experto", level: "Nivel 4 — Experto" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 4 — Experto", path: "/nivel-4-experto" }]),
    )],
  }),
});

function Nivel4Page() {
  const levelData = curriculumData["nivel-4"];
  const { progreso } = useProgreso();

  const claves = levelData.sections.flatMap((s) => s.topics.map((t) => `nivel-4/${t.slug}`));
  const resumen = resumenDe(claves, progreso);

  const items = [];
  let numero = 0;
  levelData.sections.forEach((s) => {
    s.topics.forEach((t) => {
      numero += 1;
      items.push({ topic: t, numero });
    });
  });

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <NivelHero
          nivel="4"
          titulo="Nivel 4 — Experto"
          badge="NIVEL 4"
          objetivo="Infraestructura avanzada, MEV y ciberseguridad Web3. Dominio técnico para desarrolladores, quants y gestores de capital."
          resumen={resumen}
          hrefSiguiente={
            resumen.siguiente ? `/nivel-4/${resumen.siguiente.split("/")[1]}` : null
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ topic, numero }) => (
            <div
              key={topic.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl transition-all duration-300 hover:border-amber-500/50"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-950">
                <img
                  src={miniaturaDe("4", numero, topic.slug, topic.title).src}
                  alt={topic.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/lecciones/default-cover.webp";
                  }}
                />
                <span className="absolute left-3 top-3 rounded-lg border border-amber-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-amber-400 backdrop-blur-md">
                  Leccion {numero}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-wide text-gray-500">
                    {topic.section}
                  </span>
                  <h3 className="mb-2 line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-amber-400">
                    {topic.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-xs text-gray-400">{topic.description}</p>
                </div>

                <Link
                  to={`/nivel-4/${topic.slug}`}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-gray-800 py-2.5 text-xs font-bold text-amber-400 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-black"
                >
                  <span>Ver Leccion</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <AffiliateCta nivel="4" />
      </main>
      <Footer />
    </>
  );
}

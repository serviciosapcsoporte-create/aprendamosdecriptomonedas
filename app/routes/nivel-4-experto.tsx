// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { NIVEL_ICON, NIVEL_ICON_ALT, NIVEL_HEADER, NIVEL_HEADER_ALT } from "@/data/assets3d";

import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";
export const Route = createFileRoute("/nivel-4-experto")({
  component: Nivel4Page,
  head: () => ({
    title: "NIVEL 4 — Experto | ZK-Rollups, DeFi Profesional y Custodia | Curso Gratis",
    meta: [
      {
        name: "description",
        content:
          "Nivel 4 Experto gratis: ZK-rollups, derivados, bots de arbitraje, custodia institucional y análisis on-chain. 13 temas completos, sin registro.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 4 · Experto", description: "Ruta guiada de Nivel 4 · Experto con lecciones gratuitas y material descargable.", path: "/nivel-4-experto", level: "Nivel 4 · Experto" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 4 · Experto", path: "/nivel-4-experto" }]),
    )],
  }),
});

function Nivel4Page() {
  const levelData = curriculumData["nivel-4"];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          {NIVEL_HEADER["4"] && (
            <div className="relative mb-6 overflow-hidden rounded-xl">
              <img
                src={NIVEL_HEADER["4"]}
                alt={NIVEL_HEADER_ALT["4"] ?? ""}
                width={1600}
                height={500}
                className="h-32 w-full object-cover md:h-44"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent"
              />
            </div>
          )}
          <img
            src={NIVEL_ICON["4"]}
            alt={NIVEL_ICON_ALT["4"] ?? ""}
            className="mx-auto mb-4 h-24 w-24 object-contain"
          />
          <span className="text-3xl font-bold text-warning mb-2 block">NIVEL 4</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Experto</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {levelData.description}
          </p>
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-success/15 text-success border border-success/30">
            100% GRATIS · Sin registro
          </span>
        </div>

        {levelData.sections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">{section.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/nivel-4/${topic.slug}`}
                  className="group p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <AffiliateCta nivel="4" />
      </main>
      <Footer />
    </>
  );
}

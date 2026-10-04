// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";

import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";
export const Route = createFileRoute("/nivel-3-avanzado")({
  component: Nivel3Page,
  head: () => ({
    title: "NIVEL 3 — Avanzado | Criptografía, DeFi y Layer 2 | Curso Gratis",
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

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-warning mb-2 block">NIVEL 3</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Avanzado</h1>
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
                  to={`/nivel-3/${topic.slug}`}
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
        <AffiliateCta nivel="3" />
      </main>
      <Footer />
    </>
  );
}

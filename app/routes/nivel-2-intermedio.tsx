// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { curriculumData } from "@/data/curriculum";

import { canonical, jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";
export const Route = createFileRoute("/nivel-2-intermedio")({
  component: Nivel2Page,
  head: () => ({
    meta: [
      { title: "NIVEL 2 — Intermedio | Blockchain Técnica, Smart Contracts | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content:
          "Nivel 2 Intermedio gratis: Blockchain técnica, smart contracts, economía cripto y DeFi básico. Sin registro, acceso inmediato.",
      },
    ],
    links: [{ rel: "canonical", href: canonical("/nivel-2-intermedio") }],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 2 · Intermedio", description: "Ruta guiada de Nivel 2 · Intermedio con lecciones gratuitas y material descargable.", path: "/nivel-2-intermedio", level: "Nivel 2 · Intermedio" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 2 · Intermedio", path: "/nivel-2-intermedio" }]),
    )],
  }),
});

function Nivel2Page() {
  const levelData = curriculumData["nivel-2"];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-warning mb-2 block">NIVEL 2</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Intermedio</h1>
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
                  to={`/nivel-2/${topic.slug}`}
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
        <AffiliateCta nivel="2" />
      </main>
      <Footer />
    </>
  );
}

// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";

export const Route = createFileRoute("/nivel-3-avanzado")({
  component: Nivel3Page,
  head: () => ({
    meta: [
      { title: "NIVEL 3 — Avanzado | Criptografía, DeFi y Layer 2 | Curso Gratis" },
      {
        name: "description",
        content:
          "Nivel 3 Avanzado gratis: DeFi profundo, AMMs, stablecoins, bridges, Layer 2 y trading con gestión de riesgo. 18 temas completos, sin registro.",
      },
      { name: "keywords", content: "curso criptografia avanzada, arquitectura blockchain, token engineering, zk proofs, defi curso gratis" },
    ],
  }),
});

function Nivel3Page() {
  const levelData = curriculumData["nivel-3"];

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-amber-600 mb-2 block">NIVEL 3</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Avanzado</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {levelData.description}
          </p>
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
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
      </main>
      <Footer />
    </>
  );
}

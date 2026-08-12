// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { curriculumData } from "@/data/curriculum";

export const Route = createFileRoute("/nivel-5-especializaciones")({
  component: Nivel5Page,
  head: () => ({
    meta: [
      { title: "NIVEL 5 — Especializaciones | Trading, Minería, Desarrollo, Gobernanza" },
      {
        name: "description",
        content:
          "Nivel 5 Especializaciones: Trading con gestión de riesgo, minería, desarrollo en Solidity/Rust, gobernanza DAO y infraestructura Web3. Contenido premium.",
      },
      { name: "keywords", content: "curso trading riesgo, minería criptomonedas, solidity rust, gobernanza dao, infraestructura web3" },
    ],
  }),
});

function Nivel5Page() {
  const levelData = curriculumData["nivel-5"];

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-amber-600 mb-2 block">NIVEL 5</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Especializaciones</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {levelData.description}
          </p>
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Módulos À La Carta
          </span>
        </div>

        <div className="mb-12 bg-card rounded-xl p-6 md:p-8 text-center border">
          <h2 className="text-xl font-bold mb-4">Elige tu especialización</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            El Nivel 5 ofrece especializaciones modulares. Puedes elegir el módulo que se ajuste a tus objetivos: trading profesional, minería, desarrollo blockchain o infraestructura Web3.
          </p>
          <a href="#payhip-n5"
            className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-base font-medium text-navy hover:bg-amber-400"
          >
            Comprar Nivel 5 — $45 USD
          </a>
        </div>

        <div className="space-y-12">
          {levelData.sections && levelData.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold mb-6 text-amber-600">{section.title}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    to={`/nivel-5/${topic.slug}`}
                    className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="text-3xl mb-3">{topic.icon}</div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                    <span className="mt-3 text-sm text-amber-600 font-medium">→ Ver módulo</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

// If nivel-5 data isn't loaded yet, show placeholder

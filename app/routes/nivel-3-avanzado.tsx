// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { curriculumData } from "@/data/curriculum";

export const Route = createFileRoute("/nivel-3-avanzado")({
  component: Nivel3Page,
  head: () => ({
    meta: [
      { title: "NIVEL 3 — Avanzado | Criptografía, Arquitectura, Token Engineering" },
      {
        name: "description",
        content:
          "Nivel 3 Avanzado: Criptografía avanzada, arquitectura blockchain, ingeniería de tokens y smart contracts avanzados. Contenido premium.",
      },
      { name: "keywords", content: "curso criptografia avanzada, arquitectura blockchain, token engineering, zk proofs" },
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
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Contenido Premium
          </span>
        </div>

        <div className="mb-12 bg-card rounded-xl p-6 md:p-8 text-center border">
          <h2 className="text-xl font-bold mb-4">Accede a este nivel</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            El Nivel 3 cubre criptografía avanzada, arquitectura blockchain, ingeniería de tokens y smart contracts avanzados. Gratis con registro en Payhip.
          </p>
          <a href="#payhip-n3"
            className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-base font-medium text-navy hover:bg-amber-400"
          >
            Registrar gratis en Payhip
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {levelData.sections.map((section) => (
            <div key={section.title} className="bg-card rounded-lg border p-5">
              <h3 className="text-lg font-bold mb-3 text-amber-600">{section.title}</h3>
              <ul className="space-y-2">
                {section.topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      to={`/nivel-3/${topic.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { curriculumData } from "@/data/curriculum";

export const Route = createFileRoute("/nivel-2-intermedio")({
  component: Nivel2Page,
  head: () => ({
    meta: [
      { title: "NIVEL 2 — Intermedio | Blockchain Técnica, Smart Contracts | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content:
          "Nivel 2 Intermedio: Blockchain técnica, smart contracts, economía cripto y DeFi básico. Requiere registro gratuito.",
      },
      { name: "keywords", content: "curso blockchain tecnico, smart contracts curso, defi para principiantes, economia cripto" },
    ],
  }),
});

function Nivel2Page() {
  const levelData = curriculumData["nivel-2"];

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-amber-600 mb-2 block">NIVEL 2</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Intermedio</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {levelData.description}
          </p>
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Registro gratuito requerido
          </span>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="tu@email.com"
              required
              className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-500 px-6 py-2.5 text-sm font-medium text-navy hover:bg-amber-400 transition-colors"
            >
              Registrarme gratis
            </button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            Accede inmediato al Nivel 2 y recibe actualizaciones del curso.
          </p>
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
      </main>
      <Footer />
    </>
  );
}

// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";

import { AUTHOR } from "@/lib/seo";
export const Route = createFileRoute("/acerca-de")({
  component: AcercaDePage,
  head: () => ({
    title: `Acerca de ${AUTHOR} | Aprendamos de Criptomonedas`,
    meta: [
      {
        name: "description",
        content: `Conoce a ${AUTHOR}, fundador y autor de Aprendamos de Criptomonedas. Educación segura y estrategia clara desde 2022.`,
      },
    ],
  }),
});

function AcercaDePage() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Acerca de mí</h1>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <img
            src="/alejandro.svg"
            alt={`Retrato de ${AUTHOR}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-warning"
          />
          <div>
            <h2 className="text-xl font-bold">{AUTHOR}</h2>
            <p className="text-muted-foreground">
              Fundador y autor de Aprendamos de Criptomonedas
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            Mi nombre es {AUTHOR} y soy el fundador y autor de esta página. Mi pasión
            radica en educar y guiar a mis seguidores en el emocionante universo de las
            criptomonedas.
          </p>

          <h2>Lo que ofrezco</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">📈</span>
              <div>
                <h3 className="font-semibold">Información en Tiempo Real</h3>
                <p>Mantente al tanto de las últimas noticias y acontecimientos en el mundo criptográfico.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-semibold">Interacción Directa</h3>
                <p>Estoy aquí para responder a tus preguntas y crear un espacio donde podamos aprender juntos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold">Educación Continua</h3>
                <p>Desde proyectos antiguos hasta las últimas novedades, una fuente completa de conocimientos sobre criptomonedas.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold">Plan Educativo Completo</h3>
                <p>Curso estructurado en 5 niveles con 76 temas. Desde principiante hasta experto.</p>
              </div>
            </div>
          </div>

          <h2>Sobre @AprendamosDeCriptomonedas</h2>
          <ul>
            <li>🚀 Inicios en el 2022: Nacimos este año con una visión clara después de más de 9 meses moldeando la idea.</li>
            <li>🎓 Enfocado en la enseñanza: Mi objetivo principal es enseñar, educar y guiar a todos aquellos que deseen adentrarse en este emocionante mundo descentralizado.</li>
          </ul>

          <div className="bg-warning/10 dark:bg-warning/20 p-6 rounded-lg border border-warning/30 dark:border-warning/30 text-center mt-8">
            <blockquote>
              <p className="text-lg italic">
                "En cripto, sobrevivir es la primera victoria."
              </p>
              <p className="text-sm text-muted-foreground">— {AUTHOR}</p>
            </blockquote>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

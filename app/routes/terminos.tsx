// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { canonical, jsonLd, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/terminos")({
  component: Terminos,
  head: () => ({
    meta: [
      { title: "Términos y Condiciones | Aprendamos de Criptomonedas" },
      { name: "description", content: "Condiciones de uso de Aprendamos de Criptomonedas: naturaleza educativa del contenido, ausencia de asesoría financiera y límites de responsabilidad." },
      { property: "og:title", content: "Términos y Condiciones | Aprendamos de Criptomonedas" },
      { property: "og:url", content: canonical("/terminos") },
    ],
    links: [{ rel: "canonical", href: canonical("/terminos") }],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Términos y condiciones", path: "/terminos" },
        ]),
      ),
    ],
  }),
});

function Terminos() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Términos y condiciones</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Última actualización: octubre de 2026
        </p>

        <section className="space-y-8 text-lg leading-relaxed">
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
            <p>
              <strong>Aviso principal:</strong> todo el contenido de este sitio tiene carácter
              estrictamente educativo. No es asesoría financiera, no es una recomendación de
              compra y no debe interpretarse como una instrucción para invertir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">1. Naturaleza del sitio</h2>
            <p>
              Aprendamos de Criptomonedas es un proyecto editorial de Servicios APC. Publicamos material educativo
              sobre criptomonedas, blockchain y autocustodia. El acceso al contenido es gratuito y
              no requiere registro.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Riesgo del mercado</h2>
            <p>
              Las criptomonedas son un activo de alto riesgo y su precio puede variar
              significativamente en periodos cortos. Puedes perder todo o parte del capital
              invertido. Antes de tomar una decisión financiera, verifica la información en
              fuentes oficiales y consulta con un profesional habilitado.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Exactitud del contenido</h2>
            <p className="mb-3">
              Nos esforzamos por mantener el material actualizado, pero la tecnología y el
              mercado cambian rápido. Algo puede quedar desactualizado sin previo aviso.
            </p>
            <p>
              Si encuentras un error, escríbenos a{" "}
              <a href="mailto:REEMPLAZAR_EMAIL_REAL" className="text-primary hover:underline">
                REEMPLAZAR_EMAIL_REAL
              </a>{" "}
              y lo corregimos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Enlaces de terceros</h2>
            <p>
              El sitio incluye enlaces a cursos de terceros mediante el programa de afiliados de
              Hotmart. No controlamos esos cursos ni sus productores. El detalle está en la{" "}
              <Link to="/afiliados" className="text-primary hover:underline">
                página de afiliados
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Material descargable</h2>
            <p>
              Las guías, checklists y planillas que ofrecemos se pueden copiar y usar
              libremente con fines personales y educativos. No está permitido revenderlos ni
              presentarlos como propios.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Propiedad intelectual</h2>
            <p>
              Los textos, diagramas y materiales originales de este sitio pertenecen a Servicios
              APC. Puedes citarlos indicando el autor y el enlace.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Responsabilidad</h2>
            <p>
              No respondemos por pérdidas derivadas de decisiones tomadas con base en el
              contenido de este sitio, ni por el contenido de cursos de terceros enlazados desde
              aquí.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Ley aplicable</h2>
            <p>
              Estos términos se rigen por la legislación colombiana. Cualquier
              controversia se somete a los juzgados de la Jurisdicción Ordinaria de Bogotá.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-2xl font-bold mb-3">Contacto</h2>
            <p>
              Servicios APC · Bogotá, Colombia · +57 333 745 0634 ·{" "}
              <a href="mailto:REEMPLAZAR_EMAIL_REAL" className="text-primary hover:underline">
                REEMPLAZAR_EMAIL_REAL
              </a>
            </p>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
          <Link
            to="/privacidad"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Política de privacidad
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

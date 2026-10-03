// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { canonical, jsonLd, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  component: Privacidad,
  head: () => ({
    meta: [
      { title: "Política de Privacidad | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content:
          "Qué datos personales tratamos, con qué finalidad y cómo pedir su eliminación, conforme a la Ley 1581 de 2012 de Colombia.",
      },
      { property: "og:title", content: "Política de Privacidad | Aprendamos de Criptomonedas" },
      { property: "og:url", content: canonical("/privacidad") },
    ],
    links: [{ rel: "canonical", href: canonical("/privacidad") }],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Política de Privacidad", path: "/privacidad" },
        ]),
      ),
    ],
  }),
});

function Privacidad() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidad</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Última actualización: octubre de 2026
        </p>

        <section className="space-y-8 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold mb-3">1. Responsable</h2>
            <p>
              Servicios APC, NIT REEMPLAZAR_NIT, es el responsable del tratamiento de
              los datos personales recopilados en este sitio. Su domicilio es
              REEMPLAZAR_DIRECCION_COMPLETA.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Qué datos recopilamos</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Los que nos envías:</strong> nombre y correo electrónico, solo si decides
                enviarlos para recibir el material gratuito o el resumen de noticias.
              </li>
              <li>
                <strong>Datos técnicos:</strong> el servicio de analítica registra páginas vistas y
                el origen del tráfico de forma agregada.
              </li>
            </ul>
            <p className="mt-3">
              Nunca pedimos ni almacenamos tu frase semilla, tus claves privadas ni los datos de tu
              tarjeta. Ese material no se comparte con nadie y no debe enviarse por ningún medio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Para qué los usamos</h2>
            <p className="mb-3">
              Tratamos tus datos con tu consentimiento expreso, que es la base legal principal bajo
              la Ley 1581 de 2012. Los usos son estos:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Enviarte el material gratuito que solicitaste.</li>
              <li>Enviarte el resumen de noticias, si lo pides de forma explícita.</li>
              <li>Medir el rendimiento del sitio de forma agregada.</li>
              <li>Cumplir las obligaciones legales que nos correspondan.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. No vendemos tus datos</h2>
            <p>
              No vendemos, alquilamos ni cedemos tus datos personales a terceros por motivos
              comerciales. Solo se comparten cuando la ley nos obliga o cuando tú lo autorizas
              expresamente.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Enlaces de afiliado</h2>
            <p>
              Algunas páginas incluyen enlaces a cursos de terceros en marketplaces como Hotmart. Si
              haces clic en esos enlaces y completas una compra, el productor puede registrarnos
              como afiliados y pagarnos una comisión.{" "}
              <strong>Esto no cambia el precio que pagas.</strong> Hacer clic en un enlace no
              significa que el productor reciba tus datos personales. El detalle está en nuestra{" "}
              <Link to="/afiliados" className="text-primary hover:underline">
                página de afiliados
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Tus derechos</h2>
            <p className="mb-3">
              Puedes conocer, actualizar, suprimir tu información y revocar tu consentimiento en
              cualquier momento escribiendo a{" "}
              <a href="mailto:REEMPLAZAR_EMAIL_REAL" className="text-primary hover:underline">
                REEMPLAZAR_EMAIL_REAL
              </a>
              . Respondemos en un plazo máximo de 15 días hábiles, según el artículo 19 de la Ley
              1581 de 2012.
            </p>
            <p>
              Si consideras que tu derecho ha sido vulnerado, puedes acudir a la Autoridad de
              Protección de Datos Personales de Colombia.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Seguridad</h2>
            <p>
              El sitio se sirve sobre HTTPS con cifrado de transporte. Puedes retirar tu
              consentimiento y solicitar la eliminación de tu dato en cualquier momento, sin
              necesidad de justificar el motivo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Cambios</h2>
            <p>
              Si cambiamos esta política de forma relevante, actualizaremos la fecha al inicio de la
              página y lo avisaremos de forma visible en el sitio.
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
            to="/terminos"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Términos y condiciones
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
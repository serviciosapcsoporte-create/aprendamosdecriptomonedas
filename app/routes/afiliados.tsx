// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { canonical, jsonLd, breadcrumbLd } from "@/lib/seo";
import { ContactLinks } from "@/components/ContactLinks";

export const Route = createFileRoute("/afiliados")({
  component: Afiliados,
  head: () => ({
    meta: [
      { title: "Enlaces de Afiliado y Divulgación | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content:
          "Qué es un enlace de afiliado, por qué los usamos, que no cambian el precio y cuáles son los criterios para recomendar un curso de Hotmart.",
      },
      { property: "og:title", content: "Enlaces de Afiliado y Divulgación" },
      { property: "og:url", content: canonical("/afiliados") },
    ],
    links: [{ rel: "canonical", href: canonical("/afiliados") }],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Enlaces de afiliado", path: "/afiliados" },
        ]),
      ),
    ],
  }),
});

function Afiliados() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Enlaces de afiliado</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Cómo ganamos dinero con este sitio y por qué eso no cambia lo que lees
        </p>

        <section className="space-y-8 text-lg leading-relaxed">
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
            <p>
              <strong>Divulgación:</strong> algunas páginas de este sitio incluyen enlaces de
              afiliado a cursos de terceros. Si compras a través de uno de esos enlaces podemos
              recibir una comisión, sin coste adicional para ti. No cambia el precio que pagas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Qué es un enlace de afiliado</h2>
            <p>
              Es un enlace que incluye un identificador nuestro. Si alguien lo usa para comprar, el
              producto nos abona una comisión. El precio es el mismo para ti con o sin nuestro
              enlace.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Por qué los usamos</h2>
            <p className="mb-3">
              Todo el material de este sitio es gratuito y no requiere registro. Cuando una
              lección te resuelve una duda y aun así quieres ir más profundo, la alternativa
              natural es un curso con video, soporte y certificado. Ahí es donde entra el enlace.
            </p>
            <p>
              Mantener el sitio abierto con courses de pago nos permite seguir publicando
              lecciones nuevas sin pedirte nada a cambio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Cómo elegimos qué cursositamos</h2>
            <p className="mb-3">Solo recomendamos cursos que cumplan estos criterios:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Encaje temático.</strong> El curso tiene que profundizar lo que explica la
                lección donde aparece el enlace, no simplemente cambiar de tema.
              </li>
              <li>
                <strong>Prueba social real.</strong> Reseñas de compradores verificados, no
                reseñas sueltas de una sola persona.
              </li>
              <li>
                <strong>En español.</strong> El soporte y el contenido deben estar disponibles en
                el idioma del lector.
              </li>
              <li>
                <strong>Precio razonable.</strong> No promovemos cursos de precio inaccesible ni
                promesas de rendimiento garantizado.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Lo que no hacemos</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>No pagamos por reseñas positivas.</li>
              <li>No recomendamos cursos de trading a quien está buscando aprender sobre wallets.</li>
              <li>No usamos enlaces de afiliado dentro de las lecciones gratuitas.</li>
              <li>No prometemos resultados ni rendimientos.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Una advertencia importante</h2>
            <p>
              Nadie legítimo te pedirá tu frase semilla, tu clave privada ni los códigos de
              verificación de tu billetera. Si alguien lo hace, no es un curso: es un fraude. Cierra
              la página y no compartas ese dato con nadie, tampoco con nosotros.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Aviso de riesgo</h2>
            <p>
              El contenido de este sitio es educativo y no constituye asesoría financiera. Las
              criptomonedas son volátiles y puedes perder dinero. Verifica siempre el proceso en la
              fuente oficial y prueba con una cantidad pequeña antes de mover tus fondos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Transparencia</h2>
            <p>
              Si alguna vez recibes una comisión y crees que eso condicionó lo que
              escribimos, escríbenos por <ContactLinks />. Lo revisamos.
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
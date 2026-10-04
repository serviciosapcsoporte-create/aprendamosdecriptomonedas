// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { canonical, jsonLd, breadcrumbLd } from "@/lib/seo";
import { OPERATOR, LEGAL_UPDATED, MERCHANT, contactLine } from "@/lib/legal";
import { ContactLinks } from "@/components/ContactLinks";

export const Route = createFileRoute("/privacidad")({
  component: Privacidad,
  head: () => ({
    title: "Política de Privacidad | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Qué datos personales tratamos, con qué finalidad y cómo pedir su eliminación, conforme a la Ley 1581 de 2012 de Colombia.",
      },
      { property: "og:title", content: "Política de Privacidad | Aprendamos de Criptomonedas" },
      { property: "og:url", content: canonical("/privacidad") },
    ],
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
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidad</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Última actualización: {LEGAL_UPDATED}
        </p>

        <section className="space-y-8 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold mb-3">1. Quién responde por este sitio</h2>
            <p>
              Aprendamos de Criptomonedas es un proyecto editorial de {OPERATOR}. El
              autor y responsable público del contenido es{" "}
              <strong>Alejandro Piraquive</strong>. Para cualquier consulta, pedido de
              información o ejercicio de derechos, escríbenos por <ContactLinks /> —
              en Facebook por mensaje privado y en Telegram al administrador del
              grupo.
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              Este sitio no vende ni factura directamente: no publicamos NIT, dirección
              física ni teléfono personal porque no existe una transacción comercial
              propia que declarar. Los cursos enlazados se compran en {MERCHANT}, quien
              es el responsable de ese checkout y de la facturación.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Qué datos recopilamos</h2>
            <p className="mb-3">
              Este sitio está diseñado para no recoger datos personales:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>No hay cuentas ni registro.</strong> Toda la guía se lee sin
                identificarte.
              </li>
              <li>
                <strong>No hay cookies propias de seguimiento</strong> ni
                analítica que te identifique.
              </li>
              <li>
                <strong>No hay formularios activos.</strong> Si en algún momento
                volvemos a activar un boletín, lo diremos aquí y pediremos tu
                consentimiento antes de guardar tu correo.
              </li>
              <li>
                <strong>Datos técnicos del alojamiento:</strong> el proveedor de
                hosting registra de forma automática y temporal tu dirección IP, el
                navegador y la página solicitada. Se usan solo para seguridad y
                diagnóstico y se borran en pocos días.
              </li>
              <li>
                <strong>Recursos de terceros:</strong> las tipografías se cargan desde
                Google Fonts, que recibe tu IP al hacerlo. Las lecciones pueden incluir
                vídeos incrustados de plataformas externas.
              </li>
            </ul>
            <p className="mt-3">
              Nunca pedimos ni almacenamos tu frase semilla, tus claves privadas ni los
              datos de tu tarjeta. Ese material no se comparte con nadie y no debe
              enviarse por ningún medio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Para qué los usamos</h2>
            <p className="mb-3">
              No tratamos datos personales con finalidades propias. Si nos escribes por
              correo, usamos lo que envías únicamente para responderte y guardamos ese
              hilo solo el tiempo necesario para cerrar la conversación. Ese
              tratamiento se sustenta en tu solicitud expresa, conforme a la Ley 1581
              de 2012.
            </p>
            <p>
              No enviamos boletines, no vendemos listas y no usamos tus datos para
              publicidad propia.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. No vendemos tus datos</h2>
            <p>
              No vendemos, alquilamos ni cedemos datos personales a terceros por motivos
              comerciales. No tenemos con quién venderlos: no los recopilamos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Enlaces de afiliado y terceros</h2>
            <p className="mb-3">
              Algunas páginas incluyen enlaces a cursos de terceros en marketplaces como{" "}
              {MERCHANT}. Si haces clic en esos enlaces y completas una compra, el
              productor puede registrarnos como afiliados y pagarnos una comisión.{" "}
              <strong>Esto no cambia el precio que pagas.</strong>
            </p>
            <p className="mb-3">
              Hacer clic no significa que nadie reciba tus datos: nosotros solo vemos
              la atribución de la venta y la comisión, nunca el comprador ni su método
              de pago. Una vez que sales del sitio, el responsable del tratamiento eres
              tú y {MERCHANT}, con su propia política de privacidad. El detalle está en
              nuestra{" "}
              <Link to="/afiliados" className="text-primary hover:underline">
                página de afiliados
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Tus derechos</h2>
            <p className="mb-3">
              Puedes conocer, actualizar o suprimir cualquier dato que nos hayas enviado
              y revocar tu consentimiento en cualquier momento escribiéndonos por{" "}
              <ContactLinks />, por mensaje privado. Respondemos en un plazo máximo de
              15 días hábiles, según el artículo 19 de la Ley 1581 de 2012.
            </p>
            <p>
              Si consideras que tu derecho ha sido vulnerado, puedes acudir a la
              Superintendencia de Industria y Comercio (SIC) de Colombia.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Seguridad</h2>
            <p>
              El sitio se sirve sobre HTTPS con cifrado de transporte. No guardamos bases
              de datos de usuarios, así que no hay nada que filtrar de tu parte. Puedes
              solicitar la eliminación de cualquier dato que nos hayas enviado, sin
              necesidad de justificar el motivo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Cambios</h2>
            <p>
              Si cambiamos esta política de forma relevante, actualizaremos la fecha al
              inicio de la página y lo avisaremos de forma visible en el sitio.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-2xl font-bold mb-3">Contacto</h2>
            <p>
              {contactLine()}
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
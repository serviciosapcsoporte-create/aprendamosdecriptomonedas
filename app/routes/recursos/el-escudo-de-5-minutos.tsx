import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/GuidePage";

export const Route = createFileRoute("/recursos/el-escudo-de-5-minutos")({
  component: ElEscudoDe5Minutos,
  head: () => ({
    meta: [
      {
        title: "El Escudo de 5 Minutos | Rutina de seguridad cripto | Aprendamos de Criptomonedas",
      },
      {
        name: "description",
        content:
          "Rutina de seguridad de 5 minutos antes de operar: revisa 2FA, seed phrase, red y dirección. Minimiza los errores irreversibles.",
      },
      {
        name: "keywords",
        content:
          "seguridad cripto, rutina de seguridad, 2FA, seed phrase, verificación de dirección, protección wallet, antes de operar",
      },
      { property: "og:title", content: "El Escudo de 5 Minutos" },
      {
        property: "og:description",
        content: "Cinco minutos de rutina que te protegen de los errores que más caro cuestan.",
      },
    ],
  }),
});

function ElEscudoDe5Minutos() {
  return (
    <GuidePage
      badge="GUÍA GRATUITA"
      title="EL ESCUDO DE 5 MINUTOS"
      subtitle="La rutina que aplicas antes de operar y te ahorra el error del millón"
      tagline={[
        "Una rutina de **5 minutos** para cada vez que pienses en invertir, enviar o tradear.",
        "La seguridad no es complicada: es una **costumbre**.",
      ]}
      disclaimer="Guía educativa. Aplica esta rutina junto con la checklist completa de supervivencia cripto."
      sections={[
        {
          heading: "Minuto 1 · Estado emocional",
          paragraphs: [
            "Antes de tocar tu teléfono o computadora: **¿estás operando por una señal o por miedo a perderte algo?**",
            "El FOMO (miedo a perderte algo) es el vector #1 de las estafas. Si sientes urgencia o ansiedad, no operes: espera 24 horas.",
          ],
          warning: "Nunca tomes decisiones de dinero bajo presión emocional.",
        },
        {
          heading: "Minuto 2 · Entorno seguro",
          paragraphs: [
            "Verifica que estás en una **red confiable** (nada de WiFi público de cafetería o aeropuerto) y que tu dispositivo tiene el **antivirus/software actualizado**.",
            "Revisa que nadie vea tu pantalla y que la página que usas sea la oficial (mira el candado y el dominio completo, no un clon).",
          ],
        },
        {
          heading: "Minuto 3 · Cuentas protegidas",
          paragraphs: [
            "Confirma que tu exchange y tu correo tienen **2FA con app** (no solo SMS) y que usas contraseñas únicas.",
            "Si tienes una wallet, asegúrate de que tu **seed phrase no está en ningún dispositivo**: ni fotos, ni capturas, ni notas en la nube.",
          ],
          lists: [
            {
              items: [
                { text: "2FA con app activado en exchange y correo", check: true },
                { text: "Seed phrase solo en papel, guardada en lugar seguro", check: true },
              ],
            },
          ],
        },
        {
          heading: "Minuto 4 · La operación",
          paragraphs: [
            "Si vas a enviar o recibir: **verifica la red** (BEP-20, ERC-20, TRC-20…). Un error de red es un error irreversible.",
            "Usa la **técnica 4-4**: compara los primeros 4 y últimos 4 caracteres de la dirección destino.",
            "Haz un **envío de prueba** con un monto mínimo antes de mover cantidades grandes.",
          ],
          lists: [
            {
              items: [
                { text: "Red correcta antes de enviar fondos", check: true },
                { text: "Dirección completa revisada (no solo el inicio)", check: true },
                { text: "Envío de prueba con monto pequeño", check: true },
              ],
            },
          ],
        },
        {
          heading: "Minuto 5 · Registro y límites",
          paragraphs: [
            "Anota la operación: fecha, monto, red y resultado. **Llevar registro** es la diferencia entre aprender y repetir el error.",
            "Respeta tus límites: nunca inviertas más de lo que estás dispuesto a perder, no uses dinero prestado y no apuestes el 100% en un solo activo.",
          ],
          quote: "Cinco minutos de rutina. Toda una vida de diferencia.",
        },
      ]}
      cta={[
        { label: "Descargar la Checklist completa", href: "/recursos/checklist-supervivencia-cripto", variant: "gold" },
        { label: "Otras guías gratuitas", href: "/recursos", variant: "cyber" },
      ]}
    />
  );
}

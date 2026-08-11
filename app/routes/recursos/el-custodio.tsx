import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/GuidePage";

export const Route = createFileRoute("/recursos/el-custodio")({
  component: ElCustodio,
  head: () => ({
    meta: [
      {
        title: "El Custodio de su Propia Libertad | Guía de autocustodia | Aprendamos de Criptomonedas",
      },
      {
        name: "description",
        content:
          "Guía de autocustodia: exchange vs wallet, el espejismo del saldo, tu frase semilla, el envío seguro y la técnica 4-4.",
      },
      {
        name: "keywords",
        content:
          "autocustodia cripto, exchange vs wallet, seed phrase, técnica 4-4, envío seguro, hot wallet cold wallet, auto custodia bitcoin",
      },
      { property: "og:title", content: "El Custodio de su Propia Libertad" },
      {
        property: "og:description",
        content: "De exchange a wallet: quién tiene el control real de tus criptomonedas y cómo asegurar tu envío.",
      },
    ],
  }),
});

function ElCustodio() {
  return (
    <GuidePage
      badge="GUÍA GRATUITA"
      title="EL CUSTODIO DE SU PROPIA LIBERTAD"
      subtitle="Quién custodia tu dinero decide tu futuro"
      tagline={[
        "Si no tienes las claves, no tienes las monedas. Esta guía te muestra **cómo pasar del exchange a la autocustodia** sin errores irreversibles.",
        "El espejismo del saldo · Tu frase semilla · La anatomía del envío seguro · La técnica 4-4.",
      ]}
      edition="Edición 2026"
      disclaimer="Guía educativa. No es asesoría financiera. La custodia de tus criptomonedas implica responsabilidad personal: nunca compartas tu seed phrase con nadie y verifica cada dirección antes de enviar."
      sections={[
        {
          heading: "El espejismo del saldo",
          paragraphs: [
            "Cuando dejas tus criptomonedas en un exchange, no las tienes tú: **las tiene el exchange**. Lo que ves en tu pantalla es una promesa de pago, no una bóveda a tu nombre.",
            "Si el exchange quiebra, es hackeado o congela retiros, tu saldo puede desaparecer de un día para el otro. Esto ya pasó: muchas personas perdieron todo el dinero que «tenían» en plataformas centralizadas.",
            "La regla es simple: **si no tienes las claves privadas, no tienes las monedas.**",
          ],
          quote: "Un exchange es un préstamo al mejor postor. Tu wallet es tu única propiedad real.",
        },
        {
          heading: "Exchange vs Wallet (DEX / self-custody)",
          paragraphs: [
            "La diferencia no es el nombre: es **quién controla las claves privadas**.",
            "En un **exchange** (custodia): el exchange genera y guarda tus claves. Tú tienes un usuario y una contraseña. Todo depende de que la plataforma siga funcionando y te deje operar.",
            "En una **wallet** (self-custody): solo tú tienes la frase semilla y las claves. Nadie puede congelar, bloquear ni tocar tus fondos. Pero también nadie puede recuperarlos si las pierdes.",
          ],
          lists: [
            {
              items: [
                { text: "**CEX / Exchange**: fácil de usar, alta liquidez, custodia de terceros, riesgo de contraparte.", check: true },
                { text: "**DEX / Wallet self-custody**: control total, riesgo 100% tuyo, ideal para montos que no podés perder.", check: true },
              ],
            },
          ],
        },
        {
          heading: "Ruido vs Datos: Market Cap y Volumen",
          paragraphs: [
            "Antes de analizar cualquier criptomoneda, filtra el ruido de los datos. El **precio por unidad** es ruido: un token en $0.0001 no es «barato», depende de su supply total.",
            "El **Market Cap** (capitalización) es el dato real: precio × suministro circulante. Compara proyectos con la misma métrica y sospecha de proyectos con market cap pequeño y volumen inflado.",
            "**Volumen** alto en un solo día no significa adopción: puede ser manipulación o wash trading.",
          ],
          warning: "Regla práctica: precio = ruido. Market cap + volumen sostenido = datos.",
        },
        {
          heading: "Tu frase semilla: el último código",
          paragraphs: [
            "Tu seed phrase (12 a 24 palabras) es la **llave maestra de tu wallet**. Con ella se puede restaurar, mover o robar todo. Es el último código entre tu dinero y quien quiera robarlo.",
          ],
          lists: [
            {
              items: [
                { text: "NUNCA la escribas en un teclado (keyloggers)", check: false },
                { text: "NUNCA le tomes una foto (nubes hackeables)", check: false },
                { text: "NUNCA la digas en voz alta (micrófonos, habitaciones inteligentes)", check: false },
              ],
            },
          ],
          warning: "Las 3 leyes prohibidas: ni teclado, ni foto, ni voz. Escríbela en papel y guárdala en un lugar físico seguro y secreto.",
        },
        {
          heading: "La anatomía del envío seguro",
          paragraphs: [
            "La mayoría de errores irreversibles en cripto no son hackeos: son **errores de envío**. Una dirección equivocada o una red equivocada significa fondos perdidos para siempre.",
            "Usa la **técnica 4-4**: verifica los primeros 4 y últimos 4 caracteres de la dirección antes de confirmar. Un malware puede reemplazar la dirección en tu portapapeles.",
            "**Envío de prueba**: envía siempre un monto mínimo primero y confirma que llega antes de mover el total.",
          ],
          lists: [
            {
              items: [
                { text: "Verifica la red correcta antes de enviar (BEP-20, ERC-20, TRC-20…)", check: true },
                { text: "Reviso la dirección completa, no solo el inicio", check: true },
                { text: "Error de red = fondos perdidos", check: true },
                { text: "Hago envíos de prueba con montos pequeños", check: true },
              ],
            },
          ],
          quote: "En cripto no existe el «me equivoqué»: la transacción no se puede revertir.",
        },
      ]}
      cta={[
        { label: "Autoevaluarte con la Checklist", href: "/recursos/checklist-supervivencia-cripto", variant: "gold" },
        { label: "Otras guías gratuitas", href: "/recursos", variant: "cyber" },
      ]}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/GuidePage";

export const Route = createFileRoute("/recursos/el-escanner")({
  component: ElEscanner,
  head: () => ({
    meta: [
      {
        title: "El Escáner | Cómo analizar una criptomoneda | Aprendamos de Criptomonedas",
      },
      {
        name: "description",
        content:
          "Filtros de lógica para analizar un protocolo cripto: la fuente del flujo, lending real vs Ponzi, ingresos de red e inflación vacía.",
      },
      {
        name: "keywords",
        content:
          "analizar criptomoneda, detectar Ponzi, rendimiento real cripto, fuente del flujo, inflación vacía, protocolo cripto",
      },
      { property: "og:title", content: "El Escáner · Análisis de protocolo" },
      {
        property: "og:description",
        content: "Antes de invertir, identifica la naturaleza del flujo. Aprende a detectar el Ponzi camuflado.",
      },
    ],
  }),
});

function ElEscanner() {
  return (
    <GuidePage
      badge="ANÁLISIS DE PROTOCOLO · SECCIÓN 2"
      title="EL ESCÁNER"
      subtitle="Interfaz de diagnóstico de capital: identificando la naturaleza del flujo"
      tagline={[
        "Un protocolo puede parecer rentable y ser una trampa. El Escáner te da **filtros de lógica** para ver de dónde sale realmente el dinero.",
      ]}
      edition="Sección 2 · Análisis de protocolo"
      disclaimer="Análisis educativo. No es asesoría financiera ni promesa de rendimiento. Siempre haz tu propia investigación (DYOR)."
      sections={[
        {
          heading: "Filtro de lógica 01 · La fuente del flujo",
          paragraphs: [
            "Antes de mirar el porcentaje de rendimiento, pregúntate: **¿de dónde sale ese dinero?** Todo rendimiento debe tener una fuente real que lo respalde.",
            "Si la fuente no es clara, el rendimiento no es un ingreso: es una **salida de liquidez** disfrazada de ganancia.",
          ],
        },
        {
          heading: "¿Rendimiento real o Ponzi?",
          paragraphs: [
            "Un esquema Ponzi paga a los primeros inversores con el capital de los nuevos. Mientras entra dinero, todo parece funcionar; cuando se detiene, colapsa.",
            "La diferencia con un negocio real: el negocio **genera ingresos** (comisiones, intereses, productos); el Ponzi solo **redistribuye capital**.",
          ],
          lists: [
            {
              items: [
                { text: "**Lending real**: hay contrapartes pidiendo prestado y pagando interés por el uso del capital", check: true },
                { text: "**Ingresos de red**: comisiones pagadas por usuarios reales en un DEX o pool de liquidez", check: true },
                { text: "**Inflación vacía**: el % viene de la emisión de tokens que nadie necesita ni utiliza", check: false },
              ],
            },
          ],
          quote: "Si no puedes ver el producto, el producto eres tú.",
        },
        {
          heading: "La motivación del villano",
          paragraphs: [
            "Detrás de los rendimientos imposibles siempre hay la misma mecánica: **la entrada de nuevos fondos es el combustible**. Sin flujo nuevo, no hay pago.",
            "Revisa el contrato, el equipo y el historial real de uso. Si algo no se puede verificar, es porque no existe.",
          ],
          warning: "Regla: no inviertas en lo que no puedes explicar en una frase. Si necesitas 10 minutos de jerga, es una trampa.",
        },
      ]}
      cta={[
        { label: "Profundizar en autocustodia", href: "/recursos/el-custodio", variant: "gold" },
        { label: "Otras guías gratuitas", href: "/recursos", variant: "cyber" },
      ]}
    />
  );
}

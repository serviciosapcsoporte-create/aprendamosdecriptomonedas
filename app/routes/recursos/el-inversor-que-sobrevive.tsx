import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/GuidePage";

export const Route = createFileRoute("/recursos/el-inversor-que-sobrevive")({
  component: ElInversorQueSobrevive,
  head: () => ({
    meta: [
      {
        title:
          "El Inversor que Sobrevive | Guía de control y seguridad cripto | Aprendamos de Criptomonedas",
      },
      {
        name: "description",
        content:
          "Guía educativa para entender antes de arriesgar: control, seguridad y criterio en el mercado cripto. Protege tu capital antes de pensar en ganancias.",
      },
      {
        name: "keywords",
        content:
          "guía inversor cripto, no perder dinero en cripto, educación criptomonedas, gestión de riesgo cripto, seguridad en cripto",
      },
      { property: "og:title", content: "El Inversor que Sobrevive | Aprendamos de Criptomonedas" },
      {
        property: "og:description",
        content:
          "Control, seguridad y criterio en el mercado cripto. Una guía educativa para no perderlo todo.",
      },
    ],
  }),
});

function ElInversorQueSobrevive() {
  return (
    <GuidePage
      badge="GUÍA GRATUITA"
      title="EL INVERSOR QUE SOBREVIVE"
      subtitle="Control, seguridad y criterio en el mercado cripto"
      tagline={[
        "Una guía educativa para personas que prefieren **entender antes de arriesgar** y proteger su capital antes de pensar en ganancias.",
        "**No es una guía para volverte rico. Es una guía para no perderlo todo.**",
      ]}
      edition="Edición 2026 · 30 de enero de 2026"
      disclaimer="Esta guía es educativa. No es asesoría financiera, no es recomendación de inversión y no promete resultados. El mercado cripto es volátil, impredecible y castiga los errores, especialmente los cometidos por emoción, desconocimiento o exceso de confianza. Lo que aquí aprenderás no te hará ganar más rápido, pero sí puede evitar que pierdas por errores básicos. Cada decisión que tomes con tu dinero es tu responsabilidad. Y ese es precisamente el punto de esta guía: devolverte el control."
      sections={[
        {
          heading: "Por qué la mayoría pierde dinero",
          paragraphs: [
            "La mayoría de personas entra al mercado cripto buscando rapidez, atajos o confirmación externa.",
            "No estudian el sistema, reaccionan al precio. Compran cuando todos hablan de ganancias. Venden cuando el miedo domina.",
            "El mercado no castiga la ignorancia, castiga la improvisación. Y en cripto, un solo error puede sacarte del juego por completo.",
            "No es un problema técnico. Es un problema de criterio.",
          ],
          quote: "El mercado no te quita dinero: te cobra errores.",
        },
        {
          heading: "El mito del dinero fácil",
          paragraphs: [
            "Las redes muestran resultados, no procesos. Promesas, gráficos editados y discursos motivacionales crean una ilusión peligrosa: que ganar es simple y perder es opcional.",
            "Nada más lejos de la realidad. Quien cree en dinero fácil suele ignorar el riesgo, la gestión y la seguridad. Y el mercado aprovecha esa debilidad sin avisar.",
            "En cripto, la paciencia protege más que la suerte.",
          ],
          quote: "Si parece fácil, probablemente es una trampa.",
        },
      ]}
      cta={[
        { label: "Seguir aprendiendo sin humo", href: "/recursos", variant: "gold" },
        { label: "Hacer la Checklist de Supervivencia", href: "/recursos/checklist-supervivencia-cripto", variant: "cyber" },
      ]}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("calculadora-riesgo") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/calculadora-riesgo")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Calculadora del tamaño de posición | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Calcula el tamaño de posición, el riesgo en USD y el margen requerido antes de operar. Descarga gratis en CSV, Excel (con fórmulas) y PDF.",
      },
      { property: "og:title", content: "Calculadora del tamaño de posición" },
      {
        property: "og:description",
        content: "El tamaño de posición que hace que tu stop cueste exactamente el riesgo definido.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Calculadora del tamaño de posición", path: "/recursos/calculadora-riesgo" },
        ]),
      ),
    ],
  }),
});

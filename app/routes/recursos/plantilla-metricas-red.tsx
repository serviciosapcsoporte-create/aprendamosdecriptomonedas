import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("plantilla-metricas-red") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/plantilla-metricas-red")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Plantilla de métricas de red (CSV, Excel y PDF) | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Analiza la valoración totalmente diluida (FDV), la capitalización de mercado, el volumen negociado y los próximos desbloqueos. Descarga gratis en CSV, Excel con fórmulas y PDF.",
      },
      { property: "og:title", content: "Plantilla de métricas de red" },
      {
        property: "og:description",
        content: "Compara la valoración, el volumen negociado y la oferta de un token en una sola plantilla.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Plantilla de métricas de red", path: "/recursos/plantilla-metricas-red" },
        ]),
      ),
    ],
  }),
});

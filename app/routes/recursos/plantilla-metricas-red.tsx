import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("plantilla-metricas-red") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/plantilla-metricas-red")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Plantilla de Métricas de Red (CSV, Excel y PDF) | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Calcula FDV/MCap, rotación, supply y desbloqueos con fórmulas listas. Descarga gratis en CSV, Excel y PDF.",
      },
      { property: "og:title", content: "Plantilla de Métricas de Red" },
      {
        property: "og:description",
        content: "Los ratios que separan un proyecto sólido de una preventa, en una tabla.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Plantilla de Métricas de Red", path: "/recursos/plantilla-metricas-red" },
        ]),
      ),
    ],
  }),
});

import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("checklist-seguridad") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/checklist-seguridad")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Checklist de Seguridad Institucional (12 puntos) | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "12 puntos verificables en diez minutos sobre llaves, custodia, accesos y operativa. Descarga gratis en CSV, Excel y PDF.",
      },
      { property: "og:title", content: "Checklist de Seguridad Institucional" },
      {
        property: "og:description",
        content: "Doce controles verificables en diez minutos, con categoría y estado.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Checklist de Seguridad Institucional", path: "/recursos/checklist-seguridad" },
        ]),
      ),
    ],
  }),
});

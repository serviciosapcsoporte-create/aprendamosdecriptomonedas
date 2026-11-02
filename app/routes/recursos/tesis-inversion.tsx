import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("tesis-inversion") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/tesis-inversion")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Plantilla de Tesis de Inversión e Invalidación | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Documenta tesis, catalizador, métrica de validación y precio de invalidación antes de entrar. Descarga gratis en CSV, Excel y PDF.",
      },
      { property: "og:title", content: "Plantilla de Tesis de Inversión" },
      {
        property: "og:description",
        content: "La tesis se escribe antes de comprar. La invalidación, también.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Tesis de Inversión", path: "/recursos/tesis-inversion" },
        ]),
      ),
    ],
  }),
});

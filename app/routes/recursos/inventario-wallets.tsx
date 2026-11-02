import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("inventario-wallets") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/inventario-wallets")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Inventario de Wallets y Cold Storage | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Cuánto capital tienes en exchanges y cuánto bajo tu custodia, con respaldo verificado. Descarga gratis en CSV, Excel y PDF.",
      },
      { property: "og:title", content: "Inventario de Wallets y Cold Storage" },
      {
        property: "og:description",
        content: "Balance real por wallet: tipo, dónde vive, cuánto guarda y si probaste el respaldo.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Inventario de Wallets", path: "/recursos/inventario-wallets" },
        ]),
      ),
    ],
  }),
});

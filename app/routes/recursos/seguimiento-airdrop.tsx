import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("seguimiento-airdrop") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/seguimiento-airdrop")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Seguimiento de Airdrops y Points Farming | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Controla puntos, gas invertido y frecuencia de interacción por protocolo pre-token. Descarga gratis en CSV, Excel y PDF.",
      },
      { property: "og:title", content: "Seguimiento de Airdrops y Points Farming" },
      {
        property: "og:description",
        content: "Cuánto gas llevas invertido por cuántos puntos, sin perder la cartera asociada.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Seguimiento de Airdrops", path: "/recursos/seguimiento-airdrop" },
        ]),
      ),
    ],
  }),
});

import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("plantilla-analisis-wallet") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/plantilla-analisis-wallet")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Plantilla de Análisis de Wallet (CSV, Excel y PDF) | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Audita una wallet con 13 campos: antigüedad, cadencia, saldo, contratos y riesgo CEX. Descarga gratis en CSV, Excel con fórmulas y PDF.",
      },
      { property: "og:title", content: "Plantilla de Análisis de Wallet" },
      {
        property: "og:description",
        content: "Antigüedad, cadencia, saldo y riesgo CEX de una wallet en una sola tabla.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Plantilla de Análisis de Wallet", path: "/recursos/plantilla-analisis-wallet" },
        ]),
      ),
    ],
  }),
});

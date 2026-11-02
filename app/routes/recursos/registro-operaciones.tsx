import { createFileRoute } from "@tanstack/react-router";
import { PlantillaLanding } from "@/components/PlantillaLanding";
import { plantillaPorSlug, type PlantillaRecurso } from "@/data/recursos-plantillas";
import { jsonLd, breadcrumbLd } from "@/lib/seo";

const plantilla = plantillaPorSlug("registro-operaciones") as PlantillaRecurso;

export const Route = createFileRoute("/recursos/registro-operaciones")({
  component: () => <PlantillaLanding plantilla={plantilla} />,
  head: () => ({
    title: "Registro de Operaciones y Trading Log | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Registra cada entrada, stop y resultado con su justificación táctica. Descarga gratis en CSV, Excel con fórmulas y PDF.",
      },
      { property: "og:title", content: "Registro de Operaciones y Trading Log" },
      {
        property: "og:description",
        content: "Fecha, precio real, stop y la razón de la decisión: todo en una fila.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Recursos", path: "/recursos" },
          { name: "Registro de Operaciones", path: "/recursos/registro-operaciones" },
        ]),
      ),
    ],
  }),
});

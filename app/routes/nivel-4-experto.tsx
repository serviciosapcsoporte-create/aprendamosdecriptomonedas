// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/nivel-4-experto")({
  component: Nivel4Page,
  head: () => ({
    meta: [
      { title: "NIVEL 4 — Experto | Sistemas Distribuidos, DeFi Profesional, Escalabilidad" },
      {
        name: "description",
        content:
          "Nivel 4 Experto: Sistemas distribuidos, DeFi profesional, escalabilidad compleja y agentes autónomos. Contenido premium.",
      },
      { name: "keywords", content: "curso sistemas distribuidos, defi profesional, zk rollup, cross chain messaging" },
      { property: "og:title", content: "NIVEL 4 — Experto | $39 pago único vía systeme.io" },
      {
        property: "og:description",
        content:
          "13 temas de nivel experto: ZK-tech, trading algorítmico y DeFi profesional. Pago único de $39 USD, acceso de por vida.",
      },
      { property: "og:image", content: "/sales/nivel-4.png" },
    ],
  }),
});

function Nivel4Page() {
  const offer = salesOffers["nivel-4"];

  return (
    <>
      <Header />
      <LevelSalesPage offer={offer} />
      <Footer />
    </>
  );
}
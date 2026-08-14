// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/el-inversor-que-sobrevive")({
  component: ElInversorPage,
  head: () => ({
    meta: [
      { title: "El Inversor que Sobrevive | Guía GRATIS de inversión a largo plazo" },
      {
        name: "description",
        content:
          "Cómo invertir en cripto pensando en años, no en tweets. Guía de inversión a mediano/largo plazo. Gratis.",
      },
      { name: "keywords", content: "inversión, largo plazo, tokenomics, análisis on-chain, portfolio, crypto" },
      { property: "og:title", content: "El Inversor que Sobrevive | GRATIS" },
      {
        property: "og:description",
        content:
          "Guía de inversión cripto a largo plazo: análisis de redes, tokenomics y construcción de portafolio. PDF gratis.",
      },
      { property: "og:image", content: "/sales/el-inversor-que-sobrevive-infografia.svg" },
    ],
  }),
});

function ElInversorPage() {
  const offer = salesOffers["el-inversor"];
  return (
    <>
      <Header />
      <LevelSalesPage offer={offer} />
      <Footer />
      {/* Payhip Embed - Reemplaza "Fakj4" con el data-key real de cada producto en Payhip */}
      <div class="payhip-embed-page" data-key="Fakj4"></div>
      <script async src="https://payhip.com/embed-page.js?v=24u68985"></script>
    </>
  );
}
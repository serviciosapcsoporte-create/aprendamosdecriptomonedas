// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/checklist-de-supervivencia-cripto")({
  component: ChecklistPage,
  head: () => ({
    meta: [
      { title: "Checklist de Supervivencia Cripto | Guía GRATIS para no perder todo" },
      {
        name: "description",
        content:
          "10 pasos de supervivencia para navegar el ciclo cripto sin perder la cabeza ni el portafolio. Descargable, gratis.",
      },
      { name: "keywords", content: "checklist, supervivencia, trading, riesgo, mindset, psicología, inversión, tutorial" },
      { property: "og:title", content: "Checklist de Supervivencia Cripto | GRATIS" },
      {
        property: "og:description",
        content:
          "10 pasos para no perder la cabeza (ni el portfolio) en cripto. Checklist + mindset. PDF gratis.",
      },
      { property: "og:image", content: "/sales/checklist-de-supervivencia-cripto-infografia.svg" },
    ],
  }),
});

function ChecklistPage() {
  const offer = salesOffers["el-checklist"];
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
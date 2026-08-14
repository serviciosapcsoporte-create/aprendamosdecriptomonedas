// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/el-escudo-de-5-minutos")({
  component: ElEscudoPage,
  head: () => ({
    meta: [
      { title: "El Escudo de 5 minutos | Checklist GRATIS de seguridad wallet" },
      {
        name: "description",
        content:
          "Protegé tu cartera en menos de 5 minutos con este checklist express de seguridad. Descargable, gratis.",
      },
      { name: "keywords", content: "seguridad, checklist, wallet, claves, backup, hardware wallet, protección" },
      { property: "og:title", content: "El Escudo de 5 minutos | Checklist GRATIS" },
      {
        property: "og:description",
        content:
          "Checklist expres para proteger tu wallet, claves y holdings en menos de 5 minutos. PDF gratis.",
      },
      { property: "og:image", content: "/sales/el-escudo-de-5-minutos-infografia.svg" },
    ],
  }),
});

function ElEscudoPage() {
  const offer = salesOffers["el-escudo"];
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
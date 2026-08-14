// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/el-custodio-de-su-propiedad-libertad")({
  component: ElCustodioPage,
  head: () => ({
    meta: [
      { title: "El Custodio de su propia Libertad | Guía GRATIS de wallet y privacidad" },
      {
        name: "description",
        content:
          "Reclamá el control de tus claves, dinero y privacidad en cripto. Guía práctica GRATIS sobre wallet, backups y seguridad.",
      },
      { name: "keywords", content: "wallet, custodia, claves privadas, privacidad, backup, hardware wallet, tutorial" },
      { property: "og:title", content: "El Custodio de su propia Libertad | GRATIS" },
      {
        property: "og:description",
        content:
          "Guía práctica para gestionar tu propio wallet, claves privadas y backups. Descargable en PDF, gratis.",
      },
      { property: "og:image", content: "/sales/el-custodio-de-su-propiedad-libertad-infografia.svg" },
    ],
  }),
});

function ElCustodioPage() {
  const offer = salesOffers["el-custodio"];
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
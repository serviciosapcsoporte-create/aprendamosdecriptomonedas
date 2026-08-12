// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/nivel-5-especializaciones")({
  component: Nivel5Page,
  head: () => ({
    meta: [
      { title: "NIVEL 5 — Especializaciones | Trading, Minería, Desarrollo, Gobernanza" },
      {
        name: "description",
        content:
          "Nivel 5 Especializaciones: Trading con gestión de riesgo, minería, desarrollo en Solidity/Rust, gobernanza DAO y infraestructura Web3. Contenido premium.",
      },
      { name: "keywords", content: "curso trading riesgo, minería criptomonedas, solidity rust, gobernanza dao, infraestructura web3" },
      { property: "og:title", content: "NIVEL 5 — Especializaciones | $45 pago único vía systeme.io" },
      {
        property: "og:description",
        content:
          "11 especializaciones de vanguardia: Ethereum Scaling, Blockchain Modular y marco regulatorio. Pago único de $45 USD, acceso de por vida.",
      },
      { property: "og:image", content: "/sales/nivel-5.png" },
    ],
  }),
});

function Nivel5Page() {
  const offer = salesOffers["nivel-5"];

  return (
    <>
      <Header />
      <LevelSalesPage offer={offer} />
      <Footer />
    </>
  );
}
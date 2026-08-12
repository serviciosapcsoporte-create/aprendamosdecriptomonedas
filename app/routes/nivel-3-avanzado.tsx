// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { salesOffers } from "@/data/sales";
import { LevelSalesPage } from "@/components/LevelSalesPage";

export const Route = createFileRoute("/nivel-3-avanzado")({
  component: Nivel3Page,
  head: () => ({
    meta: [
      { title: "NIVEL 3 — Avanzado | Criptografía, Arquitectura, Token Engineering" },
      {
        name: "description",
        content:
          "Nivel 3 Avanzado: Criptografía avanzada, arquitectura blockchain, ingeniería de tokens y smart contracts avanzados. Contenido premium.",
      },
      { name: "keywords", content: "curso criptografia avanzada, arquitectura blockchain, token engineering, zk proofs" },
      { property: "og:title", content: "NIVEL 3 — Avanzado | Gratis con registro en systeme.io" },
      {
        property: "og:description",
        content:
          "Desbloquea 18 temas avanzados: DeFi profundo, trading con gestión de riesgo y Layer 2. Gratis, acceso de por vida.",
      },
      { property: "og:image", content: "/sales/nivel-3.png" },
    ],
  }),
});

function Nivel3Page() {
  const offer = salesOffers["nivel-3"];

  return (
    <>
      <Header />
      <LevelSalesPage offer={offer} />
      <Footer />
    </>
  );
}
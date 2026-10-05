/* Página de inicio redesign ILAB Italian Style
   - Mantiene la arquitectura de información existente (múltiples páginas/niveles)
   - Aplica estilo visual "sartorial" italiano con estética minimalista
   - Usa componentes reutilizables: AnimatedSection, ElegantHeading, Header (misma nav que el resto del sitio)
   - Animaciones de entrada en viewport para todos los elementos
   - No es One-Page: cada sección mantiene su estructura separada
*/
// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { Medallion } from "@/components/Medallion";
import { Header, Footer } from "@/components/Header";

import { canonical, OG_IMAGE } from "@/lib/seo";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Aprendamos de Criptomonedas | Educación cripto sin humo",
    meta: [
      { name: "description", content: "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero. +76 temas en 5 niveles,  desde conceptos básicos hasta análisis on-chain avanzado." },
      { name: "author", content: "Alejandro Piraquive" },
      { property: "og:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      { property: "og:description", content: "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero. +76 temas en 5 niveles,  desde conceptos básicos hasta análisis on-chain avanzado." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/") },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aprendamos de Criptomonedas: educación cripto en español" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      { name: "twitter:description", content: "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero. +76 temas en 5 niveles,  desde conceptos básicos hasta análisis on-chain avanzado." },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:creator", content: "@AprendamosCripto" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    ],
  }),
});

function Index() {
  const niveles = [
    {
      n: 1,
      href: "/nivel-1-principiante",
      titulo: "Nivel 1 — Principiante",
      desc: "Conceptos fundamentales, seguridad y primeros pasos",
      temas: "15 temas · Fundamentos criptográficos, wallets, seguridad inicial",
    },
    {
      n: 2,
      href: "/nivel-2-intermedio",
      titulo: "Nivel 2 — Intermedio",
      desc: "Blockchain técnica, smart contracts, DeFi básico",
      temas: "18 temas · Smart contracts, economía cripto, trading básico",
    },
    {
      n: 3,
      href: "/nivel-3-avanzado",
      titulo: "Nivel 3 — Avanzado",
      desc: "DeFi avanzado, trading, cross-chain, análisis on-chain",
      temas: "18 temas · Trading avanzado, cross-chain, Ethereum scaling",
    },
    {
      n: 4,
      href: "/nivel-4-experto",
      titulo: "Nivel 4 — Experto",
      desc: "ZK-tech, custodia institucional, bots de arbitraje, MEV",
      temas: "13 temas · ZK-rollups, trading algorítmico, seguridad avanzada",
    },
    {
      n: 5,
      href: "/nivel-5-especializaciones",
      titulo: "Nivel 5 — Especializado",
      desc: "ZK programming, modular chains, EigenLayer, regulación global",
      temas: "11 temas · StarkNet/Cairo, account abstraction, regulación",
    },
  ];

  return (
    <>
      <Header />

      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        {/* Hero Section con AnimatedSection */}
        <AnimatedSection
          animation="fade-in-up"
          delay={0}
          className="relative z-10"
        >
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <ElegantHeading as="h1" className="mb-6 text-[length:var(--heading-text-size)] sm:text-[length:var(--heading-text-size-md)] md:text-[length:var(--heading-text-size-md)]">
                Tu ruta de aprendizaje paso a paso
                <span className="italic text-[var(--muted-foreground)]"> desde conceptos básicos hasta análisis on-chain avanzado</span>
              </ElegantHeading>

              <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-2xl">
                Domina criptomonedas, blockchain, DeFi y seguridad con 76 temas
                distribuidos en 5 niveles diseñados para construir conocimiento
                de forma progresiva. Sin influencers, sin promesas, solo educación real.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("curriculum");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-dark)]"
                >
                  Empezar ahora →
                </button>
                <Link
                  to="/nivel-1-principiante"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-7 py-3 text-base font-medium text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)]"
                >
                  Ver ruta →
                </Link>
              </div>
            </div>

            <Medallion className="w-[min(70vw,360px)] lg:w-[min(34vw,420px)]" />
          </div>
        </AnimatedSection>

        {/* Currículum Section con animaciones escalonadas */}
        <AnimatedSection
          animation="fade-in-up"
          delay={0.2}
          className="relative z-10 scroll-mt-24"
          id="curriculum"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <ElegantHeading as="h2" className="mb-8 text-[length:var(--heading-text-size)]">
              Elige tu nivel para empezar
            </ElegantHeading>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {niveles.map((nivel) => (
                <Link
                  key={nivel.href}
                  to={nivel.href}
                  className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-shadow hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-[var(--card-dark)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]">
                      <span className="text-sm font-bold text-white">{nivel.n}</span>
                    </div>
                    <div>
                      <ElegantHeading as="h3" className="mb-1 text-[length:var(--heading-text-size-sm)]">
                        {nivel.titulo}
                      </ElegantHeading>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {nivel.desc}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {nivel.temas}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Recursos Section */}
        <AnimatedSection
          animation="fade-in-up"
          delay={0.4}
          className="relative z-10"
        >
          <div className="container mx-auto px-4 py-16 bg-[var(--navy)] dark:bg-[var(--navy-dark)]">
            <div className="max-w-4xl mx-auto text-center">
              <ElegantHeading as="h2" className="mb-6 text-[length:var(--heading-text-size)]">
                Recursos descargables
              </ElegantHeading>
              <p className="text-[var(--muted-foreground)] text-lg mb-8 max-w-2xl mx-auto">
                Guías prácticas, checklists y plantillas para proteger tu
                inversión y optimizar tu experiencia en criptomonedas.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                <Link
                  to="/recursos"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--earth-500)] px-6 py-3 text-base font-medium text-[var(--earth-950)] hover:bg-[var(--earth-400)] transition-colors"
                >
                  Ver todos los recursos
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center rounded-md border border-[var(--border)] px-6 py-3 text-base font-medium text-[var(--muted-foreground)] hover:bg-[var(--earth-50)] transition-colors"
                >
                  Leer el blog
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </>
  );
}
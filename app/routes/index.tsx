/* Página de inicio redesign ILAB Italian Style
   - Mantiene la arquitectura de información existente (múltiples páginas/niveles)
   - Aplica estilo visual "sartorial" italiano con estética minimalista
   - Usa componentes reutilizables: AnimatedSection, ElegantHeading, MinimalistNavbar
   - Animaciones de entrada en viewport para todos los elementos
   - No es One-Page: cada sección mantiene su estructura separada
*/
// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { MinimalistNavbar } from "@/components/MinimalistNavbar";
import { Footer } from "@/components/Header";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Aprendamos de Criptomonedas | Educación cripto sin humo",
      },
      {
        name: "description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero. +75 temas en 5 niveles desde conceptos básicos hasta análisis on-chain avanzado.",
      },
      { name: "author", content: "Alejandro P." },
      {
        property: "og:title",
        content: "Aprendamos de Criptomonedas | Educación cripto sin humo",
      },
      {
        property: "og:description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
      },
      { property: "og:type", content: "website" },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Aprendamos de Criptomonedas | Educación cripto sin humo",
      },
      {
        name: "twitter:description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
      },
      {
        property: "og:image",
        content: "/social-card.png",
      },
      {
        name: "twitter:image",
        content: "/social-card.png",
      },
      {
        name: "twitter:creator",
        content: "@AprendamosCripto",
      },
      {
        property: "og:url",
        content: "https://aprendamosdecriptomonedas.lat",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large",
      },
      {
        "@type": "WebSite",
        "@id": "https://aprendamosdecriptomonedas.lat/#website",
        "name": "Aprendamos de Criptomonedas",
        "description": "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
        "url": "https://aprendamosdecriptomonedas.lat",
        "potentialAction": [{
          "@type": "SearchAction",
          "target": "https://aprendamosdecriptomonedas.lat?q={search_term_string}",
          "query": "required string {search_term_string}"
        }]
      },
      {
        name: "revisit-after",
        content: "7 days",
      },
    ],
  }),
});

function Index() {
  const navbarLinks = [
    { href: "/nivel-1-principiante", label: "Nivel 1 — Principiante", badge: "free" },
    { href: "/nivel-2-intermedio", label: "Nivel 2 — Intermedio", badge: "free" },
    { href: "/nivel-3-avanzado", label: "Nivel 3 — Avanzado", badge: "free" },
    { href: "/nivel-4-experto", label: "Nivel 4 — Experto", badge: "free" },
    { href: "/nivel-5-especializaciones", label: "Nivel 5 — Especializaciones", badge: "free" },
    { href: "/blog", label: "Blog", badge: "new" },
    { href: "/recursos", label: "Recursos", badge: undefined },
    { href: "/acerca-de", label: "Acerca de mí", badge: undefined },
  ];

  return (
    <>
      {/* MinimalistNavbar con efecto scroll */}
      <MinimalistNavbar
        logo="Aprendamos"
        links={navbarLinks}
        onScroll={() => {}}
      />

      <main className="flex-1 bg-background">
        {/* Hero Section con AnimatedSection */
        <AnimatedSection
          animation="fade-in-up"
          delay="0"
          className="relative z-10"
        >
          <div className="container mx-auto px-4 max-w-2xl">
            <ElegantHeading as="h1" className="mb-6 text-[var(--heading-text-size)] sm:text-[var(--heading-text-size-md)] md:text-[var(--heading-text-size-lg)]">
              Tu ruta de aprendizaje paso a paso
              <span className="italic text-[var(--muted-foreground)]">desde conceptos básicos hasta análisis on-chain avanzado</span>
            </ElegantHeading>

            <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-2xl">
              Domina criptomonedas, blockchain, DeFi y seguridad con 75 temas
              distribuidos en 5 niveles diseñados para construir conocimiento
              progressively. Sin influencers, sin promesas, solo educación real.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => {
                  const el = document.getElementById("curriculum");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-base font-bold text-[var(--primary-foreground)] transition-all hover:bg-[var(--primary-dark)]"
              >
                Empezar ahora →
              </button>
              <Link
                to="/nivel-1-principiante"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-7 py-3 text-base font-medium text-[var(--muted-foreground)] transition-all hover:border-[var(--primary)]"
              >
                Ver ruta →
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Currículum Section con animaciones escalonadas */}
        <AnimatedSection
          animation="fade-in-up"
          delay="0.2"
          className="relative z-10"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <ElegantHeading as="h2" className="mb-8 text-[var(--heading-text-size)]">
              Tu ruta de aprendizaje paso a paso
            </ElegantHeading>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Nivel 1 - Principiante */}
              <div className="group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-xl border border-[var(--border)] p-6 hover:shadow-soft transition-all group-hover:shadow-soft-lg cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <ElegantHeading as="h3" className="mb-1 text-[var(--heading-text-size-sm)]">
                      Nivel 1 — Principiante
                    </ElegantHeading>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Conceptos fundamentales, seguridad y primeros pasos
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  15 temas · Fundamentos criptográficos, wallets, seguridad inicial
                </p>
              </div>

              {/* Nivel 2 - Intermedio */}
              <div className="group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-xl border border-[var(--border)] p-6 hover:shadow-soft transition-all group-hover:shadow-soft-lg cursor-pointer" style="animation-delay: 0.1s;">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <ElegantHeading as="h3" className="mb-1 text-[var(--heading-text-size-sm)]">
                      Nivel 2 — Intermedio
                    </ElegantHeading>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Blockchain técnica, smart contracts, DeFi básico
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  18 temas · Smart contracts, economía cripto, trading básico
                </p>
              </div>

              {/* Nivel 3 - Avanzado */}
              <div className="group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-xl border border-[var(--border)] p-6 hover:shadow-soft transition-all group-hover:shadow-soft-lg cursor-pointer" style="animation-delay: 0.2s;">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <ElegantHeading as="h3" className="mb-1 text-[var(--heading-text-size-sm)]">
                      Nivel 3 — Avanzado
                    </ElegantHeading>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      DeFi avanzado, trading, cross-chain, análisis on-chain
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  18 topics · Trading avanzado, cross-chain, Ethereum scaling
                </p>
              </div>

              {/* Nivel 4 - Experto */}
              <div className="group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-xl border border-[var(--border)] p-6 hover:shadow-soft transition-all group-hover:shadow-soft-lg cursor-pointer" style="animation-delay: 0.3s;">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <ElegantHeading as="h3" className="mb-1 text-[var(--heading-text-size-sm)]">
                      Nivel 4 — Experto
                    </ElegantHeading>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      ZK-tech, custodia institucional, bots de arbitraje, MEV
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  13 temas · ZK-rollups, trading algorítmico, seguridad avanzada
                </p>
              </div>

              {/* Nivel 5 - Especializado */}
              <div className="group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-xl border border-[var(--border)] p-6 hover:shadow-soft transition-all group-hover:shadow-soft-lg cursor-pointer" style="animation-delay: 0.4s;">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                  <div>
                    <ElegantHeading as="h3" className="mb-1 text-[var(--heading-text-size-sm)]">
                      Nivel 5 — Especializado
                    </ElegantHeading>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      ZK programming, modular chains, EigenLayer, regulación global
                    </p>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm">
                  11 topics · StarkNet/Cairo, account abstraction, regulación
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Recursos Section */
        <AnimatedSection
          animation="fade-in-up"
          delay="0.4"
          className="relative z-10"
        >
          <div className="container mx-auto px-4 py-16 bg-[var(--navy)] dark:bg-[var(--navy-dark)]">
            <div className="max-w-4xl mx-auto text-center">
              <ElegantHeading as="h2" className="mb-6 text-[var(--heading-text-size)]">
                Recursos descargables
              </ElegantHeading>
              <p className="text-[var(--muted-foreground)] text-lg mb-8 max-w-2xl mx-auto">
                Guías prácticas, checklists y plantillas para proteger tu
                inversión y optimizar tu experiencia en criptomonedas.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                <a
                  href="/recursos"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--earth-500)] px-6 py-3 text-base font-medium text-[var(--earth-950)] hover:bg-[var(--earth-400)] transition-colors"
                >
                  Ver todos los recursos
                </a>
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
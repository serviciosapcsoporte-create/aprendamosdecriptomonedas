// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { cn } from "@/lib/utils";

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
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
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
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Aprendamos de Criptomonedas | Educación cripto sin humo",
      },
      {
        name: "twitter:description",
        content: "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7761f8623acca94de589ec90167f0983/id-preview-a5c283a1--d62faac5-e5fb-4752-bf05-f063dd5d4030.lovable.app-1786283217978.png",
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7761f8623acca94de589ec90167f0983/id-preview-a5c283a1--d62faac5-e5fb-4752-bf05-f063dd5d4030.lovable.app-1786283217978.png",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative">
            <div className="mb-8">
              <img
                src="/logo-white.png"
                alt="Aprendamos de Criptomonedas"
                className="mx-auto h-20 w-auto mb-6 animate-pulse-glow drop-shadow-[0_0_24px_rgba(0,240,255,0.35)]"
                loading="eager"
              />
              <span className="neon-chip mb-5">Curso gratuito · En español · Sin humo</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-glow mb-4">
                PLAN EDUCATIVO COMPLETO
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4">
                BLOCKCHAIN &amp; CRIPTOMONEDAS
              </h2>
              <p className="text-lg text-muted-foreground">
                Educación segura · Estrategia clara · Sin humo
              </p>
            </div>

            <div className="mt-16">
              <button
                onClick={() => {
                  const el = document.getElementById("curriculum");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-cyber text-base"
              >
                Empezar ahora
              </button>
            </div>
          </div>
        </section>

        <section id="curriculum" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-amber-600 mb-2">
                5 niveles · 75 temas (15 + 18 + 18 + 13 + 11)
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Tu ruta de aprendizaje paso a paso
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Desde los conceptos fundamentales hasta la ingeniería de tokens
                y sistemas distribuidos. Cada nivel está diseñado para construir
                sobre el anterior.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <LevelCard
                level="NIVEL 1"
                title="Principiante"
                description="Entiende lo esencial y entra al ecosistema sin riesgos."
                topics={["Conceptos Fundamentales", "Seguridad Inicial", "Primeros Pasos"]}
                href="/nivel-1-principiante"
                badge="free"
              />
              <LevelCard
                level="NIVEL 2"
                title="Intermedio"
                description="Habilidades técnicas para operar de forma autónoma."
                topics={["Blockchain Técnica", "Smart Contracts", "Economía Cripto", "DeFi"]}
                href="/nivel-2-intermedio"
                badge="register"
              />
              <LevelCard
                level="NIVEL 3"
                title="Avanzado"
                description="DEXs, DeFi, trading y análisis on-chain."
                topics={["DEXs Avanzados", "DeFi 2.0", "Trading Avanzado", "Cross-Chain"]}
                href="/nivel-3-avanzado"
                badge="register"
              />
              <LevelCard
                level="NIVEL 4"
                title="Experto"
                description="ZK-Tech, custodia, estrategias avanzadas y arquitectura."
                topics={["ZK-Rollups", "Arbitrum/Optimism", "Custodia", "Bots de Arbitraje"]}
                href="/nivel-4-experto"
                badge="paid"
              />
              <LevelCard
                level="NIVEL 5"
                title="Especializado"
                description="ZK programming, modular chains, EigenLayer y regulación."
                topics={["StarkNet/Cairo", "Account Abstraction", "EigenLayer", "Regulación Global"]}
                href="/nivel-5-especializaciones"
                badge="paid"
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-br from-navy to-navy-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Recursos descargables
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Guías prácticas, checklists y plantillas para proteger tu inversión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/recursos"
                className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-base font-medium text-navy hover:bg-amber-400"
              >
                Ver todos los recursos
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-md border border-cyan-400/40 px-6 py-3 text-base font-medium text-white hover:bg-cyan-400/10 transition-colors"
              >
                Leer el blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function LevelCard({
  level,
  title,
  description,
  topics,
  href,
  badge,
}: {
  level: string;
  title: string;
  description: string;
  topics: string[];
  href: string;
  badge: "free" | "register" | "paid";
}) {
  return (
    <Link to={href} className="group block">
      <div className="glass-card flex flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-muted-foreground">{level}</span>
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
              badge === "free"
                ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                : badge === "register"
                ? "border-violet-400/50 bg-violet-500/15 text-violet-300"
                : "border-amber-400/40 bg-amber-400/10 text-amber-300",
            )}
          >
            {badge === "free" ? "GRATIS" : badge === "register" ? "REGISTRO" : "PREMIUM"}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-neon">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <span className="text-sm font-medium text-neon mt-auto">Ver contenido →</span>
      </div>
    </Link>
  );
}

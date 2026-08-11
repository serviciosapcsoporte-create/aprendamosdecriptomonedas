// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Layers, Route as RouteIcon, Shield, Cog } from "lucide-react";

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
        <section className="relative overflow-hidden bg-[#080d1a] py-16 md:py-24">
          <div className="absolute inset-0 cyber-grid" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="relative container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">
              <div className="text-center lg:text-left space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 transition-colors hover:border-cyan-400/70 hover:bg-cyan-400/10">
                  <span className="text-cyan-400">•</span>
                  Plan Educativo Completo
                  <span className="text-cyan-400">•</span>
                  Blockchain &amp; Criptomonedas
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
                  Educación segura · Estrategia clara ·{" "}
                  <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(0,242,254,0.45)]">
                    Sin humo
                  </span>
                </h1>

                <p className="text-base md:text-lg text-[#94a3b8] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Aprende Web3 como un ingeniero. Sin influencers, sin promesas.
                  Fundamentos criptográficos, estrategia on-chain y ejecución
                  profesional.
                </p>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  5 niveles · 75 temas (15 + 18 + 18 + 13 + 11)
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => {
                      const el = document.getElementById("curriculum");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00f2fe] px-7 py-3 text-base font-bold text-black transition-all hover:bg-[#33f5ff] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)]"
                  >
                    Empezar ahora
                  </button>
                  <Link
                    to="/nivel-1-principiante"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur px-7 py-3 text-base font-medium text-white transition-all hover:border-cyan-400/60 hover:bg-cyan-400/10"
                  >
                    <RouteIcon className="h-4 w-4 text-cyan-400" />
                    Ver ruta
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-slate-400" />
                    Educación, no asesoría
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Cog className="h-3.5 w-3.5 text-slate-400" />
                    On-chain first
                  </span>
                </div>
              </div>

              <div className="relative flex items-center justify-center py-6">
                <div className="absolute h-72 w-72 rounded-full bg-cyan-500/20 blur-[80px]" />
                <div className="absolute h-64 w-64 rounded-full border border-cyan-400/25" />
                <div className="absolute h-80 w-80 rounded-full border border-dashed border-cyan-400/15 animate-[spin_24s_linear_infinite]" />
                <div className="absolute h-96 w-96 rounded-full border border-cyan-400/5" />
                <img
                  src="/logo.png"
                  alt="Aprendamos de Criptomonedas"
                  className="relative h-44 w-auto animate-float drop-shadow-[0_0_30px_rgba(0,242,254,0.55)]"
                  loading="eager"
                />
              </div>
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
                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-white hover:bg-white/10"
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
      <div className="flex flex-col p-6 bg-white dark:bg-card rounded-lg border shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-1">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-muted-foreground">{level}</span>
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
              badge === "free"
                ? "bg-green-100 text-green-800 border-green-200"
                : badge === "register"
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-amber-100 text-amber-800 border-amber-200",
            )}
          >
            {badge === "free" ? "GRATIS" : badge === "register" ? "REGISTRO" : "PREMIUM"}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <span className="text-sm font-medium text-primary mt-auto">Ver contenido →</span>
      </div>
    </Link>
  );
}

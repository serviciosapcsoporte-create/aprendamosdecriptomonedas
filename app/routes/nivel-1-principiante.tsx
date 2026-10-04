// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { navItems } from "@/lib/nav-items";

import { jsonLd, courseLd, breadcrumbLd } from "@/lib/seo";
import { AffiliateCta } from "@/components/AffiliateCta";
export const Route = createFileRoute("/nivel-1-principiante")({
  component: Nivel1Page,
  head: () => ({
    title: "NIVEL 1 — Principiante | Curso Blockchain & Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Nivel 1: Conceptos Fundamentales, Seguridad Inicial y Primeros Pasos Prácticos. Entra al ecosistema cripto sin riesgos.",
      },
    ],
    scripts: [jsonLd(
      courseLd({ name: "Nivel 1 · Principiante", description: "Ruta guiada de Nivel 1 · Principiante con lecciones gratuitas y material descargable.", path: "/nivel-1-principiante", level: "Nivel 1 · Principiante" }),
      breadcrumbLd([{ name: "Inicio", path: "/" }, { name: "Nivel 1 · Principiante", path: "/nivel-1-principiante" }]),
    )],
  }),
});

function Nivel1Page() {
  const nivel1 = navItems.find((n) => n.href === "/nivel-1-principiante");
  const sections = nivel1?.children || [];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-3xl font-bold text-warning mb-2 block">NIVEL 1</span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Principiante</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Objetivo: que cualquier persona entienda lo esencial y pueda entrar
            al ecosistema sin riesgos. Todo el contenido del Nivel 1 es completamente gratis.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.href} className="mb-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">{section.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.children?.map((topic) => (
                <Link
                  key={topic.href}
                  to={topic.href}
                  className="group p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getTopicDescription(topic.href)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

                <div className="mt-16 bg-gradient-to-r from-warning/10 to-warning/15 dark:from-warning/10 dark:to-warning/5 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Guías gratuitas</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Refuerza tu aprendizaje con nuestras guías de seguridad y control.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/recursos/el-escudo-de-5-minutos"
              className="inline-flex items-center justify-center rounded-md bg-warning px-4 py-2 text-sm font-medium text-navy hover:bg-warning/70"
            >
              El Escudo de 5 minutos (GRATIS)
            </a>
            <a
              href="/recursos/checklist-supervivencia-cripto"
              className="inline-flex items-center justify-center rounded-md bg-warning px-4 py-2 text-sm font-medium text-navy hover:bg-warning/70"
            >
              Checklist de Supervivencia Cripto (GRATIS)
            </a>
          </div>
        </div>
        <AffiliateCta nivel="1" />
      </main>
      <Footer />
    </>
  );
}

function getTopicDescription(href: string): string {
  const descriptions: Record<string, string> = {
    "/nivel-1/que-es-blockchain": "Entiende qué es una cadena de bloques y por qué es revolucionaria.",
    "/nivel-1/como-funciona-un-bloque": "Aprende cómo se estructura un bloque y cómo se enlazan entre sí.",
    "/nivel-1/mineria-validacion": "Descubre cómo se validan las transacciones y se crean nuevos bloques.",
    "/nivel-1/wallets": "Hot, cold, custodial y non-custodial. Elige la opción correcta para ti.",
    "/nivel-1/claves-publicas-privadas": "Entiende la diferencia entre claves públicas y privadas.",
    "/nivel-1/transacciones-fees": "Cómo funcionan las transacciones y por qué hay fees.",
    "/nivel-1/que-es-token-cripto": "¿Qué diferencia hay entre un token y una criptomoneda?",
    "/nivel-1/buenas-practicas": "Protege tus fondos con estas reglas básicas de seguridad.",
    "/nivel-1/evitar-estafas": "Cómo reconocer estafas comunes y protegerte.",
    "/nivel-1/cex-vs-dex": "Diferencias entre exchanges centralizados y descentralizados.",
    "/nivel-1/seed-phrase-backups": "Cómo respaldar tu seed phrase y por qué es crítico.",
    "/nivel-1/crear-wallet": "Guía paso a paso para crear tu primera wallet.",
    "/nivel-1/hacer-transaccion": "Cómo enviar y recibir criptomonedas de forma segura.",
    "/nivel-1/entender-red": "EVM vs redes no EVM: qué necesitas saber.",
    "/nivel-1/leer-transaccion-explorer": "Cómo interpretar una transacción en un explorador de bloques.",
  };
  return descriptions[href] || "Contenido educativo sobre criptomonedas.";
}

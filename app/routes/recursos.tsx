// @ts-nocheck
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { GUIA_CUBIERTA, GUIA_CUBIERTA_ALT } from "@/data/assets3d";
import { PLANTILLAS } from "@/data/recursos-plantillas";
import {
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/recursos")({
  component: RecursosPage,
  head: () => ({
    title:
      "Recursos | Guías, Checklists y Descargas | Aprendamos de Criptomonedas",
    meta: [
      {
        name: "description",
        content:
          "Descarga guías, checklists y recursos para proteger tu inversión en criptomonedas. Guías de seguridad, estrategia y más.",
      },
    ],
  }),
});

function RecursosPage() {
  // /recursos es la ruta padre de /recursos/<slug>. El indice de guias se
  // dibuja solo en /recursos; en una guia se dibuja la guia (Outlet).
  const isIndex = useRouterState({
    select: (s) =>
      s.location.pathname === "/recursos" ||
      s.location.pathname === "/recursos/",
  });

  return (
    <>
      <Header />
      <main
        id="contenido"
        tabIndex={-1}
        className="flex-1 container mx-auto px-4 py-12"
      >
        {isIndex && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Recursos</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Guías, checklists y plantillas para proteger tu inversión y
                operar con confianza.
              </p>
            </div>

            <div className="mb-8 flex flex-col items-start justify-between gap-3 rounded-xl border border-warning/30 bg-card px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">Kit Institucional: 8 plantillas de trabajo</h2>
                <p className="text-sm text-muted-foreground">
                  Cada plantilla tiene su página con el esquema de columnas, un ejemplo y
                  descarga en CSV, Excel con fórmulas y PDF.
                </p>
              </div>
              <a
                href="/recursos/paquete-plantillas-csv.zip"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                <Download className="h-4 w-4" />
                Descargar ZIP
              </a>
            </div>

            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PLANTILLAS.map((p) => (
                <a
                  key={p.slug}
                  href={`/recursos/${p.slug}`}
                  className="group flex flex-col rounded-lg border bg-card p-5 transition-colors hover:border-warning/40"
                >
                  <span className="mb-2 w-fit rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
                    {p.badge}
                  </span>
                  <h3 className="mb-1 text-sm font-bold leading-snug group-hover:text-warning">
                    {p.nombre}
                  </h3>
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {p.resumen}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
                    CSV · Excel · PDF
                  </span>
                </a>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="El Escudo de 5 minutos"
                description="La rutina mínima de seguridad que puedes aplicar hoy en cinco minutos."
                price="GRATIS"
                badge="free"
                icon={<Lock className="w-6 h-6 text-success" />}
                href="/recursos/el-escudo-de-5-minutos"
                imagen={GUIA_CUBIERTA['el-escudo-de-5-minutos']}
                imagenAlt={GUIA_CUBIERTA_ALT['el-escudo-de-5-minutos']}
              />
              <ResourceCard
                title="Checklist de Supervivencia Cripto"
                description="Lista de verificación para no caer en estafas, hackeos ni decisiones impulsivas."
                price="GRATIS"
                badge="free"
                icon={<CheckCircle2 className="w-6 h-6 text-success" />}
                href="/recursos/checklist-supervivencia-cripto"
                imagen={GUIA_CUBIERTA['checklist-supervivencia-cripto']}
                imagenAlt={GUIA_CUBIERTA_ALT['checklist-supervivencia-cripto']}
              />
              <ResourceCard
                title="El Custodio de su propia Libertad"
                description="Autocustodia paso a paso: claves, semillas y errores que cuestan carteras enteras."
                price="GRATIS"
                badge="free"
                icon={<ShieldCheck className="w-6 h-6 text-success" />}
                href="/recursos/el-custodio"
                imagen={GUIA_CUBIERTA['el-custodio']}
                imagenAlt={GUIA_CUBIERTA_ALT['el-custodio']}
              />
              <ResourceCard
                title="El Inversor que Sobrevive"
                description="Gestión de riesgo y emociones para permanecer en el mercado a largo plazo."
                price="GRATIS"
                badge="free"
                icon={<BookOpen className="w-6 h-6 text-success" />}
                href="/recursos/el-inversor-que-sobrevive"
                imagen={GUIA_CUBIERTA['el-inversor-que-sobrevive']}
                imagenAlt={GUIA_CUBIERTA_ALT['el-inversor-que-sobrevive']}
              />
              <ResourceCard
                title="El Escáner"
                description="Filtros de lógica para analizar protocolos: rendimiento real vs Ponzi."
                price="GRATIS"
                badge="free"
                icon={<Eye className="w-6 h-6 text-success" />}
                href="/recursos/el-escanner"
                imagen={GUIA_CUBIERTA['el-escanner']}
                imagenAlt={GUIA_CUBIERTA_ALT['el-escanner']}
              />
              <ResourceCard
                title="Kit de Inicio Nivel 3 (PDF)"
                description="Checklist de DeFi y trading + guía de Layer 2 para empezar el Nivel Avanzado."
                price="GRATIS"
                badge="free"
                icon={<FileText className="w-6 h-6 text-success" />}
                href="/resources/kit-nivel-3.pdf"
              />
              <ResourceCard
                title="Workbook Nivel 4 (PDF)"
                description="Ejercicios y casos prácticos del nivel Experto: DeFi, rollups, MEV y seguridad."
                price="GRATIS"
                badge="free"
                icon={<FileText className="w-6 h-6 text-success" />}
                href="/recursos/workbook-nivel-4.pdf"
              />
              <ResourceCard
                title="Guía Nivel 5 (PDF)"
                description="Mapa de especializaciones: análisis on-chain, trading, desarrollo y compliance."
                price="GRATIS"
                badge="free"
                icon={<FileText className="w-6 h-6 text-success" />}
                href="/recursos/guia-nivel-5.pdf"
              />
            </div>
          </>
        )}

        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function ResourceCard({
  title,
  description,
  price,
  badge,
  icon,
  href,
  imagen,
  imagenAlt,
}: {
  title: string;
  description: string;
  price: string;
  badge: "free" | "paid";
  icon: React.ReactNode;
  href: string;
  imagen?: string;
  imagenAlt?: string;
}) {
  const isExternal = href.startsWith("/resources/") || href.endsWith(".pdf");
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card">
      {imagen && (
        <div className="relative aspect-[21/9] shrink-0 overflow-hidden bg-muted">
          <img
            src={imagen}
            alt={imagenAlt ?? ""}
            width={1200}
            height={514}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card to-transparent"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-warning/15 text-warning">
            {badge === "free" ? "GRATIS" : "PREMIUM"}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
        <div className="mb-4">
          <span className="text-xl font-bold">{price}</span>
        </div>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-warning px-4 py-2 text-sm font-medium text-navy hover:bg-warning/70"
        >
          <Download className="h-4 w-4" />
          {isExternal ? "Descargar PDF" : "Leer guía"}
        </a>
      </div>
    </div>
  );
}

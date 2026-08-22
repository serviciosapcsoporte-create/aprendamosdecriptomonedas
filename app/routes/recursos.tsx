// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { BookOpen, CheckCircle2, Download, Eye, FileText, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/recursos")({
  component: RecursosPage,
  head: () => ({
    meta: [
      { title: "Recursos | Guías, Checklists y Descargas | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content: "Descarga guías, checklists y recursos para proteger tu inversión en criptomonedas. Guías de seguridad, estrategia y más.",
      },
      { name: "keywords", content: "recursos criptomonedas, guias descargas, checklist seguridad" },
    ],
  }),
});

function RecursosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Recursos</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guías, checklists y plantillas para proteger tu inversión y operar con confianza.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="El Escudo de 5 minutos"
            description="La rutina mínima de seguridad que puedes aplicar hoy en cinco minutos."
            price="GRATIS"
            badge="free"
            icon={<Lock className="w-6 h-6 text-green-600" />}
            href="/recursos/el-escudo-de-5-minutos"
          />
          <ResourceCard
            title="Checklist de Supervivencia Cripto"
            description="Lista de verificación para no caer en estafas, hackeos ni decisiones impulsivas."
            price="GRATIS"
            badge="free"
            icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
            href="/recursos/checklist-supervivencia-cripto"
          />
          <ResourceCard
            title="El Custodio de su propia Libertad"
            description="Autocustodia paso a paso: claves, semillas y errores que cuestan carteras enteras."
            price="GRATIS"
            badge="free"
            icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
            href="/recursos/el-custodio"
          />
          <ResourceCard
            title="El Inversor que Sobrevive"
            description="Gestión de riesgo y emociones para permanecer en el mercado a largo plazo."
            price="GRATIS"
            badge="free"
            icon={<BookOpen className="w-6 h-6 text-green-600" />}
            href="/recursos/el-inversor-que-sobrevive"
          />
          <ResourceCard
            title="El Escáner"
            description="Filtros de lógica para analizar protocolos: rendimiento real vs Ponzi."
            price="GRATIS"
            badge="free"
            icon={<Eye className="w-6 h-6 text-green-600" />}
            href="/recursos/el-escanner"
          />
          <ResourceCard
            title="Kit de Inicio Nivel 3 (PDF)"
            description="Checklist de DeFi y trading + guía de Layer 2 para empezar el Nivel Avanzado."
            price="GRATIS"
            badge="free"
            icon={<FileText className="w-6 h-6 text-green-600" />}
            href="/resources/kit-nivel-3.pdf"
          />
        </div>
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
}: {
  title: string;
  description: string;
  price: string;
  badge: "free" | "paid";
  icon: React.ReactNode;
  href: string;
}) {
  const isExternal = href.startsWith("/resources/");
  return (
    <div className="flex flex-col h-full p-6 bg-card rounded-lg border">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
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
        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-navy hover:bg-amber-400"
      >
        <Download className="h-4 w-4" />
        {isExternal ? "Descargar PDF" : "Leer guía"}
      </a>
    </div>
  );
}
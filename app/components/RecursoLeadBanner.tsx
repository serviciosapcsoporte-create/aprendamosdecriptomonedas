/**
 * RecursoLeadBanner: descarga gratuita de un recurso del propio sitio.
 *
 * Va intercalado junto a los banners de Hotmart, pero con la diferencia que
 * importa: este NO es un enlace de afiliado. Es material del sitio. Por eso no
 * lleva disclosure ni tarjeta de curso, y por eso el boton va directo a la
 * pagina del recurso en vez de a una plataforma externa.
 */
import { Download } from "lucide-react";

interface RecursoLeadBannerProps {
  titulo: string;
  descripcion: string;
  href: string;
  /** Etiqueta corta del formato: "PDF + CSV", "CSV", "Guia". */
  formato?: string;
  className?: string;
}

export function RecursoLeadBanner({
  titulo,
  descripcion,
  href,
  formato,
  className = "",
}: RecursoLeadBannerProps) {
  return (
    <aside
      aria-label={`Recurso descargable: ${titulo}`}
      className={`not-prose overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-background to-primary/10 ${className}`}
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:p-6">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"
        >
          <Download className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            Descarga gratis{formato ? ` · ${formato}` : ""}
          </p>
          <h3 className="mb-1 font-serif text-lg font-medium text-foreground">{titulo}</h3>
          <p className="text-sm text-muted-foreground">{descripcion}</p>
        </div>

        <a
          href={href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Descargar
        </a>
      </div>
    </aside>
  );
}
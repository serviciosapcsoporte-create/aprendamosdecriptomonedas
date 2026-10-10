/**
 * HotmartNativeBanner: recomendacion de curso intercalada en la grilla.
 *
 * POR QUE NO ES UN "ANUNCIO"
 * El sitio es gratuito y no vende posiciones. Esto es una recomendacion de
 * afiliado: si alguien compra, el propietario gana comision. Se declara como
 * tal —en el distintivo y en el texto— porque exigirlo es condicion de Hotmart,
 * de Google en temas financieros y de la FTC, y porque una tarjeta que parece
 * publicidad pagada cuando es una recomendacion es justamente la confianza que
 * el resto del sitio intenta no gastar.
 *
 * Las cifras (rating, numero de reseñas, clases) NO se escriben aqui: salen de
 * app/data/hotmart-links.ts, que ya las verifico una por una. Poner "1.420
 * alumnos" en una tarjeta cuyo unico dato verificado es "1 reseña" es inventar.
 *
 * Sin cookie de afiliado: el link go.hotmart.com ya lleva la atribucion. No se
 * carga ningun script de Hotmart ni de terceros.
 */
import { ExternalLink } from "lucide-react";
import { cursosPorNivel, estaActivo, type CursoRecomendado } from "@/data/hotmart-links";

const REL_AFILIADO = "noopener noreferrer sponsored nofollow";

const DISCLOSURE =
  "Enlace de afiliado: si compras a través de este enlace podemos recibir una comisión, sin coste adicional para ti. No cambia el precio.";

const AVISO_RIESGO =
  "Contenido educativo. Esto no es asesoría financiera: las criptomonedas son volátiles y puedes perder dinero.";

interface HotmartNativeBannerProps {
  nivel: string;
  /** Que curso recomendar. Por defecto, el primero activo del nivel. */
  indice?: number;
  /** Imagen ilustrativa. NO es una captura del curso. */
  imagen?: string;
  className?: string;
}

export function HotmartNativeBanner({
  nivel,
  indice = 0,
  imagen = "/assets/3d/banner-portfolio-csv.webp",
  className = "",
}: HotmartNativeBannerProps) {
  const activos = (cursosPorNivel[nivel] ?? []).filter(estaActivo);
  const curso: CursoRecomendado | undefined = activos[indice];
  // Sin curso verificado el banner no se renderiza: una tarjeta de recomendacion
  // sin destino real es peor que no tener tarjeta.
  if (!curso) return null;

  return (
    <aside
      aria-label={`Curso recomendado: ${curso.curso}`}
      className={`not-prose overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 shadow-lg ${className}`}
    >
      <div className="relative p-5 md:p-6">
        <span className="absolute right-4 top-4 rounded-full border border-amber-400/60 bg-amber-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
          Recomendado · Enlace de afiliado
        </span>

        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="w-full shrink-0 md:w-56">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-slate-800">
              <img
                src={imagen}
                alt="Imagen ilustrativa del tema del curso"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={448}
                height={252}
              />
              <span className="absolute bottom-1.5 left-1.5 rounded bg-slate-950/85 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Imagen ilustrativa
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="font-bold text-amber-400">{curso.pruebaSocial}</span>
              <span className="text-slate-400">{curso.productor} · Hotmart</span>
            </p>
            <h3 className="mb-2 font-serif text-lg font-medium leading-snug text-white md:text-xl">
              {curso.curso}
            </h3>
            <p className="mb-4 text-sm text-slate-300">
              Ya lo explicamos gratis en las lecciones de este nivel. Si lo quieres
              en video, este curso {curso.porQue}.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={curso.linkVentas}
                target="_blank"
                rel={REL_AFILIADO}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition-[filter,transform] duration-150 ease-out hover-hover:brightness-110 active:scale-[0.98]"
              >
                {curso.cta}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/afiliados"
                className="text-xs text-slate-400 underline underline-offset-4 hover:text-slate-200"
              >
                Cómo funciona
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">{DISCLOSURE}</p>
        <p className="text-[11px] leading-relaxed text-slate-500">{AVISO_RIESGO}</p>
      </div>
    </aside>
  );
}
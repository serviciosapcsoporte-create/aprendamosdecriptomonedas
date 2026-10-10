/**
 * LessonCard: tarjeta de leccion con mini-portada, tiempo de lectura y estado.
 *
 * Sustituye al enlace de texto plano que habia en las grillas de nivel. Lo que
 * aporta es lo que decide si alguien hace clic o pasa de largo:
 *   - una imagen que dice de que va la leccion sin abrirla
 *   - "N min de lectura" calculado del texto real (ver minutosLectura)
 *   - [✓ Completado] / [▶ Continuar] / [Empezar], leido del progreso local
 *
 * El estado no se escribe desde la tarjeta: la grilla muestra lo que ya se
 * guardo al abrir o completar la leccion. Escribir aqui pondria "completado" a
 * algo que nadie leyo.
 */
import { Link } from "@tanstack/react-router";
import { CheckCircle2, PlayCircle, Timer } from "lucide-react";
import type { Miniatura } from "@/data/thumbnails";

interface LessonCardProps {
  href: string;
  titulo: string;
  descripcion: string;
  minutos: number;
  miniatura: Miniatura;
  estado?: "en-curso" | "completado" | null;
  /** Indice de la leccion dentro del nivel, para "Leccion N". */
  numero?: number;
  /** La leccion tiene video grabado (dato real del campo `video` del tema). */
  tieneVideo?: boolean;
}

function EstadoPill({ estado }: { estado?: "en-curso" | "completado" | null }) {
  if (estado === "completado") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        Completado
      </span>
    );
  }
  if (estado === "en-curso") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
        <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
        Continuar
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
      Empezar
    </span>
  );
}

export function LessonCard({
  href,
  titulo,
  descripcion,
  minutos,
  miniatura,
  estado,
  numero,
  tieneVideo,
}: LessonCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-200 ease-out hover-hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-card-dark"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={miniatura.src}
          alt={miniatura.alt}
          className={
            miniatura.ajuste === "contain"
              ? "h-full w-full object-contain p-3"
              : "h-full w-full object-cover transition-transform duration-500 ease-out group-hover-hover:scale-105"
          }
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
        />
        {estado === "completado" && (
          <span
            className="absolute right-2 top-2 rounded-full bg-success p-1.5 text-white shadow"
            aria-hidden="true"
          >
            <CheckCircle2 className="h-4 w-4" />
          </span>
        )}
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
          <Timer className="h-3 w-3" aria-hidden="true" />
          {minutos} min de lectura
        </span>
        {tieneVideo && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-primary/90 px-2 py-1 text-[11px] font-semibold text-primary-foreground backdrop-blur">
            <PlayCircle className="h-3 w-3" aria-hidden="true" />
            Video
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          {typeof numero === "number" && (
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Leccion {numero}
            </span>
          )}
          <EstadoPill estado={estado} />
        </div>
        <h3 className="mb-2 font-serif text-lg font-medium leading-snug text-foreground group-hover-hover:text-primary">
          {titulo}
        </h3>
        <p className="text-sm text-muted-foreground">{descripcion}</p>
      </div>
    </Link>
  );
}
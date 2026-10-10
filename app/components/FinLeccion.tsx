/**
 * Bloque de fin de leccion: "Marcar como completada" y el enlace a la
 * siguiente.
 *
 * Es lo que llena el progreso que muestran las tarjetas del nivel. Va al final
 * y no al principio a proposito: marcar al abrir seria请点击-y-ya, y el
 * contador "7/15 completados" dejaria de significar nada.
 *
 * El boton es un toggle: se puede deshacer, porque siempre hay alguien que le
 * dio por error y no encuentra como volver atras.
 */
import { Link } from "@tanstack/react-router";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useProgreso } from "@/lib/progreso";

interface FinLeccionProps {
  clave: string;
  hrefSiguiente: string | null;
  tituloSiguiente: string | null;
  hrefAnterior: string | null;
  tituloAnterior: string | null;
}

export function FinLeccion({
  clave,
  hrefSiguiente,
  tituloSiguiente,
  hrefAnterior,
  tituloAnterior,
}: FinLeccionProps) {
  const { progreso, alternar } = useProgreso();
  const hecho = progreso[clave]?.estado === "completado";

  return (
    <div className="mt-12 rounded-xl border border-border bg-card p-6 dark:bg-card-dark">
      <button
        type="button"
        onClick={() => alternar(clave)}
        aria-pressed={hecho}
        className={
          hecho
            ? "mb-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-success/15 px-5 py-3 text-sm font-bold text-success transition-colors hover:bg-success/25 sm:w-auto"
            : "mb-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark sm:w-auto"
        }
      >
        {hecho ? (
          <>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Marcar como no completada
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Marcar como completada
          </>
        )}
      </button>
      <p className="mb-6 text-xs text-muted-foreground">
        Tu avance se guarda en este navegador. No hace falta registro y no sale de
        tu equipo.
      </p>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
        {hrefAnterior ? (
          <Link
            to={hrefAnterior}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Anterior: {tituloAnterior}
          </Link>
        ) : (
          <span />
        )}
        {hrefSiguiente && (
          <Link
            to={hrefSiguiente}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Siguiente: {tituloSiguiente}
          </Link>
        )}
      </div>
    </div>
  );
}
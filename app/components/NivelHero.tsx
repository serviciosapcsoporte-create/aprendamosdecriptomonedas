/**
 * NivelHero: cabecera de un nivel con el progreso y el "continuar".
 *
 * El progreso sale de app/lib/progreso.ts (localStorage, por dispositivo) y se
 * dibuja DESPUES de hidratar, no durante el render: el prerender corre en Node y
 * siempre daria 0/N, un numero mentiroso que ademas se queda cacheado en los
 * buscadores y en los previsualizadores de redes.
 *
 * "Continuar desde donde lo dejaste" apunta a la primera leccion sin completar,
 * no a la primera en general: si alguien ya hizo las cuatro primeras, llevarlo a
 * la quinta es lo que hace util el boton.
 */
import { Link } from "@tanstack/react-router";
import { CheckCircle2, PlayCircle, RotateCcw, X } from "lucide-react";
import type { ResumenNivel } from "@/lib/progreso";
import { NIVEL_ICON, NIVEL_ICON_ALT } from "@/data/assets3d";

interface NivelHeroProps {
  nivel: string;
  titulo: string;
  badge: string;
  objetivo: string;
  resumen: ResumenNivel;
  /** href de la leccion "siguiente"; null cuando ya termino todo. */
  hrefSiguiente: string | null;
  /** Solo en el nivel 1 se ofrece reiniciar: es el que se recorre entero. */
  permitirReiniciar?: boolean;
  onReiniciar?: () => void;
}

export function NivelHero({
  nivel,
  titulo,
  badge,
  objetivo,
  resumen,
  hrefSiguiente,
  permitirReiniciar = false,
  onReiniciar,
}: NivelHeroProps) {
  const { completados, total, fraccion, enCurso } = resumen;
  const hayProgreso = completados > 0 || enCurso > 0;
  const terminado = completados > 0 && completados === total;
  const pct = Math.round(fraccion * 100);

  return (
    <section className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card p-6 dark:bg-card-dark md:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 0%, rgba(249,115,22,0.14), transparent 65%)",
        }}
      />

      <div className="relative">
        <img
          src={NIVEL_ICON[nivel]}
          alt={NIVEL_ICON_ALT[nivel] ?? ""}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden h-44 w-44 opacity-20 md:block"
        />

        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-warning">{badge}</p>
        <h1 className="mb-3 font-serif text-3xl font-medium md:text-4xl">{titulo}</h1>
        <p className="max-w-2xl text-muted-foreground">{objetivo}</p>

        <div className="mt-6 max-w-2xl">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-semibold">
              {completados}/{total} completados
              {enCurso > 0 && (
                <span className="ml-2 font-normal text-muted-foreground">
                  · {enCurso} en curso
                </span>
              )}
            </span>
            <span className="text-sm font-bold text-primary">{pct}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progreso de ${titulo}`}
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Tu avance se guarda en este navegador, sin registro y sin enviar nada a
            ningun servidor.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {terminado ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-5 py-2.5 text-sm font-bold text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Nivel completo
            </span>
          ) : hrefSiguiente ? (
            <Link
              to={hrefSiguiente}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              {hayProgreso
                ? "Continuar desde donde te quedaste"
                : "Empezar por la primera leccion"}
            </Link>
          ) : null}

          {permitirReiniciar && onReiniciar && completados > 0 && (
            <Reiniciar onReiniciar={onReiniciar} />
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Reiniciar progreso.
 *
 * <details> en vez de window.confirm: el confirm nativo se puede suprimir,
 * rompe el diseno en movil y ademas no deja explicar lo que va a pasar antes de
 * hacerlo. "Cancelar" cierra el panel con el metodo nativo de <details>.
 */
function Reiniciar({ onReiniciar }: { onReiniciar: () => void }) {
  return (
    <details className="group relative z-20">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary [&::-webkit-details-marker]:hidden">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reiniciar progreso
      </summary>
      <div className="mt-2 w-72 rounded-xl border border-border bg-background p-4 text-left text-sm shadow-soft-lg">
        <p className="mb-3 text-muted-foreground">
          Se borra el avance guardado en este navegador. Las lecciones no se
          borran: siguen abiertas y gratuitas.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              onReiniciar();
              e.currentTarget.closest("details")?.removeAttribute("open");
            }}
            className="rounded-lg bg-danger px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
          >
            Si, reiniciar
          </button>
          <span className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground">
            <X className="h-3 w-3" aria-hidden="true" />
            Cancelar
          </span>
        </div>
      </div>
    </details>
  );
}
/**
 * Banner de consentimiento de cookies.
 *
 * Dos estados:
 *   - Banner: primera visita o tras borrar la preferencia.
 *   - Preferencias: modal con el detalle por categoría, siempre accesible
 *     desde el pie de página.
 *
 * Requisitos que se cumplen aquí y que conviene no romper al tocar esto:
 *   - Rechazar es igual de accesible que aceptar (un solo clic, sin modal).
 *     Ese es el requisito que más se incumple y el que más sanciona la UE.
 *   - El sitio NO depende de cookies para funcionar: no hay registro, no hay
 *     carrito, no hay sesión. Rechazar solo apaga la analítica.
 *   - Solo se declara una categoría opcional real (analítica). El sitio no
 *     publica anuncios, así que no hay interruptores de publicidad que
 *    avan a la gente a marcar.
 *   - Accesible: dialog con aria-modal, se cierra con Escape, el foco entra
 *     al abrir y vuelve al botón que la abrió.
 *   - Respeta prefers-reduced-motion.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  aplicarConsent,
  leerConsent,
  guardarPreferencias,
  type Consent,
} from "@/lib/consent";

type Vista = "banner" | "preferencias";

export function CookieConsent() {
  const [decidido, setDecidido] = useState<Consent | null>(null);
  const [vista, setVista] = useState<Vista | null>(null);
  const [analitica, setAnalitica] = useState(false);

  const botonOrigen = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const aceptarRef = useRef<HTMLButtonElement>(null);

  // Al montar: si no hay decision guardada, se aplica el rechazo por defecto
  // (nada de analitica) y se muestra el banner.
  useEffect(() => {
    const guardado = leerConsent();
    if (guardado) {
      setDecidido(guardado);
      setAnalitica(guardado.analitica);
      aplicarConsent(guardado);
    } else {
      const porDefecto: Consent = { esencial: true, analitica: false, fecha: "" };
      aplicarConsent(porDefecto);
      setVista("banner");
    }
  }, []);

  // Al abrir preferencias desde el pie, el foco entra al dialogo.
  useEffect(() => {
    if (vista !== "preferencias") return;
    const t = window.setTimeout(() => aceptarRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [vista]);

  const cerrar = useCallback(() => {
    setVista(null);
    // El foco vuelve a donde estaba para no perder al teclado.
    window.requestAnimationFrame(() => botonOrigen.current?.focus());
  }, []);

  useEffect(() => {
    // Escape cierra SOLO el panel de preferencias, no el banner.
    //
    // El banner no es modal (aria-modal="false"): el contenido se puede leer
    // sin decidir, asi que no hace falta bloquear la pagina. Pero si se
    // cerrara con Escape, un visitante que pulse Escape por costumbre se
    // quedaria sin decidir y sin volver a ver el banner en toda la sesion.
    // Que la decision sea explicita evita esa perdida de medicion.
    if (vista !== "preferencias") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cerrar();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vista, cerrar]);

  const decidir = useCallback((valor: boolean) => {
    const c = guardarPreferencias(valor);
    setDecidido(c);
    setAnalitica(c.analitica);
    setVista(null);
  }, []);

  /**
   * Se expone como evento para que el pie de pagina abra las preferencias sin
   * tener que subir el estado hasta __root.
   */
  useEffect(() => {
    const abrir = () => {
      const actual = leerConsent();
      setAnalitica(actual?.analitica ?? false);
      setDecidido(actual);
      botonOrigen.current = document.activeElement as HTMLElement;
      setVista("preferencias");
    };
    window.addEventListener("adc:abrir-preferencias", abrir);
    return () => window.removeEventListener("adc:abrir-preferencias", abrir);
  }, []);

  if (!vista) return null;

  if (vista === "banner") {
    return (
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="consent-titulo"
        aria-describedby="consent-texto"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in"
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:py-5">
          <div className="max-w-2xl">
            <h2 id="consent-titulo" className="text-base font-bold text-foreground">
              Usamos cookies de analítica, y solo si me lo dices
            </h2>
            <p id="consent-texto" className="mt-1 text-sm text-muted-foreground">
              Este sitio no necesita cookies para funcionar: puedes leer las 76
              lecciones sin aceptar nada. Si aceptas, Google Analytics nos dice qué
              lecciones se leen y cuáles no, y así mejoramos el contenido. No hay
              publicidad ni perfiles.{" "}
              <a href="/privacidad" className="underline underline-offset-2 hover:text-foreground">
                Política de privacidad
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              ref={aceptarRef}
              type="button"
              onClick={() => decidir(true)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Aceptar analítica
            </button>
            <button
              type="button"
              onClick={() => decidir(false)}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => setVista("preferencias")}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Preferencias
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4">
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pref-titulo"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-background p-6 sm:rounded-2xl"
      >
        <h2 id="pref-titulo" className="text-xl font-bold text-foreground">
          Preferencias de cookies
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Puedes cambiar esto cuando quieras. Retirar el consentimiento es tan
          fácil como darlo, y no cambia nada de lo que puedas leer aquí.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Necesarias</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Guardan tu decisión en este navegador para no volver a preguntar.
                  Sin esto el banner saldría en cada visita.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                Siempre activas
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Analítica (Google Analytics 4)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Nos dice qué lecciones se leen y cuáles se abandonan. No crea
                  perfiles, no se usa para publicidad y no se comparte con terceros.
                </p>
              </div>
              <label className="flex shrink-0 cursor-pointer items-center">
                <span className="sr-only">Activar analítica</span>
                <input
                  type="checkbox"
                  checked={analitica}
                  onChange={(e) => setAnalitica(e.target.checked)}
                  className="h-5 w-5 rounded border-input accent-[var(--primary)]"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decidir(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Guardar y aceptar
          </button>
          <button
            type="button"
            onClick={() => decidir(analitica)}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Guardar mis preferencias
          </button>
          <button
            type="button"
            onClick={cerrar}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Cerrar sin cambiar
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Estado actual: {decidido?.fecha ? `decidido el ${decidido.fecha.slice(0, 10)}` : "sin decidir"}.{" "}
          <a href="/privacidad" className="underline underline-offset-2 hover:text-foreground">
            Leer la política completa
          </a>
          .
        </p>
      </div>
    </div>
  );
}
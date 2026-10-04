/* Medallion - moneda 3D del logo en el hero.
 *
 * Rescatado de diseno/plantilla-3d.html y adaptado a producción:
 * - La escena vive en ./MedallionScene (chunk aparte con `three`) y se carga
 *   cuando el navegador queda inactivo: no compite con fuentes, CSS ni el
 *   contenido del hero.
 * - La textura de la cara se pinta en un canvas (fondo navy + aro terracota +
 *   logo) en vez de pegar el base64 de 340 kB del prototipo.
 * - La animación se pausa fuera del viewport (IntersectionObserver) y se
 *   desactiva con prefers-reduced-motion (se pinta un solo frame).
 * - Si WebGL falla o el chunk no carga, cae a la imagen estática del logo.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MedallionProps {
  /** Clases para el contenedor (alto/ancho) */
  className?: string;
}

export function Medallion({ className }: MedallionProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const useIdle = typeof window.requestIdleCallback === "function";

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    const load = () => {
      if (cancelled) return;
      import("./MedallionScene")
        .then(({ initMedallion }) => {
          if (cancelled) return;
          try {
            cleanup = initMedallion(host, reduced);
          } catch {
            setFailed(true);
          }
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };

    const handle = useIdle
      ? window.requestIdleCallback(load, { timeout: 4000 })
      : window.setTimeout(load, 1200);

    return () => {
      cancelled = true;
      if (useIdle) {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
      cleanup?.();
    };
  }, []);

  if (failed) {
    return (
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className={cn("mx-auto block aspect-square w-full max-w-[360px]", className)}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[420px] cursor-grab touch-pan-y active:cursor-grabbing",
        className,
      )}
    />
  );
}

export default Medallion;

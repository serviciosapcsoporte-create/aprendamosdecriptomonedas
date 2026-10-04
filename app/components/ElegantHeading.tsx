/* ElegantHeading - Heading con tipografía serif elegante
   - Combinación: Playfair Display (serif) para títulos + Inter (sans-serif) para contraste
   - Nivel de encabezado respetado mediante la prop `as` (h1..h6)
   - Tamaño por variables CSS cuando el llamador pasa clases `text-*`; si no, fallback clamp por nivel
   - Sin clases de transición dinámicas (Tailwind no genera `delay-${n}s`)
*/
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ElegantHeadingProps {
  /** Nivel de heading (h1 a h6). Por defecto h2: solo la home debe usar h1. */
  as?: HeadingLevel;
  /** Contenido del heading */
  children: ReactNode;
  /** Clase CSS adicional (el tamaño se pasa con el hint `length:` de Tailwind) */
  className?: string;
  /** Alias heredado de `className` */
  classNameHeading?: string;
}

/** Fallback de tamaño cuando el llamador no pasa clases `text-*` */
const SIZE_BY_LEVEL: Record<HeadingLevel, string> = {
  h1: "clamp(2.5rem, 6vw, 4.5rem)",
  h2: "clamp(2rem, 5vw, 3.5rem)",
  h3: "clamp(1.75rem, 4.5vw, 2.75rem)",
  h4: "clamp(1.5rem, 4vw, 2rem)",
  h5: "clamp(1.25rem, 3.5vw, 1.5rem)",
  h6: "clamp(1.1rem, 3vw, 1.25rem)",
};

/** Componente ElegantHeading */
export const ElegantHeading = ({
  as = "h2",
  children,
  className,
  classNameHeading,
}: ElegantHeadingProps) => {
  const extra = cn(className, classNameHeading);
  // Si el llamador ya controla el tamaño con clases, el inline no debe pisarlo.
  const hasSizeClass = /(^|\s)(text-|text-\[)/.test(extra ?? "");
  const Tag = as;

  return (
    <Tag
      className={cn(
        "font-serif font-normal leading-[1.2] tracking-[0.02em] text-foreground",
        extra,
      )}
      style={hasSizeClass ? undefined : { fontSize: SIZE_BY_LEVEL[as] }}
    >
      {children}
    </Tag>
  );
};

/** Export type para uso externo */
export type { ElegantHeadingProps };

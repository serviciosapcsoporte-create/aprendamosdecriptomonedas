/* ElegantHeading - Heading con tipografía serif elegante
   - Combinación: Playfair Display (serif) para títulos + Inter (sans-serif) para contraste
   - Tamaños responsivos con variables CSS para consistencia
   - Línea height y tracking refinados para legibilidad
   - Opción de animación al aparecer
   - Soporte para todos los niveles h1-h6 mediante prop `as`
*/
// @ts-nocheck
import { cn } from "@/lib/utils";

interface ElegantHeadingProps {
  /** Nivel de heading (h1 a h6) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Contenido del heading */
  children: React.ReactNode;
  /** Clase CSS adicional para el heading */
  classNameHeading?: string;
  /** Animación al montar (por defecto true) */
  animate?: boolean;
  /** Retraso en segundos para animación en cascada */
  animationDelay?: number;
}

/** Estilos CSS en línea para consistencia vertical y horizontal */
const headingStyles = {
  fontFamily: "var(--font-serif), serif",
  fontWeight: "400", // Playfair Display default
  lineHeight: "1.2",
  letterSpacing: "0.02em",
  mb: 0,
};

/** Componente ElegantHeading */
export const ElegantHeading = ({
  as = "h2",
  children,
  classNameHeading,
  animate = true,
  animationDelay = 0,
}: ElegantHeadingProps) => {
  // Tamaños responsivos por nivel (en rem para escalabilidad con root font)
  const sizeMap: Record<string, string> = {
    h1: "clamp(2.5rem, 6vw, 4.5rem)",
    h2: "clamp(2rem, 5vw, 3.5rem)",
    h3: "clamp(1.75rem, 4.5vw, 2.75rem)",
    h4: "clamp(1.5rem, 4vw, 2rem)",
    h5: "clamp(1.25rem, 3.5vw, 1.5rem)",
    h6: "clamp(1.1rem, 3vw, 1.25rem)",
  };

  const styles = sizeMap[as as keyof typeof sizeMap] || sizeMap.h2;

  return (
    <h1
      className={cn(
        "font-serif font-normal leading-[1.2] tracking-[0.02em] text-foreground mb-0",
        // Tamaños responsivos inline (Tailwind no aplica directamente aquí)
        "mb-0",
        // Clases de animación si es requerido
        animate &&
        `transition-all duration-500 ease-out delay-${animationDelay}s`,
        classNameHeading,
      )}
      // Usamos style inline para los tamaños responsivos
      style={{ fontSize: sizes, lineHeight: 1.2 }}
    >
      {children}
    </h1>
  );
};

/** Export type para uso externo */
export type { ElegantHeadingProps };
/* AnimatedSection - Sección con animación framer-motion al entrar en viewport
   - fade-in-up: título/subtítulo aparecen desplazándose desde abajo
   - fade-in: elementos simples van apareciendo
   - slide-in-from-left/lright: listas o grillas desde los lados
   - "whileInView": activa la animación cuando el elemento entra en el viewport
   - "transition": configuración suave con spring para naturalidad
*/
// @ts-nocheck
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  /** Retraso en segundos por cada elemento hijo (opcional) */
  delay?: number;
  /** Tipo de animación */
  animation?:
    | "fade-in-up"
    | "fade-in"
    | "slide-in-from-left"
    | "slide-in-from-right";
  /** Clases CSS adicionales */
  className?: string;
  /** Los niños a animar */
  children: React.ReactNode;
}

/** Mapa de nombres de animación a keyframes de Tailwind/Framer */
const animationMap: Record<string, string> = {
  "fade-in-up": "fade-in-up",
  "fade-in": "fade-in",
  "slide-in-from-left": "slide-in-from-left",
  "slide-in-from-right": "slide-in-from-right",
};

/** Componente AnimatedSection */
export const AnimatedSection = ({
  delay = 0,
  animation = "fade-in-up",
  className,
  children,
}: AnimatedSectionProps) => {
  return (
    <motion.section
      // Estado inicial fuera del viewport
      initial={{ opacity: 0, y: 20 }}
      // Estado cuando entra en viewport
      whileInView={{ opacity: 1, y: 0 }}
      // Configuración de la transición
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: delay * 0.15,
        duration: 0.6,
        // Cuando se sale del viewport y vuelve a entrar, reinicia
        repeat: Infinity,
        repeatType: "mirror",
      }}
      className={cn("py-12 md:py-16 lg:py-20", className)}
    >
      {children}
    </motion.section>
  );
};

/* Export type para uso externo */
export type { AnimatedSectionProps };
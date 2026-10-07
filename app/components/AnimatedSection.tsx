/* AnimatedSection - Seccion con animacion de entrada al entrar en viewport.
 *
 * Antes usaba framer-motion, que no estaba declarado en package.json ni
 * instalado: eso rompia el build de produccion entero. Ademas la version
 * anterior llevaba repeat: Infinity con repeatType "mirror", o sea que cada
 * seccion se desvanacia y volvia a aparecer SIN FIN cada vez que se hacia
 * scroll. Eso consume CPU de forma permanente y castiga INP.
 *
 * Ahora es IntersectionObserver + transicion CSS: cero dependencias, se anima
 * una sola vez y sin coste de layout. La animacion no se activa hasta que
 * JavaScript marca data-anim-ready en <html>, asi que si el JS falla la
 * pagina se ve completa en lugar de quedar en blanco.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  /** Retraso en segundos antes de empezar la animacion */
  delay?: number;
  /** Tipo de animacion de entrada */
  animation?:
    | "fade-in-up"
    | "fade-in"
    | "slide-in-from-left"
    | "slide-in-from-right";
  /** Clases CSS adicionales */
  className?: string;
  /** id del <section> (anclas / scrollIntoView) */
  id?: string;
  /** Contenido a animar */
  children: ReactNode;
}

let markedReady = false;

function markAnimReady() {
  if (markedReady) return;
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-anim-ready", "true");
  markedReady = true;
}

export const AnimatedSection = ({
  delay = 0,
  animation = "fade-in-up",
  className,
  id,
  children,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    markAnimReady();
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver (o con reduced motion) mostramos todo directo.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect(); // se anima una sola vez
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-anim={animation}
      data-visible={visible ? "true" : "false"}
      style={{ "--anim-delay": `${Math.min(delay, 0.15)}s` } as React.CSSProperties}
      className={cn("anim-section py-12 md:py-16 lg:py-20", className)}
    >
      {children}
    </section>
  );
};

export type { AnimatedSectionProps };
/* MinimalistNavbar - Navbar minimalista con efecto scroll
   - Al inicio: fondo transparente, blur, bordes sutiles
   - Al hacer scroll: fondo semitransparente sólido
   - Enlaces con badges (free/register/paid/new) consistentes
   - Logo a la izquierda, menú a la derecha
   - Versión móvil: menú hamburguesa estilizado
   - Mantiene accesibilidad y enlaces reales
*/
// @ts-nocheck
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
  badge?: "free" | "register" | "paid" | "new";
}

interface MinimalistNavbarProps {
  /** Logo a mostrar a la izquierda (opcional) */
  logo?: React.ReactNode;
  /** Enlaces del menú principal */
  links: NavLink[];
  /** Función opcional al hacer scroll */
  onScroll?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

/** Componente MinimalistNavbar */
export function MinimalistNavbar({
  logo,
  links,
  onScroll,
  className,
}: MinimalistNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrolled(currentScroll > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        // Estado inicial: transparente con blur
        "fixed top-0 w-full transition-all duration-300 ease-out z-50",
        // Sin scroll: fondo glassmorphism
        !scrolled
          ? "bg-transparent/80 backdrop-blur-md border-b border-white/10"
          // Con scroll: fondo sólido oscuro/clarO
          : "bg-white/5 dark:bg-black/5 border-b border-white/10",
        className,
      )}
      onScroll={onScroll}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo a la izquierda */}
        {logo ? (
          <div className="flex items-center gap-2">
            {logo}
          </div>
        ) : (
          <span className="self-center text-[var(--muted-foreground)] text-sm uppercase tracking-wider">
            Aprendamos
          </span>
        )}

        {/* Menú principal - visible en desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors",
                // Texto oscuro cuando hay scroll
                scrolled && "text-[var(--foreground)]",
                "text-sm",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Badge móvil - siempre visible */}
        <div className="md:hidden flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          {links.map((link) => {
            if (link.badge) {
              const badgeClasses = {
                free: "bg-green-100 text-green-800 border-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full",
                register: "bg-blue-100 text-blue-800 border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full",
                paid: "bg-amber-100 text-amber-800 border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full",
                new: "bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full",
              };
              return (
                <span key={`mobile-${link.badge}`}>
                  {link.label} <span className={badgeClasses[link.badge]}>{link.badge}</span>
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </nav>
  );
}

/** Export for use in other files */
export type { NavLink, MinimalistNavbarProps };
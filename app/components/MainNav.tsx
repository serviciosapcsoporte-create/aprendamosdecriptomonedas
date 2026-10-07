import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { navItems, secondaryItems, type NavItem } from "@/lib/nav-items";

function Badge({ badge }: { badge?: NavItem["badge"] }) {
  if (!badge) return null;
  const map = {
    free: { label: "Gratis", className: "bg-success/15 text-success" },
    register: { label: "Registro", className: "bg-info/15 text-info" },
    paid: { label: "Premium", className: "bg-warning/15 text-warning" },
    new: { label: "Nuevo", className: "bg-danger/15 text-danger" },
  } as const;
  const { label, className } = map[badge];
  return (
    <span className={cn("rounded-full px-1.5 py-0.5 text-xs", className)}>
      {label}
    </span>
  );
}

export function MainNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape cierra el menú móvil y devuelve el foco al botón
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Navegación de escritorio */}
      <nav
        aria-label="Principal"
        className="hidden items-center space-x-1 text-sm font-medium md:flex"
      >
        {navItems.map((item) => (
          <div key={item.href} className="group relative">
            <Link
              to={item.href}
              className="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{item.title}</span>
              <Badge badge={item.badge} />
            </Link>

            {item.children && (
              <div className="invisible absolute left-0 top-full z-50 w-64 origin-top rounded-b-md bg-popover px-2 pb-2 pt-3 opacity-0 shadow-lg ring-1 ring-border transition-[opacity,transform,visibility] duration-150 -translate-y-1 hover-hover:group-hover:visible hover-hover:group-hover:translate-y-0 hover-hover:group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {item.children.map((child) => (
                  <div key={child.href ?? child.title} className="mb-1">
                    {child.children ? (
                      <div className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground">
                        {child.title}
                      </div>
                    ) : (
                      <Link
                        to={child.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {child.title}
                      </Link>
                    )}
                    {child.children && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {child.children.map((grandchild) => (
                          <Link
                            key={grandchild.href}
                            to={grandchild.href}
                            className="block min-h-9 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                          >
                            {grandchild.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Botón de menú móvil */}
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="nav-movil"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Panel móvil */}
      <div
        id="nav-movil"
        ref={(el) => {
          if (el) {
            if (open) {
              el.removeAttribute("inert");
            } else {
              el.setAttribute("inert", "");
            }
          }
        }}
        className={cn(
          "absolute left-0 right-0 top-full border-b bg-background shadow-lg md:hidden transition-[opacity,transform,visibility] duration-150",
          open ? "visible opacity-100" : "invisible opacity-0 -translate-y-1"
        )}
      >
        <nav aria-label="Principal móvil" className="container mx-auto py-3">
          <ul className="space-y-1">
            {[...navItems, ...secondaryItems].map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={close}
                  className="flex min-h-11 items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{item.title}</span>
                  <Badge badge={item.badge} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

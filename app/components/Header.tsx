import { Link } from "@tanstack/react-router";
import { MainNav } from "@/components/MainNav";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Aprendamos de Criptomonedas"
            className="h-10 w-auto"
            loading="eager"
          />
          <span className="font-bold text-lg">Aprendamos</span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold">Niveles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nivel-1-principiante" className="text-muted-foreground hover:text-foreground">
                  Nivel 1 — Principiante
                </Link>
              </li>
              <li>
                <Link to="/nivel-2-intermedio" className="text-muted-foreground hover:text-foreground">
                  Nivel 2 — Intermedio
                </Link>
              </li>
              <li>
                <Link to="/nivel-3-avanzado" className="text-muted-foreground hover:text-foreground">
                  Nivel 3 — Avanzado
                </Link>
              </li>
              <li>
                <Link to="/nivel-4-experto" className="text-muted-foreground hover:text-foreground">
                  Nivel 4 — Experto
                </Link>
              </li>
              <li>
                <Link to="/nivel-5-especializaciones" className="text-muted-foreground hover:text-foreground">
                  Nivel 5 — Especializaciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/recursos" className="text-muted-foreground hover:text-foreground">
                  Guías y Descargas
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-muted-foreground hover:text-foreground">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/acerca-de" className="text-muted-foreground hover:text-foreground">
                  Acerca de mí
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Recibe contenido sin humo directamente en tu email.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Suscribir
              </button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Legal</h3>
            <p className="text-xs text-muted-foreground">
              © 2026 Aprendamos de Criptomonedas · Educación, no asesoría financiera.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
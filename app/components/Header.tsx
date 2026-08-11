import { Link } from "@tanstack/react-router";
import { MainNav } from "@/components/MainNav";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#050a18]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#050a18]/70">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo-white.png"
            alt="Aprendamos de Criptomonedas"
            className="h-9 w-auto object-contain brightness-110"
            loading="eager"
          />
          <span className="hidden sm:block text-lg font-bold tracking-tight text-white">
            Aprendamos <span className="text-neon text-glow">de Criptomonedas</span>
          </span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-cyan-500/15 bg-[#050a18]/90">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Niveles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nivel-1-principiante" className="text-muted-foreground hover:text-neon transition-colors">
                  Nivel 1 — Principiante
                </Link>
              </li>
              <li>
                <Link to="/nivel-2-intermedio" className="text-muted-foreground hover:text-neon transition-colors">
                  Nivel 2 — Intermedio
                </Link>
              </li>
              <li>
                <Link to="/nivel-3-avanzado" className="text-muted-foreground hover:text-neon transition-colors">
                  Nivel 3 — Avanzado
                </Link>
              </li>
              <li>
                <Link to="/nivel-4-experto" className="text-muted-foreground hover:text-neon transition-colors">
                  Nivel 4 — Experto
                </Link>
              </li>
              <li>
                <Link to="/nivel-5-especializaciones" className="text-muted-foreground hover:text-neon transition-colors">
                  Nivel 5 — Especializaciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/recursos" className="text-muted-foreground hover:text-neon transition-colors">
                  Guías y Descargas
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-neon transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-muted-foreground hover:text-neon transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/acerca-de" className="text-muted-foreground hover:text-neon transition-colors">
                  Acerca de mí
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Recibe contenido sin humo directamente en tu email.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-md border border-input bg-card/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-neon focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Suscribir
              </button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Legal</h3>
            <p className="text-xs text-muted-foreground">
              © 2026 Aprendamos de Criptomonedas · Educación, no asesoría financiera.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
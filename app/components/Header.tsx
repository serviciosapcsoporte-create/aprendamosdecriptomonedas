import { Link } from "@tanstack/react-router";
import { MainNav } from "@/components/MainNav";
import { OPERATOR } from "@/lib/legal";
import { ContactLinks } from "@/components/ContactLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex shrink-0 items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
            <h3 className="mb-4 text-sm font-bold">Contacto</h3>
            <p className="text-sm text-muted-foreground">
              Preguntas, correcciones o sugerencias. Respondemos en nuestras redes,
              sin registro y sin guardarte en ninguna lista.
            </p>
            <ContactLinks className="mt-3 block text-sm" />
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Legal</h3>
            <ul className="mb-4 space-y-2 text-sm">
              <li>
                <Link to="/privacidad" className="text-muted-foreground hover:text-foreground">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-muted-foreground hover:text-foreground">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/afiliados" className="text-muted-foreground hover:text-foreground">
                  Enlaces de afiliado
                </Link>
              </li>
              <li>
                {/* Retirar el consentimiento tiene que ser tan facil como darlo.
                    Un boton de texto aqui, sin recompensa ni registro, y con el
                    panel abierto en el sitio. */}
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new Event("adc:abrir-preferencias"))
                  }
                  className="text-left text-muted-foreground hover:text-foreground"
                >
                  Preferencias de cookies
                </button>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              © 2026 Aprendamos de Criptomonedas · {OPERATOR}. Educación, no asesoría
              financiera.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
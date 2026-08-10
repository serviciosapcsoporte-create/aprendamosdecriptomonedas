// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { Lock, Wallet, Shield, BarChart3, Send, Globe, Search, FileText } from "lucide-react";

export const Route = createFileRoute("/nivel-1/que-es-blockchain")({
  component: QueEsBlockchainPage,
  head: () => ({
    meta: [
      { title: "¿Qué es Blockchain? | Curso de Criptomonedas Gratis" },
      {
        name: "description",
        content:
          "Aprende qué es blockchain en simples palabras. Entiende cómo funciona una cadena de bloques y por qué es revolucionaria. Curso gratis nivel 1.",
      },
      { name: "keywords", content: "que es blockchain, blockchain explicado, cadena de bloques" },
    ],
  }),
});

function QueEsBlockchainPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <nav className="mb-8">
          <Link to="/nivel-1-principiante" className="text-sm text-muted-foreground hover:text-foreground">
            ← Volver a Nivel 1
          </Link>
        </nav>

        <article className="prose dark:prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold mb-0">¿Qué es Blockchain?</h1>
          </div>

          <div className="mb-8 text-center">
            <img
              src="/diagrams/blockchain-simple.svg"
              alt="Diagrama simple de blockchain"
              className="mx-auto rounded-lg shadow-lg border"
            />
          </div>

          <h2>En términos simples</h2>
          <p>
            Una <strong>blockchain</strong> es una base de datos distribuida que almacena
            información en bloques encadenados. Cada bloque contiene un grupo de
            transacciones, y está enlazado al bloque anterior mediante un "hash" único.
          </p>

          <h2>Características clave</h2>
          <ul>
            <li><strong>Inmutabilidad:</strong> Una vez escrito un bloque, es extremadamente difícil modificarlo.</li>
            <li><strong>Transparencia:</strong> Todos pueden ver todas las transacciones.</li>
            <li><strong>Decentralización:</strong> No depende de una entidad central.</li>
            <li><strong>Seguridad:</strong> Cada participante valida las transacciones.</li>
          </ul>

          <blockquote>
            <p>
              La blockchain no es solo la tecnología detrás de Bitcoin. Es una forma nueva de
              registrar y compartir datos de manera segura, sin necesidad de intermediarios.
            </p>
          </blockquote>

          <h2>¿Para qué sirve más allá de las criptomonedas?</h2>
          <p>
            La tecnología blockchain se aplica en:
          </p>
          <ul>
            <li>✅ Cadena de suministro: rastrear productos desde su origen.</li>
            <li>✅ Identidad digital: dueños reales de sus identidades.</li>
            <li>✅ Votación: elecciones transparentes y verificables.</li>
            <li>✅ Contratos inteligentes: acuerdos automáticos y sin intermediarios.</li>
          </ul>

          <h2>Frase clave</h2>
          <blockquote>
            <p>
              <strong>La blockchain permite confiar en un sistema sin tener que confiar en una persona.</strong>
            </p>
          </blockquote>
        </article>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between p-6 bg-card rounded-lg border">
          <Link
            to="/nivel-1/como-funciona-un-bloque"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Siguiente: Cómo funciona un bloque
          </Link>
          <Link
            to="/nivel-1/claves-publicas-privadas"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Anterior: Claves públicas y privadas
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

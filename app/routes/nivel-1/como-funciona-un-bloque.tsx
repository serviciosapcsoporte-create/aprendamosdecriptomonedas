// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/nivel-1/como-funciona-un-bloque")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Cómo funciona un bloque | Curso Blockchain Gratis" },
      {
        name: "description",
        content: "Aprende cómo se estructura un bloque de blockchain. Hash, transacciones, nonce y cómo se enlazan los bloques. Curso gratis nivel 1.",
      },
      { name: "keywords", content: "como funciona un bloque blockchain, estructura bloque blockchain" },
    ],
  }),
});

function Page() {
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
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold mb-0">Cómo funciona un bloque</h1>
          </div>
          <img src="/diagrams/block-structure.svg" alt="Estructura de un bloque blockchain" className="mx-auto rounded-lg shadow-lg border mb-6" />
          <h2>Encabezado del bloque</h2>
          <p>Cada bloque tiene un encabezado que contiene:</p>
          <ul>
            <li><strong>Hash del bloque anterior:</strong> enlaza este bloque al anterior.</li>
            <li><strong>Merkle root:</strong> hash que representa todas las transacciones del bloque.</li>
            <li><strong>Timestamp:</strong> marca de tiempo de cuándo se creó el bloque.</li>
            <li><strong>Nonce:</strong> valor que los mineros ajustan para encontrar un hash válido.</li>
            <li><strong>Difficulty target:</strong> nivel de dificultad actual.</li>
          </ul>
          <h2>Cuerpo del bloque</h2>
          <p>Contiene todas las transacciones validadas en ese bloque. Cada transacción registra quién envió qué cantidad a quién.</p>
          <blockquote><p>El hash del bloque es como una huella digital: cambia completamente si alteras incluso un solo bit de información.</p></blockquote>
          <h2>Encadenamiento</h2>
          <p>Los bloques se enlazan en cadena: el hash del bloque N se incluye en el bloque N+1. Si alguien intenta modificar un bloque antiguo, todos los bloques posteriores se romperían, alertando a la red.</p>
          <p class="text-sm text-muted-foreground">📝 <em>Próximo tema: Minería / Validación</em></p>
        </article>
        <div className="mt-12 flex justify-between">
          <Link to="/nivel-1/que-es-blockchain" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Anterior</Link>
          <Link to="/nivel-1/mineria-validacion" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Siguiente: Minería / Validación</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

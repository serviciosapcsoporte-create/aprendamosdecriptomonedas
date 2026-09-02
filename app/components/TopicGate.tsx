import { Lock } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { accessLinks } from "@/data/access-links";
import type { Topic } from "@/data/curriculum";

interface TopicContentProps {
  topic: Topic;
}

/**
 * Renderiza el contenido de una lección respetando su nivel de acceso:
 * - badge "free" (o sin badge): contenido completo, como siempre.
 * - badge "register" o "paid": muestra solo el primer párrafo como
 *   adelanto (teaser) + una tarjeta de bloqueo con CTA hacia Payhip.
 *
 * IMPORTANTE: esto es un "soft paywall". El array `topic.content` completo
 * sigue viajando en el bundle de JavaScript del sitio (es un sitio estático
 * sin backend), así que alguien muy insistente podría leerlo igual desde
 * las herramientas de desarrollador. Sirve para dar la fricción y el
 * empujón de conversión correctos a un usuario normal, pero NO es un
 * paywall a prueba de balas. Si en el futuro quieres bloqueo real,
 * el contenido de Nivel 3-5 debería vivir fuera del sitio (ej. como PDF
 * entregado por Payhip) en vez de en las páginas públicas.
 */
export function TopicContent({ topic }: TopicContentProps) {
  const isGated = topic.badge === "register" || topic.badge === "paid";

  if (!isGated) {
    return <Markdown content={topic.content} />;
  }

  const teaser = topic.content.slice(0, 1);
  const access = accessLinks[topic.badge as "register" | "paid"];

  return (
    <div>
      <Markdown content={teaser} />
      <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
          <Lock className="h-5 w-5 text-amber-700 dark:text-amber-300" />
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Esta lección continúa para quienes desbloquean este nivel.
        </p>
        <a
          href={access.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
        >
          {access.cta}
        </a>
      </div>
    </div>
  );
}

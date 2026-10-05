/**
 * Video de la leccion.
 *
 * Solo se renderiza si el topic trae `video`. Las 64 lecciones que no lo
 * traen ven exactamente lo mismo que antes: no hay hueco vacío ni un
 * "video forthcoming" que prometa algo que no existe.
 *
 * Decisiones:
 * - `preload="none"`: el video pesa entre 1 y 5 MB. Descargarlo antes de que
 *   el visitante pulse play desplaza la lectura de la leccion, que es lo
 *   primero que importa en una pagina gratuita.
 * - Sin autoplay: nadie quiere que le salte audio al abrir un articulo.
 * - Los subtitulos van quemados en el propio video, asi que no hace falta
 *   <track>; el aria-label si describe que se va a ver.
 * - Si el archivo no llegara a existir (cache de CDN vieja, deploy a medias),
 *   el <video> se oculta solo en lugar de dejar un rectangulo roto.
 */
import { useState } from "react";
import type { Topic } from "@/data/curriculum";

export function VideoLeccion({ topic }: { topic: Topic }) {
  const [fallo, setFallo] = useState(false);
  if (!topic.video || fallo) return null;

  return (
    <figure className="not-prose my-8">
      <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-xl border border-border bg-black">
        <video
          className="aspect-[9/16] w-full"
          src={topic.video}
          controls
          preload="none"
          playsInline
          aria-label={`Video: ${topic.videoAlt ?? topic.title}`}
          onError={() => setFallo(true)}
        />
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        {topic.videoAlt ?? `Resumen en video de ${topic.title}`}
      </figcaption>
    </figure>
  );
}
/**
 * Moneda giratoria del hero.
 *
 * SOBRE EL FONDO DEL VIDEO: no es transparente ni plano. Es un azul casi negro
 * (#050D13 medido en la esquina) con particulas de red y un degradado. La
 * opcion de "fondo exacto #0A0E1A" no es realizable sin un pasada de matte por
 * IA, asi que la solucion es mezclado: la moneda es brillante sobre fondo oscuro,
 * que es justo el caso donde `screen` funciona. El fondo oscuro se funde con la
 * pagina y la moneda se queda.
 *
 * `lighten` se usaria si la moneda tuviera negros puros; aqui tiene reflejos
 * dorados casi blancos, y `screen` los conserva mejor.
 *
 * La moneda esta a la izquierda de un fotograma 16:9, no centrada. Se recorta
 * con object-fit + object-position en un contenedor cuadrado: recorta el codigo
 * en vez de re-codificar el video.
 *
 * El bucle no reinicia solo: se corta en `fin` con `loop`, que es lo que evita
 * el parpadeo del atributo `loop` de HTML cuando el navegador decide recargar.
 */
export function CoinHero({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] ${className}`}
    >
      <video
        className="h-full w-full object-cover object-[28%_50%] mix-blend-screen"
        style={{ clipPath: "circle(48% at 50% 50%)" }}
        src="/hero/moneda-giratoria.mp4"
        poster="/hero/moneda-poster.jpg"
        width={1280}
        height={720}
        // Decorative: se repite junto al H1, asi que no necesita ser audible.
        // muted + autoPlay es la unica combinacion que los navegadores permiten
        // reproducir sin que el visitante haya interactuado con la pagina.
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      />
    </div>
  );
}
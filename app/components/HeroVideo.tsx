/**
 * Video de fondo full-bleed de la seccion Hero.
 *
 * El video va DETRAS de todo el contenido de la seccion: `absolute inset-0`
 * con `object-cover`, sin border-radius, sin clip-path circular y sin
 * contenedor adyacente. La capa oscura de contraste y el texto van en
 * hermanos posteriores con z-index mayor (ver la seccion Hero de
 * app/routes/index.tsx).
 *
 * Es decorativo: no aporta informacion que no este en el H1, asi que
 * `aria-hidden` + `tabIndex={-1}` evitan que aparezca en el orden de foco.
 * `muted + autoPlay` es la unica combinacion que los navegadores reproducen
 * sin que la persona haya interactuado con la pagina; `playsInline` evita que
 * iOS lo saque a pantalla completa.
 */
export function HeroVideo() {
  return (
    <video
      className="absolute inset-0 z-0 h-full w-full object-cover object-[30%_50%]"
      src="/hero/moneda-giratoria.mp4"
      poster="/hero/moneda-poster.jpg"
      width={1280}
      height={720}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}

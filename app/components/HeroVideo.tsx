/**
 * Video de fondo full-bleed de la seccion Hero: la moneda 3D girando en bucle.
 *
 * El video va DETRAS de todo el contenido de la seccion: `absolute inset-0`
 * con `object-cover`, sin border-radius, sin clip-path circular y sin
 * contenedor adyacente. La capa oscura de contraste y el texto van en
 * hermanos posteriores con z-index mayor (ver la seccion Hero de
 * app/routes/index.tsx).
 *
 * `object-position` NO es el mismo en movil y en escritorio, y a proposito: el
 * render es 1280x720 con la moneda en el tercio izquierdo. En pantallas anchas
 * se ve el fotograma entero (`object-center`), pero en un movil vertical
 * `object-cover` recorta las laterales y dejaria la moneda fuera del encuadre
 * si no se ancla a la izquierda (`object-[24%_50%]`).
 *
 * Es decorativo: no aporta informacion que no este en el H1, asi que
 * `aria-hidden` + `tabIndex={-1}` evitan que aparezca en el orden de foco.
 * `muted + autoPlay` es la unica combinacion que los navegadores reproducen
 * sin que la persona haya interactuado con la pagina; `playsInline` evita que
 * iOS lo saque a pantalla completa.
 */
import { HERO_VIDEO } from "@/data/assets3d";

export function HeroVideo() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    return (
      <img
        src={HERO_VIDEO.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[24%_50%] lg:object-center"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 z-0 h-full w-full object-cover object-[24%_50%] lg:object-center"
      src={HERO_VIDEO.src}
      poster={HERO_VIDEO.poster}
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
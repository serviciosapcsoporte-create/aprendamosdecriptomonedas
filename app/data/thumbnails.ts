/**
 * Portadas de las tarjetas de leccion.
 *
 * LA RUTA SE CALCULA, NO SE ESCRIBE
 * Cada leccion tiene su propio archivo en public/assets/lecciones/, con nombre
 * tematico: leccion-08-buenas-practicas.webp. Como el numero lo da el orden de
 * lectura de curriculumData, la ruta sale sola y dos lecciones NO pueden acabar
 * con la misma imagen por accidente: si cambia el orden, cambia el archivo y
 * se ve en la tarjeta, que es justo lo que hay que ver.
 *
 * Que las haya unicas cuesta trabajo: los renders de octubre son 13 para 34
 * tarjetas, asi que varias lecciones salian con el MISMO candado 3D una detras
 * de otra (lecciones 8, 9 y 11 seguidas). scripts/build-leccion-covers.py saca
 * un recorte o una composicion distinta de cada render base;
 * scripts/build-leccion-covers-gemini.mjs genera una ilustracion nueva por
 * leccion cuando hay cuota de la API.
 *
 * EXCEPCIONES
 * Los dos diagramas SVG del sitio son mas anchos que 16:9 y no se pueden
 * rasterizar en el build, asi que van con object-contain y su propia extension.
 */

export interface Miniatura {
  src: string;
  alt: string;
  /**
   * "contain" para lo que no es 16:9. Con "cover" el recorte se come el
   * contenido: en un diagrama de 900x320 desaparecian "Bloque 1" y "Bloque 3".
   */
  ajuste?: "cover" | "contain";
}

/** Los dos diagramas: SVG, se copian tal cual y no se escalan. */
const DIAGRAMAS: Record<string, Miniatura> = {};

/**
 * Nivel 4: cada leccion con su propio archivo, nombrado por el concepto.
 * Asi ninguna tarjeta repite la imagen de otra (ni la del ZK repetido) y
 * cambiar una portada es cambiar un solo archivo.
 */
const ASSETS_NIVEL_4: Record<string, string> = {
  "arbitrum-optimism-layer-2": "arbitrum-optimism.webp",
  "zk-rollups-starknet-zksync": "zk-rollups-starknet.webp",
  "dex-avanzados-gamma-swap": "dex-gamma-swap.webp",
  "derivados-futures-y-opciones": "derivados-futuros.webp",
  "bots-arbitraje-mev": "bots-arbitraje-mev.webp",
  "custodia-institucional": "custodia-institucional.webp",
  "hardware-wallets-y-cold-storage": "hardware-wallets.webp",
  "exploits-y-lecciones-seguridad": "exploits-ciberseguridad.webp",
  "composabilidad-defi-y-risk-parity": "composabilidad-defi.webp",
  "token-unlocks-y-emision": "token-unlocks.webp",
  "analisis-on-chain-dune": "analisis-onchain-dune.webp",
  "optimizacion-cartera-y-seguros": "optimizacion-cartera.webp",
  "liquid-staking-lido-rocket": "liquid-staking.webp",
};

function nombreArchivo(numero: number, slug: string): string {
  return `/assets/lecciones/leccion-${String(numero).padStart(2, "0")}-${slug}.webp`;
}

/**
 * @param numero  Posicion de la leccion dentro de su nivel (1..N), tal y como la
 *                numera la pagina del nivel leyendo curriculumData.
 * @param titulo  Solo para el texto alternativo: no se escribe a mano por leccion.
 */
export function miniaturaDe(
  nivel: string,
  numero: number,
  slug: string,
  titulo: string,
): Miniatura {
  // Nivel 1 usa portadas numeradas simples (leccion-01.webp ... leccion-15.webp)
  // para que cada tarjeta tenga una imagen univoca y facil de auditar.
  if (nivel === "1") {
    return {
      src: `/assets/lecciones/leccion-${String(numero).padStart(2, "0")}.webp`,
      alt: `Portada ilustrada de la leccion: ${titulo}`,
      ajuste: "cover",
    };
  }
  if (nivel === "2") {
    return {
      src: `/assets/lecciones/nivel-2-leccion-${String(numero).padStart(2, "0")}.webp`,
      alt: `Portada ilustrada de la leccion: ${titulo}`,
      ajuste: "cover",
    };
  }
  if (nivel === "3") {
    return {
      src: `/assets/lecciones/nivel-3/leccion-${String(numero).padStart(2, "0")}.webp`,
      alt: `Portada ilustrada de la leccion: ${titulo}`,
      ajuste: "cover",
    };
  }
  if (nivel === "4") {
    const dedicado = ASSETS_NIVEL_4[slug];
    return {
      src: dedicado
        ? `/assets/lecciones/nivel-4/${dedicado}`
        : `/assets/lecciones/nivel-4/leccion-${String(numero).padStart(2, "0")}.webp`,
      alt: `Portada ilustrada de la leccion: ${titulo}`,
      ajuste: "cover",
    };
  }
  if (nivel === "5") {
    return {
      src: `/assets/lecciones/nivel-5-leccion-${String(numero).padStart(2, "0")}.webp`,
      alt: `Portada ilustrada de la leccion: ${titulo}`,
      ajuste: "cover",
    };
  }
  const diagrama = DIAGRAMAS[slug];
  if (diagrama) return diagrama;
  return {
    src: nombreArchivo(numero, slug),
    alt: `Portada ilustrada de la leccion: ${titulo}`,
    ajuste: "cover",
  };
}
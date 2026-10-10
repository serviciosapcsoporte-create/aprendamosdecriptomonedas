/**
 * Mini-portadas de las tarjetas de leccion.
 *
 * Los renders 3D llegan en la carpeta de recursos de octubre y hay menos que
 * lecciones, asi que se reparten por tema: wallet, seguridad, blockchain,
 * on-chain. Una leccion de wallets y otra de claves privadas comparten la
 * imagen porque el mismo objeto explica las dos.
 *
 * NO se usan fotogramas de los videos verticales de las lecciones: al recortarlos
 * a 16:9 salen frases partidas ("...es estar siempre dentro." a media pagina) y
 * en una tarjeta se leen como un error, no como una portada.
 *
 * Un slug sin entrada cae en la portada generica del nivel (`POR_DEFECTO`).
 */

export interface Miniatura {
  src: string;
  alt: string;
  /**
   * "contain" para los diagramas SVG, que son mucho mas anchos que 16:9
   * (900x320 y 900x420). Con "cover" el recorte se come "Bloque 1" y
   * "Bloque 3" y el diagrama se ve roto.
   */
  ajuste?: "cover" | "contain";
}

/** Portada del Nivel 1: la wallet con candado encaja con casi todo el bloque. */
const NIVEL_1: Record<string, Miniatura> = {
  "que-es-blockchain": {
    src: "/diagrams/blockchain-simple.svg",
    alt: "Diagrama de bloques enlazados: una cadena que no se puede reescribir",
    ajuste: "contain",
  },
  "como-funciona-un-bloque": {
    src: "/diagrams/block-structure.svg",
    alt: "Diagrama de la estructura interna de un bloque",
    ajuste: "contain",
  },
  "mineria-validacion": {
    src: "/assets/3d/banner-analitica-onchain.webp",
    alt: "Panel 3D de analitica con transacciones validadas en una red",
  },
  wallets: {
    src: "/assets/3d/nivel-1-wallet.webp",
    alt: "Ilustracion 3D de una cartera con candado",
  },
  "claves-publicas-privadas": {
    src: "/assets/3d/nivel-1-wallet.webp",
    alt: "Ilustracion 3D de una cartera con candado: acceso a los fondos",
  },
  "transacciones-fees": {
    src: "/assets/3d/banner-portfolio-csv.webp",
    alt: "Tableta 3D con una tabla de transacciones y sus costes",
  },
  "que-es-token-cripto": {
    src: "/assets/3d/banner-analitica-onchain.webp",
    alt: "Panel 3D de activos listados con precio y volumen",
  },
  "buenas-practicas": {
    src: "/assets/3d/banner-seguridad.webp",
    alt: "Escudo 3D con candado junto a una lista de verificacion de seguridad",
  },
  "evitar-estafas": {
    src: "/assets/3d/banner-seguridad.webp",
    alt: "Escudo 3D con señales de alerta por delante de una lista de control",
  },
  "cex-vs-dex": {
    src: "/assets/3d/banner-wallets-defi.webp",
    alt: "Hardware wallet 3D rodeada de paneles de intercambio y liquidez",
  },
  "seed-phrase-backups": {
    src: "/assets/3d/banner-seguridad.webp",
    alt: "Escudo 3D y lista de respaldo de una frase semilla",
  },
  "crear-wallet": {
    src: "/assets/3d/banner-wallets-defi.webp",
    alt: "Dispositivo y cartera 3D listos para empezar",
  },
  "hacer-transaccion": {
    src: "/assets/3d/mockup-lead-magnet.webp",
    alt: "Tableta 3D con una tabla de transacciones y su auditoria",
  },
  "entender-red": {
    src: "/assets/3d/nivel-5-global.webp",
    alt: "Globo 3D envuelto en una red de nodos",
  },
  "leer-transaccion-explorer": {
    src: "/assets/3d/banner-analitica-onchain.webp",
    alt: "Panel 3D con hash, comision, direccion y estado de una transaccion",
  },
};

/** Niveles 2 a 5 comparten los renders por tema hasta tener los suyos. */
const POR_NIVEL: Record<string, string> = {
  "1": "/assets/3d/nivel-1-wallet.webp",
  "2": "/assets/3d/nivel-2-blockchain.webp",
  "3": "/assets/3d/nivel-3-analitica.webp",
  "4": "/assets/3d/nivel-4-zk.webp",
  "5": "/assets/3d/nivel-5-global.webp",
};

const POR_DEFECTO: Miniatura = {
  src: "/assets/3d/nivel-2-blockchain.webp",
  alt: "Ilustracion 3D de nodos conectados",
};

export function miniaturaDe(nivel: string, slug: string): Miniatura {
  if (nivel === "1" && NIVEL_1[slug]) return NIVEL_1[slug];
  return { ...POR_DEFECTO, src: POR_NIVEL[nivel] ?? POR_DEFECTO.src };
}
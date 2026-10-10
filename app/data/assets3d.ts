/**
 * Rutas de los recursos 3D que viven en `public/assets/3d/`.
 *
 * Todo lo que se muestra con `<img>` en la landing se declara aquí para que la
 * ruta viva en un solo sitio: cambiar de archivo es cambiar una constante, no
 * cazar cadenas sueltas por los componentes. Las rutas son ABSOLUTAS desde la
 * raíz del sitio (`/assets/3d/...`) porque los archivos están en `public/`: Vite
 * los copia tal cual a `dist/` y así funcionan igual en dev y en GitHub Pages.
 *
 * Iconos de los 5 niveles: recortados del pliego "Set de Insignias 3D" quitando
 * el rótulo en inglés (la tarjeta del sitio ya pone el nombre en español). Su
 * fondo navy está remapeado al valor exacto de `--navy`, así que el icono solo
 * flota sobre la tarjeta sin que se vea el recorte.
 */

/** Icono 3D de cada nivel, en el mismo orden que `curriculumData`. */
export const NIVEL_ICON: Record<string, string> = {
  "1": "/assets/3d/nivel-1-wallet.webp",
  "2": "/assets/3d/nivel-2-blockchain.webp",
  "3": "/assets/3d/nivel-3-analitica.webp",
  "4": "/assets/3d/nivel-4-zk.webp",
  "5": "/assets/3d/nivel-5-global.webp",
};

/** Texto alternativo del icono de cada nivel. */
export const NIVEL_ICON_ALT: Record<string, string> = {
  "1": "Ilustración 3D de una cartera con candado: fundamentos y seguridad",
  "2": "Ilustración 3D de nodos conectados: blockchain y smart contracts",
  "3": "Ilustración 3D de un gráfico con lupa: análisis on-chain y trading",
  "4": "Ilustración 3D de un escudo ZK: pruebas de conocimiento cero y bots",
  "5": "Ilustración 3D de un globo con red: StarkNet y programación ZK",
};

/** Video del hero: moneda 3D girando en bucle, ya sin audio ni optimizada. */
export const HERO_VIDEO = {
  src: "/assets/3d/moneda-3d.mp4",
  poster: "/assets/3d/moneda-3d-poster.jpg",
  alt: "Moneda de bitcoin en 3D girando sobre una red de nodos",
};

export interface Recurso3D {
  href: string;
  titulo: string;
  texto: string;
  imagen: string;
  /** Texto alternativo: describe el render, no lo que "promete". */
  alt: string;
  etiqueta: string;
}

/** Grid 16:9 de recursos y blog. */
export const RECURSOS_3D: Recurso3D[] = [
  {
    href: "/recursos",
    titulo: "Analítica on-chain en CSV",
    texto:
      "Plantillas con hash, comisión, dirección y estado para leer una transacción sin salir de Excel.",
    imagen: "/assets/3d/banner-analitica-onchain.webp",
    alt: "Panel 3D de analítica de blockchain con tabla de transacciones y gráficos",
    etiqueta: "CSV",
  },
  {
    href: "/recursos/checklist-supervivencia-cripto",
    titulo: "Checklist de supervivencia cripto",
    texto:
      "La lista que se revisa antes de firmar, antes de conectar una wallet y antes de mover fondos.",
    imagen: "/assets/3d/banner-seguridad.webp",
    alt: "Escudo 3D con candado junto a una lista de verificación de seguridad",
    etiqueta: "Guía",
  },
  {
    href: "/recursos/el-custodio",
    titulo: "Wallets y DeFi paso a paso",
    texto:
      "Cómo se guarda una clave, qué es una seed phrase y por qué el orden de los pasos importa.",
    imagen: "/assets/3d/banner-wallets-defi.webp",
    alt: "Hardware wallet 3D rodeada de paneles de swap, liquidez y gobernanza",
    etiqueta: "Guía",
  },
  {
    href: "/recursos",
    titulo: "Paquete CSV de análisis",
    texto:
      "Cinco plantillas con su esquema y un ejemplo marcado como ejemplo, listas para pandas.",
    imagen: "/assets/3d/banner-portfolio-csv.webp",
    alt: "Tableta 3D de vidrio con una tabla de transacciones cripto en CSV y gráficos",
    etiqueta: "CSV",
  },
  {
    href: "/recursos",
    titulo: "Tu ruta, tu progreso",
    texto:
      "Cinco niveles ordenados para que sepas siempre qué tema sigue y cuál ya quedó atrás.",
    imagen: "/assets/3d/banner-ruta-progreso.webp",
    alt: "Panel 3D de progreso de aprendizaje con barra de avance y metas",
    etiqueta: "Ruta",
  },
  {
    href: "/blog",
    titulo: "Blog y comunidad",
    texto:
      "Artículos sobre lo que se moverá, lo que no y cómo leer los datos sin que te vendan humo.",
    imagen: "/assets/3d/banner-comunidad.webp",
    alt: "Ilustración 3D de personas conectadas en red con libros y portátiles",
    etiqueta: "Blog",
  },
];

/** Pruebas de confianza. El texto dice lo que el sitio sostiene de verdad. */
export const CONFIANZA = [
  {
    imagen: "/assets/3d/sello-educacion-real.webp",
    alt: "Medalla 3D con el texto 100% real",
    titulo: "Educación 100% real",
    texto:
      "Sin influencers, sin promesas falsas. Solo educación estructurada paso a paso.",
  },
  {
    imagen: "/assets/3d/banner-portfolio-csv.webp",
    alt: "Tableta 3D con una tabla de transacciones en CSV",
    titulo: "Plantillas, no datos inventados",
    texto:
      "Los CSV traen su esquema y un ejemplo marcado como ejemplo. Los números de una decisión salen de tu propia wallet, no de una tabla que te da un desconocido.",
  },
  {
    imagen: "/assets/3d/banner-comunidad.webp",
    alt: "Comunidad 3D de personas conectadas en red",
    titulo: "Comunidad activa",
    texto:
      "Estudiantes compartiendo hallazgos, dudas y estrategias en tiempo real.",
  },
];
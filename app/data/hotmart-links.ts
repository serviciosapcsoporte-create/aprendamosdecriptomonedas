/**
 * Recomendaciones de Hotmart por nivel.
 *
 * REGLAS (ver /afiliados y el Plan SEO + Monetización):
 * 1. Todo el contenido de este sitio es gratuito. El CTA es una recomendación
 *    externa, nunca un bloqueo.
 * 2. Solo entra un curso que realmente profundice lo que la lección explica.
 *    Nada de forex vendido como curso de cripto.
 * 3. Mientras `hotlink` sea un placeholder el CTA NO se renderiza (ver
 *    AffiliateCta.tsx): un enlace de afiliado roto es peor que no tener CTA.
 * 4. Nivel 2 y Nivel 5 no tienen equivalente en el catálogo y quedan
 *    deliberadamente vacíos. Forzar un curso ahí rompe la confianza.
 *
 * CÓMO PEGAR TUS HOTLINKS (no hay que tocar este archivo)
 * Crea `.env` en la raíz del repo con una línea por HotLink:
 *
 *   VITE_HOTMART_1=https://pay.hotmart.com/XXXXXXX
 *   VITE_HOTMART_3=https://pay.hotmart.com/YYYYYYY
 *
 * Sin esa variable el nivel se queda en placeholder y el CTA sigue apagado.
 * Ver `.env.example` y `npm run hotlinks` para el estado de cada nivel.
 *
 * offerId: se busca en Hotmart > Afiliados para solicitar la afiliación.
 * hotlink: se pega el enlace propio que genera Hotmart tras la aprobación.
 */

/**
 * Dominios que Hotmart usa para los HotLinks de pago. Un enlace que no sea de
 * aquí se descarta aunque venga del .env:ASI el CTA nunca puede apuntar a un
 * producto de otra plataforma, a un ejemplo o a una errata.
 */
const DOMINIOS_HOTLINK = ["pay.hotmart.com", "hotmart.com", "pay.hotmart.com.br", "sistecri.com.br"];

/** Un HotLink solo cuenta si es una URL de Hotmart completa. */
export function esHotlinkValido(hotlink: string | undefined | null): hotlink is string {
  if (!hotlink) return false;
  if (hotlink.startsWith("REEMPLAZAR_HOTLINK_")) return false;
  try {
    const u = new URL(hotlink);
    return u.protocol === "https:" && DOMINIOS_HOTLINK.includes(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Lee el HotLink de una variable de entorno con el prefijo VITE_HOTMART_. */
function hotlinkDeNivel(nivel: string, offerId: string): string {
  const desdeEnv = import.meta.env?.[`VITE_HOTMART_${nivel}`] as string | undefined;
  return esHotlinkValido(desdeEnv) ? desdeEnv.trim() : `REEMPLAZAR_HOTLINK_${offerId}`;
}

export interface CursoRecomendado {
  /** Nombre exacto del producto en Hotmart */
  curso: string;
  /** Para mostrar como respaldo de confianza */
  productor: string;
  /** Rating y reseñas, tal como los dio la API pública el 2026-09-30 */
  pruebaSocial: string;
  /** Offer ID: sirve para solicitar la afiliación y localizar el producto */
  offerId: string;
  /** Enlace del producto en el marketplace (público, no lleva comisión) */
  marketplaceUrl: string;
  /** Tu HotLink. Se pega en el .env con VITE_HOTMART_<nivel>. */
  hotlink: string;
  /** Por qué este curso y no otro: se escribe en el CTA */
  porQue: string;
  cta: string;
}

const pendiente = (offerId: string) => `REEMPLAZAR_HOTLINK_${offerId}`;

/**
 * Un solo curso por nivel: varias recomendaciones en la misma página compiten
 * entre sí y ninguna gana. El resto se reserva para los artículos comparativos.
 */
export const cursoPorNivel: Record<string, CursoRecomendado | null> = {
  "1": {
    curso: "Aprende a invertir en criptomonedas en menos de 3 días.",
    productor: "Carpe Diem Capital",
    pruebaSocial: "5.0 · 1 reseña",
    offerId: "489ep8q5",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/aprende-a-invertir-en-criptomonedas-en-3-dias/P51800262O",
    hotlink: hotlinkDeNivel("1", "489ep8q5"),
    porQue:
      "explica el proceso completo de compra paso a paso, que es justo lo que cubrimos en el Nivel 1",
    cta: "Ver el curso de inicio",
  },
  // El Nivel 2 es protocolo puro (hash, Merkle, nodos, oráculos). No hay
  // equivalente en español y meter un curso de trading aqui sería incoherente.
  "2": null,
  "3": {
    curso: "Formación Web 3.0",
    productor: "Crypto Mercado",
    pruebaSocial: "5.0 · 1 reseña · 130 clases",
    offerId: "hk7fjy4c",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/web30-programa-formativo/J42004217W",
    hotlink: hotlinkDeNivel("3", "hk7fjy4c"),
    porQue:
      "cubre NFT, Web3 y contratos inteligentes con 130 clases, que es de donde salen las dudas del Nivel 3",
    cta: "Ver el curso de Web 3 y NFT",
  },
  "4": {
    curso: "Método Arbitraje",
    productor: "M-cripto",
    pruebaSocial: "3.9 · 29 reseñas · 11 clases",
    offerId: "x3hsn03j",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/metodo-arbitraje/J58750549F",
    hotlink: hotlinkDeNivel("4", "x3hsn03j"),
    porQue:
      "va del arbitraje y el trading algorítmico al MEV, que es exactamente el tema de esta lección",
    cta: "Ver el curso de arbitraje",
  },
  // El Nivel 5 es arquitectura de protocolo: ZK, Cairo, restaking, regulación.
  // No existe producto equivalente en Hotmart. Decisión de negocio pendiente.
  "5": null,
};

/** Reservas para artículos comparativos o para añadir más adelante. */
export const cursosAlternativos: CursoRecomendado[] = [
  {
    curso: "CRIPTO BUZZ VIP",
    productor: "fabricio valdivieso stangl",
    pruebaSocial: "4.3 · 293 reseñas",
    offerId: "9w2alrpg",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/criptobuzz-vip/O59847700S",
    hotlink: pendiente("9w2alrpg"),
    porQue: "la mayor prueba social del lote para el Nivel 1",
    cta: "Ver el curso",
  },
  {
    curso: "Aprende a Invertir en Criptomonedas",
    productor: "Doble Digito",
    pruebaSocial: "5.0 · 1 reseña · 30 clases",
    offerId: "1l02glxc",
    marketplaceUrl: "https://hotmart.com/es/marketplace/productos/",
    hotlink: pendiente("1l02glxc"),
    porQue: "opción de entrada para el Nivel 1",
    cta: "Ver el curso",
  },
  {
    curso: "Universo Binance",
    productor: "Plan B",
    pruebaSocial: "5.0 · 1 reseña · 17 clases",
    offerId: "2cof6540",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/plan-b-2/Y49956736D",
    hotlink: pendiente("2cof6540"),
    porQue: "el paso a paso de compra y retiro en exchange",
    cta: "Ver el curso",
  },
  {
    curso: "Cripto: VIP Access",
    productor: "Bitcoinario.com",
    pruebaSocial: "4.82 · 38 reseñas · certificado",
    offerId: "zdx7yzur",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/cripto-vip-access/K19430582P",
    hotlink: pendiente("zdx7yzur"),
    porQue: "el único con certificado y 7 clases de nivel introductorio",
    cta: "Ver el curso",
  },
  {
    curso: "La Maquina Cripto NFT",
    productor: "MV Marketing",
    pruebaSocial: "4.0 · 12 reseñas · 8 h",
    offerId: "cucanbzz",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/tu-maquina-de-efectivo-digital-nft/G59317353E",
    hotlink: pendiente("cucanbzz"),
    porQue: "el recorrido completo del tema NFT del Nivel 3",
    cta: "Ver el curso de NFT",
  },
  {
    curso: "Blockchain, Criptomonedas y Trading",
    productor: "Santiago Clavijo Arias",
    pruebaSocial: "4.79 · 56 reseñas · 40 clases · certificado",
    offerId: "0uu26u30",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/blockchain-criptomonedas-y-trading/G28345815A",
    hotlink: pendiente("0uu26u30"),
    porQue: "el mejor del lote para pasar de entender a operar",
    cta: "Ver el curso",
  },
  {
    curso: "Profhitt – Fundamentos del Trading Desde Cero en 14 Días",
    productor: "Christian Guanopatin",
    pruebaSocial: "4.87 · 61 reseñas · 148 clases · comunidad",
    offerId: "x4ezys9z",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/profhitt-trading-desde-cero-para-el-mercado-de-forex/R82043606A",
    hotlink: pendiente("x4ezys9z"),
    porQue: "148 clases con comunidad activa, la opción más completa",
    cta: "Ver el curso",
  },
  {
    curso: "Arbitraje de criptomonedas 2022",
    productor: "Only Progress",
    pruebaSocial: "5.0 · 3 reseñas",
    offerId: "bq4d2dh6",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/arbitraje-de-criptomonedas-2022/O69666867H",
    hotlink: pendiente("bq4d2dh6"),
    porQue: "alternativa a Método Arbitraje; verificar antigüedad del contenido",
    cta: "Ver el curso",
  },
  {
    curso: "BOT DE TRADING | Estrategia Algorítmica",
    productor: "Vix Trading",
    pruebaSocial: "5.0 · 4 reseñas",
    offerId: "l8h6kyzn",
    marketplaceUrl:
      "https://hotmart.com/es/marketplace/productos/estrategia-automatica-de-trading-de-futuros/Q69591512Y",
    hotlink: pendiente("l8h6kyzn"),
    porQue: "el tema bots de la lección de MEV del Nivel 4",
    cta: "Ver el curso de bots",
  },
];

export function estaActivo(curso: CursoRecomendado | null): curso is CursoRecomendado {
  return esHotlinkValido(curso?.hotlink);
}
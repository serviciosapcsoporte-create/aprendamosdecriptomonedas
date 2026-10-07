/**
 * Cursos de Hotmart organizados por nivel del sitio.
 *
 * REGLAS (ver /afiliados y el Plan SEO + Monetización):
 * 1. Todo el contenido de este sitio es gratuito. El CTA es una recomendación
 *    externa, nunca un bloqueo.
 * 2. Solo entra un curso que realmente profundice lo que la sección explica.
 *    Nada de forex vendido como curso de cripto en niveles sin trading.
 * 3. Si un link no es de dominio Hotmart, `estaActivo` lo descarta y el CTA de
 *    ese curso no se renderiza (ver AffiliateCta.tsx): un enlace de afiliado
 *    roto es peor que no tener CTA.
 * 4. Nivel 5 no tiene equivalente en el catálogo y queda deliberadamente
 *    vacío. Forzar un curso ahí rompe la confianza.
 *
 * LINKS: van fijos en este archivo (decisión 2026-10). Cada `linkVentas` es la
 * página de ventas del producto, verificado con redirect 200 el 2026-10-07.
 * El único con `?dp=1` es Nivel 2: la landing del productor está caída (404)
 * y con ese parámetro cae directo en la página de ventas de Hotmart.
 *
 * offerId: se busca en Hotmart > Afiliados para solicitar la afiliación.
 * "N/D": producto donde la API pública no expuso offer id; localizar en el
 * marketplace con marketplaceUrl.
 */

/**
 * Dominios que Hotmart usa para los enlaces de pago/afiliado. Un enlace que no
 * sea de aquí se descarta aunque venga de una edición manual: así el CTA nunca
 * puede apuntar a una plataforma ajena, a un ejemplo o a una errata.
 */
const DOMINIOS_HOTLINK = [
  "go.hotmart.com",
  "pay.hotmart.com",
  "hotmart.com",
  "pay.hotmart.com.br",
  "sistecri.com.br",
];

/** Un enlace de venta solo cuenta si es una URL https de Hotmart completa. */
export function esHotlinkValido(link: string | undefined | null): link is string {
  if (!link) return false;
  try {
    const u = new URL(link);
    return u.protocol === "https:" && DOMINIOS_HOTLINK.includes(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export interface CursoRecomendado {
  /** Nombre exacto del producto en Hotmart */
  curso: string;
  /** Para mostrar como respaldo de confianza */
  productor: string;
  /** Rating y reseñas tal como los muestra el marketplace */
  pruebaSocial: string;
  /** Offer ID para solicitar la afiliación; "N/D" si la API no lo expuso */
  offerId: string;
  /** Página pública del producto en el marketplace (sin comisión) */
  marketplaceUrl: string;
  /** Página de ventas: el destino real del CTA principal */
  linkVentas: string;
  /** Por qué este curso y no otro: se escribe en el CTA */
  porQue: string;
  /** Texto del botón principal */
  cta: string;
}

/**
 * Un solo curso abre el CTA de cada nivel y el resto entra como enlaces
 * secundarios: varias recomendaciones compitiendo como botones ninguna gana.
 */
export const cursosPorNivel: Record<string, CursoRecomendado[]> = {
  "1": [
    {
      curso: "Aprende a invertir en criptomonedas en menos de 3 días.",
      productor: "Carpe Diem Capital",
      pruebaSocial: "5.0 · 1 reseña · 11 clases",
      offerId: "489ep8q5",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/aprende-a-invertir-en-criptomonedas-en-3-dias/P51800262O",
      linkVentas: "https://go.hotmart.com/L107924590C",
      porQue:
        "explica el proceso completo de compra paso a paso, que es justo lo que cubrimos en el Nivel 1",
      cta: "Ver el curso de inicio",
    },
    {
      curso: "Cripto: VIP Access",
      productor: "Bitcoinario.com",
      pruebaSocial: "4.82 · 38 reseñas · certificado",
      offerId: "zdx7yzur",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/cripto-vip-access/K19430582P",
      linkVentas: "https://go.hotmart.com/C107924474S",
      porQue:
        "recorre 7 módulos introductorios con certificado que repasan wallets, exchange y seguridad",
      cta: "Ver el curso con certificado",
    },
    {
      curso: "Universo Binance",
      productor: "Plan B",
      pruebaSocial: "5.0 · 1 reseña · 17 clases",
      offerId: "2cof6540",
      marketplaceUrl: "https://hotmart.com/es/marketplace/productos/plan-b-2/Y49956736D",
      linkVentas: "https://go.hotmart.com/Q107924606V",
      porQue:
        "incluye el paso a paso de compra y retiro en exchange que practicas en las lecciones de wallets y CEX vs DEX",
      cta: "Ver el curso de exchange",
    },
  ],
  "2": [
    {
      curso: "Blockchain, Criptomonedas y Trading",
      productor: "Santiago Clavijo Arias",
      pruebaSocial: "4.79 · 56 reseñas · 40 clases · certificado",
      offerId: "0uu26u30",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/blockchain-criptomonedas-y-trading/G28345815A",
      // La landing del productor (gr8.com) responde 404: ?dp=1 salta a la
      // página de ventas de Hotmart y mantiene la atribución.
      linkVentas: "https://go.hotmart.com/V107924570Q?dp=1",
      porQue:
        "recorre 40 clases sobre blockchain, smart contracts y economía cripto, la base técnica del Nivel 2",
      cta: "Ver el curso de blockchain",
    },
  ],
  "3": [
    {
      curso: "ing. trading",
      productor: "tradingtd0",
      pruebaSocial: "4.33 · 6 reseñas · 50 clases · certificado",
      offerId: "nopzl1hw",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/ingeniero-trading/Y79533690G",
      linkVentas: "https://go.hotmart.com/G107924594S",
      porQue:
        "reúne 50 clases de fundamentos, gestión de riesgo y disciplina para la sección Trading Avanzado",
      cta: "Ver el curso de trading",
    },
    {
      curso: "Curso Avanzado de Forex – Aprende desde 0 hasta un experto",
      productor: "Fortradingex Marketing",
      pruebaSocial: "Sin reseñas públicas en Hotmart",
      offerId: "N/D",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/curso-avanzado-de-forex-aprende-desde-0-hasta-un-experto/N100178508U",
      linkVentas: "https://go.hotmart.com/I107924622W",
      porQue:
        "aplica el análisis técnico a un mercado 24/5 como complemento de la sección Trading Avanzado",
      cta: "Ver el curso de Forex",
    },
  ],
  "4": [
    {
      curso: "Curso Intensivo de Arbitraje Financiero",
      productor: "Nicolás Salazar",
      pruebaSocial: "5.0 · 4 reseñas · 30 clases",
      offerId: "N/D",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/curso-intensivo-de-arbitraje-financiero/K82706275U",
      linkVentas: "https://go.hotmart.com/U107924633L",
      porQue:
        "trabaja el arbitraje sobre diferencias de precio, la misma lógica que aparece en MEV y Trading Algorítmico",
      cta: "Ver el curso de arbitraje",
    },
    {
      curso: "Estrategia para Futuros Nasdaq Wyckoff",
      productor: "NeySER",
      pruebaSocial: "4.8 · 5 reseñas",
      offerId: "1ekpogdr",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/estrategia-para-futuros-rt-macro/K47523070R",
      linkVentas: "https://go.hotmart.com/O107924637I",
      porQue:
        "enseña las fases de mercado según Wyckoff para la sección Trading del Nivel 4",
      cta: "Ver la estrategia Wyckoff",
    },
    {
      curso: "BOT DE TRADING | Estrategia Algorítmica (NinjaTrader 8)",
      productor: "Vix Trading",
      pruebaSocial: "5.0 · 4 reseñas",
      offerId: "l8h6kyzn",
      marketplaceUrl:
        "https://hotmart.com/es/marketplace/productos/estrategia-automatica-de-trading-de-futuros/Q69591512Y",
      linkVentas: "https://go.hotmart.com/P107924681T",
      porQue:
        "muestra la automatización de una estrategia con parámetros definidos, encaja con Trading Algorítmico",
      cta: "Ver el curso de bots",
    },
  ],
  // El Nivel 5 es ZK, restaking y regulación. No existe producto equivalente
  // en Hotmart. Decisión de negocio pendiente.
  "5": [],
};

/** Un curso solo cuenta para el CTA si su link de venta es Hotmart https. */
export function estaActivo(curso: CursoRecomendado | null | undefined): curso is CursoRecomendado {
  return esHotlinkValido(curso?.linkVentas);
}

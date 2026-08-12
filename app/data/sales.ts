export interface SalesOffer {
  level: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  eyebrow: string;
  price: string;
  priceNote: string;
  flagLine: string;
  ctaLabel: string;
  funnelUrl: string;
  funnelTarget?: string;
  topics: number;
  sections: { title: string; highlights: string[] }[];
  outcomes: string[];
  includes: string[];
  faqs: { q: string; a: string }[];
}

export const salesOffers: Record<string, SalesOffer> = {
  "nivel-3": {
    level: "NIVEL 3",
    slug: "nivel-3-avanzado",
    title: "Avanzado",
    tagline: "Deja de operar con tutoriales sueltos y estructura tu carrera en cripto",
    description:
      "El Nivel 3 es gratis. Solo crea tu cuenta en systeme.io y desbloquea 18 temas avanzados: DeFi profundo, trading con gestión de riesgo y Layer 2.",
    eyebrow: "GRATIS · REGISTRO",
    price: "Gratis",
    priceNote: "Sin tarjeta · Acceso inmediato",
    flagLine: "Acceso de por vida",
    ctaLabel: "Desbloquear Nivel 3 gratis",
    funnelUrl: "https://aprendamosdecriptomonedas.systeme.io/nivel-3",
    topics: 18,
    sections: [
      {
        title: "DeFi y Trading",
        highlights: ["DEX vs Exchange centralizado", "Automated Market Makers (AMM)", "Préstamos y oráculos"],
      },
      {
        title: "Cross-Chain y Escalabilidad",
        highlights: ["Puentes entre redes", "Layer 2: Rollups y Sidechains", "Identidad y gobernanza on-chain"],
      },
      {
        title: "Seguridad Avanzada",
        highlights: ["Privacidad en cripto", "Minería y Proof of Stake", "NFTs y tokens de gobernanza"],
      },
    ],
    outcomes: [
      "Operar DeFi con criterio, sin perder dinero por errores de novato.",
      "Entender Layer 2 y elegir la red correcta para cada operación.",
      "Analizar protocolos y tokens antes de invertir un solo dólar.",
    ],
    includes: [
      "18 temas avanzados organizados en 10 secciones",
      "Recursos descargables y diagramas de cada tema",
      "Actualizaciones del nivel para siempre",
    ],
    faqs: [
      {
        q: "¿Es realmente gratis?",
        a: "Sí. El Nivel 3 no tiene costo. Solo necesitas una cuenta en systeme.io para que tengas acceso de por vida y podamos notificarte de actualizaciones.",
      },
      {
        q: "¿Necesito tarjeta de crédito?",
        a: "No. El registro es gratuito y no se te cobrará nada.",
      },
      {
        q: "¿Qué incluye?",
        a: "18 temas avanzados de DeFi, trading, Layer 2, privacidad y gobernanza, con recursos descargables.",
      },
    ],
  },
  "nivel-4": {
    level: "NIVEL 4",
    slug: "nivel-4-experto",
    title: "Experto",
    tagline: "El nivel donde la mayoría se estanca. Y por eso te separa del 95%.",
    description:
      "Sistemas distribuidos, ZK-tech, trading algorítmico y DeFi profesional. 13 temas de nivel experto, acceso de por vida, pago único de $39.",
    eyebrow: "PREMIUM · $39 USD",
    price: "$39",
    priceNote: "Pago único · Acceso de por vida",
    flagLine: "Incluye Nivel 3 gratis",
    ctaLabel: "Comprar Nivel 4 — $39",
    funnelUrl: "https://aprendamosdecriptomonedas.systeme.io/nivel-4",
    topics: 13,
    sections: [
      {
        title: "Layer 2 y ZK-tech",
        highlights: ["Zk rollups: cómo funcionan por dentro", "Sistemas distribuidos", "Cross-chain messaging"],
      },
      {
        title: "Trading profesional",
        highlights: ["Bots de arbitraje", "MEV y sandwich attacks", "Trading algorítmico"],
      },
      {
        title: "DeFi avanzado y seguridad",
        highlights: ["Custodia institucional", "Staking y finanzas descentralizadas", "Análisis on-chain profundo"],
      },
    ],
    outcomes: [
      "Entender la tecnología que está definiendo la próxima década de cripto: ZK y escalabilidad.",
      "Diseñar estrategias de trading algorítmico con el framework de riesgo correcto.",
      "Analizar protocolos a nivel institucional antes de exponer tu capital.",
    ],
    includes: [
      "13 temas de nivel experto en 10 secciones",
      "Recursos descargables y diagramas técnicos",
      "Acceso de por vida + actualizaciones",
      "Se incluye el Nivel 3 (Avanzado) gratis",
    ],
    faqs: [
      {
        q: "¿Es un pago único?",
        a: "Sí. Pagás $39 una sola vez y accedés al Nivel 4 de por vida, incluidas las actualizaciones.",
      },
      {
        q: "¿Cómo se procesa el pago?",
        a: "Con PayPal de forma segura a través de la plataforma de pagos de systeme.io. También podés pagar con tarjeta si lo preferís.",
      },
      {
        q: "¿Necesito el Nivel 3 primero?",
        a: "No es obligatorio, pero al comprar el Nivel 4 se incluye el Nivel 3 (Avanzado) sin costo adicional.",
      },
    ],
  },
  "nivel-5": {
    level: "NIVEL 5",
    slug: "nivel-5-especializaciones",
    title: "Especializaciones",
    tagline: "Plata: Ethereum Scaling, Blockchain Modular y el futuro de Web3",
    description:
      "ZK Programming, EigenLayer, resto de las cadenas modulares, marco regulatorio global. 11 especializaciones de vanguardia por $45 de pago único.",
    eyebrow: "PREMIUM · $45 USD",
    price: "$45",
    priceNote: "Pago único · Acceso de por vida",
    flagLine: "Incluye Niveles 3 y 4",
    ctaLabel: "Comprar Nivel 5 — $45",
    funnelUrl: "https://aprendamosdecriptomonedas.systeme.io/nivel-5",
    topics: 11,
    sections: [
      {
        title: "Ethereum Scaling",
        highlights: ["ZK Programming / Cairo", "StarkNet y desarrollo escalable", "EigenLayer y restaking"],
      },
      {
        title: "Blockchain Modular",
        highlights: ["Cadenas modulares", "Wallet tech y recuperación social", "Cross-chain avanzado"],
      },
      {
        title: "Regulación y futuro",
        highlights: ["Frameworks regulatorios globales", "Privacidad y compliance", "Finanzas y desarrollo avanzado"],
      },
    ],
    outcomes: [
      "Leer y escribir en la frontera del conocimiento: ZK, scaling y modularidad.",
      "Posicionarte para las oportunidades que aún no existen como industria madura.",
      "Entender el marco regulatorio que definirá quién gana en Web3.",
    ],
    includes: [
      "11 especializaciones de vanguardia en 10 secciones",
      "Recursos descargables y diagramas técnicos",
      "Acceso de por vida + actualizaciones",
      "Se incluyen Niveles 3 y 4 completos",
    ],
    faqs: [
      {
        q: "¿Qué tan avanzado es?",
        a: "Es el nivel más profundo de la guía. Está pensado para quien ya domina los fundamentos y quiere operar en la frontera técnica.",
      },
      {
        q: "¿Está en español?",
        a: "Sí, todo el contenido está en español, con términos técnicos explicados sin humo.",
      },
      {
        q: "¿Hay garantía?",
        a: "Tenés acceso de por vida y actualizaciones. Si algo no funciona, te ayudamos a resolverlo.",
      },
    ],
  },
};

export interface PayMethod {
  icon: string;
  label: string;
}

export const payMethods: PayMethod[] = [
  { icon: "₿", label: "PayPal" },
  { icon: "💳", label: "Tarjeta" },
];
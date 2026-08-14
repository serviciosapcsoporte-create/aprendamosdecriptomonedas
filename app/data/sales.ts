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

   "el-custodio": {
     level: "CUENTA GRATIS",
     slug: "el-custodio-de-su-propiedad-libertad",
     title: "El Custodio de su propia Libertad",
     tagline: "Reclamá el control de tus claves, tu dinero y tu privacidad en cripto. Sin intermediarios.",
     description:
       "Guía práctica para gestionar tu propio wallet, claves privadas, backups y privacidad. Descargable en PDF, acceso inmediato y gratis.",
     eyebrow: "GRATIS · REGISTRO",
     price: "Gratis",
     priceNote: "Sin cargo · Acceso inmediato al PDF",
     flagLine: "PDF descargable",
     ctaLabel: "Descargar El Custodio gratis",
     funnelUrl: "https://aprendamosdecriptomonedas.lat/el-custodio-de-su-propiedad-libertad",
     topics: 5,
     sections: [
       {
         title: "Wallet y claves",
         highlights: ["Claves privadas vs públicas", "Tipos de wallet (hot, cold, hardware)", "Backup y recuperación"],
       },
       {
         title: "Privacidad",
         highlights: ["¿Qué transacciones son públicas?", "Uso de Tor y VPNs", "Prácticas de harding"],
       },
       {
         title: "Gestión práctica",
         highlights: ["Envíos seguros", "Firmas y verificación", "Errores comunes que cuestan dinero"],
       },
     ],
     outcomes: [
       "Manejar tu wallet sin depender de terceros.",
       "Proteger tus claves y backups sin perder el acceso.",
       "Operar con privacidad real en cada transacción.",
     ],
     includes: [
       "Guía en PDF listo para descargar",
       "5 temas prácticos",
       "3 secciones organizadas",
       "Ejemplos reales y errores que cuesta cometer",
     ],
     faqs: [
       {
         q: "¿Es realmente gratis?",
         a: "Sí. No se pide tarjeta ni dato. Solo descargás el PDF al instante.",
       },
       {
         q: "¿En qué formato es?",
         a: "PDF descargable, en español, listo para leer o imprimir.",
       },
       {
         q: "¿Necesito cuenta?",
         a: "No. El acceso es inmediato sin registro.",
       },
     ],
   },

   "el-escudo": {
     level: "CUENTA GRATIS",
     slug: "el-escudo-de-5-minutos",
     title: "El Escudo de 5 minutos",
     tagline: "Protegé tu cartera en menos tiempo del que te demora leer este título. Checklist express.",
     description:
       "Checklist de 5 minutos para proteger tu wallet, claves y holdings. Ideal antes de cualquier transacción. Gratis.",
     eyebrow: "GRATIS",
     price: "Gratis",
     priceNote: "Sin cargo · Acceso inmediato al checklist",
     flagLine: "Checklist PDF",
     ctaLabel: "Descargar El Escudo gratis",
     funnelUrl: "https://aprendamosdecriptomonedas.lat/el-escudo-de-5-minutos",
     topics: 8,
     sections: [
       {
         title: "Antes de firmar",
         highlights: ["Verificá el destino exacto", "Revisá comisiones", "Firmas de contratos"],
       },
       {
         title: "Wallet hardening",
         highlights: ["Seed offline", "2FA y passphrase", "¿Hardware wallet?"],
       },
       {
         title: "Redacción de backups",
         highlights: ["Dónde guardar la seed", "Versionado y rotación", "Amenazas físicas y digitales"],
       },
     ],
     outcomes: [
       "Bloquear las 3 fallas que roban wallets todos los días.",
       "Hacer una checklist de seguridad en 5 minutos.",
       "Operar sin exponer tu backup ni claves.",
     ],
     includes: [
       "Checklist PDF imprimible",
       "8 items de seguridad",
       "3 minis-secciones",
       "Formato quick reference",
     ],
     faqs: [
       {
         q: "¿Para qué sirve?",
         a: "Es el checklist express que usamos antes de cada operación grande.",
       },
       {
         q: "¿Se necesita conocimiento técnico?",
         a: "No. Está pensado para principiantes y curiosos.",
       },
       {
         q: "¿Es gratis?",
         a: "Sí, acceso inmediato al PDF sin cargo.",
       },
     ],
   },

   "el-checklist": {
     level: "CUENTA GRATIS",
     slug: "checklist-de-supervivencia-cripto",
     title: "Checklist de Supervivencia Cripto",
     tagline: "10 pasos para no perder la cabeza (ni el portafolio) en cripto.",
     description:
       "Checklist de supervivencia para navegar el ciclo cripto sin perder todo. Mindset, gestión de riesgo y checklist operativo. Gratis.",
     eyebrow: "GRATIS",
     price: "Gratis",
     priceNote: "Sin cargo · Acceso inmediato al PDF",
     flagLine: "Checklist + Mindset",
     ctaLabel: "Descargar Checklist gratis",
     funnelUrl: "https://aprendamosdecriptomonedas.lat/checklist-de-supervivencia-cripto",
     topics: 10,
     sections: [
       {
         title: "Mindset",
         highlights: ["¿Por qué se pierde?", "Emociones y ciclos", "No fiddles, no panic"],
       },
       {
         title: "Gestión de riesgo",
         highlights: ["Posición por trade", "Stop loss y take profit", "Tamaño de posición"],
       },
       {
         title: "Checklist operativo",
         highlights: ["Antes de operar", "Durante la operación", "Cierre y registro"],
       },
     ],
     outcomes: [
       "Evitar las 5 trampas psicológicas del trading cripto.",
       "Aplicar una checklist real antes de cada operación.",
       "Proteger tu capital en mercados volátiles.",
     ],
     includes: [
       "Checklist PDF descargable",
       "10 pasos de supervivencia",
       "3 secciones (mindset, riesgo, operativo)",
       "Ejemplos de trades reales",
     ],
     faqs: [
       {
         q: "¿Quién lo escribió?",
         a: "Comunidad Aprendamos de Criptomonedas, validado con traders activos.",
       },
       {
         q: "¿Se actualiza?",
         a: "Sí, versión perpetual. Recibís updates vía email si dejás tu mail.",
       },
       {
         q: "¿Es gratis?",
         a: "Sí, sin cargo. Acceso inmediato al PDF.",
       },
     ],
   },

   "el-inversor": {
     level: "CUENTA GRATIS",
     slug: "el-inversor-que-sobrevive",
     title: "El Inversor que Sobrevive",
     tagline: "Cómo invertir en cripto pensando en años, no en tweets. Guía de inversión a largo plazo.",
     description:
       "Guía de inversión cripto de mediano/largo plazo: análisis de redes, tokenomics, ciclos y portafolio estructurado. Gratis.",
     eyebrow: "GRATIS",
     price: "Gratis",
     priceNote: "Sin cargo · Acceso inmediato al PDF",
     flagLine: "Invierte con criterio",
     ctaLabel: "Descargar El Inversor gratis",
     funnelUrl: "https://aprendamosdecriptomonedas.lat/el-inversor-que-sobrevive",
     topics: 7,
     sections: [
       {
         title: "Fundamentos de inversión",
         highlights: ["Time horizon vs trading", "Riesgo vs recompensa", "Diversificación real"],
       },
       {
         title: "Análisis de red",
         highlights: ["Metodología de evaluación", "Indicadores on-chain", "Tokenomics"],
       },
       {
         title: "Construcción de portafolio",
         highlights: ["Asset allocation", "Re-equilibrio", "Dónde guardar"],
       },
     ],
     outcomes: [
       "Construir un portafolio cripto pensado para el largo plazo.",
       "Evaluar redes y tokens con un marco analítico sólido.",
       "Evitar las trampas del investment hype.",
     ],
     includes: [
       "Guía PDF descargable",
       "7 secciones analíticas",
       "Checklist de evaluación de proyectos",
       "Plantilla de portafolio",
     ],
     faqs: [
       {
         q: "¿Necesito experiencia?",
         a: "No. La guía empieza desde conceptos básicos de inversión.",
       },
       {
         q: "¿Es gratis?",
         a: "Sí. Acceso inmediato al PDF sin cargo.",
       },
       {
         q: "¿Se puede combinar con los niveles?",
         a: "Sí. Esta guía complementa los Niveles 3, 4 y 5.",
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
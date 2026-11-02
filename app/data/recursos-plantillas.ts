/**
 * Landing pages de las 8 plantillas del Kit Institucional.
 *
 * POR QUE EXISTEN
 * El kit se servia solo como descarga (ZIP y archivos sueltos). Cada plantilla
 * tiene ahora su pagina con el esquema de datos real, un ejemplo y los tres
 * formatos, para que quien llega desde una busqueda entienda que compra antes
 * de descargar. El esquema de aqui NO se inventa: sale de los CSV de
 * public/recursos/ (encabezado y fila [EJEMPLO REAL]).
 *
 * REGLA
 * Los textos de `title`/`description` de cada ruta viven en su .tsx, no aqui:
 * scripts/prerender.mjs los lee con una expresion regular del propio head y no
 * evalua plantillas. Duplicarlos aqui solo crearia dos fuentes de verdad.
 */

export interface VariablePlantilla {
  /** Nombre exacto de la columna en el CSV. */
  key: string;
  /** Que es y como se calcula o verifica. */
  description: string;
}

export interface PlantillaRecurso {
  slug: string;
  badge: string;
  nombre: string;
  resumen: string;
  variables: VariablePlantilla[];
  /** Fila [EJEMPLO REAL] del CSV, resumida. */
  ejemplo: string;
}

export const PLANTILLAS: PlantillaRecurso[] = [
  {
    slug: "plantilla-analisis-wallet",
    badge: "Seguridad on-chain",
    nombre: "Plantilla de Análisis de Wallet",
    resumen:
      "Cómo auditar una wallet: antigüedad, cadencia de transacciones, concentración de activos y envíos hacia exchanges.",
    variables: [
      {
        key: "direccion",
        description: "Dirección analizada, tal cual aparece en el explorador de bloques.",
      },
      {
        key: "primera_actividad",
        description: "Fecha del primer bloque que toca la wallet: ahí empieza la antigüedad real.",
      },
      {
        key: "ultima_actividad",
        description: "Fecha del último bloque. Con la primera da la ventana de actividad.",
      },
      {
        key: "dias_activo",
        description: "Antigüedad real: última actividad menos primera actividad.",
      },
      {
        key: "num_transacciones",
        description: "Volumen total de transacciones contadas en el explorador.",
      },
      {
        key: "txns_por_mes",
        description: "Cadencia de operación: transacciones / días activo × 30.",
      },
      {
        key: "saldo_nativo",
        description: "Cripto nativa que mantiene sin operar.",
      },
      {
        key: "valor_usd_estimado",
        description: "Saldo nativo × precio del día en el exchange que uses.",
      },
      {
        key: "contratos_interactuados",
        description: "Protocolos distintos que ha tocado, contando direcciones en los logs.",
      },
      {
        key: "envios_a_cex",
        description: "Veces que envió fondos a un exchange, cruzando direcciones de CEX conocidas.",
      },
      {
        key: "riesgo_cex",
        description: "Proporción de envíos a exchanges sobre el total de transacciones.",
      },
      {
        key: "token_rug_pull",
        description: "Tokens que se desplomaron después de retirar liquidez.",
      },
      {
        key: "notas",
        description: "Tu criterio en texto libre: lo que un CSV no puede saber.",
      },
    ],
    ejemplo:
      "0x1a2b…9f · 623 días activa · 1.842 transacciones · 88,7 tx/mes · 9 envíos a CEX (0,49 %) · 2 tokens colapsados. Datos inventados para ilustrar.",
  },
  {
    slug: "plantilla-metricas-red",
    badge: "Tokenómica",
    nombre: "Plantilla de Métricas de Red",
    resumen:
      "Los ratios que separan un proyecto sólido de una preventa: FDV/MCap, rotación y calendarios de desbloqueo.",
    variables: [
      {
        key: "precio",
        description: "Precio de referencia en USD: cierre del día en el exchange que uses.",
      },
      {
        key: "market_cap",
        description: "Capitalización total: precio × oferta en circulación.",
      },
      {
        key: "fdv",
        description: "Valor totalmente diluido: precio × oferta máxima.",
      },
      {
        key: "fdv_mcap_ratio",
        description: "Riesgo de desbloqueo: FDV / market cap. Por encima de 3 es dilución alta.",
      },
      {
        key: "volumen_24h",
        description: "Volumen negociado en 24 h: liquidez real, no la del bloque.",
      },
      {
        key: "vol_mcap",
        description: "Rotación: volumen 24 h / market cap.",
      },
      {
        key: "supply_circulante",
        description: "Tokens ya liberados, del explorador o del informe del proyecto.",
      },
      {
        key: "supply_maximo",
        description: "Techo de emisión según el tokenomics: cuánto falta por emitir.",
      },
      {
        key: "desbloqueo_90d",
        description: "Supply que se libera en 90 días según los vesting schedules publicados.",
      },
      {
        key: "holders_totales",
        description: "Direcciones con saldo: concentración de la distribución.",
      },
      {
        key: "top10_concentracion",
        description: "Porcentaje en las 10 mayores wallets. Sobre 50 % es centralización alta.",
      },
      {
        key: "mcap_a_real",
        description: "Market cap frente a ingresos o reservas tangibles. Solo aplica a activos con caja.",
      },
    ],
    ejemplo:
      "Precio 64.500 · mcap 1,26 B · FDV 1,34 B · FDV/mcap 1,06 · volumen 28 B · rotación 2,22 % · supply 19,7 M/21 M · desbloqueo 90 d 0 · holders 1,02 M · top 10 12,4 %. Datos de ejemplo.",
  },
  {
    slug: "checklist-seguridad",
    badge: "Auditoría",
    nombre: "Checklist de Seguridad Institucional",
    resumen:
      "12 puntos verificables en diez minutos sobre custodia, frases de recuperación, hardware wallets y firmas operativas.",
    variables: [
      {
        key: "marcador",
        description: "[EJEMPLO REAL] marca la fila de guía; vacío para tus propios datos.",
      },
      {
        key: "#",
        description: "Número del punto de control, del 1 al 12.",
      },
      {
        key: "punto_de_control",
        description: "El control que se verifica, en una frase concreta.",
      },
      {
        key: "como_se_verifica",
        description: "El paso exacto para comprobarlo, no la teoría.",
      },
      {
        key: "categoria",
        description: "llaves, custodia, accesos u operativa.",
      },
      {
        key: "estado",
        description: "cumple / pendiente / no aplica. Sin este campo la lista no sirve.",
      },
    ],
    ejemplo:
      "Punto 1: seed phrase anotada en papel o metal, nunca en una foto; se revisa que no exista captura en la galería. Categoría llaves.",
  },
  {
    slug: "registro-operaciones",
    badge: "Gestión de riesgo",
    nombre: "Registro de Operaciones & Trading Log",
    resumen:
      "Lleva el registro estricto de cada compra, venta, nivel de stop-loss y la justificación táctica de tu decisión.",
    variables: [
      {
        key: "fecha",
        description: "Fecha de la operación en ISO (AAAA-MM-DD).",
      },
      {
        key: "activo",
        description: "El activo o par operado: BTC, ETH, el que sea.",
      },
      {
        key: "operacion",
        description: "compra, venta, apertura o cierre.",
      },
      {
        key: "entrada",
        description: "Cantidad del activo, no el valor en USD.",
      },
      {
        key: "salida",
        description: "Cantidad cerrada, si aplica. Vacío mientras la posición sigue abierta.",
      },
      {
        key: "precio_entrada",
        description: "Precio de ejecución real, no el que esperabas.",
      },
      {
        key: "precio_salida",
        description: "Precio de cierre real de la operación.",
      },
      {
        key: "resultado_pct",
        description: "Resultado calculado sobre entrada y salida.",
      },
      {
        key: "stop_loss",
        description: "Nivel de invalidación definido antes de entrar.",
      },
      {
        key: "notas",
        description: "La justificación táctica: por qué entraste y por qué saliste.",
      },
    ],
    ejemplo:
      "BTC · compra 0,05 a 42.000 con stop en 39.500 · 15/01/2026. La nota explica la decisión; el resultado no se toca.",
  },
  {
    slug: "inventario-wallets",
    badge: "Custodia",
    nombre: "Inventario de Wallets & Cold Storage",
    resumen:
      "Control de balance real: audita cuánto capital tienes depositado en exchanges y cuánto controlas bajo custodia propia.",
    variables: [
      {
        key: "etiqueta",
        description: "Nombre con el que reconoces esa wallet: Operativa, Ahorro, Reserva.",
      },
      {
        key: "tipo",
        description: "hot, cold, exchange o multisig.",
      },
      {
        key: "donde_vive",
        description: "Dispositivo o plataforma donde está: extensión, hardware, exchange.",
      },
      {
        key: "contenido_aprox_usd",
        description: "Valor aproximado custodiado en esa wallet.",
      },
      {
        key: "para_que",
        description: "Para qué la usas: operar, recibir o largo plazo.",
      },
      {
        key: "respaldo_verificado",
        description: "si / no / no aplica: si ya probaste recuperarla, no si crees que podrías.",
      },
    ],
    ejemplo:
      "Operativa (hot) en extensión del portátil con 850 USD para operar; ahorro en cold con respaldo verificado.",
  },
  {
    slug: "calculadora-riesgo",
    badge: "Risk sizing",
    nombre: "Calculadora de Posición & Risk Sizing",
    resumen:
      "Tamaño exacto de la posición según capital total, tolerancia al riesgo por operación y distancia al stop-loss.",
    variables: [
      {
        key: "capital_total",
        description: "Capital total destinado a trading, no el saldo de una sola cuenta.",
      },
      {
        key: "tolerancia_riesgo_pct",
        description: "Porcentaje máximo que aceptas perder en una operación: 1–2 %.",
      },
      {
        key: "precio_entrada",
        description: "Precio al que entrarías.",
      },
      {
        key: "stop_loss",
        description: "Nivel que invalida la operación. Se define antes de entrar.",
      },
      {
        key: "distancia_stop_pct",
        description: "(precio de entrada − stop) / precio de entrada.",
      },
      {
        key: "riesgo_usd",
        description: "capital_total × tolerancia_riesgo_pct / 100.",
      },
      {
        key: "tamano_posicion_usd",
        description: "riesgo_usd / distancia_stop_pct: el tamaño que hace que el stop cueste justo el riesgo.",
      },
      {
        key: "apalancamiento_max",
        description: "Máximo que permite tu plan. Nunca se sube para compensar una pérdida.",
      },
      {
        key: "margen_requerido",
        description: "tamaño de la posición / apalancamiento máximo.",
      },
    ],
    ejemplo:
      "10.000 USD · 1 % de riesgo · entrada 3.000 · stop 2.900 (3,33 %) → riesgo 100 USD, posición 3.000 USD y margen 300 con 10x.",
  },
  {
    slug: "tesis-inversion",
    badge: "Inversión",
    nombre: "Plantilla de Tesis de Inversión & Invalidación",
    resumen:
      "Documenta la tesis fundamental, métricas de adopción, catalizadores y el precio o evento exacto que invalida la tesis.",
    variables: [
      {
        key: "proyecto",
        description: "El activo o protocolo sobre el que tomas la decisión.",
      },
      {
        key: "sector",
        description: "L2, DeFi, infraestructura, RWA… para comparar con pares reales.",
      },
      {
        key: "tesis_fundamental",
        description: "Por qué existe la oportunidad, en dos frases.",
      },
      {
        key: "catalizador_clave",
        description: "El evento concreto que desbloquea el valor.",
      },
      {
        key: "metrica_validacion",
        description: "El dato que confirma o desmiente la tesis: TVL, ingresos, usuarios.",
      },
      {
        key: "precio_invalidacion",
        description: "El nivel que la invalida. Se escribe antes de entrar, no después.",
      },
      {
        key: "fecha_entrada",
        description: "Cuándo tomaste la posición.",
      },
      {
        key: "precio_entrada",
        description: "A qué precio entraste.",
      },
      {
        key: "estado",
        description: "activa, cerrada o invalidada, con la razón.",
      },
    ],
    ejemplo:
      "Arbitrum (L2) · adopción de Orbit Chains · TVL > 3 B · invalida bajo 1,20 USD · entrada 1,45 el 10/01/2026.",
  },
  {
    slug: "seguimiento-airdrop",
    badge: "Airdrop farming",
    nombre: "Seguimiento de Airdrops & Points Farming",
    resumen:
      "Controla puntos acumulados, gas invertido, número de transacciones y carteras en protocolos pre-token.",
    variables: [
      {
        key: "protocolo",
        description: "El protocolo pre-token que estás trabajando.",
      },
      {
        key: "cadenas_involucradas",
        description: "L1 o L2 donde interactúas.",
      },
      {
        key: "gasto_gas_usd",
        description: "Gas acumulado: cuánto te está costando la posible recompensa.",
      },
      {
        key: "puntos_acumulados",
        description: "Points o XP registrados por el protocolo.",
      },
      {
        key: "frecuencia_interactiva",
        description: "Diaria, semanal o mensual. Lo que prometiste cumplir.",
      },
      {
        key: "wallet_asociada",
        description: "Dirección usada, abreviada, para no mezclar carteras.",
      },
    ],
    ejemplo:
      "EigenLayer · Ethereum L1 · 45,50 USD de gas · 12.500 puntos · interacción semanal · 0x1a…4F.",
  },
];

export function plantillaPorSlug(slug: string): PlantillaRecurso | undefined {
  return PLANTILLAS.find((p) => p.slug === slug);
}

/** Formato de descarga a partir del slug: public/recursos/<slug>.<ext>. */
export function archivo(slug: string, ext: "csv" | "xlsx" | "pdf"): string {
  return `/recursos/${slug}.${ext}`;
}

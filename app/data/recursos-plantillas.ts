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
  /** Nombre legible de la columna, para la interfaz. */
  label: string;
  /** Que es y como se calcula o verifica. */
  description: string;
  /** Valor de la fila [EJEMPLO REAL] del CSV, o el marcador editorial si no tiene. */
  example: string;
}

export interface PlantillaRecurso {
  slug: string;
  badge: string;
  nombre: string;
  resumen: string;
  variables: VariablePlantilla[];
  /** Fila [EJEMPLO REAL] del CSV, resumida. */
  ejemplo: string;
  /** Widget interactivo propio de la plantilla, si lo tiene. */
  simulador?: "custodia";
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
        label: "Dirección de la wallet",
        description: "Dirección analizada, tal cual aparece en el explorador de bloques.",
        example: "0x1a2b…9f",
      },
      {
        key: "primera_actividad",
        label: "Primera actividad",
        description: "Fecha del primer bloque que toca la wallet: ahí empieza la antigüedad real.",
        example: "2024-01-15",
      },
      {
        key: "ultima_actividad",
        label: "Última actividad",
        description: "Fecha del último bloque. Con la primera da la ventana de actividad.",
        example: "2026-09-30",
      },
      {
        key: "dias_activo",
        label: "Días activa",
        description: "Antigüedad real: última actividad menos primera actividad.",
        example: "623",
      },
      {
        key: "num_transacciones",
        label: "Transacciones totales",
        description: "Volumen total de transacciones contadas en el explorador.",
        example: "1.842",
      },
      {
        key: "txns_por_mes",
        label: "Cadencia (tx / mes)",
        description: "Cadencia de operación: transacciones / días activo × 30.",
        example: "88,7",
      },
      {
        key: "saldo_nativo",
        label: "Saldo nativo",
        description: "Cripto nativa que mantiene sin operar.",
        example: "3,412",
      },
      {
        key: "valor_usd_estimado",
        label: "Valor estimado (USD)",
        description: "Saldo nativo × precio del día en el exchange que uses.",
        example: "220.074",
      },
      {
        key: "contratos_interactuados",
        label: "Contratos interactuados",
        description: "Protocolos distintos que ha tocado, contando direcciones en los logs.",
        example: "27",
      },
      {
        key: "envios_a_cex",
        label: "Envíos a exchange",
        description: "Veces que envió fondos a un exchange, cruzando direcciones de CEX conocidas.",
        example: "9",
      },
      {
        key: "riesgo_cex",
        label: "Riesgo CEX",
        description: "Proporción de envíos a exchanges sobre el total de transacciones.",
        example: "0,49 %",
      },
      {
        key: "token_rug_pull",
        label: "Tokens colapsados",
        description: "Tokens que se desplomaron después de retirar liquidez.",
        example: "2",
      },
      {
        key: "notas",
        label: "Notas de criterio",
        description: "Tu criterio en texto libre: lo que un CSV no puede saber.",
        example: "Activa desde 2024, 9 envíos a CEX sobre 1.842 tx.",
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
        label: "Precio (USD)",
        description: "Precio de referencia en USD: cierre del día en el exchange que uses.",
        example: "64.500",
      },
      {
        key: "market_cap",
        label: "Market cap",
        description: "Capitalización total: precio × oferta en circulación.",
        example: "1,26 B",
      },
      {
        key: "fdv",
        label: "FDV",
        description: "Valor totalmente diluido: precio × oferta máxima.",
        example: "1,34 B",
      },
      {
        key: "fdv_mcap_ratio",
        label: "FDV / MCap",
        description: "Riesgo de desbloqueo: FDV / market cap. Por encima de 3 es dilución alta.",
        example: "1,06",
      },
      {
        key: "volumen_24h",
        label: "Volumen 24 h",
        description: "Volumen negociado en 24 h: liquidez real, no la del bloque.",
        example: "28 B",
      },
      {
        key: "vol_mcap",
        label: "Rotación",
        description: "Rotación: volumen 24 h / market cap.",
        example: "2,22 %",
      },
      {
        key: "supply_circulante",
        label: "Supply circulante",
        description: "Tokens ya liberados, del explorador o del informe del proyecto.",
        example: "19,7 M",
      },
      {
        key: "supply_maximo",
        label: "Supply máximo",
        description: "Techo de emisión según el tokenomics: cuánto falta por emitir.",
        example: "21 M",
      },
      {
        key: "desbloqueo_90d",
        label: "Desbloqueo 90 d",
        description: "Supply que se libera en 90 días según los vesting schedules publicados.",
        example: "0",
      },
      {
        key: "holders_totales",
        label: "Holders",
        description: "Direcciones con saldo: concentración de la distribución.",
        example: "1,02 M",
      },
      {
        key: "top10_concentracion",
        label: "Top 10",
        description: "Porcentaje en las 10 mayores wallets. Sobre 50 % es centralización alta.",
        example: "12,4 %",
      },
      {
        key: "mcap_a_real",
        label: "MCap / valor real",
        description: "Market cap frente a ingresos o reservas tangibles. Solo aplica a activos con caja.",
        example: "no aplica",
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
        label: "Marcador de fila",
        description: "[EJEMPLO REAL] marca la fila de guía; vacío para tus propios datos.",
        example: "[EJEMPLO REAL]",
      },
      {
        key: "#",
        label: "N.º de control",
        description: "Número del punto de control, del 1 al 12.",
        example: "1",
      },
      {
        key: "punto_de_control",
        label: "Punto de control",
        description: "El control que se verifica, en una frase concreta.",
        example: "Seed phrase anotada en papel o metal, nunca en foto",
      },
      {
        key: "como_se_verifica",
        label: "Cómo se verifica",
        description: "El paso exacto para comprobarlo, no la teoría.",
        example: "Revisa que no exista captura en la galería",
      },
      {
        key: "categoria",
        label: "Categoría",
        description: "llaves, custodia, accesos u operativa.",
        example: "llaves",
      },
      {
        key: "estado",
        label: "Estado",
        description: "cumple / pendiente / no aplica. Sin este campo la lista no sirve.",
        example: "cumple",
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
        label: "Fecha",
        description: "Fecha de la operación en ISO (AAAA-MM-DD).",
        example: "2026-01-15",
      },
      {
        key: "activo",
        label: "Activo",
        description: "El activo o par operado: BTC, ETH, el que sea.",
        example: "BTC",
      },
      {
        key: "operacion",
        label: "Operación",
        description: "compra, venta, apertura o cierre.",
        example: "compra",
      },
      {
        key: "entrada",
        label: "Entrada (cantidad)",
        description: "Cantidad del activo, no el valor en USD.",
        example: "0,05",
      },
      {
        key: "salida",
        label: "Salida (cantidad)",
        description: "Cantidad cerrada, si aplica. Vacío mientras la posición sigue abierta.",
        example: "—",
      },
      {
        key: "precio_entrada",
        label: "Precio de entrada",
        description: "Precio de ejecución real, no el que esperabas.",
        example: "42.000",
      },
      {
        key: "precio_salida",
        label: "Precio de salida",
        description: "Precio de cierre real de la operación.",
        example: "—",
      },
      {
        key: "resultado_pct",
        label: "Resultado %",
        description: "Resultado calculado sobre entrada y salida.",
        example: "—",
      },
      {
        key: "stop_loss",
        label: "Stop-loss",
        description: "Nivel de invalidación definido antes de entrar.",
        example: "39.500",
      },
      {
        key: "notas",
        label: "Notas",
        description: "La justificación táctica: por qué entraste y por qué saliste.",
        example: "Aqui va el porque de la decision.",
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
        label: "Etiqueta",
        description: "Nombre con el que reconoces esa wallet: Operativa, Ahorro, Reserva.",
        example: "Operativa",
      },
      {
        key: "tipo",
        label: "Tipo",
        description: "hot, cold, exchange o multisig.",
        example: "hot",
      },
      {
        key: "donde_vive",
        label: "Dónde vive",
        description: "Dispositivo o plataforma donde está: extensión, hardware, exchange.",
        example: "Extensión de navegador en el portátil",
      },
      {
        key: "contenido_aprox_usd",
        label: "Contenido aprox. (USD)",
        description: "Valor aproximado custodiado en esa wallet.",
        example: "850",
      },
      {
        key: "para_que",
        label: "Para qué",
        description: "Para qué la usas: operar, recibir o largo plazo.",
        example: "Operar y recibir",
      },
      {
        key: "respaldo_verificado",
        label: "Respaldo verificado",
        description: "si / no / no aplica: si ya probaste recuperarla, no si crees que podrías.",
        example: "no aplica",
      },
    ],
    ejemplo:
      "Operativa (hot) en extensión del portátil con 850 USD para operar; ahorro en cold con respaldo verificado.",
    simulador: "custodia",
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
        label: "Capital total",
        description: "Capital total destinado a trading, no el saldo de una sola cuenta.",
        example: "10.000",
      },
      {
        key: "tolerancia_riesgo_pct",
        label: "Tolerancia de riesgo",
        description: "Porcentaje máximo que aceptas perder en una operación: 1–2 %.",
        example: "1 %",
      },
      {
        key: "precio_entrada",
        label: "Precio de entrada",
        description: "Precio al que entrarías.",
        example: "3.000",
      },
      {
        key: "stop_loss",
        label: "Stop-loss",
        description: "Nivel que invalida la operación. Se define antes de entrar.",
        example: "2.900",
      },
      {
        key: "distancia_stop_pct",
        label: "Distancia al stop",
        description: "(precio de entrada − stop) / precio de entrada.",
        example: "3,33 %",
      },
      {
        key: "riesgo_usd",
        label: "Riesgo en USD",
        description: "capital_total × tolerancia_riesgo_pct / 100.",
        example: "100",
      },
      {
        key: "tamano_posicion_usd",
        label: "Tamaño de posición",
        description: "riesgo_usd / distancia_stop_pct: el tamaño que hace que el stop cueste justo el riesgo.",
        example: "3.000",
      },
      {
        key: "apalancamiento_max",
        label: "Apalancamiento máx.",
        description: "Máximo que permite tu plan. Nunca se sube para compensar una pérdida.",
        example: "10x",
      },
      {
        key: "margen_requerido",
        label: "Margen requerido",
        description: "tamaño de la posición / apalancamiento máximo.",
        example: "300",
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
        label: "Proyecto",
        description: "El activo o protocolo sobre el que tomas la decisión.",
        example: "Arbitrum",
      },
      {
        key: "sector",
        label: "Sector",
        description: "L2, DeFi, infraestructura, RWA… para comparar con pares reales.",
        example: "L2 Scaling",
      },
      {
        key: "tesis_fundamental",
        label: "Tesis fundamental",
        description: "Por qué existe la oportunidad, en dos frases.",
        example: "Adopcion de Orbit Chains",
      },
      {
        key: "catalizador_clave",
        label: "Catalizador clave",
        description: "El evento concreto que desbloquea el valor.",
        example: "EIP-4844 y bajada de gas",
      },
      {
        key: "metrica_validacion",
        label: "Métrica de validación",
        description: "El dato que confirma o desmiente la tesis: TVL, ingresos, usuarios.",
        example: "TVL > $3B",
      },
      {
        key: "precio_invalidacion",
        label: "Precio de invalidación",
        description: "El nivel que la invalida. Se escribe antes de entrar, no después.",
        example: "1,20 USD",
      },
      {
        key: "fecha_entrada",
        label: "Fecha de entrada",
        description: "Cuándo tomaste la posición.",
        example: "2026-01-10",
      },
      {
        key: "precio_entrada",
        label: "Precio de entrada",
        description: "A qué precio entraste.",
        example: "1,45",
      },
      {
        key: "estado",
        label: "Estado",
        description: "activa, cerrada o invalidada, con la razón.",
        example: "activa",
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
        label: "Protocolo",
        description: "El protocolo pre-token que estás trabajando.",
        example: "EigenLayer",
      },
      {
        key: "cadenas_involucradas",
        label: "Cadenas",
        description: "L1 o L2 donde interactúas.",
        example: "Ethereum L1",
      },
      {
        key: "gasto_gas_usd",
        label: "Gasto en gas (USD)",
        description: "Gas acumulado: cuánto te está costando la posible recompensa.",
        example: "45,50",
      },
      {
        key: "puntos_acumulados",
        label: "Puntos acumulados",
        description: "Points o XP registrados por el protocolo.",
        example: "12.500",
      },
      {
        key: "frecuencia_interactiva",
        label: "Frecuencia",
        description: "Diaria, semanal o mensual. Lo que prometiste cumplir.",
        example: "Semanal",
      },
      {
        key: "wallet_asociada",
        label: "Wallet asociada",
        description: "Dirección usada, abreviada, para no mezclar carteras.",
        example: "0x1a…4F",
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

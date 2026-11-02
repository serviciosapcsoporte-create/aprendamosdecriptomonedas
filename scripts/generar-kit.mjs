/**
 * generar-kit.mjs -- genera los entregables descargables del Kit Institucional.
 *
 * POR QUE EXISTE
 * Los PDF eran una sola diapositiva 16:9 que no se podia imprimir y el Excel
 * salia como un volcado de tabla sin portada, sin filtros y sin formato
 * condicional. Este script produce, desde la misma fuente de datos que usa la
 * web (app/data/plantillas.json):
 *
 *   public/recursos/<slug>.pdf              A4: portada, uso, esquema y hoja
 *   public/recursos/<slug>.xlsx             portada + plantilla operativa
 *   public/recursos/portadas/<slug>.png     PNG 1200x630 para tarjetas y redes
 *   public/recursos/paquete-plantillas.zip  kit completo con carpetas e index
 *
 * El CSV NO se regenera aqui: su contenido real (filas del checklist, filas en
 * blanco, marcadores) vive en el archivo y no se puede derivar del esquema. Se
 * copia tal cual al ZIP y se le agrega un diccionario de datos.
 *
 * USO
 *   node scripts/generar-kit.mjs                 # todo
 *   node scripts/generar-kit.mjs --only calculadora-riesgo
 *   node scripts/generar-kit.mjs --solo-xlsx     # iterar rapido
 *   node scripts/generar-kit.mjs --solo-pdf
 *
 * REQUISITOS
 * exceljs (dependencia de desarrollo) y puppeteer (para PDF y portadas). Si
 * puppeteer no esta en node_modules del proyecto se busca en la instalacion
 * global de la maquina. Este script no corre en CI: el build del sitio no lo
 * invoca.
 */
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import ExcelJS from "exceljs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const RECURSOS = path.join(RAIZ, "public", "recursos");
const PORTADAS = path.join(RECURSOS, "portadas");
const SITIO = "aprendamosdecriptomonedas.lat";
const MARCA = "Aprendamos de Criptomonedas";
const VERSION = "v1.0 · noviembre 2026";

const args = process.argv.slice(2);
const iOnly = args.indexOf("--only");
const ONLY = iOnly >= 0 ? args[iOnly + 1] : null;
const SOLO_XLSX = args.includes("--solo-xlsx");
const SOLO_PDF = args.includes("--solo-pdf");

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const plantillas = JSON.parse(
  fs.readFileSync(path.join(RAIZ, "app", "data", "plantillas.json"), "utf8"),
);
const seleccion = ONLY ? plantillas.filter((p) => p.slug === ONLY) : plantillas;
if (seleccion.length === 0) {
  console.error(`No existe la plantilla "${ONLY}"`);
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Puppeteer                                                           */
/* ------------------------------------------------------------------ */

async function cargarPuppeteer() {
  try {
    const mod = await import("puppeteer");
    return mod.default ?? mod;
  } catch {
    const candidatos = [
      process.env.PUPPETEER_PATH,
      path.join(RAIZ, "node_modules", "puppeteer"),
      "C:/Users/pc/node_modules/puppeteer",
    ].filter(Boolean);
    for (const c of candidatos) {
      if (fs.existsSync(c)) {
        const req = createRequire(path.join(c, "index.js"));
        return req(c);
      }
    }
    throw new Error("puppeteer no esta instalado: npm i -D puppeteer");
  }
}

/* ------------------------------------------------------------------ */
/* Diseno comun                                                        */
/* ------------------------------------------------------------------ */

/**
 * El PDF NO usa fuentes web. Con Inter/Playfair descargadas de Google, Chrome
 * incrusta el texto como fuentes Type3: cada glifo es un procedimiento de
 * dibujo, el archivo pesa cuatro veces mas y el texto deja de ser seleccionable
 * (los acentos se extraen como "?"). Con fuentes del sistema Chrome incrusta
 * subconjuntos TrueType con su tabla ToUnicode y el PDF se puede buscar, copiar
 * y leer con un lector de pantalla.
 *
 * La portada PNG si usa las fuentes de la web: ahi es una captura de pantalla y
 * conviene que se parezca al sitio.
 */
const FUENTES_WEB = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Playfair+Display:wght@600;800&display=swap" rel="stylesheet">`;

const CSS_BASE = `
  :root {
    --navy: #0a0e1a;
    --ambar: #f59e0b;
    --tinta: #111827;
    --gris: #4b5563;
    --gris-claro: #6b7280;
    --linea: #e5e7eb;
    --serif: Georgia, Cambria, "Times New Roman", serif;
    --sans: "Segoe UI", Tahoma, Arial, sans-serif;
    --mono: Consolas, "Courier New", monospace;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { font-family: var(--sans); color: var(--tinta); }
  .page {
    width: 210mm; min-height: 297mm; padding: 16mm 16mm 16mm;
    background: #fff; position: relative; break-after: page;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .page:last-child { break-after: auto; }
  .page--oscura { background: var(--navy); color: #fff; padding: 0; }
  .page--horizontal { width: 297mm; min-height: 210mm; page: hoja; padding: 14mm 14mm 14mm; }
  .pie {
    position: absolute; left: 16mm; right: 16mm; bottom: 8mm;
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 7.5pt; color: var(--gris-claro);
    border-top: 0.4pt solid var(--linea); padding-top: 2.5mm;
  }
  .page--horizontal .pie { left: 14mm; right: 14mm; }
  .pie strong { color: var(--tinta); font-weight: 600; }
  .pie--claro { border-top-color: rgba(255,255,255,.16); color: rgba(255,255,255,.6); }
  .eyebrow {
    font-size: 7.5pt; letter-spacing: .14em; text-transform: uppercase;
    font-weight: 800; color: #b45309;
  }
  h1, h2, h3 { font-family: var(--serif); font-weight: 700; }
  .regla { height: 2.4pt; width: 22mm; background: var(--ambar); margin: 3mm 0 5mm; }
  .nota {
    border-left: 2.4pt solid var(--ambar); background: #fffbeb;
    padding: 3mm 4mm; font-size: 8.5pt; line-height: 1.45; color: #78350f;
  }
  table { width: 100%; border-collapse: collapse; }
  @page { size: A4; margin: 0; }
  @page hoja { size: A4 landscape; margin: 0; }
`;

function pie(pagina, total) {
  return `<div class="pie">
    <span><strong>${MARCA}</strong> · ${SITIO}</span>
    <span>${VERSION} · Página ${pagina} de ${total}</span>
  </div>`;
}

function portadaPdf(p, i) {
  const n = String(i + 1).padStart(2, "0");
  return `<section class="page page--oscura">
    <div style="position:absolute;inset:0;background:
      radial-gradient(120% 80% at 100% 0%, rgba(245,158,11,.16), transparent 55%),
      radial-gradient(90% 70% at 0% 100%, rgba(59,130,246,.12), transparent 60%);"></div>
    <div style="position:relative;padding:20mm 18mm;display:flex;flex-direction:column;height:297mm;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-size:8pt;letter-spacing:.18em;text-transform:uppercase;color:#f59e0b;font-weight:800;">${MARCA}</div>
          <div style="font-size:8pt;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:1.5mm;">Kit institucional · plantilla ${n} de 08</div>
        </div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:64pt;line-height:.8;color:rgba(255,255,255,.08);">${n}</div>
      </div>

      <div style="margin-top:40mm;">
        <div style="display:inline-block;border:0.6pt solid rgba(245,158,11,.55);color:#f59e0b;border-radius:2mm;padding:1.6mm 3mm;font-size:7.5pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">${p.badge}</div>
        <h1 style="font-size:30pt;line-height:1.12;margin:6mm 0 0;max-width:150mm;">${p.nombre}</h1>
        <div class="regla"></div>
        <p style="font-size:11pt;line-height:1.6;color:rgba(255,255,255,.78);max-width:145mm;">${p.resumen}</p>
      </div>

      <div style="margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;border-top:0.6pt solid rgba(255,255,255,.14);padding-top:6mm;">
        <div>
          <div style="font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);">Campos</div>
          <div style="font-size:14pt;font-weight:800;color:#f59e0b;margin-top:1mm;">${p.variables.length}</div>
        </div>
        <div>
          <div style="font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);">Formatos</div>
          <div style="font-size:11pt;font-weight:800;color:#fff;margin-top:1mm;">PDF · XLSX · CSV</div>
        </div>
        <div>
          <div style="font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);">Edición</div>
          <div style="font-size:11pt;font-weight:800;color:#fff;margin-top:1mm;">${VERSION}</div>
        </div>
      </div>
      <div style="margin-top:6mm;font-size:8pt;color:rgba(255,255,255,.55);">
        Documento gratuito. En ${SITIO} el archivo Excel trae las fórmulas y las listas desplegables.
      </div>
    </div>
  </section>`;
}

function paginaUso(p) {
  const pasos = [
    [
      "Elige el formato",
      `El PDF es la guía de estudio; el Excel (${p.slug}.xlsx) trae fórmulas y listas desplegables; el CSV importa en cualquier hoja de cálculo.`,
    ],
    [
      "Reemplaza la fila de ejemplo",
      "Cada archivo trae una fila marcada como EJEMPLO. Bórrala cuando entiendas el esquema: esos números son de muestra, no de mercado.",
    ],
    [
      "Trabaja con tu propia fuente",
      "Los números salen de tu wallet y de tu explorador de bloques. Esta plantilla ordena el registro; no reemplaza la verificación.",
    ],
  ];

  return `<section class="page">
    <div class="eyebrow">Cómo se usa</div>
    <h2 style="font-size:20pt;margin-top:2mm;">Tres pasos, sin cuenta</h2>
    <div class="regla"></div>

    <div style="display:flex;flex-direction:column;gap:5mm;">
      ${pasos
        .map(
          ([titulo, texto], i) => `<div style="display:flex;gap:4mm;align-items:flex-start;">
        <div style="flex:0 0 8mm;height:8mm;border-radius:50%;background:#f59e0b;color:#0a0e1a;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:10pt;">${i + 1}</div>
        <div>
          <div style="font-size:10.5pt;font-weight:700;">${titulo}</div>
          <p style="font-size:9pt;line-height:1.55;color:#4b5563;margin-top:1mm;">${texto}</p>
        </div>
      </div>`,
        )
        .join("")}
    </div>

    <h3 style="font-size:11pt;margin:10mm 0 3mm;">Qué hay dentro del kit</h3>
    <table style="font-size:8.5pt;">
      <thead>
        <tr style="background:#f9fafb;text-align:left;">
          <th style="padding:2.5mm 3mm;border-bottom:0.6pt solid #e5e7eb;width:32%;">Formato</th>
          <th style="padding:2.5mm 3mm;border-bottom:0.6pt solid #e5e7eb;">Para qué sirve</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ["PDF (este documento)", "Leer el esquema y la hoja de trabajo impresa."],
          ["Excel .xlsx", "Operar: fórmulas, listas de estado, filtros y formato condicional."],
          ["CSV", "Importar a otra herramienta sin depender de Excel."],
          ["ZIP", "Las 8 plantillas juntas, con LEEME e índice navegable."],
        ]
          .map(
            ([a, b]) =>
              `<tr><td style="padding:2.2mm 3mm;border-bottom:0.4pt solid #f3f4f6;font-weight:600;">${a}</td>
               <td style="padding:2.2mm 3mm;border-bottom:0.4pt solid #f3f4f6;color:#4b5563;">${b}</td></tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <div class="nota" style="margin-top:9mm;">
      <strong>Qué no es.</strong> No es asesoría financiera ni una recomendación de compra. Los
      umbrales y ejemplos son de referencia editorial: la decisión y la verificación son tuyas.
      En el sitio, el bloque de formación es un enlace de afiliado y está señalado como tal.
    </div>

    ${pie(2, 4)}
  </section>`;
}

function paginaEsquema(p) {
  return `<section class="page">
    <div class="eyebrow">Esquema de columnas</div>
    <h2 style="font-size:20pt;margin-top:2mm;">${p.variables.length} campos y qué mide cada uno</h2>
    <div class="regla"></div>

    <table style="font-size:7.8pt;">
      <thead>
        <tr>
          <th style="text-align:left;padding:2mm 2.5mm;border-bottom:0.8pt solid #0a0e1a;width:31%;">Campo</th>
          <th style="text-align:left;padding:2mm 2.5mm;border-bottom:0.8pt solid #0a0e1a;width:43%;">Qué mide</th>
          <th style="text-align:left;padding:2mm 2.5mm;border-bottom:0.8pt solid #0a0e1a;">Ejemplo</th>
        </tr>
      </thead>
      <tbody>
        ${p.variables
          .map(
            (v) => `<tr>
          <td style="padding:1.9mm 2.5mm;border-bottom:0.4pt solid #f3f4f6;vertical-align:top;">
            <span style="font-family:var(--mono);font-size:7.4pt;color:#b45309;">${v.key}</span>
            <div style="font-weight:600;margin-top:.6mm;">${v.label}</div>
          </td>
          <td style="padding:1.9mm 2.5mm;border-bottom:0.4pt solid #f3f4f6;color:#4b5563;line-height:1.4;vertical-align:top;">${v.description}</td>
          <td style="padding:1.9mm 2.5mm;border-bottom:0.4pt solid #f3f4f6;font-family:var(--mono);font-size:7.2pt;vertical-align:top;">${v.example}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <div style="margin-top:6mm;font-size:8pt;color:#6b7280;">
      La fila de ejemplo del archivo usa estos valores. <strong>Datos de muestra, no de mercado.</strong>
    </div>

    ${pie(3, 4)}
  </section>`;
}

function paginaHoja(p) {
  const cols = p.variables;
  return `<section class="page page--horizontal">
    <div class="eyebrow">Hoja de trabajo</div>
    <h2 style="font-size:18pt;margin-top:2mm;">${p.nombre}</h2>
    <div class="regla"></div>

    <table style="font-size:6.4pt;table-layout:fixed;">
      <thead>
        <tr>
          ${cols
            .map(
              (v) =>
                `<th style="background:#0a0e1a;color:#fff;text-align:left;padding:2mm 1.6mm;font-family:var(--mono);font-weight:600;word-break:break-word;border-right:0.4pt solid rgba(255,255,255,.12);">${v.key}</th>`,
            )
            .join("")}
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fffbeb;">
          ${cols
            .map(
              (v) =>
                `<td style="padding:2mm 1.6mm;border-bottom:0.4pt solid #fde68a;border-right:0.4pt solid #fef3c7;color:#92400e;font-family:var(--mono);word-break:break-word;">${v.example}</td>`,
            )
            .join("")}
        </tr>
        ${Array.from({ length: 10 })
          .map(
            () =>
              `<tr>${cols
                .map(
                  () =>
                    `<td style="padding:2.4mm 1.6mm;border-bottom:0.4pt solid #e5e7eb;border-right:0.4pt solid #f3f4f6;">&nbsp;</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}
      </tbody>
    </table>

    <div style="display:flex;justify-content:space-between;margin-top:5mm;font-size:7.5pt;color:#6b7280;">
      <span>La fila resaltada es el ejemplo del archivo: bórrala antes de operar.</span>
      <span>También disponible en .xlsx (con fórmulas) y .csv</span>
    </div>

    ${pie(4, 4)}
  </section>`;
}

function htmlPdf(p, i) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
  <title>${p.nombre} · ${MARCA}</title><style>${CSS_BASE}</style></head>
  <body>
    ${portadaPdf(p, i)}
    ${paginaUso(p)}
    ${paginaEsquema(p)}
    ${paginaHoja(p)}
  </body></html>`;
}

function htmlPortada(p, i) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">${FUENTES_WEB}
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; }
    .lienzo {
      width: 1200px; height: 630px; background: #0a0e1a; color: #fff;
      padding: 60px 68px; display: flex; flex-direction: column; position: relative; overflow: hidden;
      font-family: Inter, "Segoe UI", system-ui, sans-serif;
    }
    .lienzo::after {
      content: ""; position: absolute; inset: 0; z-index: 0;
      background: radial-gradient(90% 70% at 100% 0%, rgba(245,158,11,.20), transparent 55%),
                  radial-gradient(80% 60% at 0% 100%, rgba(59,130,246,.14), transparent 60%);
    }
    .lienzo > *:not(.num) { position: relative; z-index: 1; }
    .num {
      position: absolute; right: 52px; top: 18px; z-index: 0;
      font-family: "Playfair Display", Georgia, serif;
      font-size: 190px; line-height: 1; color: rgba(255,255,255,.07);
    }
  </style></head>
  <body>
    <div class="lienzo">
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:15px;letter-spacing:.18em;text-transform:uppercase;color:#f59e0b;font-weight:800;">${MARCA}</div>
        <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);">Kit institucional</div>
      </div>
      <div style="margin-top:auto;">
        <div style="display:inline-block;border:1px solid rgba(245,158,11,.55);color:#f59e0b;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">${p.badge}</div>
        <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:56px;line-height:1.08;margin:22px 0 0;max-width:940px;">${p.nombre}</h1>
        <div style="height:5px;width:88px;background:#f59e0b;margin:24px 0 18px;"></div>
        <p style="font-size:17px;line-height:1.55;color:rgba(255,255,255,.78);max-width:840px;">${p.resumen}</p>
        <div style="margin-top:28px;font-size:13px;color:rgba(255,255,255,.5);">${p.variables.length} campos · PDF, Excel y CSV · ${SITIO}</div>
      </div>
    </div>
  </body></html>`;
}

/* ------------------------------------------------------------------ */
/* Excel                                                               */
/* ------------------------------------------------------------------ */

const C = {
  ambar: "FFF59E0B",
  ambarTxt: "FFB45309",
  navy: "FF0A0E1A",
  tinta: "FF111827",
  gris: "FF4B5563",
  linea: "FFE5E7EB",
  lineaSuave: "FFF3F4F6",
  crema: "FFFFFBEB",
  cremaBorde: "FFFDE68A",
  verde: "FFDCFCE7",
  verdeTxt: "FF166534",
  ambarSuave: "FFFEF3C7",
  ambarSuaveTxt: "FF92400E",
  rojo: "FFFEE2E2",
  rojoTxt: "FF991B1B",
  formula: "FFF9FAFB",
};

const LISTAS = {
  "checklist-seguridad": {
    categoria: ["llaves", "custodia", "accesos", "operativa"],
    estado: ["cumple", "pendiente", "no aplica"],
  },
  "inventario-wallets": {
    tipo: ["hot", "cold", "exchange", "multisig"],
    respaldo_verificado: ["si", "no", "no aplica"],
  },
  "registro-operaciones": { operacion: ["compra", "venta", "apertura", "cierre"] },
  "tesis-inversion": { estado: ["activa", "cerrada", "invalidada"] },
  "seguimiento-airdrop": { frecuencia_interactiva: ["diaria", "semanal", "mensual"] },
};

/** [campo, comparacion, fondo, color de texto]; la columna se resuelve sola. */
const SEMAFOROS = {
  "checklist-seguridad": [
    ["estado", { texto: "pendiente" }, C.ambarSuave, C.ambarSuaveTxt],
    ["estado", { texto: "cumple" }, C.verde, C.verdeTxt],
    ["estado", { texto: "no aplica" }, C.lineaSuave, C.gris],
  ],
  "inventario-wallets": [
    ["respaldo_verificado", { texto: "no" }, C.rojo, C.rojoTxt],
    ["respaldo_verificado", { texto: "si" }, C.verde, C.verdeTxt],
  ],
  "registro-operaciones": [["resultado_pct", { mayor: 0, menos: 0 }, C.rojo, C.rojoTxt]],
  "tesis-inversion": [
    ["estado", { texto: "invalidada" }, C.rojo, C.rojoTxt],
    ["estado", { texto: "activa" }, C.verde, C.verdeTxt],
  ],
  "plantilla-analisis-wallet": [["riesgo_cex", { mayor: 0.2 }, C.rojo, C.rojoTxt]],
  "plantilla-metricas-red": [["fdv_mcap_ratio", { mayor: 3 }, C.rojo, C.rojoTxt]],
};

const FORMATOS = {
  "calculadora-riesgo": {
    capital_total: '"$"#,##0',
    tolerancia_riesgo_pct: '0.0" %"',
    precio_entrada: '"$"#,##0',
    stop_loss: '"$"#,##0',
    distancia_stop_pct: "0.00%",
    riesgo_usd: '"$"#,##0',
    tamano_posicion_usd: '"$"#,##0',
    apalancamiento_max: '0"x"',
    margen_requerido: '"$"#,##0',
  },
  "plantilla-analisis-wallet": {
    saldo_nativo: "#,##0.000",
    precio_usd: '"$"#,##0',
    valor_usd_estimado: '"$"#,##0',
    txns_por_mes: "0.0",
    riesgo_cex: "0.00%",
  },
  "inventario-wallets": { contenido_aprox_usd: '"$"#,##0' },
  "registro-operaciones": {
    precio_entrada: '"$"#,##0',
    precio_salida: '"$"#,##0',
    resultado_pct: "0.00%",
    stop_loss: '"$"#,##0',
  },
  "seguimiento-airdrop": { gasto_gas_usd: '"$"#,##0.00' },
  "tesis-inversion": { precio_entrada: "0.0000" },
};

/** Formulas con {c} y {r}: la letra y la fila se resuelven al construir. */
const FORMULAS = {
  "calculadora-riesgo": {
    distancia_stop_pct: "IFERROR(({precio_entrada}{r}-{stop_loss}{r})/{precio_entrada}{r},\"\")",
    riesgo_usd: "IFERROR({capital_total}{r}*{tolerancia_riesgo_pct}{r}/100,\"\")",
    tamano_posicion_usd: "IFERROR({riesgo_usd}{r}/{distancia_stop_pct}{r},\"\")",
    margen_requerido: "IFERROR({tamano_posicion_usd}{r}/{apalancamiento_max}{r},\"\")",
  },
  "registro-operaciones": {
    resultado_pct: "IFERROR(({precio_salida}{r}-{precio_entrada}{r})/{precio_entrada}{r},\"\")",
  },
  "plantilla-analisis-wallet": {
    dias_activo: "IFERROR({ultima_actividad}{r}-{primera_actividad}{r},\"\")",
    txns_por_mes: "IFERROR(IF({num_transacciones}{r}=\"\",\"\",{num_transacciones}{r}/{dias_activo}{r}*30),\"\")",
    riesgo_cex: "IFERROR({envios_a_cex}{r}/{num_transacciones}{r},\"\")",
  },
  "plantilla-metricas-red": {
    fdv_mcap_ratio: "IFERROR({fdv}{r}/{market_cap}{r},\"\")",
    vol_mcap: "IFERROR({volumen_24h}{r}/{market_cap}{r},\"\")",
  },
};

const ancho = (v) => Math.min(38, Math.max(12, Math.round((v.label.length + v.key.length) / 2) + 6));
const letra = (i) => String.fromCharCode(65 + i);

function resolverFormula(plantilla, campo, fila, i) {
  const plantillaF = FORMULAS[plantilla.slug]?.[campo];
  if (!plantillaF) return null;
  let f = plantillaF.replaceAll("{r}", String(fila));
  for (const v of plantilla.variables) {
    const col = letra(plantilla.variables.indexOf(v));
    f = f.replaceAll(`{${v.key}}`, col);
  }
  if (/\{[a-z_]+\}/.test(f)) return null;
  return f;
}

async function construirXlsx(p) {
  const wb = new ExcelJS.Workbook();
  wb.creator = MARCA;
  wb.lastModifiedBy = MARCA;
  wb.title = p.nombre;
  wb.subject = `Kit institucional · ${VERSION}`;
  wb.created = new Date();
  wb.modified = new Date();

  /* Hoja 1: portada con instrucciones */
  const guia = wb.addWorksheet("Empieza aquí", {
    properties: { tabColor: { argb: C.ambar } },
    views: [{ showGridLines: false }],
    pageSetup: { orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1 },
  });
  guia.columns = [{ width: 3 }, { width: 30 }, { width: 76 }];

  guia.mergeCells("B2:C2");
  guia.getCell("B2").value = MARCA.toUpperCase();
  guia.getCell("B2").font = { name: "Calibri", size: 9, bold: true, color: { argb: C.ambarTxt } };
  guia.getRow(2).height = 18;

  guia.mergeCells("B4:C4");
  guia.getCell("B4").value = p.nombre;
  guia.getCell("B4").font = { name: "Calibri", size: 20, bold: true, color: { argb: C.navy } };
  guia.getRow(4).height = 34;

  guia.mergeCells("B5:C5");
  guia.getCell("B5").value = p.resumen;
  guia.getCell("B5").font = { name: "Calibri", size: 11, color: { argb: C.gris } };
  guia.getCell("B5").alignment = { wrapText: true, vertical: "top" };
  guia.getRow(5).height = 48;

  guia.mergeCells("B6:C6");
  guia.getCell("B6").border = { bottom: { style: "medium", color: { argb: C.ambar } } };
  guia.getRow(6).height = 8;

  const bloques = [
    [
      "CÓMO SE USA",
      [
        "1. Lee el esquema: cada columna tiene nombre, definición y ejemplo (hoja «Plantilla», fila 4).",
        "2. Borra la fila de ejemplo cuando entiendas la estructura: son datos de muestra, no de mercado.",
        "3. Llena tus filas. Las listas desplegables y las fórmulas ya están puestas; no las sobrescribas.",
        "4. Filtra por estado o riesgo con la flecha del encabezado para revisar lo pendiente.",
      ],
    ],
    [
      "QUÉ NO ES",
      [
        "No es asesoría financiera ni una recomendación de compra. Los umbrales (por ejemplo, más del 20 % en exchanges) son de referencia editorial.",
        "La verificación de tus datos on-chain es tuya: esta hoja ordena el registro, no sustituye al explorador de bloques.",
      ],
    ],
  ];

  let fila = 8;
  for (const [titulo, lineas] of bloques) {
    guia.getCell(`B${fila}`).value = titulo;
    guia.getCell(`B${fila}`).font = { name: "Calibri", size: 9, bold: true, color: { argb: C.ambarTxt } };
    fila += 1;
    for (const linea of lineas) {
      guia.mergeCells(`B${fila}:C${fila}`);
      const c = guia.getCell(`B${fila}`);
      c.value = linea;
      c.font = { name: "Calibri", size: 10.5, color: { argb: C.tinta } };
      c.alignment = { wrapText: true, vertical: "top" };
      guia.getRow(fila).height = linea.length > 110 ? 32 : 18;
      fila += 1;
    }
    fila += 1;
  }

  guia.getCell(`B${fila}`).value = "FORMATOS DEL KIT";
  guia.getCell(`B${fila}`).font = { name: "Calibri", size: 9, bold: true, color: { argb: C.ambarTxt } };
  fila += 1;
  for (const [f, uso] of [
    ["Excel", "esta hoja: fórmulas, listas y formato condicional listos"],
    ["PDF", "guía de estudio y hoja de trabajo imprimible"],
    ["CSV", "importar a otra herramienta sin depender de Excel"],
  ]) {
    guia.getCell(`B${fila}`).value = f;
    guia.getCell(`B${fila}`).font = { name: "Calibri", size: 10.5, bold: true, color: { argb: C.tinta } };
    guia.getCell(`C${fila}`).value = uso;
    guia.getCell(`C${fila}`).font = { name: "Calibri", size: 10.5, color: { argb: C.gris } };
    fila += 1;
  }

  fila += 1;
  guia.mergeCells(`B${fila}:C${fila}`);
  guia.getCell(`B${fila}`).value = `${VERSION} · ${SITIO} · Gratis, sin registro`;
  guia.getCell(`B${fila}`).font = { name: "Calibri", size: 9, italic: true, color: { argb: C.gris } };

  /* Hoja 2: plantilla operativa */
  const navegador = wb.addWorksheet("Plantilla", {
    properties: { tabColor: { argb: C.navy } },
    views: [{ state: "frozen", ySplit: 3, activeCell: "A4", showGridLines: false }],
  });
  navegador.columns = p.variables.map((v) => ({ width: ancho(v) }));

  const total = p.variables.length;
  const FILA_TITULO = 1;
  const FILA_HEADER = 3;
  const FILA_EJEMPLO = 4;
  const FILA_DATOS = 5;
  const FILAS = 30;

  navegador.mergeCells(FILA_TITULO, 1, FILA_TITULO, total);
  const titulo = navegador.getCell(FILA_TITULO, 1);
  titulo.value = `${p.nombre.toUpperCase()}   ·   ${p.badge}   ·   ${VERSION}`;
  titulo.font = { name: "Calibri", size: 12, bold: true, color: { argb: "FFFFFFFF" } };
  titulo.fill = { type: "pattern", pattern: "solid", fgColor: { argb: C.navy } };
  titulo.alignment = { vertical: "middle", indent: 1 };
  navegador.getRow(FILA_TITULO).height = 28;

  p.variables.forEach((v, i) => {
    const c = navegador.getCell(FILA_HEADER, i + 1);
    c.value = v.key;
    c.font = { name: "Consolas", size: 9, bold: true, color: { argb: C.navy } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: C.ambar } };
    c.alignment = { wrapText: true, vertical: "middle", horizontal: "left", indent: 1 };
    c.border = {
      right: { style: "hair", color: { argb: "FFD97706" } },
      bottom: { style: "thin", color: { argb: "FFB45309" } },
    };
    c.note = {
      texts: [{ text: `${v.label}\n\n${v.description}`, fontName: "Calibri", fontSize: 9 }],
      margins: { insetmode: "custom" },
    };
  });
  navegador.getRow(FILA_HEADER).height = 34;

  p.variables.forEach((v, i) => {
    const c = navegador.getCell(FILA_EJEMPLO, i + 1);
    c.value = v.example;
    c.font = { name: "Calibri", size: 10, italic: true, color: { argb: C.ambarSuaveTxt } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: C.crema } };
    c.alignment = { vertical: "middle", wrapText: true, indent: 1 };
    c.border = {
      bottom: { style: "hair", color: { argb: C.cremaBorde } },
      right: { style: "hair", color: { argb: C.cremaBorde } },
    };
  });
  navegador.getRow(FILA_EJEMPLO).height = 26;

  const listas = LISTAS[p.slug] || {};
  const formatos = FORMATOS[p.slug] || {};

  for (let r = FILA_DATOS; r < FILA_DATOS + FILAS; r++) {
    p.variables.forEach((v, i) => {
      const c = navegador.getCell(r, i + 1);
      const formula = resolverFormula(p, v.key, r, i);
      c.font = { name: "Calibri", size: 10, color: { argb: C.tinta } };
      c.alignment = { vertical: "middle", horizontal: i === 0 ? "left" : "general", indent: i === 0 ? 1 : 0 };
      c.border = {
        bottom: { style: "hair", color: { argb: C.linea } },
        right: { style: "hair", color: { argb: C.lineaSuave } },
      };
      if (formatos[v.key]) c.numFmt = formatos[v.key];
      if (formula) {
        c.value = { formula };
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: C.formula } };
        c.font = { name: "Calibri", size: 10, color: { argb: C.gris } };
      }
      if (listas[v.key]) {
        c.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [`"${listas[v.key].join(",")}"`],
          showErrorMessage: false,
          showInputMessage: true,
          promptTitle: v.label,
          prompt: listas[v.key].join(" / "),
        };
      }
    });
    navegador.getRow(r).height = 20;
  }

  navegador.autoFilter = {
    from: { row: FILA_HEADER, column: 1 },
    to: { row: FILA_DATOS + FILAS - 1, column: total },
  };

  for (const [campo, comparacion, fondo, texto] of SEMAFOROS[p.slug] || []) {
    const idx = p.variables.findIndex((v) => v.key === campo);
    if (idx < 0) continue;
    const col = letra(idx);
    const celda = `$${col}${FILA_DATOS}`;
    const formula = comparacion.texto
      ? `${celda}="${comparacion.texto}"`
      : `${celda}<${comparacion.menor ?? 0}`;
    navegador.addConditionalFormatting({
      ref: `${col}${FILA_DATOS}:${col}${FILA_DATOS + FILAS - 1}`,
      rules: [
        {
          type: "expression",
          formulae: [formula],
          style: {
            fill: { type: "pattern", pattern: "solid", bgColor: { argb: fondo } },
            font: { color: { argb: texto } },
          },
          priority: 1,
        },
      ],
    });
  }

  navegador.pageSetup = {
    orientation: total > 7 ? "landscape" : "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    printArea: `A1:${letra(total - 1)}${FILA_DATOS + FILAS - 1}`,
    margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.3, footer: 0.3 },
    horizontalCentered: true,
  };
  navegador.headerFooter = {
    oddFooter: `&L${MARCA} · ${SITIO}&R${p.nombre} · Página &P de &N`,
  };

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/* ------------------------------------------------------------------ */
/* ZIP (deflate + CRC32, sin dependencias)                             */
/* ------------------------------------------------------------------ */

const TABLA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = TABLA_CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function crearZip(entradas) {
  const locales = [];
  const centrales = [];
  let offset = 0;

  for (const { nombre, datos } of entradas) {
    const nombreBuf = Buffer.from(nombre, "utf8");
    const comprimido = zlib.deflateRawSync(datos, { level: 9 });
    const crc = crc32(datos);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comprimido.length, 18);
    local.writeUInt32LE(datos.length, 22);
    local.writeUInt16LE(nombreBuf.length, 26);
    locales.push(local, nombreBuf, comprimido);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(comprimido.length, 20);
    central.writeUInt32LE(datos.length, 24);
    central.writeUInt16LE(nombreBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrales.push(central, nombreBuf);

    offset += local.length + nombreBuf.length + comprimido.length;
  }

  const centralBuf = Buffer.concat(centrales);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(entradas.length, 8);
  fin.writeUInt16LE(entradas.length, 10);
  fin.writeUInt32LE(centralBuf.length, 12);
  fin.writeUInt32LE(offset, 16);

  return Buffer.concat([...locales, centralBuf, fin]);
}

const CARPETA_KIT = "Kit-Plantillas-APC-v1.0";

const LEEME = `# Kit institucional · 8 plantillas de trabajo

${MARCA} · ${SITIO} · ${VERSION}

Gratis. Sin registro y sin dependencias: todo son archivos locales.

## Qué hay dentro

| Carpeta | Contenido |
| --- | --- |
| 01_PDF | Una guía A4 por plantilla: portada, cómo se usa, esquema de columnas y hoja de trabajo imprimible. |
| 02_EXCEL | El archivo para operar: fórmulas, listas desplegables, filtros y formato condicional. |
| 03_CSV | Los mismos datos en texto plano (UTF-8, separador «;») para importar donde quieras. |
| 03_CSV/diccionario-de-datos.csv | Campo, etiqueta, definición y ejemplo de cada columna. |

Abre \`index.html\` con doble clic para ver el kit como una página, sin conexión.

## Las 8 plantillas

${plantillas.map((p, i) => `${i + 1}. **${p.nombre}** — ${p.resumen}`).join("\n")}

## Cómo se usa

1. Empieza por el PDF: explica qué mide cada campo antes de que escribas nada.
2. Pasa al Excel: la hoja «Empieza aquí» tiene las instrucciones y la hoja «Plantilla» ya trae fórmulas y listas.
3. Borra la fila de ejemplo cuando entiendas la estructura. Esos números son de muestra, no de mercado.
4. El CSV es para importar a otra herramienta; si lo abres en Excel usa «Datos > Desde texto» y elige «;» como separador.

## Qué no es

No es asesoría financiera ni una recomendación de compra. Los umbrales y ejemplos son de
referencia editorial; la verificación de tus datos on-chain es tuya. En el sitio, el bloque de
formación es un enlace de afiliado y está señalado como tal.

## Licencia de uso

Uso libre para tu operación personal o de tu negocio. No revendas los archivos como producto
propio ni retires la marca: si los compartes, comparte el enlace original.
`;

function htmlIndice() {
  const tarjetas = plantillas
    .map(
      (p, i) => `<article>
      <span class="num">${String(i + 1).padStart(2, "0")} · ${p.badge}</span>
      <h2>${p.nombre}</h2>
      <p>${p.resumen}</p>
      <p class="links">
        <a href="01_PDF/${p.slug}.pdf">PDF</a>
        <a href="02_EXCEL/${p.slug}.xlsx">Excel</a>
        <a href="03_CSV/${p.slug}.csv">CSV</a>
      </p>
    </article>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kit de plantillas · ${MARCA}</title>
<style>
  :root { --navy:#0a0e1a; --ambar:#f59e0b; --gris:#c7cdd8; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--navy); color:#fff; font-family:"Segoe UI",system-ui,sans-serif; }
  header { padding:48px 32px 24px; max-width:1000px; margin:0 auto; }
  .marca { font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--ambar); font-weight:700; }
  h1 { font-family:Georgia,serif; font-size:38px; margin:16px 0 8px; }
  header p { color:var(--gris); max-width:70ch; line-height:1.6; margin:0; }
  main { max-width:1000px; margin:0 auto; padding:8px 32px 64px; display:grid; gap:16px; }
  article { border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:22px; background:rgba(255,255,255,.03); }
  article h2 { font-size:18px; margin:6px 0; }
  article p { color:var(--gris); font-size:14px; line-height:1.55; margin:0; }
  .num { color:var(--ambar); font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; }
  .links { margin-top:14px; display:flex; gap:8px; }
  .links a { color:#0a0e1a; background:var(--ambar); text-decoration:none; font-weight:700; font-size:12px; padding:8px 12px; border-radius:8px; }
  footer { border-top:1px solid rgba(255,255,255,.12); padding:24px 32px 48px; max-width:1000px; margin:0 auto; color:var(--gris); font-size:12px; line-height:1.7; }
</style></head>
<body>
  <header>
    <div class="marca">${MARCA}</div>
    <h1>Kit institucional: 8 plantillas de trabajo</h1>
    <p>Guía en PDF, hoja de Excel con fórmulas y CSV para importar. ${VERSION}. Gratis, sin registro.</p>
  </header>
  <main>${tarjetas}</main>
  <footer>
    No es asesoría financiera. Los datos de ejemplo son de muestra, no de mercado. En ${SITIO} el
    bloque de formación es un enlace de afiliado y está señalado como tal.
  </footer>
</body></html>`;
}

function csvDiccionario() {
  const filas = ["plantilla;campo;etiqueta;que_mide;ejemplo"];
  for (const p of plantillas) {
    for (const v of p.variables) {
      filas.push(
        [p.nombre, v.key, v.label, v.description, v.example]
          .map((c) => `"${String(c).replace(/"/g, '""')}"`)
          .join(";"),
      );
    }
  }
  return "\ufeff" + filas.join("\r\n") + "\r\n";
}

/* ------------------------------------------------------------------ */
/* Ejecucion                                                           */
/* ------------------------------------------------------------------ */

async function main() {
  fs.mkdirSync(PORTADAS, { recursive: true });

  const necesitaNavegador = !SOLO_XLSX;
  const puppeteer = necesitaNavegador ? await cargarPuppeteer() : null;
  const navegador = puppeteer ? await puppeteer.launch({ args: ["--no-sandbox"] }) : null;

  try {
    for (const p of seleccion) {
      const indice = plantillas.indexOf(p);

      if (!SOLO_XLSX) {
        const page = await navegador.newPage();
        await page.setContent(htmlPdf(p, indice), { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        const medidas = await page.evaluate(() =>
          [...document.querySelectorAll(".page")].map((el, idx) => ({
            pagina: idx + 1,
            alto: Math.round(el.getBoundingClientRect().height),
            contenido: Math.round(el.scrollHeight),
          })),
        );
        const desbordes = medidas.filter((m) => m.contenido > m.alto + 2);
        if (desbordes.length) console.warn(`  ! ${p.slug}: revisar desborde`, desbordes);

        const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
        fs.writeFileSync(path.join(RECURSOS, `${p.slug}.pdf`), pdf);
        await page.close();

        const portada = await navegador.newPage();
        await portada.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
        await portada.setContent(htmlPortada(p, indice), { waitUntil: "networkidle0" });
        await portada.evaluate(() => document.fonts.ready);
        await portada.screenshot({ path: path.join(PORTADAS, `${p.slug}.png`), type: "png" });
        await portada.close();
      }

      if (!SOLO_PDF) {
        const xlsx = await construirXlsx(p);
        fs.writeFileSync(path.join(RECURSOS, `${p.slug}.xlsx`), xlsx);
      }

      console.log(`ok ${p.slug}`);
    }
  } finally {
    if (navegador) await navegador.close();
  }

  if (ONLY || SOLO_XLSX || SOLO_PDF) {
    console.log("Modo parcial: no se regenera el ZIP.");
    return;
  }

  fs.writeFileSync(path.join(RECURSOS, "diccionario-de-datos.csv"), csvDiccionario());

  const entradas = [
    { nombre: `${CARPETA_KIT}/00_LEEME.md`, datos: Buffer.from(LEEME, "utf8") },
    { nombre: `${CARPETA_KIT}/index.html`, datos: Buffer.from(htmlIndice(), "utf8") },
    {
      nombre: `${CARPETA_KIT}/03_CSV/diccionario-de-datos.csv`,
      datos: Buffer.from(csvDiccionario(), "utf8"),
    },
  ];
  for (const p of plantillas) {
    entradas.push({
      nombre: `${CARPETA_KIT}/01_PDF/${p.slug}.pdf`,
      datos: fs.readFileSync(path.join(RECURSOS, `${p.slug}.pdf`)),
    });
    entradas.push({
      nombre: `${CARPETA_KIT}/02_EXCEL/${p.slug}.xlsx`,
      datos: fs.readFileSync(path.join(RECURSOS, `${p.slug}.xlsx`)),
    });
    entradas.push({
      nombre: `${CARPETA_KIT}/03_CSV/${p.slug}.csv`,
      datos: fs.readFileSync(path.join(RECURSOS, `${p.slug}.csv`)),
    });
  }
  const zip = crearZip(entradas);
  fs.writeFileSync(path.join(RECURSOS, "paquete-plantillas.zip"), zip);

  const kb = (b) => `${Math.round(b / 1024)} KB`;
  console.log(
    `\nPDF: ${kb(fs.statSync(path.join(RECURSOS, `${plantillas[0].slug}.pdf`)).size)} · XLSX: ${kb(
      fs.statSync(path.join(RECURSOS, `${plantillas[0].slug}.xlsx`)).size,
    )} · ZIP: ${kb(zip.length)}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

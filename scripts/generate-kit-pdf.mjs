import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function latin1(s) {
  return Buffer.from(s, "latin1");
}

function buildPdfFile({ filename, outSub, sections, footer }) {
  const width = 612;
  const height = 792;

  const objects = [];
  const offsets = [];
  let out = "%PDF-1.4\n";

  const addObj = (body) => {
    const id = objects.length + 1;
    objects.push(id);
    offsets.push(Buffer.byteLength(out, "latin1"));
    out += `${id} 0 obj\n${body}\nendobj\n`;
    return id;
  };

  const streamObj = (data) => {
    const body = `<< /Length ${Buffer.byteLength(data, "latin1")} >>\nstream\n${data}\nendstream`;
    return addObj(body);
  };

  const fNormal = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fBold = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const fOblique = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");

  const lines = [];
  const margin = 56;
  let y = height - margin;

  const text = (fn, size, dy, s) => {
    lines.push(`BT /${fn} ${size} Tf 1 0 0 1 ${margin} ${y} Td (${esc(s)}) Tj ET`);
    y -= dy;
  };

  for (const sec of sections) {
    text("F2", 18, 28, sec.title);
    if (sec.subtitle) text("F1", 11, 16, sec.subtitle);
    y -= 6;
    for (const h of sec.headings) {
      text("F2", 13, 22, h);
      for (const item of sec.lists[h] || []) {
        text("F2", 10, 16, `[ ]  ${item}`);
      }
      y -= 4;
    }
  }
  y -= 8;
  text("F1", 11, 16, footer);

  const content = lines.join("\n");
  const contentId = streamObj(content);

  const pagesId = objects.length + 1;
  objects.push(pagesId);
  offsets.push(Buffer.byteLength(out, "latin1"));
  out += `${pagesId} 0 obj\n<< /Type /Pages /Kids [${pagesId + 1} 0 R] /Count 1 >>\nendobj\n`;

  const pageId = pagesId + 1;
  objects.push(pageId);
  offsets.push(Buffer.byteLength(out, "latin1"));
  out += `${pageId} 0 obj\n<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${fNormal} 0 R /F2 ${fBold} 0 R /F3 ${fOblique} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`;

  const catalogId = pageId + 1;
  objects.push(catalogId);
  offsets.push(Buffer.byteLength(out, "latin1"));
  out += `${catalogId} 0 obj\n<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj\n`;

  const xrefPos = Buffer.byteLength(out, "latin1");
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    out += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

  const outFile = path.join(__dirname, "..", "public", "resources", outSub, filename);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, latin1(out));
  console.log("PDF generado:", outFile, Buffer.byteLength(out, "latin1"), "bytes");
}

buildPdfFile({
  filename: "kit-nivel-3.pdf",
  outSub: ".",
  sections: [
    {
      title: "Kit de inicio - nivel 3 (avanzado)",
      subtitle: "Lista de verificación de DeFi y trading, y guía de redes de capa 2",
      headings: [
        "Antes de comenzar: seguridad",
        "DeFi: conceptos básicos antes de interactuar con contratos",
        "Redes de capa 2: elige una sin errores",
        "Trading: regla de supervivencia",
      ],
      lists: {
        "Antes de comenzar: seguridad": [
          "Usa una cartera fría o hardware wallet para guardar los fondos importantes",
          "Activa la autenticación de dos factores en tus exchanges y en tu correo principal",
          "Anota la frase de recuperación (frase semilla) en papel y guárdala en un lugar seguro",
          "No compartas nunca tus claves ni tu frase de recuperación",
          "Verifica la URL del exchange o de la aplicación descentralizada (dApp) antes de conectar tu wallet",
        ],
        "DeFi: conceptos básicos antes de interactuar con contratos": [
          "¿Entiendes la diferencia entre un exchange centralizado y un DEX?",
          "¿Sabes cómo funciona un AMM (x*y=k) y qué es el deslizamiento?",
          "¿Has probado primero en una red de pruebas (testnet)?",
          "¿Has comprobado la liquidez del fondo antes de operar?",
          "¿Sabes que el gas no es lo mismo que la comisión del protocolo?",
        ],
        "Redes de capa 2: elige una sin errores": [
          "¿Sabes si la red L2 usa un optimistic rollup o un zk-rollup?",
          "¿Conoces el proceso y el costo de volver a L1 mediante un puente?",
          "Usa el puente oficial o uno auditado por la comunidad",
          "Ten ETH en la L2 para pagar el gas; el saldo de L1 no sirve para pagar las comisiones de la L2",
        ],
        "Trading: regla de supervivencia": [
          "No arriesgues más del 1-2 % del capital por operación",
          "Escribe un plan antes de abrir una posición: entrada, stop y objetivo",
          "Evita el apalancamiento al operar en spot",
          "Registra cada operación, su resultado y el motivo",
        ],
      },
    },
  ],
  footer: "Recuerda: primero gestiona el riesgo y luego busca rentabilidad. Este kit complementa los 18 temas del nivel 3.",
});

buildPdfFile({
  filename: "workbook-nivel-4.pdf",
  outSub: ".",
  sections: [
    {
      title: "Cuaderno de trabajo - nivel 4 (experto)",
      subtitle: "Marco de análisis de protocolos DeFi y redes de capa 2, con oportunidades de arbitraje",
      headings: [
        "1. Lista de verificación de seguridad de un protocolo",
        "2. Análisis de un proyecto Layer 2",
        "3. Plan de estrategia de trading algorítmico",
        "4. Diario de operaciones (plantilla)",
      ],
      lists: {
        "1. Lista de verificación de seguridad de un protocolo": [
          "Auditorías públicas y resultados de firmas reconocidas",
          "Bloqueo temporal (timelock) o firma múltiple (multisig) para administrar los fondos del protocolo",
          "Historial de incidentes de seguridad en la cadena donde opera",
          "Valor total bloqueado (TVL) real frente al valor inflado asociado al token",
          "Equipo con identidad y reputación verificables",
          "Política de respuesta ante incidentes, incluido un programa de recompensas por errores",
        ],
        "2. Análisis de un proyecto Layer 2": [
          "¿La red usa un optimistic rollup o un zk-rollup? ¿Qué implica cada opción?",
          "Secuenciador: ¿está descentralizado o lo controla una sola empresa?",
          "Puente de salida: plazo y costo para retirar fondos a L1",
          "Liquidez de los puentes y riesgos asociados",
          "Comunidad de desarrolladores y hoja de ruta publicada",
        ],
        "3. Plan de estrategia de trading algorítmico": [
          "Define la estrategia: delta neutral, direccional o de arbitraje",
          "Elige el mercado y el marco temporal",
          "Haz pruebas retrospectivas con más de 200 eventos e incluye crisis de liquidez",
          "Define los límites de riesgo: exposición máxima y pérdida máxima",
          "Planifica la ejecución (DEX o CEX) y fija límites para MEV y deslizamiento",
        ],
        "4. Diario de operaciones (plantilla)": [
          "Fecha, par y dirección de la operación",
          "Tesis: por qué entras (en una línea)",
          "Precio de entrada, stop inicial y objetivo de beneficio",
          "Riesgo asumido (máximo del 1-2 % del capital)",
          "Resultado y lección aprendida",
        ],
      },
    },
  ],
  footer: "Nivel 4 (experto): 13 temas y acceso de por vida. Analiza primero; luego decide cuánto capital arriesgar.",
});

buildPdfFile({
  filename: "guia-nivel-5.pdf",
  outSub: ".",
  sections: [
    {
      title: "Guía de especialización - nivel 5",
      subtitle: "Cómo elegir una especialización en escalabilidad de Ethereum, blockchains modulares o regulación",
      headings: [
        "A. Perfil: ¿qué especialización se adapta mejor a ti?",
        "B. Escalabilidad de Ethereum (programación ZK / Cairo)",
        "C. Blockchains modulares y EigenLayer",
        "D. Regulación y finanzas institucionales",
      ],
      lists: {
        "A. Perfil: ¿qué especialización se adapta mejor a ti?": [
          "Si te gusta programar: programación ZK y desarrollo avanzado",
          "Si te interesa la infraestructura: blockchains modulares y tecnología de billeteras",
          "Si te interesa el trading: finanzas y análisis en cadena (on-chain) avanzado",
          "Si te preocupa el marco legal: regulación y privacidad",
        ],
        "B. Escalabilidad de Ethereum (programación ZK / Cairo)": [
          "Fundamentos: cómo un rollup comprime datos y demuestra su estado",
          "Cairo: sintaxis, felt y contratos de Starknet",
          "Práctica: despliega un contrato sencillo en una red de pruebas",
          "Recursos: documentación de Starknet, libro de Cairo y talleres oficiales",
        ],
        "C. Blockchains modulares y EigenLayer": [
          "Comprende las capas: consenso, ejecución y disponibilidad de datos",
          "EigenLayer y restaking: riesgos y oportunidades",
          "Prueba una cadena modular en una red de pruebas",
          "Compara arquitecturas monolíticas y modulares con datos reales de uso",
        ],
        "D. Regulación y finanzas institucionales": [
          "Marco global: MiCA (UE), EE. UU. (SEC/CFTC) y Latinoamérica",
          "Cómo afecta la regulación a los exchanges y las stablecoins",
          "Custodia institucional e informes on-chain",
          "Estrategia profesional: puestos con perspectivas de crecimiento",
        ],
      },
    },
  ],
  footer: "Nivel 5: 11 especializaciones y acceso de por vida. Elige una ruta y llévala a la práctica.",
});
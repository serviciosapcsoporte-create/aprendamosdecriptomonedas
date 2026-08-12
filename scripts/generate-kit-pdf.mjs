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
      title: "Kit de Inicio — Nivel 3 (Avanzado)",
      subtitle: "Checklist de DeFi, trading y Layer 2",
      headings: ["Antes de empezar (seguridad)", "DeFi: lo minimo antes de tocar contratos", "Layer 2: elegir red sin errores", "Trading: regla de supervivencia"],
      lists: {
        "Antes de empezar (seguridad)": [
          "Cartera fria o hardware wallet para fondos grandes",
          "2FA activado en exchanges y email principal",
          "Semilla escrita en papel, guardada fuera de casa",
          "Nunca compartas claves ni semillas con nadie",
          "Verifica siempre la URL del exchange / dApp antes de conectar",
        ],
        "DeFi: lo minimo antes de tocar contratos": [
          "Entiendes la diferencia: exchange centralizado vs DEX",
          "Conoces como funciona un AMM (x*y=k) y el slippage",
          "Has probado primero en red de testnet",
          "Compruebas la liquidez del pool antes de operar",
          "Sabes que gas != fee del protocolo",
        ],
        "Layer 2: elegir red sin errores": [
          "Sabes si el L2 es optimistic rollup o zk-rollup",
          "Conoces como se vuelve a L1 (bridge) y sus costos",
          "Usas el bridge oficial o el que audito la comunidad",
          "Tienes ETH en L2 para pagar gas (no el mismo que en L1)",
        ],
        "Trading: regla de supervivencia": [
          "Nunca arriesgas mas del 1-2% por operacion",
          "Plan escrito antes de abrir: entrada, stop y objetivo",
          "No apalancas mientras operas en spot",
          "Llevas registro de cada trade (gano/perdi y por que)",
        ],
      },
    },
  ],
  footer: "Recuerda: primero riesgo, despues rentabilidad. Este kit acompaña los 18 temas del Nivel 3. Disfrutalo.",
});

buildPdfFile({
  filename: "workbook-nivel-4.pdf",
  outSub: ".",
  sections: [
    {
      title: "Workbook — Nivel 4 (Experto)",
      subtitle: "Framework de analisis para protocolos DeFi, L2 y oportunidades de arbitraje",
      headings: [
        "1. Checklist de seguridad de un protocolo",
        "2. Analisis de un proyecto Layer 2",
        "3. Plan de estrategia de trading algoritmico",
        "4. Diario de operaciones (plantilla)",
      ],
      lists: {
        "1. Checklist de seguridad de un protocolo": [
          "Auditorias publicas y salidas de auditorias conocidas",
          "Timelock o multisig sobre fondos del protocolo",
          "Historial de exploits en la cadena que opera",
          "TVL real vs token inflado",
          "Equipo con doxing / reputacion verificable",
          "Politica de respuesta ante incidentes (bug bounty)",
        ],
        "2. Analisis de un proyecto Layer 2": [
          "Es optimistic rollup o zk-rollup? Que implica cada uno",
          "Secuenciador: descentralizado o controlado por la empresa",
          "Puente de salida: plazo y costo para volver a L1",
          "Liquidez de los bridges y riesgo de puente",
          "Comunidad de desarrolladores y roadmap publicado",
        ],
        "3. Plan de estrategia de trading algoritmico": [
          "Definir sesgo: delta-neutral, direccional o arbitraje",
          "Elegir mercado y ventana de operacion",
          "Backtest: 200+ eventos, incluyendo crisis de liquidez",
          "Parametros de riesgo: exposure maxima, drawdown stop",
          "Ejecucion: DEX vs CEX, MEV protection, slippage max",
        ],
        "4. Diario de operaciones (plantilla)": [
          "Fecha / par / direccion",
          "Tesiss: por que me meto (1 linea)",
          "Entrada, stop inicial, take profit",
          "Riesgo arriesgado (1-2% max)",
          "Resultado y leccion aprendida",
        ],
      },
    },
  ],
  footer: "Nivel 4 Experto: 13 temas, acceso de por vida. Primero analiza, luego capital.",
});

buildPdfFile({
  filename: "guia-nivel-5.pdf",
  outSub: ".",
  sections: [
    {
      title: "Guia de Ruta — Nivel 5 (Especializaciones)",
      subtitle: "Como elegir tu especializacion: Ethereum Scaling, Blockchain Modular y Regulacion",
      headings: [
        "A. Perfil: cual especializacion te queda mejor",
        "B. Ethereum Scaling (ZK Programming / Cairo)",
        "C. Blockchain Modular y EigenLayer",
        "D. Regulacion y Finanzas institucionales",
      ],
      lists: {
        "A. Perfil: cual especializacion te queda mejor": [
          "Te gusta programar -> ZK Programming y Desarrollo Avanzado",
          "Te interesa la infraestructura -> Blockchain Modular y Wallet Tech",
          "Vienes del trading -> Finanzas y Analisis on-chain profundo",
          "Te preocupa el marco legal -> Regulacion y Privacidad",
        ],
        "B. Ethereum Scaling (ZK Programming / Cairo)": [
          "Fundamentos: como un rollup comprime datos y prueba su estado",
          "Cairo: sintaxis, felt, y contratos StarkNet",
          "Practica: deploy de un contrato simple en testnet",
          "Recursos: Starknet docs, Cairo book, workshops oficiales",
        ],
        "C. Blockchain Modular y EigenLayer": [
          "Entender las capas: consenso, ejecucion, disponibilidad de datos",
          "EigenLayer y restaking: riesgos y oportunidades",
          "Experimentar con una cadena modular de testnet",
          "Comparar monolitico vs modular con datos reales de uso",
        ],
        "D. Regulacion y Finanzas institucionales": [
          "Marco global: MiCA (UE), EEUU (SEC/CFTC), LATAM",
          "Como afecta la regulacion a exchanges y stablecoins",
          "Custodia institucional e informes on-chain",
          "Estrategia de carrera: roles que van a crecer",
        ],
      },
    },
  ],
  footer: "Nivel 5: 11 especializaciones, acceso de por vida. Elige una ruta y ejecuta.",
});
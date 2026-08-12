import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NEON = "#00f0ff";
const AMBER = "#ffd60a";
const NAVY = "#050a18";
const CARD = "#0a1226";

const offers = {
  "nivel-3": {
    title: "NIVEL 3", subtitle: "Avanzado", price: "GRATIS", eyebrow: "REGISTRO",
    items: ["DEX vs Centralizado", "AMM Matemáticas", "Layer 2 y Rollups", "Préstamos & Oráculos", "Privacidad", "Gobernanza"],
    cta: "Desbloquear gratis en systeme.io",
  },
  "nivel-4": {
    title: "NIVEL 4", subtitle: "Experto", price: "$39", eyebrow: "PAGO ÚNICO",
    items: ["ZK-Rollups", "Trading Algorítmico", "Bots de Arbitraje", "MEV", "Custodia Institucional", "Análisis On-Chain"],
    cta: "Comprar Nivel 4 — $39",
  },
  "nivel-5": {
    title: "NIVEL 5", subtitle: "Especializaciones", price: "$45", eyebrow: "PAGO ÚNICO",
    items: ["ZK Programming", "EigenLayer", "Blockchain Modular", "StarkNet / Cairo", "Wallet Tech", "Regulación Global"],
    cta: "Comprar Nivel 5 — $45",
  },
};

function chip(x, y, w, label) {
  return `<rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="${CARD}" stroke="rgba(0,240,255,0.25)"/>
<text x="${x + w / 2}" y="${y + 35}" font-size="16" font-weight="bold" fill="${NEON}" text-anchor="middle" font-family="Archivo Black, Arial, sans-serif">${label}</text>`;
}

function build(level) {
  const o = offers[level];
  const w = 1200;
  const h = 630;
  const chips = o.items.map((label, i) => chip(60 + (i % 3) * 360, 360 + Math.floor(i / 3) * 76, 332, label)).join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="#08122b"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${AMBER}"/>
      <stop offset="1" stop-color="${NEON}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="1050" cy="80" r="220" fill="rgba(0,240,255,0.08)"/>
  <circle cx="150" cy="560" r="260" fill="rgba(255,214,10,0.06)"/>
  <rect x="60" y="52" width="1080" height="4" rx="2" fill="url(#line)"/>
  <text x="60" y="140" font-size="22" font-weight="bold" fill="${AMBER}" font-family="Archivo Black, Arial, sans-serif">APRENDAMOS DE CRIPTO · SIN HUMO</text>
  <text x="60" y="220" font-size="64" font-weight="bold" fill="#ffffff" font-family="Archivo Black, Arial, sans-serif">${o.title}</text>
  <text x="60" y="280" font-size="40" font-weight="bold" fill="${NEON}" font-family="Archivo Black, Arial, sans-serif">${o.subtitle}</text>
  <rect x="60" y="300" width="180" height="44" rx="22" fill="rgba(255,214,10,0.15)" stroke="${AMBER}" stroke-width="1.5"/>
  <text x="150" y="329" font-size="18" font-weight="bold" fill="${AMBER}" text-anchor="middle" font-family="Barlow, Arial, sans-serif">${o.eyebrow}</text>
  <text x="270" y="334" font-size="20" font-weight="bold" fill="#ffffff" font-family="Archivo Black, Arial, sans-serif">→</text>
  <text x="310" y="334" font-size="40" font-weight="bold" fill="${AMBER}" font-family="Archivo Black, Arial, sans-serif">${o.price}</text>
  ${chips}
  <rect x="60" y="530" width="332" height="64" rx="12" fill="${AMBER}"/>
  <text x="226" y="570" font-size="20" font-weight="bold" fill="${NAVY}" text-anchor="middle" font-family="Archivo Black, Arial, sans-serif">${o.cta}</text>
  <text x="60" y="600" font-size="16" fill="#94a3b8" font-family="Barlow, Arial, sans-serif">Pago seguro por systeme.io · PayPal y tarjeta · Acceso de por vida</text>
  <text x="1140" y="600" font-size="14" fill="#64748b" text-anchor="end" font-family="Barlow, Arial, sans-serif">aprendamosdecriptomonedas.com</text>
</svg>
`;
}

const outDir = path.join(__dirname, "..", "public", "sales");
fs.mkdirSync(outDir, { recursive: true });
for (const l of Object.keys(offers)) {
  fs.writeFileSync(path.join(outDir, `${l}-infografia.svg`), build(l));
  console.log("Infografía:", l);
}
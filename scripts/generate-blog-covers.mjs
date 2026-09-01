import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "blog");

const covers = [
  {
    id: "detectar-estafas-cripto",
    keyword: "ESTAFAS CRIPTO",
    subtitle: "10 señales de alarma que casi nadie revisa",
  },
  {
    id: "seed-phrase-guia",
    keyword: "SEED PHRASE",
    subtitle: "La guía definitiva para respaldarla sin perder todo",
  },
  {
    id: "wallet-cual-elegir",
    keyword: "WALLETS",
    subtitle: "Fría vs caliente vs custodial: cuál te conviene",
  },
  {
    id: "que-es-blockchain-simple",
    keyword: "BLOCKCHAIN",
    subtitle: "El libro contable que nadie puede falsificar",
  },
  {
    id: "dex-vs-cex-reales",
    keyword: "DEX vs CEX",
    subtitle: "Diferencias reales, ventajas honestas",
  },
  {
    id: "halving-bitcoin-que-es",
    keyword: "HALVING",
    subtitle: "Qué es, por qué importa y qué no te va a regalar",
  },
  {
    id: "staking-cripto-riesgos",
    keyword: "STAKING",
    subtitle: "Cómo funciona y qué esconden los rendimientos",
  },
  {
    id: "stablecoins-puerta-entrada",
    keyword: "STABLECOINS",
    subtitle: "La puerta de entrada al mundo cripto",
  },
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function svg({ keyword, subtitle }) {
  const kw = escapeXml(keyword);
  const sub = escapeXml(subtitle.toUpperCase());
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1f3a"/>
      <stop offset="100%" stop-color="#1e3a5f"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1060" cy="120" r="180" fill="#fbbf24" opacity="0.05"/>
  <circle cx="140" cy="540" r="220" fill="#fbbf24" opacity="0.04"/>
  <text x="600" y="255" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="88" font-weight="900" fill="#fbbf24" letter-spacing="4">${kw}</text>
  <line x1="480" y1="300" x2="720" y2="300" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#ffffff" letter-spacing="1">${sub}</text>
  <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#94a3b8" letter-spacing="6">APRENDAMOS DE CRIPTOMONEDAS</text>
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const c of covers) {
  const file = join(OUT_DIR, `${c.id}.svg`);
  writeFileSync(file, svg(c), "utf8");
  console.log(`OK ${file}`);
}

console.log(`\n${covers.length} portadas generadas en public/blog`);

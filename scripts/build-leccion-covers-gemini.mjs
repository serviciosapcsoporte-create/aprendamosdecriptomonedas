/**
 * build-leccion-covers-gemini.mjs — UNA portada 3D original por leccion.
 *
 * POR QUE ESTE SCRIPT EXISTE
 * Los renders de octubre son 13 para 34 tarjetas de los niveles 1 y 2, asi que
 * varias lecciones compartian ilustracion (el candado 3D salia en la 8, la 9 y
 * la 11 seguidas). La unica forma de una imagen por leccion de verdad es
 * generarlas, no recortarlas: un recorte del mismo render sigue siendo el
 * mismo dibujo.
 *
 * ESTADO: requiere cuota de la API. Sin billing, Gemini responde 429
 * ("Quota exceeded ... limit: 0") y este script no genera nada.
 *
 *   set GEMINI_API_KEY=...        (Windows: $env:GEMINI_API_KEY="...")
 *   npm run covers:gemini         genera lo que falte
 *   npm run covers:gemini -- --dry    solo dice que generaria
 *   npm run covers:gemini -- --force  regenera todo
 *
 * Es idempotente: si public/assets/lecciones/leccion-NN-slug.webp ya existe y
 * no se pasa --force, la leccion se salta. Se puede ir ejecutando en tandas.
 */
import { existsSync, readdirSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = resolve(RAIZ, "public", "assets", "lecciones");

const MODELOS = (process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Estilo comun. Todo lo generado comparte esta base para que las portadas se
 * lean como una sola serie y no como 34 ilustraciones sueltas.
 */
const ESTILO =
  "3D render, dark background with deep blue and slate tones, glowing neon accents " +
  "(cyan and orange), isometric perspective, modern tech aesthetic, clean lighting, " +
  "high resolution, 16:9 ratio, no text, no words, no letters, no watermark. Topic: ";

/** nivel -> [[slug, tema en ingles para el prompt]] */
const TEMAS = {
  1: [
    ["que-es-blockchain", "a chain of glowing interconnected 3D blocks floating over a dark network grid"],
    ["como-funciona-un-bloque", "a single 3D block opening up to reveal stacked transactions inside, linked to the next block by a glowing chain"],
    ["mineria-validacion", "mining rigs validating transactions, glowing check marks sealing 3D blocks into a chain"],
    ["wallets", "a 3D glowing wallet open with keys and coins floating above it"],
    ["claves-publicas-privadas", "a pair of 3D keys, one glowing cyan and public, one golden and locked, splitting from a single keyring"],
    ["transacciones-fees", "3D coins travelling across a bridge with a glowing toll gate collecting small fees"],
    ["que-es-token-cripto", "a 3D coin splitting into smaller glowing tokens fanning out"],
    ["buenas-practicas", "a 3D glowing shield over a digital wallet with a security checklist background"],
    ["evitar-estafas", "a 3D phishing hook catching a fake digital coin with warning badges around it"],
    ["cex-vs-dex", "3D comparison of a centralized bank building vs a decentralized peer-to-peer network of glowing nodes"],
    ["seed-phrase-backups", "a 3D seed phrase as a glowing twelve-word ribbon being copied into two separate safes"],
    ["crear-wallet", "a 3D device being set up for the first time, a new wallet materialising on screen"],
    ["hacer-transaccion", "a 3D hand sending a glowing coin from one wallet to another across a chain"],
    ["entender-red", "a 3D globe wrapped in glowing network lines with several distinct chains flowing around it"],
    ["leer-transaccion-explorer", "a 3D magnifying glass over a block explorer showing a hash, a fee and an address"],
  ],
  2: [
    ["funciones-hash", "a 3D fingerprint of glowing hashes collapsing into a single block seal"],
    ["merkle-trees", "a 3D tree of glowing nodes branching upward, leaves made of hashes"],
    ["pow-vs-pos", "two 3D mechanisms side by side, one a mining hammer striking a block, the other a glowing validator stake"],
    ["gas-evm", "a 3D virtual machine burning glowing fuel to compute a transaction"],
    ["nodos", "full, light and archive 3D server nodes of different sizes linked in a network"],
    ["que-son-smart-contracts", "a 3D contract document whose clauses turn into executing code blocks"],
    ["para-que-sirven", "3D applications running without any middleman: a swap, a vault and an auction on a single screen"],
    ["riesgos-comunes", "a 3D smart contract with visible cracks and red warning badges floating around it"],
    ["oraculos", "a 3D globe feeding data through a glowing bridge into a smart contract"],
    ["oferta-demanda", "a 3D market with glowing supply stacks and demand buyers pushing a price"],
    ["emision", "a 3D coin mint with coins rising out of it on a schedule"],
    ["halving", "a 3D clock cutting a stack of coins in half at each cycle"],
    ["quema-de-tokens", "3D coins falling into a furnace of glowing embers"],
    ["market-cap", "3D scales balancing market cap, fully diluted value and liquidity on glowing pans"],
    ["defi-que-es", "an open 3D vault of finance with no door and no guard, glowing coins flowing out"],
    ["pools-liquidity", "two 3D pools of glowing liquidity being exchanged by an automated curve"],
    ["amm-uniswap", "a 3D automated market maker swapping tokens through a mathematical curve with no order book"],
    ["lending", "a 3D collateral vault lending glowing coins against a locked deposit"],
    ["staking-yield", "a 3D plant growing out of staked coins with rising yield rings"],
  ],
};

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const FORCE = args.includes("--force");
const soloNivel = (() => {
  const i = args.indexOf("--nivel");
  return i !== -1 ? args[i + 1] : null;
})();

const clave = process.env.GEMINI_API_KEY;
if (!clave) {
  console.error("Falta GEMINI_API_KEY en el entorno.");
  process.exit(1);
}

function nombreArchivo(nivel, i, slug) {
  return resolve(DESTINO, `leccion-${String(i).padStart(2, "0")}-${slug}.webp`);
}

async function generar(prompt) {
  let ultimoError = null;
  for (const modelo of MODELOS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`;
    const cuerpo = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    });
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "x-goog-api-key": clave, "Content-Type": "application/json" },
        body: cuerpo,
      });
      if (!r.ok) {
        ultimoError = `${modelo}: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`;
        continue;
      }
      const d = await r.json();
      for (const p of d?.candidates?.[0]?.content?.parts ?? []) {
        const inline = p.inlineData ?? p.inline_data;
        if (inline?.data) return { modelo, bytes: Buffer.from(inline.data, "base64") };
      }
      ultimoError = `${modelo}: la respuesta no traia imagen`;
    } catch (e) {
      ultimoError = `${modelo}: ${e.message}`;
    }
  }
  throw new Error(ultimoError ?? "sin modelos");
}

/** La API devuelve PNG; el sitio sirve WebP. ffmpeg hace la conversion. */
function pngAWebP(png, destinoWebp) {
  const temporal = destinoWebp.replace(/\.webp$/, ".tmp.png");
  writeFileSync(temporal, png);
  try {
    execFileSync("ffmpeg", ["-y", "-v", "error", "-i", temporal, "-quality", "84", destinoWebp], {
      stdio: "ignore",
    });
    return existsSync(destinoWebp);
  } finally {
    try {
      unlinkSync(temporal);
    } catch {
      /* ya no estaba */
    }
  }
}

async function main() {
  const plan = [];
  for (const [nivelStr, lista] of Object.entries(TEMAS)) {
    const nivel = Number(nivelStr);
    if (soloNivel && String(nivel) !== soloNivel) continue;
    lista.forEach(([slug], i) => {
      plan.push({ nivel, indice: i + 1, slug, destino: nombreArchivo(nivel, i + 1, slug) });
    });
  }

  const faltan = plan.filter((p) => FORCE || !existsSync(p.destino));
  console.log(`${plan.length} lecciones en total | a generar: ${faltan.length}`);

  if (DRY) {
    for (const p of faltan) console.log("  generaria", p.destino.split(/[\\/]/).pop());
    return;
  }

  let ok = 0;
  const fallos = [];
  for (const p of faltan) {
    const tema = TEMAS[p.nivel][p.indice - 1][1];
    try {
      const { modelo, bytes } = await generar(ESTILO + tema);
      const okConv = pngAWebP(bytes, p.destino);
      if (!okConv) throw new Error("ffmpeg no produjo el webp");
      ok++;
      console.log(`  [${ok}/${faltan.length}] ${p.destino.split(/[\\/]/).pop()} (${modelo}, ${Math.round(bytes.length / 1024)} KB png)`);
    } catch (e) {
      fallos.push(`${p.slug}: ${e.message}`);
      console.error(`  FALLO ${p.slug}: ${e.message}`);
      if (fallos.length >= 3) {
        console.error("\nTres fallos seguidos. Parando: revisa la cuota antes de seguir.");
        break;
      }
    }
    // La API tiene limite de peticiones por minuto: un pequeño respiro evita
    // comerse el 429 en mitad de la tanda.
    await new Promise((r) => setTimeout(r, 2500));
  }

  console.log(`\ngeneradas ${ok}/${faltan.length}`);
  if (existsSync(DESTINO)) {
    const webp = readdirSync(DESTINO).filter((f) => f.endsWith(".webp")).length;
    console.log(`portadas webp en public/assets/lecciones: ${webp}`);
  }
  if (fallos.length) {
    console.error("\nfallos:");
    for (const f of fallos) console.error("  " + f);
    process.exit(1);
  }
}

main();

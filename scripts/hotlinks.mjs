/**
 * Estado de los HotLinks de Hotmart.
 *
 * Se ejecuta antes del build y en cada deploy para que quede en el log que
 * niveles tienen CTA activo. No falla el build si faltan HotLinks: el sitio es
 * gratuito y debe publicar igual. Solo avisa.
 *
 *   npm run hotlinks
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = resolve(root, "app", "data", "hotmart-links.ts");

const DOMINIOS = ["pay.hotmart.com", "hotmart.com", "pay.hotmart.com.br", "sistecri.com.br"];

function esValido(hotlink) {
  if (!hotlink) return false;
  try {
    const u = new URL(hotlink);
    return u.protocol === "https:" && DOMINIOS.includes(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Lee el .env sin depender de dotenv: solo pares clave=valor. */
function leerEnv() {
  const out = {};
  const p = resolve(root, ".env");
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = leerEnv();
const src = readFileSync(dataFile, "utf8");

// Los cursos por nivel se declaran como "1": {...}, "3": {...}, "4": {...}
const niveles = [...src.matchAll(/^\s*"(\d)":\s*\{([\s\S]*?)^\s{2}\},/gm)]
  .map((m) => {
    const nivel = m[1];
    const bloque = m[2];
    return {
      nivel,
      curso: bloque.match(/curso:\s*"([^"]+)"/)?.[1] ?? "(sin nombre)",
      offerId: bloque.match(/offerId:\s*"([^"]+)"/)?.[1] ?? "-",
    };
  })
  .sort((a, b) => a.nivel.localeCompare(b.nivel));

const huecos = [];
const lineas = [];

for (const { nivel, curso, offerId } of niveles) {
  const valor = env[`VITE_HOTMART_${nivel}`];
  if (!valor) continue;
  if (esValido(valor)) {
    lineas.push(`  ACTIVO    nivel ${nivel}  offerId ${offerId}  ${curso}`);
  } else {
    lineas.push(`  DESCARTADO nivel ${nivel}  la variable VITE_HOTMART_${nivel} no es una URL https de Hotmart`);
    huecos.push(nivel);
  }
}

const sinDefinir = niveles
  .filter((n) => !env[`VITE_HOTMART_${n.nivel}`])
  .map((n) => n.nivel);

console.log("[hotlinks] HotLinks de Hotmart");
if (lineas.length) console.log(lineas.join("\n"));
else console.log("  (ninguno definido: todos los CTA siguen apagados)");

if (existsSync(resolve(root, ".env"))) {
  console.log(`  .env leído: ${Object.keys(env).length} variable(s)`);
} else {
  console.log("  no existe .env → ver .env.example para pegar tus HotLinks");
}

if (huecos.length) {
  console.warn(
    `[hotlinks] ${huecos.length} variable(s) ignorada(s) por no ser URL de Hotmart: ${huecos.join(", ")}`
  );
}
if (sinDefinir.length) {
  console.log(
    `[hotlinks] sin HotLink definido: niveles ${sinDefinir.join(", ")} (el CTA no se renderiza, es lo esperado)`
  );
}
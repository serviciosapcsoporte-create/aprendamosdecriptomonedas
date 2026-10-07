/**
 * Estado de los enlaces de venta de Hotmart por nivel.
 *
 * Se ejecuta antes del build y en cada deploy para que quede en el log qué
 * niveles tienen CTA activo y si algún link dejó de ser de Hotmart. No falla
 * el build: el sitio es gratuito y debe publicar igual. Solo avisa.
 *
 *   npm run hotlinks
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = resolve(root, "app", "data", "hotmart-links.ts");

const DOMINIOS = [
  "go.hotmart.com",
  "pay.hotmart.com",
  "hotmart.com",
  "pay.hotmart.com.br",
  "sistecri.com.br",
];

function esValido(link) {
  if (!link) return false;
  try {
    const u = new URL(link);
    return u.protocol === "https:" && DOMINIOS.includes(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Recorre el archivo línea a línea: `"N": [` abre el nivel, cada objeto del
 * aporta curso/linkVentas, `],` lo cierra. Sin dependencias ni eval.
 */
function parseNiveles(src) {
  const niveles = [];
  let actual = null;
  for (const line of src.split(/\r?\n/)) {
    const abre = line.match(/^\s*"(\d)":\s*\[/);
    if (abre) {
      actual = { nivel: abre[1], cursos: [] };
      niveles.push(actual);
      continue;
    }
    if (!actual) continue;
    if (/^\s*\],?\s*$/.test(line)) {
      actual = null;
      continue;
    }
    const curso = line.match(/^\s*curso:\s*"([^"]+)"/);
    if (curso) {
      actual.cursos.push({ curso: curso[1], linkVentas: null });
      continue;
    }
    const link = line.match(/^\s*linkVentas:\s*"([^"]+)"/);
    if (link && actual.cursos.length) {
      actual.cursos[actual.cursos.length - 1].linkVentas = link[1];
    }
  }
  return niveles.sort((a, b) => a.nivel.localeCompare(b.nivel));
}

const src = readFileSync(dataFile, "utf8");
const niveles = parseNiveles(src);

const lineas = [];
const huecos = [];

for (const { nivel, cursos } of niveles) {
  if (cursos.length === 0) {
    lineas.push(`  VACÍO    nivel ${nivel}  sin cursos (el CTA no se renderiza)`);
    continue;
  }
  for (const { curso, linkVentas } of cursos) {
    if (esValido(linkVentas)) {
      lineas.push(`  ACTIVO   nivel ${nivel}  ${curso}`);
      lineas.push(`           ${linkVentas}`);
    } else {
      lineas.push(`  DESCARTADO nivel ${nivel}  ${curso}  link no es https de Hotmart:`);
      lineas.push(`           ${linkVentas ?? "(sin linkVentas)"}`);
      huecos.push(`${nivel} · ${curso}`);
    }
  }
}

console.log("[hotlinks] Enlaces de venta de Hotmart por nivel");
console.log(lineas.join("\n") || "  (sin cursos en ningún nivel)");

if (huecos.length) {
  console.warn(
    `[hotlinks] ${huecos.length} link(s) inválido(s) — ese CTA no se renderiza: ${huecos.join(" | ")}`
  );
}
console.log(
  `[hotlinks] ${niveles.length} niveles revisados · ${niveles.reduce((n, x) => n + x.cursos.length, 0)} cursos`
);

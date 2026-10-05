/**
 * Prerender de head por ruta.
 *
 * PROBLEMA QUE RESUELVE
 * GitHub Pages no tiene fallback de SPA: cualquier ruta sin archivo responde
 * 404.html con estado HTTP 404. Con una SPA, TODAS las rutas (/nivel-1,
 * /recursos, /privacidad, los 75 temas...) devolvian 404 aunque la app
 * renderizara bien en el navegador. Google recibe esas URLs como inexistentes.
 *
 * QUE HACE
 * 1. Lee dist/sitemap.xml (fuente unica de verdad de las URLs publicas).
 * 2. Para cada ruta escribe dist/<ruta>.html: el index.html recien construido
 *    con title, description, canonical, og:* y twitter:* unicos de esa pagina.
 *    GitHub Pages sirve /foo desde /foo.html con estado 200.
 * 3. Si alguna ruta del sitemap no.metadata, falla el build en vez de dejar
 *    una pagina con el title de otra.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const dataDir = resolve(root, "app", "data");
const routesDir = resolve(root, "app", "routes");

const SITE = (() => {
  const cname = resolve(root, "public", "CNAME");
  return existsSync(cname)
    ? `https://${readFileSync(cname, "utf8").trim()}`
    : "https://aprendamosdecript";
})();

const slurp = (f) => readFileSync(resolve(dataDir, f), "utf8");

// ---------------------------------------------------------------------------
// Extraccion de metadata. Mismo estilo que postbuild.mjs: los .ts de data son
// datos planos con los campos en orden fijo, asi que se leen por expresion
// regular en vez de arrastrar un compilador de TypeScript al build.
// ---------------------------------------------------------------------------
const all = (src, re) => [...src.matchAll(re)].map((m) => m[1]);

function zip(a, b, c, file) {
  if (a.length !== b.length || a.length !== c.length) {
    throw new Error(
      `${file}: se extrajeron ${a.length} slugs, ${b.length} titles y ${c.length} descriptions. Revisar el formato del archivo.`
    );
  }
  return a.map((slug, i) => ({ slug, title: b[i], description: c[i] }));
}

const levelMeta = {};
for (const n of [1, 2, 3, 4, 5]) {
  const file = `level${n}.ts`;
  const src = slurp(file);
  levelMeta[n] = zip(
    all(src, /slug:\s*"([^"]+)"/g),
    all(src, /\n\s*title:\s*"((?:[^"\\]|\\.)*)"/g),
    all(src, /\n\s*description:\s*"((?:[^"\\]|\\.)*)"/g),
    file
  );
}

// posts.ts esta escrito en una sola linea muy larga: aqui el ancla de salto de
// linea no sirve, pero `id:` / `title:` / `metaDescription:` solo aparecen como
// claves de objeto seguidas de comilla (la interface usa `title: string`).
const postsSrc = slurp("posts.ts");
const postIds = [...new Set(all(postsSrc, /\bid:\s*"([^"]+)"/g))];
const postTitles = all(postsSrc, /\btitle:\s*"((?:[^"\\]|\\.)*)"/g);
const postDescs = all(postsSrc, /\bmetaDescription:\s*"((?:[^"\\]|\\.)*)"/g);
const postSummaries = all(postsSrc, /\bsummary:\s*"((?:[^"\\]|\\.)*)"/g);

function clamp(text, max = 158) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return (sp > 60 ? cut.slice(0, sp) : cut) + "…";
}

/** Title/description de las paginas estaticas, leidos del propio head de la ruta. */
function headFromRoute(file) {
  const fp = resolve(routesDir, file);
  if (!existsSync(fp)) throw new Error(`headFromRoute: no existe ${file}`);
  const src = readFileSync(fp, "utf8");
  const head = src.slice(src.indexOf("head: ()"));
  const STR = '(?:"(?:[^"\\\\]|\\\\.)*"|`(?:[^`\\\\]|\\\\.)*`)';
  const title = head.match(new RegExp(`title:\\s*\\n?\\s*(${STR})`))?.[1];
  const desc = head.match(new RegExp(`name:\\s*"description",\\s*\\n?\\s*content:\\s*\\n?\\s*(${STR})`))?.[1];
  if (!title || !desc) {
    throw new Error(
      `${file}: el head no declara title o description con una forma reconocible. El prerender no puede inventarlos.`
    );
  }
  const unquote = (v) => v.slice(1, -1).replace(/\$\{AUTHOR\}/g, "Alejandro Piraquive");
  return { title: unquote(title), description: clamp(unquote(desc)) };
}

// Paginas cuyo head vive en el .tsx y no en un .ts de data.
const staticRoutes = {
  "/": { file: "index.tsx" },
  "/acerca-de": { file: "acerca-de.tsx" },
  "/privacidad": { file: "privacidad.tsx" },
  "/terminos": { file: "terminos.tsx" },
  "/afiliados": { file: "afiliados.tsx" },
  "/blog": { file: "blog.tsx" },
  "/noticias": { file: "noticias.tsx" },
  "/recursos": { file: "recursos.tsx" },
  "/nivel-1-principiante": { file: "nivel-1-principiante.tsx" },
  "/nivel-2-intermedio": { file: "nivel-2-intermedio.tsx" },
  "/nivel-3-avanzado": { file: "nivel-3-avanzado.tsx" },
  "/nivel-4-experto": { file: "nivel-4-experto.tsx" },
  "/nivel-5-especializaciones": { file: "nivel-5-especializaciones.tsx" },
  "/recursos/el-inversor-que-sobrevive": { file: "recursos/el-inversor-que-sobrevive.tsx" },
  "/recursos/checklist-supervivencia-cripto": { file: "recursos/checklist-supervivencia-cripto.tsx" },
  "/recursos/el-custodio": { file: "recursos/el-custodio.tsx" },
  "/recursos/el-escudo-de-5-minutos": { file: "recursos/el-escudo-de-5-minutos.tsx" },
  "/recursos/el-escanner": { file: "recursos/el-escanner.tsx" },
};

// ---------------------------------------------------------------------------
// Metadata de cada ruta del sitemap.
// ---------------------------------------------------------------------------
const metaFor = (path) => {
  if (path === "/") return headFromRoute("index.tsx");

  const lesson = path.match(/^\/nivel-([1-5])\/([^/]+)$/);
  if (lesson) {
    const list = levelMeta[lesson[1]];
    const hit = list.find((t) => t.slug === lesson[2]);
    if (!hit) throw new Error(`${path}: el sitemap declara un slug que no existe en level${lesson[1]}.ts`);
    return {
      title: `${hit.title} | Nivel ${lesson[1]} | ${BRAND}`,
      description: clamp(hit.description),
    };
  }

  const post = path.match(/^\/blog\/([^/]+)$/);
  if (post) {
    const i = postIds.indexOf(post[1]);
    if (i === -1) throw new Error(`${path}: el sitemap declara un post que no existe en posts.ts`);
    return {
      title: `${postTitles[i]} | Blog | ${BRAND}`,
      description: clamp(postDescs[i] || postSummaries[i]),
    };
  }

  if (staticRoutes[path]) return headFromRoute(staticRoutes[path].file);

  // El sitemap incluye redirecciones legacy que nunca se publican.
  if (/^\/b\//.test(path)) return null;
  throw new Error(`${path}: sin metadata. Anadirla a staticRoutes o al extractor para no publicar un titulo duplicado.`);
};

// ---------------------------------------------------------------------------
// Reescritura del head del index.html construido por vite.
// ---------------------------------------------------------------------------
const shell = readFileSync(resolve(dist, "index.html"), "utf8");

// El nombre de marca se lee del propio index.html recien construido, para que
// un cambio de marca en el sitio no deje titulos viejos prerenderizados.
const BRAND = shell.match(/<meta property="og:site_name" content="([^"]*)"/)?.[1] ?? "";
if (!BRAND) throw new Error("No se encontro og:site_name en dist/index.html");

function replaceOnce(html, re, replacement, what) {
  const matches = html.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"));
  if (!matches || matches.length !== 1) {
    throw new Error(`head: se esperaba exactamente 1 etiqueta ${what}, se hallaron ${matches ? matches.length : 0}`);
  }
  return html.replace(re, replacement);
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderHead(html, { title, description }, path) {
  const canonical = `${SITE}${path}`;
  const url = esc(canonical);
  let out = html;
  out = replaceOnce(out, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, "title");
  out = replaceOnce(
    out,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(description)}" />`,
    "description"
  );
  out = replaceOnce(
    out,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
    "canonical"
  );
  out = replaceOnce(
    out,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`,
    "og:title"
  );
  out = replaceOnce(
    out,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(description)}" />`,
    "og:description"
  );
  out = replaceOnce(
    out,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
    "og:url"
  );
  out = replaceOnce(
    out,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    "twitter:title"
  );
  out = replaceOnce(
    out,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    "twitter:description"
  );
  return out;
}

// ---------------------------------------------------------------------------
const sitemapPath = resolve(dist, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  throw new Error("dist/sitemap.xml no existe. El prerender debe correr despues de postbuild.mjs.");
}
const paths = [
  ...readFileSync(sitemapPath, "utf8").matchAll(/<loc>\s*https?:\/\/[^/]+(\/[^<]*?)\s*<\/loc>/g),
].map((m) => m[1]);

let written = 0;
const titles = new Map();
for (const path of paths) {
  const meta = metaFor(path);
  if (!meta) continue;
  if (titles.has(meta.title)) {
    throw new Error(`title duplicado: "${meta.title}" en ${titles.get(meta.title)} y ${path}`);
  }
  titles.set(meta.title, path);

  if (path === "/") continue;
  const outFile = resolve(dist, `${path.replace(/^\//, "")}.html`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, renderHead(shell, meta, path), "utf8");
  written++;
}

// 404.html se regenera al final para que no quede apuntando a un build viejo.
if (existsSync(resolve(dist, "index.html"))) {
  writeFileSync(resolve(dist, "404.html"), readFileSync(resolve(dist, "index.html"), "utf8"), "utf8");
}

const bytes = paths.reduce((sum, p) => {
  const f = resolve(dist, p === "/" ? "index.html" : `${p.replace(/^\//, "")}.html`);
  return sum + (existsSync(f) ? statSync(f).size : 0);
}, 0);

console.log(
  `[prerender] ${written} paginas estaticas escritas + index.html, ${titles.size} titles unicos, ~${Math.round(bytes / 1024)} KB`
);
for (const n of [1, 2, 3, 4, 5]) {
  console.log(`[prerender]   nivel-${n}: ${levelMeta[n].length} lecciones`);
}

// ---------------------------------------------------------------------------
// El numero de lecciones aparece escrito a mano en la home, en las metas de
// index.html, en /acerca-de y en llms.txt. Esos textos no se renderizan desde
// los datos, asi que se caducan solos: al anadir la leccion de DeFi el sitio
// siguio diciendo 75 temas en ocho sitios. Aqui se comprueba y se rompe el
// build si deja de cuadar, que es mas barato que quejarse en una busqueda.
// ---------------------------------------------------------------------------
{
  const porNivel = [1, 2, 3, 4, 5].map((f) => [
    ...slurp(`level${f}.ts`).matchAll(/^\s*slug:\s*"([^"]+)"/gm),
  ].length);
  const totalLecciones = porNivel.reduce((a, b) => a + b, 0);

  const textos = ["index.html", "public/llms.txt"]
    .map((f) => readFileSync(resolve(root, f), "utf8"))
    .concat(["index.tsx", "acerca-de.tsx"].map((f) => readFileSync(resolve(routesDir, f), "utf8")))
    .join("\n");

  // Cifras validas: el total del curso y el total de cada nivel. La home lista
  // los cinco niveles con su propio conteo ("15 temas", "18 temas"...), asi que
  // esas menciones son correctas y no se pueden marcar como error.
  const validas = new Set([totalLecciones, ...porNivel]);

  // Se ignoran los numeros que no son un conteo de lecciones, como el 75% de un
  // ejemplo de nivel 3 o un offer ID de Hotmart que lleve 75 dentro.
  const menciones = [
    ...new Set(textos.match(/\b\d{2,3}\s+(?:temas|lecciones)\b/g) ?? []),
  ].map((m) => Number(m.match(/\d+/)[0]));

  const desalineados = menciones.filter((n) => !validas.has(n));
  if (desalineados.length) {
    throw new Error(
      `Hay ${desalineados.length} texto(s) que no coinciden con los datos: ` +
        `${desalineados.join(", ")}. Validas: ${[...validas].sort((a, b) => a - b).join(", ")} ` +
        `(total y por nivel). Corrige a mano la home, las metas de index.html, ` +
        `/acerca-de y llms.txt.`
    );
  }
  console.log(
    `[prerender] numero de lecciones coherente: ${totalLecciones} total, por nivel ${porNivel.join("/")}`
  );
}

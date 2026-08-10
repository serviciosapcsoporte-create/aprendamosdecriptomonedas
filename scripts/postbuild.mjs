import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const dataDir = resolve(root, "app", "data");

const SITE = "https://aprendamosdecriptomonedas.lat";

const staticRoutes = [
  "/",
  "/acerca-de",
  "/blog",
  "/noticias",
  "/recursos",
  "/nivel-1-principiante",
  "/nivel-2-intermedio",
  "/nivel-3-avanzado",
  "/nivel-4-experto",
  "/nivel-5-especializaciones",
  "/nivel-1/que-es-blockchain",
  "/nivel-1/como-funciona-un-bloque",
];

function slurp(file) {
  return readFileSync(resolve(dataDir, file), "utf8");
}

function slugsBetween(source, startMark, endMark) {
  const start = source.indexOf(startMark);
  if (start === -1) return [];
  let chunk = source;
  if (endMark !== null) {
    const end = source.indexOf(endMark, start + startMark.length);
    chunk = end === -1 ? source.slice(start) : source.slice(start, end);
  }
  const slugs = [...chunk.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

const curriculum = slurp("curriculum.ts");
const nivel1 = slugsBetween(curriculum, '"nivel-1"', '"nivel-2"');
const nivel2 = slugsBetween(curriculum, '"nivel-2"', '"nivel-3"');
const nivel3 = [...new Set([...slurp("level3.ts").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]))];
const nivel4 = [...new Set([...slurp("level4.ts").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]))];
const nivel5 = [...new Set([...slurp("level5.ts").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]))];

const topicRoutes = [
  ...nivel1.map((s) => `/nivel-1/${s}`),
  ...nivel2.map((s) => `/nivel-2/${s}`),
  ...nivel3.map((s) => `/nivel-3/${s}`),
  ...nivel4.map((s) => `/nivel-4/${s}`),
  ...nivel5.map((s) => `/nivel-5/${s}`),
];

const posts = [...slurp("posts.ts").matchAll(/id:\s*"([^"]+)"/g)].map((m) => `/blog/${m[1]}`);

const today = new Date().toISOString().slice(0, 10);
const lastmod = (i) => (i === 0 ? today : today);

const allRoutes = [
  ...new Set([
    ...staticRoutes,
    ...topicRoutes,
    ...posts,
  ]),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route, i) => `  <url>
    <loc>${SITE}${route}</loc>
    <lastmod>${lastmod(i)}</lastmod>
    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "/" ? "1.0" : /^\/nivel-\d\//.test(route) ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });
writeFileSync(resolve(dist, "sitemap.xml"), xml, "utf8");

if (existsSync(resolve(dist, "index.html"))) {
  copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
}

console.log(`[postbuild] sitemap.xml generado con ${allRoutes.length} URLs`);
console.log(`[postbuild] 404.html (SPA fallback) listo`);
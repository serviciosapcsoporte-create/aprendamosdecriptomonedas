import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, rmSync, statSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const dataDir = resolve(root, "app", "data");
const routesDir = resolve(root, "app", "routes");

const SITE = (() => {
  // El dominio se lee del propio CNAME del repo: si cambia alli, cambia aqui.
  const cname = resolve(root, "public", "CNAME");
  return existsSync(cname)
    ? `https://${readFileSync(cname, "utf8").trim()}`
    : "https://aprendamosdecript";
})();

const slurp = (file) => readFileSync(resolve(dataDir, file), "utf8");
const mtime = (file) => statSync(file).mtime.toISOString().slice(0, 10);
const slugsOf = (file) => [
  ...new Set([...slurp(file).matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])),
];

// ---------------------------------------------------------------------------
// Rutas estaticas. Las redirecciones legacy (b/$slug y los 4 stubs de raiz)
// NO van en el sitemap: son client-side redirects, no contenido.
// ---------------------------------------------------------------------------
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly", from: routesDir + "/index.tsx" },
  { path: "/acerca-de", priority: "0.6", changefreq: "monthly", from: routesDir + "/acerca-de.tsx" },
  { path: "/privacidad", priority: "0.3", changefreq: "yearly", from: routesDir + "/privacidad.tsx" },
  { path: "/terminos", priority: "0.3", changefreq: "yearly", from: routesDir + "/terminos.tsx" },
  { path: "/afiliados", priority: "0.4", changefreq: "monthly", from: routesDir + "/afiliados.tsx" },
  { path: "/blog", priority: "0.7", changefreq: "weekly", from: routesDir + "/blog.tsx" },
  { path: "/noticias", priority: "0.6", changefreq: "daily", from: routesDir + "/noticias.tsx" },
  { path: "/recursos", priority: "0.7", changefreq: "monthly", from: routesDir + "/recursos.tsx" },
  { path: "/nivel-1-principiante", priority: "0.9", changefreq: "monthly", from: routesDir + "/nivel-1-principiante.tsx" },
  { path: "/nivel-2-intermedio", priority: "0.9", changefreq: "monthly", from: routesDir + "/nivel-2-intermedio.tsx" },
  { path: "/nivel-3-avanzado", priority: "0.9", changefreq: "monthly", from: routesDir + "/nivel-3-avanzado.tsx" },
  { path: "/nivel-4-experto", priority: "0.9", changefreq: "monthly", from: routesDir + "/nivel-4-experto.tsx" },
  { path: "/nivel-5-especializaciones", priority: "0.9", changefreq: "monthly", from: routesDir + "/nivel-5-especializaciones.tsx" },
];

const resourceSlugs = [
  "el-inversor-que-sobrevive",
  "checklist-supervivencia-cripto",
  "el-custodio",
  "el-escudo-de-5-minutos",
  "el-escanner",
].map((s) => ({
  path: `/recursos/${s}`,
  priority: "0.7",
  changefreq: "monthly",
  from: resolve(routesDir, "recursos", `${s}.tsx`),
}));

// ---------------------------------------------------------------------------
// Lecciones: los slugs vienen de level1..level5.ts. Antes se intentaba sacarlos
// de curriculum.ts, que solo cablea imports y no contiene ningun slug: por eso
// el sitemap tenia 2 URLs de nivel 1 (las hardcodeadas) y 0 de nivel 2.
// ---------------------------------------------------------------------------
const levelFiles = {
  1: "level1.ts",
  2: "level2.ts",
  3: "level3.ts",
  4: "level4.ts",
  5: "level5.ts",
};

const lessonRoutes = Object.entries(levelFiles).flatMap(([n, file]) => {
  const fp = resolve(dataDir, file);
  const lastmod = mtime(fp);
  return slugsOf(file).map((slug) => ({
    path: `/nivel-${n}/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod,
  }));
});

// ---------------------------------------------------------------------------
// Blog: fecha real de cada post en vez de la fecha de build.
// ---------------------------------------------------------------------------
const postsSrc = slurp("posts.ts");
const posts = [...postsSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const postDates = new Map();
for (const block of postsSrc.split(/\n {2}\{\n/)) {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1];
  const date = block.match(/date:\s*"([^"]+)"/)?.[1];
  if (id && date) postDates.set(id, date);
}
const postRoutes = [...new Set(posts)].map((id) => ({
  path: `/blog/${id}`,
  priority: "0.7",
  changefreq: "monthly",
  lastmod: postDates.get(id) || mtime(resolve(dataDir, "posts.ts")),
}));

// ---------------------------------------------------------------------------
const allRoutes = [...staticRoutes, ...resourceSlugs, ...lessonRoutes, ...postRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((r) => {
    const lastmod = r.lastmod || (r.from && existsSync(r.from) ? mtime(r.from) : mtime(resolve(dataDir, "curriculum.ts")));
    return `  <url>
    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

// ---------------------------------------------------------------------------
// 404 SPA fallback. Se regenera SIEMPRE desde el index recien construido para no
// dejar un 404.html apuntando a un bundle de un build anterior.
// ---------------------------------------------------------------------------
if (existsSync(dist)) mkdirSync(dist, { recursive: true });
writeFileSync(resolve(dist, "sitemap.xml"), xml, "utf8");

if (existsSync(resolve(dist, "index.html"))) {
  copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
}

// Limpia bundles huerfanos de builds previos (habia dos .js y dos .css).
// OJO: el index.html solo cita el entry y el CSS. Los demas bundles (vendors y
// chunks cargados con import dinamico) se referencian ENTRE SI desde su propio
// codigo ("./react-xxxx.js"), asi que hay que seguir la cadena de imports desde
// el entry: leer solo el HTML borraba react/tanstack/medallion y la app en
// produccion quedaba en blanco (404 en los chunks).
const assets = resolve(dist, "assets");
if (existsSync(assets)) {
  const files = readdirSync(assets);
  const known = new Set(files);
  // Cualquier token que parezca un archivo de assets; el filtro por `known`
  // evita confundir rutas con el nombre de un paquete o de un source map.
  const candidate = /([A-Za-z0-9._-]+\.[A-Za-z0-9]{2,8})\b/g;
  const collect = (file) => {
    const out = new Set();
    if (!existsSync(file)) return out;
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(candidate)) {
      if (known.has(m[1])) out.add(m[1]);
    }
    return out;
  };

  const keep = collect(resolve(dist, "index.html"));
  const queue = [...keep];
  while (queue.length) {
    const name = queue.pop();
    if (!/\.(js|css)$/.test(name)) continue;
    for (const next of collect(resolve(assets, name))) {
      if (!keep.has(next)) {
        keep.add(next);
        queue.push(next);
      }
    }
  }

  for (const f of files) {
    // Carpetas = recursos estaticos que vienen de public/ (hoy public/assets/3d
    // con los renders 3D). Vite los copia tal cual a dist/, asi que landings
    // dentro de dist/assets/ y jamas son bundles huerfanos: borrarlos dejaba
    // la landing entera sin imagenes y rompia el build con ERR_FS_EISDIR.
    if (statSync(resolve(assets, f)).isDirectory()) continue;
    if (!keep.has(f)) {
      rmSync(resolve(assets, f));
      console.log(`[postbuild] asset huerfano eliminado: ${f}`);
    }
  }
}

const counts = {
  estaticas: staticRoutes.length,
  recursos: resourceSlugs.length,
  lecciones: lessonRoutes.length,
  posts: postRoutes.length,
};
console.log(`[postbuild] sitemap.xml con ${allRoutes.length} URLs`, counts);
for (const n of [1, 2, 3, 4, 5]) {
  const c = lessonRoutes.filter((r) => r.path.startsWith(`/nivel-${n}/`)).length;
  console.log(`[postbuild]   nivel-${n}: ${c} lecciones`);
}
console.log("[postbuild] 404.html (SPA fallback) regenerado");
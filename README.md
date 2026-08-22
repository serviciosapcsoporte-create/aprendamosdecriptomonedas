# Aprendamos de Criptomonedas

Plataforma educativa en español sobre blockchain y criptomonedas: curso guiado en 5 niveles, blog, guías descargables y recursos. _"Educación segura, estrategia clara y sin humo."_

Sitio desplegado en **https://aprendamosdecriptomonedas.lat** (GitHub Pages).

## Stack

- [Vite 5](https://vitejs.dev/) + React 18 + TypeScript
- [TanStack Router](https://tanstack.com/router) (file-based routing + SEO meta por ruta)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS 3](https://tailwindcss.com/)
- GitHub Pages (deploy con GitHub Actions)

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor local de desarrollo (http://localhost:3000)
npm run build      # build de producción + postbuild (sitemap.xml, 404.html)
npm run preview    # previsualizar el build local (http://localhost:4173)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Estructura

```
app/
  routes/            Rutas de TanStack
    nivel-1..5/$topicSlug.tsx   Páginas individuales de temas
    blog/            Listado y detalle de posts del blog
  data/
    curriculum.ts    Niveles 1-2 (temas inline) + niveles 3-5 (importados)
    level3.ts        Temas del nivel 3
    level4.ts        Temas del nivel 4
    level5.ts        Temas del nivel 5
    posts.ts         Posts del blog
  components/        Header, Footer, MainNav, Markdown
public/
  CNAME              Dominio personalizado (GitHub Pages)
  favicon.svg, logo.svg, diagramas, imágenes de blog
scripts/
  postbuild.mjs      Genera sitemap.xml y copia 404.html (SPA fallback)
```

## Contenido

Curso de **75 temas** en 5 niveles — **100% gratuito y sin registro**:

| Nivel | Temas | Acceso |
|-------|-------|--------|
| 1 — Principiante | 15 | Gratis |
| 2 — Intermedio | 18 | Gratis |
| 3 — Avanzado | 18 | Gratis |
| 4 — Experto | 13 | Gratis |
| 5 — Especializaciones | 11 | Gratis |

Los temas de niveles 3-5 se escriben en markdown extendido (títulos, listas, tablas, bloques de código) y se renderizan con un renderer liviano propio.

Además: blog, noticias automáticas (RSS, actualización diaria), guías descargables en `/recursos` y rutas legacy `/b/*` que redirigen a `/recursos`.

## Deploy en GitHub Pages

El dominio `aprendamosdecriptomonedas.lat` ya apunta a GitHub. El workflow `.github/workflows/deploy.yml` publica `dist/` en cada push a `main` mediante GitHub Actions. También se usa `public/404.html` (generado en el build) para el fallback SPA de links profundos.

## Notas legales

Educación, no asesoría financiera. © 2026 Aprendamos de Criptomonedas.
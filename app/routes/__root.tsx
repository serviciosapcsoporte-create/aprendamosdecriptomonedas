import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { CookieConsent } from "@/components/CookieConsent";
import { OG_IMAGE, AUTHOR, canonical, jsonLd, organizationLd, personLd, webSiteLd } from "@/lib/seo";

/**
 * Un solo canonical en todo el sitio, derivado de la URL que se esta viendo.
 *
 * Antes cada ruta declaraba el suyo en `links`, pero TanStack renderiza los
 * links de todas las rutas que hacen match sin deduplicar por `rel`: al abrir
 * /recursos/el-escudo-de-5-minutos el DOM tenia el canonical de la guia, el de
 * /recursos y el repetido. Google toma el primero, asi que en navegacion
 * cliente podia quedar apuntando a la pagina padre.
 *
 * En un 404 no se emite canonical: una pagina que no existe no debe canonizarse.
 * El HTML prerenderizado (scripts/prerender.mjs) lleva el canonical estatico
 * para los crawlers que no ejecutan JavaScript.
 */
function CanonicalLink() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const leaf = useRouterState({ select: (s) => s.matches[s.matches.length - 1]?.id });
  if (!leaf || leaf === "/") return null;
  return <link rel="canonical" href={canonical(pathname)} />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo falló de nuestro lado. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // `title` va como campo de primer nivel del head, NO dentro de `meta`.
    // Dentro de `meta` TanStack lo renderiza como <meta name="title"> y el
    // <title> del documento se queda siempre con el valor estatico de
    // index.html, que es el mismo en todas las paginas.
    title: "Aprendamos de Criptomonedas | Educación cripto sin humo",
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
      },
      { name: "author", content: AUTHOR },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      {
        property: "og:description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aprendamos de Criptomonedas" },
      { name: "twitter:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      { name: "twitter:description", content: "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero." },
      {
        property: "og:image",
        content: OG_IMAGE,
      },
      {
        name: "twitter:image",
        content: OG_IMAGE,
      },
    ],
    scripts: [
      jsonLd(organizationLd),
      jsonLd(personLd),
      jsonLd(webSiteLd),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <CanonicalLink />
        <HeadContent />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-[var(--border)] focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* Banner de consentimiento. Montado aqui y no en cada pagina para que
          la decision se lea una sola vez por visita, no una vez por ruta. */}
      <CookieConsent />
    </QueryClientProvider>
  );
}

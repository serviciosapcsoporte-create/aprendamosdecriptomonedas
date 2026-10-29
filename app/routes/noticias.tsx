import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowUpRight, Newspaper, RefreshCw } from "lucide-react";
import { Header, Footer } from "@/components/Header";
import { cargarNoticias, fechaNoticia } from "@/data/news";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/noticias")({
  component: NoticiasPage,
  head: () => ({
    title: "Noticias de Criptomonedas al día | Aprendamos de Criptomonedas",
    meta: [
      { name: "description", content: "Resumen diario de noticias de Bitcoin, blockchain, DeFi y criptomonedas. Educación segura, estrategia clara y sin humo." },
      { property: "og:title", content: "Noticias de Criptomonedas al día | Aprendamos de Criptomonedas" },
      { property: "og:description", content: "Resumen curado de Bitcoin, blockchain, DeFi y regulación. Actualizado automáticamente." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/noticias/noticias-og.webp` },
      { property: "og:image:alt", content: "Noticias de criptomonedas y gráficos de mercado" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
  }),
});

function NoticiasPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: cargarNoticias,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
  });
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
  const items = data?.items ?? [];

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <div className="container mx-auto max-w-6xl px-4 pb-16 pt-8 md:pb-20 md:pt-12">
          <section aria-labelledby="news-title" className="relative isolate mb-10 min-h-[22rem] overflow-hidden rounded-lg bg-slate-950 md:min-h-[25rem]">
            <img src="/noticias/banner-noticias.webp" alt="Paneles de noticias y gráficos de criptomonedas" width={1200} height={675} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/20" />
            <div className="relative flex min-h-[22rem] max-w-3xl flex-col justify-end p-6 md:min-h-[25rem] md:p-10">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-warning/40 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-warning backdrop-blur">
                <Newspaper className="h-3.5 w-3.5" aria-hidden="true" /> Actualización diaria
              </span>
              <h1 id="news-title" className="max-w-2xl font-serif text-4xl font-medium leading-tight text-white md:text-5xl">Noticias del mundo cripto</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">Bitcoin, blockchain, DeFi y regulación, con titulares enlazados a sus fuentes originales.</p>
              {data?.generatedAt && <p className="mt-5 text-xs text-slate-300">Última actualización: {fechaNoticia(data.generatedAt, true)}</p>}
            </div>
          </section>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div><h2 className="text-xl font-semibold">Últimos titulares</h2><p className="mt-1 text-sm text-muted-foreground">{items.length ? `${items.length} noticias en el resumen` : "Selección diaria de fuentes cripto"}</p></div>
            <button type="button" onClick={handleRefresh} disabled={refreshing || isLoading} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:cursor-wait disabled:opacity-60">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />Actualizar
            </button>
          </div>

          {isLoading && <div className="grid gap-4 md:grid-cols-2" aria-label="Cargando noticias" aria-busy="true">{[0, 1, 2, 3].map((item) => <div key={item} className="h-44 animate-pulse rounded-lg border border-border bg-muted/40" />)}</div>}

          {isError && !isLoading && <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center"><p className="text-sm text-muted-foreground">No se pudo cargar el resumen de noticias.</p><button type="button" onClick={handleRefresh} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Reintentar</button></div>}

          {!isLoading && !isError && items.length === 0 && <p className="rounded-lg border border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">No hay noticias disponibles en este momento.</p>}

          {!isLoading && !isError && items.length > 0 && <>
            <article className="mb-5 grid overflow-hidden rounded-lg border border-primary/30 bg-navy text-white md:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.8fr)]">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-300"><span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 font-semibold text-warning">En portada</span><span className="font-semibold text-white">{items[0].source}</span><time dateTime={items[0].publishedAt}>{fechaNoticia(items[0].publishedAt)}</time></div>
                <h2 className="font-serif text-2xl font-medium leading-tight md:text-3xl">{items[0].title}</h2>
                {items[0].excerpt && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 line-clamp-4">{items[0].excerpt}</p>}
                <a href={items[0].link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-warning hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning">Leer la noticia <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
              <div aria-hidden="true" className="hidden min-h-56 bg-cover bg-center md:block" style={{ backgroundImage: "linear-gradient(90deg, rgba(15,23,42,.35), rgba(15,23,42,.05)), url('/noticias/banner-noticias.webp')" }} />
            </article>
            <div className="grid gap-4 md:grid-cols-2">
              {items.slice(1).map((item) => <article key={item.link} className="flex min-h-48 flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 dark:bg-card-dark">
                <div><div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground"><span className="font-semibold text-warning">{item.source}</span><span aria-hidden="true">·</span><time dateTime={item.publishedAt}>{fechaNoticia(item.publishedAt)}</time></div><h2 className="text-lg font-semibold leading-snug">{item.title}</h2>{item.excerpt && <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{item.excerpt}</p>}</div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Leer nota <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
              </article>)}
            </div>
          </>}

          <aside className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <div><h2 className="font-semibold">¿Quieres entender el contexto?</h2><p className="mt-1 text-sm text-muted-foreground">Explora las lecciones gratuitas y el análisis del blog.</p></div>
            <div className="flex flex-wrap gap-3"><Link to="/" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark">Plan educativo</Link><Link to="/blog" className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary">Ir al blog</Link></div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
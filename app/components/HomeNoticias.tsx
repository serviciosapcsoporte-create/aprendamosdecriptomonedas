import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { cargarNoticias, fechaNoticia } from "@/data/news";

export function HomeNoticias() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: cargarNoticias,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
  });
  const items = data?.items.slice(0, 3) ?? [];

  return (
    <AnimatedSection animation="fade-in-up" className="relative z-10 scroll-mt-24" id="noticias">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase text-warning">
              <Newspaper className="h-4 w-4" aria-hidden="true" /> Actualidad cripto
            </p>
            <ElegantHeading as="h2" className="mb-3 text-[length:var(--heading-text-size)]">
              Noticias para entender lo que pasa
            </ElegantHeading>
            <p className="text-muted-foreground">Una selección reciente de Bitcoin, blockchain, DeFi y regulación, con enlaces a sus fuentes.</p>
          </div>
          <Link to="/noticias" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Todas las noticias <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {isLoading && <div className="grid gap-4 md:grid-cols-3" aria-label="Cargando noticias" aria-busy="true">
          {[0, 1, 2].map((item) => <div key={item} className="h-48 animate-pulse rounded-lg border border-border bg-muted/40" />)}
        </div>}

        {isError && !isLoading && <p role="status" className="rounded-lg border border-border bg-muted/30 p-5 text-sm text-muted-foreground">Ahora no se pudo cargar el resumen. <Link to="/noticias" className="font-semibold text-primary underline underline-offset-4">Abrir noticias</Link>.</p>}

        {!isLoading && !isError && items.length === 0 && <p className="rounded-lg border border-border bg-muted/30 p-5 text-sm text-muted-foreground">No hay titulares disponibles en este momento.</p>}

        {!isLoading && !isError && items.length > 0 && <div className="grid gap-4 md:grid-cols-3">
          <article className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-lg border border-primary/30 bg-navy p-6 text-white md:col-span-2 md:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70" style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(245,158,11,0.22), transparent 68%)" }} />
            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-300">
                <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 font-semibold text-warning">Destacada</span>
                <span className="font-semibold text-white">{items[0].source}</span>
                <time dateTime={items[0].publishedAt}>{fechaNoticia(items[0].publishedAt)}</time>
              </div>
              <h3 className="max-w-3xl font-serif text-2xl font-medium leading-tight md:text-3xl">{items[0].title}</h3>
              {items[0].excerpt && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 line-clamp-3">{items[0].excerpt}</p>}
            </div>
            <a href={items[0].link} target="_blank" rel="noopener noreferrer" className="relative mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-warning underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning">
              Leer en {items[0].source} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>

          <div className="grid gap-4 md:col-span-1">
            {items.slice(1).map((item) => <article key={item.link} className="flex min-h-40 flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 dark:bg-card-dark">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-warning">{item.source}</span><span aria-hidden="true">·</span><time dateTime={item.publishedAt}>{fechaNoticia(item.publishedAt)}</time>
                </div>
                <h3 className="line-clamp-3 text-base font-semibold leading-snug">{item.title}</h3>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Leer nota <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>)}
          </div>
        </div>}

        {data?.generatedAt && <p className="mt-4 text-xs text-muted-foreground">Feed actualizado {fechaNoticia(data.generatedAt, true)}.</p>}
      </div>
    </AnimatedSection>
  );
}
// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header, Footer } from "@/components/Header";
import { useState } from "react";
import { ArrowUpRight, Newspaper, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/noticias")({
  component: NoticiasPage,
  head: () => ({
    meta: [
      { title: "Noticias de Criptomonedas al día | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content:
          "Resumen diario de noticias de Bitcoin, blockchain, DeFi y criptomonedas. Educación segura, estrategia clara y sin humo.",
      },
      { name: "keywords", content: "noticias bitcoin, noticias cripto, blockchain, criptomonedas hoy, resumen diario cripto" },
      { property: "og:title", content: "Noticias de Criptomonedas al día | Aprendamos de Criptomonedas" },
      {
        property: "og:description",
        content:
          "Resumen diario de noticias de Bitcoin, blockchain, DeFi y criptomonedas. Actualizado automáticamente todos los días.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

interface NewsItem {
  title: string;
  source: string;
  link: string;
  publishedAt: string;
  excerpt: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function NoticiasPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/data/news.json");
      if (!res.ok) throw new Error("No se pudo cargar las noticias");
      return (await res.json()) as { generatedAt: string; items: NewsItem[] };
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Actualización diaria
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Noticias del mundo cripto
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Resumen curado de Bitcoin, blockchain, DeFi y regulación, renovado cada
            día de forma automática. Lee, aprende y seguí el mercado sin humo.
          </p>
          {data?.generatedAt && (
            <p className="text-xs text-muted-foreground mt-4">
              Última actualización: {formatDateTime(data.generatedAt)}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto mb-6 flex items-center justify-end gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refrescar
          </button>
        </div>

        {isLoading && (
          <div className="max-w-3xl mx-auto space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border p-6 animate-pulse bg-muted/40">
                <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-muted-foreground mb-4">
              No se pudo cargar el resumen de noticias ahora mismo.
            </p>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Reintentar
            </button>
          </div>
        )}

        {data && !isLoading && data.items.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-muted-foreground">No hay noticias disponibles.</p>
          </div>
        )}

        {data && !isLoading && data.items.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            {data.items.map((item, idx) => (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="font-semibold text-amber-700 dark:text-amber-300">{item.source}</span>
                    <span>·</span>
                    <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                    {idx === 0 && (
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Primera plana
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-primary line-clamp-2">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">
                    Leer nota <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-12 rounded-lg border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            ¿Querés entender el contexto detrás de estas noticias?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Ver el plan educativo
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium"
            >
              Ir al blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
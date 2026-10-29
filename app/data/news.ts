export interface NewsItem {
  title: string;
  source: string;
  link: string;
  publishedAt: string;
  excerpt: string;
}

export interface NewsFeed {
  generatedAt: string;
  items: NewsItem[];
}

export async function cargarNoticias(): Promise<NewsFeed> {
  const response = await fetch("/data/news.json");
  if (!response.ok) throw new Error("No se pudieron cargar las noticias");
  const feed = (await response.json()) as NewsFeed;
  if (!Array.isArray(feed.items)) throw new Error("Formato de noticias no válido");
  return feed;
}

export function fechaNoticia(value: string, includeTime = false): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", includeTime
    ? { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "2-digit", month: "short", year: "numeric" },
  ).format(date);
}
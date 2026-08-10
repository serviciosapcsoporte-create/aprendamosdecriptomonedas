// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/posts";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | Aprendamos de Criptomonedas" },
      {
        name: "description",
        content: "Artículos sobre criptomonedas, blockchain, trading y seguridad. Educación sin humo.",
      },
    ],
  }),
});

function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground">
            Reflexiones, análisis y lecciones sobre el mundo cripto — sin humo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block"
            >
              <div className="flex flex-col h-full bg-card rounded-lg border overflow-hidden transition-transform group-hover:-translate-y-1">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{post.summary}</p>
                  <span className="text-sm font-medium text-primary mt-auto flex items-center gap-1">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

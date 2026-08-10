// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { findPost } from "@/data/posts";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$postId")({
  component: PostPage,
  head: ({ params }) => {
    const post = findPost(params.postId);
    if (!post) return { meta: [{ title: "Post no encontrado | Aprendamos de Criptomonedas" }] };
    return {
      meta: [
        { title: `${post.title} | Blog | Aprendamos de Criptomonedas` },
        { name: "description", content: post.summary },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: `https://aprendamosdecriptomonedas.lat${post.image}` },
      ],
    };
  },
});

function PostPage({ params }: { params: { postId: string } }) {
  const post = findPost(params.postId);

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Post no encontrado</h1>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← Volver al blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        <article>
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg border mb-8"
            loading="eager"
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{post.dateLabel}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-10">{post.summary}</p>

          <div className="space-y-8">
            {post.sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-lg leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
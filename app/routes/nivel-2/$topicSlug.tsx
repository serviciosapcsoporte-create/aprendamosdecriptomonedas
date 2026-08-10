// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { Markdown } from "@/components/Markdown";

const levelMap: Record<string, string> = {
  "1": "principiante",
  "2": "intermedio",
  "3": "avanzado",
  "4": "experto",
  "5": "especializaciones",
};

const badgeMap: Record<string, { text: string; class: string }> = {
  free: { text: "GRATIS", class: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300" },
  register: { text: "REGISTRO", class: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300" },
  paid: { text: "PREMIUM", class: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300" },
};

export const Route = createFileRoute("/nivel-2/$topicSlug")({
  component: TopicPage,
  head: ({ params }) => {
    const topic = findTopic(params.topicSlug as string, "2");
    if (!topic) return { meta: [{ title: "Tema no encontrado" }] };
    return {
      meta: [
        { title: `${topic.title} | NIVEL 2 | Aprendamos de Criptomonedas` },
        { name: "description", content: topic.description + " " + (topic.keywords ? topic.keywords.join(", ") : "") },
        { name: "keywords", content: topic.keywords.join(", ") },
      ],
    };
  },
});

function findTopic(slug: string, level: string) {
  const levelData = curriculumData[`nivel-${level}`];
  if (!levelData) return undefined;
  for (const section of levelData.sections) {
    const topic = section.topics.find((t) => t.slug === slug);
    if (topic) return topic;
  }
  return undefined;
}

function TopicPage({ params }: { params: { topicSlug: string } }) {
  const level = "2";
  const topic = findTopic(params.topicSlug, level);
  const levelPrefix = `nivel-${level}`;
  const suffix = levelMap[level];

  if (!topic) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Tema no encontrado</h1>
          <Link to={`/${levelPrefix}-${suffix}`}>Volver a Nivel {level}</Link>
        </main>
        <Footer />
      </>
    );
  }

  const prevTopic = getPrevTopic(topic);
  const nextTopic = getNextTopic(topic);
  const badge = badgeMap[topic.badge || "free"];

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <nav className="mb-8 flex items-center justify-between">
          <Link to={`/${levelPrefix}-${suffix}`} className="text-sm text-muted-foreground hover:text-foreground">
            Volver a Nivel {level}
          </Link>
          {topic.badge && (
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.class}`}>
              {badge.text}
            </span>
          )}
        </nav>

        <article className="prose dark:prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              {topic.icon}
            </div>
            <h1 className="text-3xl font-bold mb-0">{topic.title}</h1>
          </div>

          {topic.resources && (
            <div className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-900/30">
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">Recursos descargables</h3>
              <ul className="space-y-1">
                {topic.resources.map((resource) => (
                  <li key={resource.href}>
                    <a href={resource.href} className="text-sm text-amber-700 dark:text-amber-300 hover:underline" download>
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.keywords && topic.keywords.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Temas relacionados: {topic.keywords.join(", ")}</p>
            </div>
          )}

          <div className="mb-8">
            <Markdown content={topic.content} />
          </div>

          {topic.related && topic.related.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Temas relacionados</h3>
              <div className="flex flex-wrap gap-2">
                {topic.related.map((slug) => {
                  const relatedTopic = findTopicBySlug(slug, level);
                  return relatedTopic ? (
                    <Link key={slug} to={`/${levelPrefix}/${slug}`}
                      className="inline-flex items-center px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors">
                      {relatedTopic.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </article>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between p-6 bg-card rounded-lg border">
          {prevTopic && (
            <Link to={`/${levelPrefix}/${prevTopic.slug}`}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
              Anterior: {prevTopic.title}
            </Link>
          )}
          {nextTopic && (
            <Link to={`/${levelPrefix}/${nextTopic.slug}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Siguiente: {nextTopic.title}
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function findTopicBySlug(slug: string, level: string) {
  const levelData = curriculumData[`nivel-${level}`];
  if (!levelData) return undefined;
  for (const section of levelData.sections) {
    const topic = section.topics.find((t) => t.slug === slug);
    if (topic) return topic;
  }
  return undefined;
}

function getPrevTopic(topic: any) {
  const levelData = curriculumData[`nivel-${topic.level}`];
  let prev = null;
  for (const section of levelData.sections) {
    for (const t of section.topics) {
      if (t.id === topic.id) return prev;
      prev = t;
    }
  }
  return null;
}

function getNextTopic(topic: any) {
  const levelData = curriculumData[`nivel-${topic.level}`];
  let found = false;
  for (const section of levelData.sections) {
    for (const t of section.topics) {
      if (found) return t;
      if (t.id === topic.id) found = true;
    }
  }
  return null;
}

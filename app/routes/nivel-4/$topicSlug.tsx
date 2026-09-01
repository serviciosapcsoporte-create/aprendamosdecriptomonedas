// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { Markdown } from "@/components/Markdown";
import { Header, Footer } from "@/components/Header";

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

export const Route = createFileRoute("/nivel-4/$topicSlug")({
  component: TopicPage,
  head: ({ params }) => {
    const topic = findTopic(params.topicSlug as string, "4");
    if (!topic) return { meta: [{ title: "Tema no encontrado" }] };
    const metaDesc = topic.description.substring(0, 155) + "...";
    return {
      meta: [
        { title: `${topic.title} | NIVEL 4 | Aprendamos de Criptomonedas` },
        { name: "description", content: metaDesc },
        { name: "keywords", content: topic.keywords?.join(", ") || "" },
        { property: "og:title", content: topic.title },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: topic.title },
        { name: "twitter:description", content: metaDesc },
        {
          "@type": "TechArticle",
          "headline": topic.title,
          "description": metaDesc,
          "author": { "@type": "Organization", "name": "Aprendamos de Criptomonedas" },
        },
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

function TopicPage() {
  const { topicSlug } = Route.useParams();
  const level = "4";
  const topic = findTopic(topicSlug, level);
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

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <AnimatedSection animation="fade-in-up" delay={0.1}>
          <nav className="mb-8 flex items-center justify-between">
            <Link to={`/${levelPrefix}-${suffix}`} className="text-sm text-muted-foreground hover:text-foreground">
              Volver a Nivel {level}
            </Link>
            <span className={badgeMap["free"].class}>
              {badgeMap["free"].text}
            </span>
          </nav>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <article className="prose dark:prose-invert max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[var(--primary)] dark:bg-[var(--primary-dark)] rounded-lg">
                {topic.icon}
              </div>
              <ElegantHeading as="h1" className="mb-0 text-[var(--heading-text-size)]">
                {topic.title}
              </ElegantHeading>
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
            })

            {topic.keywords && topic.keywords.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground">Temas relacionados: {topic.keywords.join(", ")}</p>
              </div>
            })

            <AnimatedSection animation="fade-in-up" delay={0.3}>
              <div className="mb-8">
                <Markdown content={topic.content} />
              </div>
            </AnimatedSection>
          </article>
        </AnimatedSection>
        </AnimatedSection>

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
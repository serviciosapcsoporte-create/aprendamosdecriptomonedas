// @ts-nocheck
/**
 * Plantilla de leccion: SOLO metadatos y datos.
 *
 * El diseño vive en app/components/LeccionLayout.tsx y lo comparten las cinco
 * rutas (nivel-1 a nivel-5). Antes cada una llevaba una copia del markup y
 * cualquier ajuste se aplicaba a una y se olvidaba de las demas: por eso los
 * niveles se veian distintos entre si.
 */
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LeccionLayout } from "@/components/LeccionLayout";
import { LeccionL2Rollups } from "@/components/LeccionL2Rollups";
import { LeccionZkRollups } from "@/components/LeccionZkRollups";
import { LeccionDexAvanzados } from "@/components/LeccionDexAvanzados";
import { LeccionDerivados } from "@/components/LeccionDerivados";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { registrarEnCurso } from "@/lib/progreso";
import { canonical, OG_IMAGE, jsonLd, articleLd, breadcrumbLd, clampDesc } from "@/lib/seo";

const NIVEL = "4";
const SUFIJO = "experto";
const TITULO = "Nivel 4 · Experto";

export const Route = createFileRoute("/nivel-4/$topicSlug")({
  component: TopicPage,
  head: ({ params }) => {
    const path = `/nivel-4/${params.topicSlug}`;
    const topic = buscarTema(params.topicSlug as string, NIVEL);
    if (!topic) {
      return { title: "Tema no encontrado | Aprendamos de Criptomonedas" };
    }
    const metaDesc = clampDesc(topic.description);
    return {
      title: `${topic.title} | ${TITULO} | Aprendamos de Criptomonedas`,
      meta: [
        { name: "description", content: metaDesc },
        { property: "og:title", content: topic.title },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical(path) },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: topic.title },
        { name: "twitter:description", content: metaDesc },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      scripts: [
        jsonLd(
          articleLd({ headline: topic.title, description: metaDesc, path }),
          breadcrumbLd([
            { name: "Inicio", path: "/" },
            { name: TITULO, path: `/nivel-${NIVEL}-${SUFIJO}` },
            { name: topic.title, path },
          ]),
        ),
      ],
    };
  },
});

function buscarTema(slug: string, nivel: string) {
  const datos = curriculumData[`nivel-${nivel}`];
  if (!datos) return undefined;
  for (const seccion of datos.sections) {
    const tema = seccion.topics.find((t) => t.slug === slug);
    if (tema) return tema;
  }
  return undefined;
}

/** Tema del nivel ordenados como se leen, para anterior y siguiente. */
function todosLosTemas(nivel: string) {
  return curriculumData[`nivel-${nivel}`].sections.flatMap((s) => s.topics);
}

function TopicPage() {
  const { topicSlug } = Route.useParams();
  const topic = buscarTema(topicSlug, NIVEL);

  // Antes del return temprano: React exige el mismo numero de hooks en cada
  // render, y el caso "tema no encontrado" tambien los ejecuta.
  const clave = topic ? `nivel-${NIVEL}/${topic.slug}` : "";
  useEffect(() => {
    if (clave) registrarEnCurso(clave);
  }, [clave]);

  if (!topic) {
    return (
      <>
        <Header />
        <main id="contenido" tabIndex={-1} className="flex-1 container mx-auto px-4 py-12">
          <h1 className="mb-4 text-2xl font-bold">Tema no encontrado</h1>
          <Link to={`/nivel-${NIVEL}-${SUFIJO}`}>Volver a Nivel {NIVEL}</Link>
        </main>
        <Footer />
      </>
    );
  }

  const lista = todosLosTemas(NIVEL);
  const i = lista.findIndex((t) => t.id === topic.id);
  const anterior = i > 0 ? lista[i - 1] : null;
  const siguiente = i >= 0 && i < lista.length - 1 ? lista[i + 1] : null;

if (topic.slug === "arbitrum-optimism-layer-2") {
    return (
      <LeccionL2Rollups
        topic={topic}
        anterior={anterior}
        siguiente={siguiente}
      />
    );
  }

if (topic.slug === "zk-rollups-starknet-zksync") {
    return (
      <LeccionZkRollups
        topic={topic}
        anterior={anterior}
        siguiente={siguiente}
      />
    );
  }

if (topic.slug === "dex-avanzados-gamma-swap") {
    return (
      <LeccionDexAvanzados
        topic={topic}
        anterior={anterior}
        siguiente={siguiente}
      />
    );
  }

if (topic.slug === "derivados-futures-y-opciones") {
    return (
      <LeccionDerivados
        topic={topic}
        anterior={anterior}
        siguiente={siguiente}
      />
    );
  }

  return (
    <LeccionLayout
      nivel={NIVEL}
      topic={topic}
      anterior={anterior}
      siguiente={siguiente}
      resolverRelacionado={(slug) => buscarTema(slug, NIVEL) ?? null}
    />
  );
}
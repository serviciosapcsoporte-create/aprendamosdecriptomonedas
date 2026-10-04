import { OPERATOR, FACEBOOK, TELEGRAM } from "@/lib/legal";

export const SITE_URL = "https://aprendamosdecriptomonedas.lat";
export const BRAND = "Aprendamos de Criptomonedas";

/** Único dato personal publicado: nombre editorial del autor. */
export const AUTHOR = "Alejandro Piraquive";

/** Canonical absoluto. Las rutas dinamicas reciben el slug ya resuelto. */
export function canonical(path: string = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean === "/" ? "/" : clean.replace(/\/$/, "");
  return `${SITE_URL}${withSlash}`;
}

/**
 * Recorta una description a 150-160 caracteres sin partir a mitad de palabra.
 * Antes las rutas de nivel concatenaban la description con el campo keywords:
 * eso es keyword stuffing en el snippet y produce textos que nadie lee.
 */
export function clampDesc(text: string, max = 158): string {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + "…";
}

export const OG_IMAGE = `${SITE_URL}/social-card.png`;

/** Metadatos de la home reutilizados por __root. */
export const SITE_DESCRIPTION =
  "Educación segura, estrategia clara y sin humo. Guías, checklists y recursos para entender el mundo cripto y proteger tu dinero.";

/**
 * Genera un nodo BreadcrumbList. Éste sí es el único schema de la lista que hoy produce rich result real en Google.
 * Los items se pasan del más específico al más general y el último no lleva item.
 */
export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
  image: { "@id": `${SITE_URL}/#organization-logo` },
  description: SITE_DESCRIPTION,
  founder: { "@id": `${SITE_URL}/#alejandro` },
  parentOrganization: {
    "@type": "Organization",
    name: OPERATOR,
    url: "https://serviciosapc.site/",
  },
  knowsLanguage: "es-419",
  areaServed: { "@type": "Country", name: "Colombia" },
  // Sin contactPoint: no se publica ningún teléfono ni correo personal.
  // Los canales públicos de la marca van en sameAs (Facebook y Telegram).
  sameAs: [
    FACEBOOK,
    TELEGRAM,
    "https://apcautomatizacion.site/",
    "https://apccore.site/",
    "https://apcvisionai.site/",
    "https://serviciosapc.site/",
    "https://dogweb.lat/",
  ],
};

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#alejandro`,
  name: AUTHOR,
  jobTitle: "Fundador y autor",
  url: `${SITE_URL}/acerca-de`,
  image: `${SITE_URL}/alejandro.svg`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  knowsLanguage: "es-419",
  knowsAbout: [
    "Criptomonedas",
    "Blockchain",
    "Autocustodia",
    "Contratos inteligentes",
    "Finanzas descentralizadas",
    "Educación financiera",
  ],
};

export const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND,
  inLanguage: "es-419",
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/**
 * Article para lecciones y posts. author debe ser un Person para que Google
 * pueda atribuir la firma; Organization sola no basta en contenido firmado.
 */
export function articleLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage: "es-419",
    url: canonical(opts.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical(opts.path) },
    image: opts.image ?? [OG_IMAGE],
    author: { "@id": `${SITE_URL}/#alejandro` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
  };
}

/** Course para las paginas de nivel (no para cada leccion). */
export function courseLd(opts: {
  name: string;
  description: string;
  path: string;
  level?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${canonical(opts.path)}#course`,
    name: opts.name,
    description: opts.description,
    inLanguage: "es-419",
    url: canonical(opts.path),
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(opts.level ? { educationalLevel: opts.level } : {}),
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT10H",
      instructor: { "@id": `${SITE_URL}/#alejandro` },
    },
  };
}

/**
 * Serializa nodos JSON-LD. Antes se empujaban dentro del array `meta`, que
 * TanStack renderiza como <meta> y no como <script type="application/ld+json">:
 * por eso el sitio no tenia ni un solo dato estructurado valido.
 */
export function jsonLd(...nodes: unknown[]) {
  const payload = nodes.length === 1 ? nodes[0] : nodes;
  return {
    type: "application/ld+json",
    children: JSON.stringify(payload),
  };
}

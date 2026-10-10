// @ts-nocheck
/* Landing convertida en embudo de captacion con SAM como marco: lo minimo
   publicable ya esta, y cada bloque se itera con lo que digan los datos.
   - Hero con el H1 del brief sobre video de fondo full-bleed (moneda 3D girando)
   - Lead magnet de CSV con captura opcional (ver app/lib/leads.ts)
   - Ruta de 5 niveles con los conteos que salen de app/data, no escritos a mano
   - Recursos y FAQ
   NO se bloquea ninguna leccion: los 76 temas siguen siendo libres. La captura
   sirve para remarketing, no paraycobrar acceso a lo que ya era abierto.

   Los recursos 3D (video del hero, mockup del lead magnet, insignias de nivel
   y banners 16:9) viven en public/assets/3d/ y se declaran en
   app/data/assets3d.ts: cambiar de archivo es cambiar una constante. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { HeroVideo } from "@/components/HeroVideo";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import {
  CONFIANZA,
  NIVEL_ICON,
  NIVEL_ICON_ALT,
  RECURSOS_3D,
} from "@/data/assets3d";
import { canonical, OG_IMAGE } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Aprendamos de Criptomonedas | Educación cripto sin humo",
    meta: [
      {
        name: "description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists, plantillas CSV y 76 lecciones en 5 niveles para entender el mundo cripto y proteger tu dinero. Totalmente gratis, sin registro.",
      },
      { name: "author", content: "Alejandro Piraquive" },
      { property: "og:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      {
        property: "og:description",
        content:
          "Educación segura, estrategia clara y sin humo. Guías, checklists, plantillas CSV y 76 lecciones en 5 niveles para entender el mundo cripto y proteger tu dinero. Totalmente gratis, sin registro.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/") },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aprendamos de Criptomonedas" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aprendamos de Criptomonedas | Educación cripto sin humo" },
      {
        name: "twitter:description",
        content:
          "76 lecciones en 5 niveles, guías y plantillas CSV. Gratis, sin registro y sin promesas.",
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    ],
    links: [{ rel: "canonical", href: canonical("/") }],
  }),
});

/**
 * Los conteos y las etiquetas salen de los datos, no de un numero escrito a
 * mano. Cuando se anadio la leccion de DeFi la home seguia diciendo 18 temas en
 * el Nivel 2, y las etiquetas del menu vivian duplicadas en un mapa aparte: la
 * home llegaba a decir "Gratis" en el Nivel 3 mientras la navegacion decia
 * "Registro". Ahora las dos leen curriculum.ts y no pueden discrepar.
 *
 * OJO sobre las etiquetas: hoy NINGUN nivel esta bloqueado. `register` y `paid`
 * marcan la planificacion futura, no un muro de pago.
 */
const ETIQUETA: Record<string, string> = {
  free: "Gratis",
  register: "Registro",
  paid: "Premium",
};

function nivelesConConteo() {
  const orden = ["1", "2", "3", "4", "5"];
  const desc: Record<string, string> = {
    "1": "Fundamentos, wallets y seguridad inicial",
    "2": "Blockchain técnica, smart contracts y DeFi básico",
    "3": "Trading, cross-chain y análisis on-chain",
    "4": "ZK-tech, custodia institucional y bots de arbitraje",
    "5": "Programación ZK, StarkNet/Cairo y regulación",
  };
  return orden.map((n) => {
    const datos = curriculumData[`nivel-${n}`];
    const temas = datos ? datos.sections.reduce((t, s) => t + s.topics.length, 0) : 0;
    return {
      n,
      href: datos?.href ?? `/nivel-${n}`,
      titulo: datos ? `${datos.number} — ${datos.title}` : `Nivel ${n}`,
      desc: desc[n] ?? datos?.subtitle ?? "",
      temas,
      etiqueta: ETIQUETA[datos?.badge ?? "free"],
      icon: NIVEL_ICON[n],
      iconAlt: NIVEL_ICON_ALT[n],
    };
  });
}

const FAQ = [
  {
    q: "¿Necesito conocimientos de programación para analizar archivos CSV cripto?",
    a: "No. Los CSV están hechos para abrirse con doble clic y leerse en Excel o Numbers; el separador ya está ajustado al español y las fórmulas viene explicadas en la propia columna. Si sabes algo de Python o de hojas de cálculo, puedes automatizarlo, pero no es un requisito.",
  },
  {
    q: "¿Cómo obtengo acceso a los niveles Premium (4 y 5)?",
    a: "Ya lo tienes: los cinco niveles, el 4 y el 5 incluidos, se leen completos y hoy son gratis. Las etiquetas «Registro» y «Premium» del menú marcan la planificación futura, no un bloqueo: todavía no hay nada detrás de un muro de pago. Cuando abramos el plan por suscripción lo anunciaremos aquí y en el newsletter, con precio y fecha antes de cobrar nada.",
  },
  {
    q: "¿Los CSV que descargas tienen datos reales de mercado?",
    a: "No, y es deliberado. Son plantillas con su esquema y un ejemplo marcado como ejemplo. Un CSV con precios inventados se usaría para decidir y las decisiones salen caras: lo que te sirve es la estructura, rellenada con los datos de tu propia wallet.",
  },
  {
    q: "¿El contenido es asesoría financiera?",
    a: "No. Es educación. Explicamos cómo funcionan las cosas y qué riesgos tienen, y en ningún punto te decimos qué comprar. Al terminar los cinco niveles sabrás evaluar mejor que antes, y esa es toda la promesa.",
  },
  {
    q: "¿Por qué no hay registro para leer las lecciones?",
    a: "Porque una lección que hay que dejar el correo para leer no se lee. Las 76 son públicas y sin registro; el correo solo se pide si quieres que te mandemos las plantillas CSV.",
  },
];

// ---------------------------------------------------------------------------
function FAQSection() {
  return (
    <section aria-labelledby="faq-titulo" className="relative z-10 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <ElegantHeading
          as="h2"
          id="faq-titulo"
          className="mb-8 text-[length:var(--heading-text-size)]"
        >
          Preguntas frecuentes sobre la formación y los datasets CSV
        </ElegantHeading>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg border border-border bg-card dark:bg-card-dark"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-bold">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="faq-answer px-5 pb-5 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
function Index() {
  const niveles = nivelesConConteo();
  const totalTemas = niveles.reduce((t, n) => t + n.temas, 0);

  return (
    <>
      <Header />

      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        {/* 1. HERO — video de fondo full-bleed (capas: video z-0, velo z-10,
            contenido z-20). Sin mascara circular ni columna adyacente.

            El render de la moneda la tiene en el tercio IZQUIERDO del
            fotograma, asi que el velo es un degradado (fuerte a la derecha) y
            el texto vive en la mitad derecha en escritorio: la moneda se ve
            entera y el texto sigue teniendo contraste. En movil el recorte es
            vertical y el texto ocupa todo el ancho, por eso ahi el velo es plano. */}
        <AnimatedSection
          animation="fade-in-up"
          delay={0}
          className="relative z-10 flex min-h-[85vh] items-center overflow-hidden bg-slate-950 py-0 md:py-0 lg:py-0"
        >
          {/* 1.1 Video de fondo: cubre toda la seccion, sin bordes */}
          <HeroVideo />

          {/* 1.2 Velo de contraste */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-slate-950/80 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 hidden lg:block"
            style={{
              background:
                "linear-gradient(100deg, rgba(8,13,28,0.30) 0%, rgba(8,13,28,0.52) 38%, rgba(8,13,28,0.86) 62%, rgba(8,13,28,0.96) 100%)",
            }}
          />
          {/* Transicion hacia la seccion clara de abajo */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-background"
          />

          {/* 1.3 Contenido flotante */}
          <div className="relative z-20 mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
            <div className="lg:ml-auto lg:max-w-[38rem]">
              <ElegantHeading
                as="h1"
                className="mb-6 text-white text-[length:var(--heading-text-size)] sm:text-[length:var(--heading-text-size-md)] md:text-[length:var(--heading-text-size-md)]"
              >
                Tu ruta de aprendizaje paso a paso desde{" "}
                <span className="italic">conceptos básicos</span> hasta{" "}
                <span className="italic">análisis on-chain avanzado</span>
              </ElegantHeading>

              <p className="mb-8 text-lg text-slate-300">
                Domina criptomonedas, blockchain, DeFi y seguridad con {totalTemas}{" "}
                temas en 5 niveles progresivos. Sin influencers, sin promesas,
                solo educación real.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#recursos-csv"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
                >
                  Empezar Gratis — Nivel 1
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-slate-950/60 px-7 py-3 text-base font-medium text-white backdrop-blur transition-colors hover:border-primary hover:text-primary"
                >
                  Ver la ruta de 5 niveles
                </a>
              </div>

              <p className="mt-6 text-sm text-slate-300/90">
                Las {totalTemas} lecciones son públicas y sin registro. Empieza
                por el{" "}
                <Link to="/nivel-1-principiante" className="underline underline-offset-4">
                  Nivel 1
                </Link>{" "}
                o descarga las plantillas de abajo.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 2. LEAD MAGNET — formulario a la izquierda, mockup 3D a la derecha */}
        <LeadMagnet />

        {/* 3. RUTA DE FORMACION — banda navy con los 5 iconos 3D. El fondo de
            cada icono esta remapeado al valor exacto de --navy, por eso las
            tarjetas van en bg-navy: el recorte del pliego no se ve. */}
        <AnimatedSection
          animation="fade-in-up"
          className="relative z-10 scroll-mt-24 bg-navy text-white"
          id="curriculum"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% 0%, rgba(249,115,22,0.18), transparent 70%)",
            }}
          />
          <div className="container relative mx-auto max-w-6xl px-4 py-16 md:py-20">
            <ElegantHeading
              as="h2"
              className="mb-3 text-center text-white text-[length:var(--heading-text-size)]"
            >
              Elige tu nivel de formación para empezar
            </ElegantHeading>
            <p className="mx-auto mb-12 max-w-2xl text-center text-slate-300">
              Cinco niveles ordenados. Cada tarjeta lleva su icono 3D y el número
              real de temas, leído de los datos del curso.
            </p>

            {/* 3 + 2: los tres primeros niveles en una fila de tres, los dos
                últimos (los más densos) ocupan dos columnas cada uno. */}
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {niveles.map((nivel, i) => (
                <li key={nivel.href} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                  <Link
                    to={nivel.href}
                    className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-navy p-6 text-center transition-colors hover:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <img
                      src={nivel.icon}
                      alt={nivel.iconAlt}
                      className="mb-4 h-28 w-28 transition-transform duration-500 group-hover:scale-105 md:h-32 md:w-32"
                      loading="lazy"
                      decoding="async"
                      width={489}
                      height={489}
                    />
                    <span className="mb-3 inline-flex items-center rounded-full border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {nivel.etiqueta}
                    </span>
                    <ElegantHeading
                      as="h3"
                      className="mb-2 text-white text-[length:var(--heading-text-size-sm)]"
                    >
                      {nivel.titulo}
                    </ElegantHeading>
                    <p className="text-sm text-slate-300">{nivel.desc}</p>
                    <span className="mt-auto flex w-full items-center justify-between border-t border-white/10 pt-4 text-sm">
                      <span className="text-slate-400">
                        {nivel.temas} {nivel.temas === 1 ? "tema" : "temas"}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        Ver nivel
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>

        {/* 4. RECURSOS Y BLOG — grid 16:9 con los banners 3D de analitica y
            tablas CSV. */}
        <AnimatedSection animation="fade-in-up" className="relative z-10" id="recursos">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
            <ElegantHeading
              as="h2"
              className="mb-3 text-center text-[length:var(--heading-text-size)]"
            >
              Recursos descargables en CSV y plantillas prácticas
            </ElegantHeading>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              Esquemas listos para auditorías, seguimiento de wallets y métricas
              de red. Más las guías en PDF de los niveles 3, 4 y 5.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {RECURSOS_3D.map((recurso) => (
                <Link
                  key={recurso.titulo}
                  to={recurso.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-card-dark"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={recurso.imagen}
                      alt={recurso.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={900}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                      {recurso.etiqueta}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-lg font-bold">{recurso.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{recurso.texto}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
                      Abrir
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/recursos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-earth-500 px-6 py-3 text-base font-semibold text-earth-950 transition-colors hover:bg-earth-400"
              >
                Explorar todos los recursos
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-base font-medium text-muted-foreground transition-colors hover:border-primary"
              >
                Leer el blog
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Social Proof / Prueba Social */}
        <AnimatedSection animation="fade-in-up" className="relative z-10 scroll-mt-24">
          <div className="container mx-auto max-w-6xl px-4 py-16">
            <ElegantHeading
              as="h2"
              className="mb-8 text-[length:var(--heading-text-size)] text-center"
            >
              Confianza respaldada por la comunidad
            </ElegantHeading>
            <p className="mb-12 max-w-2xl mx-auto text-center text-muted-foreground">
              No vendemos humo: enseñamos con datos reales, plantillas abiertas y
              contenido verificable. Esto es lo que sostengo cuando digo
              &laquo;educación real&raquo;.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {CONFIANZA.map((c) => (
                <div
                  key={c.titulo}
                  className="overflow-hidden rounded-2xl border border-border bg-card text-center dark:bg-card-dark"
                >
                  <img
                    src={c.imagen}
                    alt={c.alt}
                    className="mb-4 aspect-square w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                  />
                  <div className="px-6 pb-8">
                    <h3 className="mb-2 text-lg font-bold">{c.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{c.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 5. FAQ */}
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
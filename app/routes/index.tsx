// @ts-nocheck
/* Landing convertida en embudo de captacion con SAM como marco: lo minimo
   publicable ya esta, y cada bloque se itera con lo que digan los datos.
   - Hero con el H1 del brief sobre video de fondo full-bleed (moneda giratoria)
   - Lead magnet de CSV con captura opcional (ver app/lib/leads.ts)
   - Ruta de 5 niveles con los conteos que salen de app/data, no escritos a mano
   - Recursos y FAQ
   NO se bloquea ninguna leccion: los 76 temas siguen siendo libres. La captura
   sirve para remarketing, no paraycobrar acceso a lo que ya era abierto. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ElegantHeading } from "@/components/ElegantHeading";
import { HeroVideo } from "@/components/HeroVideo";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Header, Footer } from "@/components/Header";
import { curriculumData } from "@/data/curriculum";
import { canonical, OG_IMAGE } from "@/lib/seo";

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
              <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
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
            contenido z-20). Sin mascara circular ni columna adyacente. */}
        <AnimatedSection
          animation="fade-in-up"
          delay={0}
          className="relative z-10 flex min-h-[85vh] items-center overflow-hidden bg-slate-950 py-0 md:py-0 lg:py-0"
        >
          {/* 1.1 Video de fondo: cubre toda la seccion, sin bordes */}
          <HeroVideo />

          {/* 1.2 Velo oscuro: contraste del texto blanco sobre el video */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-[1px]"
          />

          {/* 1.3 Contenido flotante */}
          <div className="relative z-20 mx-auto w-full max-w-4xl px-6 py-20">
            <ElegantHeading
              as="h1"
              className="mb-6 text-white text-[length:var(--heading-text-size)] sm:text-[length:var(--heading-text-size-md)] md:text-[length:var(--heading-text-size-md)]"
            >
              Tu ruta de aprendizaje paso a paso desde{" "}
              <span className="italic">conceptos básicos</span> hasta{" "}
              <span className="italic">análisis on-chain avanzado</span>
            </ElegantHeading>

            <p className="mb-8 max-w-2xl text-lg text-slate-300">
              Domina criptomonedas, blockchain, DeFi y seguridad con {totalTemas}{" "}
              temas en 5 niveles progresivos. Sin influencers, sin promesas,
              solo educación real.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#recursos-csv"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Empezar Gratis — Nivel 1
              </a>
              <a
                href="#recursos-csv"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-base font-medium text-slate-200 transition-colors hover:border-white hover:text-white"
              >
                Ver Temario y Recursos CSV
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
        </AnimatedSection>

        {/* 2. LEAD MAGNET */}
        <LeadMagnet />

        {/* 3. RUTA DE FORMACION */}
        <AnimatedSection animation="fade-in-up" delay={0.2} className="relative z-10 scroll-mt-24" id="curriculum">
          <div className="container mx-auto max-w-6xl px-4 py-16">
            <ElegantHeading
              as="h2"
              className="mb-8 text-[length:var(--heading-text-size)]"
            >
              Elige tu nivel de formación para empezar
            </ElegantHeading>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {niveles.map((nivel) => (
                <Link
                  key={nivel.href}
                  to={nivel.href}
                  className="block rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-card-dark"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                      <span className="text-sm font-bold text-white">{nivel.n}</span>
                    </div>
                    <div>
                      <ElegantHeading as="h3" className="mb-1 text-[length:var(--heading-text-size-sm)]">
                        {nivel.titulo}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({nivel.etiqueta})
                        </span>
                      </ElegantHeading>
                      <p className="text-sm text-muted-foreground">{nivel.desc}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {nivel.temas} temas
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 4. RECURSOS */}
        <AnimatedSection animation="fade-in-up" delay={0.4} className="relative z-10">
          <div className="bg-navy py-16 dark:bg-navy-dark">
            <div className="container mx-auto max-w-6xl px-4">
              <ElegantHeading
                as="h2"
                className="mb-6 text-[length:var(--heading-text-size)]"
              >
                Recursos descargables en CSV y plantillas prácticas
              </ElegantHeading>
              <h3 className="mb-4 max-w-3xl text-lg font-bold text-earth-50">
                Bases de datos en CSV para análisis cuantitativo cripto
              </h3>
              <p className="mb-8 max-w-3xl text-muted-foreground">
                Esquemas listos para auditorías, seguimiento de wallets y métricas
                de red. Más las guías en PDF de los niveles 3, 4 y 5.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/recursos"
                  className="inline-flex items-center justify-center rounded-md bg-earth-500 px-6 py-3 text-base font-medium text-earth-950 transition-colors hover:bg-earth-400"
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
          </div>
        </AnimatedSection>

        {/* 5. FAQ */}
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
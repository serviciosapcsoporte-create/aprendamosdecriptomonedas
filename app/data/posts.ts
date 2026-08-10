export interface BlogPostSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  image: string;
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "bitcoin-60k-emociones",
    title:
      "Bitcoin a los 60k: Por qué tu mayor pérdida no es el precio, sino tu gestión emocional",
    summary:
      "Vivir en esta época implica aceptar una montaña rusa de cambios. He visto altibajos y pesares que lo remueven todo, pero hay una verdad absoluta: nada es eterno. Ni el dolor, ni la tendencia.",
    date: "2026-03-28",
    dateLabel: "28/03/2026",
    image: "/blog/bitcoin-60k-emociones.svg",
    sections: [
      {
        paragraphs: [
          "Vivir en esta época implica aceptar una montaña rusa de cambios. He visto altibajos y pesares que lo remueven todo, pero hay una verdad absoluta: nada es eterno. Ni el dolor, ni la tendencia.",
          "Cuando el precio de Bitcoin toca niveles que generan euforia o pánico, el mercado técnico pasa a segundo plano. Lo que realmente decide cuánto ganas o pierdes es cómo manejas tus emociones en esos momentos.",
        ],
      },
      {
        heading: "El ruido del precio",
        paragraphs: [
          "Los 60.000 dólares son un número. Solo eso. No cambia tu estrategia, no cambia la tecnología y no cambia tus objetivos. Pero puede cambiar tu comportamiento si le das el control de tu decisión.",
          "El ruido del mercado está diseñado para activar tu miedo o tu avaricia. Si reaccionas a cada movimiento, terminas comprando cuando todos compran y vendiendo cuando todos venden. Es decir, exactamente lo contrario de lo que conviene.",
        ],
      },
      {
        heading: "Tu comportamiento importa más que el mercado",
        paragraphs: [
          "La mayor parte de las pérdidas en cripto no vienen del mercado: vienen de decisiones tomadas bajo presión emocional. Entrar sin investigación, apalancarse sin entender el riesgo o salir en pánico son errores de gestión personal, no de análisis.",
          "Aprender a separar el *precio* de tu *estrategia* es una habilidad que se entrena. Y se entrena escribiendo tus reglas antes de que el mercado las ponga a prueba.",
        ],
      },
      {
        heading: "Reglas para proteger tus emociones",
        paragraphs: [
          "1. Define tu horizonte antes de comprar. ¿Vas a mantener este activo 6 meses, 2 años o 5 años? De eso depende cómo reaccionarás a una caída del 20%.",
          "2. Decide de antemano cuánto arriesgas. Si el porcentaje está definido antes, la volatilidad no te obliga a decidir con el estómago.",
          "3. Reducí el ruido. Revisar precios cada hora convierte al corto plazo en tu dueño. Un plan escrito es más fuerte que una notificación.",
          "4. Aceptá que la emoción no dicta tu estrategia: la informa, pero no la decide.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "Nada es eterno: ni el dolor de una caída, ni la euforia de una subida. Tu ventaja real en este mercado es la disciplina. El precio se moverá; tu gestión emocional es lo único que controlas por completo.",
          "Educación, estrategia clara y sin humo. Eso es lo que hace la diferencia entre sobrevivir al ciclo y ser parte de las estadísticas.",
        ],
      },
    ],
  },
  {
    id: "aprendizaje-mercado",
    title: "El aprendizaje detrás del mercado",
    summary:
      "He estado haciendo mis propios estudios. Llevo ya un par de años detrás del mercado: analizando, observando y también construyendo mi propio yo desde adentro, para luego reflejarlo hacia afuera.",
    date: "2026-03-07",
    dateLabel: "07/03/2026",
    image: "/blog/aprendizaje-mercado.svg",
    sections: [
      {
        paragraphs: [
          "He estado haciendo mis propios estudios. Llevo ya un par de años detrás del mercado: analizando, observando y también construyendo mi propio yo desde adentro, para luego reflejarlo hacia afuera.",
          "Lo que más me sorprendió no fue la tecnología ni los números. Fue descubrir cuánto del resultado depende de procesos internos que nada tienen que ver con gráficos.",
        ],
      },
      {
        heading: "Observar antes de actuar",
        paragraphs: [
          "El mercado no pide opiniones: pide observación. Cada ciclo deja pistas —volumen, noticias, comportamiento de las personas— que se leen mejor cuando tu mente está quieta.",
          "Llevar un registro de lo que observás, sin juzgarlo, es la base de cualquier método. Primero mirás, después entendés y recién después actuás.",
        ],
      },
      {
        heading: "El reflejo interno",
        paragraphs: [
          "Analizando el mercado analizás tu propia relación con el riesgo, la incertidumbre y la paciencia. Las decisiones que evitás, los errores que repetís y las excusas que te das aparecen en pantalla más nítidas que en cualquier espejo.",
          "Construir mi propio yo desde adentro se convirtió en parte del estudio. La disciplina que aplicás a tu cartera es la misma que necesitás para cualquier proyecto sostenido.",
        ],
      },
      {
        heading: "Construir hábitos",
        paragraphs: [
          "El aprendizaje real no ocurre en un día de euforia: ocurre en la repetición. Revisar tu método, corregir sin culparte y continuar, semana tras semana, construye algo que ningún precio puede darte.",
          "Y eso se refleja hacia afuera: en cómo hablás del riesgo, en cómo educás a otros y en la serenidad con la que manejás la incertidumbre.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "El mercado es un aula sin horarios. Los que progresan no son los que predicen mejor, sino los que aprenden más rápido de sí mismos.",
          "Este es el aprendizaje detrás del mercado: no se trata solo de ganar dinero, sino de convertir cada ciclo en una versión mejor de quien decide.",
        ],
      },
    ],
  },
];

export function findPost(id: string) {
  return blogPosts.find((p) => p.id === id);
}
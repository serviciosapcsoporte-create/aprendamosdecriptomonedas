export interface BlogPostSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPostRelated {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  image: string;
  targetKeyword?: string;
  metaDescription?: string;
  related?: BlogPostRelated[];
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "detectar-estafas-cripto",
    title:
      "Cómo detectar estafas cripto: 10 señales de alarma que casi nadie revisa",
    summary:
      "Las estafas no llegan desde la oscuridad de internet: llegan por WhatsApp, anuncios publicitarios y perfiles impecables. Estas son las 10 señales que separan una oportunidad real de un robo bien presentado.",
    date: "2026-08-19",
    targetKeyword: "detectar estafas cripto",
    metaDescription: "10 señales de alarma para detectar estafas cripto: desde promesas de ganancias garantizadas hasta solicitud de llaves. Guía completa para proteger tus inversiones.",
    dateLabel: "19/08/2026",
    image: "/blog/detectar-estafas-cripto.svg",
    related: [
      { label: "Tema del curso: Cómo evitar estafas", href: "/nivel-1/evitar-estafas" },
      { label: "Guía gratis: Checklist de Supervivencia Cripto", href: "/recursos/checklist-supervivencia-cripto" },
    ],
    sections: [
      {
        paragraphs: [
          "Nadie cree que va a ser estafado hasta que lo es. El problema no es falta de inteligencia: las estafas modernas están diseñadas por equipos completos, con guiones probados y plataformas web que parecen legítimas.",
          "La buena noticia es que casi todas comparten señales de alarma. Si aprendes a detectarlas, el 90% de los fraudes se caen solos en menos de dos minutos de revisión.",
        ],
      },
      {
        heading: "Las primeras 5 señales (las más obvias)",
        paragraphs: [
          "1. Rentabilidad garantizada. Ninguna inversión real garantiza rendimientos. Cuando escuches 'ganancias fijas del 2% diario' o 'riesgo cero', ya terminó la conversación: es fraude.",
          "2. Presión para actuar rápido. 'Últimos cupos', 'la oferta cierra hoy', 'tu cuenta será bloqueada'. La urgencia artificial existe para impedir que pienses. Un proyecto serio te deja tiempo para investigar.",
          "3. Contacto no solicitado. Un asesor que te escribe por WhatsApp sin que hayas pedido nada no es un asesor: es un vendedor de humo. Las plataformas legítimas no reclutan por mensaje directo.",
          "4. Retirar exige depositar. Si para retirar 'tus ganancias' primero debes pagar un impuesto, una comisión o desbloquear un nivel, estás ante el cierre clásico del engaño. Nunca pagas para retirar lo tuyo.",
          "5. Sitio web nuevo con nombre raro. Revisa cuánto tiene de creado el dominio (cualquier herramienta whois lo muestra). Muchos fraudes operan con webs de semanas de vida.",
        ],
      },
      {
        heading: "Las siguientes 5 (las más sutiles)",
        paragraphs: [
          "6. Testimonios genéricos. Fotos de stock, nombres sin rostro y reseñas de cinco estrellas escritas todas el mismo día. La prueba social falsa suele ser demasiado perfecta.",
          "7. Sin equipo verificable. Si los fundadores no existen fuera de la propia plataforma —sin LinkedIn, sin historial, sin conferencias—, pregúntate quién responde cuando desaparezcan.",
          "8. Reglas que cambian sobre la marcha. Modifican condiciones de retiro, agregan requisitos o mueven la meta cuando quieres salir. Un protocolo serio tiene reglas claras y públicas desde el día uno.",
          "9. Solo aceptan cripto o transferencias irrecuperables. El pago irreversible no es tecnología avanzada: es que no quieren devolverte nada.",
          "10. Te piden tus llaves. Nadie legítimo necesita tu seed phrase ni acceso remoto a tu wallet. Quien pide eso no quiere invertir contigo: quiere tu cartera entera.",
        ],
      },
      {
        heading: "La regla de oro detrás de todas",
        paragraphs: [
          "Todas las estafas explotan la misma grieta: el deseo de ganar mucho, rápido y sin esfuerzo. Por eso ninguna lista es suficiente si tu mentalidad busca atajos.",
          "Antes de mover un solo peso, hazte tres preguntas: ¿entiendo de dónde sale la rentabilidad?, ¿puedo recuperar mi dinero si algo falla?, ¿verifiqué esto en fuentes independientes? Si alguna respuesta es 'no', no inviertas.",
        ],
      },
      {
        heading: "Qué hacer si ya caíste",
        paragraphs: [
          "Primero: no intentes recuperarla contratando a quien te aparece ofreciendo exactamente eso. Es la segunda capa de la estafa, dirigida específicamente a víctimas recientes.",
          "Documenta todo (capturas, direcciones, transacciones), corta todo contacto, mueve tus fondos restantes a una wallet limpia con seed phrase nueva, y reporta a las autoridades competentes. Perder es doloroso; perder dos veces por vergüenza, innecesario.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "La seguridad en cripto no es paranoia: es proceso. Verificar dominios, desconfiar de urgencias y proteger tus claves son hábitos simples que separan a quienes sobreviven de quienes financian a los estafadores.",
          "Educación segura, estrategia clara y sin humo. Esa es la única ventaja sostenible en este ecosistema.",
        ],
      },
    ],
  },
  {
    id: "seed-phrase-guia",
    title: "Seed phrase: la guía definitiva para respaldarla sin perder todo",
    summary:
      "Tu seed phrase vale más que tu contraseña bancaria: es la única llave real de tus criptomonedas. Cómo respaldarla correctamente, dónde guardarla y los errores que han costado fortunas enteras.",
    date: "2026-08-17",
    targetKeyword: "seed phrase backup",
    metaDescription: "Guía definitiva de seed phrase: cómo respaldar tus 12/24 palabras correctamente, errores que han costado fortunas y verificación paso a paso para proteger tus criptomonedas.",
    dateLabel: "17/08/2026",
    image: "/blog/seed-phrase-guia.svg",
    related: [
      { label: "Tema del curso: Seed phrase y backups", href: "/nivel-1/seed-phrase-backups" },
      { label: "Guía gratis: El Custodio de su propia Libertad", href: "/recursos/el-custodio" },
    ],
    sections: [
      {
        paragraphs: [
          "Hay una frase de 12 o 24 palabras que vale potencialmente toda tu cartera cripto. No es una exageración: quien la posee, controla tus fondos. Ni contraseñas, ni correos, ni verificación en dos pasos pueden detenerlo.",
          "Por eso la seed phrase es simultáneamente lo más importante y lo peor tratado del mundo cripto. Esta guía cubre qué es exactamente, cómo respaldarla bien y los errores que han costado fortunas.",
        ],
      },
      {
        heading: "Qué es realmente una seed phrase",
        paragraphs: [
          "Una frase semilla es una representación legible de una clave maestra matemática. De esas palabras derivan todas tus claves privadas y todas tus direcciones, en todas las redes compatibles.",
          "Eso significa dos cosas críticas: primera, basta la frase completa para reconstruir tu wallet en cualquier dispositivo; segunda, no existe 'restablecer contraseña'. Si pierdes la frase y pierdes el dispositivo, tus fondos quedan matemáticamente inalcanzables para siempre.",
        ],
      },
      {
        heading: "Cómo respaldarla correctamente",
        paragraphs: [
          "Regla base: anótala en papel o grábala en metal, nunca la fotografíes ni la guardes digitalmente. Capturas de pantalla en el celular, notas en la nube, gestores de contraseñas y correos son superficies de ataque permanentes.",
          "El papel funciona pero es frágil: agua, fuego y tiempo son sus enemigos. Para montos importantes, planchas de acero inoxidable permiten soportar incendios e inundaciones. Cuestan poco y duran décadas.",
          "Guarda al menos dos copias en ubicaciones físicas distintas y seguras. Una sola copia en un solo lugar es un punto único de fallo: un incendio o extravío y terminó la historia.",
        ],
      },
      {
        heading: "Los errores que han costado fortunas",
        paragraphs: [
          "Digitalizarla 'solo por comodidad': es la causa número uno de robos. Malware especializado escanea galerías y archivos buscando patrones de frases semilla. No le pasa solo a otros.",
          "Escribirla incompleta o ilegible: verificar que cada palabra esté completa y en orden correcto es tan importante como esconderla. Una palabra ambigua convierte el backup en decoración.",
          "Contarla o mostrarla en video: streamers y usuarios de redes sociales han vaciado carteras en vivo. Tu frase no se muestra ni 'parcialmente' ni 'tapando algunas palabras'.",
        ],
      },
      {
        heading: "Verificación: el paso que todos saltan",
        paragraphs: [
          "Un backup no verificado es una hipótesis, no un plan. Después de anotar tu frase, prueba restaurar la wallet en otro dispositivo usando solo el papel. Si funciona, tienes un respaldo real; si no, mejor descubrirlo hoy que dentro de cinco años.",
          "Repite esta verificación cada vez que cambies de wallet o crees una nueva. Dos minutos de prueba valen más que cualquier promesa de plataforma.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "En cripto, la soberanía tiene precio: cuidar tus propias llaves. La seed phrase es tu único verdadero acceso, y tratarla con el mismo cuidado que tratarías el efectivo físico de toda tu vida no es exageración: es proporción.",
          "Anótala en durable, guárdala duplicada y apartada, nunca la digitalices y verifícala. Así de simple y así de serio.",
        ],
      },
    ],
  },
  {
    id: "wallet-cual-elegir",
    title: "Wallet fría vs caliente vs custodial: cuál te conviene según tu perfil",
    summary:
      "No existe 'la mejor wallet', existe la wallet correcta para tu uso real. Diferencias honestas entre wallets frías, calientes y custodiales, y cómo combinarlas según cuánto manejas y para qué.",
    date: "2026-08-14",
    targetKeyword: "wallet fría caliente custodial",
    metaDescription: "Comparativa wallet fría vs caliente vs custodial: diferencias honestas, cuándo usar cada una y cómo combinar según tu perfil de usuario para maximizar seguridad y comodidad.",
    dateLabel: "14/08/2026",
    image: "/blog/wallet-cual-elegir.svg",
    related: [
      { label: "Tema del curso: Wallets hot, cold, custodial", href: "/nivel-1/wallets" },
      { label: "Guía gratis: El Custodio de su propia Libertad", href: "/recursos/el-custodio" },
    ],
    sections: [
      {
        paragraphs: [
          "'¿Cuál wallet me recomiendas?' es probablemente la pregunta más común —y peor respondida— del mundo cripto. La respuesta honesta empieza por otra pregunta: ¿para qué vas a usar tus criptomonedas?",
          "No es lo mismo ahorrar a largo plazo que operar semanalmente o dar los primeros pasos. Cada tipo de wallet resuelve un problema distinto, y confundirlos es cómo se pierden fondos.",
        ],
      },
      {
        heading: "Los tres tipos, sin tecnicismos",
        paragraphs: [
          "Wallet caliente: app o extensión conectada a internet en tu propio dispositivo. Tú controlas las claves. Cómoda para operar e interactuar con aplicaciones, pero expuesta si tu equipo está comprometido.",
          "Wallet fría: dispositivo físico dedicado que mantiene las claves fuera de internet. Máxima seguridad para guardar; menos práctica para uso frecuente. Es la caja fuerte del ecosistema.",
          "Wallet custodial: un tercero (normalmente un exchange) guarda las claves por ti. Fácil de usar, pero recuerda la regla histórica: no es tu llave, no es tu moneda. Dependes de su solvencia, su seguridad y sus políticas.",
        ],
      },
      {
        heading: "Perfil principiante: empezar simple pero bien",
        paragraphs: [
          "Si estás comenzando con montos pequeños, una wallet custodial de un exchange grande puede ser aceptable mientras aprendes —siempre asumiendo que esos fondos están en préstamo de confianza, no bajo tu control.",
          "El salto clave ocurre cuando el monto empieza a importar: instala una wallet propia (caliente), practica transferencias pequeñas entre exchange y wallet, y entiende fees y redes antes de mover montos serios.",
        ],
      },
      {
        heading: "Perfil ahorrista: fría sin discusión",
        paragraphs: [
          "Todo monto que no necesitas tocar en meses pertenece a una wallet fría. La matemática es simple: una hardware wallet cuesta una fracción mínima de lo que protege.",
          "Complementa con backups correctos de tu seed phrase y una verificación de restauración. La combinación wallet fría + respaldo verificado + ubicaciones seguras es el estándar que sobrevive incidentes.",
        ],
      },
      {
        heading: "Perfil activo: dividir para operar tranquilo",
        paragraphs: [
          "Quien opera o usa aplicaciones DeFi con frecuencia necesita agilidad, y ahí la wallet caliente gana. Pero la disciplina está en la separación: una cuenta caliente con solo lo operativo y el resto bajo llave fría.",
          "Piénsalo como efectivo en el bolsillo versus ahorros en la bóveda. Nadie camina con sus ahorros de años en el bolsillo, y en cripto la lógica es idéntica.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "La respuesta madura casi nunca es una sola wallet: es una estructura. Custodial o caliente para lo pequeño y líquido, fría para lo importante, y reglas claras de cuánto vive en cada capa.",
          "Elige según tu uso real, no según marketing. Y cuando el monto crece, que la seguridad crezca antes que él.",
        ],
      },
    ],
  },
  {
    id: "que-es-blockchain-simple",
    title: "Qué es blockchain explicado simple: el libro contable que nadie puede falsificar",
    summary:
      "Olvida el jergón técnico: blockchain es un libro contable compartido donde escribir historia es fácil y falsificarla es prácticamente imposible. Así funciona, explicado con analogías que sí se entienden.",
    date: "2026-08-12",
    targetKeyword: "qué es blockchain",
    metaDescription: "Blockchain explicado simple: el libro contable distribuido que nadie puede falsificar. Guía completa sobre cómo funciona, por qué es seguro y aplicaciones reales más allá del dinero.",
    dateLabel: "12/08/2026",
    image: "/blog/que-es-blockchain-simple.svg",
    related: [
      { label: "Tema del curso: ¿Qué es Blockchain?", href: "/nivel-1/que-es-blockchain" },
      { label: "Tema del curso: Cómo funciona un bloque", href: "/nivel-1/como-funciona-un-bloque" },
    ],
    sections: [
      {
        paragraphs: [
          "Blockchain suena a término de ingeniero, pero la idea de fondo cabe en una frase: es un libro contable copiado en miles de computadores al mismo tiempo, donde agregar información nueva es fácil y alterar el pasado es casi imposible.",
          "Eso es todo. Todo lo demás —minería, tokens, DeFi— son consecuencias de esa propiedad única. Vale la pena entenderla bien porque explica por qué esta tecnología importa.",
        ],
      },
      {
        heading: "La analogía del cuaderno compartido",
        paragraphs: [
          "Imagina un cuaderno donde se anotan transacciones, y que en lugar de existir una sola copia (la del banco), existen miles de copias idénticas en casas y oficinas de todo el mundo.",
          "Cada cierto tiempo, todas las páginas nuevas se agrupan en una hoja sellada —un bloque— que además incluye la huella digital de la hoja anterior. Las hojas forman una cadena: de ahí 'blockchain'.",
        ],
      },
      {
        heading: "Por qué no se puede falsificar el pasado",
        paragraphs: [
          "Si alguien quisiera cambiar una cifra de una página antigua, tendría que rehacer esa hoja y todas las siguientes, en miles de copias simultáneas, más rápido que el resto de la red sigue escribiendo. En la práctica, el costo supera cualquier beneficio.",
          "Cada bloque lleva una huella única (hash) que cambia si se altera un solo carácter. Como cada huella queda grabada en el siguiente bloque, modificar historia rompe la cadena visiblemente. La trampa se delata a sí misma.",
        ],
      },
      {
        heading: "Confianza sin intermediarios",
        paragraphs: [
          "Históricamente necesitamos terceros —bancos, notarios, registros— para que nadie haga trampa en los libros contables. Blockchain reemplaza esa confianza en personas por confianza en matemáticas verificables por cualquiera.",
          "De ahí derivan usos más allá del dinero: registros de propiedad, trazabilidad de cadenas de suministro, votaciones auditables. Donde haya un libro contable que deba ser honesto, aplica la idea.",
        ],
      },
      {
        heading: "Lo que blockchain NO es",
        paragraphs: [
          "No es magia ni gratis: garantizar ese consenso global consume recursos reales, y las transacciones tardan lo que la red tarda. Tampoco es anónima total: la mayoría de blockchains públicas son transparentes, y cada movimiento queda a la vista de siempre.",
          "Entender sus límites es parte de entenderla. La tecnología es poderosa precisamente donde el problema es coordinar confianza entre desconocidos; fuera de ahí, soluciones tradicionales suelen bastar.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "Blockchain = libro contable distribuido + historial encadenado con huellas + miles de guardianes independientes. Con ese modelo mental, cada noticia del sector deja de ser ruido y empieza a tener contexto.",
          "Si quieres dar el siguiente paso, en el Nivel 1 del curso desarmamos bloque por bloque cómo se construye cada página del cuaderno. Gratis y sin registro, como todo el contenido del sitio.",
        ],
      },
    ],
  },
  {
    id: "dex-vs-cex-reales",
    title: "DEX vs CEX: diferencias reales, ventajas honestas y errores comunes",
    summary:
      "Exchange centralizado o descentralizado no es religión, es herramienta. Ventajas y límites reales de cada modelo, y el error de novato que termina costando carillas.",
    date: "2026-08-10",
    targetKeyword: "DEX vs CEX",
    metaDescription: "DEX vs CEX diferencias reales: ventajas honestas de exchanges centralizados y descentralizados, errores comunes de novato y cuándo usar cada modelo para maximizar seguridad y rentabilidad.",
    dateLabel: "10/08/2026",
    image: "/blog/dex-vs-cex-reales.svg",
    related: [
      { label: "Tema del curso: Diferencia entre CEX y DEX", href: "/nivel-1/cex-vs-dex" },
      { label: "Tema avanzado: DEX vs Exchange Centralizado", href: "/nivel-3/dex-vs-exchange-centralizado" },
    ],
    sections: [
      {
        paragraphs: [
          "En cripto hay dos formas de comprar, vender e intercambiar: exchanges centralizados (CEX) —empresas como Binance o Coinbase— y exchanges descentralizados (DEX) —protocolos donde intercambias directamente desde tu wallet.",
          "El debate de internet te dirá que uno mata al otro. La realidad práctica: hacen cosas distintas, y saber cuándo usar cada uno es una habilidad básica de supervivencia.",
        ],
      },
      {
        heading: "CEX: conveniencia a cambio de confianza",
        paragraphs: [
          "Un CEX funciona como un broker tradicional: abres cuenta, verificas identidad, depositas y operas con libros de órdenes profesionales. Precios claros, interfaz amigable, soporte al cliente y fiat fácil de entrar y salir.",
          "El costo real es custodia: tus monedas viven en sus billeteras. Historia repetida —de Mt. Gox a FTX— demuestra que 'confiable' no es 'infalible'. Si el exchange congela retiros o quiebra, esperas como cualquiera.",
        ],
      },
      {
        heading: "DEX: soberanía a cambio de responsabilidad",
        paragraphs: [
          "En un DEX intercambias mediante contratos inteligentes: tus fondos nunca salen de tu wallet hasta el instante del swap. No hay cuentas ni custodio; hay liquidez aportada por otros usuarios y comisiones transparentes.",
          "La contracara: tú eres tu propio servicio al cliente. Firma mal una transacción, elige mal la red o aprueba un contrato malicioso, y no hay ticket de soporte que revierta nada. Más libertad siempre implica más responsabilidad.",
        ],
      },
      {
        heading: "Ventajas honestas de cada uno",
        paragraphs: [
          "CEX gana en: onramp/offramp con moneda local, profundidad de mercado en pares grandes, herramientas para principiantes y recuperación de cuenta con contraseña olvidada.",
          "DEX gana en: auto-custodia total, acceso a proyectos nuevos antes de llegar a exchanges, operación sin registro y composabilidad con el resto de DeFi. Para activos largos, muchos usan ambos: CEX para entrar/salir de fiat, DEX para explorar.",
        ],
      },
      {
        heading: "El error común que cuesta caro",
        paragraphs: [
          "El clásico de novato: dejar todos los fondos en el exchange 'porque es cómodo'. Ahí no estás invertido en cripto: tienes un saldo a favor de una empresa. La diferencia se nota justo cuando más importa.",
          "El segundo error es el opuesto: saltarse la curva de aprendizaje y operar en DEX sin entender aprobaciones de tokens ni redes. Resultado típico: aprobar un contrato fraudulento o enviar fondos a una red equivocada.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "Usa el CEX como puente hacia y desde dinero fiat; usa el DEX cuando quieras auto-custodia y acceso directo a DeFi. Y aplica siempre la misma regla de oro: lo que no estés operando activamente, que duerma bajo tus propias llaves.",
          "Ni fanatismo ni miedo: criterio.",
        ],
      },
    ],
  },
  {
    id: "halving-bitcoin-que-es",
    title: "Halving de Bitcoin: qué es, por qué importa y qué NO te va a regalar",
    summary:
      "Cada cuatro años, la emisión de Bitcoin se reduce a la mitad por diseño. Qué significa técnicamente el halving, por qué es relevante y por qué promesas de riqueza automática alrededor del evento son pura narrativa.",
    date: "2026-08-07",
    dateLabel: "07/08/2026",
    image: "/blog/halving-bitcoin-que-es.svg",
    related: [
      { label: "Tema del curso: Halving", href: "/nivel-2/halving" },
    ],
    sections: [
      {
        paragraphs: [
          "Aproximadamente cada cuatro años, la cantidad de bitcoin nuevos que se crean por bloque se reduce a la mitad. Ese evento programado se llama halving y es, probablemente, la característica económica más singular de Bitcoin.",
          "Es también un imán de predicciones sensacionalistas. Vamos a separar el hecho técnico de la narrativa de marketing.",
        ],
      },
      {
        heading: "Qué es técnicamente",
        paragraphs: [
          "Bitcoin no tiene banco central emitiendo moneda: nuevos bitcoins nacen como recompensa a los mineros que aseguran la red. Esa recompensa empezó en 50 BTC por bloque y se corta a la mitad cada 210.000 bloques.",
          "50, luego 25, luego 12.5, 6.25 y así, hasta alcanzar el límite de 21 millones alrededor del año 2140. La escasez máxima no es una promesa: está escrita en el código que todos ejecutan.",
        ],
      },
      {
        heading: "Por qué importa",
        paragraphs: [
          "El halving hace la inflación predecible y decreciente. Mientras la mayoría de monedas fiduciarias expanden su oferta discrecionalmente, cualquiera puede calcular hoy cuántos bitcoin existirán en diez años. Esa previsibilidad es el argumento central del activo.",
          "Además actúa como choque de oferta: si la demanda se mantiene y la emisión nueva baja a la mitad, la presión histórica ha sido alcista. Histórico es la palabra clave.",
        ],
      },
      {
        heading: "Lo que el mercado dice vs lo que realmente pasa",
        paragraphs: [
          "Sí ha habido ciclos alcistas posteriores a halvings anteriores. Pero correlación no es ley física: cada ciclo ocurrió en contextos de mercado distintos, y los plazos entre evento y efecto variaron de meses a más de un año.",
          "Comprar 'porque viene el halving' es apostar a un patrón de tres datos puntos. Los que venden certeza sobre el próximo, generalmente están vendiendo algo más: su salida de posición.",
        ],
      },
      {
        heading: "Qué NO esperar del halving",
        paragraphs: [
          "No es un interruptor de precio instantáneo. No garantiza que la tendencia continúe igual que antes. Y no transforma inversiones mal hechas en buenas: si un proyecto era dudoso antes del halving, sigue siendo dudoso después.",
          "El halving importa como pieza estructural de la política monetaria de Bitcoin, no como señal de trading. Confundir ambas capas es la receta clásica para comprar en la cima de la expectativa.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "El halving es ingeniería monetaria elegante: emisión conocida, decreciente e incensurable. Entenderlo te hace mejor inversor a largo plazo; esperarlo como lotería te hace cliente de quien vende narrativa.",
          "Escasez programada, sí. Riqueza garantizada, no.",
        ],
      },
    ],
  },
  {
    id: "staking-cripto-riesgos",
    title: "Staking de criptomonedas: cómo funciona y qué esconden los rendimientos",
    summary:
      "Ganar rendimiento por mantener criptomonedas suena perfecto, pero ningún interés es gratis. Cómo funciona el staking de verdad, de dónde sale la rentabilidad y qué riesgos vienen disfrazados de APY.",
    date: "2026-08-05",
    dateLabel: "05/08/2026",
    image: "/blog/staking-cripto-riesgos.svg",
    related: [
      { label: "Tema del curso: Staking / Yield", href: "/nivel-2/staking-yield" },
      { label: "Tema avanzado: Ethereum 2.0 y Staking", href: "/nivel-3/ethereum-2-staking" },
    ],
    sections: [
      {
        paragraphs: [
          "'Gana 12% anual solo por mantener tus criptos' es de las ofertas más repetidas —y peor entendidas— del ecosistema. El staking real cumple una función técnica seria; el staking de marketing, otras veces, esconde préstamos riesgosos con etiqueta bonita.",
          "Distinguir ambos te protege de sorpresas. Empecemos por lo genuino.",
        ],
      },
      {
        heading: "Staking real: trabajo de red, pago por trabajo",
        paragraphs: [
          "En redes que usan Proof of Stake, los validadores bloquean monedas como garantía para proponer y validar bloques. A cambio reciben emisión nueva y comisiones de red. Es salario por servicio de infraestructura, no interés por ahorrar.",
          "Como usuario puedes delegar a un validador existente o correr el tuyo. El rendimiento típico de redes grandes se mueve en rangos modestos de pocos puntos anuales; cifras muy superiores suelen indicar otra cosa debajo.",
        ],
      },
      {
        heading: "De dónde sale cada rendimiento",
        paragraphs: [
          "Preguntarte de dónde sale el pago es el filtro más potente del ecosistema. Rendimiento legítimo proviene de: emisión de red por validar, comisiones de transacciones y, a veces, incentivos temporales de protocolos nuevos.",
          "Rendimiento sospechoso proviene de: préstamos a terceros opacos, esquemas que pagan a viejos con dinero de nuevos, o emisiones infinitas de un token que solo se devalúa a sí mismo. Si la fuente no se explica claramente, esa es la respuesta.",
        ],
      },
      {
        heading: "Los riesgos que el APY no muestra",
        paragraphs: [
          "Slashing: en staking nativo, un validador que actúa mal pierde parte de la garantía. Pocas veces le pasa a delegantes, pero existe. Lock-up: muchos esquemas retienen tus fondos semanas o meses; si el mercado cae, miras sin poder moverte.",
          "Riesgo de plataforma: si haces staking vía exchange o servicio, agregas su solvencia a la ecuación. Y riesgo de precio: un 8% anual no compensa un -60% del activo subyacente. El rendimiento se mide sobre un valor que fluctúa fuerte.",
        ],
      },
      {
        heading: "Preguntas antes de stakear cualquier cosa",
        paragraphs: [
          "Uno: ¿de dónde sale exactamente este rendimiento y quién lo paga? Dos: ¿cuándo puedo retirar y con qué penalidad? Tres: ¿quién custodia mis monedas durante el periodo? Cuatro: ¿qué pasa si esta plataforma desaparece mañana?",
          "Respuestas vagas en cualquiera de las cuatro son motivo suficiente para pasar a la siguiente oportunidad. El ecosistema está lleno de opciones: no necesitas aceptar niebla.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "Staking genuino es infraestructura: cobras por ayudar a operar una red, con rendimientos proporcionales y reglas públicas. Todo lo que promete mucho más sin explicar la fuente merece desconfianza profesional.",
          "Que el rendimiento tenga explicación técnica, no solo publicidad.",
        ],
      },
    ],
  },
  {
    id: "stablecoins-puerta-entrada",
    title: "Stablecoins: la puerta de entrada al mundo cripto (y su mayor riesgo)",
    summary:
      "Monedas digitales que valen un dólar y no se mueven con el mercado: así funcionan los tres tipos de stablecoins, para qué sirven de verdad y el riesgo estructural que casi nadie revisa antes de usarlas.",
    date: "2026-08-03",
    dateLabel: "03/08/2026",
    image: "/blog/stablecoins-puerta-entrada.svg",
    related: [
      { label: "Tema avanzado: Tipos de stablecoins", href: "/nivel-3/tipos-de-stablecoins" },
    ],
    sections: [
      {
        paragraphs: [
          "Para quien llega de la economía tradicional, la volatilidad cripto es el primer obstáculo. Las stablecoins existen justamente para eso: replicar el valor de una moneda estable —usualmente el dólar— con las ventajas técnicas de blockchain: transferencias globales en minutos, 24/7 y sin bancos intermediarios.",
          "Son la puerta de entrada natural al ecosistema. Pero 'estable' no es lo mismo que 'sin riesgo', y la diferencia está en cómo mantienen su paridad.",
        ],
      },
      {
        heading: "Tipo 1: respaldadas en fiat",
        paragraphs: [
          "El modelo más simple: por cada token existe, en teoría, un dólar o equivalente en cuentas bancarias y activos líquidos. USDT y USDC operan así a gran escala.",
          "Su fortaleza es la simplicidad; su debilidad es que confías en que el emisor tenga realmente las reservas que dice tener, y en la calidad de esas reservas. Transparencia y auditorías independientes son aquí el criterio de evaluación principal.",
        ],
      },
      {
        heading: "Tipo 2: respaldadas en cripto y sobrecolateralizadas",
        paragraphs: [
          "Protocolos descentralizados como DAI emiten stablecoins contra garantías cripto depositadas en contratos inteligentes, exigiendo colateral de valor superior al emitido (por ejemplo $150 de ETH por cada $100 emitidos).",
          "Absorben volatilidad del colateral con márgenes y mecanismos automáticos de liquidación. Son más transparentes —el colateral es público en cadena— pero más complejas, y sufren en caídas extremas del mercado cripto.",
        ],
      },
      {
        heading: "Tipo 3: algorítmicas, la lección aprendida",
        paragraphs: [
          "Las algorítmicas pretendían mantener la paridad con ingeniería de incentivos y sin respaldo pleno. El colapso de Terra/Luna en 2022 —decenas de miles de millones evaporados— demostró que la paridad sin respaldo real es una apuesta, no un diseño.",
          "Lección permanente: si no sabes exactamente qué respalda una stablecoin, el 'respaldo' eres tú confiando.",
        ],
      },
      {
        heading: "El mayor riesgo que casi nadie revisa",
        paragraphs: [
          "No es la volatilidad: es el riesgo de emisor y reservas. Una stablecoin vale un dólar mientras el emisor responda y sus reservas existan. Congelamientos de direcciones, restricciones regulatorias o reservas de mala calidad son los escenarios reales a evaluar.",
          "Práctica sensata: diversificar entre emisores reputados para montos relevantes, y revisar periódicamente sus reportes de reservas. Estable no significa inmortal.",
        ],
      },
      {
        heading: "Conclusión",
        paragraphs: [
          "Las stablecoins cumplen una función enorme: refugio dentro del ecosistema, remesas rápidas y base para operar DeFi. Bien elegidas, son la herramienta más práctica para empezar.",
          "Solo recuerda la jerarquía correcta: primero entiende quién emite y con qué respaldo; después, y solo después, úsala.",
        ],
      },
    ],
  },
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

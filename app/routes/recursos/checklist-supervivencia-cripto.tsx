import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/GuidePage";

export const Route = createFileRoute("/recursos/checklist-supervivencia-cripto")({
  component: ChecklistSupervivencia,
  head: () => ({
    meta: [
      {
        title: "Checklist de Supervivencia Cripto | Aprendamos de Criptomonedas",
      },
      {
        name: "description",
        content:
          "Checklist de seguridad y control antes de invertir, enviar o tradear: 8 bloques de verificación, reglas de oro y resultado final.",
      },
      {
        name: "keywords",
        content:
          "checklist seguridad cripto, seguridad criptomonedas, autocustodia, seed phrase, verificación envío, estafas cripto, gestión de riesgo",
      },
      { property: "og:title", content: "Checklist de Supervivencia Cripto" },
      {
        property: "og:description",
        content: "Los errores que debes evitar antes de invertir, enviar o tradear.",
      },
    ],
  }),
});

const blocks: { heading: string; items: string[] }[] = [
  {
    heading: "1 · Mentalidad mínima (antes de tocar cripto)",
    items: [
      "Sé que exchange ≠ banco",
      "Entiendo qué es una wallet y para qué sirve",
      "Sé la diferencia entre hot wallet y cold wallet",
      "Sé dónde están realmente mis criptomonedas",
    ],
  },
  {
    heading: "2 · Seguridad esencial inmediata",
    items: [
      "Uso contraseñas únicas y largas (no repetidas)",
      "Tengo 2FA con app (NO solo SMS)",
      "Mi correo principal también tiene 2FA",
      "No accedo a mis cuentas desde redes WiFi públicas",
    ],
  },
  {
    heading: "3 · Wallet y autocustodia básica",
    items: [
      "Sé qué es una seed phrase (12–24 palabras)",
      "Nunca la comparto con nadie (ni con «soporte»)",
      "NO la tengo en el celular ni en fotos",
      "La tengo escrita en papel y guardada en un lugar seguro",
      "Verifico que nadie vea mi pantalla al escribirla",
      "Nunca escribo la seed en teclados de otros dispositivos",
    ],
  },
  {
    heading: "4 · Seed phrase / claves privadas",
    items: [
      "Conozco la red en la que opero (BEP-20, ERC-20, TRC-20, etc.)",
      "Antes de enviar reviso {red + dirección + monto + comisión}",
      "Nunca envío a la dirección de un contrato a menos que sepa exactamente lo que hago",
      "Antes de firmar cualquier contrato, reviso los permisos que solicita",
      "Uso un monto de prueba antes de mover todo el capital",
    ],
  },
  {
    heading: "5 · Errores técnicos irreversibles",
    items: [
      "Verifico la red correcta antes de enviar fondos",
      "Reviso la dirección completa, no solo el inicio",
      "Sé que un error de red = fondos perdidos",
      "Hago envíos de prueba con montos pequeños",
    ],
  },
  {
    heading: "6 · Estafas e ingeniería social",
    items: [
      "Si me piden «movimiento de verificación» o «garantía», es una estafa",
      "Desconfío de mensajes con urgencia, premios o «soporte» que me contacta primero",
      "Verifico dos veces por canales oficiales antes de actuar",
      "Nunca comparto pantalla con desconocidos",
      "Reporto estafas en los canales oficiales",
    ],
  },
  {
    heading: "7 · Trading y riesgo (básico)",
    items: [
      "Conozco mi límite de inversión y lo respeto",
      "No uso plataformas que no entiendo",
      "No invierto dinero que necesito",
      "Empiezo con pequeñas cantidades",
      "Uso stops para proteger mi capital",
    ],
  },
  {
    heading: "8 · Orden y control personal",
    items: [
      "Llevo un registro de mis operaciones",
      "Tengo claro mi estrategia de salida",
      "Diversifico activos, wallets y estrategias",
      "No invierto más del 10% de mis ahorros en cripto",
      "No uso dinero prestado para cripto",
      "No apuesto lo que no estoy dispuesto a perder",
    ],
  },
];

function ChecklistSupervivencia() {
  return (
    <GuidePage
      badge="GUÍA GRATUITA"
      title="CHECKLIST DE SUPERVIVENCIA CRIPTO"
      subtitle="Los errores que debes evitar antes de invertir, enviar o tradear"
      tagline={["Educación • Control • Responsabilidad"]}
      edition="Imprimible · Cuenta tus «NO» y usa la regla de oro"
      disclaimer="Esta checklist NO es un producto financiero. No es asesoría financiera. Es una herramienta de seguridad y control personal. © Aprendamos de Criptomonedas 2026."
      sections={[
        {
          heading: "Cómo usarla",
          paragraphs: [
            "Marca cada punto con **SÍ** o **NO**. Sé honesto: nadie más verá este resultado.",
            "**Regla de oro:** si respondes NO en más de 3 puntos, no avances. Primero resuelve lo que falta.",
          ],
        },
        ...blocks.map((block) => ({
          heading: block.heading,
          lists: [{ items: block.items.map((item) => ({ text: item, check: true })) }],
        })),
        {
          heading: "Resultado final",
          paragraphs: ["Suma tus respuestas **NO** y consulta la tabla:"],
          lists: [
            {
              items: [
                { text: "**0–2 NO** → LISTO PARA OPERAR", check: true },
                { text: "**3–5 NO** → ALTO RIESGO: cerrá los huecos antes de avanzar", check: true },
                { text: "**6+ NO** → DETENTE: no operes todavía, resolvé cada punto pendiente", check: true },
              ],
            },
          ],
          warning: "La checklist es solo el inicio. La guía completa explica el porqué de cada punto.",
        },
      ]}
      cta={[
        { label: "Leer El Inversor que Sobrevive", href: "/recursos/el-inversor-que-sobrevive", variant: "gold" },
        { label: "Ver todas las guías", href: "/recursos", variant: "cyber" },
      ]}
    />
  );
}

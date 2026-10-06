/**
 * Captacion de leads del lead magnet.
 *
 * DESTINO DE LOS DATOS
 * El sitio es estatico (GitHub Pages), asi que no hay servidor propio que
 * reciba un POST. El destino se configura con VITE_LEADS_ENDPOINT en el .env,
 * apuntando a lo que uses: un webhook de tu ESP, un Google Apps Script, un
 * endpoint de formulario. Ver .env.example.
 *
 * ESTADO SIN CONFIGURAR
 * Si VITE_LEADS_ENDPOINT no esta definido, el formulario NO se renderiza. En su
 * lugar se ofrecen las descargas directas, con una linea que explica por que.
 * La alternativa descartada era mostrar el formulario y perder el lead en
 * silencio: es la peor de las tres, porque el visitante cree que se registro y
 * nadie lo contacta nunca. Un boton de "Descargar" que no descarga nada tampoco.
 *
 * LO QUE SE RECOGE
 * Solo nombre y correo, y solo si la persona escribe. Sin cuenta, sin
 * cookies de seguimiento, sin perfilado: se usa unicamente para enviar los
 * recursos y, si lo acepta, escribirle de vez en cuando. El checkbox de
 * consentimiento a correo es opcional y va desmarcado de serie: una casilla
 * premarcada es un dark pattern y ademas vicia el consentimiento.
 */

export interface Lead {
  nombre: string;
  email: string;
  aceptaCorreo: boolean;
  /** De donde vino, para saber que seccion convierte. */
  origen: string;
  /** ISO. */
  fecha: string;
}

export type ResultadoEnvio =
  | { estado: "ok" }
  | { estado: "sin-configurar" }
  | { estado: "error"; detalle: string };

export function endpointConfigurado(): string | null {
  const v = import.meta.env?.VITE_LEADS_ENDPOINT;
  return typeof v === "string" && v.startsWith("https://") ? v : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validar(datos: Pick<Lead, "nombre" | "email">): Record<string, string> {
  const errores: Record<string, string> = {};
  if (!datos.nombre.trim()) errores.nombre = "Escribe tu nombre o alias.";
  if (!EMAIL_RE.test(datos.email.trim())) errores.email = "Ese correo no parece válido.";
  return errores;
}

export async function enviarLead(datos: Lead): Promise<ResultadoEnvio> {
  const endpoint = endpointConfigurado();
  if (!endpoint) return { estado: "sin-configurar" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) return { estado: "error", detalle: `HTTP ${res.status}` };
    return { estado: "ok" };
  } catch (e) {
    return { estado: "error", detalle: e instanceof Error ? e.message.slice(0, 80) : "error de red" };
  }
}

/** Recursos CSV del lead magnet. Viven en /public/recursos/. */
export const CSVS = [
  {
    archivo: "/recursos/plantilla-analisis-wallet.csv",
    nombre: "Plantilla de análisis de wallet",
    para: "Cómo auditar una wallet: antigüedad, cadencia, concentración y envíos a exchanges.",
  },
  {
    archivo: "/recursos/plantilla-metricas-red.csv",
    nombre: "Plantilla de métricas de red",
    para: "Los ratios que separan un token de una preventa: FDV/MCAp, rotación y desbloqueos.",
  },
  {
    archivo: "/recursos/checklist-seguridad.csv",
    nombre: "Checklist de seguridad",
    para: "12 puntos verificables en diez minutos sobre llaves, cuentas, custodia y operar.",
  },
  {
    archivo: "/recursos/registro-operaciones.csv",
    nombre: "Registro de operaciones",
    para: "Llevar cada compra y venta con el porqué. Vale más que cualquier gráfico.",
  },
  {
    archivo: "/recursos/inventario-wallets.csv",
    nombre: "Inventario de wallets",
    para: "Saber cuánto tienes en exchanges y cuánto controlas tú de verdad.",
  },
] as const;

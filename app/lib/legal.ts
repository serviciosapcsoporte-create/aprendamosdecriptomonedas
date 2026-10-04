/**
 * Identidad legal y canales públicos del sitio.
 *
 * REGLA DE ESTE ARCHIVO: no entran datos personales.
 *   - No cédula, no NIT personal, no dirección física, no teléfono, no correo
 *     con nombre propio.
 *   - El único dato personal que aparece en el sitio es `AUTHOR` en `seo.ts`
 *     (nombre editorial público) y nada más.
 *
 * Todo lo que un visitante puede ver (páginas legales, footer, metadatos
 * estructurados, llms.txt) debe leer de aquí. Cambiar un canal público es
 * editar una sola línea.
 *
 * Identidad: marca de servicio (Servicios APC) + nombre público (autor).
 * El sitio no vende ni factura directamente: las compras de cursos se procesan
 * en Hotmart, que es quien responde por el checkout y la facturación.
 *
 * Canales de contacto: redes públicas de la marca. No se publica ningún correo
 * personal ni número telefónico propio del responsable.
 */

/** Marca operadora del sitio. Es identidad de marca, no dato personal. */
export const OPERATOR = "Servicios APC";

/** Ubicación institucional (ciudad/país). No es un domicilio. */
export const LOCATION = "Bogotá, Colombia";

/** Página pública de Facebook. Mensajes privados desde ahí son privados. */
export const FACEBOOK = "https://www.facebook.com/AprendamosDeCriptomonedas";

/** Grupo público de Telegram. */
export const TELEGRAM = "https://t.me/ApcDeCripto";

/** Handle visible (sin enlace) para texto plano como llms.txt. */
export const TELEGRAM_HANDLE = "@ApcDeCripto";

/** Marketplace que procesa las compras enlazadas desde el sitio. */
export const MERCHANT = "Hotmart";

/** Fecha de las páginas legales. Se actualiza al modificar el texto. */
export const LEGAL_UPDATED = "octubre de 2026";

/** Frase corta de contacto reutilizada en los bloques legales. */
export function contactLine(): string {
  return `${OPERATOR} · ${LOCATION} · Facebook: AprendamosDeCriptomonedas · Telegram: ${TELEGRAM_HANDLE}`;
}

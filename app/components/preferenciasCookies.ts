import { Dialog } from "@base-ui/react/dialog";

/**
 * Handle del dialogo de preferencias de cookies.
 *
 * Vive en su propio archivo porque lo necesitan dos sitios que no se importan
 * entre si: el boton del pie de pagina (Header) y el enlace dentro de la
 * politica de privacidad. Base UI lo llama "detached trigger": el boton vive
 * fuera del Dialog.Root y ambos se conectan por este handle.
 *
 * Antes esto era un evento custom ("adc:abrir-preferencias") emitido por
 * window.dispatchEvent. Era funcional pero dejaba el contrato fuera de tipos:
 * nada impedia que alguien escribiera el evento con otro nombre. El handle lo
 * convierte en una referencia real.
 *
 * Importar el modulo crea el handle una sola vez.
 */
export const preferenciasCookies = Dialog.createHandle();
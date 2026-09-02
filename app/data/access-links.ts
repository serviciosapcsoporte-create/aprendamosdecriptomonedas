/**
 * Enlaces de acceso para el contenido de pago/registro.
 * Reemplaza estos placeholders por tus URLs reales de Payhip cuando
 * crees los productos (ver PLAYBOOK-LANZAMIENTO.md, Día 3).
 */
export const accessLinks: Record<string, { url: string; cta: string }> = {
  register: {
    url: "https://payhip.com/b/REEMPLAZAR-NIVEL-3", // producto GRATIS en Payhip que pide registro (email)
    cta: "Regístrate gratis para desbloquear el Nivel 3",
  },
  paid: {
    url: "https://payhip.com/b/REEMPLAZAR-NIVEL-4-5", // producto DE PAGO en Payhip
    cta: "Desbloquea este nivel en Payhip",
  },
};

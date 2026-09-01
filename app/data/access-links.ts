export const siteConfig = {
  site: "Aprendamos de Criptomonedas",
  domain: "aprendamosdecriptomonedas.lat",
  // Web3Forms access key (misma cuenta de Servicios APC para no crear más
  // cuentas. Los leads se distinguen por "site"/"fuente"/"pagina" en el email).
  web3formsAccessKey: "c5cdb094-a9cd-4e68-9041-2fafe475fff6",
  email: "serviciosapcsoporte@gmail.com",
};

export const accessLinks: Record<string, { url: string; cta: string; unlock: string }> = {
  register: {
    url: "#unlock",
    cta: "Activa tu acceso gratis al Nivel 3",
    unlock: "Tu acceso al Nivel 3 está activado. Disfruta la lección completa.",
  },
  paid: {
    url: "#unlock",
    cta: "Activa tu acceso completo a este nivel",
    unlock: "Tu acceso a este nivel está activado. Disfruta la lección completa.",
  },
};

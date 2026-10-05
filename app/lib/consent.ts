/**
 * Consentimiento de cookies.
 *
 * Que decide este archivo:
 *   - Qué categorías existen realmente en el sitio (solo dos, y se refleja en
 *     el banner: inventar toggles de publicidad que no existen es peor que no
 *     tener banner).
 *   - Si Google Analytics 4 se carga. Ahora mismo se carga SIEMPRE y de forma
 *     inmediata desde index.html, antes de que nadie haya aceptado nada: eso es
 *     exactamente lo que el RGPD y la LGPD prohíben.
 *
 * Decisión de diseño: Consent Mode BÁSICO (sin Fireside/advanced). Google
 * Analytics no se inyecta hasta que hay consentimiento. Con el modo avanzado
 * GA4 se carga con analytics_storage denegado y sigue mandando cookieless
 * pings; es legally defendible en la UE, pero en Colombia la Ley 1581 pide un
 * consentimiento claro y previo, y "sin cargar nada hasta que aceptas" es la
 * lectura que no admite discusión.
 *
 * Lo que se declara denegado siempre, aunque se acepte la analítica:
 *   ad_storage, ad_user_data, ad_personalization
 * El sitio no publica anuncios, así que esas señales no tienen por qué estar
 * activadas. Consent Mode v2 las exige declaradas.
 */

export const GA_MEASUREMENT_ID = "G-EWFDLTCM8R";

const STORAGE_KEY = "adc-consent-v1";

export type Consent = {
  /** Necesarias: guardar la preferencia. Siempre true, no se puede apagar. */
  esencial: true;
  /** Google Analytics 4. */
  analitica: boolean;
  /** Momento de la decisión, ISO. */
  fecha: string;
};

export const CONSENT_POR_DEFECTO: Consent = {
  esencial: true,
  analitica: false,
  fecha: "",
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaCargado?: boolean;
  }
}

/** Señales de Google Consent Mode v2. `security_storage` nunca se deniega. */
function senales(consent: Consent) {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: consent.analitica ? "granted" : "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

export function leerConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.analitica !== "boolean") return null;
    return {
      esencial: true,
      analitica: parsed.analitica,
      fecha: typeof parsed.fecha === "string" ? parsed.fecha : "",
    };
  } catch {
    // localStorage puede estar bloqueado (modo privado). El sitio sigue
    // funcionando: se pedirá el consentimiento en cada visita.
    return null;
  }
}

function guardarConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Sin persistencia no hay problema: la decisión vale para esta visita.
  }
}

/**
 * Carga gtag.js y configura la propiedad. Es idempotente: si ya se cargó, solo
 * actualiza las señales de consent, que es lo que permite revocar el
 * consentimiento y que Google deje de enviar datos.
 */
export function aplicarConsent(consent: Consent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtagShim(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }

  if (consent.analitica && !window.__gaCargado) {
    window.__gaCargado = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }

  // update_available: refleja la decisión actual sin recargar nada.
  window.gtag("consent", "update", senales(consent));
}

export function aceptarTodo(): Consent {
  const c: Consent = { esencial: true, analitica: true, fecha: new Date().toISOString() };
  guardarConsent(c);
  aplicarConsent(c);
  return c;
}

export function rechazarOpcional(): Consent {
  const c: Consent = { esencial: true, analitica: false, fecha: new Date().toISOString() };
  guardarConsent(c);
  aplicarConsent(c);
  return c;
}

export function guardarPreferencias(analitica: boolean): Consent {
  return analitica ? aceptarTodo() : rechazarOpcional();
}

export function borrarConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* sin persistencia no hay nada que borrar */
  }
}
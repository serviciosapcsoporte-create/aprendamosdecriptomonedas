/**
 * Boton que abre el panel de preferencias de cookies.
 *
 * Vive en un componente propio y no en la pagina de privacidad porque el RGPD
 * exige que retirar el consentimiento sea tan facil como darlo: si solo
 * estuviera en /privacidad, en la practica nadie lo encontraria.
 */
export function CookiePreferencesButton({ children }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("adc:abrir-preferencias"))}
      className="inline underline underline-offset-2 hover:text-foreground"
    >
      {children ?? "preferencias de cookies"}
    </button>
  );
}
/**
 * Boton que abre el panel de preferencias de cookies.
 *
 * Vive en un componente propio y no dentro de la pagina de privacidad porque el
 * RGPD exige que retirar el consentimiento sea tan facil como darlo: si el
 * acceso solo estuviera en /privacidad, en la practica nadie lo encontraria.
 *
 * Es un Dialog.Trigger de base-ui conectado por handle, no un <button> con un
 * evento propio: asi el boton queda registrado como disparador real del
 * dialogo y el foco vuelve a el al cerrar.
 */
import { Dialog } from "@base-ui/react/dialog";
import { preferenciasCookies } from "@/components/preferenciasCookies";

export function CookiePreferencesButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Trigger
      handle={preferenciasCookies}
      className={
        className ??
        "inline underline underline-offset-2 hover:text-foreground text-left"
      }
    >
      {children ?? "preferencias de cookies"}
    </Dialog.Trigger>
  );
}
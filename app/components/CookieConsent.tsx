/**
 * Banner de consentimiento de cookies, sobre Dialog de base-ui.
 *
 * POR QUE BASE UI Y NO UN <div> CON FOCUS TRAP A MANO
 * La version anterior implementaba a mano aria-modal, el focus trap, el
 * retorno del foco al boton que abrio el panel y el cierre con Escape. Funcionaba
 * (32 comprobaciones en verde) pero es justo el tipo de codigo que se rompe en
 * silencio: un Tab que se sale del panel, un lector de pantalla que no anuncia
 * el titulo, un Escape que se come la pagina detras. base-ui resuelve eso y lo
 * resuelve bien, y no trae estOpinion porque es headless: el aspecto sigue
 * saliendo de los tokens ILAB de este proyecto.
 *
 * LAS DOS PIEZAS SON DISTINTAS A PROPOSITO
 * - El banner va con modal={false}: no atrapa el foco ni bloquea el scroll,
 *   porque el contenido se puede leer sin decidir. Si el dialogo fuera modal, un
 *   visitante que solo queria leer una leccion quedaria atrapado en el banner.
 * - El panel de preferencias va modal: ahi si se decide y si debe atrapar el
 *   foco.
 *
 * ESCAPE EN EL BANNER
 * Escape se cancela a proposito con eventDetails.cancel(). Si el banner se
 * cerrara con Escape, quien lo pulsara por costumbre se quedaria sin decidir y
 * sin volver a verlo en toda la sesion, y esa medicion se perderia en silencio.
 * Decidir tiene que ser explicito. En el panel, Escape si cierra: ahi el
 * usuario ya esta dentro de la tarea.
 */
import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useRef, useState } from "react";
import {
  aplicarConsent,
  leerConsent,
  guardarPreferencias,
  type Consent,
} from "@/lib/consent";
import { preferenciasCookies } from "@/components/preferenciasCookies";

export function CookieConsent() {
  // null = aun no se ha leido la preferencia. Distinguirlo de false importa:
  // durante ese frame no se debe quitar el banner de quien ya decidio.
  const [decidido, setDecidido] = useState<Consent | null>(null);
  const [bannerAbierto, setBannerAbierto] = useState(false);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [analitica, setAnalitica] = useState(false);

  const aceptarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const guardado = leerConsent();
    if (guardado) {
      setDecidido(guardado);
      setAnalitica(guardado.analitica);
      aplicarConsent(guardado);
    } else {
      // Sin decision guardada se aplica el rechazo por defecto: nada de
      // analitica hasta que se diga lo contrario.
      aplicarConsent({ esencial: true, analitica: false, fecha: "" });
      setBannerAbierto(true);
    }
  }, []);

  const decidir = (valor: boolean) => {
    const c = guardarPreferencias(valor);
    setDecidido(c);
    setAnalitica(c.analitica);
    setBannerAbierto(false);
    setPanelAbierto(false);
  };

  const abrirPreferencias = () => {
    const actual = leerConsent();
    setAnalitica(actual?.analitica ?? false);
    setDecidido(actual);
    setPanelAbierto(true);
  };

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Banner: no modal, el contenido sigue siendo legible debajo          */}
      {/* ------------------------------------------------------------------ */}
      <Dialog.Root
        open={bannerAbierto}
        onOpenChange={(open, details) => {
          // Cancelar Escape y el toque fuera. Solo se cierra eligiendo.
          if (!open && (details.reason === "escape-key" || details.reason === "outside-press")) {
            details.cancel();
            return;
          }
          setBannerAbierto(open);
        }}
        modal={false}
      >
        <Dialog.Portal>
          <Dialog.Popup
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm"
            initialFocus={aceptarRef}
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:py-5">
              <div className="max-w-2xl">
                <Dialog.Title
                  id="consent-titulo"
                  className="text-base font-bold text-foreground"
                >
                  Usamos cookies de analítica, y solo si me lo dices
                </Dialog.Title>
                <Dialog.Description
                  id="consent-texto"
                  render={<p className="mt-1 text-sm text-muted-foreground" />}
                >
                  Este sitio no necesita cookies para funcionar: puedes leer las 76
                  lecciones sin aceptar nada. Si aceptas, Google Analytics nos dice
                  qué lecciones se leen y cuáles no, y así mejoramos el contenido. No
                  hay publicidad ni perfiles.{" "}
                  <a href="/privacidad" className="underline underline-offset-2 hover:text-foreground">
                    Política de privacidad
                  </a>
                  .
                </Dialog.Description>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  ref={aceptarRef}
                  type="button"
                  onClick={() => decidir(true)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Aceptar analítica
                </button>
                <button
                  type="button"
                  onClick={() => decidir(false)}
                  className="rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={abrirPreferencias}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  Preferencias
                </button>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ------------------------------------------------------------------ */}
      {/* Panel de preferencias: modal, aqui si se decide                     */}
      {/* ------------------------------------------------------------------ */}
      <Dialog.Root handle={preferenciasCookies} open={panelAbierto} onOpenChange={setPanelAbierto}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60" />
          <Dialog.Viewport className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
            <Dialog.Popup className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-background p-6 sm:rounded-2xl">
              <Dialog.Title id="pref-titulo" className="text-xl font-bold text-foreground">
                Preferencias de cookies
              </Dialog.Title>
              <Dialog.Description
                render={<p className="mt-2 text-sm text-muted-foreground" />}
              >
                Puedes cambiar esto cuando quieras. Retirar el consentimiento es tan
                fácil como darlo, y no cambia nada de lo que puedas leer aquí.
              </Dialog.Description>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Necesarias</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Guardan tu decisión en este navegador para no volver a
                        preguntar. Sin esto el banner saldría en cada visita.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      Siempre activas
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Analítica (Google Analytics 4)
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Nos dice qué lecciones se leen y cuáles se abandonan. No crea
                        perfiles, no se usa para publicidad y no se comparte con
                        terceros.
                      </p>
                    </div>
                    <label className="flex shrink-0 cursor-pointer items-center">
                      <span className="sr-only">Activar analítica</span>
                      <input
                        type="checkbox"
                        checked={analitica}
                        onChange={(e) => setAnalitica(e.target.checked)}
                        className="h-5 w-5 rounded border-input accent-primary"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => decidir(true)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Guardar y aceptar
                </button>
                <button
                  type="button"
                  onClick={() => decidir(analitica)}
                  className="rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Guardar mis preferencias
                </button>
                <Dialog.Close className="rounded-md px-3 py-2 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground">
                  Cerrar sin cambiar
                </Dialog.Close>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Estado actual:{" "}
                {decidido?.fecha ? `decidido el ${decidido.fecha.slice(0, 10)}` : "sin decidir"}.{" "}
                <a
                  href="/privacidad"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Leer la política completa
                </a>
                .
              </p>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
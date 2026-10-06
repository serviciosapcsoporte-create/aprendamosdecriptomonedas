/**
 * Seccion del lead magnet: plantillas CSV a cambio de nombre y correo.
 *
 * Sin destino de captura configurado no se muestra el formulario: se ofrecen
 * las descargas directas. Ver la nota de app/lib/leads.ts para por que.
 */
import { useState } from "react";
import {
  CSVS,
  endpointConfigurado,
  enviarLead,
  validar,
  type Lead,
} from "@/lib/leads";
import { ElegantHeading } from "@/components/ElegantHeading";
import { Download, FileSpreadsheet, Loader2, Mail } from "lucide-react";

type Estado =
  | { fase: "inicial" }
  | { fase: "enviando" }
  | { fase: "listo" }
  | { fase: "fallo"; detalle: string };

export function LeadMagnet() {
  const hayEndpoint = endpointConfigurado() !== null;
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaCorreo, setAceptaCorreo] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>({ fase: "inicial" });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validar({ nombre, email });
    setErrores(err);
    if (Object.keys(err).length) {
      // Lleva el foco al primer campo con problema, que es lo que espera
      // alguien que navega con teclado o lector de pantalla.
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setEstado({ fase: "enviando" });
    const lead: Lead = {
      nombre: nombre.trim(),
      email: email.trim(),
      aceptaCorreo,
      origen: "leadmagnet-csv",
      fecha: new Date().toISOString(),
    };
    const r = await enviarLead(lead);
    if (r.estado === "ok") setEstado({ fase: "listo" });
    else if (r.estado === "sin-configurar") setEstado({ fase: "fallo", detalle: "sin-configurar" });
    else setEstado({ fase: "fallo", detalle: r.detalle });
  };

  return (
    <section
      id="recursos-csv"
      aria-labelledby="leadmagnet-titulo"
      className="relative z-10 scroll-mt-24 border-y border-[var(--border)] bg-[var(--card)] dark:bg-[var(--card-dark)]"
    >
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
          <div>
            <ElegantHeading
              as="h2"
              id="leadmagnet-titulo"
              className="mb-4 text-[length:var(--heading-text-size)]"
            >
              Descarga plantillas de análisis on-chain y datasets en CSV
            </ElegantHeading>
            <p className="mb-6 max-w-2xl text-[var(--muted-foreground)]">
              Obtén gratis nuestras guías prácticas, checklists de seguridad y
              plantillas en formato CSV para rastreo de transacciones y métricas
              en la cadena. Ábrelas en Excel, Numbers o pandas sin tocar nada.
            </p>

            <ul className="mb-8 grid gap-3 sm:grid-cols-2">
              {CSVS.map((c) => (
                <li key={c.archivo}>
                  <a
                    href={c.archivo}
                    download
                    className="flex h-full items-start gap-3 rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]"
                  >
                    <FileSpreadsheet
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{c.nombre}</span>
                      <span className="mt-1 block text-xs text-[var(--muted-foreground)]">
                        {c.para}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-xs text-[var(--muted-foreground)]">
              Son plantillas con su esquema y un ejemplo marcado como ejemplo. No
              son datos de mercado: los números de una decisión los sacas de tu
              propia wallet, no de una tabla que te dé un desconocido.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
            {!hayEndpoint ? (
              <>
                <h3 className="mb-2 text-lg font-bold">Descargas directas</h3>
                <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                  La captura por correo todavía no está conectada. Mientras tanto
                  los cinco CSV se descargan sin dejar ningún dato.
                </p>
                <a
                  href={CSVS[0].archivo}
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-dark)]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Descargar el paquete CSV
                </a>
                <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                  Si prefieres que te los mandemos por correo,{" "}
                  <a href="https://t.me/ApcDeCripto" className="underline underline-offset-2">
                    escríbenos por Telegram
                  </a>
                  .
                </p>
              </>
            ) : estado.fase === "listo" ? (
              <>
                <h3 className="mb-2 text-lg font-bold">Listo, {nombre.trim()}</h3>
                <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                  Te mandamos los cinco CSV a{" "}
                  <strong className="text-foreground">{email.trim()}</strong>. Si
                  no te llegan en un par de horas, revisa la carpeta de spam.
                </p>
                <ul className="space-y-2">
                  {CSVS.map((c) => (
                    <li key={c.archivo}>
                      <a
                        href={c.archivo}
                        download
                        className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {c.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <form onSubmit={enviar} noValidate>
                <h3 className="mb-2 text-lg font-bold">Te los mandamos por correo</h3>
                <p className="mb-5 text-sm text-[var(--muted-foreground)]">
                  Dos campos, sin registro y sin contraseña. Solo se usan para
                  enviarte esto.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="lead-nombre" className="mb-1 block text-sm font-medium">
                      Nombre o alias
                    </label>
                    <input
                      id="lead-nombre"
                      name="nombre"
                      type="text"
                      autoComplete="nickname"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      aria-invalid={errores.nombre ? "true" : "false"}
                      aria-describedby={errores.nombre ? "lead-nombre-err" : undefined}
                      className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    />
                    {errores.nombre && (
                      <p id="lead-nombre-err" className="mt-1 text-xs text-[var(--danger)]">
                        {errores.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="mb-1 block text-sm font-medium">
                      Correo electrónico
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={errores.email ? "true" : "false"}
                      aria-describedby={errores.email ? "lead-email-err" : undefined}
                      className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    />
                    {errores.email && (
                      <p id="lead-email-err" className="mt-1 text-xs text-[var(--danger)]">
                        {errores.email}
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
                    <input
                      type="checkbox"
                      checked={aceptaCorreo}
                      onChange={(e) => setAceptaCorreo(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[var(--input)] accent-[var(--primary)]"
                    />
                    <span>
                      También quiero recibir avisos cuando publiquemos una lección
                      nueva. Puedes darte de baja cuando quieras.
                    </span>
                  </label>

                  {estado.fase === "fallo" && (
                    <p role="alert" className="text-sm text-[var(--danger)]">
                      {estado.detalle === "sin-configurar"
                        ? "La captura no está activa. Usa los enlaces de descarga de al lado."
                        : `No pudimos enviarlo (${estado.detalle}). Puedes descargar los CSV directamente.`}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={estado.fase === "enviando"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-dark)] disabled:opacity-60"
                  >
                    {estado.fase === "enviando" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Descargar paquete CSV gratuito
                      </>
                    )}
                  </button>

                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                    Guardamos nombre y correo para enviarte los recursos. No
                    vendemos ni cedemos tus datos, y no hay publicidad. Puedes
                    pedir su eliminación cuando quieras desde la{" "}
                    <a href="/privacidad" className="underline underline-offset-2">
                      política de privacidad
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}